"use client";

import { forwardRef, useRef } from "react";
import { UseFormRegister, UseFormRegisterReturn } from "react-hook-form";
import { ClassNameValue, twMerge } from "tailwind-merge";

interface ILabelFloatProps extends React.InputHTMLAttributes<HTMLInputElement> {
    _title: string;
    register: UseFormRegisterReturn<any>;
    labelBackground?: string;
}

export function LabelFloat({ _title, name, register, labelBackground, ...rest } : ILabelFloatProps) {
    return (
        <div className="relative">
            <input id={name || register.name} className="text-zinc-700 w-full max-w-96 text-base bg-transparent border-1 border-zinc-300 rounded outline-none p-2 focus:border-midnight-blue-950 peer" placeholder=" " {...rest} {...register} />
            <label className={twMerge("absolute text-zinc-600 left-1 -top-2 bg-zinc-100 px-2 h-fit text-sm duration-150 font-medium transition-all peer-focus:font-medium peer-focus:text-sm peer-focus:-top-2 peer-focus:text-midnight-blue-950 peer-placeholder-shown:font-normal peer-placeholder-shown:top-2 peer-placeholder-shown:text-base", labelBackground)} htmlFor={name || register.name}>{_title}</label>
        </div>
    )
}