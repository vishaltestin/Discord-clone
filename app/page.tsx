"use client"
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import axios from 'axios';
import Loader from "@/components/loader";
import { CreateServer } from "@/components/CreateServer";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [serverFound, setserverFound] = useState(false)

  useEffect(() => {
    const userString = localStorage.getItem('authData');

    if (!userString) {
      redirect('/login');
    }

    const user = JSON.parse(userString);

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
            const server = response.data.data;
            setserverFound(true)
            return redirect(`/servers/${server.id}`);
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

  if (!serverFound) {
    return (
      <CreateServer />
    )
  }
}

export default Home;
