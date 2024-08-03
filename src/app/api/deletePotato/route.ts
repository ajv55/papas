import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const searchParams = await req.nextUrl.searchParams;
  const id = searchParams.get('id')

  try {
    // Retrieve the existing cupcake list
    const existingList = await prisma.loadedPotatoes.findFirst();
    const loadedPotatoes = existingList ? JSON.parse(existingList.loadedPotatoes!) : [];

    // Filter out the cupcake to delete
    const updatedPotato = loadedPotatoes.filter((potato: { id: string }) => potato.id !== id);

    // Update the database with the new list
    await prisma.loadedPotatoes.update({
      where: { id: existingList?.id },
      data: { loadedPotatoes: JSON.stringify(updatedPotato) },
    });

    return NextResponse.json({ message: 'Loaded potato deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting loaded potato:', error);
    return NextResponse.json({ error: 'Failed to delete loaded potato' }, { status: 500 });
  }
}
