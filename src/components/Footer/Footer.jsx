import React from "react";
import logo from "../../assets/logodataspor.png";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { CgMail } from "react-icons/cg";


export const Footer = () => {
  return (
    <div className="flex-col w-full h-[35rem] bg-gradient-to-r from-[#381975]  to-[#692FDB] ">
      <div className="text-white flex-col text-[1rem]  gap-y-[4rem]">
        <div className="flex justify-center gap-[12rem] pt-[4rem] mb-[2rem] ">
          <ul>
            <li>CREADORES:</li>
            <li className="text-gray-300"><a href="https://www.linkedin.com/in/sergio-chica-742b92285/" target="_blank"><b className="text-white text-[1.1rem]">Sergio Chica:</b>  FullStack / Lider_Back</a></li>
            <li className="text-gray-300"><a href="https://www.linkedin.com/in/sergio-chica-742b92285/" target="_blank"><b className="text-white text-[1.1rem]">Mariana Mendez:</b>  Scrum_Master / Lider_DataBase</a></li>
            <li className="text-gray-300"><a href="https://www.linkedin.com/in/jeronimo-arias-mosquera-87ab1529a/" target="_blank"><b className="text-white text-[1.1rem]">Jeronimo Arias:</b>  Lider_Front / UX / UI</a></li>
            <li className="text-gray-300"><b className="text-white text-[1.1rem]" target="_blank">Juan pablo Villa:</b> Product_Owner / Front</li>
            <li className="text-gray-300"><b className="text-white text-[1.1rem]" target="_blank">Jhoan Sebastian Espitia:</b> Back / Documentacion</li>
            <li className="text-gray-300"><b className="text-white text-[1.1rem]" target="_blank">Andres Ladino:</b> DataBase / Documentacion </li>
          </ul>
          <ul className="mr-[3rem]">
            <li>SENA:</li>
            <li>ADSO 2696224</li>
            <li>Armenia Quindio</li>
          </ul>
          <ul>
            <li>CONTACTANOS:</li>
            <li className="ml-8">+57 302 2606983</li>
            <li className="flex gap-3 items-center"> <CgMail />

            datasport@gmail.com</li>
            <li className="flex gap-2 items-center">
              <AiFillInstagram />
              <a
                href="https://www.instagram.com/datasportt?igsh=dHc0dWc1Y3AxZWYz"
                target="_blank"
              >
                @datasportt
              </a>
            </li>
            <li className="flex gap-2 items-center">
              <FaFacebook />
              <a
                href="https://www.facebook.com/share/dSHWonmqRNWZkfLi/?mibextid=qi2Omg"
                target="_blank"
              >
                datasport_quindio
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-[94%] text-center h-[2px] bg-white  mx-[3rem] "></div>
      <div className=" flex justify-between items-center text-[1rem] text-white mx-[12rem] my-[2rem]">
        <ul>
          <li>DATASPORT</li>
          <li>©copyright</li>
        </ul>
        <div className="w-[5rem] h-[5rem] bg-white rounded-full">
          <img className="size-[6rem]" src={logo} alt="" />
        </div>
      </div>
    </div>
  );
};