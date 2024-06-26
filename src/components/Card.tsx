// import { Check } from "@phosphor-icons/react";
import Link from "next/link"
import { Check } from "../utils/Icons"
import { Button } from "./Button";
import { twMerge } from "tailwind-merge";


interface ICardProps {
    _title: string;
    duration: number;
    description: string;
    onClick: () => void;
    status: "published" | "not-published";
}

export function Card({ _title, duration, description, onClick, status }: ICardProps) {
    return (
        <section className="flex flex-col bg-white rounded-xl shadow-md border-zinc-300 border-[1px] px-4 py-6 max-w-80 w-full h-44">
            <div className="flex gap-2 items-center mb-2">
                <Check size={22} className={twMerge("rounded-full p-1", status == "published" ? "bg-green-400 text-white" : "bg-zinc-200 text-zinc-500")} />
                <h3 className="font-medium line-clamp-1 overflow-hidden text-ellipsis" title={_title}>{_title}</h3>
                <span className="ml-auto text-zinc-400">{duration}min</span>
            </div>
            <p title={description} className="line-clamp-2 overflow-hidden text-ellipsis">{description}</p>

            <Button 
                _title="Acessar" 
                className="mt-auto"
                onClick={onClick}
            />
        </section>
    )
}