import { Button } from "@/components/Skeleton/Button"
import { useMsGraph } from "@/hooks/useMsal"
import { useGetEmailsQuery, useLazyGetEmailsQuery } from "@/store/api/msal/files/files"
import { skipToken } from "@reduxjs/toolkit/query"
import { useState } from "react"

export function EmailList() {
    const { isLoggedIn, account, getToken } = useMsGraph()
    
    console.log(isLoggedIn)
    const [trigger, { data }] = useLazyGetEmailsQuery()

    return <Button onClick={async () => {
        const token = await getToken()
        if (!token) return
        trigger({token})

    }}>Get Emails</Button>

}