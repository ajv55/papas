import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(){


    const res = await prisma.loadedPotatoes.findFirst();

    const loadedPotatoes = JSON.parse(res?.loadedPotatoes!)

    return NextResponse.json(loadedPotatoes, {status: 201})
}