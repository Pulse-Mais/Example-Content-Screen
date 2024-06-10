// import { Check } from "@phosphor-icons/react";
import Link from "next/link"
import { Check } from "../utils/Icons"
import { Button } from "./Button";


interface ICardProps {
    _title?: string;
    duration?: number;
    description?: string;
    onClick: () => void;
}

export function Card({ _title, duration, description, onClick }: ICardProps) {
    return (
        <section className="flex flex-col bg-white rounded-xl shadow-md border-zinc-300 border-[1px] px-4 py-6 max-w-80 w-full h-fit">
            <div className="flex gap-2 items-center mb-4">
                <Check size={22} className="bg-green-400 rounded-full p-1" color="#fff" />
                <h3 className="font-medium">Título da aula</h3>
                <span className="ml-auto text-zinc-400">30min</span>
            </div>
            <p>(descrição) Aqui você começa a trilha desde o início, vendo todos os tópicos</p>

            <Button 
                _title="Acessar" 
                className="mt-2"
                onClick={onClick}
            />
        </section>
    )
}