import React, { useEffect, useRef, useState } from "react";
import { NavbarAdmin, NavbarEmployee } from "../../shared/Navbar/Navbar";
import { CardsProducts } from "../../shared/CardsProducts/CardsProducts";
import { useComponentCycle } from "../../../hooks/useComponentCycle";
import {
  InventorySelectorBienes,
  InventorySelectorEspacios,
  InventorySelectorProductos,
} from "../../shared/inventorySelector/inventorySelector";
import { FaPlus } from "react-icons/fa";
import { FaOldRepublic } from "react-icons/fa";
// import NextInventory from '../../shared/inventorySelector/inventorySelector'

export const Inventory = () => {
  const handleNextAction = () => next();
  const [key, setKey] = useState(undefined);
  const [items, setItems] = useState([
    {name: "", image: "", description: "", type: "", details: {
      used: 0,
      available: 0,
      missing: 0
    }},
  ]);

  const { component, next } = useComponentCycle(
    [
      <InventorySelectorBienes onNext={handleNextAction} key="Bienes" />,
      <InventorySelectorProductos onNext={handleNextAction} key="Productos" />,
      <InventorySelectorEspacios onNext={handleNextAction} key="Espacios" />,

    ],
    {
      onComponentChange: (c) => {
        const { key } = c;
        setKey(key);
        switch(key) {
          case "Bienes":
            // const items = cliente.obtenerBienes();
            // setItems(items);
            break;
        }

      },
    }
  );

  return (
    <div className="bg-[#F0ECE3] flex flex-col justify-center gap-[3rem] px-[6rem]">
      <NavbarAdmin />
      {component}

      <InventoryList type={key} items={items}/>
      <div className="flex flex-wrap justify-center gap-[3rem] w-[100%]">
        <CardsProducts />
        <CardsProducts />
        <CardsProducts />
        <CardsProducts />
        <CardsProducts />
        <CardsProducts />
        <CardsProducts />
        <CardsProducts />
      </div>
    </div>
  );
};

export const BienItem = ({item}) => {
return <p>{item.name} </p>;
}
export const EspacioItem = ({item}) => {
  return <p>{item.name} </p>;
}

export const InventoryList = ({type, items}) => {

  const renderItems = (items, Component) => {
    return items.map(i => <Component item={i}/> )
  }
  
  return <main>
    {type == "Bienes" && renderItems(items, BienItem)}
    {type == "Espacios" && renderItems(items, EspacioItem)}
  </main>
}