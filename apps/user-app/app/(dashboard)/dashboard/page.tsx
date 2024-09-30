import { Card } from "@repo/ui/card"

export default function() {
    return <div className="w-10/12 pr-10">
        <div className="text-4xl text-[#6c51aa] pt-8 mb-8 font-bold">
            Your Dashboard
        </div>
        <div className="border bg-white rounded-xl p-5">
            <h1 className='text-gray-600'>Portfolio value</h1>
            <h1 className="flex font-semibold text-black text-3xl">
                <p className='text-gray-600 '>$</p>0.00
            </h1>
            <div className="pb-20">
                <h1 className="border-b-2 border-[#6c51aa] pt-20 text-gray-600">
                $0.00
                </h1>
                <h1 className='float-right text-gray-600'>
                $0.00
                </h1>
            </div>
        </div>
    </div>
}