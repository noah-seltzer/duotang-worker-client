import { PropsWithChildren } from 'react'
import { Header } from './Header'

export function RootLayout({ children }: PropsWithChildren) {
    return (
        <>
            <Header />
            <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
                {children}
            </div>
        </>
    )
}
