import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import * as React from 'react';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    const body = await request.json();
  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'kevinkaferi@gmail.com',
      subject: `Transcribely`,
      text: `Name: ${body.name}\nEmail: ${body.email}\nMessage: ${body.message}`,
    });

    if (error) {
      return NextResponse.json({ error });
    }

    return NextResponse.json({ message: "success" });
  } catch (error) {
    return NextResponse.json({ error });
  }
}