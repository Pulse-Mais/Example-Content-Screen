"use client"
import { IClass, ICreateClass, ISetTrailClassContentInput } from "@/@types/class.interface";
import { api } from "@/utils/api";
import { AxiosResponse } from "axios";
import { createContext, useEffect, useState } from "react";

interface IClassCtx {
    trailId: string;
    setTrailId: (trailId: string) => void;
    getTrailClasses: () => Promise<IClass[]>;
    createClass: (classData: ICreateClass) => Promise<AxiosResponse<any, any>> ;
    createContentClass: (classId: string, content: File) => void;
    createContentVideoClass: (classId: string, content: File) => void;
    updateClass: ({ classId }: { classId: string }, rest: IClass) => void;
    unlockClass: (classId: string) => void;
    allClasses: IClass[];
}

export const ClassContext = createContext<IClassCtx>({} as IClassCtx);

export function ClassProvider({ children }: { children: React.ReactNode }) {
    const [trailId, setTrailId] = useState<string>("");
    const [allClasses, setAllClasses] = useState<IClass[]>([]);

    async function getTrailClasses(): Promise<IClass[]> {
        // api.get(`/trail/07e4779b-8ab7-4d95-9905-d88c9aef924c/trail-classes`).then((response) => {
            
        //     setAllClasses(response.data);
        // });

        const response = await fetch(`http://127.0.0.1:3333/trail/07e4779b-8ab7-4d95-9905-d88c9aef924c/trail-classes`)
        
        const data = await response.json();
        setAllClasses(data.trailClasses);
        return allClasses;
    }

    async function createClass(classData: ICreateClass): Promise<AxiosResponse<any, any>> {
        const contentClass = await api.post(`/create-trail-class/${trailId}`, classData);

        return contentClass;
    }

    async function createContentClass(classId: string, content: File) {
        var uploadContent = await api.post(`/create-trail-class-content/${trailId}/${classId}`, content)

        return uploadContent;
    }

    async function createContentVideoClass({ classId }: { classId: string }, content: File) {
        var uploadContent = await api.post(`/create-class-content/video/${trailId}/${classId}`, content)

        return uploadContent;
    }

    async function updateClass({ classId }: { classId: string }, rest: IClass) {
        const updateClass = await api.post(`/update-trail-class/${trailId}/${classId}`, rest);

        return updateClass.data;
    }

    async function unlockClass(classId: string) {
        const unlock = await api.put(`/unlock-trail-class/${trailId}/${classId}`);

        return unlock;
    }

    useEffect(() => {
        setTrailId("07e4779b-8ab7-4d95-9905-d88c9aef924c");
        getTrailClasses();
    }, []);

    return (
        <ClassContext.Provider
            value={{
                trailId, setTrailId,
                getTrailClasses, createClass, createContentClass, updateClass, unlockClass,
                createContentVideoClass,
                allClasses

            }}
        >
            {children}
        </ClassContext.Provider>
    )
}