import React, { useEffect, useState } from 'react';
import { FaShoppingBag } from 'react-icons/fa';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState({
    status: '',
    pedido: ''
  });

  useEffect(() => {
    const userLogin = parseInt(localStorage.getItem('userLogin'));

    fetch('https://api4-eta.vercel.app/rep')
      .then(response => response.json())
      .then(data => {
        const filteredData = data.filter(order => order.cd_representant === userLogin); // Filtra os pedidos pelo login

        const transformedData = filteredData.map(order => {
          const nameArray = order.nome.split(' ');
          const firstName = nameArray.slice(0, 4).join(' '); // Pega os primeiros quatro nomes

          let status;
          switch (order.situacao) {
            case 1:
              status = 'Em andamento';
              break;
            case 2:
              status = 'Bloqueado';
              break;
            case 3:
              status = 'Parcialmente faturado';
              break;
            case 4:
              status = 'Atendido';
              break;
            default:
              status = 'Desconhecido';
          }

          return {
            total: parseFloat(order.valor) || 0,
            pending: parseFloat(order.valorpen) || 0,
            attended: parseFloat(order.valoraten) || 0,
            name: firstName,
            status: status,
            date: new Date(order.data).toLocaleDateString(),
            pedido: order.pedido,
          };
        });
        setOrders(transformedData);
        setFilteredOrders(transformedData); // Define os pedidos filtrados como os pedidos iniciais
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Função para filtrar pedidos
  const filterOrders = () => {
    let filtered = orders;

    if (filterCriteria.status !== '') {
      filtered = filtered.filter(order => order.status === filterCriteria.status);
    }

    if (filterCriteria.pedido !== '') {
      filtered = filtered.filter(order => order.pedido.includes(filterCriteria.pedido));
    }

    setFilteredOrders(filtered);
  };

  // Handler para alterações nos filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterCriteria(prevState => ({ ...prevState, [name]: value }));
  };

  // Função para limpar os filtros
  const clearFilters = () => {
    setFilterCriteria({
      status: '',
      pedido: ''
    });
    setFilteredOrders(orders);
  };

  useEffect(() => {
    filterOrders();
  }, [filterCriteria]); // Atualiza os pedidos filtrados sempre que os critérios de filtragem mudam

  return (
    <div className='bg-gray-100 min-h-screen'>
      <div className='flex justify-between px-4 pt-4'>
        <h2 className="text-lg">LISTA DE PEDIDOS</h2>
      </div>
      <div className='p-4'>
        <div className="flex flex-col space-y-4 mb-4">
          {/* Filtro por status */}
          <select name="status" value={filterCriteria.status} onChange={handleFilterChange} className="border border-gray-300 rounded-md px-2 py-1 text-sm">
            <option value="">Situação</option>
            <option value="Em andamento">Em andamento</option>
            <option value="Bloqueado">Bloqueado</option>
            <option value="Parcialmente faturado">Parcialmente faturado</option>
            <option value="Atendido">Atendido</option>
          </select>
          {/* Filtro por pedido */}
          <input type="text" name="pedido" value={filterCriteria.pedido} onChange={handleFilterChange} placeholder="Pedido" className="border border-gray-300 rounded-md px-2 py-1 text-sm" />
          {/* Botão para limpar os filtros */}
          <button onClick={clearFilters} className="bg-gray-300 hover:bg-gray-400 px-2 py-1 rounded-md text-sm">Limpar Filtros</button>
        </div>
      </div>
      <ul>
        {filteredOrders.map((order, id) => (
          <li
            key={id}
            className='bg-gray-50 hover:bg-gray-100 rounded-lg my-2 p-6 grid grid-cols-1 md:grid-cols-4 gap-6 cursor-pointer'
          >
            <div className='flex items-center'>
              <div className='bg-custom-color p-2 rounded-lg'>
                <FaShoppingBag className='text-gray-800' />
              </div>
              <div className='pl-3'>
                <p className='text-gray-800 text-xs font-semibold truncate'>PEDIDO: {order.pedido}</p>
                <p className='text-gray-800 text-xs font-semibold truncate'>{order.name}</p>
                <p className='text-gray-800 font-bold text-xs'>VALOR: R$ {order.total.toLocaleString()}</p>
                <p className='text-gray-800 text-xs truncate'>PENDENTE: R$ {order.pending.toLocaleString()}</p>
                <p className='text-gray-800 text-xs truncate'>ATENDIDO: R$ {order.attended.toLocaleString()}</p>
                <p className='text-gray-600 text-xs truncate'>DATA PEDIDO: {order.date}</p>
                <p className='text-gray-600 text-xs truncate'>SITUAÇÃO: {order.status}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
