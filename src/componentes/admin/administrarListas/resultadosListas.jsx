import { useState } from "react";
import BotonesAdministrarListas from "./botonesAdministrarListas";
import Modal from "../../modals/modal";
import ModalEliminarProducto from "../../modals/modalEliminarProducto";
import ProductoLista from "../../comunes/productoLista";
import ServicioListas from "../../../servicios/ServicioListas";
import { obtenerIdProducto } from "../../../herramientas/general";

const ResultadosListas = ({ listas, setListas, setError }) => {

    const [childrenModal, setChildrenModal] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const openModal = () => setIsModalOpen(true)
    const closeModal = () => {
        setIsModalOpen(false)
        setChildrenModal(null)
    }

    // Ordeno las listas para que aparezcan arriba las que no tienen productos
    const listasOrdenadas = (listas ?? []).sort(
        (a, b) => a.listaProductos.length - b.listaProductos.length
    );

    const [eliminando, setEliminando] = useState(null);

    // Cambiar para que se elimine de la lista no de la cesta
    const eliminarProdLista = (prod, listaAModificar) => {
        const prodEliminado = {
            nombre: listaAModificar.nombre,
            producto: prod
        }

        ServicioListas.eliminarProductoLista(prodEliminado)
        .then(() => {
            setEliminando(obtenerIdProducto(prod));
            closeModal();
            setTimeout(() => {
                setListas(prevListas => 
                    prevListas.map(lista => 
                        lista.id === listaAModificar.id 
                            ? { 
                                ...lista, 
                                listaProductos: lista.listaProductos.filter(
                                    lp => lp.producto.id !== prod.id
                                )
                            } 
                            : lista
                    )
                );
                setEliminando(null);
            }, 500);
        })
        .catch(() => {
            setError("Ha ocurrido un error al eliminar el producto de la lista");
        });
    }

    const abrirModalEliminarProducto = (producto, lista) => {
        setChildrenModal(<ModalEliminarProducto producto={producto} onClose={closeModal} eliminarProd={eliminarProdLista} lista={lista} />)
        openModal()
    }

    return (
        <div>
            {listasOrdenadas.map((lista, index) => (
                <div key={index} className='shadow-sm border rounded mb-4'>
                    <div className='d-flex flex-column flex-md-row p-4 justify-content-between align-items-md-start align-items-center gap-3'>
                        <div className="d-flex flex-column justify-content-center">
                            <div className="fs-5 text-center">{lista.nombre}</div>
                        </div>
                        <BotonesAdministrarListas listasPredeterminadas={listas} setListasPredeterminadas={setListas} lista={lista} setError={setError} />
                    </div>
                    {lista.listaProductos.length > 0 && (
                        //Envio los productos de esta manera para convertirlo en un array de productos
                        <ProductoLista productos={lista.listaProductos.map(lp => lp.producto)} lista={lista} eliminando={eliminando} abrirModalEliminarProducto={(producto) => abrirModalEliminarProducto(producto, lista)} />
                    )}
                </div>
            ))
            }
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {childrenModal}
            </Modal>

        </div >
    )
}

export default ResultadosListas;