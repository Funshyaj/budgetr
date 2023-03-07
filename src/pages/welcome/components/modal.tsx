import applogo from "../../../assets/logo.png";

interface Props{
    setModal:()=>void
    init:()=>void
}

const Modal: React.FC<Props> = ({setModal,init}) => {


    return ( <div className="welcome-modal">
        <div>
            <div className="img"><img src={applogo} alt="logo" /></div>
            <h1>Budgetr</h1>
            <p>Don't overspend, Use budgetr!</p>
        </div>
        <div>
            <button onClick={() => {
                setModal();
                init();
            }}>Get started</button>
        </div>
    </div> );
}
 
export default Modal;