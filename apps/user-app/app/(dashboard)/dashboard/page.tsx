import { getBalance } from "../../lib/actions/getBalance"

export default async function() {
    const balance = await getBalance();

    return <div className="w-10/12 pr-10">
        <div className="text-4xl text-[#6c51aa] pt-8 mb-8 font-bold">
            Your Dashboard
        </div>
        <div className="border bg-white rounded-xl p-5">
            <h1 className='text-gray-600'>Portfolio value</h1>
            <h1 className="flex font-semibold text-black text-3xl">
                <p className='text-gray-800 font-medium '>Rs.</p>{balance.amount / 100}
            </h1>
            <div className="pb-20">
                <h1 className="border-b-2 border-[#6c51aa] pt-20 text-gray-600">
                Rs. {balance.amount / 100}
                </h1>
                <h1 className='float-right text-gray-600'>
                Rs. {balance.amount / 100}
                </h1>
            </div>
        </div>
    </div>
}