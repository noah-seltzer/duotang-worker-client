export function H1({children, ...props}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1 {...props} className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
      {children}
    </h1>
  )
}
