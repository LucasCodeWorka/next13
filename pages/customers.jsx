import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Modal from 'react-modal';
import { BsPersonFill, BsThreeDotsVertical } from 'react-icons/bs';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const Customers = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [expandedItems, setExpandedItems] = useState({});
  const [filterName, setFilterName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null); // Alterado para um único pedido selecionado
  const router = useRouter();
  const unprotectedRoutes = ['/login', '/logout'];

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (!isLoggedIn && !unprotectedRoutes.includes(router.pathname)) {
      router.push('/login');
    } else {
      fetchData();
    }
  }, [router.pathname]);

  const fetchData = async () => {
    try {
      const userLogin = parseInt(localStorage.getItem('userLogin'));

      const [cliResponse, prodResponse] = await Promise.all([
        fetch('https://api4-eta.vercel.app/cli'),
        fetch('https://api4-eta.vercel.app/prod')
      ]);

      const cliData = await cliResponse.json();
      const prodData = await prodResponse.json();

      // Filtra os dados de clientes com base no usuário logado
      const filteredCliData = cliData.filter(cliItem => cliItem.cd_representant === userLogin);

      const combinedData = filteredCliData.map(cliItem => {
        const cliKey = cliItem.nome.split(' - ')[0].trim(); // Obtém o cliKey do nome
        const clientProducts = prodData.filter(prodItem => prodItem.cd_cliente.toString() === cliKey);
        console.log(clientProducts)
        return { ...cliItem, products: clientProducts };
      });

      setData(combinedData);
      setFilteredData(combinedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const filterByCnpj = (cnpj) => {
    const filtered = data.filter(order => order.cpfcnpj.includes(cnpj));
    setFilteredData(filtered);
  };

  const filterByLastPurchaseDate = (months) => {
    const currentDate = new Date();
    const filtered = data.filter(order => {
      const lastPurchaseDate = new Date(order.ultimacompra);
      const diffInMonths = (currentDate.getFullYear() - lastPurchaseDate.getFullYear()) * 12 + (currentDate.getMonth() - lastPurchaseDate.getMonth());
      return months === '6' ? diffInMonths < 6 : months === '6+' ? diffInMonths >= 6 : true;
    });
    setFilteredData(filtered);
  };

  const filterByName = (name) => {
    setFilterName(name);
    const filtered = data.filter(order => order.nome.toLowerCase().includes(name.toLowerCase()));
    setFilteredData(filtered);
  };

  const toggleExpand = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const openModal = (order) => {
    setSelectedOrder(order); // Define o pedido selecionado para abrir o modal
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedOrder(null); // Limpa o pedido selecionado ao fechar o modal
    setIsModalOpen(false);
  };

  return (
    <div className='bg-gray-100 min-h-screen'>
      <div className='p-4'>
        <h2 className='text-gray-800 font-bold text-XL2 mb-4'>LISTA DE CLIENTES</h2>
        <div className="flex flex-col space-y-4 mb-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
          <input type="text" placeholder="CNPJ" onChange={(e) => filterByCnpj(e.target.value)} className="border border-gray-300 rounded-md px-3 py-1" />
          <select onChange={(e) => filterByLastPurchaseDate(e.target.value)} className="border border-gray-300 rounded-md px-3 py-1">
            <option value="">Status</option>
            <option value="6">Ativos</option> 
            <option value="6+">Inativos</option>
          </select>
        </div>
        <div className="mb-4">
          <input type="text" placeholder="Nome" value={filterName} onChange={(e) => filterByName(e.target.value)} className="border border-gray-300 rounded-md px-3 py-1 w-full md:w-auto" />
        </div>
      </div>
      <ul>
        {filteredData.map((order, id) => {
          const isExpanded = expandedItems[id];

          return (
            <li key={id} className='bg-gray-50 hover:bg-gray-100 rounded-lg my-2 p-4 md:p-6 grid grid-cols-1 md:grid-cols-4 gap-6 cursor-pointer'>
              <div className='flex items-center'>
                <div className='bg-custom-color p-3 rounded-full'>
                  <BsPersonFill className='text-gray-800' />
                </div>
                <div className='pl-3'>
                  <p className='text-gray-800 text-sm font-semibold'>{order.nome || 'Nome não disponível'}</p>
                  <p className='text-gray-600 text-xs truncate'>CNPJ: {order.cpfcnpj}</p>
                  {isExpanded && (
                    <>
                      <p className='text-gray-600 text-xs truncate'>Faturas Vencidas: {order.faturas_vencidas || '0'}</p>
                      <p className='text-gray-600 text-xs truncate'>Valor Vencido: R$ {order.valor_vencido || '0'}</p>
                      <p className='text-gray-600 text-xs truncate'>Primeira Compra: {new Date(order.primeiracompra).toLocaleDateString()}</p>
                      <p className='text-gray-600 text-xs truncate'>Última Compra: {new Date(order.ultimacompra).toLocaleDateString()}</p>
                      <p className='text-gray-600 text-xs truncate'>Cidade: {order.cidade} - {order.uf}</p>
                      <p className='text-gray-600 text-xs truncate'>CEP: {order.cep}</p>
                      <p className='text-gray-600 text-xs truncate'>Email: {order.email}</p>
                      <p className='text-gray-600 text-xs truncate'>Telefone: {order.telefone}</p>
                      <p className='text-gray-600 text-xs truncate'>2023.1 : R$ {order.semestre_1_aa || '0'}</p>
                      <p className='text-gray-600 text-xs truncate'>2023.2 : R$ {order.semestre_2_aa || '0'}</p>
                      <p className='text-gray-600 text-xs truncate'>2024.1 : R$ {order.semestre_1 || '0'}</p>
                      <p className='text-gray-600 text-xs truncate'>2024.2 : R$ {order.semestre_2 || '0'}</p>
                    </>
                  )}
                  <button onClick={() => toggleExpand(id)} className='text-blue-500 text-xs mt-2'>
                    {isExpanded ? 'Ver menos' : 'Ver mais'}
                  </button>
                  <button onClick={() => openModal(order)} className='text-blue-500 text-xs mt-2 ml-10'>
                    Detalhamento
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
  <Modal
  isOpen={isModalOpen}
  onRequestClose={closeModal}
  style={customStyles}
    >
  {selectedOrder && (
    <div className="my-4">
      <p><span className="font-bold"></span> {selectedOrder.cd_cliente}</p>
      <p><span className="font-bold"></span>{selectedOrder.valor}</p>
      {selectedOrder.products && selectedOrder.products.length > 0 && (
         <>
         <h3 className="text-lg font-bold mt-4 mb-2">DETALHAMENTO:</h3>
         <table className="min-w-full divide-y divide-gray-200">
           <thead>
             <tr>
               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Família</th>
               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
             </tr>
           </thead>
           <tbody className="bg-white divide-y divide-gray-200">
             {selectedOrder.products.map((product, prodIndex) => {
               const prevProduct = selectedOrder.products[prodIndex - 1];
               const isNewGroup = !prevProduct || product.ano !== prevProduct.ano || product.semestre !== prevProduct.semestre;

               return (
                 <React.Fragment key={prodIndex}>
                   {isNewGroup && (
                     <tr className="bg-gray-100">
                       <td colSpan="2" className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                         Semestre: {product.semestre} / Ano: {product.ano}
                       </td>
                     </tr>
                   )}
                   <tr>
                     <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">{product.familia}</td>
                     <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">{product.valor}</td>
                   </tr>
                 </React.Fragment>
               );
             })}
           </tbody>
         </table>
       </>
      )}
    </div>
  )}
  <button onClick={closeModal} className="bg-gray-500 hover:gray-700 text-white font-bold py-2 px-4 rounded mt-4">
    Fechar 
  </button>
</Modal>

    </div>
  );
};

export default Customers;
