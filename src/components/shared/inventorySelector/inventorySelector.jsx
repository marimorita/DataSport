import React from "react";
import { CiSearch } from "react-icons/ci";
import { LiaExchangeAltSolid } from "react-icons/lia";

import { CreateBien } from "../../Modals/ModalAggregate/CreateBien";
import { StateContext } from '../../Context/Context'
import { CreateProducts } from "../../Modals/ModalAggregate/CreateProducts";


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


      <div className=" flex justify-center items-center bg-[#692FDB] size-[4rem] rounded-lg fixed right-[3rem] bottom-[3rem]">
        <FaPlus className=" cursor-pointer text-[2.5rem] text-white" onClick={() => 
          
            setmodalCreateBienes(true)          
        }
           />
      </div>
      <CreateBien
          visibility={modalCreateBienes}
          closeIcon={() => setmodalCreateBienes(false)}
        />
    </div>
  );
};

export const InventorySelectorProductos = ({ onNext, onSearch }) => {
  const { modalCreateProducts, setModalCreateProducts } = useContext(StateContext);

  return (
    <div className="flex justify-center">
      <div className="flex justify-between w-[50%] h-[5rem] items-center text-white bg-gradient-to-r from-[#FE7A36] to-[#FF9F2E] px-9 py-1 rounded-[10px] shadow-md">
        <CiSearch className="text-[2.5rem] cursor-pointer" onClick={onSearch} />
        <h1 className="select-none text-[3rem]">Productos</h1>
        <LiaExchangeAltSolid
          onClick={onNext}
          className="text-[2.5rem] cursor-pointer"
        />
      </div>
      <div className="cursor-pointer flex justify-center items-center bg-[#FE7A36] w-[4rem] h-[4rem] rounded-lg fixed right-[3rem] bottom-[3rem]">
        <FaPlus
          className="cursor-pointer text-[2.5rem] text-white"
          onClick={() => setModalCreateProducts(true)}
        />
      </div>
      <CreateProducts
        visibility={modalCreateProducts}
        closeIcon={() => setModalCreateProducts(false)}
      />
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
