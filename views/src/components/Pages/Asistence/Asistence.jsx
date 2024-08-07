import React, { useState } from 'react';
import { ButtomHome } from "../../shared/Button/Buttons";
import { Perfilcontenedor } from '../../shared/InputForms/InputForms';
import { useLocation } from 'wouter';
import asistence from '../../../assets/asistence.png'
export const Asistence = () => {
  const [location, setLocation] = useLocation();
  const [asistencia, setAsistencia] = useState([]);
  const [inputValue, setInputValue] = useState('');

  
  const datosSimulados = [
    { nombre: 'Jeronimo Arias Mosquera', documento: '1092456050', estado: 'activo' },
    { nombre: 'María Fernanda Gómez', documento: '1234567890', estado: 'pendiente' },
    { nombre: 'Carlos Eduardo Perez', documento: '9876543210', estado: 'inactivo' },
    { nombre: 'Ana Lucía Ramírez', documento: '1122334455', estado: 'activo' },
    { nombre: 'Juan David Torres', documento: '2233445566', estado: 'pendiente' },
    { nombre: 'Luisa Fernanda Ortiz', documento: '3344556677', estado: 'inactivo' },
    { nombre: 'Mateo Hernández', documento: '4455667788', estado: 'activo' },
    { nombre: 'Valentina López', documento: '5566778899', estado: 'pendiente' }
  ];

  const verificarDocumento = (documento) => {
  
    const datosEncontrados = datosSimulados.find(dato => dato.documento === documento);
    if (datosEncontrados) {
     
      if (!asistencia.some(a => a.documento === datosEncontrados.documento)) {
        setAsistencia([...asistencia, datosEncontrados]);
      }
    } else {
      
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      verificarDocumento(inputValue);
      setInputValue('');
    }
  };

  const getStyleByEstado = (estado) => {
    switch (estado) {
      case 'activo':
        return {
          Background: 'bg-gradient-to-t from-[#FF9F2E] to-[#FE7A36] rounded-l-[10px]',
          icon: '#FE8D32',
          borderColor: 'border-[#FE8D32]'
        };
      case 'pendiente':
        return {
          Background: 'bg-gradient-to-t from-[#692FDB] to-[#381975] rounded-l-[10px]',
          icon: '#5023A7',
          borderColor: 'border-[#5023A7]'
        };
      case 'inactivo':
        return {
          Background: 'bg-gradient-to-t from-[#3F3D56] to-[#3F3D56] rounded-l-[10px]',
          icon: '#3F3D56',
          borderColor: 'border-[#3F3D56]'
        };
      default:
        return {
          Background: 'bg-gray-200',
          icon: 'text-gray-400',
          borderColor: 'border-gray-400'
        };
    }
  };
  

  return (
    <div className='bg-[#F0ECE3] w-full h-full flex flex-col flex-1 items-center relative'>
      <div className='flex items-center justify-center w-full h-full mt-[4rem]'>
        <div onClick={() => setLocation("/home")}>
          <ButtomHome 
            Text={'Regresar'} 
            customClassName={'m-[1rem] text-[30px] text-[#000000] absolute left-[12rem] top-[4.5%] bg-[#F0ECE3] px-[1.5rem] py-[0.5rem] rounded-[10px] shadow-xl border-2 border-transparent transition-transform transform hover:-translate-y-2 hover:border-[#3B3A50] duration-3000'} 
          />
        </div>
      </div>
      
      <label className="flex flex-col items-center justify-center">
        <input 
          className='w-[37rem] h-[3rem] bg-white text-[25px] placeholder-[#3F3D56] px-5 border-[3px] border-[#3F3D56] rounded-[10px]' 
          type="text" 
          placeholder='Ingresa tu documento...' 
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
      </label>
      
      <h1 className='text-[3rem] m-[4rem]'>Asistencia del día</h1>
      
      {asistencia.length === 0 ? (
        <img className='w-[300px] h-[300px]'src={asistence } alt="No hay asistencia" />
      ) : (
        <div className='h-full w-[80%] flex flex-wrap justify-evenly'>
  {asistencia.map((asistente, index) => {
    const styles = getStyleByEstado(asistente.estado);
    return (
      <Perfilcontenedor
        key={index}
        nombre={asistente.nombre}
        documento={asistente.documento}
        customClassName={`m-[1rem] text-[14px] text-black bg-[#F0ECE3] pr-[0.5rem] py-[0.5rem] rounded-[10px]  transition-transform transform hover:-translate-y-2  duration-3000 shadow-md border-2  ${styles.borderColor}`}
        Background={styles.Background}
        icon={styles.icon}
      />
    );
  })}
</div>

      )}
    </div>
  )
}