import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    try {
        const expenses = await prisma.expenses.findMany();
        return NextResponse.json(expenses);
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json(
            { error: "Internal server error" }, 
            { status: 500 }
        );
    }
}