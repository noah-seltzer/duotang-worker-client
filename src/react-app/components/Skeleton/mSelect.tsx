import { Popover, PopoverTrigger } from "@/components/Skeleton/Popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { forwardRef } from "react";

export const MultiSelect = forwardRef(() => {
    return <Popover>
        <PopoverTrigger></PopoverTrigger>
        <PopoverContent></PopoverContent>
    </Popover>
})