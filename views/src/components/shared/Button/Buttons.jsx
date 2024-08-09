import React from 'react'

export const ButtonAdmin = ({Text, width="38%", onClick}) => {
  return (
    <>
    <button type='button' className={` w-[${width}] text-[33px] text-white bg-gradient-to-r from-[#FE7A36]  to-[#FF9F2E] px-9 py-1 rounded-[10px] shadow-md `} onClick={onClick}>{Text}</button>
    </>
  )
}

export const ButtonEmployees = ({Text, width="38%", onClick}) => {
  return (
    <>
    <button type='button' className={` w-[${width}] text-[33px] text-white bg-gradient-to-r from-[#FE7A36]  to-[#FF9F2E] px-9 py-1 rounded-[10px] shadow-md `} onClick={onClick}>{Text}</button>
    </>
  )
}

export const ButtonUsers = ({Text, width="38%", onClick}) => {
  return (
    <>
    <button type='button' className={` w-[${width}] text-[33px] text-[#1E1E1E] bg-[#F0ECE3] px-9 py-1 rounded-[10px] shadow-2xl `} onClick={onClick}>{Text}</button>
    </>
  )
}

export const Buttonreg = ({Text, width="38%"}) => {
  return (
    <>
    <button className={` w-[${width}] text-[33px] text-white bg-gradient-to-r from-[#381975]  to-[#692FDB] px-9 py-1 rounded-[10px] shadow-md `}>{Text}</button>
    </>
  )
}

export const Buttonlog = ({Text, width="38%",onClick}) => {
  return (
    <>
    <button type='button' className={`  w-[${width}] mb-[2rem] mt-[1rem] text-[30px] text-white bg-gradient-to-r from-[#FF9F2E]  to-[#FE7A36] px-[3rem] py-[0.5rem] rounded-[10px] shadow-md `} onClick={onClick}>{Text}</button>
    </>
  )
}

export const Buttonlog2 = ({onClick,Text, width}) => {
  return (
    <div >
    <button type='button'  onClick={onClick} className={` w-[${width}] mb-[2rem] mt-[1rem] text-[30px] text-white bg-gradient-to-r from-[#692FDB]  to-[#381975] px-[3rem] py-[0.5rem] rounded-[10px] shadow-md `}>{Text}</button>
    </div>
  )
}
export const Buttonredirect = ({Text,customClassName}) => {
  return (
    <div>
      <button className={`${customClassName}`}>{Text}</button>
    </div>
  )
}

export const ButtomHome = ({Text, width, customClassName, onClick }) => {
  return (
    <>
   <button onClick={onClick} className={`${customClassName}   bg-white text-center w-48 rounded-2xl h-14 relative font-sans text-black text-xl font-semibold group`}
>
  <div
    class="bg-[#5023A7] rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500"
  >
    <svg
      width="20px"
      height="20px"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#000000"
        d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
      ></path>
      <path
        fill="#000000"
        d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
      ></path>
    </svg>
  </div>
  <p class="translate-x-2">Regresar</p>
</button>
    </>
  )
}

export const Buttonfilter = ({Text, width, customClassName }) => {
  return (
    <>
    <button className={`${customClassName} w-[${width}] mb-[2rem] mt-[1rem] text-[30px] text-white px-[3rem] py-[0.5rem] rounded-[10px] shadow-md `}>{Text}</button>
    </>
  )
}
