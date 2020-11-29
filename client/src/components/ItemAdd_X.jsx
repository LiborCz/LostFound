import React, { useState } from "react";

function ItemAdd(props) {

  const [item, setItem] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setItem(prevItem => {
      return {
        ...prevItem,
        [name]: value
      };
    });
  }

  function submitItem(event) {
    event.preventDefault();

    props.itemAdd(item);
    setItem({
      title: "",
      content: ""
    });
  }

  return (
    <div>
      <form className="note">
        <input
          name="title"
          onChange={handleChange}
          value={item.title}
          placeholder="Title"
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={item.content}
          placeholder="Take a note..."
          rows="3"
        />
        <button onClick={submitItem}>Add</button>
      </form>
    </div>
  );
}

export default ItemAdd;
