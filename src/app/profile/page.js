"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/firebase';
import GiphySearch from '../components/GiphySearch';

function Profile() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        console.warn('No user is signed in, redirecting to login.');
        router.push('/login');
      }
    }, (error) => {
      console.error('Auth state change error:', error);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Sign Out Error:', error.message);
    }
  };

  return (
    <div className=" bg-gray-100 flex flex-col items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full text-left text-black">
        <GiphySearch />
      </div>
    </div>
  );
}

export default Profile;
