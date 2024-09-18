import React, {useContext} from 'react'
import { IoCloseOutline } from "react-icons/io5";
import logo from "../../../assets/logodataspor.png"
import { StateContext } from '../../Context/Context';

export const ModalConfirmation = ({ text, closeButton, visibility }) => {
    const { setConfirmationUpdate } = useContext(StateContext)
    return (
        <div className={visibility ? ' w-screen h-screen flex justify-center items-center fixed top-0 left-0 bg-[#00000080] z-[9999999999]' : 'hidden'}>
            <div className='w-[38%] h-[25%] bg-[#F0ECE3] flex flex-col justify-center items-center rounded-[10px]  animate-shake animate-fill-forwards relative'>
                {/* <IoCloseOutline fontSize={50} onClick={closeIcon} className='cursor-pointer absolute right-4 top-3 text-[#2F2E41] ' /> */}
                <div className='w-[100%] h-[65%] rounded-t-[10px] bg-white flex flex-col items-center justify-around relative '>
                    <div className='w-[100%] h-[5%] flex items-start justify-start pr-[5px] pl-[5px] relative'>
                        <img src={logo} alt="" className='w-[100px] h-[100px] ' />
                        <div className='w-[90%] h-[100%] flex flex-col   relative'>
                            <p className='text-[#381975] text-[25px] z-[2] '>Actualizar dato</p>
                        </div>
                    </div>
                    <div className='w-[65%] '>
                        <p className='z-[2]'>¿Seguro que quieres actualizar este dato?</p>
                    </div>
                </div>
                    <div className=' flex items-center justify-end gap-8 w-[100%] h-[35%] pr-4 z-10'>
                        <button className='w-[20%] h-[60%] flex justify-center items-center bg-gradient-to-r from-[#692FDB]  to-[#381975] rounded-[10px] text-white text-[20px] z-10 ' onClick={closeButton} >Cancelar</button>
                        <button className='w-[20%] h-[60%] flex justify-center items-center bg-gradient-to-r from-[#692FDB]  to-[#381975] rounded-[10px] text-white text-[20px] z-10 ' onClick={()=> setConfirmationUpdate(true)}>Actualizar</button>
                    </div>
            </div>
        </div>
    )
}
