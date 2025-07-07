"use client"
import React from 'react'
import { useRouter } from 'next/navigation'

const ItemCard = ({ item }) => {
    const router = useRouter();
    return (
        <div
            onClick={() => router.push(item.path)}
            className="cursor-pointer bg-white rounded-sm shadow-md p-6 transition-transform hover:shadow-lg border border-gray-100 flex flex-col items-start min-h-[220px] w-full max-w-xs mx-auto select-none group"
            style={{ boxSizing: 'border-box' }}
        >
            <div className="bg-orange-100 rounded-lg p-2 mb-4 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                {item?.icon}
            </div>
            <div className="mb-2">
                <div className="font-semibold text-lg text-gray-900 mb-1">{item.title || item.name}</div>
                <div className="text-gray-500 text-sm leading-snug">{item.description}</div>
            </div>
        </div>
    )
}

export default ItemCard