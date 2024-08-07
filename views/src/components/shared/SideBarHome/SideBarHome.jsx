import React from 'react'
import { Buttonfilter } from '../Button/Buttons'
import { useLocation } from 'wouter'
import { Namelocal } from '../Figures/Figures'




export const SideBarHome = () => {
    const [location, setLocation] = useLocation();
    return (
        <div className='fixed top-0 bottom-0 left-0 overflow-y-auto w-[22%] bg-gradient-to-b from-[#503A7A] to-[#F0ECE3] rounded-r-[20px] rounded-br-[20px] shadow-inner flex flex-col justify-center items-center gap-[3rem] '>
                <div>
                <Namelocal />
                </div>
            <div className=' w-full flex flex-col items-center '>
                <div onClick={() => setLocation("/createusers")}>
                <Buttonfilter Text={'Inventario'} customClassName={'m-[1rem] text-[30px] text-white bg-gradient-to-r from-[#FF9F2E]  to-[#FE7A36] px-[3rem] py-[0.5rem] rounded-[10px] shadow-md '} />
                </div>
                <div onClick={() => setLocation("/createusers")}>
                <Buttonfilter Text={'Registros'} customClassName={'m-[1rem] text-[30px] text-white bg-gradient-to-r from-[#FF9F2E]  to-[#FE7A36] px-[3rem] py-[0.5rem] rounded-[10px] shadow-md '} />
                </div>
            </div>
        </div>
    )
}
