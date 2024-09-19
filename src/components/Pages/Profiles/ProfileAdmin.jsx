  import React, { useState, useEffect, useContext } from "react";
  import { Buttonredirect } from "../../shared/Button/Buttons";
  import { cloudinaryAxios, axiosInstance } from "../../../../axiosConfig";
  import { StateContext } from "../../Context/Context";
  import { toast, ToastContainer } from "react-toastify";
  import { MdModeEdit } from "react-icons/md";
  import { useLocation } from "wouter";
  import { ModalEditAdmin } from "../../Modals/ModalEdit/ModalEdit";
  import { FaRegCheckCircle } from "react-icons/fa";
  import { WorkingTeamModal } from "../WorkingTeam/WorkingTeam";
  import { ModalConfirmation } from "../../Modals/ModalConfirmation/ModalConfirmation";

  export const ProfileAdmin = () => {
    const { adminView, setAdminView } = useContext(StateContext);
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);

    const { isModalOpen, setIsModalOpen } = useContext(StateContext);
    const handleImageChange = (e) => {
      setImage(e.target.files[0]);
    };

    const uploadImage = async () => {
      if (!image) {
        alert("Selecciona una imagen");
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
        console.error("Error al subir la imagen:", error);
      }
    };

    const token = localStorage.getItem("token");

    useEffect(() => {
      const fetchAdmin = async () => {
        try {
          const response = await axiosInstance.get(
            `/administrator/administrator/${token}`
          );
          // console.log(response.data);

          setAdminView([response.data]);
        } catch (error) {
          toast.error(error.response.data.error, {
            progressStyle: {
              backgroundColor: "#692FDB", // Color de la barra de carga
            },
          });
        }
      };

      fetchAdmin();
    }, [setAdminView]);

    console.log(adminView);

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
    };
    useEffect(() => {
      const hasImage = adminView.some((admin) => admin.img !== "");
      setImageUrl(hasImage);
    }, [adminView]);
    const [location, setLocation] = useLocation();

    return (
      <>
        {adminView.map((admin) => (
          <>
            <div className="flex relative">
              <div>
                <div>

                  <div className="absolute top-[5rem] left-[8rem] w-[12rem] h-[16rem] rounded bg-[#CCCCCC] flex justify-center items-center">
                    {imageUrl ? (
                      <img
                        src={admin.img}
                        alt="Subida a Cloudinary"
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <div className="flex flex-col justify-center items-center text-center tex-[15px] w-[10rem]">
                        <p className="mb-2   ">No has subido ninguna imagen</p>
                        <button
                          onClick={uploadImage}
                          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-[10px]"
                        >
                          Agrega una foto
                        </button>
                        <input
                          type="file"
                          onChange={handleImageChange}
                          className="mt-2 text-gray-600 text-[13px] w-[8.6rem] text-center "
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="mx-[6rem] mt-[-2rem] flex flex-col ">
                  <div>
                    <MdModeEdit
                      className="text-[27px] text-[#381975] absolute left-[25rem] hover:text-[30px] cursor-pointer "
                      onClick={() => setModalEdit(true)}
                    />
                  </div>
                  <h1 className="text-[30px] text-start w-[15rem]">
                    <b>{admin.name}</b>
                  </h1>
                  <ul>
                    <li className="text-[20px] text-start w-[20rem]">
                      Documento: {admin.id}
                    </li>
                    <li className="text-[20px] text-start w-[20rem]">
                      Numero: {admin.phone}
                    </li>
                    <li className="text-[20px] text-start w-[20rem]">
                      Email: {admin.email}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col gap-[5rem]">
                <div className="flex justify-center items-center mt-[1rem]">

                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-[35px] w-[25rem] text-center text-[#000001]">
                      Este es tu perfil como admin bienvenido
                    </h1>
                    <h2 className="text-[30px] w-[30rem] text-center text-[#1E1E1E]">
                      aqui se guardara toda tu informacion
                    </h2>
                  </div>
                </div>
                <div className=" w-[80%] items-center mx-[10%] flex justify-ev rounded-[20px] h-[15rem] shadow-2xl bg-gradient-to-l from-[#692FDB]  to-[#381975] mt-[0rem]">

                  <div className="flex flex-col w-[20rem] items-center ">
                    <div className="flex w-[25rem] ">
                      <h1 className="text-[#F0ECE3] text-[25px] mr-[4rem] text-center">
                        Aqui puedes analizar y darle un vistaso a tus empleados y
                        su informacion{" "}
                      </h1>
                    </div>
                    <div className="mt-[1rem] mr-[4rem] ">
                      <Buttonredirect
                        customClassName={
                          'bg-[#F0ECE3] text-[#000001] text-[20px] text-center w-[15rem] text-[22px] rounded-[10px] py-[0.5rem]'
                        }
                        Text="Equipo de trabajo"
                        Onclick={() => {
                          console.log("Modal abierto");
                          setIsModalOpen(true);
                        }}
                      />
                      <WorkingTeamModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
                    </div>
                  </div>
                </div>
              </div>
              <ModalEditAdmin
                visibility={modalEdit}
                IconAlert={FaRegCheckCircle}
                closeButton={() => setModalEdit(false)}
                closeIcon={() => setModalEdit(false)}
              />
            </div>
            <ToastContainer
              position="top-center"
              autoClose={1500}
              pauseOnHover={false}
            />
          </>
        ))}
      </>
    );
  };
