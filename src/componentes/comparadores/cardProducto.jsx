import { anadirProdCesta, eliminarProdCesta } from "../../herramientas/comparadores";
import { useAuth } from "../../Login/AuthProvider";

const CardProducto = ({ item, enLaCesta, setResultados, resultados, setError, prodPerteneceListaPred }) => {

    if(!enLaCesta){
        enLaCesta = item.enLaCesta;
    }
    const { user } = useAuth();
    return (

        <div className="card p-3 shadow-sm h-100 d-flex flex-column justify-content-between" style={{ width: 250 }}>
            <img
                src={`imagenes/${item.supermercado}_NOMBRE.svg`}
                alt={item.supermercado}
                className='mt-2'
                style={{ height: 25 }}
            />
            <div className="d-flex justify-content-center">
                <img
                    src={item.urlImagen}
                    className="p-3"
                    alt={item.nombre}
                    style={{ maxHeight: 200, maxWidth: '100%' }}
                />
            </div>
            <div className="text-center mt-auto">
                <p className="mb-2 fs-6 fw-bold">{item.nombre}</p>
                <p className="my-1 mx-1">
                    Precio: <strong>{item.precio}€</strong>
                </p>
                <p>
                    Precio a granel: <strong>{item.precioGranel} €/{item.unidadMedida}</strong>
                </p>
                {!enLaCesta ? (
                    <button type="button" onClick={() => anadirProdCesta(item, setResultados, resultados, setError, user, prodPerteneceListaPred)} className='mt-auto mx-auto p-2 btn btn-success'>Añadir a la cesta</button>
                ) : (
                    <button type="button" onClick={() => eliminarProdCesta(item, setResultados, resultados, setError, user, prodPerteneceListaPred)} className='mt-auto mx-auto p-2 btn btn-danger'>Eliminar de la cesta</button>
                )
                }
            </div>
        </div>
    )
}

export default CardProducto;