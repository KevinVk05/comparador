import { anadirProdALista, eliminarProdDeLista } from '../../../herramientas/comparadorAdmin';
import EstadoBusqueda from '../../comunes/estadoBusqueda';

const ResultadoBusquedaAdmin = ({ nombreLista, producto, resultados, setResultados, loading, error, setError }) => {

    //Refact
    return (
        <div>
            <EstadoBusqueda loading={loading} error={error} resultados={resultados} tipo={"COMPARADOR"}/>
            {resultados.length > 0 && !loading && (
                <section className="p-3">
                    <p className="text-center p-4 fs-4">Producto comparado: {producto}</p>
                    <div className='d-flex flex-wrap justify-content-center align-items-stretch gap-3'>
                        {resultados.map((item, index) => (
                            <div key={index} className="product-card mb-3 shadow-sm">
                                <div className="card p-3 shadow-sm h-100 d-flex flex-column justify-content-between" style={{ width: 250 }}>
                                    <img
                                        src={`/imagenes/${item.supermercado}_NOMBRE.svg`}
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
                                        {!item.enLaLista ? (
                                            <button type="button" onClick={() => anadirProdALista(item, setResultados, resultados, setError, nombreLista)} className='mt-auto mx-auto p-2 btn btn-success'>Añadir a la lista</button>
                                        ) : (
                                            <button type="button" onClick={() => eliminarProdDeLista(item, setResultados, resultados, setError, nombreLista)} className='mt-auto mx-auto p-2 btn btn-danger'>Eliminar de la lista</button>
                                        )
                                        }
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </section>
            )}
        </div>
    )
}

export default ResultadoBusquedaAdmin;