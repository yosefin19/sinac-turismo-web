import React from "react";
import '../../assets/Switch.css'

const Switch = ({ isTrue, handleToggle }) => {
    return (
      <>
        <input
          checked={isTrue}
          onChange={handleToggle}
          className="react-switch-checkbox"
          id={`react-switch-new`}
          type="checkbox"
        />
        <label
        style={{ background: isTrue && '#06D6A0' }}
        className="react-switch-label"
        htmlFor={`react-switch-new`}
        >
          <span className={`react-switch-button`} />
        </label>
      </>
    );
  };
  
  export default Switch;