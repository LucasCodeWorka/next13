import React, { useEffect, useState } from 'react';
import { FaShoppingBag } from 'react-icons/fa';

const Comiss = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalComissao, setTotalComissao] = useState(0);

  useEffect(() => {
    const userLogin = localStorage.getItem('userLogin'); // Obtenha o valor como string

    fetch('https://api4-eta.vercel.app/inad')
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

        // Calculating total comissao
        const totalComissao = aggregatedData.reduce((total, order) => total + order.vl_vlcomis, 0);
        setTotalComissao(totalComissao.toFixed(2));

        setOrders(aggregatedData);
        setFilteredOrders(aggregatedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleFilter = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const filtered = orders.filter(order => {
      const orderDate = new Date(order.dt_emissao);
      return orderDate >= start && orderDate <= end;
    });

    // Calculating total comissao
    const totalComissao = filtered.reduce((total, order) => total + order.vl_vlcomis, 0);
    setTotalComissao(totalComissao.toFixed(2));

    setFilteredOrders(filtered);
  };

  return (
    <div className='bg-gray-100 min-h-screen'>
      <div className='flex justify-between px-4 pt-4'>
        <h2 className="text-gray-800 font-bold text-XL2 mb-4">INADIMPLÊNCIA</h2>
      </div>   
      <div>
      <p className="text-blue-700 font-bold text-xs px-4 truncate">PERCA: R$  {totalComissao}</p>
      </div>
  <div className='mb-4 p-4'>
    <div className='flex flex-col md:flex-row md:space-x-2'>
      <div className='flex-1 mb-2 md:mb-0'>
        <label className='block text-gray-700 text-sm'>Data de Início:</label>
        <input
          type='date'
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className='w-full border rounded py-1 px-2 text-sm'
        />
      </div>
      <div className='flex-1 mb-2 md:mb-0'>
        <label className='block text-gray-700 text-sm'>Data de Fim:</label>
        <input
          type='date'
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className='w-full border rounded py-1 px-2 text-sm'
        />
      </div>
      <div className='flex items-end'>
        <button
          onClick={handleFilter}
          className='bg-gray-300 hover:bg-gray-400 px-2 py-1 rounded-md text-sm w-full md:w-auto'
        >
          Filtrar
        </button>
      </div>
    </div>
  </div>
  <ul className='p-4'>
    {filteredOrders.map((order) => (
      <li
        key={order.id}
        className='bg-gray-50 hover:bg-gray-100 rounded-lg my-2 p-4 grid grid-cols-1 gap-4 cursor-pointer md:grid-cols-4'
      >
        <div className='col-span-1 md:col-span-4'>
          <div className='pl-3'>
            <p className='text-gray-800 text-sm font-semibold truncate'>{order.nm_cliente}</p>
            <p className='text-gray-800 text-xs'>{order.ds_dstipocli}</p>
            <p className='text-gray-800 text-xs truncate'>FATURA: {order.nr_fatura}</p>
            <p className='text-gray-600 text-xs truncate'>VENCIMENTO: {new Date(order.dt_emissao).toLocaleDateString()}</p>
            <p className='text-gray-600 text-xs truncate'>VALOR: R$ {order.vl_fatura.toFixed(2)}</p>
            <p className='text-gray-600 text-xs truncate'>Perc%: {order.vl_perccomiss}%</p>
            <p className='text-gray-600 text-xs truncate'>PERCA: R$ {order.vl_vlcomis.toFixed(2)}</p>
          </div>
        </div>
      </li>
    ))}
  </ul>
</div>

  );
};

export default Comiss;
