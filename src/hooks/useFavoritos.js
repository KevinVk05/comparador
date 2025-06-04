import { useState } from "react";
import { cambiarImgFavoritos } from "../herramientas/general";
import ServicioBusquedasFavoritas from "../servicios/ServicioBusquedasFavoritas";

export const useFavoritos = (setError) => {
  const [imagen, setImagen] = useState("/imagenes/fav1.png");
  const [favoritoGuardado, setFavoritoGuardado] = useState(false);

  const eliminarBusquedaFav = async (
    busquedaFavEliminar,
    setCambioBusquedasFavoritas
  ) => {
    try {
      await ServicioBusquedasFavoritas.eliminarBusquedaFav(busquedaFavEliminar);
      cambiarImgFavoritos(imagen, setImagen);
      setFavoritoGuardado(false);
      setCambioBusquedasFavoritas(Math.random());
    } catch (err) {
      setError("Ha ocurrido un error al eliminar la búsqueda a favoritos");
    }
  };

  const anadirBusquedaFav = async (
    busquedaFavAnadir,
    setCambioBusquedasFavoritas
  ) => {
    try {
      await ServicioBusquedasFavoritas.anadirBusquedaFav(busquedaFavAnadir);
      cambiarImgFavoritos(imagen, setImagen);
      setFavoritoGuardado(true);
      setCambioBusquedasFavoritas(Math.random());
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return {
    imagen,
    setImagen,
    favoritoGuardado,
    eliminarBusquedaFav,
    anadirBusquedaFav,
    setFavoritoGuardado,
  };
};
