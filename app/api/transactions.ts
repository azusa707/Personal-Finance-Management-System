/**import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const transactions = await prisma.transaction.findMany();
      res.status(200).json(transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      res.status(500).json({ message: "Error fetching transactions" });
    }
  } else if (req.method === "POST") {
    const { amount, category } = req.body;

    if (!amount || !category) {
      return res.status(400).json({ message: "Amount and category are required" });
    }

    try {
      const newTransaction = await prisma.transaction.create({
        data: {
          amount: parseFloat(amount),
          category,
        },
      });
      res.status(201).json(newTransaction);
    } catch (error) {
      console.error("Error creating transaction:", error);
      res.status(500).json({ message: "Error creating transaction" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
**/