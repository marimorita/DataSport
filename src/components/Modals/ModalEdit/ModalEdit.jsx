import React from 'react'
import { IoCloseOutline } from 'react-icons/io5'

export const ModalEdit = ({ closeIcon, closeButton, visibility }) => {

  const uploadImage = async () => {
    if (!image) {
      alert('Selecciona una imagen');
      return;
    }
    }
    return (


      <div className={visibility ? ' w-screen h-screen flex justify-center items-center fixed top-0 left-0 bg-[#00000080] z-[9999999999] ' : 'hidden'}>
        <div className='w-[40%] h-[85%] bg-[#F0ECE3] flex flex-col justify-center items-center rounded-[10px] pb-[10px] animate-modal relative'>
          <IoCloseOutline fontSize={50} onClick={closeIcon} className='cursor-pointer absolute right-4 top-3 text-[#2F2E41] ' />
          <div className='w-[30rem] h-[25rem] flex justify-center'  >
            <div className='flex flex-col w-[25rem] gap-[1rem]'>
              <h1 className='text-[28px] text-center'>Edita los campos deseados</h1>
              <input className='bg-[#f1ede4] text-[#1E1E1E] rounded-[5px] h-[2.5rem] shadow-2xl border-[3px] border-[#1E1E1E] px-[10px]' type="text" placeholder='Actualiza tu Nombre...' />
              <input className='bg-[#f1ede4] text-[#1E1E1E] rounded-[5px] h-[2.5rem] shadow-2xl border-[3px] border-[#1E1E1E] px-[10px]' type="text" placeholder='Actualiza tu documento...' />
              <input className='bg-[#f1ede4] text-[#1E1E1E] rounded-[5px] h-[2.5rem] shadow-2xl border-[3px] border-[#1E1E1E] px-[10px]' type="tetx" placeholder='Actualiza tu numero...' />
              <input className='bg-[#f1ede4] text-[#1E1E1E] rounded-[5px] h-[2.5rem] shadow-2xl border-[3px] border-[#1E1E1E] px-[10px]' type="email" placeholder='Actualiza tu email...' />

              <button
                onClick={uploadImage}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-[10px]"
              >
                Agrega una foto
              </button>

              <button className='bg-[#692FDB] text-[#f1ede4] text-center text-[20px] shadow-2xl  rounded-[8px] w-[15rem] h-[2.5rem] just-center'>Realizar los cambios</button>

            </div>
          </div>
        </div>
      </div>

    )
  }

