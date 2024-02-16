"use client";

import { useEffect, useState } from "react";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import "@livekit/components-styles";
import { Loader2 } from "lucide-react";
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
    const [token, setToken] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userProfileResponse = await axios.get("/api/user");
                const userProfile = userProfileResponse.data
                if (!userProfile?.displayName) {
                    return;
                }

                const name = `${userProfile.displayName}`;
                console.log(name)

                const resp = await axios.get(`/api/livekit?room=${chatId}&username=${name}`);
                console.log(resp.data.token)
                setToken(resp.data.token);
            } catch (e) {
                console.log(e, "testing");
            }
        };

        fetchData()
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