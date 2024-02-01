import { ModeToggle } from "@/components/mode-toggle";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";

const Home = async () => {
  const userString = localStorage.getItem('authData');
  if (!userString) {
    redirect('/login');
  }
  const user = JSON.parse(userString);
  const profile = await initialProfile(user.id);
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
  return (
    <div>
      create a server
    </div>
  );

}

export default Home;

// export default function Home() {
//   return (
//     <div>
//       <h1>Hello Discord</h1>
//       <ModeToggle />
//     </div>
//   );
// }
