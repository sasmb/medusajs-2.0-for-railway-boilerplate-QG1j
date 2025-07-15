import { useState, useEffect } from "react"
//@ts-ignore
export function usePaystackSession({ session, cart, onSessionUpdate }) {
    const [isReady, setIsReady] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)

    useEffect(() => {
        if (session?.data) {
            const { authorization_url, access_code, session_expired, payment_completed } = session.data

            const isExpiredOrCompleted = session_expired === true || payment_completed === true
            const ready = !isExpiredOrCompleted &&
                ((session.status === "requires_more" && (authorization_url || access_code)) ||
                    session.status === "authorized")

            setIsReady(ready)
        }
    }, [session])

    const updateSession = async (customerData?: any) => {
        if (!cart?.payment_collection?.id) return false

        setIsUpdating(true)

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/payment-collections/${cart.payment_collection.id}/payment-sessions`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY!,
                    },
                    body: JSON.stringify({
                        provider_id: "pp_paystack_paystack",
                        data: { 
                            email: customerData?.email || cart.email,
                            callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout?step=payment`
                        }
                    }),
                }
            )

            if (response.ok) {
                const result = await response.json()
                const paystackSession = result.payment_collection.payment_sessions?.find(
                    (s: any) => s.provider_id === 'pp_paystack_paystack'
                )

                if (paystackSession && onSessionUpdate) {
                    onSessionUpdate(paystackSession)
                    return true
                }
            }

            return false
        } catch (error) {
            console.error('Session update failed:', error)
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