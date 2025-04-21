import React from "react";

function TextInputWithLabel({ elementId, ref, onChange, value, lableText }) {
  return (
    <>
      <input id={elementId} onChange={onChange} value={value} ref={ref}></input>
      <label htmlFor={elementId}>{lableText}</label>
    </>
  );
}
export default TextInputWithLabel;
