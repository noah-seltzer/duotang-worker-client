import {
    Tooltip,
    TooltipContent,
    TooltipTrigger
} from '@/components/Skeleton/Tooltip'
import { cn } from '@/lib/utils'

interface HoverTruncatedTextProps {
    text: string
    underline?: boolean
}

export function HoverTruncatedText({ text, underline = false }: HoverTruncatedTextProps) {
    const isOverflow = text.length > 40
    const displayName = isOverflow ? `${text.slice(0, 40)}...` : text
    return (
        <Tooltip open={isOverflow ? undefined : false}>
            <TooltipTrigger>
                <span
                    className={cn(
                        underline ? 'underline' : '',
                        isOverflow ? 'overflow' : ''
                    )}
                >
                    {displayName}
                </span>
            </TooltipTrigger>
            <TooltipContent side='top'>
                <div className='rounded-md py-2 px-4 text-lg z-100'>{text}</div>
            </TooltipContent>
        </Tooltip>
    )
}