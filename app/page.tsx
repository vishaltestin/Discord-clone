"use client"
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import axios from 'axios';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    console.log('test')
    const userString = localStorage.getItem('authData');

    if (!userString) {
      redirect('/login');
    }

    const user = JSON.parse(userString);

    if (!user || !user.userId) {
      console.error('User data is missing userId property');
      redirect('/login');
    }

    const fetchData = async () => {
      console.group(user.userId)
      try {
        const response = await axios.post('/api/userinfo', user);
        const data = response.data;

        if (data.success) {
          setProfile(data.data);
          console.log(data.data)
        } else {
          redirect('/login');
        }
      } catch (error) {
        console.error(error);
        redirect('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  ;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>Error fetching profile data</div>;
  }

  // Rest of your logic here using the 'profile' variable

  return (
    <div>
      create a server
    </div>
  );
}

export default Home;
