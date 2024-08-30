import React, { useRef, useState, useEffect } from "react";
import { IoCloseOutline } from 'react-icons/io5'
import { axiosInstance } from '../../../../axiosConfig';
import { toast, ToastContainer } from "react-toastify";
import {
  CustomInput,
  CustomTextArea,
} from "../../shared/InputForms/InputForms";

export const CreateBien1 = ({ closeIcon, visibility }) => {
  const inputIdRef = useRef();
  const inputNameRef = useRef();
  const inputDescriptionRef = useRef();
  const inputStockRef = useRef();

  const toggleRegisterAsset = async () => {
    const adminData = {
      id: inputIdRef.current.value,
      name: inputNameRef.current.value,
      description: inputDescriptionRef.current.value,
      img: "a", // Cambia esto para manejar la imagen correctamente
      stock: inputStockRef.current.value,
    };

    try {
      const response = await axiosInstance.post("/assets/register", adminData);
      if (response.status === 200 || response.status === 201) {
        alert("Successfully registered");

        const assetData = response.data;
        const stock = assetData.stock;

        for (let index = 0; index < stock; index++) {
          await createRegisterIndivdualAsset(assetData);
        }
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

  const createRegisterIndivdualAsset = async (assetData) => {
    const getCurrentDate = () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const adminData = {
      name: assetData.name,
      description: assetData.description,
      adquisitionDate: getCurrentDate(),
      state: "Activo",
      condition: "Nuevo",
      img: assetData.img,
      lastMaintenance: getCurrentDate(),
      nextMaintenance: getCurrentDate(),
      idAssets: assetData.id,
    };

    try {
      const response = await axiosInstance.post(
        "/individualassets/register",
        adminData
      );
      if (response.status === 200 || response.status === 201) {
        // Manejo exitoso
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
      <div className="lg:w-full min-w-[45rem] min-h-[87%] bg-white flex flex-col justify-center items-center  rounded-lg gap-12 m-[5rem] shadow-2xl p-[3rem] animate-modal relative">
        <section className="h-8 w-full flex justify-end items-center">
          <IoCloseOutline
            fontSize={50}
            onClick={closeIcon}
            className="cursor-pointer text-[#2F2E41]"
          />
        </section>
        <section className="flex gap-8">
          <div className="flex flex-col justify-center items-center gap-4">
            <h1 className="text-[50px]">Crea tu Bien</h1>
            <section className="flex flex-col gap-4 w-full lg:max-w-[30rem]">
              <CustomInput label="Titulo" inputRef={inputNameRef} />
              <CustomTextArea label="Description" inputRef={inputDescriptionRef} />
              <span className="grid grid-cols-2 gap-4">
                <CustomInput
                  label="Cantidad"
                  type="number"
                  inputProps={{ min: 0 }}
                  inputRef={inputStockRef}
                />
                <CustomInput label="imagen" type="file" />
              </span>
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
    </div>
  );
};
// export const CreateBien2 = () => {
//   return (
//     <div className="w-[75rem] rounded-md">
//       <div className="flex flex-wrap justify-center items-center gap-12 m-[5rem] shadow-2xl p-[3rem]">
//         <div className="flex flex-col justify-center items-center gap-4 px-[2.5rem]">
//           <div className="size-[8rem] rounded-full bg-[#692FDB]"></div>
//           <p className="text-[35px] w-[20rem] text-center text-[#1E1E1E]">
//             A continuación se mostraran los formularios para registrar tus
//             <b className="text-[40px] text-[#692FDB]"> Bienes</b>
//           </p>
//         </div>
//         <div className="h-[35rem] w-[5px] rounded bg-[#1E1E1E]"></div>
//         <div className="flex flex-col justify-center items-center gap-4">
//           <h1 className="text-[50px]">Form del espacio</h1>
//           <input
//             className="w-[20rem] h-[4rem] border-[4px] rounded-xl border-[#692FDB] px-4 placeholder:text-[#692FDB] text-[25px]  "
//             type="text"
//             placeholder="titulo"
//           />
//           <input
//             className="w-[20rem] h-[6rem] border-[4px] rounded-xl border-[#692FDB] px-4 placeholder:text-[#692FDB] text-[25px]  "
//             type="text"
//             placeholder="Descripcion"
//           />
//           <div className="flex justify-center ">
//             <input
//               className="w-[9.5rem] h-[4rem] mr-[0.5rem] border-[4px] rounded-xl border-[#692FDB] px-4 placeholder:text-[#692FDB] text-[25px]  "
//               type="text"
//               placeholder="cantidad"
//             />
//             <input
//               className="w-[9.5rem] h-[4rem] ml-[0.5rem] border-[4px] rounded-xl border-[#692FDB] px-4 placeholder:text-[#692FDB] text-[25px]  "
//               type="text"
//               placeholder="imagen"
//             />
//           </div>
//           <input
//             className="w-[20rem] h-[4rem] border-[4px] rounded-xl border-[#692FDB] px-4 placeholder:text-[#692FDB] text-[25px]  "
//             type="text"
//             placeholder="ID"
//           />
//           <button className="bg-gradient-to-r from-[#692FDB]  to-[#FF9F2E] w-[10rem] h-[3rem] rounded-lg text-white text-[30px]">
//             Next
//           </button>
//         </div>
//         <div className="flex flex-col justify-center items-center gap-4">
//           <div className="absolute bottom-[8rem] right-[45rem]">
//             <p className="text-[#1E1E1E]">5 mas...</p>
//           </div>
//           <div className="w-[50rem] h-[8px] bg-[#1E1E1E] rounded-md"></div>
//           <p className="text-[25px]">1/2</p>
//         </div>
//       </div>
//     </div>
//   );
// };
