import React from "react";

function Item({item, itemDelete}) {

  function hOnClick(event) {
    event.preventDefault();
    itemDelete(event.target.id);
  }

  return (

    <div className="column is-narrow">
      <div className="box" style={{width:"300px"}}>
        <h1 className="title">{item.title}</h1>
        <p className="subtitle">{item.content}</p>
        <p className="subtitle">{item.user_id}</p>
        <span className="button" id={item._id} onClick={hOnClick}>Delete</span>
      </div>
    </div>

  )};

export default Item;