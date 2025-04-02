import { NextResponse } from "next/server";
import { getDBConnection } from "@/lib/db";

export async function GET() {
    try {
        const pool = await getDBConnection();
        return NextResponse.json({ message: "✅ Database connection successful!" });
    } catch (error) {
        return NextResponse.json({ error: "❌ Database connection failed", details: error.message }, { status: 500 });
    }
}