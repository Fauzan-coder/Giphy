"use client"; // Ensure this is the first line in the file

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '../../firebase';
import Link from 'next/link';

const Login = () => {
  console.log('Login component rendered on:', typeof window === 'undefined' ? 'server' : 'client');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful');
      router.push('/profile');
    } catch (error) {
      setError('Login failed. Please check your email and password.');
      console.error('Login Error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 placeholder-gray-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 placeholder-gray-500"
        />
        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full py-2 text-white rounded-lg ${
            loading ? 'bg-blue-400' : 'bg-blue-500 hover:bg-blue-600'
          } focus:outline-none focus:ring-2 focus:ring-blue-400`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{' '}
          <Link href="/signup" className="text-blue-500 hover:text-blue-600 font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
