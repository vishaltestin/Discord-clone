"use client"
import { useEffect, useState } from "react"
import { CreateServerModal } from "../Mod/CreateServerModal"
import { InviteModal } from "../Mod/InviteModal"
import { EditServerModal } from "../Mod/EditServerModal"
import { MembersModal } from "../Mod/MembersModal"
import { CreateChannelModal } from "../Mod/CreateChannelModal"
import { LeaveServerModal } from "../Mod/LeaveServerModal"
import { DeleteServerModal } from "../Mod/DeleteServerModal"
import { DeleteChannelModal } from "../Mod/DeleteChannelModal"
import { EditChannelModal } from "../Mod/EditChannelModal"

export const ModalProvider = () => {
    
    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        setIsMounted(true)
    }, [])
    if (!isMounted) {
        return null
    }
    return (
        <>
            <CreateServerModal />
            <InviteModal/>
            <EditServerModal/>
            <MembersModal/>
            <CreateChannelModal/>
            <LeaveServerModal/>
            <DeleteServerModal/>
            <DeleteChannelModal/>
            <EditChannelModal/>
        </>
    )
}