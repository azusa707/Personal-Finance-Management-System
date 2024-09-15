"use client";

import { useState, useEffect } from "react";

// Define the Transaction interface to handle TypeScript errors
interface Transaction {
  id: number;
  amount: number;
  category: string;
  createdAt: string;
}

export const TransactionsDashboard = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]); // Define the state with Transaction[] type
  const [showModal, setShowModal] = useState(false);
  const [newTransaction, setNewTransaction] = useState({ amount: "", category: "" });

  // Fetch transactions from the API using fetch
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("/api/transactions");
        if (!response.ok) throw new Error("Failed to fetch transactions");
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  // Handle adding a new transaction using fetch
  const handleAddTransaction = async () => {
    try {
      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: parseFloat(newTransaction.amount),
          category: newTransaction.category,
        }),
      });
      if (!response.ok) throw new Error("Failed to add transaction");
      const data = await response.json();
      setTransactions([...transactions, data]);
      setShowModal(false);
      setNewTransaction({ amount: "", category: "" });
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-10">
      {/* Transaction Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Transaction History</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setShowModal(true)}
        >
          + Add new
        </button>
      </div>

      {/* Transaction Table */}
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="text-left py-2">Amount</th>
            <th className="text-left py-2">Category</th>
            <th className="text-left py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="border-t py-2">{transaction.amount}</td>
              <td className="border-t py-2">{transaction.category}</td>
              <td className="border-t py-2">
                {new Date(transaction.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for adding transaction */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">New Transaction</h3>
            <div className="mb-4">
              <label className="block mb-2">Amount</label>
              <input
                type="number"
                value={newTransaction.amount}
                onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                className="border border-gray-300 rounded p-2 w-full"
                placeholder="Enter amount"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Category</label>
              <input
                type="text"
                value={newTransaction.category}
                onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
                className="border border-gray-300 rounded p-2 w-full"
                placeholder="Enter category"
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleAddTransaction}
              >
                Create Transaction
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
