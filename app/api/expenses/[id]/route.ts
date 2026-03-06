import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Param } from "@prisma/client/runtime/client";
import { NextRequest, NextResponse } from "next/server";

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({connectionString})
const prisma = new PrismaClient({adapter})

export async function DELETE(request: NextRequest, {params} : {params : Promise<{id : string}>} ){
    const { id } = await params
    const parsedId = parseInt(id)
    
    // Check if ID is valid
    if (isNaN(parsedId)) {
        return NextResponse.json({error: "Invalid ID format"}, {status: 400})
    }
    
    console.log("parsedId", parsedId)

    try{
        // Check if record exists first
        const expense = await prisma.expenses.findUnique({where: {id: parsedId}})
        if (!expense) {
            return NextResponse.json({error: "Expense not found"}, {status: 404})
        }
        
        await prisma.expenses.delete({where : {id : parsedId}})
        return NextResponse.json({message: "Expense deleted successfully"}, {status: 200})
    }
    catch(e){
        console.error("Delete error:", e)
        return NextResponse.json({error: "Internal Server Error"}, {status: 500})
    }
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const parsedId = parseInt(id)

  if (isNaN(parsedId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 })
  }

  try {
    const expense = await prisma.expenses.findUnique({ where: { id: parsedId } })
    if (!expense) {
      return NextResponse.json({ error: "Expense not found" }, { status: 404 })
    }
    return NextResponse.json(expense)
  } catch (e) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, {params} : {params : {id: string}}) {
    try{
        const {id} = await params
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