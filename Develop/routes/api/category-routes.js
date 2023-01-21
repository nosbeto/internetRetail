const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  try {
    // find all categories
    const categoryData = await Category.findAll({
      // be sure to include its associated Products
      include: [{
        model:Product,
        attributes: {exclude:["id","price","stock","category_id","categoryId"]}
      }]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    // find one category by its `id` value
    const categoryData = await Category.findByPk(req.params.id, {
      // be sure to include its associated Products
      include: Product,
    });
    if (!categoryData) {
      res.status(404).json({ message: "No traveller found with this id!" });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    // create a new category
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
  // update a category by its `id` value
    const CategoryData = await Category.update(req.body,{
      where: {
        id: req.params.id,
      },
    });
    if (!CategoryData) {
      res.status(404).json({ message: "No Category found with this id!" });
      return;
    }
    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.delete("/:id", async (req, res) => {
  try {
    // delete a category by its `id` value
    const CategoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!CategoryData) {
      res.status(404).json({ message: "No Category found with this id!" });
      return;
    }
    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
