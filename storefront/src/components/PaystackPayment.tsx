"use client"

import { useState, useEffect } from "react"
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

    const handlePaystackRedirect = () => {
        setIsLoading(true)
        const authorizationUrl = session?.data?.authorization_url
        if (!authorizationUrl) {
            toast.error("Paystack session not ready. Please try again.")
            setIsLoading(false)
            return
        }
        // Move window access to useEffect or ensure client-side execution
        window.location.href = authorizationUrl
    }

    // Optional: If you want to be extra safe, you can use useEffect
    useEffect(() => {
        if (isLoading && session?.data?.authorization_url) {
            window.location.href = session.data.authorization_url
        }
    }, [isLoading, session])

    return (
        <button
            onClick={handlePaystackRedirect}
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg"
        >
            {isLoading ? "Redirecting..." : "Pay with Paystack"}
        </button>
    )
}