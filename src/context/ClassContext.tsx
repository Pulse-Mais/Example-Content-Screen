"use client"
import { IClass, ICreateClass, ISetTrailClassContentInput } from "@/@types/class.interface";
import { api } from "@/utils/api";
import { createContext, useEffect, useState } from "react";

interface IClassCtx {
    trailId: string;
    setTrailId: (trailId: string) => void;
    getTrailClasses: () => IClass[];
    createClass: (classData: ICreateClass) => void;
    createContentClass: (classId: string, content: File) => void;
    updateClass: ({ classId }: { classId: string }, rest: IClass) => void;
    unlockClass: (classId: string) => void;
}

export const ClassContext = createContext<IClassCtx>({} as IClassCtx);

export function ClassProvider({ children }: { children: React.ReactNode }) {
    const [trailId, setTrailId] = useState<string>("");
    const [allClasses, setAllClasses] = useState<IClass[]>([]);

    function getTrailClasses(): IClass[] {
        api.get(`/create-trail-class/${trailId}`).then((response) => {
            setAllClasses(response.data);
        });

        return allClasses;
    }

    async function createClass(classData: ICreateClass) {
        const contentClass = await api.post(`/create-trail-class/${trailId}`, classData);

        return contentClass;
    }

    async function createContentClass(classId: string, content: File) {
        var uploadContent = await api.post(`/create-trail-class-content/${trailId}/${classId}`, content)

        return uploadContent;
    }

    async function createContentVideoClass({ classId }: { classId: string }, content: any) {
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
        setTrailId("1");
        getTrailClasses();
    }, []);

    return (
        <ClassContext.Provider
            value={{
                trailId, setTrailId,
                getTrailClasses, createClass, createContentClass, updateClass, unlockClass
            }}
        >
            {children}
        </ClassContext.Provider>
    )
}