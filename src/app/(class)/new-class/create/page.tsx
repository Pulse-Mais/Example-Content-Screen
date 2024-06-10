"use client"
import Link from "next/link";
import { LabelFloat } from "@/components/LabelFloat";
import { CaretLeft } from "@/utils/Icons";
import { LabelFloatTextarea } from "@/components/LabelFloatTextArea";
import { Button } from "@/components/Button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createClassSchema } from "@/utils/schema";
import { createRef, useEffect, useRef } from "react";


type FormData = z.infer<typeof createClassSchema>;

export default function Page() {
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm<FormData>();

    function onSubmit(data: FormData) {
        // event.preventDefault();
        console.log(data)
    }

    return (
        <div>
            <Link href="./" className="flex items-center gap-2">
                <CaretLeft />
                <span>Voltar</span>
            </Link>
            <h1 className="font-semibold text-2xl ml-6">Cadastrar nova aula</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 mt-4">
                <LabelFloat _title="Título" register={register("title")} />
                <LabelFloat _title="Subtítulo" register={register("subtitle")} />
                <LabelFloatTextarea _title="Descrição" register={register("description")} />

                <Button type="submit" disabled={!watch("title") || !watch("subtitle") || !watch("description")} _title="Salvar e continuar" className="mt-4 max-w-96 w-full" />
            </form>
            
        </div>
    )
}