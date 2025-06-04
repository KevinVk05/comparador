import ServicioListas from "../servicios/ServicioListas";

export const modificarVisibilidadListas = (listasPredeterminadas, listaACambiar) => {
  return listasPredeterminadas.map(lista =>
    lista.nombre === listaACambiar.nombre ?
      { ...lista, esVisible: !lista.esVisible }
      : lista
  )
}

export const cambioVisibilidad = (listaACambiar, setListasPredeterminadas, listasPredeterminadas, setError, onClose) => {
  ServicioListas.alternarVisibilidadLista(listaACambiar.nombre)
    .then(() => {
      setListasPredeterminadas(prevListas => 
        modificarVisibilidadListas(prevListas, listaACambiar)
      );        if (onClose) {
        onClose()
      }
    }).catch(() => {
      setError("Ha ocurrido un error cambiando la visibilidad de la lista")
    })
}

export const modificarLista = (setListas, listas, listaEliminar) => {
  setListas(() =>
    listas.filter(lista => lista.nombre !== listaEliminar.nombre)
  );
}

//Refact
export const comprobarSiEstanEnLaLista = (
  productosTotal,
  setResultados,
  setError,
  nombreLista
) => {
  ServicioListas.getListaPorNombre(nombreLista)
    .then((respuesta) => {
      const productosEnLista = respuesta.data?.productos || [];
      const productosActualizados = productosTotal.map((prodResultado) => {
        const enLaLista = productosEnLista.some(
          (prodLista) =>
            prodLista.nombre === prodResultado.nombre &&
            prodLista.supermercado === prodResultado.supermercado &&
            prodLista.precio === prodResultado.precio
        );

        return {
          ...prodResultado,
          enLaLista: enLaLista,
        };
      });

      setResultados(productosActualizados);
    })
    .catch(() => {
      setError("Ha ocurrido un error con la conexión");
    });
};
