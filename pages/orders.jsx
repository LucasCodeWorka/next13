import React, { useEffect, useState } from 'react';
import { FaShoppingBag } from 'react-icons/fa';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('https://api4-eta.vercel.app/rep')
      .then(response => response.json())
      .then(data => {
        const transformedData = data.map(order => {
          const nameArray = order.nome.split(' ');
          const firstName = nameArray.slice(0, 2).join(' ');

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
            name: { first: firstName },
            status: status,
            date: new Date(order.data).toLocaleDateString(),
            method: 'Online',
          };
        });
        setOrders(transformedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className='bg-gray-100 min-h-screen'>
      <div className='flex justify-between px-4 pt-4'>
        <h2 className="text-lg">LISTA DE PEDIDOS</h2>
      </div>
      <ul>
        {orders.map((order, id) => (
          <li
            key={id}
            className='bg-gray-50 hover:bg-gray-100 rounded-lg my-2 p-6 grid grid-cols-1 md:grid-cols-4 gap-6 cursor-pointer'
          >
            <div className='flex items-center'>
              <div className='bg-purple-100 p-2 rounded-lg'>
                <FaShoppingBag className='text-purple-800' />
              </div>
              <div className='pl-3'>
                <p className='text-gray-800 text-xl font-semibold truncate'>{order.name.first}</p>
                <p className='text-gray-800 font-bold text-lg'>R${order.total.toLocaleString()}</p>
                <p className='text-gray-800 text-sm truncate'>PENDENTE: R$ {order.pending.toLocaleString()}</p>
                <p className='text-gray-800 text-sm truncate'>ATENDIDO: R$ {order.attended.toLocaleString()}</p>
                <p className='text-gray-600 text-sm truncate'>DATA PEDIDO: {order.date}</p>
                <p className='text-gray-600 text-sm truncate'>SITUAÇÃO: {order.status}</p> {/* Corrigido para usar 'status' */}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
