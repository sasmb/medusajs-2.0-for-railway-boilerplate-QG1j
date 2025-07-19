import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import fetch from "node-fetch";

export async function GET(req: MedusaRequest, res: MedusaResponse): Promise<void> {
    try {
        // Extract reference from query parameters
        const reference = req.query.reference as string;

        if (!reference) {
            res.status(400).json({ error: "Reference is required" });
            return;
        }

        // Verify the transaction with Paystack
        const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        if (!response.ok) {
            res.status(400).json({ error: data.message || "Failed to verify payment" });
            return;
        }

        if (data.status && data.data.status === "success") {
            // Optionally update Medusa order status here (requires cartService or orderService)
            res.status(200).json({
                status: "success",
                data: {
                    reference: data.data.reference,
                    amount: data.data.amount / 100, // Convert kobo to naira (adjust for currency)
                    status: data.data.status,
                    paid_at: data.data.paid_at,
                },
            });
        } else {
            res.status(400).json({ error: "Payment verification failed", details: data.message });
        }
    } catch (error) {
        console.error("Error verifying Paystack payment:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}