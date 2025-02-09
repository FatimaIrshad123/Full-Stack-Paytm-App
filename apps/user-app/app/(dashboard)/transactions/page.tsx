
import React, {  } from 'react';
import { 
  ArrowUpRight, ArrowDownLeft, Search, Calendar,
  Filter, Download, ChevronDown, Clock
} from 'lucide-react';
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
    //console.log('session',session);
    //console.log('txns',txns);
    return txns.map(t => ({
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
    return txns.map(t => ({
        timeStamp: t.timestamp,
        amount: t.amount,
        fromUserId: t.fromUserId,
        toUserId: t.toUserId
    })
)}
//getOnRampTransactions()

const TransactionHistory = async() => {
    const balance = await getBalance();
    console.log('balance',balance)
    const transactionhistory = await getOnRampTransactions();
    console.log('transactionhistory',transactionhistory);

    const transferhistory = await getOnRampTransfers();
    console.log('transferhistory',transferhistory);
    
    const totalAmountRecieved = transactionhistory.reduce((sum, x) => sum + x.amount / 100, 0);
    const totalAmountSend = transferhistory.reduce((sum, x) => sum + x.amount / 100, 0);

  //const [selectedFilter, setSelectedFilter] = useState('all');
  //const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  
  // Sample transaction data
  const transactions = [
    {
      id: 1,
      type: 'sent',
      amount: 1250.00,
      recipient: 'John Doe',
      status: 'completed',
      date: '2025-02-09',
      time: '14:30',
      reference: 'TRX-001',
      category: 'Transfer'
    },
    {
      id: 2,
      type: 'received',
      amount: 850.00,
      sender: 'Alice Smith',
      status: 'completed',
      date: '2025-02-09',
      time: '12:15',
      reference: 'TRX-002',
      category: 'Payment'
    },
    {
      id: 3,
      type: 'sent',
      amount: 75.50,
      recipient: 'Coffee Shop',
      status: 'pending',
      date: '2025-02-08',
      time: '09:45',
      reference: 'TRX-003',
      category: 'Purchase'
    }
  ];

  const getStatusColor = (status:any) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-100 text-emerald-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'failed':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Transaction History</h1>
          <p className="mt-2 text-gray-600">View and manage your financial activities</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Balance Card */}
          <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Balance</p>
                <p className="text-3xl font-bold mt-2">{balance.amount/100}PKR</p>
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
                <p className="text-3xl font-bold mt-2">{totalAmountSend}PKR</p>
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
                <p className="text-3xl font-bold mt-2">{totalAmountRecieved}PKR</p>
              </div>
              <div className="p-3 bg-blue-400 bg-opacity-20 rounded-full">
                <ArrowDownLeft className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm mb-8 p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-4 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
              </div>
              
              {/* Custom Select Dropdown */}
              <div className="relative">
                <button 
                 // onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                  className="w-40 px-4 py-2 border rounded-lg bg-white flex items-center justify-between hover:bg-gray-50"
                >
                  {/*<span>{selectedFilter === 'all' ? 'All Types' : selectedFilter}</span>*/}
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {/*{showFilterDropdown && (
                  <div className="absolute top-full mt-1 w-40 bg-white border rounded-lg shadow-lg z-10">
                    <div className="py-1">
                      {['all', 'sent', 'received'].map((filter) => (
                        <button
                          key={filter}
                          onClick={() => {
                            setSelectedFilter(filter);
                            setShowFilterDropdown(false);
                          }}
                          className="w-full px-4 py-2 text-left hover:bg-gray-50 capitalize"
                        >
                          {filter === 'all' ? 'All Types' : filter}
                        </button>
                      ))}
                    </div>
                  </div>
                )}*/}
              </div>
            </div>
            
            <div className="flex gap-4 w-full md:w-auto">
              <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                <Calendar className="w-4 h-4" />
                <span>Date Range</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
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
                  <th className="text-left py-4 px-4 font-semibold text-gray-600">Reference</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${
                          transaction.type === 'sent' ? 'bg-red-100' : 'bg-green-100'
                        }`}>
                          {transaction.type === 'sent' ? (
                            <ArrowUpRight className="w-4 h-4 text-red-600" />
                          ) : (
                            <ArrowDownLeft className="w-4 h-4 text-green-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {transaction.type === 'sent' ? `To ${transaction.recipient}` : `From ${transaction.sender}`}
                          </p>
                          <p className="text-sm text-gray-500">{transaction.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`font-medium ${
                        transaction.type === 'sent' ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {transaction.type === 'sent' ? '-' : '+'}${transaction.amount.toFixed(2)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-gray-900">{transaction.date}</p>
                      <p className="text-sm text-gray-500">{transaction.time}</p>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(transaction.status)}`}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-600">{transaction.reference}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-6 border-t flex items-center justify-between">
            <p className="text-sm text-gray-600">Showing 1 to 3 of 50 entries</p>
            <div className="flex gap-2">
              <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50">
                Previous
              </button>
              <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;