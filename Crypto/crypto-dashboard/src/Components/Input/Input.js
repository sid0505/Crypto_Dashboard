import React,{ useState } from "react";
import { render } from "react-dom";
import "./Input.css";

const Input = ({ val, labelledAs, locked, type, setVal }) => {

  const [active, setActive] = useState((locked && active) || false);
  const [value, setValue] = useState(val);
  const [error, setError] = useState("");
  const [label, setLabel] = useState(labelledAs);



  const fieldClassName = `field ${(locked ? active : active) &&
      "active"} ${locked && !active && "locked"}`;

  return (
    <div className={fieldClassName}>
        <input
          id={1}
          type={type}
          value={value}
          placeholder={label}
          onChange={(event)=>{
            setError("");
            setValue(event.target.value);
            setVal(event.target.value);
          }}
          onKeyPress={(event)=>{
            if(event.which===13){
              setActive(false);
            }
          }}
          onFocus={() => {!locked && setActive(true)}}
          onBlur={() => {
            !locked && setActive(false);
          }}
        />
        <label htmlFor={1} className={error && "error"}>
          {error || label}
        </label>
      </div>
  )
}

export default Input