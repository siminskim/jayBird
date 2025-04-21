function TextInputWithLabel({ elementId, ref, onChange, value, lableText }) {
  return (
    <>
      <label htmlFor={elementId}>{lableText}</label>
      <input id={elementId} onChange={onChange} value={value} ref={ref}></input>
    </>
  );
}
export default TextInputWithLabel;
