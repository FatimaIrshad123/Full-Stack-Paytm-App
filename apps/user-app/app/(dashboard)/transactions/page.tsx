
import React, {  } from 'react';
import { ArrowUpRight, ArrowDownLeft, Clock, Bell, Shield } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../lib/auth';
import prisma from '@repo/db/client';
import { getBalance } from '../../lib/actions/getBalance';

async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return txns.map((t:any) => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}

async function getOnRampTransfers() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.p2pTransfer.findMany({
        where: {
            fromUserId: Number(session?.user?.id)
        }
    });
    return txns.map((t:any) => ({
        timeStamp: t.timestamp,
        amount: t.amount,
        fromUserId: t.fromUserId,
        toUserId: t.toUserId
    })
)}

const TransactionHistory = async() => {
    const balance = await getBalance();
    const transactionhistory = await getOnRampTransactions();
    const transferhistory = await getOnRampTransfers();
    
    const totalAmountRecieved = transactionhistory.reduce((sum, x) => sum + x.amount / 100, 0);
    const totalAmountSend = transferhistory.reduce((sum, x) => sum + x.amount / 100, 0);

  const getStatusColor = (status:any) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-100 text-emerald-700';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-700';
      case 'failed':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 shadow-emerald-300 shadow-lg mb-5">
      {/*Topbar*/}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl shadow-xl p-8 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Transaction History</h1>
            <p className="text-emerald-100">View and manage your financial activities</p>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 rounded-full bg-emerald-500 bg-opacity-20 hover:bg-opacity-30 transition-all">
              <Bell className="w-6 h-6 text-white" />
            </button>
            <button className="p-2 rounded-full bg-emerald-500 bg-opacity-20 hover:bg-opacity-30 transition-all">
              <Shield className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>
      <div className="min-h-screen bg-gradient-to-r from-emerald-600 to-teal-600 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Balance Card */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Balance</p>
                  <p className="text-3xl font-bold mt-2">{balance.amount/100} PKR</p>
                </div>
                <div className="p-3 bg-purple-400 bg-opacity-20 rounded-full">
                  <Clock className="w-6 h-6" />
                </div>
              </div>
            </div>
            {/* Sent Money Card */}
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100">Total Sent</p>
                  <p className="text-3xl font-bold mt-2">{totalAmountSend} PKR</p>
                </div>
                <div className="p-3 bg-emerald-400 bg-opacity-20 rounded-full">
                  <ArrowUpRight className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Received Money Card */}
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Total Received</p>
                  <p className="text-3xl font-bold mt-2">{totalAmountRecieved} PKR</p>
                </div>
                <div className="p-3 bg-blue-400 bg-opacity-20 rounded-full">
                  <ArrowDownLeft className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 px-4 font-semibold text-gray-600">Transaction</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-600">Amount</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-600">Date & Time</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-600">Status</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-600">Bank</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionhistory.map((transaction) => (
                    <tr key={transaction.status} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-full ${
                            transaction.status === 'Processing' ? 'bg-red-100' : 'bg-green-100'
                          }`}>
                            {transaction.status === 'Processing' ? (
                              <ArrowDownLeft className="w-4 h-4 text-green-600" />
                            ) : (
                              <ArrowUpRight className="w-4 h-4 text-red-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {transaction.status === 'Processing' ? `To ${'abcd'}` : `From ${'xyz'}`}
                            </p>
                            <p className="text-sm text-gray-500">abcd</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`font-medium ${
                          transaction.status === 'Processing' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.status === 'Processing' ? '+' : '-'}${transaction.amount/100}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-gray-900">
                          {transaction.time.toISOString().split("T")[0]}
                        </p>
                        <p className="text-sm text-gray-500">
                          {transaction.time.toLocaleTimeString("en-GB", {hour: "2-digit",minute: "2-digit",hour12: false,})}
                        </p>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(transaction.status)}`}>
                          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-600">{transaction.provider}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;