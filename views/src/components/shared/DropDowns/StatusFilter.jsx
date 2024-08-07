import React, { useState } from 'react';

// Definir los colores para cada estado
const statusColors = {
  Active: '#FE8D32',
  Pending: '#5023A7',
  Inactive: '#3F3D56',
};

const StatusDropdown = ({ onStatusChange }) => {
    const [selectedStatus, setSelectedStatus] = useState('Filtrar');
    const [isOpen, setIsOpen] = useState(false);
  
    const handleChange = (status) => {
      const newStatus = status === 'No Filtrar' ? 'Filtrar' : status;
      setSelectedStatus(newStatus);
      setIsOpen(false);
      onStatusChange(newStatus); // Notifica al componente padre sobre el cambio
    };
  const handleClickOutside = (event) => {
    if (!event.target.closest('.dropdown')) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block w-36 dropdown left-11">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#f0ece4] border border-black shadow-xl  font-semibold rounded-md py-2 px-6 w-full text-center flex items-center justify-evenly"
      >
        <span >{selectedStatus}</span>
       
      </button>
      {isOpen && (
        <div className="absolute left-0  w-full bg-[#f0ece4] border border-gray-300 rounded-sm shadow-lg">
          <div
            onClick={() => handleChange('Activo')}
            className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
          >
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: statusColors.Active }} // Color para "Active"
            ></div>
            <span className="ml-2">Activo</span>
          </div>
          <div
            onClick={() => handleChange('Pendiente')}
            className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
          >
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: statusColors.Pending }} // Color para "Pending"
            ></div>
            <span className="ml-2">Pendiente</span>
          </div>
          <div
            onClick={() => handleChange('Inactivo')}
            className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
          >
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: statusColors.Inactive }} // Color para "Inactive"
            ></div>
            <span className="ml-2">Inactivo</span>
          </div>
          <div
            onClick={() => handleChange('No Filtrar')}
            className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
           
          >
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: '#D1D5DB' }} // Gris claro para la opción "No Filtrar"
            ></div>
            <span className="ml-2">No Filtrar</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusDropdown;
