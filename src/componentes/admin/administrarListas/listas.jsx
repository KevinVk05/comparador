import { useEffect, useState } from "react";
import ServicioListas from "../../../servicios/ServicioListas";
import EstadoBusqueda from "../../comunes/estadoBusqueda";
import ResultadosListas from "./resultadosListas";

const Listas = ({ listas, setListas, setError, loading, error }) => {

    return (
        <div>
            <EstadoBusqueda loading={loading} error={error} resultados={listas} tipo={"LISTAS"}/>
            <ResultadosListas listas={listas} setListas={setListas} setError={setError}/>
        </div>
    )
}

export default Listas;