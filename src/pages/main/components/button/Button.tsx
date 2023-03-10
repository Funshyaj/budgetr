import styled from 'styled-components';
    

export const ButtonContainer = styled.div`
display: flex;
padding: 1.25em 1em;
gap:10px;
align-items: center;
justify-content: space-evenly;

@media (min-width: 1024px) {
    flex-direction: column;
    margin-top: 190px;
    gap:20px;
  }
`;

 interface prop {
    primary: boolean
  }

export const Button = styled.button<prop>`
font-size: 1rem;
display:flex;
gap:10px;
cursor:pointer;
align-items:center;
padding:${props => (props.primary ? "16px 30px;" : "12px 30px;")};
text-align:center;
background-color:${props => (props.primary ? "hsla(235, 57%, 65%, 1)" : "#25D366")};
border: none;
border-radius: 5px;
color: white;
font-weight: bold;

&:active {
    background-color:${props => (props.primary ? "hsla(235, 57%, 55%, 1)" : "#25D360")};
}

@media (min-width: 1024px) {
    width: 100%;
    justify-content: center;
    align-items: center;
    padding:${props => (props.primary ? "17px 30px;" : "12px 30px;")};
    }






`;


