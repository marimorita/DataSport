import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { LiaExchangeAltSolid } from "react-icons/lia";

const NextInventory = () => {
  const [viewInventory, setViewinventory] = useState(0);

  const InventoryArray = [
    <InventorySelectorBienes key='Bienes'/>,
    <InventorySelectorProductos key='Productos'/>,
    <InventorySelectorEspacios key='Espacios'/>,
  ];

  const changeInventory = () => {
    setViewinventory((prevInventory) => (prevInventory + 1) % viewInventory.length);
  };



};

export const InventorySelectorBienes = ({ onNext, onSearch }) => {
  return (
    <div className="flex justify-center">
      <div className="flex justify-between w-[50%] h-[5rem] items-center text-white bg-gradient-to-r from-[#381975]  to-[#692FDB] px-9 py-1 rounded-[10px] shadow-md ">
        <CiSearch onClick={onSearch} className="text-[2.5rem] cursor-pointer" />
        <h1 className="select-none text-[3rem]">Bienes</h1>
        <LiaExchangeAltSolid onClick={onNext} className="text-[2.5rem] cursor-pointer" />
      </div>
    </div>
  );
};

export const InventorySelectorProducts = ({onNext}) => {
  return (
    <div className="flex justify-center">
      <div className="flex justify-between w-[50%] h-[5rem] items-center text-white bg-gradient-to-r from-[#FE7A36]  to-[#FF9F2E] px-9 py-1 rounded-[10px] shadow-md ">
        <CiSearch className="text-[2.5rem] cursor-pointer" />
        <h1 className="select-none text-[3rem]">Productos</h1>
        <LiaExchangeAltSolid onClick={onNext} className="text-[2.5rem] cursor-pointer" />
      </div>
    </div>
  );
};

export const InventorySelectorEspacios = ({onNext}) => {
  return (
    <div className="flex justify-center">
      <div className="flex justify-between w-[50%] h-[5rem] items-center text-white bg-gradient-to-r from-[#1E1E1E]  to-[#3F3D56] px-9 py-1 rounded-[10px] shadow-md ">
        <CiSearch className="text-[2.5rem] cursor-pointer" />
        <h1 className="select-none text-[3rem]">Espacios</h1>
        <LiaExchangeAltSolid onClick={onNext} className="text-[2.5rem] cursor-pointer" />
      </div>
    </div>
  );
};
