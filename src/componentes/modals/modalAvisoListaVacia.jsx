import { cambioVisibilidad } from "../../herramientas/listasAdministrador";

const ModalAvisoListaVacia = ({onClose, listaACambiar, setListasPredeterminadas, listasPredeterminadas, setError}) => {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center">
            <div className="p-3">
                ¿Está seguro de que quiere hacer visible una lista vacía?</div>
            <img
                src="/imagenes/iconosModales/visualizar.png"
                alt="icono papelera"
                className="w-25 m-4"
            />
            <div className="d-flex flex-column flex-sm-row justify-content-center justify-content-sm-between align-items-center gap-2 my-2">
                <button onClick={() => cambioVisibilidad(listaACambiar, setListasPredeterminadas, listasPredeterminadas, setError, onClose)} className="btn btn-danger">Hacer visible</button>
                <button onClick={onClose} className="btn btn-success">No hacer visible</button>
            </div>
        </div>
    )
}

export default ModalAvisoListaVacia;