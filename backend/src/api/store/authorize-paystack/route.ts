import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { IPaymentModuleService } from "@medusajs/framework/types";
import { Modules } from "@medusajs/framework/utils";

export async function GET(req: MedusaRequest, res: MedusaResponse): Promise<void> {
    try {
        const paymentModuleService: IPaymentModuleService = req.scope.resolve(Modules.PAYMENT);

        // Extract payment reference and payment session ID from query parameters
        const paymentReference = req.query.paymentReference as string;
        const paymentSessionId = req.query.paymentSessionId as string;

        // Validate required parameters
        if (!paymentReference || !paymentSessionId) {
            res.status(400).json({
                status: "error",
                message: "Missing paymentReference or paymentSessionId in query parameters",
            });
            return;
        }

        // Log input for debugging
        console.log("Authorizing Paystack payment session with ID:", paymentSessionId, "and reference:", paymentReference);

        // Retrieve the payment session to ensure it exists
        const paymentSession = await paymentModuleService.retrievePaymentSession(paymentSessionId);
        console.log("Payment session retrieved:", paymentSession);
        if (!paymentSession) {
            throw new Error(`PaymentSession with ID ${paymentSessionId} not found`);
        }

        // Verify the associated PaymentCollection exists
        if (!paymentSession.payment_collection_id) {
            throw new Error(`No PaymentCollection associated with PaymentSession ${paymentSessionId}`);
        }

        // Update the payment session status to authorized
        // Update the payment session status to authorized
        // Update the payment collection
        const updatedPaymentCollection = await paymentModuleService.updatePaymentSession(
            {
                id: paymentSessionId,
                amount: paymentSession.amount,
                currency_code: paymentSession.currency_code,
                data: paymentSession.data,
                context: paymentSession.context,
                //@ts-ignore
                status: "authorized"
            }
        );
        console.log("Payment collection updated:", updatedPaymentCollection);

        // Log the result
        console.log("Payment collection updated:", updatedPaymentCollection);

        // Return success response with updated payment session details
        res.status(200).json({
            status: "success",
            message: "Payment session authorized successfully",
            payment: updatedPaymentCollection,
        });
    } catch (error: any) {
        console.error("Error authorizing Paystack payment session:", error);
        res.status(500).json({
            status: "error",
            message: error.message || "Failed to authorize payment session",
        });
    }
}