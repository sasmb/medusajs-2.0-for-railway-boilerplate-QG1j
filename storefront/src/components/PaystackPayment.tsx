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

            const { public_key, session_id, amount, currency } = session.data

            console.log("public_key", public_key)
            console.log("session_id", session_id)
            console.log("amount", amount)
            console.log("currency", currency)
            console.log("cart.email", cart?.email)

            if (!public_key || !session_id || !amount || !cart?.email) {
                throw new Error("Payment session not ready: missing required Paystack fields.")
            }

            //@ts-ignore Use Paystack Popup
            const PaystackPop = (await import("@paystack/inline-js")).default
            const popup = new PaystackPop()

            popup.newTransaction({
                key: public_key,
                email: cart.email,
                amount: Number(amount) * 100, // Paystack expects amount in kobo
                currency: currency || "NGN",
                reference: session_id,
                onSuccess: (transaction: any) => {
                    setIsLoading(false)
                    toast.success("Payment successful!")
                    onPaymentCompleted(transaction.reference)
                },
                onCancel: () => {
                    setIsLoading(false)
                    toast.warning("Payment was cancelled")
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

        } catch (error: any) {
            setIsLoading(false)
            onPaymentFailed(error?.message || "Unknown error")
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