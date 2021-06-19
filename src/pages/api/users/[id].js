import fireStore from "../../../lib/firebase";

export default handler;
const collectionName = "users";

async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return getUserById();
    case "PUT":
      return updateUser();
    case "DELETE":
      return deleteUser();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getUserById() {
    const userId = req.query.id;
    const cityRef = fireStore.collection(collectionName).doc(userId);
    const doc = await cityRef.get();
    if (!doc.exists) {
      console.log("No such document!");
    } 
    res.statusCode = 200;
    res.json({ ...doc.data() });
    return res;
  }

  async function updateUser() {
    try {
      const userId = req.query.id;
      const updateInfo = req.body;
      const cityRef = fireStore.collection(collectionName).doc(userId);
      const addedUser = await cityRef.update(
        
        {
            ...updateInfo
          },
       
        { merge: true }
      
      );
      return res.status(200).json(addedUser);
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
