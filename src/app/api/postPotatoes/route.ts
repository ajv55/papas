import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const newPotato = await req.json();

    // Retrieve the existing cupcake list
    const existingList = await prisma.loadedPotatoes.findFirst();
    const loadedPotatoes = existingList ? JSON.parse(existingList.loadedPotatoes!) : [];

    // Get the last ID and increment it
    const lastId = loadedPotatoes.length > 0 ? Math.max(...loadedPotatoes.map((p: { id: number }) => p.id)) : 0;
    const newId = lastId + 1;

    // Add the new cupcake with the incremented ID
    const loadedPotatoesWithId = { ...newPotato, id: newId.toString() };
    loadedPotatoes.push(loadedPotatoesWithId);

    // Update the database with the new list
    await prisma.loadedPotatoes.update({
      where: { id: existingList?.id },
      data: { loadedPotatoes: JSON.stringify(loadedPotatoes) },
    });

    return NextResponse.json(loadedPotatoesWithId, { status: 201 });
  } catch (error) {
    console.error('Error adding loaded potatoe:', error);
    return NextResponse.json({ error: 'Failed to add loaded potatoe' }, { status: 500 });
  }
}
