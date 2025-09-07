// import { div as MotionDiv } from 'motion/react-client'
import { motion } from 'motion/react'
import { HTMLProps } from 'react'
import { Button } from '../Skeleton/Button'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { useTestHook } from '../../hooks/useTestHook'

interface EnterAnimationProps extends HTMLProps<HTMLDivElement> {
    initial?: boolean
}

export function SlideAnimation(props: EnterAnimationProps) {
    const { children } = props
    const { show, setShown } = useTestHook()

    return (
        <>
            <Button
                key='button'
                className='w-min h-min'
                onClick={() => setShown(!show)}
            >
                {show ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </Button>
            {show && (
                <motion.div
                    initial={{ x: '-100%' }}
                    animate={{
                        x: '0%'
                    }}
                    exit={{ x: '-100%' }}
                    key='box'
                >
                    {children}
                </motion.div>
            )}
        </>
    )
}
