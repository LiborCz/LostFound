import React, {useState, useEffect} from "react";

import ItemPageFilter from "./ItemPageFilter";
import ItemPageStrip from "./ItemPageStrip";

function ItemPageHeading({itemCount, setFilter, showModal, user}) {

  const [showPanel, setShowPanel] = useState(false);

  function clickHandler(e) {
    setShowPanel((state) => { return !state });
    e.target.blur();
  }

  function filterUser() {
    console.log("user.email: " + user.email);
    setFilter(user.email);
  }

  useEffect(() => {
    document.querySelector('.panel-content').classList.toggle('is-hidden');
    }, [showPanel]);

  return (

    <div id="panel" className="navbar-items">

      <div className="navbar-strip is-flex">

        <a className="navbar-link" onClick={clickHandler} href="javascript:void(0)">
          Další Filtry
        </a>

        <ItemPageStrip itemCount={itemCount} filterUser={filterUser}/>

        <div className="navbar-item navbar-end">
          <div className="button" onClick={showModal} >Pridej</div>
        </div>
      

      </div>

      <div className="panel-content navbar-items" >
        <ItemPageFilter setFilter={setFilter} setShowPanel={setShowPanel} />
      </div>

    </div>
  )
}

export default ItemPageHeading;
