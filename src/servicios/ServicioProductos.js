import httpExterno from "./conexionAxios/http-externo";
import http from "./conexionAxios/http-axios";
import { getAuthHeaders } from "./token/token";

class ServicioProductos {
  buscarProducto(nombre) {
    return httpExterno.get(`/productos/precioGranel/${nombre}`, {
      headers: getAuthHeaders(),
    });
  }

  prods() {
    return http.get("/productos", {
      headers: getAuthHeaders(),
    });
  }

  prodsCesta() {
    return http.get("/productosCesta", {
      headers: getAuthHeaders(),
    });
  }

  buscarProductoSupermercadosConcretos(nombre, supermercados) {
    return httpExterno.get(
      `/productos/precioGranel/${nombre}/${supermercados}`,
      {
        headers: getAuthHeaders(),
      }
    );
  }

  buscarCesta(correoUsuario) {
    return httpExterno.get(`/productos/${correoUsuario}`, {
      headers: getAuthHeaders(),
    });
  }
}

export default new ServicioProductos();
