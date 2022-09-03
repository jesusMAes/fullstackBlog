const router = require('express').Router();
const Category = require('../models/Category');

//CREATE CATEGORY
router.post('/', async (req, res ) => {
   const newCat = new Category(req.body);
   try {
    const savedCategory = await newCat.save();
    res.send(200).json(savedCategory);
   } catch (err) {
    res.status(500).send(err);
   }
})

//GET ALL CATEGORIES
router.get('/', async (req, res) => {
  try {
    const cats = await Category.find();
    res.status(200).json(cats)
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router;