import { useEffect, useState } from "react";
import { useAuth } from "../../Login/AuthProvider";
import { useFavoritos } from "../../hooks/useFavoritos";
import ServicioBusquedasFavoritas from "../../servicios/ServicioBusquedasFavoritas";

const BusquedasFavoritas = ({setError, hacerBusquedaFavorita, cambioBusquedasFavoritas, setCambioBusquedasFavoritas}) => {

    const { user } = useAuth();
    const {eliminarBusquedaFav} = useFavoritos(setError);
    const [busquedasFavs, setBusquedasFavs] = useState([])

    useEffect(() => {
        ServicioBusquedasFavoritas.getBusquedasFavs(user).then((response) => {
            setBusquedasFavs(response.data)
        }).catch(() => {
            setError('Ha ocurrido un error con la conexión');
        })
    }, [cambioBusquedasFavoritas])

    const eliminarFavorito = (producto) => {
        const busqueda = {
            usuario: user,
            nombreBusqueda: producto
        }
        eliminarBusquedaFav(busqueda, setCambioBusquedasFavoritas)
    }

    return (
        <div>
            {busquedasFavs.length > 0 && (
                <div className="d-flex flex-wrap px-1 my-4 align-items-center justify-content-center gap-2">
                    <div>Búsquedas favoritas: </div>
                    {busquedasFavs.map((busqueda, index) => (
                        <button key={index} className="btn btn-light border">
                            <div>
                                <span className="me-2" onClick={() => eliminarFavorito(busqueda.nombreBusqueda)}>&times;</span>
                                <span onClick={() => hacerBusquedaFavorita(busqueda.nombreBusqueda)}>{busqueda.nombreBusqueda}</span>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default BusquedasFavoritas;