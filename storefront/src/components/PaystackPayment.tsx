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
    const [mounted, setMounted] = useState(false)

    // Only run on client side after component mounts
    useEffect(() => {
        setMounted(true)
    }, [])

    const handlePaystackRedirect = () => {
        if (!mounted) return // Prevent execution during SSR
        
        setIsLoading(true)
        const authorizationUrl = session?.data?.authorization_url
        
        if (!authorizationUrl) {
            toast.error("Paystack session not ready. Please try again.")
            setIsLoading(false)
            return
        }

        // Now safe to use window since we're guaranteed to be on client
        window.location.href = authorizationUrl
    }

    // Don't render the active button until mounted (prevents SSR mismatch)
    if (!mounted) {
        return (
            <button
                disabled
                className="w-full bg-gray-400 text-white font-medium py-3 px-4 rounded-lg"
            >
                Loading...
            </button>
        )
    }

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