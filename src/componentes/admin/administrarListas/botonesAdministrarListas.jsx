import { useState } from "react";
import { cambioVisibilidad, modificarVisibilidadListas } from "../../../herramientas/listasAdministrador"
import ServicioListas from "../../../servicios/ServicioListas"
import Modal from "../../modals/modal"
import ModalEliminarLista from "../../modals/modalEliminarLista";
import ModalAvisoListaVacia from "../../modals/modalAvisoListaVacia";
import { Link } from "react-router-dom";

const BotonesAdministrarListas = ({ listasPredeterminadas, setListasPredeterminadas, lista, setError }) => {

    const [childrenModal, setChildrenModal] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const openModal = () => setIsModalOpen(true)
    const closeModal = () => {
        setIsModalOpen(false)
        setChildrenModal(null)
    }

    const cambiarVisibilidadLista = () => {
        if (!lista.esVisible && lista.listaProductos.length === 0) {
            abrirModalAvisoListaVacia()
        } else {
            cambioVisibilidad(lista, setListasPredeterminadas, listasPredeterminadas, setError)
        }
    }

    const abrirModalEliminarLista = () => {
        setChildrenModal(<ModalEliminarLista onClose={closeModal} setError={setError} setListas={setListasPredeterminadas} listas={listasPredeterminadas} listaEliminar={lista} cesta={false} />)
        openModal()
    }

    const abrirModalAvisoListaVacia = () => {
        setChildrenModal(<ModalAvisoListaVacia onClose={closeModal} listaACambiar={lista} setListasPredeterminadas={setListasPredeterminadas} listasPredeterminadas={listasPredeterminadas} setError={setError} />)
        openModal()
    }


    return (
        <div className="d-flex gap-3">
            {lista.esVisible ? (
                <button type="button" onClick={cambiarVisibilidadLista} className='btn btn-secondary'>Ocultar lista</button>
            ) : (
                <button type="button" onClick={cambiarVisibilidadLista} className='btn btn-primary'>Hacer visible</button>
            )
            }
            <button className="btn btn-success">
                <Link className="nav-link" to={`/comparadorAdmin/${lista.nombre}`}>Añadir producto</Link>
            </button>
            <button className="btn btn-danger" onClick={abrirModalEliminarLista}>Eliminar lista</button>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {childrenModal}
            </Modal>

        </div>
    )
}

export default BotonesAdministrarListas;