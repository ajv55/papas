
import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest){


    const body = await req.json();
    console.log(body);

    const {id } = body;

    const update = await prisma.order.update({
        where: {
            id: id
        },
        data: {
            status: 'Completed'
        }
    })


    return NextResponse.json(update, {status: 201})
}