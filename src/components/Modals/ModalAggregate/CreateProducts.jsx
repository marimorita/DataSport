import React, { useRef, useState, useEffect,useContext } from "react";
import { IoCloseOutline } from 'react-icons/io5'
import { axiosInstance } from '../../../../axiosConfig';
import { toast, ToastContainer } from "react-toastify";
import {
  CustomInput,
  CustomTextArea,
} from "../../shared/InputForms/InputForms";
import { ModalCreate } from '../../Modals/ModalCreate/ModalCreate'
import { FaRegCheckCircle } from "react-icons/fa";
import { StateContext } from "../../Context/Context";

export const CreateProducts = ({ closeIcon, visibility }) => {
  const { createEmpleyees, setCreateEmpleyees  } = useContext(StateContext);
  const inputIdRef = useRef();
  const inputNameRef = useRef();
  const inputDescriptionRef = useRef();
  const inputStockRef = useRef();
  const inputPriceRef = useRef();

  const toggleRegisterAsset = async () => {
    const adminData = {
      idCenter: inputIdRef.current.value,
      name: inputNameRef.current.value,
      description: inputDescriptionRef.current.value,
      state: "En venta", 
      stock: inputStockRef.current.value,
      img: "a", 
      price: inputPriceRef.current.value,
    };

    try {
      const response = await axiosInstance.post("/products/register", adminData);
      if (response.status === 200 || response.status === 201) {
        setCreateEmpleyees(true);
      } else {
        toast.error(response.data.error, {
          progressStyle: {
            backgroundColor: "#692FDB",
          },
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "An error occurred", {
        progressStyle: {
          backgroundColor: "#692FDB",
        },
      });
    }
  };


  return (
    <div
      className={
        visibility
          ? "w-screen h-screen flex justify-center items-center fixed top-0 left-0 bg-[#00000080] z-[9999999999]"
          : "hidden"
      }
    >
      <div className="w-[40rem] h-[85%] bg-white flex flex-col justify-center items-center  rounded-lg gap-12 m-[5rem] shadow-2xl p-[4rem] animate-modal relative">
        <section className="h-8 pb-12 w-full flex justify-end items-center">
          <IoCloseOutline
            fontSize={50}
            onClick={closeIcon}
            className="cursor-pointer text-[#2F2E41] -mr-10 "
          />
        </section>
        <section className="flex gap-8">
          <div className="flex flex-col justify-center h-[80%] items-center gap-4">
            <h1 className="text-[50px]">Crea tu Productos</h1>
            <section className="flex flex-col gap-4 w-full lg:max-w-[30rem]">
              <CustomInput label="Titulo" inputRef={inputNameRef} />
              <CustomTextArea label="Descripcion" inputRef={inputDescriptionRef} />
              <span className="grid grid-cols-2 gap-4">
                <CustomInput
                  label="Cantidad"
                  type="number"
                  inputProps={{ min: 0 }}
                  inputRef={inputStockRef}
                />
                <CustomInput label="imagen" type="file" />
              </span>
              <CustomInput label="Precio" type="number" inputProps={{ min: 0 }} inputRef={inputPriceRef} />
              <CustomInput label="Referencia" inputRef={inputIdRef} />
            </section>
            <button
              className="bg-gradient-to-r from-[#381975] to-[#692FDB] w-[10rem] h-[3rem] rounded-lg text-white text-[30px]"
              onClick={toggleRegisterAsset}
            >
              Crear
            </button>
          </div>
        </section>
      </div>
      <ToastContainer position="top-center" autoClose={1000} pauseOnHover={false} />
      <ModalCreate
        visibility={createEmpleyees}
        IconAlert={FaRegCheckCircle}
        closeButton={() => setCreateEmpleyees(false)}
        closeIcon={() => setCreateEmpleyees(false)}
        text={`Your login was successful, Welcome ${name}.`}
      />
    </div>
  );
};