import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'wouter';
import { toast, ToastContainer } from "react-toastify";
import { IoMdArrowRoundBack } from 'react-icons/io';
import { ButtomHome } from '../../shared/Button/Buttons';
import TableComponent from '../../shared/userTable/registerTable';
import Buscador from '../../shared/InputForms/InputForms';
import StatusDropdown from '../../shared/DropDowns/StatusFilter';
import {RegisterMenu} from '../../shared/DropDowns/RegisterDropDown/RegisterDropDown';
import StatusCard from '../../shared/utils/utils';
import SearchVector from '../../../assets/Searching.png'
import {axiosInstance} from '../../../../axiosConfig';
import { StateContext } from '../../Context/Context';
import { NavbarType } from '../../shared/Navbar/Navbar';


const SearchWithSuggestion = ({ onChange, value, possibleMatch, onSelectMatch }) => {
  return (
    <div className="relative">
      <Buscador onChange={onChange} value={value} />
      {possibleMatch && (
        <div className='absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-b-md shadow-md p-2 text-center z-10'>
          <p>¿Buscabas a {possibleMatch.name}?</p>
          <button
            className="bg-[#3F3D56] text-white font-bold py-1 px-2 rounded-[10px] mt-2"
            onClick={() => onSelectMatch(possibleMatch)}
          >
            Seleccionar
          </button>
        </div>
      )}
    </div>
  );
};


export const Registerlist = ({Location, LocationProfile, LocationRegisterUser, LocationRegisterEmployee, nabvar}) => {
  const [location, setLocation] = useLocation();
  const { clientsView, setClientsView } = useContext(StateContext);
  const [inputValue, setInputValue] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [possibleMatch, setPossibleMatch] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('Filtrar');
  const [hasAccess, setHasAccess] = useState(true); 

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axiosInstance.get('/clients/clients');
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
  }, [inputValue, selectedStatus, clientsView]);

  const handleInputChange = (value) => {
    setInputValue(value);
    if (value.trim() === '') {
      setPossibleMatch(null);
    } else {
      const possibleMatch = clientsView.find(date =>
        date.id.includes(value)
      );
      setPossibleMatch(possibleMatch);
    }
    setSelectedUser(null);
  };


  const handleSelectMatch = (user) => {
    setSelectedUser(user);
    setInputValue('');
    setPossibleMatch(null);
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  const filterUsers = () => {
    let results = clientsView;
    
    if (inputValue !== '') {
      results = results.filter(user =>
        String(user.id).includes(inputValue) || user.name.toLowerCase().includes(inputValue.toLowerCase())
      );
    }
    
    if (selectedStatus !== 'Filtrar') {
      results = results.filter(user => user.state === selectedStatus);
    }
    
    setFilteredUsers(results);    
  };
  
    const toggleCreateUser = async () => {
  
      const userData = {
        state: 'Activo'
      };
  
      try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.patch(`/clients/clients/${1214656454}/state`, userData, {
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

    const handleNoAccess = () => {
      setHasAccess(false); // Cambia el estado si no tiene acceso
      toast.error('No tienes acceso a esta página', {
        progressStyle: {
          backgroundColor: '#692FDB',
        },
      });
    };

    const userType = nabvar; 

  return (
    <>
    <div className='bg-[#F0ECE3] w-full h-full flex flex-col flex-1 items-center relative  gap-[2rem]'>
    <div className="w-full h-auto bg-[#F0ECE3] flex flex-col gap-[5rem]">
      <NavbarType type={userType} />
      </div>
      <div className='absolute left-[5%] ' onClick={() => setLocation(Location)}>
        <IoMdArrowRoundBack className="hidden sm:inline-block sm:text-[3rem] sm:top-[1%] text-[#000000] bg-[#F0ECE3] p-[0.5rem] rounded-[10px] shadow-xl border-2 border-transparent" />
      </div>
      <div className="flex justify-between w-60% items-center">
        <SearchWithSuggestion 
          onChange={handleInputChange} 
          value={inputValue}  
          possibleMatch={possibleMatch}
          onSelectMatch={handleSelectMatch}
        />
        <StatusDropdown onStatusChange={handleStatusChange} />
        <RegisterMenu  LocationRegisterUser={LocationRegisterUser} LocationRegisterEmployee={LocationRegisterEmployee} />
      </div>
      <div className='w-[50%] flex h-[14rem] border bg-white m-6 rounded-xl items-center shadow-2xl'>
        <img src={SearchVector} alt="SearchingVector" className='w-[200px] p-1'/>
        <p className='text-center m-[0.5rem]'>Aquí, podrás encontrar todos los usuarios registrados del establecimiento. Además, tendrás la opción de registrar nuevos usuarios de manera sencilla y rápida. ¡Explora y gestiona tu lista de usuarios con facilidad!</p>
      </div>
      <StatusCard/>
      <div className='m-2 h-full w-[90%] flex flex-wrap justify-center items-center mb-[15px] lg:w-[92%]'>
        {selectedUser ? (
          <TableComponent users={[selectedUser]} LocationProfile={LocationProfile} />
        ) : filteredUsers.length > 0 ? (
          <TableComponent users={filteredUsers} LocationProfile={LocationProfile} />
        ) : (
          <p>No se encontró ningún usuario con ese documento o estado.</p>
        )}
      </div>
    </div>
    <ToastContainer position="top-center" autoClose={1500} pauseOnHover={false}  />
    </>
  );
}