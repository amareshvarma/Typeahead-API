import { useState } from "react";
import useFetchPromise from "./useFetchPromise";

const Search = ({
  placeholder,
  debounceWait,
  noItems,
  errorMessage,
  autoCompleteOption,
  listBox,
  styles,
  label,
  name,
  dataPromise,
  maxItems
}) => {
  const [query, setQuery] = useState("");

  const [activeIndex, setActiveIndex] = useState(null);
  const [isAutoComplete, setIsAutoComplete] = useState(autoCompleteOption);
  const [data, setData, error] = useFetchPromise(
    query,
    dataPromise,
    debounceWait,
    maxItems,
    isAutoComplete
  );
  // console.log("ths is", autoComplete, query);
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyUp = (e) => {
    const keyCode = e.keyCode;
    console.log(keyCode);

    if (keyCode === 13) {
      if (activeIndex === null) return;
      setQuery(data[activeIndex].name);
      setData(null);
      setActiveIndex(null);
      setIsAutoComplete(false);
      console.log("inside 13");
      return;
    }
    console.log("outside the enter");
    setIsAutoComplete(true);
    if (!data || data.length === 0) return;
    if (keyCode === 40) {
      // console.log("inside 40", activeIndex);
      if (activeIndex === null || activeIndex === data.length - 1) {
        setActiveIndex(0);
      } else {
        setActiveIndex((prevIndex) => prevIndex + 1);
      }
    } else if (keyCode === 38) {
      if (activeIndex === 0) setActiveIndex(data.length - 1);
      else setActiveIndex((prevIndex) => prevIndex - 1);
    }
    console.log(activeIndex);
  };

  return (
    <>
      <label className={styles.label} for={name}>
        {label}
      </label>
      <br />
      <input
        name={name}
        value={query}
        className={styles.input}
        onChange={handleChange}
        autoComplete="off"
        onKeyUp={handleKeyUp}
        placeholder={placeholder}
      />
      {data && data.length > 0 && listBox(data, activeIndex)}
      {query && data && data.length === 0 && noItems()}
      {error && errorMessage()}
    </>
  );
};

export default Search;
