import React, { useRef, useState, useEffect } from "react";
import { IoCloseOutline } from 'react-icons/io5'
import { axiosInstance } from '../../../../axiosConfig';
import { toast, ToastContainer } from "react-toastify";


export const CreateBien1 = (closeIcon, visibility) => {
  const [assetsDate, setAssetsDate] = useState([]);
  const inputIdRef = useRef()
  const inputNameRef = useRef()
  const inputDescriptionRef = useRef()
  const inputImgRef = useRef()
  const inputStockRef = useRef()

  console.log(assetsDate);

  const toggleRegisterAsset = async () => {
    const adminData = {
      id: inputIdRef.current.value,
      name: inputNameRef.current.value,
      description: inputDescriptionRef.current.value,
      img: inputImgRef.current.value,
      stock: inputStockRef.current.value,
    };
  
    try {
      const response = await axiosInstance.post('/assets/register', adminData);
  
      if (response.status === 200 || response.status === 201) {
        alert('Successfully registered');
  
        const assetData = response.data; 
        const stock = assetData.stock;
  
        
        for (let index = 0; index < stock; index++) {
          await createRegisterIndivdualAsset(assetData);
        }
        
      } else {
        toast.error(response.data.error, {
          progressStyle: {
            backgroundColor: '#692FDB',
          },
        });
      }
    } catch (error) {
      toast.error(error.response.data.error, {
        progressStyle: {
          backgroundColor: '#692FDB',
        },
      });
    }
  };
  
  const createRegisterIndivdualAsset = async (assetData) => {
    function getCurrentDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  
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
      const response = await axiosInstance.post('/individualassets/register', adminData);
      if (response.status === 200 || response.status === 201) {
        alert('Successfully registered individual asset');
      } else {
        toast.error(response.data.error, {
          progressStyle: {
            backgroundColor: '#692FDB',
          },
        });
      }
    } catch (error) {
      toast.error(error.response.data.error, {
        progressStyle: {
          backgroundColor: '#692FDB',
        },
      });
    }
  };
  return (
    <>
      <div
        className={
          visibility
            ? " w-screen h-screen flex justify-center items-center fixed top-0 left-0 bg-[#00000080] z-[9999999999] "
            : "hidden"
        }
      >
        <div className="w-[60%] h-[87%] bg-white flex flex-wrap justify-center items-center  rounded-lg gap-12 m-[5rem] shadow-2xl p-[3rem] animate-modal relative">
          <IoCloseOutline
            fontSize={50}
            onClick={closeIcon}
            className="cursor-pointer absolute right-4 top-3 text-[#2F2E41] "
          />

          <div className="flex flex-col justify-center items-center gap-4 px-[2.5rem]">
            <div className="size-[8rem] rounded-full bg-[#FE7A36]"></div>
            <p className="text-[35px] w-[20rem] text-center text-[#1E1E1E]">
              A continuación se mostraran los formularios para registrar tus
              <b className="text-[40px] text-[#692FDB]"> Bienes</b>
            </p>
          </div>
          <div className="h-[35rem] w-[5px] rounded bg-[#1E1E1E]"></div>
          <div className="flex flex-col justify-center items-center gap-4">
            <h1 className="text-[50px]">Form de Bienes</h1>
            <input
              className="w-[20rem] h-[4rem] border-[4px] rounded-xl border-[#FE7A36] px-4 placeholder:text-[#FE7A36] text-[25px]  "
              type="text"
              placeholder="titulo"
              ref={inputNameRef}
            />
            <input
              className="w-[20rem] h-[6rem] border-[4px] rounded-xl border-[#FE7A36] px-4 placeholder:text-[#FE7A36] text-[25px]  "
              type="text"
              placeholder="Descripcion"
              ref={inputDescriptionRef}
            />
            <div className="flex justify-center ">
              <input
                className="w-[9.5rem] h-[4rem] mr-[0.5rem] border-[4px] rounded-xl border-[#FE7A36] px-4 placeholder:text-[#FE7A36] text-[25px]  "
                type="text"
                placeholder="cantidad"
                ref={inputStockRef}
              />
              <input
                className="w-[9.5rem] h-[4rem] ml-[0.5rem] border-[4px] rounded-xl border-[#FE7A36] px-4 placeholder:text-[#FE7A36] text-[25px]  "
                type="text"
                placeholder="imagen"
                ref={inputImgRef}
              />
            </div>
            <input
              className="w-[20rem] h-[4rem] border-[4px] rounded-xl border-[#FE7A36] px-4 placeholder:text-[#FE7A36] text-[25px]  "
              type="text"
              placeholder="ID"
              ref={inputIdRef}
            />
            <button onClick={toggleRegisterAsset} className="bg-gradient-to-r from-[#FE7A36]  to-[#FF9F2E] w-[10rem] h-[3rem] rounded-lg text-white text-[30px]">
              Next
            </button>
          </div>
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="absolute bottom-[6rem] right-[8rem]">
              <p className="text-[#1E1E1E]">5 mas...</p>
            </div>
            <div className="w-[50rem] h-[8px]  bg-[#1E1E1E] rounded-md"></div>
            <p className="text-[25px]">1/2</p>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={1000} pauseOnHover={false} />
    </>
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
