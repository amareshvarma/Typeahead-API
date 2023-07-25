import "./listBox.css";
const ListBox = ({ items, activeIndex }) => {
  console.log("in the listbox comp", activeIndex);
  // console.log("items", activeIndex);
  return (
    <>
      <ul className="listBoxContainer">
        {items.map((item, index) => (
          <li
            className={`listBoxItem ${
              index === activeIndex ? "activeItem" : ""
            }`}
            key={index}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ListBox;
