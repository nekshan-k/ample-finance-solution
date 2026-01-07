import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-here-change-in-production'
);

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber, otp } = await request.json();

    if (!phoneNumber || !otp) {
      return NextResponse.json(
        { error: 'Phone number and OTP are required' },
        { status: 400 }
      );
    }

    if (otp !== '1234') {
      return NextResponse.json(
        { error: 'Invalid OTP' },
        { status: 401 }
      );
    }

    const user = {
      name: 'Nekshan Kumar',
      phoneNumber: phoneNumber,
    };

    const token = await new SignJWT({ user })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('7d')
      .sign(SECRET_KEY);

    const cookieStore = await cookies();
    cookieStore.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to verify OTP' },
      { status: 500 }
    );
  }
}
