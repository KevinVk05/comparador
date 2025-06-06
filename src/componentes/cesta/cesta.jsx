import { useEffect, useState } from "react";
import ResultadosCesta from "./resultadosCesta";
import ServicioCesta from "../../servicios/ServicioCesta";
import { dividirResultadosPorSupermercados, listaConResultados } from "../../herramientas/general";
import EstadoBusqueda from "../comunes/estadoBusqueda";
import { useAuth } from "../../Login/AuthProvider";

const Cesta = () => {

    const { user } = useAuth()

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [productosPorSupermercado, setProductosPorSupermercado] = useState({
        mercadona: [],
        carrefour: [],
        dia: [],
        ahorramas: []
    });

    useEffect(() => {
        setLoading(true)
        ServicioCesta.getProdsCesta(user).then(respuesta => {
            let prods = respuesta.data.productos
            setLoading(false);
            if (prods && prods.length > 0) {
                dividirResultadosPorSupermercados(prods, setProductosPorSupermercado)
                setError(null);
            } else {
                setProductosPorSupermercado({
                    mercadona: [],
                    carrefour: [],
                    dia: [],
                    ahorramas: []
                });
                setLoading(false);
            }
        })
            .catch(() => {
                setError('Ha ocurrido un error con la conexión');
                setProductosPorSupermercado({
                    mercadona: [],
                    carrefour: [],
                    dia: [],
                    ahorramas: []
                });
                setLoading(false);
            })
    }, [])

    return (
        <div>
            <EstadoBusqueda loading={loading} error={error} resultados={listaConResultados(productosPorSupermercado)} tipo={"CESTA"}/>
            <ResultadosCesta productosPorSupermercado={productosPorSupermercado} setProductosPorSupermercado={setProductosPorSupermercado}/>
        </div>
    )
}

export default Cesta;
