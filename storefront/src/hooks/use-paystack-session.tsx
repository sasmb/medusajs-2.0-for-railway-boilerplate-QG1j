"use client"
import { useState, useEffect } from "react"

export function usePaystackSession({ session, cart, onSessionUpdate }: any) {
  const [isReady, setIsReady] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    if (session?.data) {
      const {
        authorization_url,
        access_code,
        session_expired,
        payment_completed,
      } = session.data
      console.log(
        "authorization_url, access_code, session_expired, payment_completed:",
        authorization_url,
        access_code,
        session_expired,
        payment_completed
      )

      const isExpiredOrCompleted =
        session_expired === true || payment_completed === true
      const ready =
        !isExpiredOrCompleted &&
        ((session.status === "requires_more" &&
          (authorization_url || access_code)) ||
          session.status === "authorized")

      setIsReady(ready)
    }
  }, [session])

  const updateSession = async (customerData?: any) => {
    if (!cart?.payment_collection?.id || !session?.id) {
      console.error("Missing cart payment collection ID or session ID")
      return false
    }

    setIsUpdating(true)

    try {
      const response = await fetch(
        `/store/payment-collections/${cart.payment_collection.id}/payment-sessions/${session.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-publishable-api-key":
              process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY!,
          },
          body: JSON.stringify({
            data: {
              email: customerData?.email || cart.email,
              amount: customerData?.amount || cart.total,
              currency: cart.region.currency_code,
            },
          }),
        }
      )

      if (response.ok) {
        const result = await response.json()
        const updatedSession = result.payment_session

        if (updatedSession && onSessionUpdate) {
          onSessionUpdate(updatedSession)
        }
        return true
      } else {
        const errorData = await response.json().catch(() => ({}))
        console.error("Session update failed:", errorData)
        return false
      }
    } catch (error) {
      console.error("Session update failed:", error)
      return false
    } finally {
      setIsUpdating(false)
    }
  }

  return {
    isReady,
    isUpdating,
    updateSession,
    sessionData: session?.data,
  }
}
