import AnadirListas from "./anadirListas";
import Encabezado from "../../comunes/encabezados";
import Listas from "./listas";
import { useEffect, useState } from "react";
import ServicioListas from "../../../servicios/ServicioListas";

const AdministrarListas = () => {

    const titulo = "Administra las listas predeterminadas"
    const textoEncabezado1 = "Selecciona las listas que los usuarios podrán visualizar. Añade y elimina productos de las listas prediseñadas."
    const textoEncabezado2 = "Comienza a editarlas:"

    const [listas, setListas] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        ServicioListas.getListas().then((respuesta) => {
            setListas(respuesta.data)
            setLoading(false)
            if (!respuesta.data > 0) {
                setError("No se han encontrado ninguna lista.")
            }
        }).catch((error) => {
            setLoading(false);
            if (error.response && error.response.status === 403) {
                setError( "Su usuario no tiene permisos, vuelva a iniciar sesión.");
            } else {
                setError("Ha ocurrido un error al recuperar las listas.")
            }
        })
    }, [])

    return (
        <div className="container py-4">
            <Encabezado titulo={titulo} texto1={textoEncabezado1} texto2={textoEncabezado2} img={"imagenes/compra.png"} />
            <AnadirListas setListas={setListas}/>
            <Listas listas={listas} setListas={setListas} setError={setError} loading={loading} error={error}/>
        </div>
    )
}


export default AdministrarListas;