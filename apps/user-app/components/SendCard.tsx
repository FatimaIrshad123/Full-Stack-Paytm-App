"use client"

import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTranser";
import { Send } from "lucide-react";

export function SendCard() {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    return ( 
        <div className="w-full">
            <Card title="Send Money">
                <div className="min-w-72 pt-2">
                    <TextInput placeholder={"Number"} label="Number" onChange={(value) => {setNumber(value)}} />
                    <TextInput placeholder={"Amount"} label="Amount" onChange={(value) => {setAmount(value)}} />
                    <div className="pt-4 flex justify-center">
                        <button onClick={async() => {await p2pTransfer(number, Number(amount))}}
                        disabled={!number || !amount}
                        className={`w-full py-2.5 px-4 rounded-lg text-white font-medium transition-all duration-200 ease-in-out
                        ${(!number || !amount)
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700'}`}>
                            <div className="flex items-center justify-center gap-2">
                                {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (<Send className="w-5 h-5" />)}
                                    <span>{isLoading ? 'Sending...' : 'Send Money'}</span>
                            </div>
                        </button>
                    </div>
                </div>
            </Card>
        </div>
    )
}