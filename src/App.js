import ListBox from "./listBox";
import Search from "./Search";
import "./styles.css";

// const API = ``;

export default function App() {
  const dataPromise = async (query, signal) =>
    await fetch(`https://swapi.dev/api/people/?search=${query}`, { signal });
  return (
    <div className="wrapper">
      <Search
        placeholder={"Enter your favourite Character"}
        name={"typeahead"}
        debounceWait={500}
        autoCompleteOption
        noItems={() => <div>No items found</div>}
        errorMessage={() => <div>Some error happened</div>}
        //  getData={getdata}
        styles={{
          label: "label",
          input: "input"
        }}
        label={"Enter person name"}
        listBox={(items, activeIndex) => (
          <ListBox items={items} activeIndex={activeIndex} />
        )}
        dataPromise={dataPromise}
        maxItems={4}
      />
    </div>
  );
}
