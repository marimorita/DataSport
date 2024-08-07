import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'wouter';
import { toast, ToastContainer } from "react-toastify";
import { IoMdArrowRoundBack } from 'react-icons/io';
import { ButtomHome } from '../../shared/Button/Buttons';
import TableComponent from '../../shared/userTable/userTable';
import Buscador from '../../shared/InputForms/InputForms';
import StatusDropdown from '../../shared/DropDowns/StatusFilter';
import RegisterDropdown from '../../shared/DropDowns/RegisterDropDown/RegisterDropDown';
import axios from '../../../../axiosConfig';
import { StateContext } from '../../Context/Context';

export const Registerlist = () => {
  const [location, setLocation] = useLocation();
  const { clientsView, setClientsView } = useContext(StateContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('Filtrar');

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('/clients/clients');
        // console.log(response.data);

        setClientsView(response.data)

      } catch (error) {
        console.error("Error getting clients", error);
      }
    };

    fetchClients();
  }, [setClientsView]);

  // useEffect(() => {
  //   console.log('clientsView state updated:', clientsView); // Verifica el estado actualizado
  // }, [clientsView]);

  useEffect(() => {
    filterUsers();
  }, [searchTerm, selectedStatus, clientsView]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  const filterUsers = () => {
    let results = clientsView;
    
    if (searchTerm !== '') {
      results = results.filter(user =>
        String(user.id).includes(searchTerm) || user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedStatus !== 'Filtrar') {
      results = results.filter(user => user.state === selectedStatus);
    }
    
    setFilteredUsers(results);    
  };
  
    const toggleCreateUser = async () => {
  
      const userData = {
        state: 'Pendiente'
      };
  
      try {
        const token = localStorage.getItem('token');
        const response = await axios.patch(`/clients/clients/${1658448984}/state`, userData, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      });
        
        if (response.status === 200 || response.status === 201) {
          toast.success('se cambio', {
            progressStyle: {
              backgroundColor: '#692FDB', // Color de la barra de carga
            },
          });
        } else {
          toast.error(error.response.data.error, {
            progressStyle: {
              backgroundColor: '#692FDB', // Color de la barra de carga
            },
          });
        }
      } catch (error) {
        toast.error(error.response.data.error, {
          progressStyle: {
            backgroundColor: '#692FDB', // Color de la barra de carga
          },
        });
      }
  
    };

  return (
    <>
    <div className='bg-[#F0ECE3] w-full h-full flex flex-col flex-1 items-center relative py-[2.5%]'>
      <div className='absolute left-[5%] py-3' onClick={() => setLocation("/")}>
        <ButtomHome customClassName={''} />
        <IoMdArrowRoundBack className="hidden sm:inline-block sm:text-[3rem] sm:top-[1%] text-[#000000] bg-[#F0ECE3] p-[0.5rem] rounded-[10px] shadow-xl border-2 border-transparent" />
      </div>
      <label className="flex flex-row justify-evenly mt-[1.4%] items-center">
        <Buscador onChange={handleSearch} value={searchTerm} />
        <StatusDropdown onStatusChange={handleStatusChange} />
        <RegisterDropdown />
      </label>
      <h1 className='text-[2rem] mt-[5rem] 2xl:text-[2rem] xl:text-[1.5rem] lg:text-[1.7rem]'>Usuarios Registrados</h1>
      <div className='m-2 h-full w-[90%] flex flex-wrap justify-center items-center mb-[15px] lg:w-[92%]'>
        {filteredUsers.length > 0 ? (
          <TableComponent users={filteredUsers} />
        ) : (
          <p>No se encontró ningún usuario con ese documento.</p>
        )}
      </div>
      <button className='bg-white text-center w-48 rounded-2xl h-14 relative font-sans text-black text-xl font-semibold group' onClick={toggleCreateUser} />

    </div>
    <ToastContainer position="top-center" autoClose={1500} pauseOnHover={false}  />
    </>
  );
}