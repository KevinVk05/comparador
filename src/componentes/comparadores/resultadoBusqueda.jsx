import EstadoBusqueda from "../comunes/estadoBusqueda";
import CardProducto from './cardProducto';

const ResultadoBusqueda = ({ producto, resultados, setResultados, loading, error, setError }) => {

    return (
        <div>
            <EstadoBusqueda loading={loading} error={error} resultados={resultados} tipo={"COMPARADOR"}/>
            {resultados.length > 0 && !loading && (
                <section className="p-3">
                    <p className="text-center p-4 fs-4">Producto comparado: {producto}</p>
                    <div className='d-flex flex-wrap justify-content-center align-items-stretch gap-3'>
                        {resultados.map((item, index) => (
                            <div key={index} className="product-card mb-3 shadow-sm">
                                <CardProducto item={item} setError={setError} setResultados={setResultados} resultados={resultados} prodPerteneceListaPred={false}/>
                            </div>
                        ))}
                    </div>

                </section>
            )}
        </div>
    )
}

export default ResultadoBusqueda;