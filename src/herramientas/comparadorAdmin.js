import ServicioListas from "../servicios/ServicioListas"

export const anadirProdALista = (item, setResultados, resultados, setError, nombreLista) => {
    setError(null)
    const prodAnadido = {
        nombre: nombreLista,
        producto: item
    }

    ServicioListas.agregarProductoALista(prodAnadido).then(() => {
        setResultados(() => {
            return modificarResultadosLista(item, resultados, true)
        })
    }).catch(() => {
        setError("Ha ocurrido un error al añadir el producto a la cesta")
    })
}

export const eliminarProdDeLista = (item, setResultados, resultados, setError, nombreLista) => {
    setError(null)
    const prodEliminado = {
        nombre: nombreLista,
        producto: item
    }
    ServicioListas.eliminarProductoLista(prodEliminado).then(() => {
        setResultados(() => {
            return modificarResultadosLista(item, resultados, false)
        })
    }).catch(() => {
        setError("Ha ocurrido un error al eliminar el producto de la cesta")
    })
}

const modificarResultadosLista = (item, resultados, seEncuentra) => {
    return resultados.map(prod =>
        prod.nombre === item.nombre && prod.supermercado === item.supermercado && prod.precio === item.precio
            ? { ...prod, enLaLista: seEncuentra }
            : prod
    );
}

