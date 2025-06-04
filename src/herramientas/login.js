export function toggle() {
  const cortina = document.getElementById("cortina");
  const login = document.getElementById("login-form");
  const registro = document.getElementById("registro-form");

  if (cortina.classList.contains("left")) {
    cortina.classList.add("right");
    cortina.classList.remove("left");

    login.classList.add("form-visible");
    registro.classList.remove("form-visible");
  } else {
    cortina.classList.add("left");
    cortina.classList.remove("right");

    login.classList.remove("form-visible");
    registro.classList.add("form-visible");
  }
}

export const esEmailValido = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const cambioForm = (esLogIn, setErrorSignup, setErrorLogin) => {
  toggle()
  cambioError(esLogIn, setErrorSignup, setErrorLogin)
}

export const cambioError = (esLogIn, setErrorSignup, setErrorLogin) => {
  if (esLogIn) {
    setErrorSignup("")
  } else {
    setErrorLogin("")
  }
}

export const iniciarTemporizador = (finBloqueo, intervaloRef, setBloqueado, setTiempoRestante) => {
  intervaloRef.current = setInterval(() => {
    const ahora = Date.now();
    if (finBloqueo <= ahora) {
      setBloqueado(false);
      setTiempoRestante(0);
      localStorage.removeItem(BLOQUEO_KEY);
      localStorage.removeItem(INTENTOS_KEY);
      clearInterval(intervaloRef.current);
    } else {
      setTiempoRestante(Math.ceil((finBloqueo - ahora) / 1000));
    }
  }, 1000);
};