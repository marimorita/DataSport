import React, { useState, useContext } from 'react';
import { StateContext } from "../../Context/Context";

const teamMembers = [
  { name: 'Juan Pérez', document: '1234567890', role: 'admin' },
  { name: 'María García', document: '0987654321', role: 'empleado' },
  { name: 'Carlos Rodríguez', document: '1122334455', role: 'empleado' },
  { name: 'Ana Martínez', document: '5544332211', role: 'empleado' },
];

const roleColors = {
  admin: 'bg-[#5023A7]',
  empleado: 'bg-[#FE8D32]',
};

const roleLabels = {
  admin: 'Admin',
  empleado: 'Empleado',
};

const CustomTooltip = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={`absolute z-10 px-2 py-1 text-sm text-white rounded ${
            content.toLowerCase() === 'admin' ? 'bg-[#5023A7]' : 'bg-[#FE8D32]'
          }`}
          style={{ top: '-30px', left: '50%', transform: 'translateX(-50%)' }}
        >
          {content}
        </div>
      )}
    </div>
  );
};

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg max-w-xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-2xl">&times;</button>
        </div>
        {children}
      </div>
    </div>
  );
};

export const WorkingTeamModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-full flex flex-col items-center gap-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Equipo de Trabajo</h2>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-center">
            <thead>
              <tr>
                <th className="px-4 py-2">Rol</th>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Documento</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((member, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">
                    <CustomTooltip content={roleLabels[member.role]}>
                      <div
                        className={`w-4 h-8 rounded-full ${roleColors[member.role]} cursor-pointer mx-auto`}
                      />
                    </CustomTooltip>
                  </td>
                  <td className="px-4 py-2">{member.name}</td>
                  <td className="px-4 py-2">{member.document}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  );
};

// Componente de botón para abrir el modal
export const OpenWorkingTeamModalButton = ({ openModal }) => (
  <div className="mt-4 text-center">
    <button
      onClick={openModal}
      className="bg-[#F0ECE3] text-[#000001] text-[20px] w-[15rem] rounded-[10px] py-2"
    >
      Equipo de trabajo
    </button>
  </div>
);

// Ejemplo de uso en una vista
const SomeView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex justify-center items-center h-screen">
      <OpenWorkingTeamModalButton openModal={() => setIsModalOpen(true)} />
      <WorkingTeamModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default SomeView;