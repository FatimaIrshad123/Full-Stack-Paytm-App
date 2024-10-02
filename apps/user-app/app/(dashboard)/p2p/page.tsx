import prisma from "@repo/db/client";
import { SendCard } from "../../../components/SendCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { P2pTransers } from "../../../components/P2pTransfers";

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

export default async function (){
    const transfers = await getOnRampTransfers();
    
    return (
    <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-2 p-4 mt-20">
        <div className="">
            <SendCard />
        </div>
        <div>
            <div className="pt-4">
                <P2pTransers transfer={transfers}/>                
            </div>
        </div>
    </div>
    )
}