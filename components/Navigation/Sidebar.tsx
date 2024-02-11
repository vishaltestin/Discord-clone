"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import { Action } from "./Action";
import { ModeToggle } from "../mode-toggle";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { ScrollArea } from "../ui/scroll-area";
import { Server } from "@prisma/client";
import { ServerNavigation } from "./ServerNavigation";
import { Logout } from "../Logout";
import { useModal } from "@/hooks/useModal";

const Sidebar = () => {
    const { isOpen, onClose, type } = useModal()
    const isModalOpen = isOpen && type === 'createServer'
    const [servers, setServers] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('/api/AllServers');
                const data = response.data;
                if (data.success) {
                    setServers(data.data);
                } else {
                    console.log("function did not work bruh")
                }
            } catch (error) {
                console.log(error)
            }
        };
        fetchData()
    }, [isModalOpen])


    return (
        <div
            className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] bg-[#E3E5E8] py-3"
        >
            <Action />
            <Separator
                className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto"
            />
            <ScrollArea className="flex-1 w-full">
                {servers.map((server: Server) => (
                    <div key={server.id} className="mb-4">
                        <ServerNavigation
                            id={server.id}
                            name={server.name}
                            imageUrl={server.imageUrl}
                        />
                    </div>
                ))}
            </ScrollArea>
            <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
                <ModeToggle />
                <Logout/>
            </div>
        </div>
    );
}

export default Sidebar;