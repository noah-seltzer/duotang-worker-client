import { cn } from "@/lib/utils";
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface GridProps extends DetailedHTMLProps<HTMLAttributes<HTMLDListElement>, HTMLDListElement> {}

export function Grid({ children, className, ...props}: GridProps) {
  return (
          <div className={cn("grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16", className)} {...props}>
            {children}
          </div>
  )
}