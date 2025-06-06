import { eliminarLista, eliminarListaDeLaCompra } from "../../herramientas/eliminarListas"
import { useAuth } from "../../Login/AuthProvider";

const ModalEliminarLista = ({ onClose, setError, setListas, listas, listaEliminar, cesta}) => {

    const { user } = useAuth()

    return (
        <div className="d-flex flex-column align-items-center justify-content-center">
            <div className="p-3">
                ¿Está seguro de que quiere eliminar la lista?</div>
            <img
                src="/imagenes/iconosModales/papelera_icon.png"
                alt="icono papelera"
                className="w-50 m-2"
            />
            <div className="d-flex flex-column flex-sm-row justify-content-center justify-content-sm-between align-items-center gap-2">
                <button onClick={() => eliminarLista(setListas, listas, setError, onClose, cesta, user, listaEliminar)} className="btn btn-danger">Eliminar lista</button>
                <button onClick={onClose} className="btn btn-success">Mantener lista</button>
            </div>
        </div>
    )
}

export default ModalEliminarLista;