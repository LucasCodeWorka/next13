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
    { login: 268289, password: "PAULO VENICIO" },
    { login: 18, password: "AGNALDO" },
    { login: 230200, password: "ALINE" },
    { login: 230224, password: "ANA PAULA" },
    { login: 105, password: "ANDRE RODRIGUES" },
    { login: 214012, password: "ANTONIO LUIZ" },
    { login: 230962, password: "BEATRIZ FALCAO" },
    { login: 150655, password: "BRUNO CESAR DE FARIA" },
    { login: 238885, password: "CAIO VITOR SANTANA" },
    { login: 101, password: "CARLOS BILHAR" },
    { login: 230162, password: "CLELTON TORRES" },
    { login: 230866, password: "CRISTIANE DIAS" },
    { login: 108, password: "CRISTINA" },
    { login: 44266, password: "DANIEL CARMAGO" },
    { login: 201087, password: "ELKE ROCHA" },
    { login: 163876, password: "ELOA VASCONCELLOS" },
    { login: 198337, password: "ERIVALDO DE OLIVEIRA" },
    { login: 238325, password: "FABIANA OLIVEIRA" },
    { login: 228385, password: "FELIPE FREITAS" },
    { login: 230157, password: "FRANK FONSECA" },
    { login: 91, password: "FRED SCHWANKE" },
    { login: 270224, password: "GIANE PIERINA" },
    { login: 230833, password: "GILSON SANTOS" },
    { login: 86, password: "GLEIBSON TAVARES" },
    { login: 230852, password: "GUILHERME DIAS" },
    { login: 240353, password: "HUMBERTO MARTINS" },
    { login: 147938, password: "ISLANIA OLIVEIRA DA SILVA" },
    { login: 57612, password: "JOAO PAULO COSTA" },
    { login: 88, password: "JOAO PAULO EMIDIO" },
    { login: 186111, password: "LEIDE DAIANE ANDRADE MAGALHAES" },
    { login: 87, password: "LEONARDO" },
    { login: 110000001, password: "LIEBE FABRICA" },
    { login: 32098, password: "LIEBE LOJAS" },
    { login: 215966, password: "LUCIANO RODRIGUES" },
    { login: 153281, password: "LUIS HENRIQUE DE SOUZA GUIMARAES" },
    { login: 210491, password: "LUIS SAVIO" },
    { login: 235053, password: "LUIZ CUNHA" },
    { login: 102096, password: "LURDES DESIDERIO" },
    { login: 31237, password: "MAGAZINES" },
    { login: 262470, password: "MARCO ANTONIO ABRAHAO" },
    { login: 160518, password: "MARCO TULIO" },
    { login: 103, password: "MARISTELA DINIZ" },
    { login: 98, password: "MURILO IUAN" },
    { login: 248902, password: "NEILSON DE ARAUJO" },
    { login: 173283, password: "PAULO MATHIAS" },
    { login: 101563, password: "RAFAELA GONCALVES DA SILVA PIMENTEL" },
    { login: 229218, password: "ROSI SUDARIO" }
    
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
