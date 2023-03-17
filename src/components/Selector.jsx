import ISO6391 from "iso-639-1";

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

export function LangSelector({  value, onValueChangeHandler, options }) {
  

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
            {ISO6391.getName(option) ? ISO6391.getName(option) : option}
          </option>
        );
      })}
    </select>
  );
}
