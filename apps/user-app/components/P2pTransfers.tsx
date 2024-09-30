import { Card } from "@repo/ui/card"

export const P2pTransers = ({
    transfer
}: {
    transfer: {
        timeStamp: Date,
        amount: number,
        fromUserId: number,
        toUserId: number
        // TODO: Can the type of `status` be more specific?
    }[]
}) => {
    if (!transfer.length) {
        {console.log(transfer)}
        return <Card title="Recent Transfer">
            <div className="text-center pb-8 pt-8">
                No Recent transfer
            </div>
        </Card>
    }
    return <Card title="Recent Transfers">
        <div className="pt-2">
            {transfer.map(t => <div className="flex justify-between">
                <div>
                    <div className="text-sm">
                        Sent INR
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.timeStamp.toDateString()}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    + Rs {t.amount / 100}
                </div>
            </div>)}
        </div>
    </Card>
}