import React, { useState, useMemo } from 'react';

// Simulamos que estos datos vendrían de props o de un contexto
const userName = "Juan Pérez";
const paymentHistory = [
  { status: 'pagado', description: 'Mancuerna de 25kg', date: '2024-09-01', amount: 150000 },
  { status: 'no pagado', description: 'Membresía mensual', date: '2024-08-15', amount: 80000 },
  { status: 'pagado', description: 'Clase de yoga', date: '2024-08-05', amount: 30000 },
  { status: 'no pagado', description: 'Suplementos proteicos', date: '2024-07-20', amount: 120000 },
];

const statusColors = {
  pagado: 'bg-green-500',
  'no pagado': 'bg-red-500',
};

const statusLabels = {
  pagado: 'Pagado',
  'no pagado': 'No Pagado',
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
            statusColors[content.toLowerCase()]
          }`}
          style={{ top: '-30px', left: '50%', transform: 'translateX(-50%)' }}
        >
          {statusLabels[content]}
        </div>
      )}
    </div>
  );
};

export const PaymentHistory = ({ isOpen, onClose }) => {
  const { totalDebts, totalAmount } = useMemo(() => {
    return paymentHistory.reduce((acc, payment) => {
      if (payment.status === 'no pagado') {
        acc.totalDebts += 1;
        acc.totalAmount += payment.amount;
      }
      return acc;
    }, { totalDebts: 0, totalAmount: 0 });
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-2xl">&times;</button>
        </div>
        <div className="w-full flex flex-col items-center gap-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Historial de Pagos</h2>
            <p className="text-xl mt-2">Usuario: {userName}</p>
          </div>
          <div className="w-full overflow-x-auto">
            <table className="w-full text-center">
              <thead>
                <tr>
                  <th className="px-4 py-2">Estado</th>
                  <th className="px-4 py-2">Descripción</th>
                  <th className="px-4 py-2">Fecha</th>
                  <th className="px-4 py-2">Valor</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((payment, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-2">
                      <CustomTooltip content={payment.status}>
                        <div
                          className={`w-4 h-4 rounded-full ${statusColors[payment.status]} cursor-pointer mx-auto`}
                        />
                      </CustomTooltip>
                    </td>
                    <td className="px-4 py-2">{payment.description}</td>
                    <td className="px-4 py-2">{payment.date}</td>
                    <td className="px-4 py-2">${payment.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-4">
            <p className="text-lg">
              La persona {userName} debe {totalDebts} {totalDebts === 1 ? 'pago' : 'pagos'} para un total de ${totalAmount.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;