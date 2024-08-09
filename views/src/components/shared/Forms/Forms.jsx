import React, { useContext, useRef, useState } from 'react'
import axios from '../../../../axiosConfig';
import { InputFormsreg, InputFormslog, Inputrecuerdame, Inputolvi, InputFormsUsers, InputFormsEmployees, InputFormslog2, Perfilcontenedor, InputFormsAdmin } from '../InputForms/InputForms';
import { Buttonlog, Buttonreg, ButtonUsers, ButtonEmployees, Buttonlog2, Buttonfilter, ButtonAdmin } from '../Button/Buttons';
import { FaUserCircle } from "react-icons/fa";
import { useLocation } from 'wouter'
import { StateContext } from '../../Context/Context';
import { toast, ToastContainer } from "react-toastify";
import { IoMdArrowRoundBack } from "react-icons/io";

export const FormsAdmin = ({ }) => {
  const { setCreateAdmin } = useContext(StateContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [location, setLocation] = useLocation();
  const inputIdRef = useRef()
  const inputNameRef = useRef()
  const inputEmailRef = useRef()
  const inputPhoneRef = useRef()
  const inputAddressRef = useRef()
  const inputPasswordRef = useRef()
  const inputIdCenterRef = useRef()


  const toggleCreateAdmin = async () => {

    if (isSubmitting) return; // Evita envíos duplicados

    setIsSubmitting(true);

    const adminData = {
      id: inputIdRef.current.value,
      name: inputNameRef.current.value,
      email: inputEmailRef.current.value,
      phone: inputPhoneRef.current.value,
      address: inputAddressRef.current.value,
      password: inputPasswordRef.current.value,
      role: "admin",
      idCenter: inputIdCenterRef.current.value,
    };

    try {
      const response = await axios.post('/administrator/register', adminData);
      
      if (response.status === 200 || response.status === 201) {
        setCreateAdmin(true);
      } else {
        toast.error(error.response.data.error, {
          progressStyle: {
            backgroundColor: '#692FDB', // Color de la barra de carga
          },
        });
      }
    } catch (error) {
      toast.error(error.response.data.error, {
        progressStyle: {
          backgroundColor: '#692FDB', // Color de la barra de carga
        },
      });
    }finally {
      setIsSubmitting(false);
    }

  };

  return (
    <>
    <form className='absolute w-[600px] flex flex-col justify-center top-[10%] right-[30%] gap-[60px] items-center '>
    <div onClick= {() => setLocation("/registeredlist")} >
<IoMdArrowRoundBack className='cursor-pointer text-[40px] text-[#1E1E1E] fixed left-[15rem] top-[6rem]' />
</div>
      <div className='flex flex-col items-center gap-[20px] '>
        <h2 className='text-[#381975] font-medium text-[46px] '>Inscripción Administrador</h2>
      </div>
      <div className='flex flex-col items-center gap-[40px]'>
        <label className='flex flex-wrap justify-between gap-y-[20px] '>
          <InputFormsAdmin type={'text'} placeholder='Pon tu Cedula' userRef={inputIdRef} />
          <InputFormsAdmin type={'text'} placeholder='Pon tu Nombre' userRef={inputNameRef} />
          <InputFormsAdmin type={'email'} placeholder='Pon tu Correo'userRef={inputEmailRef} />
          <InputFormsAdmin type={'text'} placeholder='Pon tu Telefono'userRef={inputPhoneRef} />
          <InputFormsAdmin type={'text'} placeholder='Pon tu Direccion'userRef={inputAddressRef} />
          <InputFormsAdmin type={'password'} placeholder='Pon tu Contraseña'userRef={inputPasswordRef} />
          <InputFormsAdmin type={'text'} placeholder='Pon tu Numero de Centro'userRef={inputIdCenterRef} />
        </label>
        <ButtonAdmin Text={'Crear Empleado'} onClick={toggleCreateAdmin} />
      </div>
    </form>
    <ToastContainer position="top-center" autoClose={1500} pauseOnHover={false}  />
    </>
  )
}

export const FormsEmployees = ({ }) => {
  const { setCreateEmpleyees } = useContext(StateContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [location, setLocation] = useLocation();
  const inputIdRef = useRef()
  const inputNameRef = useRef()
  const inputEmailRef = useRef()
  const inputPhoneRef = useRef()
  const inputAddressRef = useRef()
  const inputPasswordRef = useRef()
  const inputIdCenterRef = useRef()


  const toggleCreateEmployees = async () => {

    if (isSubmitting) return; // Evita envíos duplicados

    setIsSubmitting(true);

    const employeesData = {
      id: inputIdRef.current.value,
      name: inputNameRef.current.value,
      email: inputEmailRef.current.value,
      phone: inputPhoneRef.current.value,
      address: inputAddressRef.current.value,
      password: inputPasswordRef.current.value,
      role: "employee",
      idCenter: inputIdCenterRef.current.value,
    };

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/employees/register', employeesData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
      
      
      if (response.status === 200 || response.status === 201) {
        setCreateEmpleyees(true);
      } else {
        toast.error(error.response.data.error, {
          progressStyle: {
            backgroundColor: '#692FDB', // Color de la barra de carga
          },
        });
      }
    } catch (error) {
      toast.error(error.response.data.error, {
        progressStyle: {
          backgroundColor: '#692FDB', // Color de la barra de carga
        },
      });
    }finally {
      setIsSubmitting(false);
    }

  };

  return (
    <>
    <form className='absolute w-[600px] flex flex-col justify-center top-[10%] right-[30%] gap-[60px] items-center '>
    <div onClick= {() => setLocation("/registeredlist")} >
<IoMdArrowRoundBack className='cursor-pointer text-[40px] text-[#1E1E1E] fixed left-[15rem] top-[6rem]' />
</div>
      <div className='flex flex-col items-center gap-[20px] '>
        <h2 className='text-[#381975] font-medium text-[56px] '>Inscripción Empleado</h2>
      </div>
      <div className='flex flex-col items-center gap-[40px]'>
        <label className='flex flex-wrap justify-between gap-y-[20px] '>
          <InputFormsEmployees type={'text'} placeholder='Pon tu Cedula' userRef={inputIdRef} />
          <InputFormsEmployees type={'text'} placeholder='Pon tu Nombre' userRef={inputNameRef} />
          <InputFormsEmployees type={'email'} placeholder='Pon tu Correo'userRef={inputEmailRef} />
          <InputFormsEmployees type={'text'} placeholder='Pon tu Telefono'userRef={inputPhoneRef} />
          <InputFormsEmployees type={'text'} placeholder='Pon tu Direccion'userRef={inputAddressRef} />
          <InputFormsEmployees type={'password'} placeholder='Pon tu Contraseña'userRef={inputPasswordRef} />
          <InputFormsEmployees type={'text'} placeholder='Pon tu Numero de Centro'userRef={inputIdCenterRef} />
        </label>
        <ButtonEmployees Text={'Crear Empleado'} onClick={toggleCreateEmployees} />
      </div>
    </form>
    <ToastContainer position="top-center" autoClose={1500} pauseOnHover={false}  />
    </>
  )
}

export const FormsUsers = ({ }) => {
  const { setCreateUser } = useContext(StateContext);
  const [location, setLocation] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputIdRef = useRef()
  const inputNameRef = useRef()
  const inputLastNameRef = useRef()
  const inputEmailRef = useRef()
  const inputPhoneRef = useRef()
  const inputAddressRef = useRef()
  const inputAsistanceRef = useRef()  
  const inputIdCenterRef = useRef()

  const toggleCreateUser = async () => {

    if (isSubmitting) return; // Evita envíos duplicados

    setIsSubmitting(true);

    const userData = {
      id: inputIdRef.current.value,
      name: inputNameRef.current.value,
      lastName: inputLastNameRef.current.value,
      email: inputEmailRef.current.value,
      phone: inputPhoneRef.current.value,
      address: inputAddressRef.current.value,
      assistance: inputAsistanceRef.current.value,
      state: 'Activo',
      idCenter: inputIdCenterRef.current.value,
    };

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/clients/register', userData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
      
      if (response.status === 200 || response.status === 201) {
        // const data = await response.json();
        // console.log('User registered:', data);
        setCreateUser(true);
      } else {
        toast.error(error.response.data.error, {
          progressStyle: {
            backgroundColor: '#692FDB', // Color de la barra de carga
          },
        });
      }
    } catch (error) {
      toast.error(error.response.data.error, {
        progressStyle: {
          backgroundColor: '#692FDB', // Color de la barra de carga
        },
      });
    }finally {
      setIsSubmitting(false);
    }

  };

  return (
    <>
    <form className='absolute w-[600px] flex flex-col justify-center top-[10%] right-[30%] gap-[60px] items-center '>
    <div onClick= {() => setLocation("/registeredlist")} >
<IoMdArrowRoundBack className='cursor-pointer text-[40px] text-[#1E1E1E] fixed left-[15rem] top-[6rem]' />
</div>
      <div className='flex flex-col items-center gap-[20px] '>
        <h2 className='text-[#381975] font-medium text-[56px] '>Inscripción Cliente</h2>
      </div>
      <div className='flex flex-col items-center gap-[40px]'>
        <label className='flex flex-wrap justify-between gap-y-[20px] '>
          <InputFormsUsers type={'text'} placeholder='Pon tu Cedula' userRef={inputIdRef} />
          <InputFormsUsers type={'text'} placeholder='Pon tu Nombre' userRef={inputNameRef} />
          <InputFormsUsers type={'text'} placeholder='Pon tu Apellido'userRef={inputLastNameRef} />
          <InputFormsUsers type={'email'} placeholder='Pon tu Correo'userRef={inputEmailRef} />
          <InputFormsUsers type={'text'} placeholder='Pon tu Telefono'userRef={inputPhoneRef} />
          <InputFormsUsers type={'text'} placeholder='Pon tu Direccion'userRef={inputAddressRef} />
          <InputFormsUsers type={'text'} placeholder='Pon tu Asistencia'userRef={inputAsistanceRef} />
          <InputFormsUsers type={'text'} placeholder='Pon tu Numero de Centro'userRef={inputIdCenterRef} />
        </label>
        <ButtonUsers Text={'Crear Usuario'} onClick={toggleCreateUser} />
      </div>
    </form>
    <ToastContainer position="top-center" autoClose={1500} pauseOnHover={false}  />
    </>
  )
}

