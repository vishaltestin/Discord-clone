import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { presentProfile } from "@/lib/Profile";

interface ServerIdPageProps {
    params: {
        serverId: string;
    }
};

const ServerIdPage = async ({
    params
}: ServerIdPageProps) => {
    const profile = await presentProfile();

    if (!profile) {
        return redirect('/login')
    }

    const server = await db.server.findUnique({
        where: {
            id: params.serverId,
            members: {
                some: {
                    profileId: profile.id,
                }
            }
        },
        include: {
            channels: {
                where: {
                    name: "general"
                },
                orderBy: {
                    createdAt: "asc"
                }
            }
        }
    })

    const initialChannel = server?.channels[0];

    if (initialChannel?.name !== "general") {
        return null;
    }

    return redirect(`/servers/${params.serverId}/channels/${initialChannel?.id}`)
}

export default ServerIdPage;