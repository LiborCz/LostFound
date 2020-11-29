import React, {useState, useEffect} from "react";

function ItemPageFilter({setFilter, setShowPanel}) {

  const [filterText, setFilterText] = useState('');

  function hFilterChange(e) {
    setFilterText(e.target.value);
  }

  function hFilterOnClick() {
    setFilter(filterText);
    setShowPanel(false);
  }

  return (

    <div style={{margin:"20px"}}>

      <div className="field is-horizontal">

        <div className="field-label is-normal">
          <label className="label">Email address</label>
        </div>

        <div className="field-body">
          <div className="field">
            <input className="input" type="text" placeholder="Email address"
              style={{width:"300px"}}
              onChange={hFilterChange}
              value={filterText}              
              />
          </div>
        </div>

      </div>

      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Department</label>
        </div>
        <div className="field-body">
          <div className="field is-narrow">
            <div className="control">
              <div className="select is-fullwidth">
                <select>
                  <option>Business development</option>
                  <option>Marketing</option>
                  <option>Sales</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="field is-horizontal">
        <div className="field-label"></div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <button className="button is-info" onClick={hFilterOnClick}>
                Filter
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>

  );
}

export default ItemPageFilter;
