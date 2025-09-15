import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/color')({
    component: RouteComponent
})

export const COLOR_LIST = [
    { value: 'radius' },
    { value: 'background' },
    { value: 'foreground' },
    { value: 'card' },
    { value: 'card-foreground' },
    { value: 'popover' },
    { value: 'popover-foreground' },
    { value: 'primary' },
    { value: 'primary-foreground' },
    { value: 'secondary' },
    { value: 'secondary-foreground' },
    { value: 'muted' },
    { value: 'muted-foreground' },
    { value: 'accent' },
    { value: 'accent-foreground' },
    { value: 'destructive' },
    { value: 'border' },
    { value: 'input' },
    { value: 'ring' },
    { value: 'chart-1' },
    { value: 'chart-2' },
    { value: 'chart-3' },
    { value: 'chart-4' },
    { value: 'chart-5' },
    { value: 'sidebar' },
    { value: 'sidebar-foreground' },
    { value: 'sidebar-primary' },
    { value: 'sidebar-primary-foreground' },
    { value: 'sidebar-accent' },
    { value: 'sidebar-accent-foreground' },
    { value: 'sidebar-border' },
    { value: 'sidebar-ring' }
]

function RouteComponent() {
    return (
        <div className='my-10 flex flex-col'>
                <div className='flex flex-row flex-wrap '>
                    {COLOR_LIST.map((item) => {
                        return (
                            <div key={item.value} className={'w-32 text-xs ' + `bg-${item.value}`}>
                                {'bg-' + item.value}
                            </div>
                        )
                    })}
                </div>
                <div className='flex flex-row flex-wrap gap-6'>
                    {COLOR_LIST.map((item) => {
                        return (
                            <p key={item.value} className={'' + ` text-${item.value}`}>
                                {'text-' + item.value}
                            </p>
                        )
                    })}
                </div>
        </div>
    )
}
