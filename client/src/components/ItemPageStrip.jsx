import React, {useState, useEffect} from "react";

function ItemPageStrip({itemCount, filterUser}) {

  return (

    <div className="is-flex">

      <div className="navbar-item">
        <span>Všechny inzeraty: {itemCount.itemsTotal}</span>
      </div>

      <div className="navbar-item">
        <span>Vyhovující Filtru: {itemCount.itemsAll}</span>
      </div>

      <div className="navbar-item">
        <span>Zobrazené: {itemCount.itemsShown}</span>
      </div>
        
      <div className="navbar-item">
        <a href="javascript:void(0);" onClick={filterUser} >Moje: {itemCount.itemsMine}</a>
      </div>

    </div>

  );
}

export default ItemPageStrip;
