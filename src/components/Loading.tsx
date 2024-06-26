import "@/app/globals.css";
import { twMerge } from "tailwind-merge";

interface ILoadingProps extends React.HTMLProps<HTMLDivElement> {}

export function Loading({ className, ...rest }: ILoadingProps) {
    return <div className={twMerge("loading-pulse", className)} />;
}