import React, { useState, useEffect } from "react";
import { axiosInstance } from '../../../../axiosConfig';


export const ProductModal = ({ isOpen, onClose, id }) => {
    if (!isOpen || !id) return null;
    const [viewAssets, setViewAssets] = useState([]);

    console.log(id);


    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    // const [editedProduct, setEditedProduct] = useState(product);
    const [newItemQuantity, setNewItemQuantity] = useState(1); // Cantidad por defecto a agregar

    const statusColors = {
        activo: "bg-[#5023A7]",
        dañado: "bg-[#FE8D32]",
        extraviado: "bg-[#3F3D56]",
    };

    const statusLabels = {
        activo: "Activo",
        dañado: "Dañado",
        extraviado: "Extraviado",
    };

    const handleEdit = () => {
        setEditModalOpen(true);
    };

    const handleAddItem = () => {
        setAddModalOpen(true);
    };

    const handleSaveEdit = () => {
        // Actualiza el producto editado
        setEditedProduct({ ...editedProduct });
        setEditModalOpen(false);
    };

    const handleAddNewItems = () => {
        const newItems = Array.from({ length: newItemQuantity }, () => ({
            reference: `REF${Math.random().toString(36).substr(2, 5).toUpperCase()}`, // Genera una referencia aleatoria
            usageState: "Disponible",
            conditionState: "Nuevo",
            acquisitiondate: "25/08/2024",
            lastMaintenance: "29/08/2024",
        }));

        setEditedProduct({
            ...editedProduct,
            items: [...editedProduct.items, ...newItems],
        });
        setAddModalOpen(false);
        setNewItemQuantity(1); // Reinicia la cantidad a agregar
    };

    useEffect(() => {
        const fetchAssets = async () => {
            try {
                const response = await axiosInstance.get(`/individualassets/individualassets/${id}`);
                // console.log(response.data);

                setViewAssets(response.data)

            } catch (error) {
                console.error("Error getting assets", error);
            }
        };

        fetchAssets();
    }, [setViewAssets]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-white rounded-[10px] p-6 relative w-[65%]">
                <button onClick={onClose} className="absolute top-2 right-2 text-2xl">X</button>
                <button onClick={handleEdit} className="absolute top-2 right-12 text-lg">Editar</button>
                <button onClick={handleAddItem} className="absolute top-2 right-28 text-lg">Agregar</button>

                <div className="flex items-center mb-4">
                    <div className="w-[40%] flex justify-center items-center mb-4">
                        <svg
                            width="128"
                            height="92"
                            viewBox="0 0 128 92"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="ml-4"
                        >
                            <path
                                d="M46.9742 45.6636C46.9742 45.6636 33.7712 70.2486 24.4802 72.4836C15.1892 74.7186 6.38717 71.7684 4.82237 68.103C3.25757 64.4376 -2.80603 44.9484 3.25757 25.5486C9.32117 6.14882 17.732 1.67882 22.9154 0.606016C28.0988 -0.466784 44.627 0.606016 47.7566 17.145C50.8862 33.684 49.8104 35.8296 49.8104 35.8296L81.1064 38.0646C81.1064 38.0646 87.9524 20.0952 96.3632 17.145C104.774 14.1948 121.204 14.5524 126.094 31.8066C130.984 49.0608 124.53 80.2614 112.891 87.9498C101.253 95.6382 85.214 90.5424 81.9866 86.0724C78.7592 81.6024 79.1504 49.4184 79.1504 49.4184L46.9742 45.6636Z"
                                fill="#3F3D56"
                            />
                            <path
                                d="M46.8763 34.8464C44.6269 34.6676 42.3775 34.4888 40.1281 34.31C37.8787 34.1312 35.6293 33.863 33.3799 33.6842L34.0645 33.3266C33.0865 35.2934 32.4019 37.439 32.0107 39.5846C31.9129 40.121 31.9129 40.568 31.9129 41.1044C31.9129 41.3726 32.0107 41.5514 32.0107 41.8196C32.0107 41.909 32.1085 41.9984 32.1085 42.0878V42.1772C32.3041 42.2666 32.4997 42.356 32.6953 42.4454C32.9887 42.5348 33.1843 42.6242 33.4777 42.7136C34.0645 42.8924 34.6513 42.9818 35.2381 43.1606C37.5853 43.697 40.0303 44.0546 42.4753 44.4122C44.9203 44.7698 47.3653 45.1274 49.7125 45.485C59.4925 46.826 69.2725 47.9882 78.9547 49.508C69.0769 49.1504 59.1991 48.3458 49.4191 47.1836C44.5291 46.6472 39.6391 45.8426 34.7491 44.8592C34.1623 44.6804 33.5755 44.591 32.8909 44.3228C32.5975 44.2334 32.3041 44.144 31.9129 43.9652C31.5217 43.7864 31.2283 43.6076 30.8371 43.4288C30.7393 43.3394 30.6415 43.25 30.5437 43.0712C30.5437 42.9818 30.4459 42.8924 30.4459 42.803C30.3481 42.6242 30.2503 42.4454 30.2503 42.2666C30.1525 41.909 30.0547 41.6408 30.0547 41.2832C30.0547 41.015 30.0547 40.6574 30.0547 40.2998C30.0547 40.0316 30.1525 39.674 30.1525 39.4058C30.6415 37.0814 31.5217 34.9358 32.6953 32.8796L32.8909 32.522L33.3799 32.6114C35.6293 32.969 37.7809 33.3266 40.0303 33.7736C42.2797 34.2206 44.6269 34.31 46.8763 34.8464Z"
                                fill="#000001"
                            />
                        </svg>
                    </div>
                    {viewAssets.length > 0 && (
                        <h2 className="text-2xl font-bold text-center flex-1">
                            {viewAssets[0].name}
                        </h2>
                    )}
                </div>

                {/* Tabla de productos */}
                <div className="w-full max-h-80 overflow-y-auto mb-4">
                    <div className="flex justify-between mb-2">
                        <div className="flex-1 sticky text-center rounded-lg shadow-xl py-2">Estado de Uso </div>
                        <div className="flex-1 sticky text-center rounded-lg shadow-xl py-2">Fecha de Adquisición</div>
                        <div className="flex-1 sticky text-center rounded-xl shadow-xl py-2">Referencia</div>
                        <div className="flex-1 sticky text-center rounded-lg shadow-xl py-2">Condicion</div>
                        <div className="flex-1 sticky text-center rounded-lg shadow-xl py-2">Ultimo mantenimiento</div>
                    </div>
                    <div className="border-t border-black">
                        {viewAssets.map((item, index) => (
                            <div key={index} className="flex justify-between py-4 border-b border-gray-400">
                                <div className="flex-1 text-center relative">
                                    <div className={`w-4 h-8 mx-auto rounded-full ${statusColors[item.state.toLowerCase()]}`} />
                                    {hoveredIndex === index && (
                                        <div
                                            className={`absolute left-1/2 transform -translate-x-1/2 mt-2 p-1 text-white rounded ${statusColors[item.state.toLowerCase()]}`}
                                            style={{ whiteSpace: 'nowrap' }}
                                        >
                                            {statusLabels[item.state.toLowerCase()]}
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 text-center">{item.adquisitionDate}</div>
                                <div className="flex-1 text-center">{item.idAssets}</div>
                                <div className="flex-1 text-center">{item.condition}</div>
                                <div className="flex-1 text-center">{item.lastMaintenance}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Modal para editar producto */}
            {isEditModalOpen && (
                <EditProductModal
                    product={editedProduct}
                    onClose={() => setEditModalOpen(false)}
                    onSave={handleSaveEdit}
                    setEditedProduct={setEditedProduct}
                />
            )}

            {/* Modal para agregar nuevos items */}
            {isAddModalOpen && (
                <AddItemsModal
                    quantity={newItemQuantity}
                    onClose={() => setAddModalOpen(false)}
                    onSave={handleAddNewItems}
                    setQuantity={setNewItemQuantity}
                />
            )}
        </div>
    );
};

// Componente para agregar nuevos items
const AddItemsModal = ({ quantity, onClose, onSave, setQuantity }) => {
    const handleSave = () => {
        onSave();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-white rounded-[20px] p-6 relative w-[400px]">
                <button onClick={onClose} className="absolute top-2 right-2 text-xl">X</button>
                <h2 className="text-xl font-bold mb-4">Agregar Nuevos Items</h2>

                <div className="mb-4">
                    <label className="block mb-2">Cantidad a Agregar:</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="border rounded w-full p-2"
                        min="1"
                    />
                </div>

                <button onClick={handleSave} className="bg-[#5023A7] text-white rounded px-4 py-2">Agregar</button>
            </div>
        </div>
    );
};

// Componente para editar producto
const EditProductModal = ({ product, onClose, onSave, setEditedProduct }) => {
    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description || "");

    const handleSave = () => {
        setEditedProduct({ ...product, name, description });
        onSave();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-white rounded-[20px] p-6 relative w-[400px]">
                <button onClick={onClose} className="absolute top-2 right-2 text-xl">X</button>
                <h2 className="text-xl font-bold mb-4">Editar Producto</h2>

                <div className="mb-4">
                    <label className="block mb-2">Nombre:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border rounded w-full p-2"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2">Descripción:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border rounded w-full p-2"
                    />
                </div>

                <button onClick={handleSave} className="bg-[#5023A7] text-white rounded px-4 py-2">Guardar</button>
            </div>
        </div>
    );
};