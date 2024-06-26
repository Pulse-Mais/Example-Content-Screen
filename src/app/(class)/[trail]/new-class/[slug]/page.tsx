"use client"
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Header } from "@/app/(class)/components/Header";
import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal";
import { useClass } from "@/hooks/useClass";
import { IClass } from "@/@types/class.interface";
import { Loading } from "@/components/Loading";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createClassSchema } from "@/utils/schema";
import { LabelFloat } from "@/components/LabelFloat";
import { LabelFloatTextarea } from "@/components/LabelFloatTextArea";
import { zodResolver } from "@hookform/resolvers/zod";
import { DragDrop } from "@/components/DragDrop";
import axios from "axios";
import { Download, File as FileIcon, Pen, Trash } from "@phosphor-icons/react";
import { ControllerComponentClass } from "@/app/(class)/components/ControllerComponentClass";

type FormData = z.infer<typeof createClassSchema>;

export default function Page() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoadingClass, setIsLoadingClass] = useState(false);
    const [isSubmitting, setSubmitting] = useState(false);
    const [published, setPublished] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [file, setFile] = useState<File>()
    const [currentClass, setCurrentClass] = useState<IClass>();
    const { publishClass, updateClass, getTrailCass, trailId, deleteClass } = useClass();
    const router = useRouter();
    const currentPathname = usePathname();
    const currentPathnameArray = currentPathname.split("/");

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset
    } = useForm<FormData>({
        resolver: zodResolver(createClassSchema),
        mode: "onChange",
        values: {
            title: currentClass?.title || "",
            subtitle: currentClass?.subtitle || "",
            description: currentClass?.description || "",
            contentTime: "30"         
        }
    });


    async function onSubmit(data: FormData) {
        setSubmitting(true);
        await updateClass({ classId: currentPathnameArray[currentPathnameArray.length - 1] }, {
            newTitle: data.title,
            newSubtitle: data.subtitle,
            newDescription: data.description
        })
            .then(async (res) => {
                if(res.status == 200) {
                    await getTrailCass(currentPathnameArray[currentPathnameArray.length - 1]).then((response) => {
                        setCurrentClass(response);
                    });

                    if(file) {
                        var formData = new FormData();
                        formData.set("file", file as File);
            
                        await axios.put(`/app/new-class/api?tcid=${currentPathnameArray[currentPathnameArray.length - 1]}&tid=${trailId}`, formData, {
                            headers: {
                                "Content-Type": file?.type,
                            }
                        })
                    }
                }
            })
                .finally(() => {
                    setSubmitting(false);
                    setIsModalOpen(false);
                });
    }


    useEffect(() => {
        setIsLoadingClass(true);
        (async() => {
            await getTrailCass(currentPathnameArray[currentPathnameArray.length - 1])
                .then((response) => {
                    console.log(response)
                    setCurrentClass(response);
                })
                .finally(() => setIsLoadingClass(false));
        })();
    }, []);

    return (
        <>
            { !currentClass || isLoadingClass ? <div className="flex h-full flex-1"><Loading className="m-auto" /></div> : (
                <>
                    <Header _title={currentClass.title} onBack={() => {
                        setIsLoadingClass(true);
                    }} />
                    <div className="mt-2">
                        <p className="text-justify">{currentClass?.description}</p>
        
                        <ControllerComponentClass currentClass={currentClass} type={currentClass?.content?.type} />
                        
                        <h3 className="mt-4 text-zinc-500">Anexos</h3>
                        <hr />
                        <div className="flex items-center gap-2 p-2 mt-4 w-fit border-1 border-dashed border-zinc-400 rounded-md">
                            <FileIcon className="text-zinc-600" />
                            <p className="text-zinc-600">{'content.' + currentClass?.content.archiveExtension}</p>
                            <a className="ml-4" href={currentClass?.content.key}>
                                <Download />
                            </a>
                        </div>
        
                        <div className="flex gap-2 mt-3">
                            <Button
                                _title="Publicar aula"
                                loading={published}
                                onClick={async () => {
                                    setPublished(true)
                                    await publishClass(currentPathnameArray[currentPathnameArray.length - 1])
                                        .then(() => {
                                            router.replace(`/${trailId}/published-classes/${currentClass.id}`);
                                        })
                                            .finally(() => setPublished(false));
                                }}
                                disabled={currentClass?.content?.status !== "filled" || published}
                                className="mt-2"
                            />
                            <Button
                                _title="Editar"
                                disabled={published}
                                leftIcon={Pen}
                                onClick={() => setIsModalOpen(true)}
                                className="mt-2"
                            />
                            <Button 
                                _title="Deletar"
                                leftIcon={Trash}
                                disabled={published}
                                loading={isDeleting}
                                className="bg-red-500 mt-2 hover:outline-red-500"
                                onClick={() => setIsModalDeleteOpen(true)}
                            />
                        </div>

                        {
                            isModalDeleteOpen && (
                                <Modal onClose={() => setIsModalDeleteOpen(false)} className="min-h-fit h-fit">
                                    <h1 className="font-semibold text-2xl text-center">Deletar {currentClass.title}</h1>
                                    <p className="text-center mt-2">Tem certeza que deseja deletar essa aula?</p>
                                    <div className="flex gap-2 mt-4 justify-end">
                                        <Button _title="Sim" onClick={async () => {
                                            setIsDeleting(true);
                                            await deleteClass(currentClass.id)
                                                .then(() => {
                                                    router.back();
                                                })
                                                    .finally(() => setIsDeleting(false));
                                        }} className="bg-red-500 hover:outline-red-500" />
                                        <Button _title="Não" onClick={() => setIsModalDeleteOpen(false)} />
                                    </div>
                                </Modal>
                            )
                        }

                        {
                            isModalOpen && (
                                <Modal onClose={() => {
                                    setIsModalOpen(false);
                                    reset({
                                        title: currentClass?.title || "",
                                        subtitle: currentClass?.subtitle || "",
                                        description: currentClass?.description || "",
                                        contentTime: "30"
                                    });
                                }}>
                                    <h1 className="font-semibold text-2xl text-center">Editar {currentClass.title}</h1>

                                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 mt-4">
                                        <LabelFloat _title="Título" labelBackground="bg-white" register={register("title")} error={errors.title?.message} />
                                        <LabelFloat _title="Subtítulo" labelBackground="bg-white" register={register("subtitle")} error={errors.subtitle?.message} />
                                        <LabelFloatTextarea _title="Descrição" labelBackground="bg-white" register={register("description")} error={errors.description?.message} />
                                        <DragDrop onFileSelect={setFile} className="my-0 mt-2" />

                                        <Button type="submit" loading={isSubmitting} disabled={!watch("title") || !watch("subtitle") || !watch("description") || !!(errors.title?.message) || !!(errors.subtitle?.message) || !!(errors.description?.message) || isSubmitting} _title="Salvar" className="mt-4 w-full flex justify-center" />
                                        <Button type="button" disabled={isSubmitting} onClick={() => setIsModalOpen(false)} _title="Fechar" className="mt-1 w-full flex justify-center bg-transparent text-zinc-700 hover:bg-zinc-100 hover:outline-zinc-100" />
                                    </form>
                                </Modal>
                            )
                        }
                    </div>
                </>
            )}
        </>
    )
}