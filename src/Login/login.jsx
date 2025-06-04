import "../estilos/login.css"
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import ServicioUsuario from '../servicios/ServicioUsuario';
import { cambioForm, esEmailValido, iniciarTemporizador } from "../herramientas/login";

const BLOQUEO_KEY = 'loginBloqueadoHasta';
const INTENTOS_KEY = 'intentosFallidos';
const TIEMPO_BLOQUEO_MS = 3 * 60 * 1000;
const MAX_INTENTOS = 5;

const Login = () => {

    const [loginUsuario, setLoginUsuario] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const [signupUsuario, setSignupUsuario] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [signupPasswordConfirm, setSignupPasswordConfirm] = useState('');

    const [errorLogin, setErrorLogin] = useState('');
    const [errorSignup, setErrorSignup] = useState('');

    const { login, admin } = useAuth();
    const navigate = useNavigate();

    const [bloqueado, setBloqueado] = useState(false);
    const [tiempoRestante, setTiempoRestante] = useState(0);

    const intervaloRef = useRef(null);

    useEffect(() => {
        const bloqueoHastaStr = localStorage.getItem(BLOQUEO_KEY);
        if (bloqueoHastaStr) {
            const bloqueoHasta = parseInt(bloqueoHastaStr, 10);
            const ahora = Date.now();

            if (bloqueoHasta > ahora) {
                setBloqueado(true);
                setTiempoRestante(Math.ceil((bloqueoHasta - ahora) / 1000));
                iniciarTemporizador(bloqueoHasta, intervaloRef, setBloqueado, setTiempoRestante)
            } else {
                localStorage.removeItem(BLOQUEO_KEY);
                localStorage.removeItem(INTENTOS_KEY);
            }
        }
        return () => clearInterval(intervaloRef.current);
    }, []);

    const handleSubmitLogin = async (e) => {
        e.preventDefault();

        if (!esEmailValido(loginUsuario)) {
            setErrorLogin("Introduce un correo electrónico válido");
            return;
        }

        if (bloqueado) {
            return;
        }

        try {
            const respuesta = await ServicioUsuario.login({
                nombre: loginUsuario.toLowerCase(),
                contrasena: loginPassword
            });
            if (respuesta.status === 200) {
                const token = respuesta.data.token;
                localStorage.setItem('token', token);
                admin(respuesta.data.esAdmin)
                login(loginUsuario.toLowerCase());
                if (respuesta.data.esAdmin ? navigate("/administrarListas") : navigate("/"));
            }
        } catch (error) {

            let intentos = parseInt(localStorage.getItem(INTENTOS_KEY)) || 0;
            intentos += 1;
            localStorage.setItem(INTENTOS_KEY, intentos);

            if (intentos >= MAX_INTENTOS) {
                const bloqueoHasta = Date.now() + TIEMPO_BLOQUEO_MS;
                localStorage.setItem(BLOQUEO_KEY, bloqueoHasta);
                setErrorLogin("")
                setBloqueado(true);
                setTiempoRestante(TIEMPO_BLOQUEO_MS / 1000);
                iniciarTemporizador(bloqueoHasta, intervaloRef, setBloqueado, setTiempoRestante)
            } else {
                if (error.response && error.response.data) {
                    setErrorLogin(error.response.data);
                } else {
                    setErrorLogin('Error de conexión');
                }
            }
        };
    }
    const handleSignupSubmit = async (e) => {
        e.preventDefault();

        if (!esEmailValido(signupUsuario)) {
            setErrorSignup("Introduce un correo electrónico válido");
            return;
        }

        if (signupPassword !== signupPasswordConfirm) {
            setErrorSignup('Las contraseñas no coinciden');
            return;
        }

        if (signupPassword.length < 6) {
            setErrorSignup('La contraseña debe tener al menos 6 caracteres');
            return;
        }
        try {
            const respuesta = await ServicioUsuario.registrar({
                nombre: signupUsuario.toLowerCase(),
                contrasena: signupPassword
            });

            if (respuesta.status === 201) {
                try {
                    const loginRespuesta = await ServicioUsuario.login({
                        nombre: signupUsuario.toLowerCase(),
                        contrasena: signupPassword
                    });

                    if (loginRespuesta.status === 200) {
                        const token = loginRespuesta.data.token;
                        localStorage.setItem('token', token);
                        login(signupUsuario.toLowerCase());
                        admin(respuesta.data.esAdmin)
                        if (respuesta.data.esAdmin ? navigate("/administrarListas") : navigate("/"));
                    }
                } catch (loginError) {
                    setErrorSignup("Usuario registrado, pero hubo un problema al iniciar sesión.");
                }
            } else {
                setErrorSignup("Error desconocido al registrar usuario");
            }
        } catch (err) {
            if (err.response && err.response.status === 400) {
                setErrorSignup("El nombre de usuario ya existe");
            } else {
                setErrorSignup("Error al registrar usuario");
            }
        }
    }

    return (
        <section className="h-100 gradient-form">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-xl-10">
                        <div className="card rounded-3 text-black">
                            <div className="row g-0">
                                <div id="cortina" className="top-0 end-0 w-50 h-100 d-flex align-items-center z-3 position-absolute d-none d-lg-block">
                                    <div className="px-3 py-4 p-md-5 mx-md-4">
                                        <h1>Comparator</h1>
                                        <h4 className="mb-4">Descubre la forma más inteligente de hacer la compra</h4>
                                        <p className="small mb-0">En Comparator podrás comparar precios de productos en diferentes supermercados para ahorrar tiempo y dinero.
                                            Crea tu cuenta para guardar tus cestas, realizar búsquedas personalizadas y encontrar siempre la mejor oferta.</p>
                                    </div>
                                </div>
                                <div className="position-relative d-flex justify-content-lg-start justify-content-center">
                                    <div id="login-form" className="col-lg-6 position-absolute position-lg-static form-visible">
                                        <div className="card-body p-md-5 mx-md-4">

                                            <div className="text-center">
                                                <img src="./imagenes/logoLogin.png"
                                                    style={{ width: 165 }} alt="logo" />
                                                <h4 className="mt-1 mb-4 pb-1">Iniciar sesión</h4>
                                            </div>

                                            {errorLogin && <div className="alert alert-danger">{errorLogin}</div>}
                                            {bloqueado && (
                                                <div className="alert alert-warning mt-3">
                                                    Has alcanzado el máximo de intentos. Intenta de nuevo en <b>
                                                        {Math.floor(tiempoRestante / 60)}:{(tiempoRestante % 60).toString().padStart(2, '0')}
                                                    </b> minutos.
                                                </div>
                                            )}


                                            <form onSubmit={handleSubmitLogin}>
                                                <div data-mdb-input-init className="form-outline mb-4">
                                                    <label className="form-label" htmlFor="correoInicioSesion">Correo:</label>
                                                    <input type="email"
                                                        className="form-control"
                                                        placeholder="ainhoa@ejemplo.com"
                                                        value={loginUsuario}
                                                        onChange={(e) => setLoginUsuario(e.target.value)}
                                                        required />
                                                </div>

                                                <div data-mdb-input-init className="form-outline mb-4">
                                                    <label className="form-label" htmlFor="constrasenaInicioSesion">Contraseña:</label>
                                                    <input type="password"
                                                        className="form-control"
                                                        placeholder="*******"
                                                        value={loginPassword}
                                                        onChange={(e) => setLoginPassword(e.target.value)}
                                                        required
                                                    />
                                                </div>

                                                <div className="text-center mb-4">
                                                    <button data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit">Iniciar sesión</button>
                                                </div>

                                                <div className="d-flex align-items-center justify-content-center">
                                                    <p className="mb-0 me-2">¿No tienes cuenta?</p>
                                                    <button onClick={() => cambioForm(false, setErrorSignup, setErrorLogin)} type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-danger">¡Registrate!</button>
                                                </div>
                                            </form>

                                        </div>
                                    </div>
                                    <div id="registro-form" className="col-lg-6">
                                        <div className="card-body p-md-5 mx-md-4">
                                            <div className="text-center">
                                                <img src="./imagenes/logoLogin.png"
                                                    style={{ width: 165 }} alt="logo" />
                                                <h4 className="mt-1 mb-4 pb-1">Registrar una nueva cuenta:</h4>
                                            </div>

                                            {errorSignup && <div className="alert alert-danger">{errorSignup}</div>}

                                            <form onSubmit={handleSignupSubmit}>
                                                <div data-mdb-input-init className="form-outline mb-4">
                                                    <label className="form-label">Correo:</label>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        placeholder="ainhoa@ejemplo.com"
                                                        value={signupUsuario}
                                                        onChange={(e) => setSignupUsuario(e.target.value)}
                                                        required
                                                    />
                                                </div>

                                                <div data-mdb-input-init className="form-outline mb-4">
                                                    <label className="form-label">Contraseña:</label>
                                                    <input type="password"
                                                        className="form-control"
                                                        placeholder="*******"
                                                        value={signupPassword}
                                                        onChange={(e) => setSignupPassword(e.target.value)}
                                                        required
                                                    />
                                                </div>

                                                <div data-mdb-input-init className="form-outline mb-4">
                                                    <label className="form-label">Confirma la ontraseña:</label>
                                                    <input type="password"
                                                        className="form-control"
                                                        placeholder="*******"
                                                        value={signupPasswordConfirm}
                                                        onChange={(e) => setSignupPasswordConfirm(e.target.value)}
                                                        required
                                                    />
                                                </div>

                                                <div className="text-center mb-4">
                                                    <button data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit">Registrarse</button>
                                                </div>

                                                <div className="d-flex align-items-center justify-content-center">
                                                    <p className="mb-0 me-2">Ya tienes una cuenta?</p>
                                                    <button onClick={() => cambioForm(true, setErrorSignup, setErrorLogin)} type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-danger">¡Inicia sesión!</button>
                                                </div>
                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login;