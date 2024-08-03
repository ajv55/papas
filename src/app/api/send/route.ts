import { EmailTemplate } from '@/app/components/email-template';
import { NextRequest } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {

    const body = await req.json();
    console.log(body);
    
   const { totalAmount, buyer, cartItems, orderId, date  } = body
   console.log(orderId)
   console.log(date)

  try {
    const { data, error } = await resend.emails.send({
      from: 'Abel <abel@myfitgenius.com>',
      to: buyer?.email,
      subject: 'Receipt',
      react: EmailTemplate({ thanks: 'Thank you for your purchase', cartItems, totalAmount, buyer, orderId, date }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
