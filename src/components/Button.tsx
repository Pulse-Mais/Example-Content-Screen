import { twMerge } from "tailwind-merge";


interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    _title: string;
}

export function Button({ _title, ...rest } : IButtonProps) {
    return (
        <button {...rest} className={twMerge("bg-midnight-blue-950 text-zinc-50 p-2 px-4 rounded-md hover:outline hover:outline-2 hover:outline-blue-800 hover:outline-offset-2 hover:bg-blue-800  disabled:!outline-none disabled:cursor-not-allowed duration-100 transition-all", rest.className)}>{_title}</button>
    )
}