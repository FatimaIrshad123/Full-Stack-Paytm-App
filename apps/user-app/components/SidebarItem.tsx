'use client'
import React from "react";
import { usePathname, useRouter } from "next/navigation";

export const SidebarItem = ({ href, title, icon }: { href: string; title: string; icon: React.ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname();
    const selected = pathname === href;

    return (
        <div
            onClick={() => router.push(href)}
            className={`
                group relative flex items-center gap-3 px-8 py-3 cursor-pointer
                transition-all duration-200 ease-in-out
                ${selected 
                    ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-r-4 border-teal-600' 
                    : 'hover:bg-gradient-to-r hover:from-emerald-50/50 hover:to-teal-50/50'
                }
            `}
        >
            {/* Hover effect line */}
            <div className={`
                absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-emerald-600 to-teal-800
                transform transition-all duration-200
                ${selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}
            `} />

            {/* Icon wrapper */}
            <div className={`
                flex items-center justify-center
                transition-colors duration-200
                ${selected ? 'text-teal-700' : 'text-gray-500 group-hover:text-teal-600'}
            `}>
                {icon}
            </div>

            {/* Title */}
            <div className={`
                font-medium
                transition-colors duration-200
                ${selected 
                    ? 'text-teal-800 font-semibold' 
                    : 'text-gray-600 group-hover:text-teal-700'
                }
            `}>
                {title}
            </div>

            {/* Active indicator dot */}
            {selected && (
                <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-teal-600" />
            )}
        </div>
    );
};
