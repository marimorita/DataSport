
import React, { useState, useEffect, useRef, useContext } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import { toast, ToastContainer } from "react-toastify";
import { cloudinaryAxios, axiosInstance } from "../../../../axiosConfig";
import { StateContext } from "../../Context/Context";
import { ModalConfirmation } from '../ModalConfirmation/ModalConfirmation';

export const ModalEditAdmin = ({ closeIcon, closeButton, visibility }) => {
  const { adminView, setAdminView } = useContext(StateContext);
  const inputNameRef = useRef();
  const inputIdRef = useRef();
  const inputPhoneRef = useRef();
  const inputEmailRef = useRef();
  const [image, setImage] = useState(null);
  const [modalConfirmation, setModalConfirmation] = useState(false);
  const { confirmationUpdate } = useContext(StateContext)
  // const inputNameRef = useRef();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const uploadImage = async () => {
    if (!image) {
      return null;
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "nzpngwr9"); // Tu upload_preset

    try {
      const response = await cloudinaryAxios.post("/image/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const secureUrl = response.data.secure_url; // URL segura de la imagen subida
      return secureUrl;
    } catch (error) {
      toast.error("Error al subir la imagen", {
        progressStyle: { backgroundColor: "#692FDB" }, // Color de la barra de carga
      });
      console.error("Error al subir la imagen:", error);
      return null;
    }
  };

  const toggleUpdateData = async (imgUrl) => {
    const id = adminView.map((adminView) => adminView.id);
    let allSuccess = true; // Bandera para verificar si todas las operaciones fueron exitosas

    const name = inputNameRef.current.value;
    const phone = inputPhoneRef.current.value;
    const email = inputEmailRef.current.value;

    // Actualizar nombre
    if (name !== "") {
      const userData = { id, name };
      try {
        const response = await axiosInstance.patch(`/clients/clients/update/name`, userData);
        if (!(response.status === 200 || response.status === 201)) allSuccess = false;
      } catch (error) {
        allSuccess = false;
        toast.error(error.response?.data?.error || "Error al actualizar el nombre");
      }
    }

    // Actualizar teléfono
    if (phone !== "") {
      const userData = { id, phone };
      try {
        const response = await axiosInstance.patch(`/clients/clients/update/phone`, userData);
        if (!(response.status === 200 || response.status === 201)) allSuccess = false;
      } catch (error) {
        allSuccess = false;
        toast.error(error.response?.data?.error || "Error al actualizar el teléfono");
      }
    }

    // Actualizar email
    if (email !== "") {
      const userData = { id, email };
      try {
        const response = await axiosInstance.patch(`/clients/clients/update/email`, userData);
        if (!(response.status === 200 || response.status === 201)) allSuccess = false;
      } catch (error) {
        allSuccess = false;
        toast.error(error.response?.data?.error || "Error al actualizar el email");
      }
    }

    // Actualizar imagen
    if (imgUrl) {
      const userData = { id, img: imgUrl };
      try {
        const response = await axiosInstance.patch(`/clients/clients/${id}/img`, userData);
        if (!(response.status === 200 || response.status === 201)) allSuccess = false;
      } catch (error) {
        allSuccess = false;
        toast.error(error.response?.data?.error || "Error al actualizar la imagen");
      }
    }

    return allSuccess;
  };

  useEffect(() => {
    const updateData = async () => {
      if (confirmationUpdate) {
        console.log("Se confirmó la actualización");

        const imageUrl = await uploadImage(); // Subir imagen y obtener la URL
        const success = await toggleUpdateData(imageUrl); // Pasar la URL de la imagen para actualizarla en el servidor

        if (success) {
          setTimeout(() => {
            window.location.reload(); // Recargar la página si todas las actualizaciones fueron exitosas
          }, 1000);
        } else {
          console.log("No se realizaron todas las actualizaciones correctamente");
        }
      }
    };

    updateData();
  }, [confirmationUpdate]);

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

            <button className='bg-[#692FDB] text-[#f1ede4] text-center text-[20px] shadow-2xl  rounded-[8px] w-[15rem] h-[2.5rem] just-center' onClick={() => setModalConfirmation(true)}>Realizar los cambios</button>

          </div>
        </div>
      </div>
      <ModalConfirmation visibility={modalConfirmation} closeButton={() => { setModalConfirmation(false) }}></ModalConfirmation>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        pauseOnHover={false}
      />
    </div>
  )
}

