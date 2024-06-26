"use client"
import { IClass, ICreateClass, ISetTrailClassContentInput } from "@/@types/class.interface";
import { api } from "@/utils/api";
import axios, { AxiosResponse } from "axios";
import { createContext, useEffect, useState } from "react";

interface IClassCtx {
    trailId: string;
    setTrailId: (trailId: string) => void;
    getTrailClasses: () => Promise<IClass[]>;
    getTrailCass: (classId: string) => Promise<IClass>;
    createClass: (classData: ICreateClass) => Promise<AxiosResponse<any, any>>;
    createContentClass: (classId: string, content: File) => void;
    createContentVideoClass: (classId: string, content: File) => void;
    deleteClass: (classId: string) => Promise<AxiosResponse<any, any>>;
    updateClass: ({ classId }: { classId: string }, data: { newTitle: string, newSubtitle: string, newDescription: string }) => Promise<AxiosResponse<any, any>>;
    publishClass: (classId: string) => Promise<AxiosResponse<any, any>>;
    allClasses: IClass[];
}

export const ClassContext = createContext<IClassCtx>({} as IClassCtx);

export function ClassProvider({ children }: { children: React.ReactNode }) {
    const [trailId, setTrailId] = useState<string>("9f1ac661-2d1f-4dbd-93ec-5a0c232f361b");
    const [allClasses, setAllClasses] = useState<IClass[]>([]);

    async function getTrailClasses(): Promise<IClass[]> {
        await api.get(`/trail/${trailId}/trail-classes`).then((response) => {
            setAllClasses(response.data.trailClasses);
        });

        return allClasses;
    }

    async function getTrailCass(classId: string) {
        const trailClass = await api.get(`/trail/${trailId}/trail-class/${classId}`);

        return trailClass.data.trailClass;
    }

    async function createClass(classData: ICreateClass): Promise<AxiosResponse<any, any>> {
        const contentClass = await api.post(`/create-trail-class/${trailId}`, classData);        
        
        return contentClass;
    }

    async function createContentClass(classId: string, content: File) {
        console.log(content.type.split("/")[1])
        var uploadContent = await api.post(`/create-trail-class-content/archive/${trailId}/${classId}`, {
            archiveExtension: content.type.split("/")[1],
            type: "archive",
        }).then(async (response) => {
            if(response.status == 200) {
                api.put(response.data.url, content, {
                    headers: {
                        "Content-Type": content.type
                    }
                }).then((response) => {
                    if(response.status !== 200) {
                        alert("Erro ao enviar arquivo. Tente novamente.")
                    }
                })
            }
        })
        

        return uploadContent;
    }

    async function createContentVideoClass(classId: string, content: File) {
        var uploadContent = await api.post(`/create-class-content/video/${trailId}/${classId}`, content)

        return uploadContent;
    }

    async function updateClass({ classId }: { classId: string }, data: { newTitle: string, newSubtitle: string, newDescription: string }): Promise<AxiosResponse<any, any>> {
        const updateClass = await api.put(`/update-trail-class/${trailId}/${classId}`, data).then((res) => {
            res.status == 200 && getTrailClasses();

            return res;
        });

        return updateClass;
    }

    async function deleteClass(classId: string): Promise<AxiosResponse<any, any>> {
        return await api.put(`/delete-trail-class/${trailId}/${classId}`)
            .then((res) => {
                getTrailClasses();

                return res;
            });
    }

    async function publishClass(classId: string): Promise<AxiosResponse<any, any>> {
        const publish = await api.put(`/publish-trail-class/${trailId}/${classId}`)
            .then((res) => {
                getTrailClasses();

                return res;
            });

        return publish;
    }

    useEffect(() => {
        console.log("context")
        getTrailClasses();
    }, []);

    return (
        <ClassContext.Provider
            value={{
                trailId, setTrailId,
                getTrailClasses, createClass, createContentClass, updateClass, publishClass,
                createContentVideoClass, getTrailCass, deleteClass,
                allClasses

            }}
        >
            {children}
        </ClassContext.Provider>
    )
}