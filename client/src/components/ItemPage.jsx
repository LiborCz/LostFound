import React, {useState, useEffect} from "react";
import axios from "axios";

import Item from "./Item";
import ItemAdd from "./ItemAdd"
import ItemPageHeading from "./ItemPageHeading";
import {AuthContext} from "../system/context/AuthContext";

function Items(props) {

  const [user] = React.useContext(AuthContext);

  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('');

  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState({
    itemsTotal:0, itemsAll:0, itemsShown:0, itemsMine:0
  });
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [countMine, setCountMine] = useState(0);


  const nItemsPage = parseInt(parseInt(window.outerWidth/220) * parseInt(window.outerHeight/200) * 1.2 / 2);

  const fetchItems = async (skip=0) => {
    setIsError(false);
    setIsLoading(true);

    try {
      const result  = await axios(`/api/items/test?filter=${filter}&limit=${nItemsPage}&skip=${skip}`);

      setItems((curItems) => {
        console.log(curItems);
        return curItems.concat([...result.data.items]);
      });
      setCount(count => {return {...count, itemsAll: result.data.all}});
      setIsLoading(false);
    }
    catch (err) {
      console.log(err)
      setIsError(true);
      setIsLoading(false);
    };
  };

  const getItemsCount = async (name, filter) => {
    try {
      let result  = await axios.get(`/api/items/count?filter=${JSON.stringify(filter)}`);
      setCount(count => { return {...count, ["items" + name]:result.data.count}});
    } catch(err) {
      console.log(err); return 0;     
    }
  }

  
  const getItemsTotal = async () => {
    try {
      let result  = await axios.get(`/api/items/totalcount`);
      setCount(count => { return {...count, itemsTotal: result.data.count}});
    } catch(err) {
      console.log(err); return 0;     
    }
  }
  
  useEffect(() => {
    if(user!=null) getItemsCount("Mine", {"user_id": user.email});
    getItemsTotal();
  }, []);


  useEffect(() => {

    console.log("Filter: " + filter);

    setPage(1); setSkip(0);
    setItems([]);
    
    fetchItems();
  }, [filter]);


  useEffect(() => {
    if(page>1) fetchItems(skip);
  }, [page]);


  useEffect(() => {
    setTimeout(scrollDown, 300);
    setSkip(items.length);
  }, [items]); 


  function scrollDown() {
    // window.scrollTo(0,document.querySelector("#btnReadMore").scrollHeight);
    window.scrollTo(0,document.body.scrollHeight);
  }

  
  // --- Adding data

  function itemAdd(item) {
    return new Promise((resolve, reject) => {
      axios.post('/api/items', item)

      .then(result => {
        if(result.status!==201) throw result;
        setItems((prevItems) => [...prevItems, result.data]);
        setCount(count => { return {...count, 
          itemsMine:count.itemsMine+1,
          itemsAll:count.itemsAll+1,
          itemsTotal:count.itemsTotal+1
        }});
        resolve();
        })

      .catch(err => reject(err));
    });
  }
  
  // - Deleting data

  function itemDelete(id) {
    axios.delete('/api/items/' + id)
      .then((result) => {
        setItems(items.filter(item => item._id !== id));
        setCount(count => { return {...count, 
          itemsMine:count.itemsMine-1,
          itemsAll:count.itemsAll-1,
          itemsTotal:count.itemsTotal-1
        }});
      })
      .catch((err) => console.log(err));
  }


  // - Filter data

  function applyFilter(filter) {
    alert(filter);
  }

  function showModal() {
    document.querySelector('#dlgAddItem').classList.add('is-active');
    document.querySelector('html').classList.add('is-clipped');
  }  

  function hideModal() {
    document.querySelector('#dlgAddItem').classList.remove('is-active');
    document.querySelector('html').classList.remove('is-clipped');
  }


return (

  <div>

    <ItemPageHeading 
      itemCount={{...count, itemsShown:items.length}} 
      setFilter={setFilter} 
      showModal={showModal} 
      fetchItems={fetchItems}
      user={user}
      />

    <ItemAdd hideModal={hideModal} itemAdd={itemAdd} />

    <section className="section">
      <div className="container is-fluid" style={{top:"40px"}}>
        <div className="columns is-multiline">

          {/* {isLoading ? <div>Loading...</div> : <ItemList items={items} divRef={divRef} style={style} />} */}

          {items.map((item) => (
            <Item key={item._id} item={item} itemDelete={itemDelete} />
          ))}          
  
        </div>

        {(items.length<count.itemsAll) ?
          <button type="button" onClick={() => setPage(page+1)}>Read more...</button> :
          <b><br />...To je vše...</b>
        }

        <br /><br />

        <div>.</div>

      </div>

    </section>

  </div>

)};

export default Items;