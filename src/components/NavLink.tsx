import { IconProps } from "@phosphor-icons/react";
import Link, { LinkProps } from "next/link";

interface INavLinkProps extends LinkProps {
    // children: React.ReactNode
}

export function NavLink({ ...rest }: INavLinkProps) {
    return (
        <Link  {...rest}>
            
        </Link>
    )
}