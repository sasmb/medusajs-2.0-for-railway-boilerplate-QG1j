"use client"

import { useState } from "react"
import { toast } from "@medusajs/ui"

interface PaystackPaymentProps {
  session: any
  cart: any
  onPaymentCompleted: (reference: string) => void
  onPaymentFailed: (error: string) => void
}

export function PaystackPayment({
  session,
  cart,
  onPaymentCompleted,
  onPaymentFailed,
}: PaystackPaymentProps) {
  const [isLoading, setIsLoading] = useState(false)

  const initializePayment = async () => {
    try {
      setIsLoading(true)

      // Check if we have authorization_url from Paystack session
      if (session?.data?.authorization_url) {
        // Redirect to Paystack checkout page
        window.open(session.data.authorization_url, "_blank")
        setIsLoading(false)
        toast.success("Redirecting to Paystack checkout...")
        return
      }

      // Fallback: Use Paystack Popup if no authorization_url
      if (session?.data?.access_code) {
        // Load Paystack script dynamically
        const script = document.createElement("script")
        script.src = "https://js.paystack.co/v1/inline.js"
        document.head.appendChild(script)

        script.onload = () => {
          // Use Paystack Popup with access_code
          const handler = (window as any).PaystackPop.setup({
            key:
              session.data.public_key ||
              process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
            email: cart.email,
            amount: session.data.amount,
            currency: session.data.currency,
            ref: session.data.paystack_reference,
            access_code: session.data.access_code,

            callback: function (response: any) {
              setIsLoading(false)
              toast.success("Payment successful!")
              onPaymentCompleted(response.reference)
            },

            onClose: function () {
              setIsLoading(false)
              toast.warning("Payment was cancelled")
            },
          })

          handler.openIframe()
        }

        script.onerror = () => {
          setIsLoading(false)
          onPaymentFailed("Failed to load Paystack")
        }
      } else {
        throw new Error("No payment authorization URL or access code available")
      }
    } catch (error: any) {
      setIsLoading(false)
      onPaymentFailed(error.message)
      toast.error(error.message)
    }
  }

  return (
    <div className="space-y-4">
      <button
        onClick={initializePayment}
        disabled={isLoading || !session?.data}
        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors"
      >
        {isLoading ? "Processing..." : "Pay with Paystack"}
      </button>

      {session?.data?.authorization_url && (
        <div className="text-sm text-gray-600">
          <p>You will be redirected to Paystack's secure checkout page.</p>
          <p className="mt-1">
            <strong>Note:</strong> After completing payment, please return to
            this page to continue.
          </p>
        </div>
      )}
    </div>
  )
}
