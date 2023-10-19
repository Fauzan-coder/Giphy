// landing.js
import Link from 'next/link';
import styles from './landing.css';

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
  maxWidth: '300px', 
};

const titleStyle = {
  fontSize: '24px', // Adjust the font size as needed
  marginBottom: '10px',
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

const Page = () => {
  return (
    <div style={containerStyle} className={styles.container}>
      <h1 style={titleStyle} className={styles.title}>
        Welcome to Giphy
      </h1>
      <p>Get started with an account:</p>
      <Link href="/login">
        <button style={buttonStyle} className={styles.loginButton}>
          Get Started
        </button>
      </Link>
    </div>
  );
};

export default Page;
