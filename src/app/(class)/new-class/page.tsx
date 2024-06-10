'use client'
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Card } from "@/components/Card";
import { Header } from "../components/Header";
import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal";
import { createClassSchema } from "@/utils/schema";
import { LabelFloat } from "@/components/LabelFloat";
import { LabelFloatTextarea } from "@/components/LabelFloatTextArea";
import { useClass } from "@/hooks/useClass";

type FormData = z.infer<typeof createClassSchema>;

export default function NewClass() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();
    const currentPathname = usePathname();
    const { setTrailId, createClass } = useClass();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm<FormData>();

    function onSubmit(data: FormData) {
        console.log(data);
    }

    return (
        <>
            <Header _title="Novas aulas" />
            <Button className="ml-6 my-1" _title="Criar nova aula" onClick={() => setIsModalOpen(true)}/>
            <div className="mt-2 ml-6 grid grid-cols-auto-fill-250 gap-4">
                <Card onClick={() => {
                    router.push(`${currentPathname}/hello-world`);
                    setTrailId("hello-world");
                }} />
            </div>

            {
                isModalOpen && (
                    <Modal onClose={() => setIsModalOpen(false)}>
                        <h1 className="font-semibold text-2xl text-center">Cadastrar nova aula</h1>

                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 mt-4">
                            <LabelFloat _title="Título" labelBackground="bg-white" register={register("title")} />
                            <LabelFloat _title="Subtítulo" labelBackground="bg-white" register={register("subtitle")} />
                            <LabelFloatTextarea _title="Descrição" labelBackground="bg-white" register={register("description")} />

                            <Button type="submit" disabled={!watch("title") || !watch("subtitle") || !watch("description")} _title="Salvar e continuar" className="mt-4 max-w-96 w-full" onClick={() => {
                                createClass({
                                    title: watch("title"),
                                    subtitle: watch("subtitle"),
                                    description: watch("description")
                                }).then((response) => {
                                    setIsModalOpen(false);
                                    router.push(`${currentPathname}/${response.data.id}`);
                                });
                            }} />
                        </form>
                    </Modal>
                )
            }


        </>
    )
}