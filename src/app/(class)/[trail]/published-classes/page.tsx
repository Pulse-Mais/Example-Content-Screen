"use client";
import { Card } from "@/components/Card";
import { Header } from "../../components/Header";
import { useClass } from "@/hooks/useClass";
import noContent from "@/assets/no_content.svg"
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect } from "react";


export default function Page() {
    const router = useRouter();
    const currentPathname = usePathname();
    const { allClasses } = useClass();
    const classStatusPublished = allClasses.filter(classData => classData.status == "published")

    return (
        <>
            <Header _title="Aulas publicadas" />
            { 
                classStatusPublished.length == 0 ? (
                    <div className="flex flex-col justify-center items-center h-full">
                        <Image src={noContent} alt="Sem conteúdo" />
                        <p className="text-center">Nenhuma aula publicada</p>
                    </div>
                ) : (
                    <div className="mt-2 ml-6 grid grid-cols-auto-fill-250 gap-4">
                        {
                            classStatusPublished.map((classData) => (
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
        </>
    )
}