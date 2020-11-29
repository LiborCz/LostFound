import React, { useState } from "react";

function ItemAdd({hideModal, itemAdd}) {

  const initItem = {
    title: "",
    content: "",
    isSubmitting: false,
    errMessage: ""
  };

  const [item, setItem] = useState(initItem);

  function hOnChange(event) {
    const { name, value } = event.target;

    setItem(prevItem => {
      return {
        ...prevItem,
        [name]: value,
        errMessage: ""
      };
    });
  }

  function hOnSubmit(event) {
    event.preventDefault();

    setItem({...item, isSubmitting:true})

    itemAdd(item)
    .then(
      setItem(initItem)
    )
    .catch(err => {
      setItem({...item, isSubmitting:false, errMessage: err.statusText})
    });
  }

  return (


    <section>
      <div id="dlgAddItem" className="modal">

        <div className="modal-background"></div>

        <div className="modal-card" style={{width:"400px"}}>

          <div className="modal-card-head">
            <p className="modal-card-title">Add New Item</p>
            <button className="delete" aria-label="close" onClick={hideModal}></button>
          </div>

          <div className="modal-card-body">

            <form onSubmit={hOnSubmit}>
              <div className="field">
                <label className="label">Title</label>
                <div className="control">
                  <input className="input" type="text" name="title" 
                    onChange={hOnChange} 
                    value={item.title}
                    required />
                </div>
              </div>

              <div className="field">
                <label className="label">Content</label>
                <div className="control">
                  <input className="input" type="text" name="content" 
                    onChange={hOnChange} 
                    value={item.content}
                    required />
                </div>
              </div>
              
              <div className="notification has-text-danger has-text-weight-bold is-paddingless center">
                {item.errMessage} 
              </div>

              <button type="submit" className="button is-info is-pulled-right"
                disabled={item.isSubmitting}
                >
                Add
              </button>

            </form>

          </div>

          <footer className="modal-card-foot" style={{justifyContent: "flex-end"}}>
            {/* <button className="button is-info" onClick={itemAdd}>Add</button> */}
          </footer>

        </div>
      </div>
    </section>

);
}

export default ItemAdd;
