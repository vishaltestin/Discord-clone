import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { CreateServer } from "@/components/CreateServer";
import { initialProfile } from "./utils/profile";

const Home = async () => {
  const profile = await initialProfile();

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return <CreateServer />;
}

export default Home;