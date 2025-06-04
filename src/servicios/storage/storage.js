class LocalStorageServicio {
    static get(valor) {
      try {
        const item = window.localStorage.getItem(valor);
        return item ? JSON.parse(item) : null;
      } catch (error) {
        return null;
      }
    }
  
    static set(clave, valor) {
      try {
        window.localStorage.setItem(clave, JSON.stringify(valor));
      } catch (error) {
      }
    }
  
    static remove(valor) {
      try {
        window.localStorage.removeItem(valor);
      } catch (error) {
      }
    }
  
    static clear() {
      try {
        window.localStorage.clear();
      } catch (error) {
      }
    }
  }
  
  export default LocalStorageServicio;
  