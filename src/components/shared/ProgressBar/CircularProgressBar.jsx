import React, {useState, useContext} from 'react';
import img from '../../../assets/logodataspor.png'
import { StateContext } from '../../Context/Context';


const CircularProgressBar = ({ validator, progress, size = 100 }) => {
    
    const strokeWidth = 10;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (progress / 100) * circumference;



    return (
        <div className={`${validator ? 'absolute top-[25%] flex items-center justify-center animate-fade-up animate-fill-forwards' : 'hidden'}`} style={{ width: size, height: size }}>
            <svg
                className="rotate-[-90deg] absolute"
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="#692FDBE5"  // Color del fondo de la barra de progreso
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="#FF9F2E"  // Color de la barra de progreso
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                />
            </svg>
            <div className="absolute flex justify-center w-full h-full text-center">
                <span className="absolute bottom-8 text-xl font-semibold text-gray-800">{progress}%</span>
            </div>
            <div className="absolute flex justify-center w-full h-full text-center">
                <img className="absolute top-7 w-[160px] h-[160px] " src={img} alt="" />
            </div>
        </div>
    );
};

export default CircularProgressBar;
