import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export async function POST(request: NextRequest) {
  try {
    const { items, customer } = await request.json();

    console.log(request.headers.get('origin'));
    const origin = request.headers.get('origin');
    if (!origin) {
      throw new Error('Origin header is missing');
    }

    // Check if customer ID exists or create a new customer
    let customerId = customer?.id;
    if (!customerId) {
      // Create a new customer
      const stripeCustomer = await stripe.customers.create({
        email: customer.email,
        name: customer.name,
        phone: customer.phone,
      });
      customerId = stripeCustomer.id;

      // Optionally, save this customer ID to your database associated with the user
    }

    const line_items = items.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name_en,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      customer: customerId, // Use the customer ID
      mode: 'payment',
      success_url: `${origin}/`,
      cancel_url: `${origin}/`,
      metadata: {
        customerName: customer.name,
        customerPhone: customer.phone,
      },
    });

    return NextResponse.json({ id: session.id });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

