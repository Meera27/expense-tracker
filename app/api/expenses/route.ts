
import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@/app/generated/prisma/client' 
import { NextRequest, NextResponse } from 'next/server'

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

export async function GET(request: NextRequest) {
    try {
        const expenses = await prisma.expenses.findMany(); //returns an array
        console.log("request", request.nextUrl)
        return NextResponse.json(expenses);

    } catch (error) {
        return NextResponse.json( { error: "Internal server error" }, { status: 500 });
    }
}

export async function POST(request:NextRequest) {
    try{
        const data = await request.json()
        const {name, category, price} = data

        const expense = await prisma.expenses.create({
            data: {name, category, price}
        })
        return NextResponse.json(expense, {status: 201})
    }
    catch(e){
        return NextResponse.json({error: "Internal server error"}, {status: 500})
    }
}