import React, { useState, useRef, useEffect, useContext } from 'react';
import { NavbarType } from '../../shared/Navbar/Navbar';
import { X, Eye } from 'lucide-react';
import { StateContext } from "../../Context/Context";
import { toast, ToastContainer } from "react-toastify";
import { axiosInstance } from '../../../../axiosConfig';
import { ModalCreate } from '../../Modals/ModalCreate/ModalCreate';
import { FaRegCheckCircle } from 'react-icons/fa';
import { Footer } from "../../Footer/Footer";


const ObservationModal = ({ observation, isOpen, onClose }) => {
  if (!isOpen || !observation) return null;

  const bgColor = observation.role === "admin" ? 'bg-[#5023A7]' : 'bg-[#ff8f33]';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="w-[80%] max-w-md bg-white rounded-lg overflow-hidden shadow-lg">
        <div className={`${bgColor} text-white p-3 flex justify-between items-center`}>
          <p className="font-bold text-2xl">{observation.name}: {observation.reason}</p>
          <button onClick={onClose} className="text-white">
            <X size={24} />
          </button>
        </div>
        <div className="p-3">
          <p className="text-xl">{observation.description}</p>
        </div>
      </div>
    </div>
  );
};

const AddObservationModal = ({ isOpen, onClose, onAdd }) => {
  const { userObservation } = useContext(StateContext);
  const { createEmpleyees, setCreateEmpleyees } = useContext(StateContext);
  const [nombre, setNombre] = useState('');
  const [motivo, setMotivo] = useState('');
  const [detalles, setDetalles] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const adminData = {
      role: userObservation.map(role => role.role)[0],
      name: userObservation.map(name => name.name)[0],
      description: detalles,
      reason: motivo,
    };

    try {
      const response = await axiosInstance.post("/observations/register", adminData);
      if (response.status === 200 || response.status === 201) {
        setCreateEmpleyees(true);
        onAdd(adminData);
        onClose();
      } else {
        toast.error(response.data.error, {
          progressStyle: {
            backgroundColor: "#692FDB",
          },
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.error, {
        progressStyle: {
          backgroundColor: "#692FDB",
        },
      });
    }
  };

  if (!isOpen) return null;  // No renderiza el modal si está cerrado

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-[#F0ECE3] p-6 rounded-lg w-96 relative">
        <button
          onClick={onClose}  // Cerrar modal
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center pt-2">Agregar Observación</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="w-full mb-2 p-2 border-2 border-[#000000] rounded-md text-center"
            placeholder="Motivo"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}  // Actuasliza estado del motivo
          />
          <textarea
            className="w-full mb-2 p-4 border rounded text-center"
            placeholder="Detalles"
            value={detalles}
            onChange={(e) => setDetalles(e.target.value)}  
          />
          <div className="flex justify-center">
            <button type="submit" className="px-4 py-2 bg-[#2a2933] text-white rounded">Crear</button>
          </div>
        </form>
      </div>
      <ToastContainer position="top-center" autoClose={1500} pauseOnHover={false} />
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

const RoleTooltip = ({ children, role, color }) => {
  return (
    <div className="group relative flex justify-center">
      {children}
      <span className={`absolute bottom-full mb-2 hidden group-hover:flex justify-center items-center py-1 px-2 text-sm text-white ${color} rounded-md whitespace-nowrap`}>
        {role}
      </span>
    </div>
  );
};

export const Observations = ({ nabvar }) => {
  const userType = nabvar;
  const { adminView, setAdminView } = useContext(StateContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedObservation, setSelectedObservation] = useState(null);
  const [observaciones, setObservaciones] = useState([]);

  // const handleAddObservation = (newObservation) => {
  //   setObservaciones([...observaciones, { ...newObservation, id: observaciones.length + 1 }]);
  // };

  const openObservationModal = (observation) => {
    setSelectedObservation(observation);
  };

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axiosInstance.get('/observations/observations');
        // console.log(response.data);

        setObservaciones(response.data)

      } catch (error) {
        console.error("Error getting observations", error);
      }
    };

    fetchClients();
  }, [setObservaciones]);

  console.log("observaciones:");



  return (
    <>
      <div className="w-full bg-[#F0ECE3] flex flex-col justify-center gap-[3rem] pb-12">
        <div className="w-full h-auto bg-[#F0ECE3] flex flex-col gap-[5rem]">
          <NavbarType type={userType} />
        </div>
        <div className="container mx-auto px-4 flex justify-center">
          <div className="w-full max-w-[65%]">
            <h1 className="text-[2rem] font-bold mb-4 text-center">Observaciones</h1>
            <div className="w-full overflow-x-auto">
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border border-gray-500">Rol</th>
                    <th className="px-4 py-2 border border-gray-500">Nombre</th>
                    <th className="px-4 py-2 border border-gray-500">Motivo</th>
                    <th className="px-4 py-2 border border-gray-500">Descripción</th>
                    <th className="px-4 py-2 border border-gray-500">Detalles</th>
                  </tr>
                </thead>
                <tbody>
                  {observaciones.map((obs) => (
                    <tr key={obs.id}>
                      <td className="px-4 py-2 border border-gray-500">
                        <RoleTooltip
                          role={obs.role === "admin" ? "Administrador" : "Empleado"} // Condición para el rol
                          color={obs.role === "admin" ? "bg-[#5023A7]" : "bg-[#FF9F2E]"} // Morado si es admin, naranja si es empleado
                        >
                          <div
                            className={`w-3 h-8 rounded-full ${obs.role === "admin" ? 'bg-[#5023A7]' : 'bg-[#FF9F2E]'} mx-auto`}
                          />
                        </RoleTooltip>
                      </td>
                      <td className="px-4 py-2 border border-gray-500">{obs.name}</td>
                      <td className="px-4 py-2 border border-gray-500">{obs.reason}</td>
                      <td className="px-4 py-2 border border-gray-500">
                        {obs.description.length > 10 ? `${obs.description.substring(0, 10)}...` : obs.description}
                      </td>
                      <td className="px-4 py-2 border border-gray-500">
                        <button
                          onClick={() => openObservationModal(obs)}
                          className="px-2 py-1 bg-[#2a2933] text-white rounded flex items-center justify-center mx-auto"
                        >
                          <Eye size={16} className="mr-1" /> Ver detalles
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <button
        className="fixed bottom-8 right-8 w-16 h-16 bg-[#5023A7] text-white rounded-md text-4xl flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors"
        onClick={() => setIsModalOpen(true)}
      >
        +
      </button>
      <AddObservationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <ObservationModal
        observation={selectedObservation} // Pasa la observación seleccionada
        isOpen={!!selectedObservation} // Si hay una observación seleccionada, el modal está abierto
        onClose={() => setSelectedObservation(null)} // Cierra el modal
      />
            <div className="w-full ">
        <Footer />
      </div>
    </>
  );
};