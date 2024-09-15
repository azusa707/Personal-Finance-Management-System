import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const transactions = await prisma.transaction.findMany();
    return NextResponse.json(transactions);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching transactions' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const { amount, category } = await req.json();

  if (!amount || !category) {
    return NextResponse.json({ message: 'Amount and category are required' }, { status: 400 });
  }

  try {
    const newTransaction = await prisma.transaction.create({
      data: {
        amount: parseFloat(amount),
        category,
      },
    });
    return NextResponse.json(newTransaction, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating transaction' }, { status: 500 });
  }
}
