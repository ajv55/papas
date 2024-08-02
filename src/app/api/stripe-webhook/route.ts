import Stripe from "stripe";
import prisma from "@/app/lib/prisma"; 
import { NextRequest, NextResponse } from "next/server";
import { StripeCustomCheckout } from "@stripe/stripe-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });
const webhookSecret: string = process.env.STRIPE_WEBHOOK_KEY!;

const webhookHandler = async (req: NextRequest) => {
    try {
        const buf = await req.text();
        const sig = req.headers.get("stripe-signature")!;
    
        let event: Stripe.Event;

        // Verify and construct the event
        try {
            event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Unknown error";
            console.error(`❌ Error message: ${errorMessage}`);
        
            return NextResponse.json(
                {
                    error: {
                        message: `Webhook Error: ${errorMessage}`,
                    },
                },
                { status: 400 }
            );
        }

        // Log the event type and payload
        console.log(`🔔 Event received: ${event.type}`);
        console.log(`Event data: ${JSON.stringify(event.data.object)}`);

        // Handle the event
        switch (event.type) {
            case 'checkout.session.completed':
                console.log('Handling checkout.session.completed');
                const session = event.data.object as Stripe.Checkout.Session;
                console.log(`Session ID: ${session.id}`);
                
                await handleCheckoutSessionCompleted(session);
                break;
            // Handle other event types as needed
            default:
                console.log(`Unhandled event type ${event.type}`);
        }
        
        // Return a response to acknowledge receipt of the event.
        return NextResponse.json({ received: true });
    } catch (err) {
        console.error(`Error processing webhook: ${err}`);
        return NextResponse.json(
            {
                error: {
                    message: `Method Not Allowed`,
                },
            },
            { status: 405 }
        ).headers.set("Allow", "POST");
    }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
    try {
        const customerId = session.customer as string;
        
        console.log(`Retrieving customer details for customerId: ${customerId}`);
        // Retrieve customer details from Stripe
        const customer = await stripe.customers.retrieve(customerId) as Stripe.Customer;

        if (customer.deleted) {
            console.error(`Customer ${customerId} has been deleted.`);
            return;
        }

        console.log(`Customer retrieved: ${JSON.stringify(customer)}`);

        console.log(`Retrieving line items for sessionId: ${session.id}`);
        // Extract line items
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
        
        lineItems?.data.map((item: any) => {
            console.log(item)
        })
        console.log(`Line items retrieved: ${JSON.stringify(lineItems.data)}`);

        // Prepare order items
        const items = lineItems.data.map(item => ({
            name: item.description,
            price: item.amount_total / 100, // Convert from cents to dollars
            quantity: item.quantity,
        }));

        console.log(`Items to be created: ${JSON.stringify(items)}`);

        // Create the order
        const order = await prisma.order.create({
            data: {
                buyerName: customer.name ?? null,
                buyerEmail: customer.email ?? null,
                buyerPhone: customer.phone ?? null,
                totalAmount: session.amount_total! / 100, // Convert from cents to dollars
                status: 'processing',
                items: {
                    create: items.map(item => ({
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                    })),
                },
            },
        });

        console.log(`Order created successfully: ${JSON.stringify(order)}`);
    } catch (err) {
        console.error(`Error creating order: ${err}`);
    }
}

export { webhookHandler as POST };
