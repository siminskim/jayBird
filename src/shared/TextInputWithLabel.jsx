import React from 'react';
function TextInputWithLabel({ elementId, ref, onChange, value, labelText }) {
  return (
    <>
      <input id={elementId} onChange={onChange} value={value} ref={ref} type='text'></input>
      <label htmlFor={elementId}>{labelText}</label>
    </>
  );
}

export default TextInputWithLabel;
