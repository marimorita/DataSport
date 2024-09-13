import React, { useState, useEffect, useRef, useContext } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import { toast, ToastContainer } from "react-toastify";
import { cloudinaryAxios, axiosInstance } from "../../../../axiosConfig";
import { StateContext } from "../../Context/Context";


export const ModalEdit = ({ closeIcon, closeButton, visibility }) => {
  const { adminView, setAdminView } = useContext(StateContext);
  const inputNameRef = useRef();
  const inputIdRef = useRef();
  const inputPhoneRef = useRef();
  const inputEmailRef = useRef();
  const [image, setImage] = useState(null);
  // const inputNameRef = useRef();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const uploadImage = async () => {
    if (!image) {
      toast.error("Selecciona una imagen", {
        progressStyle: {
          backgroundColor: "#692FDB", // Color de la barra de carga
        },
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "nzpngwr9"); // Tu upload_preset

    try {
      const response = await cloudinaryAxios.post("/image/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // setImageUrl(response.data.secure_url); // URL segura de la imagen subida
      toggleCreateImg(response.data.secure_url);
    } catch (error) {
      toast.error("Error al subir la imagen", {
        progressStyle: {
          backgroundColor: "#692FDB", // Color de la barra de carga
        },
      });
      console.error("Error al subir la imagen:", error);
    }
  };

  const toggleCreateImg = async (img) => {
    // const img = imageUrl
    const id = adminView.map((adminView) => adminView.id);

    console.log(img);
    console.log(id);

    const userData = {
      img: img,
    };

    try {
      // const token = localStorage.getItem('token');
      const response = await axiosInstance.patch(
        `/administrator/administrator/${id}/img`,
        userData /* , {
        headers: {
            Authorization: `Bearer ${token}`
        }
    } */
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("se cambio", {
          progressStyle: {
            backgroundColor: "#692FDB", // Color de la barra de carga
          },
        });
      } else {
        toast.error(error.response.data.error, {
          progressStyle: {
            backgroundColor: "#692FDB", // Color de la barra de carga
          },
        });
      }
    } catch (error) {
      toast.error(error.response.data.error, {
        progressStyle: {
          backgroundColor: "#692FDB", // Color de la barra de carga
        },
      });
    }
  };

  const toggleUpdateData = async () => {
    // const img = imageUrl
    const id = adminView.map((adminView) => adminView.id);

    console.log(id);

    const name = inputNameRef.current.value

    if (name !== "") {

      const userData = {
        id: id,
        name: inputNameRef.current.value,
      };

      try {
        // const token = localStorage.getItem('token');
        const response = await axiosInstance.patch(
          `/administrator/administrator/update/name`,
          userData /* , {
          headers: {
              Authorization: `Bearer ${token}`
          }
      } */
        );

        if (response.status === 200 || response.status === 201) {
          toast.success("se cambio", {
            progressStyle: {
              backgroundColor: "#692FDB", // Color de la barra de carga
            },
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          toast.error(error.response.data.error, {
            progressStyle: {
              backgroundColor: "#692FDB", // Color de la barra de carga
            },
          });
        }
      } catch (error) {
        toast.error(error.response.data.error, {
          progressStyle: {
            backgroundColor: "#692FDB", // Color de la barra de carga
          },
        });
      }

    } else {
      console.log("no se hizo actualizacion de nombre");
    }


    const phone = inputPhoneRef.current.value

    if (phone !== "") {

      const userData = {
        id: id,
        phone: inputPhoneRef.current.value,
      };

      try {
        // const token = localStorage.getItem('token');
        const response = await axiosInstance.patch(
          `/administrator/administrator/update/phone`,
          userData /* , {
          headers: {
              Authorization: `Bearer ${token}`
          }
      } */
        );

        if (response.status === 200 || response.status === 201) {
          toast.success("se cambio", {
            progressStyle: {
              backgroundColor: "#692FDB", // Color de la barra de carga
            },
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          toast.error(error.response.data.error, {
            progressStyle: {
              backgroundColor: "#692FDB", // Color de la barra de carga
            },
          });
        }
      } catch (error) {
        toast.error(error.response.data.error, {
          progressStyle: {
            backgroundColor: "#692FDB", // Color de la barra de carga
          },
        });
      }

    } else {
      console.log("no se hizo actualizacion de numero");
    }

    const email = inputEmailRef.current.value

    if (email !== "") {

      const userData = {
        id: id,
        email: inputEmailRef.current.value,
      };

      try {
        // const token = localStorage.getItem('token');
        const response = await axiosInstance.patch(
          `/administrator/administrator/update/email`,
          userData /* , {
          headers: {
              Authorization: `Bearer ${token}`
          }
      } */
        );

        if (response.status === 200 || response.status === 201) {
          toast.success("se cambio", {
            progressStyle: {
              backgroundColor: "#692FDB", // Color de la barra de carga
            },
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          toast.error(error.response.data.error, {
            progressStyle: {
              backgroundColor: "#692FDB", // Color de la barra de carga
            },
          });
        }
      } catch (error) {
        toast.error(error.response.data.error, {
          progressStyle: {
            backgroundColor: "#692FDB", // Color de la barra de carga
          },
        });
      }


    } else {
      console.log("no se hizo actualizacion de correo");
    }



  };

  return (
    <div className={visibility ? ' w-screen h-screen flex justify-center items-center fixed top-0 left-0 bg-[#00000080] z-[100] ' : 'hidden'}>
      <div className='w-[40%] h-[85%] bg-[#F0ECE3] flex flex-col justify-center items-center rounded-[10px] pb-[10px] animate-modal relative z-[110]'>
        <IoCloseOutline fontSize={50} onClick={closeIcon} className='cursor-pointer absolute right-4 top-3 text-[#2F2E41] ' />
        <div className='w-[30rem] h-[25rem] flex justify-center'  >
          <div className='flex flex-col w-[25rem] gap-[1rem]'>
            <h1 className='text-[28px] text-center'>Edita los campos deseados</h1>
            <input className='bg-[#f1ede4] text-[#1E1E1E] rounded-[5px] h-[2.5rem] shadow-2xl border-[3px] border-[#1E1E1E] px-[10px]' type="text" placeholder='Actualiza tu Nombre...' ref={inputNameRef} />
            <input className='bg-[#f1ede4] text-[#1E1E1E] rounded-[5px] h-[2.5rem] shadow-2xl border-[3px] border-[#1E1E1E] px-[10px]' type="tetx" placeholder='Actualiza tu numero...' ref={inputPhoneRef} />
            <input className='bg-[#f1ede4] text-[#1E1E1E] rounded-[5px] h-[2.5rem] shadow-2xl border-[3px] border-[#1E1E1E] px-[10px]' type="email" placeholder='Actualiza tu email...' ref={inputEmailRef} />
            <input
              type="file"
              onChange={handleImageChange}
              className="mt-2 text-gray-600 text-[13px] w-[8.6rem] text-center "
            />
            <button
              onClick={uploadImage}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-[10px]"
            >
              Agrega una foto
            </button>

            <button className='bg-[#692FDB] text-[#f1ede4] text-center text-[20px] shadow-2xl  rounded-[8px] w-[15rem] h-[2.5rem] just-center' onClick={toggleUpdateData}>Realizar los cambios</button>

          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        pauseOnHover={false}
      />
    </div>
  )
}

