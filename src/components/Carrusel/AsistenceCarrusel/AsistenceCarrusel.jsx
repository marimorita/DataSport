import React from 'react'
import vector1 from '../../../assets/Fitness.png'
import vector2 from '../../../assets/Fitness2.png'
import vector3 from '../../../assets/Running.png'
import vector4 from '../../../assets/Yoga1.png'
import vector5 from '../../../assets/Exercise.png'
import vector6 from '../../../assets/Biker.png'

const ImageTextLayout = ({ image, text }) => (
  <div className="flex items-center">
    <img src={image} alt="Vector" className="w-[200px] h-[200px] object-contain p-2" />
    <p className="ml-4 text-center flex-1 p-4">{text}</p>
  </div>
)

export const AsistenceVector1 = () => {
  return (
    <ImageTextLayout 
      image={vector1}
      text="El ejercicio regular mejora la salud cardiovascular, fortalece los músculos y huesos, y aumenta la energía diaria. Además, libera endorfinas que mejoran el estado de ánimo y reducen el estrés."
    />
  )
}

export const AsistenceVector2 = () => {
  return (
    <ImageTextLayout 
      image={vector2}
      text="La práctica constante de fitness no solo mejora la condición física, sino que también aumenta la autoestima, promueve una mejor postura y puede ayudar a prevenir enfermedades crónicas como la diabetes tipo 2 y la hipertensión."
    />
  )
}

export const AsistenceVector3 = () => {
  return (
    <ImageTextLayout 
      image={vector3}
      text="Correr regularmente fortalece el corazón, mejora la capacidad pulmonar y ayuda a mantener un peso saludable. También es excelente para la salud mental, reduciendo los síntomas de depresión y ansiedad."
    />
  )
}

export const AsistenceVector4 = () => {
  return (
    <ImageTextLayout 
      image={vector4}
      text="La práctica del yoga mejora la flexibilidad, el equilibrio y la fuerza. También promueve la relajación, reduce el estrés y puede ayudar a aliviar dolores crónicos. Además, fomenta la conciencia corporal y la conexión mente-cuerpo."
    />
  )
}

export const AsistenceVector5 = () => {
  return (
    <ImageTextLayout 
      image={vector5}
      text="El ejercicio regular no solo mejora la salud física, sino que también potencia las funciones cognitivas. Aumenta la concentración, mejora la memoria y puede incluso estimular el crecimiento de nuevas células cerebrales."
    />
  )
}

export const AsistenceVector6 = () => {
  return (
    <ImageTextLayout 
      image={vector6}
      text="El ciclismo es un excelente ejercicio de bajo impacto que fortalece las piernas y mejora la resistencia cardiovascular. También es una forma ecológica de transporte que puede reducir el estrés relacionado con el tráfico y mejorar la movilidad urbana."
    />
  )
}