import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'wouter';

const RegisterMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Registrar');
  const [, setLocation] = useLocation();
  const menuRef = useRef(null);

  const handleSelect = (option) => {
    if (option === 'Empleado') {
      setLocation('');
    } else if (option === 'Usuario') {
      setLocation('/createusers');
    }
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block w-36" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#f0ece4] border border-black shadow-xl font-semibold rounded-md py-2 px-4 mx-16 w-full text-center flex items-center justify-evenly"
      >
        <span>{selectedOption}</span>
      </button>
      {isOpen && (
        <div className="absolute left-0 w-full bg-[#f0ece4] border  border-gray-300 mx-16 rounded-sm shadow-lg mt-1">
          <div
            onClick={() => handleSelect('Empleado')}
            className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
          >
            <span>Empleado</span>
          </div>
          <div
            onClick={() => handleSelect('Usuario')}
            className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
          >
            <span>Usuario</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterMenu;
