const EstadoBusqueda = ({ loading, error, resultados, tipo }) => {

    return (
        <div>
            {!loading && !error && resultados.length === 0 && (
                <div>
                    {tipo === "COMPARADOR" && (
                        <div className="text-center py-5 my-2">
                            <img src="/imagenes/estadoBusqueda/buscador.png" alt="Empieza la búsqueda" style={{ width: "15%" }}  />
                            <div className='textoEstado fw-semibold'>!Empieza ya la búsqueda!</div>
                        </div>
                    )}
                    {tipo === "CESTA" && (
                        <div className="text-center py-5 my-5">
                            <img src="/imagenes/estadoBusqueda/cestaVacia.png" alt="Empieza la búsqueda" style={{ width: "18%" }} />
                            <div className='textoEstado fw-semibold'>No se han encontrado productos en la cesta.</div>
                        </div>
                    )}
                    {(tipo === "LISTASPREDETERMINADAS" || tipo === "LISTAS")  && (
                        <div className="d-flex justify-content-center my-5">
                            <div className='alert alert-danger text-center w-50'>
                                No se ha encontrado ninguna lista.
                            </div>
                        </div>
                    )}
                </div>
            )}

            {loading && (
                <div className="text-center my-4 py-2">
                    <img src="/imagenes/loading.gif" alt="Cargando..." className='loading' style={{ height: 130 }} />
                </div>
            )}

            {error && !loading && (
                <div className="d-flex justify-content-center my-4 py-2">
                    <div className='alert alert-danger text-center w-50'>
                        {error}
                    </div>
                </div>
            )}
        </div>
    )
}

export default EstadoBusqueda;