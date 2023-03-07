interface Props{
    setModal:()=>void
}

const Modal: React.FC<Props> = ({setModal}) => {

    // onClick={()=>init()


    return ( <div className="welcome-modal">
        <div>
            <img src="" alt="logo" />
            <h1>Budgetr</h1>
            <p>Don't overspend, Use budgetr!</p>
        </div>
        <div>
            <button onClick={()=>setModal()}>Get started</button>
        </div>
    </div> );
}
 
export default Modal;