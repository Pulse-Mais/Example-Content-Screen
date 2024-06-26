'use client'
import { useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Card } from "@/components/Card";
import { Header } from "../../components/Header";
import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal";
import { createClassSchema } from "@/utils/schema";
import { LabelFloat } from "@/components/LabelFloat";
import { LabelFloatTextarea } from "@/components/LabelFloatTextArea";
import { useClass } from "@/hooks/useClass";
import noContent from "@/assets/no_content.svg"
import Image from "next/image";
import { DragDrop } from "@/components/DragDrop";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";

type FormData = z.infer<typeof createClassSchema>;

export default function NewClass() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [file, setFile] = useState<File>();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const currentPathname = usePathname();
    const { createClass, allClasses, trailId } = useClass();
    const classStatusNotPublished = allClasses.filter(classData => classData.status == "not-published")

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset
    } = useForm<FormData>({
        resolver: zodResolver(createClassSchema),
        mode: "onChange"
    });

    async function onSubmit(data: FormData) {
        setIsLoading(true);
        var classId = await createClass(data);
        
        if(classId.status != 200) {
            // setIsLoading(false);
            return;
        }

        var formData = new FormData();
        formData.set("file", file as File);

        await axios.put(`/app/new-class/api?tcid=${classId.data.idTrail}&tid=${trailId}`, formData, {
            headers: {
                "Content-Type": file?.type,
            }
        })
            .then((res) => {
                if(res.status == 200) {
                    setTimeout(() => {
                        router.push(`${currentPathname}/${classId.data.idTrail}`);
                    }, 2500)
                }
            });
    }

    
    return (
        <>
            <Header _title="Novas aulas" />
            <Button className="my-1" _title="Criar nova aula" onClick={() => setIsModalOpen(true)}/>
                { 
                    classStatusNotPublished.length == 0 ? (
                        <div className="flex flex-col justify-center items-center h-full">
                            <Image src={noContent} alt="Sem conteúdo" />
                            <p className="text-center">Nenhuma aula publicada</p>
                        </div>
                    ) : (
                            <div className="mt-2 grid grid-cols-auto-fill-250 gap-4">
                                {
                                    classStatusNotPublished.map((classData) => (
                                        <Card 
                                            key={classData.id} 
                                            onClick={() => {
                                                router.push(`${currentPathname}/${classData.id}`);
                                            }}  
                                            _title={classData.title} 
                                            description={classData.description}
                                            duration={30}
                                            status={classData.status}
                                        />
                                    ))
                                }
                            </div>
                        )
                }

            {
                isModalOpen && (
                    <Modal onClose={() => {
                        setIsModalOpen(false);
                        reset({
                            title: "",
                            subtitle: "",
                            description: "",
                            contentTime: ""
                        })
                    }}>
                        <h1 className="font-semibold text-2xl text-center">Cadastrar nova aula</h1>

                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 mt-4">
                            <LabelFloat _title="Título" labelBackground="bg-white" register={register("title")} error={errors.title?.message} />
                            <LabelFloat _title="Subtítulo" labelBackground="bg-white" register={register("subtitle")} error={errors.subtitle?.message} />
                            <LabelFloatTextarea _title="Descrição" labelBackground="bg-white" register={register("description")} error={errors.description?.message} />
                            <LabelFloat type="number" _title="Tempo total de conteúdo (Em minutos)" labelBackground="bg-white" register={register("contentTime")} error={errors.contentTime?.message} />
                            <DragDrop onFileSelect={setFile} className="my-0 mt-2" />

                            <Button type="submit" loading={isLoading} disabled={!watch("title") || !watch("subtitle") || !watch("description") || !!(errors.title?.message) || !!(errors.subtitle?.message) || !!(errors.description?.message) || !!(errors.contentTime?.message) || !file || isLoading} _title="Criar" className="mt-4 w-full flex justify-center" />
                            <Button type="button" disabled={isLoading} onClick={() => setIsModalOpen(false)} _title="Fechar" className="mt-1 w-full flex justify-center bg-transparent text-zinc-700 hover:bg-zinc-100 hover:outline-zinc-100" />
                        </form>
                    </Modal>
                )
            }


        </>
    )
}