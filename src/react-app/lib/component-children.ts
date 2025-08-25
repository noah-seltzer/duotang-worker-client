import { JSXElementConstructor, ReactElement } from 'react'

export function getChildrenOfType(children: ReactElement[], type: JSXElementConstructor<any>) {
    return children.filter((child: ReactElement) => child.type === type)
}

export function getChildrenNotOfType(children: ReactElement[], types: JSXElementConstructor<any>[]) {
    return children.filter((child: ReactElement) => {
        if (typeof child.type === 'string') {
            console.log('string child type found', child.type)
            return false
        }
        return !types.includes(child.type)
    })
}

export function ProcessChildProps() {
    
}