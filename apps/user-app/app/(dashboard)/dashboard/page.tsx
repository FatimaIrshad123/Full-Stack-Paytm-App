import Greeting from "../../../components/Greeting";
import { getBalance } from "../../lib/actions/getBalance"
import {Wallet} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function() {
    const balance = await getBalance();
    const greeting = Greeting();
    
    return (
        <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
            <h2 className="text-4xl text-teal-800 pt-8 mb-8 font-bold">{greeting}</h2>
            <div className="bg-gradient-to-r from-emerald-600 to-teal-800 text-white border rounded-xl shadow-lg p-6">
                <h2 className="text-lg">Portfolio Value</h2>
                <div className="flex items-center space-x-2 text-4xl font-bold">
                    <Wallet className="text-white" />
                    <span>Rs. {balance.amount / 100}</span>
                </div>
            <div className="pb-10">
                <h1 className="border-b-2 border-white pt-20 text-white">
                    Rs. {balance.amount / 100}
                </h1>
                <h1 className='float-right text-white'>
                    Rs. {balance.amount / 100}
                </h1>
            </div>
        </div>
    </div>
)}