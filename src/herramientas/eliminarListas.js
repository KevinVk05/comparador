import ServicioCesta from "../servicios/ServicioCesta";
import ServicioListas from "../servicios/ServicioListas";

export const eliminarLista = (setListas, listas, setError, onClose, cesta, user, listaEliminar) => {
    if (cesta) {
        return eliminarListaDeLaCompra(setListas, setError, onClose, user)
    }
    return eliminarListaPredeterminada(setListas, listas, setError, onClose, listaEliminar)
}

export const eliminarListaPredeterminada = (setListas, listas, setError, onClose, listaEliminar) => {
    ServicioListas.eliminarLista(listaEliminar.nombre).then(() => {
        setListas(() =>
            listas.filter(lista => lista.nombre !== listaEliminar.nombre)
        );
    }).catch(() => {
        setError("Ha ocurrido un error al eliminar la lista")
    })
    onClose()
}

export const eliminarListaDeLaCompra = (setProductosPorSupermercado, setError, onClose, user) => {
    ServicioCesta.eliminarCesta(user).then(() => {
        setProductosPorSupermercado({
            Mercadona: [],
            Carrefour: [],
            Dia: [],
            Ahorramas: []
        });
    }).catch((err) => {
        setError("Ha ocurrido un error al eliminar su cesta")
    })
    onClose()
}