'use client'

import { useState } from 'react'
import {
    Dialog,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel
} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Logo } from '../Files/Logo'
import { SavedListItem } from '../SavedLists/SavedListItem'
import { RootState, useAppSelector } from '../../store'
import { Login } from '../Auth/Login'

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const savedLists = useAppSelector(
        (state: RootState) => state.savedLists.lists
    ) 
    return (
        <header className='bg-gray-900'>
            <nav
                aria-label='Global'
                className='mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8'
            >
                {/* Logo */}
                <Logo />
                {/* Mobile Nav */}
                <div className='flex lg:hidden'>
                    <button
                        type='button'
                        onClick={() => setMobileMenuOpen(true)}
                        className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400'
                    >
                        <span className='sr-only'>Menu</span>
                        <Bars3Icon aria-hidden='true' className='size-6' />
                    </button>
                </div>
                {/* Desktop Nav */}
                <div className='hidden lg:flex lg:flex-1 lg:justify-end lg:gap-6'>
                    <PopoverGroup className='lg:gap-x-12'>
                        <Popover className='relative'>
                            <PopoverButton className='flex items-center gap-x-1 text-sm/6 font-semibold text-white'>
                                Saved Lists
                                <ChevronDownIcon
                                    aria-hidden='true'
                                    className='size-5 flex-none text-gray-500'
                                />
                            </PopoverButton>

                            <PopoverPanel
                                transition
                                className='absolute left-1/2 z-10 mt-3 w-64 max-w-sm -translate-x-1/2 overflow-hidden rounded-3xl bg-gray-800 outline-1 -outline-offset-1 outline-white/10 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in'
                            >
                                <div className='p-4 flex flex-col gap-2'>
                                    {savedLists.map((item) => (
                                        <SavedListItem item={item} />
                                    ))}
                                </div>
                            </PopoverPanel>
                        </Popover>
                    </PopoverGroup>
                    <div>
                        <Login>
                            <a
                                href='#'
                                className='text-sm/6 font-semibold text-white'
                            >
                                Log in <span aria-hidden='true'>&rarr;</span>
                            </a>
                        </Login>
                    </div>
                </div>
            </nav>
            <Dialog
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
                                        Saved Lists
                                        <ChevronDownIcon
                                            aria-hidden='true'
                                            className='size-5 flex-none group-data-open:rotate-180'
                                        />
                                    </DisclosureButton>
                                    <DisclosurePanel className='mt-2 space-y-2'>
                                        {savedLists.map((item) => (
                                            <DisclosureButton
                                                onClick={() =>
                                                    setMobileMenuOpen(false)
                                                }
                                                key={item.name}
                                                className='block rounded-lg py-2 pr-3 pl-3 text-sm/7 font-semibold text-white hover:bg-white/5'
                                            >
                                                {item.name}
                                            </DisclosureButton>
                                        ))}
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
            </Dialog>
        </header>
    )
}
