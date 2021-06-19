import fireStore from "../../../lib/firebase";

export default handler;

async function handler(req, res) {
  console.log("inside cart api  with id ...................................");
  switch (req.method) {
    case "GET":
      return getCart();
    case "POST":
    // return insertProduct(req.body);
    case "PUT":
    // return updateProduct();
    case "DELETE":
      return deleteProduct();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getProductById() {
    console.log("inside get prouct by id......");
    const productId = req.query.id;
    const cityRef = fireStore.collection("products").doc(productId);
    const doc = await cityRef.get();
    if (!doc.exists) {
      console.log("No such document!");
    } else {
      //  console.log("Document data:", doc.data());
    }
    res.statusCode = 200;
    console.log({ ...doc.data() });
    res.json({ ...doc.data() });
    return res;
  }

  async function getCart() {
    const userId = req.query.id;
    console.log("inside api to get cart.....",  userId);
    const allProducts = await fireStore
      .collection("cart")
      .doc(userId)
      .collection("products")
      .get();
    const mappedProducts = await allProducts.docs.map(x => {
      return { slug: x.id, ...x.data() };
    });
    res.statusCode = 200;
    console.log(mappedProducts);
    res.json(mappedProducts);
    return res;
  }

  async function updateProduct() {
    try {
      const productId = req.query.id;
      const updateInfo = req.body; 
      const cityRef = fireStore.collection("products").doc(productId);
      const onRemoveProductFromWishlist = await cityRef.update({
        ...updateInfo
      });
      return res.status(200).json({});
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }

  // async function deleteProduct() {
  //   try {
  //     console.log("inside delete product....." + req.query.id);
  //     await fireStore.collection("cart").doc(req.query.id).delete();
  //     return res.status(200).json({});
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }
}
