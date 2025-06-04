import { useState } from "react"
import Modal from "../../modals/modal"
import ModalAnadirListaAdmin from "../../modals/modalAnadirListaAdmin"

const AnadirListas = ({ setListas}) => {

    const [childrenModal, setChildrenModal] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const openModal = () => setIsModalOpen(true)
    const closeModal = () => {
        setIsModalOpen(false)
        setChildrenModal(null)
    }

    const anadirLista = () => {
        setChildrenModal(<ModalAnadirListaAdmin onClose={closeModal} setListas={setListas}/>)
        openModal()
    }

    return (
        <div className="d-flex justify-content-center m-5">
            <button type="button"
                className="btn btn-success"
                onClick={anadirLista}>Añadir lista</button>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {childrenModal}
            </Modal>
        </div>
    )
}

export default AnadirListas;