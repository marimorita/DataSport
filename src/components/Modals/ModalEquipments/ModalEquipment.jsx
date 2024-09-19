import React, { useState, useEffect, useRef } from "react";
import { axiosInstance } from '../../../../axiosConfig';
import { toast, ToastContainer } from "react-toastify";


export const ProductModal = ({ isOpen, onClose, id }) => {
    if (!isOpen || !id) return null;
    const [viewAssets, setViewAssets] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [assetsId, setAssetsId] = useState(null);
    // const [editedProduct, setEditedProduct] = useState(product);
    const [newItemQuantity, setNewItemQuantity] = useState(1); // Cantidad por defecto a agregar

    // console.log(id);
    const statusColors = {
        activo: "bg-[#692FDB]",
        dañado: "bg-[#FE7A36]",
        inactivo: "bg-[#1E1E1E]",
    };

    const statusLabels = {
        activo: "Activo",
        dañado: "Dañado",
        inactivo: "Inactivo",
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

    console.log(viewAssets.length);

    const hola = (id) => {
        console.log("se dio click al bien dsasdsdasd",id);
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-white rounded-[10px] p-6 relative w-[65%]">
                <button onClick={onClose} className="absolute top-2 right-2 text-2xl">X</button>
                <button onClick={handleEdit} className="absolute top-2 right-12 text-lg">Editar</button>
                <button onClick={handleAddItem} className="absolute top-2 right-28 text-lg">Agregar</button>

                <div className="flex items-center mb-4">
                    <div className="w-[40%] flex justify-center items-center mb-4">
                        <svg width="128" height="92" viewBox="0 0 128 92" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-4">
                            {/* SVG path data */}
                        </svg>
                    </div>
                    {viewAssets.length > 0 && (
                        <h2 className="text-2xl font-bold text-center flex-1">
                            {viewAssets[0].name}
                        </h2>
                    )}
                </div>

                <div className="w-full max-h-80 overflow-y-auto mb-4">
                    <div className="flex justify-between mb-2">
                        <div className="w-1/4 sticky text-center rounded-lg shadow-xl py-2">Estado de Uso</div>
                        <div className="w-1/5 sticky text-center rounded-lg shadow-xl py-2">Fecha de Adquisición</div>
                        <div className="w-1/5 sticky text-center rounded-xl shadow-xl py-2">Referencia</div>
                        <div className="w-1/5 sticky text-center rounded-lg shadow-xl py-2">Condicion</div>
                        <div className="w-1/5 sticky text-center rounded-lg shadow-xl py-2">Ultimo mantenimiento</div>
                    </div>
                    <div className="border-t border-black">
                        {viewAssets.map((item, index) => (
                            <div key={index} className="flex justify-between py-4 border-b border-gray-400">
                                <div className="w-1/4 flex items-center justify-center relative">
                                    <div className={`w-4 h-8 rounded-full ${statusColors[item.state.toLowerCase()]}`} />
                                    <div className="ml-2">
                                        {editingIndex === index ? (
                                            <select
                                                key={item.id}
                                                onClick={() => hola(item.id)}
                                                onChange={() => hola(item.id)}
                                                className="p-1 rounded border"
                                                onBlur={() => setEditingIndex(null)}
                                            >
                                                <option value="activo">Activo</option>
                                                <option value="dañado">Inactivo</option>
                                            </select>
                                        ) : (
                                            <span
                                                className="cursor-pointer"
                                                onClick={() => setEditingIndex(index)}
                                            >
                                                {statusLabels[item.state.toLowerCase()]}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="w-1/5 text-center">{item.adquisitionDate}</div>
                                <div className="w-1/5 text-center">{item.idAssets}</div>
                                <div className="w-1/5 text-center">{item.condition}</div>
                                <div className="w-1/5 text-center">{item.lastMaintenance}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal para editar producto */}
            {isEditModalOpen && (
                <EditProductModal
                    // product={editedProduct}
                    onClose={() => setEditModalOpen(false)}
                    onSave={handleSaveEdit}
                // setEditedProduct={setEditedProduct}
                />
            )}

            {/* Modal para agregar nuevos items */}
            {isAddModalOpen && (
                <AddItemsModal
                    quantity={newItemQuantity}
                    onClose={() => setAddModalOpen(false)}
                    onSave={handleAddNewItems}
                    setQuantity={setNewItemQuantity}
                    id={id}
                />
            )}
        </div>
    );
};

// Componente para agregar nuevos items
const AddItemsModal = ({ quantity, onClose, onSave, setQuantity, id }) => {
    const [viewAssets, setViewAssets] = useState([]);
    const [viewIndividualAssets, setViewIndividualAssets] = useState([]);
    const inputStockRef = useRef()

    console.log("melo", id);

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        const fetchIndivualAssets = async () => {
            try {
                const response = await axiosInstance.get(`/individualassets/individualassets/${id}`);
                // console.log(response.data);

                const individualAssetData = response.data
                setViewIndividualAssets(individualAssetData)


            } catch (error) {
                console.error("Error getting assets", error);
            }
        };

        fetchIndivualAssets();
    }, [setViewIndividualAssets]);

    const createRegisterIndivdualAsset = async () => {

        try {
            const response = await axiosInstance.get(`/assets/assets/${id}`);
            // console.log(response.data);

            const assetData = response.data
            const stock = inputStockRef.current.value
            if (stock !== 0) {
                for (let index = 0; index < stock; index++) {
                    const individualAssetsnData = {
                        name: assetData.name,
                        description: assetData.description,
                        adquisitionDate: getCurrentDate(),
                        state: "Activo",
                        condition: "Nuevo",
                        img: assetData.img,
                        lastMaintenance: getCurrentDate(),
                        nextMaintenance: getCurrentDate(),
                        idAssets: assetData.id,
                    };

                    try {
                        const response = await axiosInstance.post(
                            "/individualassets/register",
                            individualAssetsnData
                        );
                        if (response.status === 200 || response.status === 201) {
                            // Manejo exitoso
                        } else {
                            toast.error(response.data.error, {
                                progressStyle: {
                                    backgroundColor: "#692FDB",
                                },
                            });
                        }
                    } catch (error) {
                        toast.error(error.response?.data?.error || "An error occurred", {
                            progressStyle: {
                                backgroundColor: "#692FDB",
                            },
                        });
                    }

                }
            }

        } catch (error) {
            console.error("Error getting assets", error);
        }

        try {
            const response = await axiosInstance.get(`/individualassets/individualassets/${id}`);
            // console.log(response.data);

            const individualAssetData = response.data

            const assetsData = {
                id: id,
                stock: individualAssetData.length,
            };

            try {
                const response = await axiosInstance.patch(
                    "/assets/assets/update/stock",
                    assetsData
                );
                if (response.status === 200 || response.status === 201) {
                    // Manejo exitoso
                } else {
                    toast.error(response.data.error, {
                        progressStyle: {
                            backgroundColor: "#692FDB",
                        },
                    });
                }
            } catch (error) {
                toast.error(error.response?.data?.error || "An error occurred", {
                    progressStyle: {
                        backgroundColor: "#692FDB",
                    },
                });
            }

        } catch (error) {
            console.error("Error getting assets", error);
        }


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
                        ref={inputStockRef}
                        className="border rounded w-full p-2"
                        min="1"
                    />
                </div>

                <button onClick={createRegisterIndivdualAsset} className="bg-[#5023A7] text-white rounded px-4 py-2">Agregar</button>
            </div>
        </div>
    );
};

// Componente para editar producto
const EditProductModal = ({ product, onClose, onSave, setEditedProduct }) => {
    const [name, setName] = useState();
    const [description, setDescription] = useState();

    // const handleSave = () => {
    //     setEditedProduct({ ...product, name, description });
    //     onSave();
    // };

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

                <button className="bg-[#5023A7] text-white rounded px-4 py-2">Guardar</button>
            </div>
        </div>
    );
};