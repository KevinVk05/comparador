import { useEffect } from "react";
import ServicioBusquedasFavoritas from "../servicios/ServicioBusquedasFavoritas";
import ServicioCesta from "../servicios/ServicioCesta";

export const filtrarPorSupermercado = (
  resultados,
  supermercadoSeleccionado
) => {
  if (supermercadoSeleccionado !== "Todos los supermercados") {
    return resultados.filter(
      (prod) => prod.supermercado === supermercadoSeleccionado.toUpperCase()
    );
  }
  return resultados;
};

export const comprobarSiEstanEnLaCesta = (
  productosTotal,
  setResultados,
  setError,
  user
) => {
  ServicioCesta.getProdsCesta(user)
    .then((respuesta) => {
      const productosEnCesta = respuesta.data?.productos || [];
      const productosActualizados = productosTotal.map((prodResultado) => {
        const enCesta = productosEnCesta.some(
          (prodCesta) =>
            prodCesta.nombre === prodResultado.nombre &&
            prodCesta.supermercado === prodResultado.supermercado
        );

        return {
          ...prodResultado,
          enLaCesta: enCesta,
        };
      });

      setResultados(productosActualizados);
    })
    .catch(() => {
      setError("Ha ocurrido un error con la conexión");
    });
};

export const comprobarSiProdListaEstanEnLaCesta = async (productos, user) => {
  try {
    const respuesta = await ServicioCesta.getProdsCesta(user);
    const productosEnCesta = respuesta.data?.productos || [];
    return productos.map((prod) => ({
      ...prod,
      enLaCesta: productosEnCesta.some(
        (p) =>
          p.nombre === prod.producto.nombre &&
          p.supermercado === prod.producto.supermercado
      ),
    }));
  } catch (error) {
    return productos;
  }
};

export const cambiarImgFavoritos = (imagen, setImagen) => {
  setImagen(
    imagen === "/imagenes/fav1.png"
      ? "/imagenes/fav2.png"
      : "/imagenes/fav1.png"
  );
};

export const dividirResultadosPorSupermercados = (
  productos,
  setProductosPorSupermercado
) => {
  const clasificados = {
    mercadona: [],
    carrefour: [],
    dia: [],
    ahorramas: [],
  };

  productos.forEach((prod) => {
    const supermercado = prod.supermercado.toLowerCase();

    if (clasificados[supermercado]) {
      clasificados[supermercado].push(prod);
    }
  });
  setProductosPorSupermercado(clasificados);
};

export const obtenerIdProducto = (producto) =>
  `producto-cesta-${producto.precio}-${producto.nombre}`;

// src/herramientas/handlersBusqueda.js

export const handleInputChange = async (
  e,
  setProducto,
  setFavoritoGuardado,
  favoritoGuardado,
  cambiarImgFavoritos,
  imagen,
  setImagen,
  user
) => {
  setProducto(e.target.value);

  if (favoritoGuardado) {
    cambiarImgFavoritos(imagen, setImagen);
  }

  const prod = {
    usuario: user,
    nombreBusqueda: e.target.value,
  };

  const esFav = await comprobarEsFav(prod);

  if (esFav) {
    setFavoritoGuardado(true);
    cambiarImgFavoritos(imagen, setImagen);
  } else {
    setFavoritoGuardado(false);
  }
};

const comprobarEsFav = async (prod) => {
  try {
    const respuesta = await ServicioBusquedasFavoritas.isBusquedaFav(prod);
    return respuesta.data.esFavorito;
  } catch (error) {
    return false;
  }
};

export const manejarFavoritos = (
  producto,
  setError,
  favoritoGuardado,
  user,
  eliminarBusquedaFav,
  anadirBusquedaFav,
  setCambioBusquedasFavoritas
) => {
  if (!producto.trim()) {
    setError("Introduzca el nombre de un producto.");
  } else {
    const busquedaFav = {
      usuario: user,
      nombreBusqueda: producto,
    };

    if (favoritoGuardado) {
      eliminarBusquedaFav(busquedaFav, setCambioBusquedasFavoritas);
    } else {
      anadirBusquedaFav(busquedaFav, setCambioBusquedasFavoritas);
    }
  }
};

//Solo queremos saber si hay alguna lista con mínimo un elemento
//Dependiendo de ellos el estado de búsqueda va a ser diferente
export const listaConResultados = (lista) => {
  return Object.values(lista).some((arr) => arr.length > 0) || [];
};

export const scrollArriba = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);
};
