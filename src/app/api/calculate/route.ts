import { NextRequest, NextResponse } from "next/server";
import { isNumber, parseNumber } from "./../../../lib/number-utils";

export async function POST(request: NextRequest) {

    const body = await request.json();
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