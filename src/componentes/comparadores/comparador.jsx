import {  useState } from 'react';
import ServicioProductos from '../../servicios/ServicioProductos';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../estilos/comparador.css"
import { cambiarImgFavoritos, comprobarSiEstanEnLaCesta, filtrarPorSupermercado, handleInputChange, manejarFavoritos, scrollArriba } from '../../herramientas/general';
import { useAuth } from '../../Login/AuthProvider';
import { useFavoritos } from '../../hooks/useFavoritos';
import BusquedasFavoritas from '../comunes/busquedasFavoritas';
import ResultadoBusqueda from './resultadoBusqueda';
import ListasPredeterminadas from './listasPredeterminadas';
import EncabezadoComparador from './encabezadoComparador';

const Comparador = () => {

  const [producto, setProducto] = useState('');
  const [resultados, setResultados] = useState([]);
  const [supermercadoSeleccionado, setSupermercadoSeleccionado] = useState("Todos los supermercados");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cambioBusquedasFavoritas, setCambioBusquedasFavoritas] = useState(1)

  const { user } = useAuth();

  const titulo = "Comparator, tu comparador de confianza"
  const textoEncabezado1 = "Descubre la manera más fácil y eficiente de realizar tus compras online con nuestro comparador de precios entre supermercados."
  const textoEncabezado2 = "Introduce tu producto y compara precios en segundos entre los principales supermercados."

  const {
    imagen,
    setImagen,
    favoritoGuardado,
    eliminarBusquedaFav,
    anadirBusquedaFav,
    setFavoritoGuardado
  } = useFavoritos(setError);

  const manejarSubmit = async (e) => {
    e.preventDefault();
    realizarBusqueda()
  };

  scrollArriba()

  const realizarBusqueda = (nombreProducto) => {
    const productoABuscar = nombreProducto || producto
    if (!productoABuscar.trim()) {
      setResultados([]);
      setError("Introduzca el nombre de un producto.")
    } else {
      setLoading(true);

      ServicioProductos.buscarProducto(productoABuscar.trim().toLowerCase()).then(respuesta => {
        if (respuesta.data && respuesta.data.length > 0) {
          setResultados(respuesta.data)
          setError(null);
          setLoading(false);
          comprobarSiEstanEnLaCesta(respuesta.data, setResultados, setError, user)
        } else {
          setError('No se encontraron productos.');
          setResultados([]);
          setLoading(false);
        }
      }).catch((error) => {
        setError('Ha ocurrido un error con la conexión');
        setResultados([]);
        setLoading(false);
      });
    }
  }

  const hacerBusquedaFavorita = (nombreProd) => {
    setProducto(nombreProd)
    //Como no se actualiza instantáneamente la pasamos por parámetro por si acaso
    realizarBusqueda(nombreProd)
  }

  return (
    <div className="container py-4">
      <EncabezadoComparador titulo={titulo} texto1={textoEncabezado1} texto2={textoEncabezado2} img={"imagenes/compra.png"} />

      <form className="d-flex flex-wrap justify-content-center gap-2" onSubmit={manejarSubmit}>
        <div style={{ width: 35, height: 35 }} className='d-flex align-items-center justify-content-center'>
          <img src={imagen} onClick={() => manejarFavoritos(producto, setError, favoritoGuardado, user, eliminarBusquedaFav, anadirBusquedaFav, setCambioBusquedasFavoritas)}
            alt="favoritos" title='Añadir búsqueda a favoritos' className='cursor-pointer w-100 h-100' />
        </div>
        <input
          type="text"
          className="form-control w-50"
          placeholder="Busca el producto"
          value={producto}
          onChange={(e) => handleInputChange(e, setProducto, setFavoritoGuardado, favoritoGuardado, cambiarImgFavoritos, imagen, setImagen, user)}
        />
        <select name="supermercado" id='selectSupermercado' className='form-select w-auto' onChange={(e) => setSupermercadoSeleccionado(e.target.value)}>
          <option value="Todos los supermercados">Todos los supermercados</option>
          <option value="Mercadona">Mercadona</option>
          <option value="Ahorramas">Ahorra más</option>
          <option value="Carrefour">Carrefour</option>
          <option value="Dia">Día</option>
        </select>
        <button type="submit" className="btn btn-success">Buscar</button>
      </form>

      <BusquedasFavoritas hacerBusquedaFavorita={hacerBusquedaFavorita} setError={setError} favoritoGuardado={favoritoGuardado} cambioBusquedasFavoritas={cambioBusquedasFavoritas} setCambioBusquedasFavoritas={setCambioBusquedasFavoritas} />

      <ResultadoBusqueda producto={producto} resultados={filtrarPorSupermercado(resultados, supermercadoSeleccionado)} setResultados={setResultados} loading={loading} error={error} setError={setError} />

      <ListasPredeterminadas />

    </div>
  );
};

export default Comparador;
