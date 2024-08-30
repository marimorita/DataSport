import React, { useState, useEffect, useContext } from 'react';
import {ButtomHome}  from '../../shared/Button/Buttons';
import { useLocation } from 'wouter';
import asistence from '../../../assets/asistence.png';
import AsistenceTable from '../../shared/userTable/asistenceTable';
import AsistenceBuscador from '../../shared/InputForms/InputForms';
import Buscador from '../../shared/InputForms/InputForms';
import AsistenceCarrusel from '../../Carrusel/AsistenceCarrusel/carrusel2';
import StatusCard from '../../shared/utils/utils';
import generateAsistencePDF from '../../shared/GeneratePDF/AsistenceReport';
import { StateContext } from '../../Context/Context';
import {axiosInstance} from '../../../../axiosConfig';
import { NavbarType } from '../../shared/Navbar/Navbar';


export const Asistence = ({ Location, LocationProfile, nabvar }) => {
  const [location, setLocation] = useLocation();
  const { clientsView, setClientsView } = useContext(StateContext);
  const [asistencia, setAsistencia] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [showTable, setShowTable] = useState(false);
  const [possibleMatch, setPossibleMatch] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axiosInstance.get('/clients/clients');
        setClientsView(response.data);
      } catch (error) {
        console.error("Error getting clients", error);
      }
    };

    fetchClients();

    // Cargar asistencia guardada en localStorage al inicio
    const savedAsistencia = JSON.parse(localStorage.getItem('asistencia')) || [];
    setAsistencia(savedAsistencia);
    setShowTable(savedAsistencia.length > 0);
  }, [setClientsView]);

  const verificarDocumento = (documento) => {
    const datosEncontrados = clientsView.find(dato => dato.id === documento);
    if (datosEncontrados) {
      if (!asistencia.some(a => a.id === datosEncontrados.id)) {
        const nuevaAsistencia = [...asistencia, datosEncontrados];
        setAsistencia(nuevaAsistencia);
        setShowTable(true);
        // Guardar en localStorage
        localStorage.setItem('asistencia', JSON.stringify(nuevaAsistencia));
      }
    } else {
      // Mostrar mensaje de error o alguna indicación visual
      alert('El documento no se encuentra en la base de datos');
    }
  };

  const handleInputChange = (value) => {
    setInputValue(value);
    if (value.trim() === '') {
      setPossibleMatch(null);
    } else {
      const possibleMatch = clientsView.find(dato =>
        dato.id.toString().includes(value)
      );
      setPossibleMatch(possibleMatch);
    }
  };

  const handleRegisterAttendance = (user) => {
    if (user) {
      verificarDocumento(user.id);
      setInputValue('');
      setPossibleMatch(null);
    }
  };

  const handleGeneratePDF = () => {
    generateAsistencePDF(asistencia);
  };

  const userType = nabvar; 

  return (
    <div className='bg-[#F0ECE3] w-full h-full flex flex-col flex-1 items-center relative'>
      <div className="w-full h-auto bg-[#F0ECE3] flex flex-col gap-[5rem]">
      <NavbarType type={userType} />
      </div>
      <div className='flex items-center justify-center w-full h-[3.2rem] '>
        <div className='absolute left-[20%] top-[6%]' onClick={() => setLocation(Location)}>
        </div>
      </div>
      <div className="flex flex-col items-center justify-evenly w-full  ">
        <AsistenceBuscador 
          value={inputValue}
          onChange={handleInputChange}
          possibleMatch={possibleMatch}
          onSelectMatch={verificarDocumento}
          onRegisterAttendance={handleRegisterAttendance}
        />
      </div>
      <div className='my-[2rem] w-[50%] flex-row justify-evenly bg-white rounded-xl shadow-2xl'>
        <AsistenceCarrusel />
      </div>
      
      <StatusCard/>
      {!showTable ? (
        <img className='w-[300px] h-[300px]' src={asistence} alt="No hay asistencia" />
      ) : (
        <div className='mb-16 w-[85%] flex flex-col items-center relative'>
          <div className='absolute top-0 right-44  bottom-4 -mt-[4.5rem]'>
            <button
              onClick={handleGeneratePDF}
              className="bg-[#5023A7] hover:bg-[#3f1c84] text-white font-bold py-2 px-4 rounded"
            >
              Generar PDF
            </button>
          </div>
          <AsistenceTable users={asistencia} LocationProfile={LocationProfile} />
        </div>
      )}
    </div>
  );
};
