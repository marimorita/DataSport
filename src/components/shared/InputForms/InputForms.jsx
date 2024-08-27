import React, {useState} from 'react'
import { FaUserCircle } from 'react-icons/fa'

export const InputFormsAdmin = ({placeholder,type,userRef}) => {
  return (
    <>
    <div className='w-[272px] h-[64px]  p-1 rounded-[4px] bg-gradient-to-r from-[#FE7A36]  to-[#381975] '>
      <div className=' w-full h-full bg-[#efeeee] flex items-center justify-center'>
            <input type={type} required placeholder={placeholder} className='w-full h-full text-[#3f3d56] placeholder-[#3f3d56] bg-[#efeeee] text-[18px] indent-[20px] rounded-[4px] ' ref={userRef} />
      </div>
    </div>
    </>
  )
}

export const InputFormsEmployees = ({placeholder,type,userRef}) => {
  return (
    <>
    <div className='w-[272px] h-[64px] p-[3px] rounded-[4px] bg-[#1E1E1E]'>
      <div className=' w-full h-full bg-[#efeeee] flex items-center justify-center'>
            <input type={type} required placeholder={placeholder} className='w-full h-full text-[#3f3d56] placeholder-[#3f3d56] bg-[#efeeee] text-[18px] indent-[20px] rounded-[4px] ' ref={userRef} />
      </div>
    </div>
    </>
  )
}

export const InputFormsUsers = ({placeholder,type,userRef}) => {
  return (
    <>
    <div className='w-[272px] h-[64px] p-[3px] rounded-[4px] bg-[#1E1E1E]'>
      <div className=' w-full h-full bg-[#efeeee] flex items-center justify-center'>
            <input type={type} required placeholder={placeholder} className='w-full h-full text-[#3f3d56] placeholder-[#3f3d56] bg-[#efeeee] text-[18px] indent-[20px] rounded-[4px] ' ref={userRef} />
      </div>
    </div>
    </>
  )
}

export const InputFormsreg = ({ placeholder }) => {
  return (
    <>
        <div className=' w-[240px] h-[50px]  p-1 rounded-[4px] border-[4px] border-[#381975] bg-[#efeeee] flex items-center justify-center'>
          <input type="text" placeholder={placeholder} className='w-full h-full text-[#3f3d56] placeholder-[#3f3d56] bg-[#efeeee] text-[20px] indent-[20px] rounded-[4px] ' />
        </div>
     
    </>
  )
}

export const InputFormslog = ({placeholder,type,userRef}) => {
  return (
    <>
    <div className='w-[280px] h-[55px]  p-1 rounded-[5px] bg-[#FE7A36]'>
      <div className=' w-full h-full bg-[#efeeee] flex items-center justify-center'>
            <input type={type} placeholder={placeholder} className='w-full h-full text-[#3f3d56] placeholder-[#3f3d56] bg-[#efeeee] text-[20px] indent-[20px] rounded-[4px] ' ref={userRef} />
      </div>
    </div>
    </>
  )
}

export const InputFormslog2 = ({ placeholder,type,userRef }) => {
  return (
    <>
      <div className='w-[280px] h-[55px]  p-1 rounded-[5px] bg-[#692FDB]'>
        <div className=' w-full h-full bg-[#efeeee] flex items-center justify-center'>
          <input type={type} placeholder={placeholder} className='w-full h-full text-[#3f3d56] placeholder-[#3f3d56] bg-[#efeeee] text-[20px] indent-[20px] rounded-[4px] ' ref={userRef} />
        </div>
      </div>
    </>
  )
}

export const Inputrecuerdame = ({ placeholder, onChange = () => { } }) => {
  const [checked, isChecked] = useState(false);

  const handleClick = () => isChecked(val => {
    const nextValue = !val
    onChange(nextValue)
    return nextValue
  })

  const CheckComponent = () => {
    return <div className='flex items-center justify-center pointer-events-none select-none rounded-[3px] size-5' >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path></svg>    </div>
  }
  return (
    <>
      <div className='flex h-[30px] content-between'>
        <input checked={checked} value={checked} type="checkbox" className='hidden' />

        <div onClick={handleClick} className='size-5 outline outline-[#3f3d56] rounded-[5px] m-0 p-0'>
          {
            checked && <CheckComponent />
          }
        </div>


        <div className=' justify-center'>
          <p className='mx-2 text-[15px] placeholder-[#3f3d56] '>{placeholder}</p>
        </div>
      </div>
    </>
  )
}

export const Inputolvi = ({ placeholder, textsize, onClick, customClassName }) => {
  return (
    <div onClick={() => onClick && onClick()} className={`${customClassName} cursor-pointer`}>
      <p className={`w-fit mb-3 border-b-[4px] border-[#3f3d56] px-1 placeholder-[#3f3d56] mt-1 right-2 text-[${textsize}]`} >{placeholder}</p>
    </div>

  )
}


export const Perfilcontenedor = ({ customClassName, nombre, apellido, documento, Background, icon }) => {
  return (
    
    <div className={`${customClassName} w-[22rem] h-[5rem] flex items-center justify-evenly cursor-pointer xl:w-[20rem]`}>
      <div className={`${Background} w-[18%] h-[5rem]`}>
        
      </div>
      
      <div className='w-[65%] flex-col px-[10px] '>
        <div className='text-[16px]  '>
          {nombre}
          {apellido}
        </div>
        {documento}
      </div>
      <FaUserCircle className={`w-[17%] text-[40px] text-[${icon}] flex justify-end`} />
    </div>
  );
}

export const Buscador = ({ onChange, value }) => {
  return (
    <div className="relative">
      <input
        placeholder="Buscar con documento"
        className="input shadow-lg border-2 border-[#000000] hover:border-2 hover:border-[#000000] px-5 py-3 rounded-xl w-[20rem] transition-all outline-none"
        name="search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <svg
        className="size-6 absolute top-3 right-3 text-[#000000]"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          strokeLinejoin="round"
          strokeLinecap="round"
        ></path>
      </svg>
    </div>
  );
};

export const AsistenceBuscador = ({ value, onChange, possibleMatch, onSelectMatch, onRegisterAttendance }) => {
  return (
    <div className="w-full max-w-[25rem] "> {/* Contenedor principal con ancho máximo */}
      <div className="relative  w-full">
        <Buscador
          value={value}
          onChange={onChange}
        />
      </div>
      {possibleMatch && (
        <div className='w-full bg-white border border-gray-300 rounded-b-md shadow-md p-2 text-center cursor-pointer'
             onClick={() => onSelectMatch(possibleMatch.document)}>
          <p>¿Buscabas a {possibleMatch.name}?</p>
          <button
            className="bg-[#3F3D56] text-white font-bold py-1 px-2 rounded-[10px] mt-2"
            onClick={(e) => {
              e.stopPropagation();
              onRegisterAttendance(possibleMatch);
            }}
          >
            Registrar Asistencia
          </button>
        </div>
      )}
    </div>
  );
};
export default AsistenceBuscador;