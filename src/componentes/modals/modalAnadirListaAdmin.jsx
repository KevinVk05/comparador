import { useRef, useState } from "react"
import ServicioListas from "../../servicios/ServicioListas"

const ModalAnadirListaAdmin = ({ onClose, setListas }) => {

    const [error, setError] = useState("")
    const [nombreLista, setNombreLista] = useState("")

    const anadirLista = (e) => {
        e.preventDefault()
        if (nombreLista.length > 0) {
            ServicioListas.crearLista(nombreLista).then((response) => {
                setListas(prevLista => [...prevLista, response.data])
                onClose()
            }).catch((error) => {
                if (error.response && error.response.data) {
                    setError(error.response.data)
                } if (error.response && error.response.status === 403) {
                    setError("Su usuario no tiene permisos, vuelva a iniciar sesión.");
                } else {
                    setError("Ha ocurrido un error al recuperar las listas.")
                }
            })
        } else {
            setError("Introduzca un nombre válido.")
        }
    }

    return (
        <form action="" onSubmit={anadirLista}>
            <div className="d-flex flex-column align-items-center justify-content-center">
                <div className="m-1">
                    Introduzca el nombre de la lista: </div>
                <input type="text"
                    autoFocus
                    placeholder="Maquillaje"
                    className="form-control m-2 w-50"
                    value={nombreLista}
                    onChange={(e) => setNombreLista(e.target.value)}
                />
                {error && (
                    <div className='alert alert-danger m-2'>
                        {error}
                    </div>)}
                <div className="d-flex flex-column flex-sm-row justify-content-center justify-content-sm-between align-items-center gap-2 my-2">
                    <button type="submit" className="btn btn-success">Añadir lista</button>
                    <button onClick={onClose} className="btn btn-danger">Cancelar</button>
                </div>
            </div>
        </form>
    )
}

export default ModalAnadirListaAdmin;