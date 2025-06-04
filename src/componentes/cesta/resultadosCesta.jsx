import { useState } from "react";
import ModalEliminarProducto from "../modals/modalEliminarProducto";
import ModalEliminarLista from "../modals/modalEliminarLista";
import Modal from "../modals/modal";
import "../../estilos/transicion.css"
import { obtenerIdProducto } from "../../herramientas/general";
import { useAuth } from "../../Login/AuthProvider";
import ServicioCesta from "../../servicios/ServicioCesta";
import ProductoLista from "../comunes/productoLista";

const ResultadosCesta = ({ productosPorSupermercado, setProductosPorSupermercado }) => {

    const [error, setError] = useState(null);
    const [childrenModal, setChildrenModal] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const openModal = () => setIsModalOpen(true)
    const closeModal = () => {
        setIsModalOpen(false)
        setChildrenModal(null)
    }
    const { user } = useAuth()

    const [eliminando, setEliminando] = useState(null);

    const eliminarProdCesta = (item) => {
        const prodEliminado = {
            usuario: user,
            prod: item
        }

        ServicioCesta.eliminarProdCesta(prodEliminado).then(() => {
            setEliminando(obtenerIdProducto(item));
            closeModal();
            setTimeout(() => {
                setProductosPorSupermercado(prev => {
                    const nuevos = { ...prev };
                    const idSuper = item.supermercado.toLowerCase();
                    nuevos[idSuper] = nuevos[idSuper].filter(p => p.nombre !== item.nombre || p.precio !== item.precio);
                    return nuevos;
                });
                setEliminando(null);
            }, 500);
        }).catch(() => {
            setError("Ha ocurrido un error al eliminar el producto de la cesta")
        })
    }

    const abrirModalEliminarLista = () => {
        setChildrenModal(<ModalEliminarLista onClose={closeModal} setError={setError} setListas={setProductosPorSupermercado} listas={productosPorSupermercado} cesta={true} user={user}/>)
        openModal()
    }

    const abrirModalEliminarProducto = (producto) => {
        setChildrenModal(<ModalEliminarProducto producto={producto} onClose={closeModal} eliminarProd={eliminarProdCesta} />)
        openModal()
    }

    
    return (
        <div>
            {error && (
                <div className="d-flex justify-content-center my-4">
                    <div className='alert alert-danger text-center w-50'>
                        {error}
                    </div>
                </div>
            )}
            {productosPorSupermercado && Object.values(productosPorSupermercado).some(arr => arr.length > 0) > 0 && (
                <section className='p-3 shadow-sm border rounded'>
                    <div className='d-flex gap-3 justify-content-center py-4'>
                        <div className='d-flex align-items-center'><span>Si ya has realizado la compra...</span></div>
                        <button className='btn btn-danger' onClick={() => abrirModalEliminarLista()}>Descartar lista</button>
                    </div>
                    {Object.entries(productosPorSupermercado).map(([nombreSupermercado, productos], indexSuper) => (
                        <div key={indexSuper}>
                            {productos.length > 0 && (
                                <div className='shadow-sm border rounded mb-4'>
                                    <img
                                        src={`imagenes/${nombreSupermercado.toUpperCase()}_NOMBRE.svg`}
                                        alt={nombreSupermercado}
                                        className='mt-5 ms-5'
                                        style={{ height: 30 }} />
                                    <ProductoLista productos={productos} eliminando={eliminando} abrirModalEliminarProducto={abrirModalEliminarProducto} />
                                </div>
                            )}
                        </div>
                    ))}
                </section>
            )}

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {childrenModal}
            </Modal>

        </div>
    )
}

export default ResultadosCesta;