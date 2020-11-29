const express = require("express");
const router = express.Router();

//Item model
const Item = require("./modules/db").Item;

// * Get Simple Authorization / User

// @route   GET user
// @descr   Get All Items
// @Access  Public

// router.get("/", (req, res) => {
//   Item.find()
//     .sort({ date: -1 })
//     .then(items => res.json(items));
// });

// @route   POST api/items
// @descr   Create an item
// @Access  Public

// router.post("/login", (req, res) => {
//   const newItem = new Item({
//     title: req.body.title,
//     content: req.body.content
//   });

//   newItem.save().then(item => res.status(201).json(item));
// });

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
    .then(() => res.status().json({ success: true }))
    .catch(err => res.status(204).json({ success: false }));
});

module.exports = router;
