import { ClassContext } from "@/context/ClassContext";
import { useContext } from "react"


export function useClass() {
    const ctx = useContext(ClassContext);

    return ctx;
}