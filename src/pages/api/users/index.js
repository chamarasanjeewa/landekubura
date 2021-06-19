import fireStore from "../../../lib/firebase";
import { v4 as uuidv4 } from "uuid";
const collectionName = "users";
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      return getUsers();
    case "POST":
      return insertUser(req.body);
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getUsers() {
    const allusers = await fireStore.collection(collectionName).get();
    const mappedusers = await allusers.docs.map(x => {
      return { slug: x.id, ...x.data() };
    });
    res.statusCode = 200;
    console.log(mappedusers);
    res.json(mappedusers);
    return res;
  }

  async function insertUser(user) {
    try {
      const slug = uuidv4();
      const cityRef = fireStore.collection(collectionName);
      const result = await cityRef.doc(user.userId).set(user, { merge: true });
      return res.status(201).json({});
    } catch (error) {
      console.log("error inserting users", error);
    }
  }
};
