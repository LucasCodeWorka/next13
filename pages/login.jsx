// pages/login.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { FiUser, FiLock } from 'react-icons/fi'; // Importando ícones

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validação de usuário e senha (apenas exemplo, você deve usar algo mais seguro)
    if (username === 'admin' && password === 'admin') {
      // Armazena alguma indicação de login bem-sucedido (cookies, localStorage, etc.)
      localStorage.setItem('isLoggedIn', true);
      router.push('/');
    } else {
      setError('Credenciais inválidas');
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white p-6 rounded shadow-md w-full max-w-sm'>
        <h1 className='text-2xl mb-4 block text-gray-800 font-semibold truncate'>LOGIN</h1>
        <form onSubmit={handleSubmit}>
          <div className='mb-4 flex items-center'>
            <FiUser className='text-gray-500 mr-2' /> {/* Ícone do usuário */}
            <input
              type="text"
              placeholder="Username"
              className='w-full px-3 py-2 border rounded'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className='mb-4 flex items-center'>
            <FiLock className='text-gray-500 mr-2' /> {/* Ícone de cadeado */}
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
