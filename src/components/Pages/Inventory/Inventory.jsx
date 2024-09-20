import React, { useEffect, useRef, useState } from "react";
import { CardsBienes } from "../../shared/CardsInventory/CardsBienes";
import { CardsProducts, CardsProductSize } from "../../shared/CardsInventory/CardsProduct";
import { NavbarType } from "../../shared/Navbar/Navbar";
import { useComponentCycle } from "../../../hooks/useComponentCycle";
import {
  InventorySelectorBienes,
  InventorySelectorEspacios,
  InventorySelectorProductos,
} from "../../shared/inventorySelector/inventorySelector";
import { axiosInstance } from '../../../../axiosConfig';
import { ProductModal } from "../../Modals/ModalEquipments/ModalEquipment";
import { Footer } from "../../Footer/Footer";

// import NextInventory from '../../shared/inventorySelector/inventorySelector'

export const Inventory = ({ nabvar }) => {
  const [viewAssets, setViewAssets] = useState([]);
  const [viewProducts, setViewProducts] = useState([]);
  const [nose, setNose] = useState([]);
  const handleNextAction = () => next();
  const [key, setKey] = useState(undefined);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedid] = useState(null);
  const [items, setItems] = useState([
    {
      name: "", image: "", description: "", type: "", details: {
        used: 0,
        available: 0,
        missing: 0
      }
    },
  ]);


  const products = [
    {
      image: "",
      name: "Mancuernas 15kg",
      items: [
        { reference: "REF001", usageState: "Disponible", conditionState: "Buen estado", acquisitiondate: "20/05/2024", lastMaintenance: "24/07/2024" },
        { reference: "REF002", usageState: "dañado", conditionState: "Buen estado", acquisitiondate: "20/05/2024", lastMaintenance: "24/07/2024" },
        { reference: "REF003", usageState: "Extraviado", conditionState: "Mal estado", acquisitiondate: "20/05/2024", lastMaintenance: "24/07/2024" },
        { reference: "REF001", usageState: "Disponible", conditionState: "Buen estado", acquisitiondate: "20/05/2024", lastMaintenance: "24/07/2024" },

      ],
    },
    {
      image: "",
      name: "Mancuernas 15kg",
      items: [
        { reference: "REF001", usageState: "Disponible", conditionState: "Buen estado", acquisitiondate: "20/05/2024", lastMaintenance: "24/07/2024" },
        { reference: "REF001", usageState: "Disponible", conditionState: "Buen estado", acquisitiondate: "20/05/2024", lastMaintenance: "24/07/2024" },
        { reference: "REF002", usageState: "dañado", conditionState: "Buen estado", acquisitiondate: "20/05/2024", lastMaintenance: "24/07/2024" },
        { reference: "REF003", usageState: "Extraviado", conditionState: "Mal estado", acquisitiondate: "20/05/2024", lastMaintenance: "24/07/2024" },

      ],
    }, {
      image: "",
      name: "Mancuernas15kg",
      items: [
        { reference: "REF001", usageState: "Disponible", conditionState: "Buen estado", acquisitiondate: "20/05/2024", lastMaintenance: "24/07/2024" },
        { reference: "REF002", usageState: "dañado", conditionState: "Buen estado", acquisitiondate: "20/05/2024", lastMaintenance: "24/07/2024" },
        { reference: "REF003", usageState: "Extraviado", conditionState: "Mal estado", acquisitiondate: "20/05/2024", lastMaintenance: "24/07/2024" },
        { reference: "REF001", usageState: "Disponible", conditionState: "Buen estado", acquisitiondate: "20/05/2024", lastMaintenance: "24/07/2024" },

      ],
    }, {
      image: "",
      name: "Mancuernas 15kg",
      items: [
        { reference: "REF001", usageState: "Disponible", conditionState: "Buen estado", acquisitiondate: "20/05/2024", lastMaintenance: "24/07/2024" },
        { reference: "REF002", usageState: "dañado", conditionState: "Buen estado", acquisitiondate: "20/05/2024", lastMaintenance: "24/07/2024" },
        { reference: "REF001", usageState: "Disponible", conditionState: "Buen estado", acquisitiondate: "20/05/2024", lastMaintenance: "24/07/2024" },
        { reference: "REF003", usageState: "Extraviado", conditionState: "Mal estado", acquisitiondate: "20/05/2024", lastMaintenance: "24/07/2024" },

      ],
    }, {
      image: "",
      name: "Mancuernas 15kg",
      items: [
        { reference: "REF001", usageState: "Disponible", conditionState: "Buen estado", acquisitiondate: "20/05/2024", lastMaintenance: "24/07/2024" },
        { reference: "REF002", usageState: "dañado", conditionState: "Buen estado", acquisitiondate: "20/05/2024", lastMaintenance: "24/07/2024" },
        { reference: "REF001", usageState: "Disponible", conditionState: "Buen estado", acquisitiondate: "20/05/2024", lastMaintenance: "24/07/2024" },
        { reference: "REF003", usageState: "Extraviado", conditionState: "Mal estado", acquisitiondate: "20/05/2024", lastMaintenance: "24/07/2024" },

      ],
    }, {
      image: "",
      name: "Mancuernas 15kg",
      items: [
        { reference: "REF001", usageState: "Disponible", conditionState: "Buen estado", acquisitiondate: "20/05/2024", lastMaintenance: "24/07/2024" },
        { reference: "REF002", usageState: "dañado", conditionState: "Buen estado", acquisitiondate: "20/05/2024", lastMaintenance: "24/07/2024" },
        { reference: "REF001", usageState: "Disponible", conditionState: "Buen estado", acquisitiondate: "20/05/2024", lastMaintenance: "24/07/2024" },
        { reference: "REF003", usageState: "Extraviado", conditionState: "Mal estado", acquisitiondate: "20/05/2024", lastMaintenance: "24/07/2024" },

      ],
    }, {
      image: "",
      name: "Mancuernas 15kg",
      items: [
        { reference: "REF001", usageState: "Disponible", conditionState: "Buen estado", acquisitiondate: "20/05/2024", lastMaintenance: "24/07/2024" },
        { reference: "REF002", usageState: "dañado", conditionState: "Buen estado", acquisitiondate: "20/05/2024", lastMaintenance: "24/07/2024" },
        { reference: "REF001", usageState: "Disponible", conditionState: "Buen estado", acquisitiondate: "20/05/2024", lastMaintenance: "24/07/2024" },
        { reference: "REF003", usageState: "Extraviado", conditionState: "Mal estado", acquisitiondate: "20/05/2024", lastMaintenance: "24/07/2024" },

      ],
    }];

  const { component, next } = useComponentCycle(
    [
      <InventorySelectorBienes onNext={handleNextAction} key="Bienes" />,
      <InventorySelectorProductos onNext={handleNextAction} key="Productos" />,

    ],
    {
      onComponentChange: (c) => {
        const { key } = c;
        setKey(key);
        switch (key) {
          case "Bienes":
            // const items = cliente.obtenerBienes();
            // setItems(items);
            break;
        }
      },
    }
  );

  const handleCardClick = (id) => {
    setSelectedid(id);
    setModalOpen(true);
  };

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axiosInstance.get(`/assets/assets`);
        // console.log(response.data);

        setViewAssets(response.data)

      } catch (error) {
        console.error("Error getting assets", error);
      }
    };

    fetchAssets();
  }, [setViewAssets]);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axiosInstance.get(`/products/products`);
        // console.log(response.data);

        setViewProducts(response.data)

      } catch (error) {
        console.error("Error getting products", error);
      }
    };

    fetchAssets();
  }, [setViewProducts]);


  console.log(viewAssets.length);

  const id = viewAssets.map((asset) => asset.id);
  console.log("a", id);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axiosInstance.get(`/assets/assets`);
        setViewAssets(response.data);

        const assetCounts = response.data.map(async (asset) => {
          const individualAssetsResponse = await axiosInstance.get(`/individualassets/individualassets/${asset.id}`);
          const individualAssets = individualAssetsResponse.data;

          // Contar bienes individuales por estado
          const activos = individualAssets.filter(item => item.state === "Activo").length;
          const inactivos = individualAssets.filter(item => item.state === "Inactivo").length;
          const dañado = individualAssets.filter(item => item.condition === "Dañado").length;

          return {
            ...asset,
            activos,
            inactivos,
            dañado
          };
        });

        // Espera todas las promesas de conteo
        const countedAssets = await Promise.all(assetCounts);
        setViewAssets(countedAssets);

      } catch (error) {
        console.error("Error getting assets", error);
      }
    };

    fetchAssets();
  }, [setViewAssets]);

  console.log("alo", viewAssets);

  const userType = nabvar;
  return (
    <div className="bg-[#F0ECE3] w-full flex flex-col justify-center gap-[3rem] ">
      <div className="w-full h-auto bg-[#F0ECE3] flex flex-col gap-[5rem]">
        <NavbarType type={userType} />
      </div>
      {component}

      <InventoryList type={key} items={items} />

      <div className="flex flex-wrap justify-center gap-[3rem] w-[100%]">
        {key === "Bienes" && (
          <>
            <div className="flex flex-wrap justify-center gap-[3rem] w-[100%]">
              {viewAssets.map((product, index) => (
                <div key={index} onClick={() => handleCardClick(product.id)}>
                  <CardsBienes name={product.name} description={product.description} active={product.activos}
                    inactive={product.inactivos} broke={product.dañado} />
                </div>
              ))}
            </div>
            <ProductModal
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              id={selectedProduct}
            />
          </>
        )}
        {key === "Productos" && (
          <>
            {viewProducts.map((product, index) => (
              <CardsProducts
                title={product.name}
                description={product.description}
                price={product.price}
              />
            ))}
          </>
        )}
      </div>
      <div className="w-full ">
        <Footer />
      </div>
    </div >
  );
};

export const BienItem = ({ item }) => {
  return <p>{item.name} </p>;
}
export const EspacioItem = ({ item }) => {
  return <p>{item.name} </p>;
}

export const InventoryList = ({ type, items }) => {

  const renderItems = (items, Component) => {
    return items.map(i => <Component item={i} />)
  }

  return <main>
    {type == "Bienes" && renderItems(items, BienItem)}
    {type == "Espacios" && renderItems(items, EspacioItem)}
  </main>
}
