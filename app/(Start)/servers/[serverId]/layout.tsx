import { ServerSidebar } from "@/components/server/ServerSidebar";
import { presentProfile } from "@/lib/Profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const ServerIdLayout = async ({
    children,
    params, //every server component has this prop where we can read what is on the url
}: {
    children: React.ReactNode;
    params: { serverId: string };
}) => {
    const profile = await presentProfile();

    if (!profile) {
        redirect("/login");
    }

    const server = await db.server.findUnique({
        where: {
            id: params.serverId,
            members: {
                some: {
                    profileId: profile.id,
                },
            },
        },
    });

    if (!server) {
        return redirect("/");
    }
    return <div className="h-full">
        <div
            className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
            <ServerSidebar
                serverId={params.serverId}
            />
        </div>
        <main className="h-full md:pl-60">
            {children}
        </main>
    </div>
};

export default ServerIdLayout;
