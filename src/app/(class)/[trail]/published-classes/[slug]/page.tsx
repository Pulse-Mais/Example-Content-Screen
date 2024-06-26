"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { Header } from "../../../components/Header";
import { Button } from "@/components/Button";
import noContent from "@/assets/no_content.svg"
import { DragDrop } from "@/components/DragDrop";
import { Modal } from "@/components/Modal";
import { useClass } from "@/hooks/useClass";
import { usePathname, useRouter } from "next/navigation";
import { IClass } from "@/@types/class.interface";
import { Loading } from "@/components/Loading";
import { MuxPlayerInternal } from "@/components/MuxPlayer";
import { Download, File } from "@phosphor-icons/react";
import { ControllerComponentClass } from "@/app/(class)/components/ControllerComponentClass";

export default function Page() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentClass, setCurrentClass] = useState<IClass>();
    const [file, setFile] = useState<File>();
    const [isLoading, setIsLoading] = useState(false);
    const { getTrailCass } = useClass();
    const currentPathname = usePathname();
    const currentPathnameArray = currentPathname.split("/");

    useEffect(() => {
        setIsLoading(true);
        (async() => {
            await getTrailCass(currentPathnameArray[currentPathnameArray.length - 1]).then((response) => {
                setCurrentClass(response);
            })
                .finally(() => setIsLoading(false));
        })();
    }, []);

    return (
        <>
            { !currentClass ? <div className="flex h-full flex-1"><Loading className="m-auto" /></div> : (
                <>
                    <Header _title={currentClass.title} onBack={() => {
                        setIsLoading(true);
                    }} />
                   
                   {
                    isLoading ? <div className="flex h-full flex-1"><Loading className="m-auto" /></div> : (
                        <div className="mt-2">
                            <p>{currentClass?.description}</p>

                            {
                                currentClass?.content?.status == "empty" || currentClass?.content?.status == "in-upload" ? (
                                    <div className="flex flex-col items-center gap-4 py-8 px-16 bg-zinc-200 rounded-lg max-w-2xl mt-4">
                                        <Image src={noContent} alt="No content" width={286} height={222} />
                                        <Button className="mt-4" _title="Adicionar conteúdo" disabled={currentClass.content.status == "in-upload"} onClick={() => setIsModalOpen(true)} />
                                        {/* <p className="ml-2">{currentClass.content.status == "in-upload" ? "Conteúdo cadastrado" : ""}</p> */}
                                    </div>
                                ) : (
                                    <ControllerComponentClass currentClass={currentClass} type={currentClass?.content?.type} />
                                )
                            }

                            <h3 className="mt-4 text-zinc-500">Anexos</h3>
                            <hr />
                            <div className="flex items-center gap-2 p-2 mt-4 w-fit border-1 border-dashed border-zinc-400 rounded-md">
                                <File className="text-zinc-600" />
                                <p className="text-zinc-600">{'content.' + currentClass?.content.archiveExtension}</p>
                                <a className="ml-4" href={currentClass?.content.key}>
                                    <Download />
                                </a>
                                {/* {currentClass?.file?.map((attachment, index) => (
                                    <div key={index} className="flex items-center gap-2 py-2">
                                        <FileIcon className="w-6 h-6" />
                                        <p>{attachment.name}</p>
                                        <button className="flex items-center gap-2 bg-blue-500 text-white px-2 py-1 rounded-md">
                                            <DownloadIcon className="w-4 h-4" />
                                            <span>Download</span>
                                        </button>
                                    </div>
                                ))} */}
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    )
}