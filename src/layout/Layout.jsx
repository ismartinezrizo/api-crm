
// useLocation - PARA DETENTAR EN QUE PAGINA ESTAMOS
import { Link, Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const urlActual = location.pathname; 

  return (
    <div className="md:flex md:min-h-screen">
      <div className="md:w-1/4 bg-blue-900 text-white px-5 py-10 text-center">
        <h2 className="text-4xl font-black text-center">CRM-Clientes</h2>
        <nav className="mt-10">
          <Link 
            className={`${urlActual === '/clientes' ? 'bg-blue-300' : 'bg-none'} text-2xl block mt-2 p-2`} 
            to="/clientes">Clientes</Link>
          <Link
            className={`${urlActual === '/clientes/nuevo' ? 'bg-blue-300' : 'bg-none'} text-2xl block mt-2 p-2`} 
            to="/clientes/nuevo">Nuevo Cliente</Link>
        </nav>
      </div>
      <div className="md:w-3/4 p-10 md:h-screen overflow-scroll">        
        {/*Outlet - LO QUE SE VA A INYECTAR */}
        <Outlet/>  
      </div>    

    </div>
  );
};

export default Layout;
