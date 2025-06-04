import ReactDOM from 'react-dom'
import '../../estilos/modal.css'

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content m-4">
        <button className="btn btn-danger position-absolute top-0 end-0 m-2" onClick={onClose}><svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="white" className="bi bi-x-lg" viewBox="0 0 16 16">
  <path d="M2.146 2.146a.5.5 0 0 1 .708 0L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854a.5.5 0 0 1 0-.708z"/>
</svg></button>
        <div className='mt-3'>
          {children}
        </div>
      </div>
    </div>,
        document.body
  );
};

export default Modal;

