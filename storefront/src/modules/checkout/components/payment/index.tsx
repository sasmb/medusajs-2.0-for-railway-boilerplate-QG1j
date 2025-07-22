"use client"

import { useCallback, useContext, useEffect, useMemo, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { RadioGroup } from "@headlessui/react"
import ErrorMessage from "@modules/checkout/components/error-message"
//@ts-ignore
import { CheckCircleSolid, CreditCard } from "@medusajs/icons"
import { Button, Container, Heading, Text, clx } from "@medusajs/ui"
import { CardElement } from "@stripe/react-stripe-js"
import { StripeCardElementOptions } from "@stripe/stripe-js"

import Divider from "@modules/common/components/divider"
import PaymentContainer from "@modules/checkout/components/payment-container"
import { isStripe as isStripeFunc, paymentInfoMap } from "@lib/constants"
import { StripeContext } from "@modules/checkout/components/payment-wrapper"
import { initiatePaymentSession } from "@lib/data/cart"
import { usePaystackSession } from "hooks/use-paystack-session"
import { PaystackPayment } from "@components/PaystackPayment"

const Payment = ({
  cart,
  availablePaymentMethods,
}: {
  cart: any
  availablePaymentMethods: any[]
}) => {
  console.log(
    "cart.payment_collection?.payment_sessions:",
    cart.payment_collection?.payment_sessions
  )
  const activeSession = cart.payment_collection?.payment_sessions?.find(
    (paymentSession: any) => paymentSession.status === "pending"
  )

  const paystackSession = cart.payment_collection?.payment_sessions?.find(
    (session: any) => session.provider_id === "pp_paystack_paystack"
  )

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cardBrand, setCardBrand] = useState<string | null>(null)
  const [cardComplete, setCardComplete] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    activeSession?.provider_id ?? ""
  )

  console.log("paystackSession:", paystackSession)

  const { isReady: isPaystackReady, updateSession } = usePaystackSession({
    session: paystackSession,
    cart,
    //@ts-ignore
    onSessionUpdate: (updatedSession) => {
      console.log("Paystack session updated:", updatedSession)
    },
  })

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "payment"

  const isStripe = isStripeFunc(activeSession?.provider_id)
  const isPaystack = selectedPaymentMethod === "pp_paystack_paystack"
  const stripeReady = useContext(StripeContext)

  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0

  const paymentReady =
    (activeSession && cart?.shipping_methods.length !== 0) || paidByGiftcard

  const useOptions: StripeCardElementOptions = useMemo(() => {
    return {
      style: {
        base: {
          fontFamily: "Inter, sans-serif",
          color: "#424270",
          "::placeholder": {
            color: "rgb(107 114 128)",
          },
        },
      },
      classes: {
        base: "pt-3 pb-1 block w-full h-11 px-4 mt-0 bg-ui-bg-field border rounded-md appearance-none focus:outline-none focus:ring-0 focus:shadow-borders-interactive-with-active border-ui-border-base hover:bg-ui-bg-field-hover transition-all duration-300 ease-in-out",
      },
    }
  }, [])

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const handleEdit = () => {
    router.push(pathname + "?" + createQueryString("step", "payment"), {
      scroll: false,
    })
  }

  const handlePaystackPaymentCompleted = async (reference: string) => {
    setIsLoading(true)
    try {
      const verifyResponse = await fetch(`/api/paystack/verify/${reference}`, {
        method: "GET",
        headers: {
          "x-publishable-api-key":
            process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY!,
        },
      })

      if (!verifyResponse.ok) {
        throw new Error("Payment verification failed")
      }

      const verificationData = await verifyResponse.json()

      if (verificationData.status !== "success") {
        throw new Error("Payment was not successful")
      }

      const completeResponse = await fetch(`/store/carts/${cart.id}/complete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-publishable-api-key":
            process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY!,
        },
        body: JSON.stringify({
          payment_reference: reference,
        }),
      })

      if (completeResponse.ok) {
        const result = await completeResponse.json()
        router.push(`/order/confirmed/${result.order.id}`)
      } else {
        throw new Error("Failed to complete the order")
      }
    } catch (err: any) {
      setError(err.message || "Order completion failed")
    } finally {
      setIsLoading(false)
    }
  }

  const createPaymentSession = async () => {
    try {
      // First, try to initiate the payment session using the Medusa helper
      const response = await initiatePaymentSession(cart, {
        provider_id: "pp_paystack_paystack",
      })

      if (response) {
        // Refresh the page to get the updated cart with payment session
        window.location.reload()
        return true
      }

      // Fallback to direct API call if helper doesn't work
      const directResponse = await fetch(
        `/store/payment-collections/${cart.payment_collection.id}/payment-sessions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-publishable-api-key":
              process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY!,
          },
          body: JSON.stringify({
            provider_id: "pp_paystack_paystack",
          }),
        }
      )

      if (!directResponse.ok) {
        const errorData = await directResponse.json().catch(() => ({}))
        throw new Error(
          errorData.message || "Failed to create Paystack session"
        )
      }

      // Refresh the page to get the updated cart with payment session
      window.location.reload()
      return true
    } catch (error: any) {
      console.error("Failed to create payment session:", error)
      throw error
    }
  }

  const setPaymentSession = async () => {
    if (!paystackSession) {
      throw new Error("Paystack session not found")
    }

    try {
      const response = await fetch(
        `/store/payment-collections/${cart.payment_collection.id}/payment-sessions/${paystackSession.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-publishable-api-key":
              process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY!,
          },
          body: JSON.stringify({
            data: {
              email: cart.email,
              amount: cart.total,
              currency: cart.region.currency_code,
            },
          }),
        }
      )

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || "Failed to set payment session")
      }

      return await response.json()
    } catch (error: any) {
      console.error("Failed to set payment session:", error)
      throw error
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setError(null)

    try {
      if (isPaystack) {
        if (!cart?.email) {
          throw new Error("Email is required for Paystack payments")
        }

        if (!paystackSession) {
          console.log("Creating new Paystack payment session...")
          await createPaymentSession()
          return
        }

        console.log("Setting Paystack payment session...")
        await setPaymentSession()

        const selectResponse = await fetch(
          `/store/payment-collections/${cart.payment_collection.id}/payment-sessions/${paystackSession.id}/select`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-publishable-api-key":
                process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY!,
            },
          }
        )

        if (!selectResponse.ok) {
          const errorData = await selectResponse.json().catch(() => ({}))
          throw new Error(
            errorData.message || "Failed to select Paystack session"
          )
        }

        // Refresh to get updated cart with selected session
        window.location.reload()
        return
      }

      // Handle other payment methods (Stripe, etc.)
      // ... existing code for other payment methods
    } catch (err: any) {
      console.error("Payment session error:", err)
      setError(err.message || "Payment initiation failed")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setError(null)
  }, [isOpen])

  return (
    <div className="bg-brand-light">
      <div className="flex flex-row items-center justify-between mb-6">
        <Heading
          level="h2"
          className={clx(
            "flex flex-row text-3xl-regular gap-x-2 items-baseline text-brand-dark font-heading",
            {
              "opacity-50 pointer-events-none select-none":
                !isOpen && !paymentReady,
            }
          )}
        >
          Payment
          {!isOpen && paymentReady && (
            <CheckCircleSolid className="text-brand-green" />
          )}
        </Heading>
        {!isOpen && paymentReady && (
          <Text>
            <button
              onClick={handleEdit}
              className="text-brand-orange hover:text-brand-orange/80 font-heading"
              data-testid="edit-payment-button"
            >
              Edit
            </button>
          </Text>
        )}
      </div>
      <div>
        <div className={isOpen ? "block" : "hidden"}>
          {!paidByGiftcard && availablePaymentMethods?.length && (
            <>
              <RadioGroup
                value={selectedPaymentMethod}
                onChange={(value: string) => setSelectedPaymentMethod(value)}
              >
                {availablePaymentMethods
                  .sort((a, b) => {
                    return a.provider_id > b.provider_id ? 1 : -1
                  })
                  .map((paymentMethod) => {
                    return (
                      <PaymentContainer
                        paymentInfoMap={paymentInfoMap}
                        paymentProviderId={paymentMethod.id}
                        key={paymentMethod.id}
                        selectedPaymentOptionId={selectedPaymentMethod}
                      />
                    )
                  })}
              </RadioGroup>
              {isStripe && stripeReady && (
                <div className="mt-5 transition-all duration-150 ease-in-out">
                  <Text className="txt-medium-plus text-brand-dark mb-1 font-heading">
                    Enter your card details:
                  </Text>
                  <CardElement
                    options={useOptions as StripeCardElementOptions}
                    onChange={(e) => {
                      setCardBrand(
                        e.brand &&
                          e.brand.charAt(0).toUpperCase() + e.brand.slice(1)
                      )
                      setError(e.error?.message || null)
                      setCardComplete(e.complete)
                    }}
                  />
                </div>
              )}
              {isPaystack &&
                paystackSession &&
                paystackSession.data &&
                Object.keys(paystackSession.data).length > 0 && (
                  <div className="mt-5 transition-all duration-150 ease-in-out">
                    <Text className="txt-medium-plus text-brand-dark mb-1 font-heading">
                      Proceed with Paystack Payment:
                    </Text>
                    <PaystackPayment
                      session={paystackSession}
                      cart={cart}
                      onPaymentCompleted={handlePaystackPaymentCompleted}
                      //@ts-ignore
                      onPaymentFailed={(error) =>
                        setError(`Paystack payment failed: ${error}`)
                      }
                      data-testid="paystack-payment-component"
                    />
                  </div>
                )}
            </>
          )}

          {paidByGiftcard && (
            <div className="flex flex-col w-1/3">
              <Text className="txt-medium-plus text-ui-fg-base mb-1">
                Payment method
              </Text>
              <Text
                className="txt-medium text-ui-fg-subtle"
                data-testid="payment-method-summary"
              >
                Gift card
              </Text>
            </div>
          )}

          <ErrorMessage
            error={error}
            data-testid="payment-method-error-message"
          />

          <Button
            size="large"
            className="mt-6"
            onClick={handleSubmit}
            isLoading={isLoading}
            disabled={
              (isStripe && !cardComplete) ||
              (!selectedPaymentMethod && !paidByGiftcard)
            }
            data-testid="submit-payment-button"
          >
            {!paystackSession && isPaystack
              ? "Setup Paystack Payment"
              : !activeSession && isStripeFunc(selectedPaymentMethod)
              ? "Enter card details"
              : isPaystack
              ? "Initialize Paystack Payment"
              : "Continue to review"}
          </Button>
        </div>

        <div className={isOpen ? "hidden" : "block"}>
          {cart && paymentReady && activeSession ? (
            <div className="flex items-start gap-x-1 w-full">
              <div className="flex flex-col w-1/3">
                <Text className="txt-medium-plus text-ui-fg-base mb-1">
                  Payment method
                </Text>
                <Text
                  className="txt-medium text-ui-fg-subtle"
                  data-testid="payment-method-summary"
                >
                  {paymentInfoMap[selectedPaymentMethod]?.title ||
                    selectedPaymentMethod}
                </Text>
              </div>
              <div className="flex flex-col w-1/3">
                <Text className="txt-medium-plus text-ui-fg-base mb-1">
                  Payment details
                </Text>
                <div
                  className="flex gap-2 txt-medium text-ui-fg-subtle items-center"
                  data-testid="payment-details-summary"
                >
                  <Container className="flex items-center h-7 w-fit p-2 bg-ui-button-neutral-hover">
                    {paymentInfoMap[selectedPaymentMethod]?.icon || (
                      <CreditCard />
                    )}
                  </Container>
                  <Text>
                    {isStripeFunc(selectedPaymentMethod) && cardBrand
                      ? cardBrand
                      : isPaystack
                      ? "Paystack Payment"
                      : "Another step will appear"}
                  </Text>
                </div>
              </div>
            </div>
          ) : paidByGiftcard ? (
            <div className="flex flex-col w-1/3">
              <Text className="txt-medium-plus text-ui-fg-base mb-1">
                Payment method
              </Text>
              <Text
                className="txt-medium text-ui-fg-subtle"
                data-testid="payment-method-summary"
              >
                Gift card
              </Text>
            </div>
          ) : null}
        </div>
      </div>
      <Divider className="mt-8" />
    </div>
  )
}

export default Payment
