import fireStore from "../../../lib/firebase";

export default handler;

async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return getProductById();
    case "POST":
      return insertProduct(req.body);
    case "PUT":
      return updateProduct();
    case "DELETE":
      return deleteProduct();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getProductById() {
    const productId = req.query.id;
    const cityRef = fireStore.collection("products").doc(productId);
    const doc = await cityRef.get();
    if (!doc.exists) {
      console.log("No such document!");
    } else {
    }
    res.statusCode = 200;
    console.log({ ...doc.data() });
    res.json({ ...doc.data() });
    return res;
  }

  async function updateProduct() {
    try {
      const productId = req.query.id;
      const updateInfo = req.body;
      const cityRef = fireStore.collection("products").doc(productId);
      return res.status(200).json({});
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }

  async function deleteProduct() {
    try {
      await db.collection("cities").doc(req.query.id).delete();
      return res.status(200).json({});
    } catch (error) {}
  }
}
