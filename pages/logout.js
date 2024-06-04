// pages/logout.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem('isLoggedIn');
    router.push('/login');
  }, []);

  return null;
}
