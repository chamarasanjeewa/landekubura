import fireStore from "../../../lib/firebase";
import { v4 as uuidv4 } from "uuid";
const collectionName = "user";
export default async (req, res) => {
  console.log("user api..................................");
  switch (req.method) {
    case "GET":
      return getUsers();
    case "POST":
      return insertUser(req.body);
    // case "PUT":
    //   return updateProduct(req.body);
    // case "DELETE":
    //   return deleteProduct();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getUsers() {
    console.log("inside api to get users.....");
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
      console.log("inside insert user...", user);
      const slug = uuidv4();
      const cityRef = fireStore.collection(collectionName);
      const result = await cityRef.doc(user.uid).set(user);
      // return res.status(200).json({});
      return res.status(201).json({});
    } catch (error) {
      console.log("error inserting users", error);
    }
  }
};
