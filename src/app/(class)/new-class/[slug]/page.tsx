"use client"
import Image from "next/image";
import { use, useState } from "react";
import { Header } from "../../components/Header";
import { Button } from "@/components/Button";
import noContent from "@/assets/no_content.svg"
import { DragDrop } from "@/components/DragDrop";
import { Modal } from "@/components/Modal";
import { useClass } from "@/hooks/useClass";

export default function Page() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [file, setFile] = useState<File>();
    const { setTrailId } = useClass();
    const { createContentClass, unlockClass } = useClass();

    
    return (
        <>
            <Header _title="Título da aula" onBack={() => setTrailId("")}  />
            <div className="ml-6 mt-2">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit aperiam dolore expedita nostrum error, numquam distinctio dicta fuga earum iure recusandae nulla aut, doloribus vitae?</p>

                <h4 className="font-semibold text-xl">Conteúdo</h4>
                <p>Nenhum conteúdo associado à aula.</p>
                
                <div className="flex flex-col items-center gap-4 py-8 px-16 bg-zinc-200 rounded-lg max-w-2xl mt-4">
                    <Image src={noContent} alt="Sem conteúdo" />
                    <Button className="mt-4" _title="Adicionar conteúdo" onClick={() => setIsModalOpen(true)} />
                </div>

                <div>
                    <Button 
                        _title="Publicar aula"
                        onClick={() => unlockClass("hello-world")}
                    />
                </div>

                { isModalOpen && (
                    <Modal onClose={() => setIsModalOpen(false)}>
                        <h1 className="text-center text-2xl font-semibold">Cadastrar conteúdo</h1>
                        <DragDrop onFileSelect={setFile} />
                        <Button _title="Salvar" className="mt-2 w-full" disabled={!file} onClick={() => {
                            if(!file) createContentClass("classId", file);
                        }}/>
                    </Modal>
                )}
            </div>
        </>
    )
}