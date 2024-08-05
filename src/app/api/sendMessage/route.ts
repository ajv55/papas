import { EmailTemplate } from '@/app/components/email-template';
import { NextRequest } from 'next/server';
import { Resend } from 'resend';
import GithubAccessTokenEmail from '@/app/components/email';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {

    const body = await req.json();
    console.log(body);
    
   const { name, email, message  } = body
   console.log(email)
   console.log(message)

  try {
    const { data, error } = await resend.emails.send({
      from: 'Abel <abel@myfitgenius.com>',
      to: 'abejevilla55@gmail.com',
      subject: 'Receipt',
      react: GithubAccessTokenEmail({ name, email, message }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
