const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint

// get all products
router.get("/", async (req, res) => {
  // find all products
  try {
    const productsData = await Product.findAll({
      attributes:["id","product_name","price","stock"],
      include: [{model:Category}, {model:Tag, through: {model:ProductTag, attributes:{exclude: ["id", "product_id", "tag_id","productId","tagId"]}}}]
    });
    res.status(200).json(productsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one product
router.get("/:id", async (req, res) => {
  try {
    // find a single product by its `id`
    const productsData = await Product.findByPk(req.params.id, {
      attributes:["id","product_name","price","stock"],
      include: [{model:Category}, {model:Tag, through: {model:ProductTag, attributes:{exclude: ["id", "product_id", "tag_id","productId","tagId"]}}}]
    });
    if (!productsData) {
      res.status(404).json({ message: "No product found with this id!" });
      return;
    }
    res.status(200).json(productsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new product
router.post("/", async (req, res) => {
  try {
    const productData = await Product.create(req.body);
    res.status(200).json(productData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update product
router.put("/:id", async (req, res) => {
  try{
    const productData = await Product.update(req.body,{
      where:{
        id: req.params.id,
      },
    });
    if (!productData) {
      res.status(404).json({ message: "No Product found with this id!" });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!productData) {
      res.status(404).json({ message: "No product found with this id!" });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
  // delete one product by its `id` value
});

module.exports = router;
