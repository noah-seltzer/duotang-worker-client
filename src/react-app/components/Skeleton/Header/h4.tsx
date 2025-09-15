import { cn } from "@/lib/utils";

export function H4({children, className, ...props}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <h4 className={cn("scroll-m-20 text-xl font-semibold tracking-tight", className)} {...props}>
      {children}
    </h4>
  )
}


// we can return to this later
// interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
//     type: FC<any>
//     defaultClassNames?: string
// }

// export function Typography({type: Component, children, className, defaultClassNames, ...props}: TypographyProps) {
//     return <Component className={cn(defaultClassNames, className)} {...props}>{children}</Component>
// }

