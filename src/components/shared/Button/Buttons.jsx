import React from "react";

export const ButtonAdmin = ({ Text, width = "38%", onClick }) => {
  return (
    <>
      <button
        type="button"
        className={` w-[${width}] text-[33px] text-white bg-gradient-to-r from-[#FE7A36]  to-[#FF9F2E] px-9 py-1 rounded-[10px] shadow-md `}
        onClick={onClick}
      >
        {Text}
      </button>
    </>
  );
};

export const ButtonEmployees = ({ Text, width = "38%", onClick }) => {
  return (
    <>
      <button
        type="button"
        className={` w-[${width}] text-[33px] text-white bg-gradient-to-r from-[#FE7A36]  to-[#FF9F2E] px-9 py-1 rounded-[10px] shadow-md `}
        onClick={onClick}
      >
        {Text}
      </button>
    </>
  );
};

export const ButtonUsers = ({ Text, width = "38%", onClick }) => {
  return (
    <>

      <button
        type="button"
        className={` w-[${width}] text-[33px] text-white bg-gradient-to-r from-[#1e1e1e]  to-[#3F3D56] px-9 py-1 rounded-[10px] shadow-2xl `}
        onClick={onClick}
      >
        {Text}
      </button>
    </>
  );
};

export const Buttonreg = ({ Text, width = "38%" }) => {
  return (
    <>
      <button
        className={` w-[${width}] text-[33px] text-white bg-gradient-to-r from-[#381975]  to-[#692FDB] px-9 py-1 rounded-[10px] shadow-md `}
      >
        {Text}
      </button>
    </>
  );
};

export const Buttonlog = ({ Text, width = "38%", onClick }) => {
  return (
    <>
      <button
        type="button"
        className={`  w-[${width}] mb-[2rem] mt-[1rem] text-[30px] text-white bg-gradient-to-r from-[#FF9F2E]  to-[#FE7A36] px-[3rem] py-[0.5rem] rounded-[10px] shadow-md `}
        onClick={onClick}
      >
        {Text}
      </button>
    </>
  );
};

export const Buttonlog2 = ({ onClick, Text, width }) => {
  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        className={` w-[${width}] mb-[2rem] mt-[1rem] text-[30px] text-white bg-gradient-to-r from-[#692FDB]  to-[#381975] px-[3rem] py-[0.5rem] rounded-[10px] shadow-md `}
      >
        {Text}
      </button>
    </div>
  );
};
export const Buttonredirect = ({ Text, customClassName, Onclick }) => {
  return (
    <div>
      <button onClick={Onclick} className={`${customClassName}`}>
        {Text}
      </button>
    </div>
  );
};

export const ButtomHome = ({
  Text,
  width,
  customClassName,
  onClick,
  customClassNameTwo,
}) => {
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className={`${customClassName}   bg-white text-center w-48 rounded-2xl h-14 relative font-sans text-black text-xl font-semibold group`}
      >
        <div
          class={`bg-[#1e1e1e] rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500 ${customClassNameTwo}`}
        >
          <svg
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 9C16.5523 9 17 8.55228 17 8C17 7.44772 16.5523 7 16 7V9ZM0.292892 7.29289C-0.097632 7.68342 -0.097632 8.31658 0.292892 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292892 7.29289ZM16 7L0.999999 7V9L16 9V7Z"
              fill="white"
            />
          </svg>
        </div>
        <p class="translate-x-2">Regresar</p>
      </button>
    </>
  );
};

export const Buttonfilter = ({ Text, width, customClassName }) => {
  return (
    <>
      <button
        className={`${customClassName} w-[${width}] mb-[2rem] mt-[1rem] text-[30px] text-white px-[3rem] py-[0.5rem] rounded-[10px] shadow-md `}
      >
        {Text}
      </button>
    </>
  );
};

export const ButtonInventory = ({ Text, width, Onclick }) => {
  return (
    <>
      <button onClick={Onclick}
        className={` w-[${width}] bg-gradient-to-r from-[#381975]  to-[#692FDB] text-white px-[0.8rem] py-[0.2rem] rounded-[5px] shadow-md `}
      >
        {Text}
      </button>
    </>
  );
};