export const ModalEdiClient = ({ closeIcon, closeButton, visibility, id }) => {
  const { clientsView, setClientsView } = useContext(StateContext);
  const inputNameRef = useRef();
  const inputLastNameRef = useRef();
  const inputPhoneRef = useRef();
  const inputEmailRef = useRef();
  const selectStateRef = useRef();
  const [image, setImage] = useState(null);
  const [modalConfirmation, setModalConfirmation] = useState(false);
  const { confirmationUpdate } = useContext(StateContext)
  // const inputNameRef = useRef();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const uploadImage = async () => {
    if (!image) {
      return null;
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "nzpngwr9"); // Tu upload_preset

    try {
      const response = await cloudinaryAxios.post("/image/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const secureUrl = response.data.secure_url; // URL segura de la imagen subida
      return secureUrl;
    } catch (error) {
      toast.error("Error al subir la imagen", {
        progressStyle: { backgroundColor: "#692FDB" }, // Color de la barra de carga
      });
      console.error("Error al subir la imagen:", error);
      return null;
    }
  };

  const toggleUpdateData = async (imgUrl) => {
    let allSuccess = true; // Bandera para verificar si todas las operaciones fueron exitosas

    const name = inputNameRef.current.value;
    const lastName = inputLastNameRef.current.value;
    const phone = inputPhoneRef.current.value;
    const email = inputEmailRef.current.value;
    const state = selectStateRef.current.value;
    console.log(state);

    // Actualizar apellido

    // Actualizar nombre
    if (name !== "") {
      const userData = { id, name };
      try {
        const response = await axiosInstance.patch(`/clients/clients/update/name`, userData);
        if (!(response.status === 200 || response.status === 201)) allSuccess = false;
      } catch (error) {
        allSuccess = false;
        toast.error(error.response?.data?.error || "Error al actualizar el nombre");
      }
    }

    if (lastName !== "") {
      const userData = { id, lastName };
      try {
        const response = await axiosInstance.patch(`/clients/clients/update/lastname`, userData);
        if (!(response.status === 200 || response.status === 201)) allSuccess = false;
      } catch (error) {
        allSuccess = false;
        toast.error(error.response?.data?.error || "Error al actualizar el apellido");
      }
    }

    // Actualizar teléfono
    if (phone !== "") {
      const userData = { id, phone };
      try {
        const response = await axiosInstance.patch(`/clients/clients/update/phone`, userData);
        if (!(response.status === 200 || response.status === 201)) allSuccess = false;
      } catch (error) {
        allSuccess = false;
        toast.error(error.response?.data?.error || "Error al actualizar el teléfono");
      }
    }

    // Actualizar email
    if (email !== "") {
      const userData = { id, email };
      try {
        const response = await axiosInstance.patch(`/clients/clients/update/email`, userData);
        if (!(response.status === 200 || response.status === 201)) allSuccess = false;
      } catch (error) {
        allSuccess = false;
        toast.error(error.response?.data?.error || "Error al actualizar el email");
      }
    }

    // Actualizar imagen
    if (imgUrl) {
      const userData = { id, img: imgUrl };
      try {
        const response = await axiosInstance.patch(`/clients/clients/${id}/img`, userData);
        if (!(response.status === 200 || response.status === 201)) allSuccess = false;
      } catch (error) {
        allSuccess = false;
        toast.error(error.response?.data?.error || "Error al actualizar la imagen");
      }
    }

    // Actualizar estado
    if (state !== "") {
      const userData = { id, state };
      try {
        const response = await axiosInstance.patch(`/clients/clients/update/state`, userData);
        if (!(response.status === 200 || response.status === 201)) allSuccess = false;
      } catch (error) {
        allSuccess = false;
        toast.error(error.response?.data?.error || "Error al actualizar el Estado");
      }
    }

    return allSuccess;
  };

  useEffect(() => {
    const updateData = async () => {
      if (confirmationUpdate) {
        console.log("Se confirmó la actualización");

        const imageUrl = await uploadImage(); // Subir imagen y obtener la URL
        const success = await toggleUpdateData(imageUrl); // Pasar la URL de la imagen para actualizarla en el servidor

        if (success) {
          setTimeout(() => {
            window.location.reload(); // Recargar la página si todas las actualizaciones fueron exitosas
          }, 1000);
        } else {
          console.log("No se realizaron todas las actualizaciones correctamente");
        }
      }
    };

    updateData();
  }, [confirmationUpdate]);

  return (
    <div className={visibility ? ' w-screen h-screen flex justify-center items-center fixed top-0 left-0 bg-[#00000080] z-[100] ' : 'hidden'}>
      <div className='w-[40%] h-[85%] bg-[#F0ECE3] flex flex-col justify-center items-center rounded-[10px] pb-[10px] animate-modal relative z-[110]'>
        <IoCloseOutline fontSize={50} onClick={closeIcon} className='cursor-pointer absolute right-4 top-3 text-[#2F2E41] ' />
        <div className='w-[30rem] h-[25rem] flex justify-center'  >
          <div className='flex flex-col w-[25rem] gap-[1rem]'>
            <h1 className='text-[28px] text-center'>Edita los campos deseados</h1>
            <input className='bg-[#f1ede4] text-[#1E1E1E] rounded-[5px] h-[2.5rem] shadow-2xl border-[3px] border-[#1E1E1E] px-[10px]' type="text" placeholder='Actualiza tu Nombre...' ref={inputNameRef} />
            <input className='bg-[#f1ede4] text-[#1E1E1E] rounded-[5px] h-[2.5rem] shadow-2xl border-[3px] border-[#1E1E1E] px-[10px]' type="text" placeholder='Actualiza tu Apellido...' ref={inputLastNameRef} />
            <input className='bg-[#f1ede4] text-[#1E1E1E] rounded-[5px] h-[2.5rem] shadow-2xl border-[3px] border-[#1E1E1E] px-[10px]' type="tetx" placeholder='Actualiza tu Numero...' ref={inputPhoneRef} />
            <input className='bg-[#f1ede4] text-[#1E1E1E] rounded-[5px] h-[2.5rem] shadow-2xl border-[3px] border-[#1E1E1E] px-[10px]' type="email" placeholder='Actualiza tu Correo...' ref={inputEmailRef} />
            <select name="Estados"  ref={selectStateRef} id="">
              <option value="">Actualiza tu estado...</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
              <option value="Reportado">Reportado</option>
            </select>
            <input
              type="file"
              onChange={handleImageChange}
              className="mt-2 text-gray-600 text-[13px] w-[8.6rem] text-center "
            />

            <button className='bg-[#692FDB] text-[#f1ede4] text-center text-[20px] shadow-2xl  rounded-[8px] w-[15rem] h-[2.5rem] just-center' onClick={() => setModalConfirmation(true)}>Realizar los cambios</button>

          </div>
        </div>
      </div>
      <ModalConfirmation visibility={modalConfirmation} closeButton={() => { setModalConfirmation(false) }}></ModalConfirmation>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        pauseOnHover={false}
      />
    </div>
  )
}

