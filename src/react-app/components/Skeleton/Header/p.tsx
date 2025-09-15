import { cn } from "@/lib/utils";

export function p({children, className, ...props}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("leading-7 [&:not(:first-child)]:mt-6", className)} {...props}>
      {children}
    </p>
  )
}