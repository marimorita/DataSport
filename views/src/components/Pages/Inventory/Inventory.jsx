import React from 'react'
import { NavbarAdmin } from '../../shared/Navbar/Navbar'
import { InventorySelector } from '../../shared/inventorySelector/inventorySelector'
import { CardsProducts } from '../../shared/CardsProducts/CardsProducts'


export const Inventory = () => {
  return (
    <div className='flex flex-col gap-[3rem]'>
      <NavbarAdmin/>      
      <InventorySelector/>
      <div className='flex flex-wrap justify-center gap-[3rem] w-[100%]'>
      <CardsProducts/>
      <CardsProducts/>
      <CardsProducts/>
      <CardsProducts/>
      <CardsProducts/>
      <CardsProducts/>
      <CardsProducts/>
      <CardsProducts/>
      </div>
      
    </div>
  )
}
