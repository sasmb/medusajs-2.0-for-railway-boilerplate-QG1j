"use client"

import { useState, useEffect } from "react"
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
    const [isClient, setIsClient] = useState(false)
    const router = useRouter()

    // Ensure we're on the client side
    useEffect(() => {
        setIsClient(true)
    }, [])

    const handlePaystackRedirect = () => {
        if (!isClient) return
        
        setIsLoading(true)
        const authorizationUrl = session?.data?.authorization_url
        
        if (!authorizationUrl) {
            toast.error("Paystack session not ready. Please try again.")
            setIsLoading(false)
            return
        }

        // Use Next.js router for navigation
        router.push(authorizationUrl)
    } setIsLoading] = useState(false)
    const [isClient, setIsClient] = useState(false)

    // Ensure we're on the client side
    useEffect(() => {
        setIsClient(true)
    }, [])

    const handlePaystackRedirect = () => {
        if (!isClient) return
        
        setIsLoading(true)
        const authorizationUrl = session?.data?.authorization_url
        
        if (!authorizationUrl) {
            toast.error("Paystack session not ready. Please try again.")
            setIsLoading(false)
            return
        }

        // Safe window access after client-side check
        if (typeof window !== 'undefined') {
            window.location.href = authorizationUrl
        }
    }

    // Don't render button until we're on client side
    if (!isClient) {
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