export const statusColors = {
    'activo': 'bg-[#FE8D32]',
    'pendiente': 'bg-[#5023A7]',
    'inactivo': 'bg-[#3F3D56]'
  };
  
  export const getStyleByEstado = (estado) => {
    return {
      Background: statusColors[estado],
      icon: statusColors[estado],
      borderColor: statusColors[estado]
    };
  };
  import React from 'react';

  const StatusCard = () => {
    const items = [
      { id: 1, text: "Activo", color: "border-yellow-600", textColor: "text-white", bg: "bg-[#FE8D32]" },
      { id: 2, text: "Pendiente", color: "border-purple-600", textColor: "text-white", bg: "bg-[#5023A7]" },
      { id: 3, text: "Inactivo", color: "border-gray-600", textColor: "text-white", bg: "bg-[#3F3D56]" }
    ];
  
    return (
      <div className="w-[68%] flex ml-[10%] justify-start mb-10">
        <div className='flex items-center gap-4'>
          <h3 className='text-xl text-black whitespace-nowrap'>Tipos de Estado:</h3>
          <div className="flex gap-1">
            {items.map((item) => (
              <div key={item.id} className="relative group">
                <div className={`h-8 w-3 rounded-md border ${item.color} ${item.bg} cursor-pointer`} />
                <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-2 ${item.bg} ${item.textColor} text-sm rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap
                  after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 
                  after:border-8 after:border-t-current after:border-r-transparent after:border-b-transparent after:border-l-transparent
                  after:border-t-[#000000]`}
                >
                  {item.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default StatusCard;