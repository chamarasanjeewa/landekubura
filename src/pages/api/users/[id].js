import fireStore from "../../../lib/firebase";

export default handler;
const collectionName = "user";

async function handler(req, res) {
  console.log("inside user id...................................");
  switch (req.method) {
    case "GET":
      return getUserById();
    case "POST":
      return insertUser(req.body);
    case "PUT":
      return updateUser();
    case "DELETE":
      return deleteUser();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getUserById() {
    const userId = req.query.id;
    console.log("inside get user by id......", userId);
    const cityRef = fireStore.collection(collectionName).doc(userId);
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

  async function updateUser() {
    try {
      const productId = req.query.id;
      const updateInfo = req.body;
      const cityRef = fireStore.collection(collectionName).doc(productId);
      const onRemoveProductFromWishlist = await cityRef.update({
        ...updateInfo
      });
      return res.status(200).json({});
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }

  async function deleteUser() {
    try {
      await db.collection(collectionName).doc(req.query.id).delete();
      return res.status(200).json({});
    } catch (error) {}
  }
}
