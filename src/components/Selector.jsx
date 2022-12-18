export default function Selector({  value, onValueChangeHandler, options }) {
  

  return (
    <select
      className="form-select"
      value={value}
      onChange={onValueChangeHandler}
      aria-label="Default select example"
    >
      {options.map((option) => {
        return (
          <option key={option} value={option}>
            {option}
          </option>
        );
      })}
    </select>
  );
}
