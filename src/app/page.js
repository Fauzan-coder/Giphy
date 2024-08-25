"use client";
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Login from './login/page'; 
import Signup from './signup/page';
import Profile from './profile/Profile';
import { useRouter } from 'next/navigation';

const Home = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        router.push('/profile'); // Redirect to profile if the user is logged in
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {!user && (
        <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
          <Signup />
        </div>
      )}
    </div>
  );
};

export default Home;
