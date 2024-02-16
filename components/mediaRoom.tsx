"use client";

import { useEffect, useState } from "react";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import "@livekit/components-styles";
import { Channel } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { presentProfile } from "@/lib/Profile";
import axios from "axios";

interface MediaRoomProps {
    chatId: string;
    video: boolean;
    audio: boolean;
};

export const MediaRoom = ({
    chatId,
    video,
    audio
}: MediaRoomProps) => {
    // const user = await presentProfile();
    const [token, setToken] = useState("");

    // useEffect(() => {
    //     if (!user?.name || 'TestingName') return;

    //     const name = `${user.name}`;

    //     (async () => {
    //         try {
    //             const resp = await fetch(`/api/livekit?room=${chatId}&username=${name}`);
    //             const data = await resp.json();
    //             setToken(data.token);
    //         } catch (e) {
    //             console.log(e);
    //         }
    //     })()
    // }, [user?.name, chatId]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userProfileResponse = await axios.get("/api/user");
                console.log(userProfileResponse)

                const userProfile = userProfileResponse.data
                if (!userProfile?.displayName || userProfile.name === 'TestingName') {
                    return;
                }

                const name = `${userProfile.displayName}`;
                console.log(name)

                const resp = await fetch(`/api/livekit?room=${chatId}&username=${name}`);
                const data = await resp.json();
                console.log(data)
                setToken(data.token);
            } catch (e) {
                console.log(e, "testing");
            }
        };


    }, [chatId]);


    if (token === "") {
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <Loader2
                    className="h-7 w-7 text-zinc-500 animate-spin my-4"
                />
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Loading...
                </p>
            </div>
        )
    }

    return (
        <LiveKitRoom
            data-lk-theme="default"
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
            token={token}
            connect={true}
            video={video}
            audio={audio}
        >
            <VideoConference />
        </LiveKitRoom>
    )
}