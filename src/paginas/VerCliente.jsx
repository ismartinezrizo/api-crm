// useParams - para leer los parametros de url
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const VerCliente = () => {

  const {id} = useParams();

  const [cliente, setCliente] = useState({});

  const [cargando, setCargando] = useState(true);
  
  // cuando carge el componente mandar a llamar a la api
  useEffect(() => {    
    const obtenerClienteAPI = async () => {
      try {
        let url = `http://localhost:4000/clientes/${id}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setCliente(resultado);       
      } catch (error) {
        console.log(error);
      }
    
      // pasamos a false una vez ya haya cargado, para que muestra lo contrario de su estado
      setCargando(!cargando);
    
    };

    // mandamos a llamar a la funcion
    obtenerClienteAPI();

  },[]);

    return (
      //Object.keys(cliente).length === 0 - para cuando le pasamos un valor que no existe en la url
      cargando ? <Spinner/> : Object.keys(cliente).length === 0 ? <p>No hay resultado</p> : (      
      <div>
          { cargando ? 'Cargando' : (    
          <>
              <h1 className="font-black text-4xl text-blue-900">Ver Clientes {cliente.nombre}</h1>
              <p className="mt-3">Informacion del cliente</p>

              {cliente.nombre && (
                <p className="text-gray-600 text-2xl mt-10"><span className="text-gray-800 uppercase font-bold">Cliente: </span>{cliente.nombre}</p>
              )}

              {cliente.email && (
                <p className="text-gray-600 text-2xl mt-4"><span className="text-gray-800 uppercase font-bold">Email: </span>{cliente.email}</p>
              )}

              {cliente.telefono && (
                <p className="text-gray-600 text-2xl mt-4"><span className="text-gray-800 uppercase font-bold">Telefono: </span>{cliente.telefono}</p>
              )}

              {cliente.notas && (
                <p className="text-gray-600 text-2xl mt-4"><span className="text-gray-800 uppercase font-bold">Notas: </span>{cliente.notas}</p>        
              )}
          </>
          )}
      </div>
    )    
  )
};

export default VerCliente;