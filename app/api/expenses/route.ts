
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

export async function PUT(request: NextRequest, {params} : {params : {id: string}}) {
    try{
        const {id} = params
        const body = await request.json()
        const {name, category, price} = body
    if (!name || !category || price === undefined) {
        return NextResponse.json(
            { error: "Missing required fields: name, category, price" }, 
            { status: 400 }
        )
    }
    const updateItem = await prisma.expenses.update({ 
            where : {id : parseInt(id) },
            data: {name, category, price: Number(price)}
            })
    return NextResponse.json(updateItem, {status : 201})
    }catch (error) {
        console.error('PUT Error:', error)
        return NextResponse.json(
            { error: "Failed to update expense" }, 
            { status: 500 }
        )
    }
}