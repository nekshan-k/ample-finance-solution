import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-here-change-in-production'
);

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, user: null, authenticated: false },
        { status: 200 }
      );
    }

    const { payload } = await jwtVerify(token, SECRET_KEY);

    return NextResponse.json({
      success: true,
      authenticated: true,
      user: payload.user,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, user: null, authenticated: false },
      { status: 200 }
    );
  }
}
