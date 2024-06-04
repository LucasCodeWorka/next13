// pages/_app.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import '@/styles/globals.css';
import Sidebar from '../components/Sidebar';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const unprotectedRoutes = ['/login', '/logout'];

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    console.log('isLoggedIn:', isLoggedIn);
    console.log('router.pathname:', router.pathname);

    if (!isLoggedIn && !unprotectedRoutes.includes(router.pathname)) {
      router.push('/login');
    } else if (isLoggedIn && unprotectedRoutes.includes(router.pathname)) {
      router.push('/');
    }
  }, [router.pathname]);

  return (
    <>
      {unprotectedRoutes.includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (
        <Sidebar>
          <Component {...pageProps} />
        </Sidebar>
      )}
    </>
  );
}

export default MyApp;
