import ServicioCesta from "../servicios/ServicioCesta"

export const anadirProdCesta = (item, setResultados, resultados, setError, user, prodPerteneceListaPred) => {
    const prodAnadido = {
        usuario: user,
        prod: item
    }

    ServicioCesta.anadirProdCesta(prodAnadido).then(() => {
        setResultados(() => {
            if (prodPerteneceListaPred) {
                return modificarResultadosCestaProdLista(item, resultados, true)
            }
            return modificarResultadosCestaProdBuscador(item, resultados, true)
        })
    }).catch(() => {
        setError("Ha ocurrido un error al añadir el producto a la cesta")
    })
}

export const eliminarProdCesta = (item, setResultados, resultados, setError, user, prodPerteneceListaPred) => {
    const prodEliminado = {
        usuario: user,
        prod: item
    }
    ServicioCesta.eliminarProdCesta(prodEliminado).then(() => {
        setResultados(() => {
            if (prodPerteneceListaPred) {
                return modificarResultadosCestaProdLista(item, resultados, false)
            }
            return modificarResultadosCestaProdBuscador(item, resultados, false)
        })
    }).catch(() => {
        setError("Ha ocurrido un error al eliminar el producto de la cesta")
    })
}

export const modificarResultadosCestaProdBuscador = (item, resultados, seEncuentra) => {
    return resultados.map(prod =>
        prod.nombre === item.nombre && prod.supermercado === item.supermercado && prod.precio === item.precio
            ? { ...prod, enLaCesta: seEncuentra }
            : prod
    );
}

export const modificarResultadosCestaProdLista = (item, resultados, seEncuentra) => {
    return resultados.map(lista => ({
        ...lista,
        listaProductos: lista.listaProductos.map(prod =>
            prod.producto.id === item.id
                ? { ...prod, enLaCesta: seEncuentra }
                : prod
        )
    }));
};
