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
    onPaymentFailed
}: PaystackPaymentProps) {
    const [isLoading, setIsLoading] = useState(false)

    const initializePayment = async () => {
        try {
            setIsLoading(true)

            const { access_code, authorization_url } = session.data

            if (!access_code) {
                throw new Error("Payment session not ready")
            }

            //@ts-ignore Use Paystack Popup
            const PaystackPop = (await import("@paystack/inline-js")).default
            const popup = new PaystackPop()

            popup.resumeTransaction(access_code, {
                onClose: () => {
                    setIsLoading(false)
                    toast.warning("Payment was cancelled")
                },
                onSuccess: (transaction: any) => {
                    setIsLoading(false)
                    toast.success("Payment successful!")
                    onPaymentCompleted(transaction.reference)
                },
                onError: (error: any) => {
                    setIsLoading(false)
                    let errorMessage = "Payment failed"

                    if (error.message?.toLowerCase().includes('not found')) {
                        errorMessage = "Payment session expired. Please try again."
                    }

                    toast.error(errorMessage)
                    onPaymentFailed(errorMessage)
                }
            })

        } catch (error) {
            setIsLoading(false)
            //@ts-ignore
            onPaymentFailed(error.message)
        }
    }

    return (
        <button
            onClick={initializePayment}
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg"
        >
            {isLoading ? "Processing..." : "Pay with Paystack"}
        </button>
    )
}
