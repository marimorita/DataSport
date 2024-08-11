import React, { useState } from 'react';
import {ButtomHome}  from '../../shared/Button/Buttons';
import { useLocation } from 'wouter';
import asistence from '../../../assets/asistence.png';
import AsistenceTable from '../../shared/userTable/asistenceTable';
import AsistenceBuscador from '../../shared/InputForms/InputForms';
import Buscador from '../../shared/InputForms/InputForms';
import AsistenceCarrusel from '../../Carrusel/AsistenceCarrusel/carrusel2';
import StatusCard from '../../shared/utils/utils';
import generateAsistencePDF from '../../shared/GeneratePDF/AsistenceReport';



export const Asistence = ({Location}) => {
  const [location, setLocation] = useLocation();
  const [asistencia, setAsistencia] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [showTable, setShowTable] = useState(false);
  const [possibleMatch, setPossibleMatch] = useState(null);

  const statusColors = {
    'Activo': 'bg-[#FE8D32]',
    'Pendiente': 'bg-[#5023A7]',
    'Inactivo': 'bg-[#3F3D56]'
  };

  const datosSimulados = [
    { status: 'activo', document: '1092456050', name: 'Jeronimo Arias Mosquera', phone: '555-1234' },
    { status: 'pendiente', document: '1234567890', name: 'María Fernanda Gómez', phone: '555-5678' },
    { status: 'inactivo', document: '9876543210', name: 'Carlos Eduardo Perez', phone: '+56 9 8765 4321' },
    { status: 'activo', document: '1122334455', name: 'Ana Lucía Ramírez', phone: '+52 1 2345 6789' },
    { status: 'pendiente', document: '2233445566', name: 'Juan David Torres', phone: '+34 912 345 678' },
    { status: 'inactivo', document: '3344556677', name: 'Luisa Fernanda Ortiz', phone: '+55 11 9876 5432' },
    { status: 'activo', document: '4455667788', name: 'Mateo Hernández', phone: '+44 20 7946 0958' },
    { status: 'pendiente', document: '5566778899', name: 'Valentina López', phone: '555-1234' },
  ];

  const verificarDocumento = (documento) => {
    const datosEncontrados = datosSimulados.find(dato => dato.document === documento);
    if (datosEncontrados) {
      if (!asistencia.some(a => a.document === datosEncontrados.document)) {
        setAsistencia([...asistencia, datosEncontrados]);
        setShowTable(true);
      }
    } else {
      // Mostrar mensaje de error o alguna indicación visual
    }
  };

  const handleInputChange = (value) => {
    setInputValue(value);
    if (value.trim() === '') {
      setPossibleMatch(null);
    } else {
      const possibleMatch = datosSimulados.find(dato =>
        dato.document.includes(value)
      );
      setPossibleMatch(possibleMatch);
    }
  };

  const handleRegisterAttendance = (user) => {
    if (user) {
      verificarDocumento(user.document);
      setInputValue('');
      setPossibleMatch(null);
    }
  };

  const handleGeneratePDF = () => {
    generateAsistencePDF(asistencia);
  };
  return (
    <div className='bg-[#F0ECE3] w-full h-full flex flex-col flex-1 items-center relative'>
      <div className='flex items-center justify-center w-full h-[3.2rem] '>
        <div className='absolute left-[20%] top-[6%]' onClick={() => setLocation(Location)}>
          <ButtomHome Text={'Regresar'} />
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
      <div className='my-[3rem] w-[50%] flex-row justify-evenly border-2 border-[#444444] rounded-md shadow-xl'>
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
    <AsistenceTable users={asistencia} />
  </div>
)}

      
    </div>
  );
};