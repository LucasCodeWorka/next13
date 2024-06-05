// pages/login.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { FiUser, FiLock } from 'react-icons/fi';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const users = [
    { login: 18, password: "AGNALDO" },
    { login: 86, password: "GLEIBSON" },
    { login: 108, password: "CRISTINA" },
    { login: 101, password: "CARLOS" }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const user = users.find(u => u.login === parseInt(username) && u.password === password);

    if (user) {
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('userLogin', user.login); // Armazena o login do usuário
      router.push('/');
    } else {
      setError('Credenciais inválidas');
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white p-6 rounded shadow-md w-full max-w-sm'>
        <h1 className='text-4xl mb-4 block text-custom-color font-semibold text-center'>LIEBE</h1>
        <form onSubmit={handleSubmit}>
          <div className='mb-4 flex items-center'>
            <FiUser className='text-gray-500 mr-2' />
            <input
              type="text"
              placeholder="Username"
              className='w-full px-3 py-2 border rounded'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className='mb-4 flex items-center'>
            <FiLock className='text-gray-500 mr-2' />
            <input
              type="password"
              placeholder="Password"
              className='w-full px-3 py-2 border rounded'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <div className='text-red-500 mb-4'>{error}</div>}
          <button type="submit" className='w-full bg-custom-color text-white py-2 rounded shadow-md hover:bg-opacity-90'>Login</button>
        </form>
      </div>
    </div>
  );
}
