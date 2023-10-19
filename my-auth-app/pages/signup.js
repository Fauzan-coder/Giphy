import { useState } from 'react';
import { useRouter } from 'next/router';
import { signUp } from '../auth';
import Link from 'next/link';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#f0f0f0',
  borderRadius: '15px',
  padding: '20px',
  maxWidth: '400px',
};

const inputStyle = {
  width: '90%',
  padding: '10px',
  margin: '5px 0',
  borderRadius: '5px',
  fontSize: '16px',
};

const buttonStyle = {
  backgroundColor: 'black',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
};

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      await signUp(email, password);
      router.push('/login');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div style={containerStyle}>
      <h1>Sign Up</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={inputStyle}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={inputStyle}
      />
      <button onClick={handleSignUp} style={buttonStyle}>Sign Up</button>
      <p>
        Already have an account?{' '}
        <Link href="/login">Sign In</Link>
      </p>
    </div>
  );
}
