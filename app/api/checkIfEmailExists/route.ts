import { NextRequest, NextResponse } from "next/server";
import admin from '../../../utils/firebadAdmin';


export async function POST(req: NextRequest, res: Response) {
    // Import the Firebase Admin SDK
    const body = await req.json();
    const email = body.email;
    const secret = body.secret;
    if (secret !== process.env.SECRET) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!email) {
        return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }
    try {
        const user = await admin.auth().getUserByEmail(email);
        return NextResponse.json({ exists: true });
    } catch (error) {
        return NextResponse.json({ exists: false });
    }
}