export const ModalEditEmployee = ({ closeIcon, closeButton, visibility }) => {
  const { employeeView, setEmployeeView } = useContext(StateContext);
  const inputNameRef = useRef();
  const inputLastNameRef = useRef();
  const inputPhoneRef = useRef();
  const inputEmailRef = useRef();
  const selectStateRef = useRef();
  const [image, setImage] = useState(null);
  const [modalConfirmation, setModalConfirmation] = useState(false);
  const { confirmationUpdate } = useContext(StateContext)
  // const inputNameRef = useRef();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const uploadImage = async () => {
    if (!image) {
      return null;
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "nzpngwr9"); // Tu upload_preset

    try {
      const response = await cloudinaryAxios.post("/image/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const secureUrl = response.data.secure_url; // URL segura de la imagen subida
      return secureUrl;
    } catch (error) {
      toast.error("Error al subir la imagen", {
        progressStyle: { backgroundColor: "#692FDB" }, // Color de la barra de carga
      });
      console.error("Error al subir la imagen:", error);
      return null;
    }
  };

  const toggleUpdateData = async (imgUrl) => {
    const id = employeeView.map((employeeView) => employeeView.id);
    let allSuccess = true; // Bandera para verificar si todas las operaciones fueron exitosas

    const name = inputNameRef.current.value;
    const lastName = inputLastNameRef.current.value;
    const phone = inputPhoneRef.current.value;
    const email = inputEmailRef.current.value;
    const state = selectStateRef.current.value;
    console.log(state);

    // Actualizar apellido

    // Actualizar nombre
    if (name !== "") {
      const userData = { id, name };
      try {
        const response = await axiosInstance.patch(`/employees/employee/update/name`, userData);
        if (!(response.status === 200 || response.status === 201)) allSuccess = false;
      } catch (error) {
        allSuccess = false;
        toast.error(error.response?.data?.error || "Error al actualizar el nombre");
      }
    }

    if (lastName !== "") {
      const userData = { id, lastName };
      try {
        const response = await axiosInstance.patch(`/employees/employee/update/lastname`, userData);
        if (!(response.status === 200 || response.status === 201)) allSuccess = false;
      } catch (error) {
        allSuccess = false;
        toast.error(error.response?.data?.error || "Error al actualizar el apellido");
      }
    }

    // Actualizar teléfono
    if (phone !== "") {
      const userData = { id, phone };
      try {
        const response = await axiosInstance.patch(`/employees/employee/update/phone`, userData);
        if (!(response.status === 200 || response.status === 201)) allSuccess = false;
      } catch (error) {
        allSuccess = false;
        toast.error(error.response?.data?.error || "Error al actualizar el teléfono");
      }
    }

    // Actualizar email
    if (email !== "") {
      const userData = { id, email };
      try {
        const response = await axiosInstance.patch(`/employees/employee/update/email`, userData);
        if (!(response.status === 200 || response.status === 201)) allSuccess = false;
      } catch (error) {
        allSuccess = false;
        toast.error(error.response?.data?.error || "Error al actualizar el email");
      }
    }

    // Actualizar imagen
    if (imgUrl) {
      const userData = { id, img: imgUrl };
      try {
        const response = await axiosInstance.patch(`/employees/employee/${id}/img`, userData);
        if (!(response.status === 200 || response.status === 201)) allSuccess = false;
      } catch (error) {
        allSuccess = false;
        toast.error(error.response?.data?.error || "Error al actualizar la imagen");
      }
    }

    // Actualizar estado
    if (state !== "") {
      const userData = { id, state };
      try {
        const response = await axiosInstance.patch(`/employees/employee/update/state`, userData);
        if (!(response.status === 200 || response.status === 201)) allSuccess = false;
      } catch (error) {
        allSuccess = false;
        toast.error(error.response?.data?.error || "Error al actualizar el Estado");
      }
    }

    return allSuccess;
  };

  useEffect(() => {
    const updateData = async () => {
      if (confirmationUpdate) {
        console.log("Se confirmó la actualización");

        const imageUrl = await uploadImage(); // Subir imagen y obtener la URL
        const success = await toggleUpdateData(imageUrl); // Pasar la URL de la imagen para actualizarla en el servidor

        if (success) {
          setTimeout(() => {
            window.location.reload(); // Recargar la página si todas las actualizaciones fueron exitosas
          }, 1000);
        } else {
          console.log("No se realizaron todas las actualizaciones correctamente");
        }
      }
    };

    updateData();
  }, [confirmationUpdate]);

  return (
    <div className={visibility ? ' w-screen h-screen flex justify-center items-center fixed top-0 left-0 bg-[#00000080] z-[100] ' : 'hidden'}>
      <div className='w-[40%] h-[85%] bg-[#F0ECE3] flex flex-col justify-center items-center rounded-[10px] pb-[10px] animate-modal relative z-[110]'>
        <IoCloseOutline fontSize={50} onClick={closeIcon} className='cursor-pointer absolute right-4 top-3 text-[#2F2E41] ' />
        <div className='w-[30rem] h-[25rem] flex justify-center'  >
          <div className='flex flex-col w-[25rem] gap-[1rem]'>
            <h1 className='text-[28px] text-center'>Edita los campos deseados</h1>
            <input className='bg-[#f1ede4] text-[#1E1E1E] rounded-[5px] h-[2.5rem] shadow-2xl border-[3px] border-[#1E1E1E] px-[10px]' type="text" placeholder='Actualiza tu Nombre...' ref={inputNameRef} />
            <input className='bg-[#f1ede4] text-[#1E1E1E] rounded-[5px] h-[2.5rem] shadow-2xl border-[3px] border-[#1E1E1E] px-[10px]' type="text" placeholder='Actualiza tu Apellido...' ref={inputLastNameRef} />
            <input className='bg-[#f1ede4] text-[#1E1E1E] rounded-[5px] h-[2.5rem] shadow-2xl border-[3px] border-[#1E1E1E] px-[10px]' type="tetx" placeholder='Actualiza tu Numero...' ref={inputPhoneRef} />
            <input className='bg-[#f1ede4] text-[#1E1E1E] rounded-[5px] h-[2.5rem] shadow-2xl border-[3px] border-[#1E1E1E] px-[10px]' type="email" placeholder='Actualiza tu Correo...' ref={inputEmailRef} />
            <select name="Estados"  ref={selectStateRef} id="">
              <option value="">Actualiza tu estado...</option>
              <option value="Funcionamiento">Funcionamiento</option>
              <option value="Despedido">Despedido</option>
            </select>
            <input
              type="file"
              onChange={handleImageChange}
              className="mt-2 text-gray-600 text-[13px] w-[8.6rem] text-center "
            />

            <button className='bg-[#692FDB] text-[#f1ede4] text-center text-[20px] shadow-2xl  rounded-[8px] w-[15rem] h-[2.5rem] just-center' onClick={() => setModalConfirmation(true)}>Realizar los cambios</button>

          </div>
        </div>
      </div>
      <ModalConfirmation visibility={modalConfirmation} closeButton={() => { setModalConfirmation(false) }}></ModalConfirmation>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        pauseOnHover={false}
      />
    </div>
  )
}
