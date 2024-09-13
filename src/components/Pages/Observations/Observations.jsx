import React, { useState, useEffect, useContext } from 'react';
import { NavbarType } from '../../shared/Navbar/Navbar';
import { X } from 'lucide-react';
import { StateContext } from "../../Context/Context";
import { toast, ToastContainer } from "react-toastify";

const ObservationCard = ({ nombre, motivo, detalles, esAdmin }) => {
  const bgColor = esAdmin ? 'bg-[#5023A7]' : 'bg-[#ff8f33]';
  
  return (
    <div className="w-[30%]  h-max border rounded-lg overflow-hidden shadow-lg mb-4 ">
      <div className={`${bgColor} text-white p-3 flex justify-center`}>
        <p className="font-bold text-2xl text-center">{nombre}: {motivo}</p>
      </div>
      <div className="bg-white p-3 flex justify-center text-xl text-center">
        <p>{detalles}</p>
      </div>
    </div>
  );
};

const AddObservationModal = ({ isOpen, onClose, onAdd }) => {
  const [nombre, setNombre] = useState('');
  const [motivo, setMotivo] = useState('');
  const [detalles, setDetalles] = useState('');
  const [esAdmin, setEsAdmin] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ nombre, motivo, detalles, esAdmin });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-[#F0ECE3] p-6 rounded-lg w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center pt-2">Hola, ¿qué observación tienes para hoy?</h2>
        <form className='p-8' onSubmit={handleSubmit}>
          <input
            className="w-full mb-2 p-2 border-2 border-[#000000] rounded-md text-center"
            placeholder="Motivo"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            required
          />
          <textarea
            className="w-full mb-2 p-4 border rounded text-center"
            placeholder="Detalles"
            value={detalles}
            onChange={(e) => setDetalles(e.target.value)}
            required
          />
          <div className="flex justify-center">
            <button type="submit" className="px-4 py-2 bg-[#2a2933] text-white rounded">Crear</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const Observations = ({ nabvar }) => {
  const userType = nabvar;
  const { adminView, setAdminView } = useContext(StateContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [observaciones, setObservaciones] = useState([
    
  ]);

  const handleAddObservation = (newObservation) => {
    setObservaciones([...observaciones, { ...newObservation, id: observaciones.length + 1 }]);
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

  return (
    <>
    {
      <>
      <div className="w-full bg-[#F0ECE3] flex flex-col justify-center gap-[3rem] pb-12">
        <div className="w-full h-auto bg-[#F0ECE3] flex flex-col gap-[5rem]">
          <NavbarType type={userType} />
        </div>
        <div className="container mx-auto px-4">
          <h1 className="text-[2rem] font-bold mb-4 text-center">Observaciones</h1>
          <div className="flex flex-wrap justify-evenly gap-4">
            {observaciones.map(obs => (
              <ObservationCard
                key={obs.id}
                nombre={obs.nombre}
                motivo={obs.motivo}
                detalles={obs.detalles}
                esAdmin={obs.esAdmin}
              />
            ))}
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
        onAdd={handleAddObservation}
      />
      </>
          }
    </>
  );
};