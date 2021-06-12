import fireStore from "../../../lib/firebase";
import { v4 as uuidv4 } from "uuid";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      return getProducts();
    case "POST":
      return insertProduct(req.body);
    case "PUT":
      return updateProduct(req.body);
    // case "DELETE":
    //   return deleteProduct();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getProducts() {
    console.log("inside api to get products.....");
    const allProducts = await fireStore.collection("products").get();
    const mappedProducts = await allProducts.docs.map(x => {
      return { slug: x.id, ...x.data() };
    });
    res.statusCode = 200;
    console.log(mappedProducts);
    res.json(mappedProducts);
    return res;
  }

  async function insertProduct(product) {
    try {
      console.log("inside insert product...", product);
      const slug = uuidv4();
      const cityRef = fireStore.collection("products");
      const result = await cityRef.doc(slug).set(product);
      // return res.status(200).json({});
      return res.status(201).json({});
    } catch (error) {
      console.log("error inserting products", error);
    }
  }
  async function updateProduct(product) {
    try {
      console.log("inside update product...", product);
      const cityRef = fireStore.collection("products");
      const result = await cityRef
        .doc(product.id)
        .set(product, { merge: true });
      // return res.status(200).json({});
      return res.status(200).json({});
    } catch (error) {
      console.log("error inserting products", error);
    }
  }
};
