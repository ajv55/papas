import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(){

    const order = await prisma.order.findMany({
        include: {
            items: true
        }
    });

    return NextResponse.json(order, {status: 201})
}