import { useEffect } from "react";

interface IModalProps {
    children: React.ReactNode;
    onClose?: () => void;
}

export function Modal({ children, onClose }: IModalProps) {

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
            <div className="relative bg-white min-w-96 min-h-60 m-auto p-4 rounded-lg" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}
