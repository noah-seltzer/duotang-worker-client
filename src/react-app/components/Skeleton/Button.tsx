import type { MouseEventHandler, ReactNode } from "react";
import { classNames } from "../../lib/tw";

interface ButtonProps {
    children?: ReactNode,
    onClick?: MouseEventHandler<HTMLButtonElement>,
    className?: string
}

export function Button({children, onClick = () => {}, className}: ButtonProps) {
    return <button className={classNames(className, "bg-gray-300 hover:bg-gray-400 text-gray-400 font-bold px-4 rounded-l")} onClick={onClick}>
        {children}
    </button>
}