import React from "react";
import { CiSearch } from "react-icons/ci";
import { LiaExchangeAltSolid } from "react-icons/lia";

function nextInventory(code) {
switch (numer) {
  case value:
    
    break;

  default:
    break;
}
}

export const InventorySelectorBienes = () => {
  return (
    <div className="flex justify-center">
      <div className="flex justify-between w-[50%] h-[5rem] items-center text-white bg-gradient-to-r from-[#381975]  to-[#692FDB] px-9 py-1 rounded-[10px] shadow-md ">
        <CiSearch className="text-[2.5rem] cursor-pointer" />
        <h1 className="text-[3rem]">Bienes</h1>
        <LiaExchangeAltSolid className="text-[2.5rem] cursor-pointer" />
      </div>
    </div>
  );
};

export const InventorySelectorProducts = () => {
  return (
    <div className="flex justify-center">
      <div className="flex justify-between w-[50%] h-[5rem] items-center text-white bg-gradient-to-r from-[#FE7A36]  to-[#FF9F2E] px-9 py-1 rounded-[10px] shadow-md ">
        <CiSearch className="text-[2.5rem] cursor-pointer" />
        <h1 className="text-[3rem]">Productos</h1>
        <LiaExchangeAltSolid className="text-[2.5rem] cursor-pointer" />
      </div>
    </div>
  );
};

export const InventorySelectorEspacios = () => {
  return (
    <div className="flex justify-center">
      <div className="flex justify-between w-[50%] h-[5rem] items-center text-white bg-gradient-to-r from-[#FE7A36]  to-[#FF9F2E] px-9 py-1 rounded-[10px] shadow-md ">
        <CiSearch className="text-[2.5rem] cursor-pointer" />
        <h1 className="text-[3rem]">Espacios</h1>
        <LiaExchangeAltSolid className="text-[2.5rem] cursor-pointer" />
      </div>
    </div>
  );
};
