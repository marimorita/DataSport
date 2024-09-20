import React, { useContext, useRef, useState, useEffect } from "react";
import { axiosInstance } from "../../../../axiosConfig";
import {
  InputFormsreg,
  InputFormslog,
  Inputrecuerdame,
  Inputolvi,
  InputFormsUsers,
  InputFormsEmployees,
  InputFormslog2,
  Perfilcontenedor,
  InputFormsAdmin,
  CustomInput,
  CustomInputregister,
} from "../InputForms/InputForms";
import {
  Buttonlog,
  Buttonreg,
  ButtonUsers,
  ButtonEmployees,
  Buttonlog2,
  Buttonfilter,
  ButtonAdmin,
  ButtomHome,
} from "../Button/Buttons";
import { FaUserCircle } from "react-icons/fa";
import { useLocation } from "wouter";
import { StateContext } from "../../Context/Context";
import { toast, ToastContainer } from "react-toastify";
import { IoMdArrowRoundBack } from "react-icons/io";
import CircularProgressBar from "../ProgressBar/CircularProgressBar";

export const FormsAdmin = ({}) => {
  const { setCreateAdmin } = useContext(StateContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [location, setLocation] = useLocation();
  const inputIdRef = useRef();
  const inputNameRef = useRef();
  const inputLastNameRef = useRef();
  const inputEmailRef = useRef();
  const inputPhoneRef = useRef();
  const inputAddressRef = useRef();
  const inputPasswordRef = useRef();
  const inputIdCenterRef = useRef();

  const toggleCreateAdmin = async () => {
    if (isSubmitting) return; // Evita envíos duplicados

    setIsSubmitting(true);

    const adminData = {
      id: inputIdRef.current?.value || '',
      name: inputNameRef.current?.value || '',
      lastName: inputLastNameRef.current?.value || '',
      email: inputEmailRef.current?.value || '',
      phone: inputPhoneRef.current?.value || '',
      address: inputAddressRef.current?.value || '',
      password: inputPasswordRef.current?.value || '',
      img: '',
      role: 'admin',
      idCenter: inputIdCenterRef.current?.value || '',
    };

    try {
      const response = await axiosInstance.post(
        "/administrator/register",
        adminData
      );

      if (response.status === 200 || response.status === 201) {
        setCreateAdmin(true);
      } else {
        toast.error(error.response.data.error, {
          progressStyle: {
            backgroundColor: "#692FDB", // Color de la barra de carga
          },
        });
      }
    } catch (error) {
      toast.error(error.response.data.error, {
        progressStyle: {
          backgroundColor: "#692FDB", // Color de la barra de carga
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form className="absolute w-[600px] flex flex-col justify-center top-[10%] right-[30%] gap-[60px] items-center ">
        <div onClick={() => setLocation("/")}>
          <IoMdArrowRoundBack className="cursor-pointer text-[40px] text-[#1E1E1E] fixed left-[15rem] top-[6rem]" />
        </div>
        <div className="flex flex-col items-center gap-[20px] ">
        <h2 className='text-[#1e1e1e] font-medium text-[46px] '>Inscripción Administrador</h2>
        </div>
        <div className='flex flex-col items-center gap-[40px]'>
          <label className='flex flex-wrap justify-between gap-y-[20px] '>
            <CustomInputregister label={'Cedula'} userRef={inputIdRef} color={'#1e1e1e'}/>
            <CustomInputregister label={'Nombre'} userRef={inputNameRef} color={'#1e1e1e'}/>
            <CustomInputregister label={'Apellido'} userRef={inputLastNameRef} color={'#1e1e1e'}/>
            <CustomInputregister type={'email'}  label={'Correo'} userRef={inputEmailRef} color={'#1e1e1e'}/>
            <CustomInputregister label={'Numero'} userRef={inputPhoneRef} color={'#1e1e1e'}/>
            <CustomInputregister label={'Direccion'} userRef={inputAddressRef} color={'#1e1e1e'}/>
            <CustomInputregister type={'password'}  label={'Contraseña'} userRef={inputPasswordRef} color={'#1e1e1e'}/>
            <CustomInputregister label={'N° Estab'} userRef={inputIdCenterRef} color={'#1e1e1e'}/>
          </label>
          <ButtonUsers width='' Text={'Crear Admin'} onClick={toggleCreateAdmin} />
        </div>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        pauseOnHover={false}
      />
    </>
  );
};

export const FormsEmployees = ({ Location }) => {
  const { setCreateEmpleyees } = useContext(StateContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [location, setLocation] = useLocation();
  const inputIdRef = useRef();
  const inputNameRef = useRef();
  const inputLastNameRef = useRef();
  const inputEmailRef = useRef();
  const inputPhoneRef = useRef();
  const inputAddressRef = useRef();
  const inputPasswordRef = useRef();
  const inputIdCenterRef = useRef();

  const toggleCreateEmployees = async () => {
    if (isSubmitting) return; // Evita envíos duplicados

    setIsSubmitting(true);

    const employeesData = {
      id: inputIdRef.current.value,
      name: inputNameRef.current.value,
      lastName: inputLastNameRef.current.value,
      email: inputEmailRef.current.value,
      phone: inputPhoneRef.current.value,
      address: inputAddressRef.current.value,
      password: inputPasswordRef.current.value,
      img: "",
      role: "employee",
      idCenter: inputIdCenterRef.current.value,
      state: "Activo",
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.post(
        "/employees/register",
        employeesData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setCreateEmpleyees(true);
      } else {
        toast.error(error.response.data.error, {
          progressStyle: {
            backgroundColor: "#692FDB", // Color de la barra de carga
          },
        });
      }
    } catch (error) {
      toast.error(error.response.data.error, {
        progressStyle: {
          backgroundColor: "#692FDB", // Color de la barra de carga
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="fixed" onClick={() => setLocation(Location)}>
        <ButtomHome
          customClassName={
            "cursor-pointer text-[40px] text-[#1E1E1E] fixed right-[38rem] top-[0rem]"
          }
        />
      </div>
      <form className="w-[560px] flex flex-col gap-[60px] items-center ">
        <div className="flex flex-col items-center gap-[20px] ">
          <h2 className="text-[#1E1E1E] font-medium text-[56px] ">
            Inscripción Empleado
          </h2>
        </div>
        <div className="flex flex-col items-center gap-[40px]">
          <label className="flex flex-wrap justify-center  gap-y-[20px] gap-x-[15px] ">
            <CustomInputregister
              label="Cedula"
              inputRef={inputIdRef}
              color="#1e1e1e"
            />
            <CustomInputregister
              label="Nombre"
              inputRef={inputNameRef}
              color="#1e1e1e"
            />
            <CustomInputregister
              label="Apellido"
              inputRef={inputLastNameRef}
              color="#1e1e1e"
            />
            <CustomInputregister
              label="Correo"
              inputRef={inputEmailRef}
              color="#1e1e1e"
            />
            <CustomInputregister
              label="Numero"
              inputRef={inputPhoneRef}
              color="#1e1e1e"
            />
            <CustomInputregister
              label="Direccion"
              inputRef={inputAddressRef}
              color="#1e1e1e"
            />
            <CustomInputregister
              label="Contraseña"
              inputRef={inputPasswordRef}
              color="#1e1e1e"
            />
            <CustomInputregister
              label="N° estab"
              inputRef={inputIdCenterRef}
              color="#1e1e1e"
            />
          </label>
          <ButtonUsers
            width=""
            Text={"Crear Empleado"}
            onClick={toggleCreateEmployees}
          />
        </div>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        pauseOnHover={false}
      />
    </>
  );
};

export const FormsUsers = ({ Location }) => {
  const { setCreateUser } = useContext(StateContext);
  const [location, setLocation] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputIdRef = useRef();
  const inputNameRef = useRef();
  const inputLastNameRef = useRef();
  const inputEmailRef = useRef();
  const inputPhoneRef = useRef();
  const inputAddressRef = useRef();
  // const inputAsistanceRef = useRef()
  const inputIdCenterRef = useRef();

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
      // assistance: "Hoy",
      idCenter: inputIdCenterRef.current.value,
      state: "Activo",
      img: "",
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.post("/clients/register", userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200 || response.status === 201) {
        // const data = await response.json();
        // console.log('User registered:', data);
        setCreateUser(true);
      } else {
        toast.error(error.response.data.error, {
          progressStyle: {
            backgroundColor: "#692FDB", // Color de la barra de carga
          },
        });
      }

      inputIdRef.current.value = "";
      inputNameRef.current.value = "";
      inputLastNameRef.current.value = "";
      inputEmailRef.current.value = "";
      inputPhoneRef.current.value = "";
      inputAddressRef.current.value = "";
      inputIdCenterRef.current.value = "";
    } catch (error) {
      toast.error(error.response.data.error, {
        progressStyle: {
          backgroundColor: "#692FDB", // Color de la barra de carga
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="fixed" onClick={() => setLocation(Location)}>
        <ButtomHome
          customClassName={
            "cursor-pointer text-[40px] text-[#1E1E1E] fixed right-[38rem] top-[0rem]"
          }
        />
      </div>
      <form className="w-[560px] flex flex-col gap-[60px] items-center ">
        <div className="flex flex-col items-center gap-[20px] ">
          <h2 className="text-[#1E1E1E] font-medium text-[56px] ">
            Inscripción Cliente
          </h2>
        </div>
        <div className="flex flex-col items-center gap-[40px]">
          <label className="flex flex-wrap justify-center  gap-y-[20px] gap-x-[10px] ">
            <CustomInputregister
              label="Cedula"
              inputRef={inputIdRef}
              color="#1e1e1e"
            />
            <CustomInputregister
              label="Nombre"
              inputRef={inputNameRef}
              color="#1e1e1e"
            />
            <CustomInputregister
              label="Apellido"
              inputRef={inputLastNameRef}
              color="#1e1e1e"
            />
            <CustomInputregister
              label="Correo"
              inputRef={inputEmailRef}
              color="#1e1e1e"
            />
            <CustomInputregister
              label="Numero"
              inputRef={inputPhoneRef}
              color="#1e1e1e"
            />
            <CustomInputregister
              label="Direccion"
              inputRef={inputAddressRef}
              color="#1e1e1e"
            />
            <CustomInputregister
              label="N° Estab"
              inputRef={inputIdCenterRef}
              color="#1e1e1e"
            />
          </label>
          <ButtonUsers
            width=""
            Text={"Crear Usuario"}
            onClick={toggleCreateUser}
          />
        </div>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        pauseOnHover={false}
      />
    </>
  );
};

export const FormsTwoVerificAdmin = () => {
  const inputPasswordRef = useRef();
  const [location, setLocation] = useLocation();
  const [routeAdmin, setRouteAdmin] = useState("");

  useEffect(() => {
    // Obtén el valor de routeE de localStorage al cargar el componente
    const storedRoute = localStorage.getItem("routeA");
    if (storedRoute) {
      setRouteAdmin(storedRoute);
    }
  }, [routeAdmin]);

  const toggleTwoVerific = async () => {
    const code = inputPasswordRef.current.value;

    const token = localStorage.getItem("token");
    if (token && code) {
      try {
        const response = await axiosInstance.post(
          "/twoverific/verifycode",
          { code },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        // alert("Codigo correcto se logeo con exito")
        toast.success(response.data.message, {
          progressStyle: {
            backgroundColor: "#692FDB", // Color de la barra de carga
          },
        });
        // console.log(token);
        // const data = await response.json();
        // console.log('User registered:', data);
        setTimeout(() => {
          // Redirigir a /twoverific
          setLocation(`/HJQL9823/${routeAdmin}/home`);
        }, 2000);
        // Redirige al usuario o realiza otra acción según sea necesario
      } catch (error) {
        // alert('Error verifying code');
        toast.error(error.response.data.error, {
          progressStyle: {
            backgroundColor: "#692FDB", // Color de la barra de carga
          },
        });
      }
    } else {
      toast.error("Codigo requerido", {
        progressStyle: {
          backgroundColor: "#692FDB", // Color de la barra de carga
        },
      });
      // alert('Token and code are required');
    }
  };

  return (
    <>
      <form className="absolute w-[600px] flex flex-col top-[100px] left-[450px] gap-[40px] items-center ">
        <div className="flex flex-col items-center gap-[20px] ">
          <h2 className="text-[#1e1e1e] font-medium text-[50px] ">
            Verificacion dos pasos
          </h2>
          <FaUserCircle className="text-[70px] text-[#1e1e1e] " />
        </div>
        <div className="flex flex-col items-center gap-[20px]">
          <label className="flex flex-col items-center justify-center gap-y-[20px] ">
          <CustomInput
              color="#1e1e1e"
              label="Pon tú Código"
              inputRef={inputPasswordRef} // Asegúrate de usar inputRef
            />
          </label>
            <div>
            <ButtonUsers width="" Text={"Enviar"} onClick={toggleTwoVerific} />
          </div>
        </div>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        pauseOnHover={false}
      />
    </>
  );
};

export const FormsTwoVerificEmployee = () => {
  const inputPasswordRef = useRef();
  const [location, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);

  const toggleTwoVerific = async () => {
    const code = inputPasswordRef.current.value;
    const token = localStorage.getItem("token");
    const routeEmployee = localStorage.getItem("routeE");

    if (token && code) {
      setLoading(true);
      try {
        const response = await axiosInstance.post(
          "/twoverific/verifycode",
          { code },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("llego", routeEmployee);

        // alert("Codigo correcto se logeo con exito")
        toast.success(response.data.message, {
          progressStyle: {
            backgroundColor: "#692FDB", // Color de la barra de carga
          },
        });
        // console.log(token);
        // const data = await response.json();
        // console.log('User registered:', data);
        setTimeout(() => {
          // Redirigir a /twoverific
          setLocation(`/KQWJ7482/${routeEmployee}/home`);
        }, 2000);
        // Redirige al usuario o realiza otra acción según sea necesario
      } catch (error) {
        // alert('Error verifying code');
        toast.error(error.response.data.error, {
          progressStyle: {
            backgroundColor: "#692FDB", // Color de la barra de carga
          },
        });
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Codigo requerido", {
        progressStyle: {
          backgroundColor: "#692FDB", // Color de la barra de carga
        },
      });
      // alert('Token and code are required');
    }
  };

  return (
    <>
      <form className="absolute w-[600px] flex flex-col top-[100px] left-[450px] gap-[40px] items-center ">
        <div className="flex flex-col items-center gap-[20px] ">
          <h2 className="text-[#1e1e1e] font-medium text-[50px] ">
            Verificacion dos pasos
          </h2>
          <FaUserCircle className="text-[70px] text-[#1e1e1e] " />
        </div>
        <div className="flex flex-col items-center gap-[30px]">
          <label className="flex flex-col items-center justify-center gap-y-[20px] ">
            <CustomInput
              color="#1e1e1e"
              label="Pon tú Código"
              inputRef={inputPasswordRef} // Asegúrate de usar inputRef
            />
          </label>
          <div>
            <ButtonUsers width="" Text={"Enviar"} onClick={toggleTwoVerific} />
          </div>
        </div>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        pauseOnHover={false}
      />
    </>
  );
};

export const Formslogempleado = () => {
  const [location, setLocation] = useLocation();
  const { setLoginEmpleyees } = useContext(StateContext);
  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();
  const [animate, setAnimate] = useState(false);
  const [progress, setProgress] = useState(0);
  const { animateProgress, setAnimateProgress } = useContext(StateContext);

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
      const response = await axiosInstance.post(
        "/employees/login",
        employeeData
      );

      setAnimate(true);
      setTimeout(() => {
        setAnimateProgress(true);
      }, 1000);

      if (response.status === 200 || response.status === 201) {
        const token = response.data.token;
        const role = response.data.role;
        const route = response.data.routeCode;

        // Almacenar el token en localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("routeE", route);

        await sendVerificationCode(token);
        // console.log(token);
        // const data = await response.json();
        // console.log('User registered:', data);
      } else {
        // console.log(response.data);
        toast.error(error.response.data.error, {
          progressStyle: {
            backgroundColor: "#692FDB", // Color de la barra de carga
          },
        });
      }
    } catch (error) {
      toast.error(error.response.data.error, {
        progressStyle: {
          backgroundColor: "#692FDB", // Color de la barra de carga
        },
      });
    }
  };

  const sendVerificationCode = async (token) => {
    let simulateProgress;
    try {
      const totalDuration = 5000; // Duración simulada de 5 segundos

      // Inicializa un intervalo para simular el progreso mientras se descarga la data
      simulateProgress = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(simulateProgress);
            return 100;
          }
          return prev + 1; // Incremento del progreso
        });
      }, totalDuration / 100); // Divide la duración total en 100 partes

      // Envía la solicitud de verificación del token
      const response = await axiosInstance.post(
        "/vr/veriftokenandsendcode",
        {}, // Cuerpo vacío para esta solicitud
        {
          headers: { Authorization: `Bearer ${token}` },
          onDownloadProgress: (progressEvent) => {
            const total = progressEvent.total || totalDuration; // Usa el tamaño total o simulado
            const currentProgress = Math.round(
              (progressEvent.loaded * 100) / total
            );
            setProgress(currentProgress);
          },
        }
      );
    } catch (error) {
      toast.error(error.response.data.error, {
        progressStyle: {
          backgroundColor: "#692FDB", // Color de la barra de carga
        },
      });
    } finally {
      // Asegúrate de que se detenga el progreso al llegar a 100%
      clearInterval(simulateProgress);
      setProgress(100); // Configura el progreso al 100 si no lo ha alcanzado
    }
  };

  if (progress == 100) {
    setTimeout(() => {
      setLocation("/twoverific/KQWJ7482");
    }, 2000);
  }

  return (
    <>
      <div className="relative w-[600px] flex flex-col  left-[450px] gap-[40px] items-center">
        <form
          className={`w-[300px] flex flex-col top-[100px] left-[450px] gap-[40px] items-center ${
            animate
              ? "animate-jump-out animate-duration-1000 animate-fill-forwards"
              : ""
          }`}
        >
          <div className="flex flex-col items-center gap-[20px] ">
            <h2 className="text-[#FE7A36] font-medium text-[50px] ">Login</h2>
            <FaUserCircle className="text-[70px] text-[#FE7A36] " />
          </div>
          <div className="flex flex-col items-center gap-[8px]">
            <label className="flex flex-col items-center justify-center gap-y-[20px] ">
              <label className="flex flex-col items-center justify-center gap-y-[20px]">
                <CustomInput
                  label="Correo"
                  inputRef={inputEmailRef}
                  color="#FE7A36"
                />
                <CustomInput
                  type="password"
                  label="Contraseña"
                  inputRef={inputPasswordRef}
                  color="#FE7A36"
                />
              </label>
            </label>
            {/* <div className="w-full px-2 flex flex-col gap-0 items-start">
          <Inputolvi
            onClick={() => setLocation("/register")}
            placeholder="¿No estas registrado en la app?"
            textsize={"10px"}
          />
          <Inputrecuerdame placeholder="recuerdame" />
        </div> */}
            <div>
              <Buttonlog
                width=""
                Text={"Iniciar"}
                onClick={toggleLoginEmployee}
              />
            </div>
          </div>
        </form>
        <CircularProgressBar
          validator={animateProgress}
          progress={progress}
          size={220}
        ></CircularProgressBar>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        pauseOnHover={false}
      />
    </>
  );
};

export const Formsreg = ({}) => {
  const [location, setLocation] = useLocation();
  const { setmodalverificate } = useContext(StateContext);
  return (
    <form className="absolute w-[550px] flex flex-col top-[30px] right-[160px] gap-[50px] items-center ">
      <div className="flex flex-col items-center gap-[10px] ">
        <h2 className="text-[#692FDB] font-medium text-[62px] ">Registrate</h2>
        <FaUserCircle className="text-[80px] text-[#692FDB] " />
      </div>
      <div className="flex flex-col items-center gap-[10px]">
        <label className="flex flex-wrap justify-around gap-y-[15px] ">
          <InputFormsreg placeholder="Pon tu correo..." />
          <InputFormsreg placeholder="Pon tu direccion..." />
          <InputFormsreg placeholder="Pon tu local..." />
          <InputFormsreg placeholder="Pon tu numero..." />
          <InputFormsreg placeholder="Pon tu nombre..." />
          <InputFormsreg placeholder="Pon tu documento..." />
          <InputFormsreg placeholder="Pon tu deporte..." />
          <InputFormsreg placeholder="Servicios..." />
        </label>
        <div className="w-full flex justify-end gap-[0rem] ">
          <Inputolvi
            onClick={() => setLocation("/loginempleados")}
            placeholder="¿Ya estas registrado en la app?"
          />
        </div>
        <Buttonreg Text={"Contactanos"} />
      </div>
    </form>
  );
};

export const Formslog = () => {
  return (
    <form className="absolute w-[600px] flex flex-col top-[50px] left-[450px] gap-[60px] items-center ">
      <div className="flex flex-col items-center gap-[20px] ">
        <h2 className="text-[#FE7A36] font-medium text-[62px] ">Login</h2>
        <FaUserCircle className="text-[80px] text-[#FE7A36] " />
      </div>
      <div className="flex flex-col items-center gap-[40px]">
        <label className="flex flex-col justify-center gap-y-[20px] ">
          <InputFormslog placeholder="Pon tú ID" />
          <InputFormslog placeholder="Pon tú codigo" />
          <div className="w-[360px] flex justify-between">
            <Inputrecuerdame placeholder="recuerdame" />
            <Inputolvi placeholder="¿Olvidaste tu contraseña?" />
          </div>
        </label>
        <Buttonlog Text={"Iniciar"} />
      </div>
    </form>
  );
};

export const Formslogadmin = () => {
  const [location, setLocation] = useLocation();
  const { setLoginAdmin } = useContext(StateContext);

  const { animateProgress, setAnimateProgress } = useContext(StateContext);
  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();
  const [animate, setAnimate] = useState(false);
  const [progress, setProgress] = useState(0);

  const toggleLoginAdmin = async () => {
    const adminData = {
      email: inputEmailRef.current.value,
      password: inputPasswordRef.current.value,
    };

    try {
      const response = await axiosInstance.post(
        "/administrator/login",
        adminData
      );

      setAnimate(true);
      setTimeout(() => {
        setAnimateProgress(true);
      }, 1000);

      if (response.status === 200 || response.status === 201) {
        const token = response.data.token;
        const role = response.data.role;
        const route = response.data.routeCode;

        // Almacenar el token en localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("routeA", route);

        await sendVerificationCode(token);
        // console.log(token);
        // const data = await response.json();
        // console.log('User registered:', data);
      } else {
        // console.log(response.data);
        toast.error(error.response.data.error, {
          progressStyle: {
            backgroundColor: "#692FDB", // Color de la barra de carga
          },
        });
      }
    } catch (error) {
      toast.error(error.response.data.error, {
        progressStyle: {
          backgroundColor: "#692FDB", // Color de la barra de carga
        },
      });
    }
  };

  const sendVerificationCode = async (token) => {
    let simulateProgress;
    try {
      const totalDuration = 5000; // Duración simulada de 5 segundos

      // Inicializa un intervalo para simular el progreso mientras se descarga la data
      simulateProgress = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(simulateProgress);
            return 100;
          }
          return prev + 1; // Incremento del progreso
        });
      }, totalDuration / 100); // Divide la duración total en 100 partes

      // Envía la solicitud de verificación del token
      const response = await axiosInstance.post(
        "/vr/veriftokenandsendcode",
        {}, // Cuerpo vacío para esta solicitud
        {
          headers: { Authorization: `Bearer ${token}` },
          onDownloadProgress: (progressEvent) => {
            const total = progressEvent.total || totalDuration; // Usa el tamaño total o simulado
            const currentProgress = Math.round(
              (progressEvent.loaded * 100) / total
            );
            setProgress(currentProgress);
          },
        }
      );
    } catch (error) {
      // Manejo de errores con la notificación de Toast
      toast.error(error.response?.data?.error || "Error en la verificación", {
        progressStyle: {
          backgroundColor: "#692FDB", // Color de la barra de carga
        },
      });
    } finally {
      // Asegúrate de que se detenga el progreso al llegar a 100%
      clearInterval(simulateProgress);
      setProgress(100); // Configura el progreso al 100 si no lo ha alcanzado
    }
  };

  if (progress == 100) {
    setTimeout(() => {
      setLocation("/twoverific/HJQL9823");
    }, 2000);
  }

  return (
    <>
      <div className="relative w-[600px] flex flex-col  left-[450px] gap-[40px] items-center ">
        <form
          className={`w-[300px] flex flex-col top-[100px] left-[450px] gap-[40px] items-center ${
            animate
              ? "animate-jump-out animate-duration-1000 animate-fill-forwards"
              : ""
          }`}
        >
          <div className="flex flex-col items-center gap-[20px] ">
            <h2 className="text-[#692FDB] font-medium text-[50px] ">Login</h2>
            <FaUserCircle className="text-[70px] text-[#692FDB] " />
          </div>
          <div className="flex flex-col items-center gap-[8px]">
            <label className="flex flex-col items-center justify-center gap-y-[20px]">
              <CustomInput
                label="Correo"
                inputRef={inputEmailRef}
                color="#692FDB"
              />
              <CustomInput
                type="password"
                label="Contraseña"
                inputRef={inputPasswordRef}
                color="#692FDB"
              />
            </label>

            <div className="w-full px-2 flex flex-col gap-0 items-start">
              {/* <Inputolvi
            onClick={() => setLocation("/register")}
            placeholder="¿No estas registrado en la app?"
            textsize={"10px"}
            
          />
          <Inputrecuerdame placeholder="recuerdame" /> */}
            </div>
            <Buttonlog2
              width=""
              Text={"Iniciar"}
              onClick={() => {
                toggleLoginAdmin();
              }}
            />
          </div>
        </form>
        <CircularProgressBar
          validator={animateProgress}
          progress={progress}
          size={220}
        ></CircularProgressBar>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        pauseOnHover={false}
      />
    </>
  );
};