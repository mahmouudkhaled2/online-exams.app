import { NextResponse } from 'next/server';

export async function POST() {
  // Create a response to indicate successful logout
  const response = NextResponse.json({ message: 'Logged out successfully' });

  // Remove the 'next-auth.session-token' cookie by setting it with an expired date
  response.cookies.set('next-auth.session-token', '', {
    path: '/', 
    expires: new Date(0), 
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });

  // Return the response
  return response;
}
