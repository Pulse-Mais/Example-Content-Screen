import { IconProps } from "@phosphor-icons/react";
import React from "react";
import { twMerge } from "tailwind-merge";
import { Spin } from "./Spin";


interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    _title: string;
    leftIcon?: React.FC<IconProps> ;
    loading?: boolean;
}

export function Button({ _title, leftIcon: LIcon, loading, ...rest } : IButtonProps) {
    return (
        <button {...rest} className={twMerge("flex items-center gap-2 bg-midnight-blue-950 text-zinc-50 p-2 px-4 rounded-md hover:outline hover:outline-2 hover:outline-blue-800 hover:outline-offset-2 disabled:!outline-none disabled:cursor-not-allowed duration-100 transition-all disabled:text-gray-300 disabled:bg-opacity-90", rest.disabled && "hover:bg-blue-800", rest.className)}>
            {loading && <Spin />}
            {LIcon && !loading && <LIcon size={22} />}
            {_title}
        </button>
    )
}