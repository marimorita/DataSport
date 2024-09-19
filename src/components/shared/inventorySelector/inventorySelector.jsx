import React, { useState, useContext } from "react";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { CreateBien1 } from "../../Modals/ModalAggregate/CreateBien";
import { CreateProducts } from "../../Modals/ModalAggregate/CreateProducts";
import { StateContext } from '../../Context/Context'


const NextInventory = () => {
  const [viewInventory, setViewinventory] = useState(0);

  const InventoryArray = [
    <InventorySelectorBienes key="Bienes" />,
    <InventorySelectorProductos key="Productos" />,
    <InventorySelectorEspacios key="Espacios" />,
  ];

  const changeInventory = () => {
    setViewinventory(
      (prevInventory) => (prevInventory + 1) % viewInventory.length
    );
  };
};

export const InventorySelectorBienes = ({ onNext, onSearch }) => {
  const { modalCreateBienes, setmodalCreateBienes  } = useContext(StateContext);

  return (
    <div className="flex justify-center ">
      <div className="flex justify-between w-[50%] h-[5rem] items-center text-white bg-gradient-to-r from-[#381975]  to-[#692FDB] px-9 py-1 rounded-[10px] shadow-md ">
        <CiSearch onClick={onSearch} className="text-[2.5rem] cursor-pointer" />
        <h1 className="select-none text-[3rem]">Bienes</h1>
        <LiaExchangeAltSolid
          onClick={onNext}
          className="text-[2.5rem] cursor-pointer"
        />
      </div>

      <div className=" flex justify-center items-center bg-[#692FDB] size-[4rem] rounded-lg fixed right-[3rem] bottom-[3rem]">
        <FaPlus className=" cursor-pointer text-[2.5rem] text-white" onClick={() => 
          
            setmodalCreateBienes(true)
            // console.log("hola");
          
        }
           />
      </div>
      <CreateBien1
          visibility={modalCreateBienes}
          closeIcon={() => setmodalCreateBienes(false)}
        />
    </div>
  );
};

export const InventorySelectorProductos = ({ onNext }) => {
  const { modalCreatePoducts, setModalCreatePoducts  } = useContext(StateContext);

  return (
    <div className="flex justify-center">
      <div className="flex justify-between w-[50%] h-[5rem] items-center text-white bg-gradient-to-r from-[#FE7A36]  to-[#FF9F2E] px-9 py-1 rounded-[10px] shadow-md ">
        <CiSearch className="text-[2.5rem] cursor-pointer" />
        <h1 className="select-none text-[3rem]">Productos</h1>
        <LiaExchangeAltSolid
          onClick={onNext}
          className="text-[2.5rem] cursor-pointer"
        />
      </div>
      <div className=" cursor-pointer flex justify-center items-center bg-[#FE7A36] size-[4rem] rounded-lg fixed right-[3rem] bottom-[3rem]">
        <FaPlus className="text-[2.5rem] text-white" onClick={() => 
          
          setModalCreatePoducts(true)
          // console.log("hola");
        
      } />
      </div>
      <CreateProducts
          visibility={modalCreatePoducts}
          closeIcon={() => setModalCreatePoducts(false)}
        />
    </div>
  );
};

export const InventorySelectorEspacios = ({ onNext }) => {
  return (
    <div className="flex justify-center">
      <div className="flex justify-between w-[50%] h-[5rem] items-center text-white bg-gradient-to-r from-[#1E1E1E]  to-[#3F3D56] px-9 py-1 rounded-[10px] shadow-md ">
        <CiSearch className="text-[2.5rem] cursor-pointer" />
        <h1 className="select-none text-[3rem]">Espacios</h1>
        <LiaExchangeAltSolid
          onClick={onNext}
          className="text-[2.5rem] cursor-pointer"
        />
        <div className=" cursor-pointer flex justify-center items-center bg-[#1E1E1E] size-[4rem] rounded-lg fixed right-[3rem] bottom-[3rem]">
          <FaPlus className="text-[2.5rem] text-white" />
        </div>
      </div>
    </div>
  );
};
