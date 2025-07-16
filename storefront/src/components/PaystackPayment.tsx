"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
    const router = useRouter()

    const handlePaystackRedirect = () => {
        setIsLoading(true)
        const authorizationUrl = session?.data?.authorization_url
        
        if (!authorizationUrl) {
            toast.error("Paystack session not ready. Please try again.")
            setIsLoading(false)
            return
        }

        // Use Next.js app router for navigation
        router.push(authorizationUrl)
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