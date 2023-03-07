import { Button, Wrapper  } from "./styled";
import  { useState } from 'react';

type click={
  handleFixedSwitch :()=>void
  handleNonFixedSwitch :()=>void
}

const Settings = ({handleFixedSwitch,handleNonFixedSwitch}:click) => {

 const [color1, setColor1] = useState<boolean>(true)
  const [color2, setColor2] = useState<boolean>(false)


return(
    <Wrapper>
      <Button  primary={color1} onClick={()=>{
        handleFixedSwitch()
        setColor1(true)
        setColor2(false)}}>Fixed</Button>

      <Button  primary={color2} onClick={()=>{
        handleNonFixedSwitch()
        setColor1(false)
        setColor2(true)}}>Non Fixed</Button>
      </Wrapper>
);
}
 
export default Settings;