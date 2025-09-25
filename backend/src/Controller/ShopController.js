import Product from "../db/models/Products.js"

//68d58eec64120e2c406c95ab

export async function createProduct(req, res) {
  const {
    name,
    price,
    images,
    description
  } = req.body

  const product = new Product({
    name,
    price,
    images,
    description
  })

  await product.save()
  res.status(200).json({
    message: 'Sucess',
    product: product
  })

}

export async function getProductsById(req, res) {
  const { id } = req.params

  const product = await Product.findById(id)

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json({
    message: "Succes",
    product: product
  })
}