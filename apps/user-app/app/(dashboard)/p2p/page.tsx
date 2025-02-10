import prisma from "@repo/db/client";
import { SendCard } from "../../../components/SendCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { P2pTransers } from "../../../components/P2pTransfers";
import { Bell, Shield } from "lucide-react";

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

export default async function (){
    const transfers = await getOnRampTransfers();
    
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-32 bg-gray-50 mt-5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 shadow-emerald-300 shadow-lg mb-5">
            {/*Topbar*/}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl shadow-xl p-8 mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">Person to Person Transfer Money</h1>
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
            <div>
                <SendCard />
                <div className="pt-4">
                    <P2pTransers transfer={transfers}/>                
                </div>
            </div>
        </div>
    )
}