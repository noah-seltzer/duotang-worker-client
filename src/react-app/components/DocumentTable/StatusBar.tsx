import { classNames } from "../../lib/tw"

type StatusClass = 'success' | 'warning' | 'error'

interface StatusBarProps {
    status: StatusClass
}

const getStatusClass = (status: StatusClass) => {
    if (status === 'success') return 'bg-green-500'
    if (status === 'warning') return 'bg-yellow-500'
    else return 'bg-red-500'
}

export function StatusBar({status}: StatusBarProps) {
    const statusClass = getStatusClass(status) 
    return <div className={classNames("w-7/8 rounded-full h-1 m-auto", statusClass)}></div>
}