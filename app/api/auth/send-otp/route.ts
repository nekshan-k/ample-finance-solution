import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber } = await request.json();

    if (!phoneNumber) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'OTP sent successfully' 
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to send OTP' },
      { status: 500 }
    );
  }
}
