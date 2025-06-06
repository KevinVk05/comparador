import { obtenerIdProducto } from "../../herramientas/general"

const ProductoLista = ({productos, eliminando, abrirModalEliminarProducto}) => {
    
    return (
        <div className='d-flex overflow-auto align-items-stretch gap-3 m-4'>
            {productos.map((item, indexProd) => (
                <div
                    key={indexProd}
                    className={`product-card my-3 ${eliminando === obtenerIdProducto(item) ? 'fade-up' : ''}`}
                    id={obtenerIdProducto(item)}
                >
                    <div className="card p-3 shadow-sm h-100 d-flex flex-column justify-content-between"
                        style={{
                            width: 250,
                        }}>
                        <div className="d-flex justify-content-center">
                            <img
                                src={item.urlImagen}
                                className="p-3"
                                alt={item.nombre}
                                style={{ maxHeight: 200 }}
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
                            <button type="button" className={`btn btn-danger delete-btn-${item.precio}-${item.nombre}`} onClick={() => abrirModalEliminarProducto(item)}>Eliminar de la cesta</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ProductoLista