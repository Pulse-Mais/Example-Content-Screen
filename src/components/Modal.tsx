"use client"
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";

interface IModalProps extends React.HTMLAttributes<HTMLDivElement>{
    children: React.ReactNode;
    onClose?: () => void;
}

export function Modal({ children, onClose, className, ...rest }: IModalProps) {

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose?.();
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [])

    return (
        <div tabIndex={0} className="flex fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose}>
            <div {...rest} className={twMerge("relative bg-white min-w-96 min-h-60 m-auto p-4 rounded-lg max-md:w-full max-md:h-full overflow-y-auto", className)} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}
