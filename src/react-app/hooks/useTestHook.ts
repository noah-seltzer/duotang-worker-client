import { useState } from "react";

export function useTestHook() {
    const [show, setShown] = useState<boolean>(false)
    return {show, setShown}
}