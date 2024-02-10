"use client"
import { redirect } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import Loader from "@/components/loader";
import { CreateServer } from "@/components/CreateServer";
import { Profile } from "@prisma/client";

type AuthData = {
  token: string;
  userId: string;
};

const Home: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [serverFound, setserverFound] = useState<boolean>(false)
  const serverRef = useRef({ id: undefined });
  useEffect(() => {
    const userString = localStorage.getItem('authData');
    if (!userString) {
      redirect('/login');
    }
    const user: AuthData = JSON.parse(userString);
    if (!user || !user.userId) {
      redirect('/login');
    }

    const fetchData = async () => {
      try {
        const response = await axios.post('/api/userinfo', user);
        const data = response.data;
        if (data.success) {
          setProfile(data.data);
          const userProfile = data.data;
          const response = await axios.post('/api/profileServer', userProfile);
          if (response.data.success) {
            serverRef.current = response.data.data;
            setserverFound(true)
          } else if (response.data.status === 404) {
            setserverFound(false)
          }
        } else {
          redirect('/login');
        }
      } catch (error) {
        redirect('/login');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  ;

  if (loading) {
    return <Loader />
  }

  if (!profile) {
    return <div>Error fetching profile data</div>;
  }

  if (serverFound) {
    redirect(`/servers/${serverRef.current.id}`);
  }

  if (!serverFound) {
    return (
      <CreateServer />
    )
  }
}

export default Home;
