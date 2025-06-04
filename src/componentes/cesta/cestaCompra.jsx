import Encabezado from '../comunes/encabezados';
import Cesta from './cesta';

const CestaCompra = () => {

  const titulo = "Comparator, tu cesta de la compra al mejor precio"
  const textoEncabezado1 = "Organiza tu cesta de la compra por supermercado, asegurándote de hacerla al menor precio manteniendo la misma calidad."
  const textoEncabezado2 = "Tu cesta de la compra:"

  return (
    <div className="container py-4">
      <Encabezado titulo={titulo} texto1={textoEncabezado1} texto2={textoEncabezado2} img={"imagenes/compra.png"} />
      <Cesta />
    </div>
  )
};

export default CestaCompra;