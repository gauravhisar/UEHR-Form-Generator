export default function LangSelector({  ln, setLanguage, langs }) {
  const onLanguageChangeHandler = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <select
      className="form-select"
      value={ln}
      onChange={onLanguageChangeHandler}
      aria-label="Default select example"
    >
      {langs.map((lang) => {
        return (
          <option key={lang} value={lang}>
            {lang}
          </option>
        );
      })}
    </select>
  );
}
