const BotonScroll = () => {
    return (
        <button className="btn btn-primary border rounded-pill position-sticky"
            style={{
                bottom: "2rem",
                left: "2rem",       
                zIndex: 1050        
            }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V4.707l3.147 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 4.707V11.5A.5.5 0 0 0 8 12z" />
            </svg>
        </button>
    )
}

export default BotonScroll;