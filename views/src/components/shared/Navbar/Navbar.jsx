import React, { useContext, useRef, useState, useEffect } from 'react'
import { FaUserCircle } from "react-icons/fa";
import { useLocation } from 'wouter'
import { StateContext } from '../../Context/Context';

export const Navbar = ({customClassName, login}) => {
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
                <li onClick={() => setLocation(`/`)}>Asistencia</li>
                <li onClick={() => setLocation(`/`)}>Registros</li>
                <li>Inventario</li>
                <li>Observaciones</li>
            </ul>
            </div>
            {login ? <FaUserCircle className={`${customClassName} w-[20%] text-[60px]`} /> : <div className='w-[20%] flex justify-center '><button onClick={() => setLocation("/login/HJQL9823")} className=' w-[50%] text-[25px] text-[#F0ECE3] flex justify-center cursor-pointer bg-[#2F2C37] shadow-xl rounded-[18px] ' >Login</button></div> }
        </div>
    </div>
  )
}


export const NavbarAdmin = ({customClassName, login}) => {
  const [routeAdmin, setRouteAdmin] = useState(localStorage.getItem('routeA') || '');
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const storedRoute = localStorage.getItem('routeA');
    if (storedRoute !== routeAdmin) {
      setRouteAdmin(storedRoute);
    }
  }, [routeAdmin]);

  return (
    <div className='w-full flex items-center justify-center'>
        <div className='w-[80%] h-[5.5rem] rounded-[20px] flex items-center justify-between  bg-white gap-[2rem] mt-[2rem] shadow-2xl'>
            <div className='w-[20%] flex items-center justify-center'>
            <div className='w-[3.5rem] h-[3.5rem] bg-[#FE7A36] rounded-full'>
            </div>
            </div>
            <div className=''>
            <ul className='text-[25px] w-[40%] gap-[5rem] flex cursor-pointer'>
                <li onClick={() => setLocation(`/HJQL9823/${routeAdmin}/assistance`)}>Asistencia</li>
                <li onClick={() => setLocation(`/HJQL9823/${routeAdmin}/registeredlist`)}>Registros</li>
                <li>Inventario</li>
                <li>Observaciones</li>
            </ul>
            </div>
            {login ? <FaUserCircle className={`${customClassName} w-[20%] text-[60px] cursor-pointer`} onClick={() => setLocation(`/HJQL9823/${routeAdmin}/profile/A`)}   /> : <div className='w-[20%] flex justify-center '><button onClick={() => setLocation("/login/HJQL9823")} className=' w-[50%] text-[25px] text-[#F0ECE3] flex justify-center cursor-pointer bg-[#2F2C37] shadow-xl rounded-[18px] ' >Login</button></div> }
        </div>
    </div>
  )
}

export const NavbarEmployee = ({customClassName, login}) => {
  const [routeEmployee, setRouteEmployee] = useState(localStorage.getItem('routeE') || '');
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const storedRoute = localStorage.getItem('routeE');
    if (storedRoute !== routeEmployee) {
      setRouteEmployee(storedRoute);
    }
  }, [routeEmployee]);
  

  return (
    <div className='w-full flex items-center justify-center'>
        <div className='w-[80%] h-[5.5rem] rounded-[20px] flex items-center justify-between  bg-white gap-[2rem] mt-[2rem] shadow-2xl'>
            <div className='w-[20%] flex items-center justify-center'>
            <div className='w-[3.5rem] h-[3.5rem] bg-[#FE7A36] rounded-full'>
            </div>
            </div>
            <div className=''>
            <ul className='text-[25px] w-[40%] gap-[5rem] flex cursor-pointer'>
                <li onClick={() => setLocation(`/KQWJ7482/${routeEmployee}/assistance`)}>Asistencia</li>
                <li onClick={() => setLocation(`/KQWJ7482/${routeEmployee}/registeredlist`)}>Registros</li>
                <li>Inventario</li>
                <li>Observaciones</li>
            </ul>
            </div>
            {login ? <FaUserCircle className={`${customClassName} w-[20%] text-[60px] cursor-pointer`}  onClick={() => setLocation(`/KQWJ7482/${routeEmployee}/profile/E`)} /> : <div className='w-[20%] flex justify-center '><button onClick={() => setLocation("/login/HJQL9823")} className=' w-[50%] text-[25px] text-[#F0ECE3] flex justify-center cursor-pointer bg-[#2F2C37] shadow-xl rounded-[18px] ' >Login</button></div> }
        </div>
    </div>
  )
}
