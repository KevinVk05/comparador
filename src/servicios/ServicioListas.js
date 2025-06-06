import httpExterno from "./conexionAxios/http-externo";
import { getAuthHeaders, getToken } from "./token/token";

class ServicioListas {
  getListas() {
    return httpExterno.get(`/listas/todas`, {
      headers: getAuthHeaders(),
    });
  }

  getListasVisibles() {
    return httpExterno.get(`/listas/visibles`, {
      headers: getAuthHeaders(),
    });
  }

  getListaPorNombre(nombre) {
    return httpExterno.get(`/listas/${nombre}`, {
      headers: getAuthHeaders(),
    });
  }

  crearLista(nombreLista) {
    return httpExterno.post(
      `/listas/crear`,
      { nombre: nombreLista },
      {
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "application/json",
        },
      }
    );
  }

  agregarProductoALista(data) {
    return httpExterno.post(`/listas/agregar`, data, {
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json",
      },
    });
  }

  eliminarProductoLista(prod) {
    return httpExterno.delete(`/listas/eliminar-producto`, {
      data: prod,
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json",
      },
    });
  }

  eliminarLista(nombreLista) {
    return httpExterno.delete(`/listas/eliminar/${nombreLista}`, {
      headers: getAuthHeaders(),
    });
  }

  alternarVisibilidadLista(nombre) {
    return httpExterno.put(`/listas/visibilidad/${nombre}`, null, {
      headers: getAuthHeaders(),
    });
  }
}

export default new ServicioListas();
