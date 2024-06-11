import React, { useEffect, useState } from 'react';
import { FaShoppingBag } from 'react-icons/fa';

const Comiss = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const userLogin = localStorage.getItem('userLogin'); // Obtenha o valor como string

    fetch('https://api4-eta.vercel.app/comis')
      .then(response => response.json())
      .then(data => {
        console.log("User Login:", userLogin); // Log para verificar o valor de userLogin
        console.log("Fetched Data:", data); // Log para verificar os dados obtidos

        const filteredData = data.filter(order => order.cd_representant === userLogin);

        console.log("Filtered Data:", filteredData); // Log para verificar os dados filtrados

        // Aggregate data by invoice
        const aggregatedData = filteredData.reduce((acc, order) => {
          const existingOrder = acc.find(o => o.nr_fatura === order.nr_fatura);

          if (existingOrder) {
            existingOrder.vl_fatura += parseFloat(order.vl_fatura);
            existingOrder.vl_vlcomis += parseFloat(order.vl_vlcomis);
          } else {
            acc.push({
              id: order.nr_fatura,
              nm_pescomis: order.nm_pescomis,
              nm_cliente: order.nm_cliente,
              ds_dstipocli: order.ds_dstipocli,
              nr_fatura: order.nr_fatura,
              dt_emissao: order.dt_emissao,
              dt_vencimento: order.dt_vencimento,
              dt_baixa: order.dt_baixa,
              tp_documento: order.tp_documento,
              vl_fatura: parseFloat(order.vl_fatura),
              vl_perccomiss: parseFloat(order.vl_perccomiss),
              vl_vlcomis: parseFloat(order.vl_vlcomis)
            });
          }

          return acc;
        }, []);

        setOrders(aggregatedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className='bg-gray-100 min-h-screen p-4'>
      <div className='flex justify-between px-4 pt-4'>
        <h2 className="text-gray-800 font-bold text-XL2 mb-4">PREVISÃO DE COMISSÃO</h2>
      </div>
      <ul>
        {orders.map((order) => (
          <li
            key={order.id}
            className='bg-gray-50 hover:bg-gray-100 rounded-lg my-2 p-6 grid grid-cols-1 md:grid-cols-4 gap-6 cursor-pointer'
          >
            <div className=''>
              <div className='pl-3'>
                <p className='text-gray-800 text-sm font-semibold truncate'>{order.nm_cliente}</p>
                <p className='text-gray-800 text-xs'>{order.ds_dstipocli}</p>
                <p className='text-gray-800 text-xs truncate'>NOTA FISCAL: {order.nr_fatura}</p>
                <p className='text-gray-600 text-xs truncate'>Emissão: {new Date(order.dt_emissao).toLocaleDateString()}</p>
                <p className='text-gray-600 text-xs truncate'>VALOR: {order.vl_fatura.toFixed(2)}</p>
                <p className='text-gray-600 text-xs truncate'>Perc%: {order.vl_perccomiss}%</p>
                <p className='text-gray-600 text-xs truncate'>Comissão: {order.vl_vlcomis.toFixed(2)}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comiss;
