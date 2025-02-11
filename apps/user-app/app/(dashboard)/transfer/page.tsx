import prisma from "@repo/db/client";
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { getBalance } from "../../lib/actions/getBalance";
import {Wallet,Clock, Bell, Shield, ArrowRight, CreditCard} from "lucide-react";

export const dynamic = "force-dynamic";

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

export default async function() {
  const balance = await getBalance();
  const transactions = await getOnRampTransactions();
    
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-gray-50 mt-5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 shadow-emerald-300 shadow-lg mb-5">
      {/*Topbar*/}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl shadow-xl p-8 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Transfer Money</h1>
            <p className="text-emerald-100">Quick, secure, and reliable transfers</p>
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

     {/*Body Section*/}
      <div className="lg:col-span-2 space-y-6">
        {/*AddMoney Section*/}
        <div className="p-6 bg-gradient-to-r from-emerald-50 to-teal-100 rounded-lg mb-5">
            <AddMoney />    
        </div>
        {/*Balance & Transaction Section*/}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/*Balance Section*/}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gradient-to-r from-emerald-50 to-teal-300 rounded-xl border border-gray-200 overflow-hidden">
            <BalanceCard amount={balance.amount} locked={balance.locked} />
            </div>
          </div>
          {/*Transaction Section*/}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-r from-emerald-50 to-teal-100 rounded-xl border border-gray-200">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
                  <Clock className="w-5 h-5 text-gray-500" />
                </div>
                <div className="space-y-4">
                  <OnRampTransactions transactions={transactions} />
                </div>
              </div>
            </div>
        </div>
      </div>
      
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'Send Money', icon: ArrowRight },
              { title: 'Add Card', icon: CreditCard },
              { title: 'View History', icon: Clock }
            ].map((action, index) => (
              <div key={index} className="bg-white hover:bg-gray-50 cursor-pointer transition-all">
                <div className="p-6 flex items-center space-x-4">
                  <div className="p-3 rounded-full bg-emerald-100">
                    <action.icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <span className="font-medium">{action.title}</span>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 mb-12">
        <div className="bg-gradient-to-r from-emerald-50 to-teal-100 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <Wallet className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Transfer Tips</h3>
              <p className="mt-1 text-gray-600">
                For secure transfers, always verify recipient details and use two-factor authentication. 
                Need help? Our support team is available 24/7.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}