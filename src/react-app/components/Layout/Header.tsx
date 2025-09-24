'use client'
import { Logo } from '../Files/Logo'
import { Login } from '../Auth/Login'
import { useMsal } from '@azure/msal-react'
import { ThemeSwitcher } from '../Theme/ThemeSwitcher'
import { Link } from '@tanstack/react-router'

export function Header() {
    const { instance } = useMsal()

    const isLoggedIn = instance.getAllAccounts().length > 0
    return (
        <header className='bg-sidebar'>
            <nav
                aria-label='Global'
                className='mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8'
            >
                {/* Logo */}
                <Logo />
                {/* Mobile Nav */}
                {/* <div className='flex lg:hidden'>
                    <button
                        type='button'
                        onClick={() => setMobileMenuOpen(true)}
                        className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400'
                    >
                        <span className='sr-only'>Menu</span>
                        <Bars3Icon aria-hidden='true' className='size-6' />
                    </button>
                </div> */}
                {/* Desktop Nav */}
                <div className='hidden lg:flex lg:flex-1 lg:justify-end lg:gap-6'>
                    <ThemeSwitcher />
                    {!isLoggedIn && (
                        <div>
                            <Login>
                                <a
                                    href='#'
                                    className='text-sm/6 font-semibold text-sidebar-foreground'
                                >
                                    Log in{' '}
                                    <span aria-hidden='true'>&rarr;</span>
                                </a>
                            </Login>
                        </div>
                    )}
                    <Link className='[&.active]:font-bold' to='/'>
                        Home
                    </Link>
                    <Link className='[&.active]:font-bold' to='/list/builder'>
                        List Builder
                    </Link>
                    <Link className='[&.active]:font-bold' to='/configure'>
                        Configure Onedrive
                    </Link>
                </div>
            </nav>
            {/* <Dialog
                open={mobileMenuOpen}
                onClose={setMobileMenuOpen}
                className='lg:hidden'
            >
                <div className='fixed inset-0 z-50' />
                <DialogPanel className='fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10'>
                    <div className='flex items-center justify-between'>
                        <Logo />
                        <button
                            type='button'
                            onClick={() => setMobileMenuOpen(false)}
                            className='-m-2.5 rounded-md p-2.5 text-gray-400'
                        >
                            <span className='sr-only'>Close menu</span>
                            <XMarkIcon aria-hidden='true' className='size-6' />
                        </button>
                    </div>
                    <div className='mt-6 flow-root'>
                        <div className='-my-6 divide-y divide-white/10'>
                            <div className='space-y-2 py-6'>
                                <Disclosure as='div' className='-mx-3'>
                                    <DisclosureButton className='group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-white hover:bg-white/5'>
                                        Select Client
                                        <ChevronDownIcon
                                            aria-hidden='true'
                                            className='size-5 flex-none group-data-open:rotate-180'
                                        />
                                    </DisclosureButton>
                                    <DisclosurePanel className='mt-2 space-y-2'>
                                        list of documents or clients go here
                                    </DisclosurePanel>
                                </Disclosure>
                            </div>
                            <div className='py-6'>
                                <Login>
                                    <a
                                        href='#'
                                        className='-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-white/5'
                                    >
                                        Log in
                                    </a>
                                </Login>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog> */}
        </header>
    )
}
