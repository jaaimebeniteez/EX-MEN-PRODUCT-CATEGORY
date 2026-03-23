import { ProductCategory } from "../models/models.js"

const ProductCategoryController = {
  async index (req, res) {
    // TODO
    try {
      const categories = await ProductCategory.findAll(
        { where: { restaurantId: req.params.restaurantId } })
      res.json(categories)
    } catch (err) {
      res.status(500).send(err)
    }
  },

  async create (req, res) {
    try {
      const newProductCategory = ProductCategory.build(req.body)
      newProductCategory.restaurantId = req.params.restaurantId
      const productCategory = await newProductCategory.save()
      res.json(productCategory)
    } catch (err) {
      res.status(500).send(err)
    }
  },

  async destroy (req, res) {
    try {
      const result = await ProductCategory.destroy({ where: { id: req.params.categoryId } })
      let message = ''
      if (result === 1) {
        message = 'Sucessfuly deleted product category id.'
      } else {
        message = 'Could not delete product category.'
      }
      res.json(message)
    } catch (err) {
      res.status(500).send(err)
    }
  },
}

export default ProductCategoryController
