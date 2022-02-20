
//TODO: usando formik y yup - para los formularios
//^ documentacion de yup - https://www.npmjs.com/package/yup
// ----------------------------------------------------------

import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";

import * as yup from 'yup';
import Alerta from "./Alerta";
import Spinner from "./Spinner";

const Formulario = ({cliente, cargando}) => {

  const navigate = useNavigate();

  // REGLAS DE VALIDACION USANDO YUP
  const nuevoClienteSchema = yup.object().shape({
    nombre: yup.string()
              .min(3,'El NOMBRE es muy corto')
              .max(40, 'El NOMBRE es muy largo')
              .required('El nombre del Cliente es Obligatorio'),              
    empresa: yup.string()
                .required('El nombre de la Empresa es Obligatorio'),
    email: yup.string()
              .email('Email no Válido')
              .required('El Email es Obligatorio'),
    telefono: yup.number()
                  .integer('Número no válido')
                  .positive('Número no válido')
                  .typeError('El numero no es válido'),
    notas:''
  });

  const handleSubmit = async values => {
    try {
      let respuesta = "";
      if(cliente.id){
        // -----------------------
        //*  EDITANDO UN REGISTRO
        // -----------------------
        const url = `http://localhost:4000/clientes/${cliente.id}`;
        respuesta = await fetch(url, {
          method: 'PUT',
          body: JSON.stringify(values),
          headers:{
            'Content-Type': 'application/json'
          }
        });
      }else{
        //^ ----------------
        //* NUEVO REGISTRO
        //^ ----------------
        const url = "http://localhost:4000/clientes";
        respuesta = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(values),
          headers:{
            'Content-Type': 'application/json'
          }
        });      
      }

      await respuesta.json();
      //^ ---------------------      
      //* REDIRIGIR A CLIENTES
      //^ ---------------------           
      navigate('/clientes');        

    } catch (error) {
      console.log(error);
    }  
  };

  return (
    cargando ? <Spinner/> : (
      <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
        <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
          {cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
        </h1>
        <Formik 
          initialValues={{
            // cliente?.nombre ?? "" = si se marca como undefined agrega ""
            nombre: cliente?.nombre ?? "",
            empresa: cliente?.empresa ?? "",
            email: cliente?.email ?? "",
            telefono: cliente?.telefono ?? "",
            notas: cliente?.notas ?? ""
          }} 

          // nombre: cliente.nombre,tenemos que declarar a enableReinitialize como true
          enableReinitialize = {true}

          // le agregamos un async await para que espere
          onSubmit={async (values, {resetForm}) => {
            await handleSubmit(values);
            resetForm();
          }}  

          validationSchema={nuevoClienteSchema}      
          
          >

          {({errors, touched}) => {        
            return (
            <Form className="mt-10">
              <div className="mb-4">
                <label htmlFor="nombre" className="text-gray-800">Nombre:</label>
                <Field 
                  className="mt-2 block w-full p-3 bg-gray-50 border-2"
                  type="text"
                  id="nombre"
                  placeholder="Nombre del Cliente"
                  name="nombre"
                />  
                {
                  errors.nombre && touched.nombre ? (
                    <Alerta>{errors.nombre}</Alerta>
                  ): null
                }            
              </div>    
              <div className="mb-4">
                <label htmlFor="empresa" className="text-gray-800">Empresa:</label>
                <Field 
                  className="mt-2 block w-full p-3 bg-gray-50 border-2"
                  type="text"
                  id="empresa"
                  placeholder="Empresa del Cliente"
                  name="empresa"
                />
                {
                  errors.empresa && touched.empresa ? (
                    <Alerta>{errors.empresa}</Alerta>
                  ): null
                }     
              </div>       
              <div className="mb-4">
                <label htmlFor="email" className="text-gray-800">E-mail:</label>
                <Field 
                  className="mt-2 block w-full p-3 bg-gray-50 border-2"
                  type="email"
                  id="email"
                  placeholder="Email del Cliente"
                  name="email"
                />
                {
                  errors.email && touched.email ? (
                    <Alerta>{errors.email}</Alerta>
                  ): null
                } 
              </div>       
              <div className="mb-4">
                <label htmlFor="telefono" className="text-gray-800">Telefono:</label>
                <Field 
                  className="mt-2 block w-full p-3 bg-gray-50 border-2"
                  type="tel"
                  id="telefono"
                  placeholder="Teléfono del Cliente"
                  name="telefono"
                />
                {
                  errors.telefono && touched.telefono ? (
                    <Alerta>{errors.telefono}</Alerta>
                  ): null
                }  
              </div>       
              <div className="mb-4">
                <label htmlFor="notas" className="text-gray-800">Notas:</label>
                <Field 
                  as="textarea"
                  className="mt-2 block w-full p-3 h-40 bg-gray-50 border-2"
                  type="text"
                  id="notas"
                  placeholder="Notas del Cliente"
                  name="notas"
                />
              </div>  
              <input 
                type="submit" 
                value={cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'} 
                className="mt-5 w-full p-3 text-white font-bold text-lg bg-blue-800 uppercase cursor-pointer"
                />     
            </Form>
          )}}
        </Formik>
      </div>
    )
  );
};

// propiedad por defecto
Formulario.defaultProps = {
  cliente: {},
  cargando: false
}

export default Formulario;
