import Link from "next/link";
import { CaretLeft } from "@/utils/Icons";

interface IHeaderProps {
    _title: string;
    onBack?: () => void;
}

export function Header({ _title, onBack } : IHeaderProps) {
    return (
        <>
            <Link href="./" onClick={onBack} className="flex items-center gap-2">
                <CaretLeft />
                <span>Voltar</span>
            </Link>

            <h1 className="font-semibold text-2xl ml-6">{_title}</h1>
        </>
    )
}