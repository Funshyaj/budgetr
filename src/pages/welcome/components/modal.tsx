import applogo from "../../../assets/logo.png";

interface Props{
    setModal:()=>void
}

const Modal: React.FC<Props> = ({setModal}) => {

    // onClick={()=>init()


    return ( <div className="welcome-modal">
        <div>
            <div className="img"><img src={applogo} alt="logo" /></div>
            <h1>Budgetr</h1>
            <p>Don't overspend, Use budgetr!</p>
        </div>
        <div>
            <button onClick={()=>setModal()}>Get started</button>
        </div>
    </div> );
}
 
export default Modal;