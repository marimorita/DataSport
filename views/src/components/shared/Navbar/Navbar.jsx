import React from 'react'
import { FaUserCircle } from "react-icons/fa";
import { useLocation } from 'wouter'



export const Navbar = () => {
  const [location, setLocation] = useLocation();
  return (
    <div className='w-full flex items-center justify-center'>
        <div className='w-[80%] h-[5.5rem] rounded-[20px] flex items-center justify-between  bg-white gap-[2rem] mt-[2rem] shadow-2xl'>
            <div className='w-[20%] flex items-center justify-center'>
            <div className='w-[3.5rem] h-[3.5rem] bg-[#FE7A36] rounded-full'>
            </div>
            </div>
            <div className=''>
            <ul className='text-[25px] w-[40%] gap-[5rem] flex cursor-pointer'>
                <li onClick={() => setLocation("/asitencia")}>Asistencia</li>
                <li onClick={() => setLocation("/registeredlist")}>Registros</li>
                <li>Inventario</li>
                <li>Observaciones</li>
            </ul>
            </div>
            <FaUserCircle className=" w-[20%] text-[60px] text-[#692FDB]  " />
        </div>
    </div>
  )
}
