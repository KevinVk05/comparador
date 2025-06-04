import httpExterno from "./conexionAxios/http-externo";
import { getAuthHeaders } from "./token/token";

class ServicioBusquedasFavoritas {
  anadirBusquedaFav(favoritoAnadir) {
    return httpExterno.post(`/favoritos`, favoritoAnadir, {
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json"
      }
    });
  }

  eliminarBusquedaFav(favoritoEliminar) {
    return httpExterno.delete(`/favoritos`, {
      data: favoritoEliminar,
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json"
      }
    });
  }

  getBusquedasFavs(user) {
    return httpExterno.get(`/favoritos/${user}`, {
      headers: getAuthHeaders(),
    })
  }

  isBusquedaFav(busqueda) {
    return httpExterno.post(`/favoritos/verificar`, busqueda, {
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json"
      }
    });
  }

}

export default new ServicioBusquedasFavoritas();
