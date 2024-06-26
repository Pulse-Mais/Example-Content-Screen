'use client';
import Link from "next/link";
import Image from "next/image";
import PulseMaisLogo from "@/assets/Simbolo_PulseMais.svg";

import { BookOpenText, GraduationCap, Headphones, House, Trophy, UserList } from "../utils/Icons";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useClass } from "@/hooks/useClass";

export function Aside() {
    const currentPathname = usePathname();
    const { setTrailId } = useClass();
    const routerOfAside = [
        { id: "home", href: "/9f1ac661-2d1f-4dbd-93ec-5a0c232f361b", icon: House },
        { id: "grad", href: "/grad", icon: GraduationCap },
        { id: "book", href: "/book", icon: BookOpenText },
        { id: "trop", href: "/trop", icon: Trophy },
        { id: "user", href: "/user", icon: UserList },
        { id: "head", href: "/head", icon: Headphones },
    ];

    return (
        <aside className="flex flex-col justify-between items-center bg-white h-full w-fit p-2 border-r-zinc-200 border-1">
            <Image src={PulseMaisLogo} alt="Pulse mais Logo" width={58} priority />

            <div className="flex flex-col items-center gap-2">
                {routerOfAside.map(({ id, href, icon: Icon }) => (
                    <Link
                        key={id}
                        href={href}
                        className={`p-2 rounded-md ${currentPathname == href ? "bg-zinc-100 !border-zinc-200" : "bg-transparent"} hover:bg-zinc-100 hover:border-zinc-200 border-1 border-transparent`}
                    >
                        <Icon weight={currentPathname == href ? "fill" : "regular"}  color="black" size={32} />
                    </Link>
                ))}
            </div>

            <Image
                src="https://github.com/github.png"
                alt="Github Logo"
                width={42}
                height={42}
                className="rounded-full"
            />
        </aside>
    );
}
