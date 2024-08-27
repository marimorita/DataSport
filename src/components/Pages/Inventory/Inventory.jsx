import React from 'react'
import { NavbarAdmin } from '../../shared/Navbar/Navbar'
import { InventorySelectorBienes, InventorySelectorProducts } from '../../shared/inventorySelector/inventorySelector'
import { CardsProducts } from '../../shared/CardsProducts/CardsProducts'


export const Inventory = () => {
  return (
    <div className='bg-[#F0ECE3] flex flex-col justify-center gap-[3rem] px-[6rem]'>
      <NavbarAdmin />
      <InventorySelectorBienes />
      <div className='flex flex-wrap justify-center gap-[3rem] w-[100%]'>
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
  )
}
