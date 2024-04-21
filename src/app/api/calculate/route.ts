import { NextRequest, NextResponse } from "next/server";
import { isNumber, parseNumber } from "./../../../lib/number-utils";

// POST “/calculate”
export async function POST(request: NextRequest) {

    const contentType = request.headers.get('content-type');
    let body;

    if (contentType?.includes('application/json')) {
      body = await request.json();
    } else if (contentType?.includes('application/x-www-form-urlencoded')) {
      body = await request.formData();
    } else {
      return NextResponse.json({ error: 'Type de contenu non pris en charge.' }, { status: 400 });
    }

    const { a, b } = body;

    try {

        if (!a || !b) {
            return NextResponse.json({ error: 'Les propriétés a et b sont requises.' }, { status: 400 });
        }

        if (!isNumber(a) || !isNumber(b)) {
            return NextResponse.json({ error: 'Les propriétés a et b doivent être des nombres.' }, { status: 400 });
        }

        const result = Math.sqrt(parseNumber(a)!) / parseNumber(b)!;

        return NextResponse.json({ message: 'Result : ' + result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}