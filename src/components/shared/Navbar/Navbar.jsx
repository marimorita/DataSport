import React, { useContext, useRef, useState, useEffect } from 'react'
import { FaUserCircle } from "react-icons/fa";
import { useLocation } from 'wouter'
import { StateContext } from '../../Context/Context';
import { ProfileMenu } from '../DropDowns/RegisterDropDown/RegisterDropDown';
import img from '../../../assets/logodataspor.png'

export const Navbar = ({customClassName, login, assistence, register, inventory, remarks}) => {
  const [location, setLocation] = useLocation();

  return (
    <div className='w-full flex items-center justify-center'>
        <div className='w-[80%] h-[5.5rem] rounded-[20px] flex items-center justify-between  bg-white gap-[2rem] mt-[2rem] shadow-2xl'>
            <div className='w-[20%] flex items-center justify-center'>
{/*             <div className=' bg-[#FE7A36] rounded-full'>
              
            </div> */}
            <img src={img} alt="" className='w-[3.5rem] h-[3.5rem]' />
            </div>
            <div className=''>
            <ul className='text-[25px] w-[40%] gap-[5rem] flex cursor-pointer'>
                <li onClick={assistence}>Asistencia</li>
                <li onClick={register}>Registros</li>
                <li onClick={inventory}>Inventario</li>
                <li onClick={remarks}>Observaciones</li>
            </ul>
            </div>
            {login ? <FaUserCircle className={`${customClassName} w-[20%] text-[60px]`} /> : <div className='w-[50%] flex justify-center gap-3 '><button onClick={() => setLocation("/admin")} className=' w-[50%] text-[25px] text-[#F0ECE3] flex justify-center cursor-pointer bg-[#2F2C37] shadow-xl rounded-[18px] ' >Register</button><button onClick={() => setLocation("/login/HJQL9823")} className=' w-[30%] text-[25px] text-[#F0ECE3] flex justify-center cursor-pointer bg-[#2F2C37] shadow-xl rounded-[18px] ' >Login</button></div> }
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
    <div className='w-full flex items-center justify-center '>
        <div className='w-[80%] h-[5.5rem] rounded-[20px] flex items-center justify-between  bg-white gap-[2rem] mt-[2rem] shadow-2xl'>
            <div className='w-[20%] h-full flex items-center justify-center'>
{/*             <div onClick={() => setLocation(`/HJQL9823/${routeAdmin}/home`)} className='w-[3.5rem] h-[3.5rem] text-white bg-[#FE7A36] flex justify-center items-center rounded-full cursor-pointer'>
              <b>Inicio</b>
            </div> */}
            <img src={img} alt="DataSport" onClick={() => setLocation(`/HJQL9823/${routeAdmin}/home`)} className='w-[90px] h-[90px] cursor-pointer' />
            </div>
            <div className=''>
            <ul className='text-[25px] w-[40%] gap-[5rem] flex cursor-pointer'>
                <li onClick={() => setLocation(`/HJQL9823/${routeAdmin}/assistance`)}>Asistencia</li>
                <li onClick={() => setLocation(`/HJQL9823/${routeAdmin}/registeredlist`)}>Registros</li>
                <li onClick={() => setLocation(`/HJQL9823/${routeAdmin}/inventory`)}>Inventario</li>
                <li onClick={() => setLocation(`/HJQL9823/${routeAdmin}/observation`)}>Observaciones</li>
            </ul>
            </div>
            {login ? <> <ProfileMenu customClassName={'text-[#692FDB]'} LocationProfile={`/HJQL9823/${routeAdmin}/profile/A`} LocationLogout={`/`} /> {/* <FaUserCircle className={`${customClassName} w-[20%] text-[60px] cursor-pointer`} onClick={() => setLocation(`/HJQL9823/${routeAdmin}/profile/A`)}   /> */} </> : <div className='w-[20%] flex justify-center '><button onClick={() => setLocation("/login/HJQL9823")} className=' w-[50%] text-[25px] text-[#F0ECE3] flex justify-center cursor-pointer bg-[#2F2C37] shadow-xl rounded-[18px] ' >Login</button></div> }
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
{/*             <div onClick={() => setLocation(`/KQWJ7482/${routeEmployee}/home`)} className='w-[3.5rem] h-[3.5rem] text-white bg-[#FE7A36] flex justify-center items-center rounded-full cursor-pointer'>
              <b>Inicio</b>
            </div> */}
            <img src={img} alt="DataSport" onClick={() => setLocation(`/KQWJ7482/${routeEmployee}/home`)} className='w-[90px] h-[90px] cursor-pointer' />
            </div>
            <div className=''>
            <ul className='text-[25px] w-[40%] gap-[5rem] flex cursor-pointer'>
                <li onClick={() => setLocation(`/KQWJ7482/${routeEmployee}/assistance`)}>Asistencia</li>
                <li onClick={() => setLocation(`/KQWJ7482/${routeEmployee}/registeredlist`)}>Registros</li>
                <li onClick={() => setLocation(`/KQWJ7482/${routeEmployee}/inventory`)}>Inventario</li>
                <li onClick={() => setLocation(`/KQWJ7482/${routeEmployee}/observation`)}>Observaciones</li>
            </ul>
            </div>
            {login ? <> <ProfileMenu customClassName={'text-[#FE7A36]'} LocationProfile={`/KQWJ7482/${routeEmployee}/profile/E`} LocationLogout={`/`} /> {/* <FaUserCircle className={`${customClassName} w-[20%] text-[60px] cursor-pointer`}  onClick={() => setLocation(`/KQWJ7482/${routeEmployee}/profile/E`)} /> */} </> : <div className='w-[20%] flex justify-center '><button onClick={() => setLocation("/login/HJQL9823")} className=' w-[50%] text-[25px] text-[#F0ECE3] flex justify-center cursor-pointer bg-[#2F2C37] shadow-xl rounded-[18px] ' >Login</button></div> }
        </div>
    </div>
  )
}

export const NavbarType = ({ type }) => {
  return (
    <div>
      {type === 'admin' ? <NavbarAdmin login={true} NavbarEmployee customClassName={'text-[#692FDB]'} /> : <NavbarEmployee login={true} customClassName={'text-[#692FDB]'} />}
    </div>
  );
};