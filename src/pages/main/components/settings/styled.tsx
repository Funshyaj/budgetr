import styled from 'styled-components';
// Create a Title component that'll render an <h1> tag with some styles

export interface prop {
    primary: boolean
  }

export const Button = styled.button<prop>`
width: 100%;
    font-size: 1em;
    height: 100%;
    padding: 1.25em 1em;
    background-color:${props => (props.primary ? "hsla(235, 57%, 65%, 1)" : "hsla(235, 57%, 60%, 1)")};
   color: white;
   cursor:pointer;
   transition:.3s;
   border:none
`;



// Create a Wrapper component that'll render a <section> tag with some styles
export const Wrapper = styled.header`
position: fixed;
top: 0;
right:0;
left: 0;
box-shadow: 0 0 10px;
right: 0;
display: flex;
justify-content: center;
`;



// Use Title and Wrapper like any other React component – except that they're styled!

 