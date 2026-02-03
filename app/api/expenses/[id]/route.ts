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