import { NextRequest, NextResponse } from 'next/server';

// “/status” : doit retourner cette réponse ci-dessous
export async function GET() {   
     // Return JSON response
     return NextResponse.json({
         message: "pong",
         statusCode: 200
     }, { status: 200 });
}