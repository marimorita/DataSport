import React, { useState, useEffect, useContext } from 'react';
import { NavbarType } from '../../shared/Navbar/Navbar';
import { X, Eye } from 'lucide-react';
import { StateContext } from "../../Context/Context";
import { toast, ToastContainer } from "react-toastify";

const ObservationModal = ({ observation, isOpen, onClose }) => {
  if (!isOpen) return null;

  const bgColor = observation.esAdmin ? 'bg-[#5023A7]' : 'bg-[#ff8f33]';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="w-[80%] max-w-md bg-white rounded-lg overflow-hidden shadow-lg">
        <div className={`${bgColor} text-white p-3 flex justify-between items-center`}>
          <p className="font-bold text-2xl">{observation.nombre}: {observation.motivo}</p>
          <button onClick={onClose} className="text-white">
            <X size={24} />
          </button>
        </div>
        <div className="p-3">
          <p className="text-xl">{observation.detalles}</p>
        </div>
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
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
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
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="esAdmin"
              checked={esAdmin}
              onChange={(e) => setEsAdmin(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="esAdmin">Es administrador</label>
          </div>
          <div className="flex justify-center">
            <button type="submit" className="px-4 py-2 bg-[#2a2933] text-white rounded">Crear</button>
          </div>
        </form>
      </div>
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
  const [observaciones, setObservaciones] = useState([
    // Example data
    { id: 1, nombre: 'Juan', motivo: 'Reporte diario', detalles: 'Completado el informe de ventas del día', esAdmin: true },
    { id: 2, nombre: 'María', motivo: 'Solicitud', detalles: 'Necesito permiso para salir temprano mañana', esAdmin: false },
  ]);

  const handleAddObservation = (newObservation) => {
    setObservaciones([...observaciones, { ...newObservation, id: observaciones.length + 1 }]);
  };

  const openObservationModal = (observation) => {
    setSelectedObservation(observation);
  };

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
                          role={obs.esAdmin ? "Administrador" : "Empleado"} 
                          color={obs.esAdmin ? "bg-[#5023A7]" : "bg-[#FF9F2E]"}
                        >
                          <div 
                            className={`w-3 h-8 rounded-full ${obs.esAdmin ? 'bg-[#5023A7]' : 'bg-[#FF9F2E]'} mx-auto`}
                          />
                        </RoleTooltip>
                      </td>
                      <td className="px-4 py-2 border border-gray-500">{obs.nombre}</td>
                      <td className="px-4 py-2 border border-gray-500">{obs.motivo}</td>
                      <td className="px-4 py-2 border border-gray-500">
                        {obs.detalles.length > 10 ? `${obs.detalles.substring(0, 10)}...` : obs.detalles}
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
        onAdd={handleAddObservation}
      />
      <ObservationModal
        observation={selectedObservation}
        isOpen={!!selectedObservation}
        onClose={() => setSelectedObservation(null)}
      />
    </>
  );
};