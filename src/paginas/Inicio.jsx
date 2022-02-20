import { useEffect, useState } from "react";
import Cliente from "../components/Cliente";

const Inicio = () => {
  
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const obtenerClienteAPI = async () => {
      try {
        const url = 'http://localhost:4000/clientes';
        // como es un GET solo le paso la url
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setClientes(resultado);
      } catch (error) {
        console.log(error);
      }
    };

    obtenerClienteAPI();

  },[]);

  // para eliminar
  const handleEliminar = async id => {
    const confirmar = confirm('Desea eliminar el cliente?');
    if(confirmar){
      // LLAMADO A LA API
      try {
        const url = `http://localhost:4000/clientes/${id}`;
        // ELIMINA DE LA API
        const respuesta = await fetch(url, {
          method: 'DELETE'
        });
        await respuesta.json();

        const arrayClientes = clientes.filter(cliente => cliente.id !== id);
        // MODIFICAMOS LOS CLIENTES
        setClientes(arrayClientes);       

      } catch (error) {
        console.log(error);
      }
    }

    console.log(confirmar);
  }

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
      <p className="mt-3">Administra tus cliente</p>
      <table className="w-full mt-5 table-auto shadow bg-white">
        <thead className="bg-blue-800 text-white">
          <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">Contacto</th>
            <th className="p-2">Empresa</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          { clientes.map( cliente => (
            <Cliente 
              key={cliente.id} 
              cliente={cliente}
              handleEliminar={handleEliminar}
            />
          )) }
        </tbody>
      </table>
      
    </>
  );
};

export default Inicio;
