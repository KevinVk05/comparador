import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useAuth } from '../../Login/AuthProvider';
import { useNavigate } from 'react-router-dom';
import "../../estilos/menu.css"

const MenuSuperior = () => {

  const { user, logout, esAdmin } = useAuth();
  const handleNavLinkClick = () => setIsNavbarCollapsed(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsNavbarCollapsed(true)
    navigate('/login');
  };

  const userAcortado = () => {
    var userMostrar = user ? user.split('@')[0] : "";
    return userMostrar
  }
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);

  useEffect(() => {
    setIsNavbarCollapsed(true)
  }, [])

  return (
    <nav className="navbar navbar-expand-lg navbar-dark px-3 menu-superior fixed-top" >
      <Link className="navbar-brand" to="/">
        <img
          src="/imagenes/logo-menu.png"
          alt="Supermercado"
          width="40"
          height="40"
          className="d-inline-block align-top"
        />
        <span className="mx-3 d-inline-block align-top">
          <span className="fw-bold fs-4">Comparator</span>
        </span>
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        onClick={() => setIsNavbarCollapsed(!isNavbarCollapsed)}
        aria-controls="navbarNav"
        aria-expanded={!isNavbarCollapsed}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className={`collapse navbar-collapse ${!isNavbarCollapsed ? "show" : ""}`} id="navbarNav">
        <ul className="navbar-nav ms-auto d-flex align-items-center">
          {user === null ? (
            ""
          ) : (
            <>
              {esAdmin === true ? (
                <>
                  <li className="nav-item mx-2">
                    <Link className="nav-link" to="/administrarListas"
                      onClick={() => setIsNavbarCollapsed(true)}>Administrar Listas</Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item mx-2">
                    <Link className="nav-link" to="/"
                      onClick={handleNavLinkClick}>Comparador de supermercados</Link>
                  </li>
                  <li className="nav-item mx-2">
                    <Link className="nav-link" to="/comparador2"
                      onClick={handleNavLinkClick}>Comparador entre 2 supermercados</Link>
                  </li>
                  <li className="nav-item mx-2 d-flex align-items-center">
                    <Link className="nav-link" to="/cestaCompra"
                      onClick={handleNavLinkClick}>Cesta de la compra</Link>
                  </li>
                  <li className="nav-item mx-2 d-flex align-items-center">
                    <span className="saludo nav-link">Hola, {userAcortado()}</span>
                  </li>
                  {/* <li className="nav-item d-flex align-items-center justify-content-center m-2" style={{ width: 32, height: 32 }}>
                    <div
                      className="btn-carrito">
                    </div>
                  </li> */}
                </>
              )}
              <li className="nav-item d-flex align-items-center justify-content-center m-2" style={{ width: 32, height: 32 }}>
                <div
                  onClick={handleLogout}
                  className="btn-salir">
                </div>

              </li>

            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default MenuSuperior;