export const FormsTwoVerific = () => {
  const inputPasswordRef = useRef()
  const [location, setLocation] = useLocation();

  const toggleTwoVerific = async () => {
      const code = inputPasswordRef.current.value

      const token = localStorage.getItem('token');
      if (token && code) {
        try {
            const response = await axios.post(
                '/twoverific/verifycode',
                { code },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            // alert("Codigo correcto se logeo con exito")
            toast.success(response.data.message, {
              progressStyle: {
                backgroundColor: '#692FDB', // Color de la barra de carga
              },
            });
            // console.log(token);
            // const data = await response.json();
            // console.log('User registered:', data);
            setTimeout(() => {
              // Redirigir a /twoverific
              setLocation("/");
            }, 2000);
            // Redirige al usuario o realiza otra acción según sea necesario
        } catch (error) {
            // alert('Error verifying code');
            toast.error(error.response.data.error, {
              progressStyle: {
                backgroundColor: '#692FDB', // Color de la barra de carga
              },
            });
        }
    } else {
      toast.error("Codigo requerido", {
        progressStyle: {
          backgroundColor: '#692FDB', // Color de la barra de carga
        },
      });
        // alert('Token and code are required');
    }
  };

  return (
    <>
    <form className="absolute w-[600px] flex flex-col top-[100px] left-[450px] gap-[40px] items-center ">
      <div className="flex flex-col items-center gap-[20px] ">
        <h2 className="text-[#FE7A36] font-medium text-[50px] ">Verificacion dos pasos</h2>
        <FaUserCircle className="text-[70px] text-[#FE7A36] " />
      </div>
      <div className="flex flex-col items-center gap-[8px]">
        <label className="flex flex-col items-center justify-center gap-y-[20px] ">
          <InputFormslog type={'text'} placeholder="Pon tú Codigo..." userRef={inputPasswordRef} />
        </label>
        <div className="w-full px-2 flex flex-col gap-0 items-start">
          <Inputolvi
            placeholder="¿Estas registrado en la app?"
            textsize={"10px"}  
          />
        </div>
        <div >
        <Buttonlog Text={"Enviar"} onClick={toggleTwoVerific} />
        </div>
      </div>
    </form>
    <ToastContainer position="top-center" autoClose={1000} pauseOnHover={false}  />
    </>
  );
};

export const Formslogempleado = () => {
  const [location, setLocation] = useLocation();
  const { setLoginEmpleyees } = useContext(StateContext);
  const inputEmailRef = useRef()
  const inputPasswordRef = useRef()
  

  const toggleLoginEmployee = async () => {

    // toast.error('Pagina Inhabilitada', {
    //   progressStyle: {
    //     backgroundColor: '#692FDB', // Color de la barra de carga
    //   },
    // });

    const employeeData = {
      email: inputEmailRef.current.value,
      password: inputPasswordRef.current.value,
    };

    try {
      const response = await axios.post('/employees/login', employeeData);

      if (response.status === 200 || response.status === 201) {
        const token = response.data.token;
        const role = response.data.role;
        
        // Almacenar el token en localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        
        await sendVerificationCode(token);
        toast.success("Redireccion en curso", {
          progressStyle: {
            backgroundColor: '#692FDB', // Color de la barra de carga
          },
        });
        // console.log(token);
        // const data = await response.json();
        // console.log('User registered:', data);
        setTimeout(() => {
          // Redirigir a /twoverific
          setLocation("/twoverific");
        }, 2000);
      } else {
        // console.log(response.data);
        toast.error(error.response.data.error, {
          progressStyle: {
            backgroundColor: '#692FDB', // Color de la barra de carga
          },
        });
      }
    } catch (error) {
      toast.error(error.response.data.error, {
        progressStyle: {
          backgroundColor: '#692FDB', // Color de la barra de carga
        },
      });
    }

  };

  const sendVerificationCode = async (token) => {
    try {
      // console.log("Sending token:", token);
        const response = await axios.post(
            '/vr/veriftokenandsendcode',
            {}, // Cuerpo vacío para esta solicitud
            { headers: { Authorization: `Bearer ${token}` } }
        );
        // console.log(response.data); // 'Verification code sent'
        toast.success(response.data.message, {
          progressStyle: {
            backgroundColor: '#692FDB', // Color de la barra de carga
          },
        });
    } catch (error) {
        toast.error(error.response.data.error, {
          progressStyle: {
            backgroundColor: '#692FDB', // Color de la barra de carga
          },
        });
    }
};

  return (
    <>
    <form className="absolute w-[600px] flex flex-col top-[100px] left-[450px] gap-[40px] items-center ">
      <div className="flex flex-col items-center gap-[20px] ">
        <h2 className="text-[#FE7A36] font-medium text-[50px] ">Login</h2>
        <FaUserCircle className="text-[70px] text-[#FE7A36] " />
      </div>
      <div className="flex flex-col items-center gap-[8px]">
        <label className="flex flex-col items-center justify-center gap-y-[20px] ">
          <InputFormslog type={'text'} placeholder="Pon tú Email..." userRef={inputEmailRef} />
          <InputFormslog type={'password'} placeholder="Pon tú Contraseña..." userRef={inputPasswordRef} />
        </label>
        {/* <div className="w-full px-2 flex flex-col gap-0 items-start">
          <Inputolvi
            onClick={() => setLocation("/register")}
            placeholder="¿No estas registrado en la app?"
            textsize={"10px"}
          />
          <Inputrecuerdame placeholder="recuerdame" />
        </div> */}
        <div >
        <Buttonlog Text={"Iniciar"} onClick={toggleLoginEmployee} />
        </div>
      </div>
    </form>
    <ToastContainer position="top-center" autoClose={1000} pauseOnHover={false}  />
    </>
  );
};

export const Formsreg = ({ }) => {
  return (
    <form className='absolute w-[600px] flex flex-col top-[50px] right-[190px] gap-[60px] items-center '>
      <div className='flex flex-col items-center gap-[20px] '>
        <h2 className='text-[#692FDB] font-medium text-[62px] '>Registrate</h2>
        <FaUserCircle className='text-[80px] text-[#692FDB] ' />
      </div>
      <div className='flex flex-col items-center gap-[40px]'>
        <label className='flex flex-wrap justify-between gap-y-[20px] '>
          <InputFormsreg placeholder='Pon tu correo' />
          <InputFormsreg placeholder='Pon tu numero' />
          <InputFormsreg placeholder='Pon tu local' />
          <InputFormsreg placeholder='Pon tu direccion' />
          <InputFormsreg placeholder='Pon tu deporte' />
          <InputFormsreg placeholder='Pon tu ciudad' />
        </label>
        <Buttonreg Text={'Contactanos'} />
      </div>
    </form>
  )
}

export const Formslog = () => {
  return (
    <form className='absolute w-[600px] flex flex-col top-[50px] left-[450px] gap-[60px] items-center '>
      <div className='flex flex-col items-center gap-[20px] '>
        <h2 className='text-[#FE7A36] font-medium text-[62px] '>Login</h2>
        <FaUserCircle className='text-[80px] text-[#FE7A36] ' />
      </div>
      <div className='flex flex-col items-center gap-[40px]'>
        <label className='flex flex-col justify-center gap-y-[20px] '>
          <InputFormslog placeholder='Pon tú ID' />
          <InputFormslog placeholder='Pon tú codigo' />
          <div className='w-[360px] flex justify-between'>
            <Inputrecuerdame placeholder='recuerdame' />
            <Inputolvi placeholder='¿Olvidaste tu contraseña?' />
          </div>
        </label>
        <Buttonlog Text={'Iniciar'} />
      </div>
    </form>
  )
}

export const Formslogadmin = () => {
  const [location, setLocation] = useLocation();
  const { setLoginAdmin } = useContext(StateContext);
  const inputEmailRef = useRef()
  const inputPasswordRef = useRef()
  

  const toggleLoginAdmin = async () => {

    const adminData = {
      email: inputEmailRef.current.value,
      password: inputPasswordRef.current.value,
    };

    try {
      const response = await axios.post('/administrator/login', adminData);

      if (response.status === 200 || response.status === 201) {
        const token = response.data.token;
        const role = response.data.role;
        
        
        // Almacenar el token en localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        
        await sendVerificationCode(token);
        toast.success("Redireccion en curso", {
          progressStyle: {
            backgroundColor: '#692FDB', // Color de la barra de carga
          },
        });
        // console.log(token);
        // const data = await response.json();
        // console.log('User registered:', data);
        setTimeout(() => {
          // Redirigir a /twoverific
          setLocation("/twoverific");
        }, 2000);
      } else {
        // console.log(response.data);
        toast.error(error.response.data.error, {
          progressStyle: {
            backgroundColor: '#692FDB', // Color de la barra de carga
          },
        });
      }
    } catch (error) {
      toast.error(error.response.data.error, {
        progressStyle: {
          backgroundColor: '#692FDB', // Color de la barra de carga
        },
      });
    }

  };

  const sendVerificationCode = async (token) => {
    try {
      // console.log("Sending token:", token);
        const response = await axios.post(
            '/vr/veriftokenandsendcode',
            {}, // Cuerpo vacío para esta solicitud
            { headers: { Authorization: `Bearer ${token}` } }
        );
        // console.log(response.data); // 'Verification code sent'
        toast.success(response.data.message, {
          progressStyle: {
            backgroundColor: '#692FDB', // Color de la barra de carga
          },
        });
    } catch (error) {
        toast.error(error.response.data.error, {
          progressStyle: {
            backgroundColor: '#692FDB', // Color de la barra de carga
          },
        });
    }
};
  return (
    <>
    <form className="absolute w-[600px] flex flex-col top-[100px] left-[450px] gap-[40px] items-center ">
      <div className="flex flex-col items-center gap-[20px] ">
        <h2 className="text-[#692FDB] font-medium text-[50px] ">Login</h2>
        <FaUserCircle className="text-[70px] text-[#692FDB] " />
      </div>
      <div className="flex flex-col items-center gap-[8px]">
        <label className="flex flex-col items-center justify-center gap-y-[20px] ">
          <InputFormslog2 type={'text'} placeholder="Pon tú Correo..." userRef={inputEmailRef} />
          <InputFormslog2 type={'password'} placeholder="Pon tú contraseña..." userRef={inputPasswordRef} />
        </label>
        <div className="w-full px-2 flex flex-col gap-0 items-start">
          {/* <Inputolvi
            onClick={() => setLocation("/register")}
            placeholder="¿No estas registrado en la app?"
            textsize={"10px"}
            
          />
          <Inputrecuerdame placeholder="recuerdame" /> */}

        </div>
        <Buttonlog2 Text={"Iniciar"} onClick={toggleLoginAdmin} />
      </div>
    </form>
    <ToastContainer position="top-center" autoClose={1000} pauseOnHover={false}  />
    </>
  );
};

