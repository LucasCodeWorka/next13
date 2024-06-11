import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { BsPersonFill, BsThreeDotsVertical } from 'react-icons/bs';

const Customers = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [expandedItems, setExpandedItems] = useState({});
  const router = useRouter();
  const unprotectedRoutes = ['/login', '/logout']; // Rotas que não requerem autenticação

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    // Se não estiver logado e não estiver em uma rota não protegida, redirecione para a página de login
    if (!isLoggedIn && !unprotectedRoutes.includes(router.pathname)) {
      router.push('/login');
    } else {
      // Fetch data from API
      fetch('https://api4-eta.vercel.app/cli')
        .then(response => response.json())
        .then(data => {
          setData(data);
          setFilteredData(data); // Define os dados filtrados como os dados iniciais
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [router.pathname]);

  // Função para filtrar clientes por CNPJ
  const filterByCnpj = (cnpj) => {
    const filtered = data.filter(order => order.cpfcnpj.includes(cnpj));
    setFilteredData(filtered);
  };

  // Função para filtrar clientes por data da última compra
  const filterByLastPurchaseDate = (months) => {
    const currentDate = new Date();
    const filtered = data.filter(order => {
      const lastPurchaseDate = new Date(order.ultimacompra);
      const diffInMonths = (currentDate.getFullYear() - lastPurchaseDate.getFullYear()) * 12 + (currentDate.getMonth() - lastPurchaseDate.getMonth());
      return months === '6+' ? diffInMonths >= 6 : diffInMonths < 6;
    });
    setFilteredData(filtered);
  };

  const toggleExpand = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className='bg-gray-100 min-h-screen'>
      <div className='p-4'>
        <h2 className='text-gray-800 font-bold text-XL2 mb-4'>LISTA DE CLIENTES</h2>
        <div className="flex items-center space-x-4 mb-4">
          {/* Filtro por CNPJ */}
          <input type="text" placeholder="CNPJ" onChange={(e) => filterByCnpj(e.target.value)} className="border border-gray-300 rounded-md px-3 py-1" />
          {/* Filtro por data da última compra */}
          <select onChange={(e) => filterByLastPurchaseDate(e.target.value)} className="border border-gray-300 rounded-md px-3 py-1">
            <option value="">Status</option>
            <option value="6">Ativos</option>
            <option value="6+">Inativos</option>
          </select>
        </div>
      </div>
      <ul>
        {filteredData.map((order, id) => {
          const isExpanded = expandedItems[id];
          return (
            <li
              key={id}
              className='bg-gray-50 hover:bg-gray-100 rounded-lg my-2 p-4 md:p-6 grid grid-cols-1 md:grid-cols-4 gap-6 cursor-pointer'
            >
              <div className='flex items-center'>
                <div className='bg-custom-color p-3 rounded-full'>
                  <BsPersonFill className='text-gray-800' />
                </div>
                <div className='pl-3'>
                  <p className='text-gray-800 text-sm font-semibold'>
                    {order.nome || 'Nome não disponível'}
                  </p>
                  <p className='text-gray-600 text-xs truncate'>
                    CNPJ: {order.cpfcnpj}
                  </p>
                  {isExpanded && (
                    <>

                      <p className='text-gray-600 text-xs truncate'>
                        Faturas Vencidas: {order.faturas_vencidas || 'Não disponível'}
                      </p>
                      <p className='text-gray-600 text-xs truncate'>
                        Valor Vencido: {order.valor_vencido || 'Não disponível'}
                      </p>
                      <p className='text-gray-600 text-xs truncate'>
                        Primeira Compra: {new Date(order.primeiracompra).toLocaleDateString()}
                      </p>
                      <p className='text-gray-600 text-xs truncate'>
                        Última Compra: {new Date(order.ultimacompra).toLocaleDateString()}
                      </p>
                      <p className='text-gray-600 text-xs truncate'>
                        Cidade: {order.cidade} - {order.uf}
                      </p>
                      <p className='text-gray-600 text-xs truncate'>
                        CEP: {order.cep}
                      </p>
                      <p className='text-gray-600 text-xs truncate'>
                        Email: {order.email}
                      </p>
                      <p className='text-gray-600 text-xs truncate'>
                        Telefone: {order.telefone}
                      </p>
                      <p className='text-gray-600 text-xs truncate'>
                        2023.1 : {order.semestre_1_aa || 'Não disponível'}
                      </p>
                      <p className='text-gray-600 text-xs truncate'>
                        2023.2 : {order.semestre_2_aa || 'Não disponível'}
                      </p>
                      <p className='text-gray-600 text-xs truncate'>
                        2024.1 : {order.semestre_1 || 'Não disponível'}
                      </p>
                      <p className='text-gray-600 text-xs truncate'>
                        2024.2 : {order.semestre_2 || 'Não disponível'}
                      </p>
                    </>
                  )}
                  <button
                    onClick={() => toggleExpand(id)}
                    className='text-blue-500 text-xs mt-2'
                  >
                    {isExpanded ? 'Ver menos' : 'Ver mais'}
                  </button>
                </div>
                <div className='sm:flex hidden justify-between items-center text-gray-600'>
                  <BsThreeDotsVertical />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Customers;