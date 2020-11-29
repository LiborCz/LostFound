const express = require("express");
const router = express.Router();

//Item model
const Item = require("../../modules/db").Item;

// @route   GET api/items
// @descr   Get All Items
// @Access  Public

function testNum(num) {
  return num && /^\d+$/.test(num) ? Number(num) : 0
}

router.get("/", (req, res) => {

  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

async function itemCount(filter) {
  console.log("Filter: ");
  console.log(filter);

  try {
    count = Item.countDocuments(filter).lean();
    return count;
  }
  catch(err) {throw err;}
}

router.get("/count", async (req, res) => {
  const filter = JSON.parse(req.query.filter);
  
  try {
    const count = await itemCount(filter);
    res.json({count});
  }
  catch(err) { res.send(err); }
});

router.get("/totalcount", async (req, res) => {

  Item.estimatedDocumentCount({}, (err, count) => {
    if(err) throw err;
    else { res.json({count}); } 
  });
    
});

router.get("/test", async (req, res) => {

  try {
    const filter = req.query.filter ? {user_id: req.query.filter} : null;

    console.log(filter);

    let options = {};
    const skip = testNum(req.query.skip); skip>0 && (options = {skip});
    const limit = testNum(req.query.limit); limit>0 && (options = {...options, limit});

    const items = await Item.find(filter, undefined, options).sort('title');
    const count = await itemCount(filter);

    res.send({items, all: count});
  }
  catch (e) { res.status(500).send() }

});

// @route   POST api/items
// @descr   Create an item
// @Access  Public

router.post("/", (req, res) => {
  const newItem = new Item({
    title: req.body.title,
    content: req.body.content,
    user_id: req.session.user_email
  });

  newItem.save()
    .then(item => res.status(201).json(item))
    .catch(err => res.status(204).json({message: "Copa to je?"}));
});

// @route   PUT api/items/:id
// @descr   Update an item
// @Access  Public

router.put("/:id", (req, res) => {
  Item.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then(item => res.status(200).json(item))
    .catch(err => res.status(204).json({ success: false }));
});

// @route   DELETE api/items/:id
// @descr   Delete an item
// @Access  Public

router.delete("/:id", (req, res) => {
  Item.findByIdAndRemove(req.params.id)
    .then(() => res.status(200).json({ success: true }))
    .catch(err => res.status(204).json({ success: false }));
});

module.exports = router;
