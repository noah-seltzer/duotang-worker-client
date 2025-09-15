import { FormEvent } from "react";

export function getValueFromOnChangeEvent<T>(e: FormEvent<T>) {
    return (e.target as HTMLInputElement).value
}