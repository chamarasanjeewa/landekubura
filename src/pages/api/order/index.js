import fireStore from "../../../lib/firebase";
import { v4 as uuidv4 } from "uuid";
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      return getAllOrders();
    case "POST":
      return createOrder(req.body);
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function createOrder(cart) {
    const order = {
      userId: cart.userId,
      products: cart.products,
      status: "created"
    };
    try {
      const uniqueId = uuidv4();
      const docRef = fireStore.collection("order").doc(uniqueId);
      docRef.set(order);
      return res.status(201).json({ reference: uniqueId });
    } catch (error) {
      console.log("error inserting products", error);
    }
  }

  async function getAllOrders() {
    const userId = req.query.id;
    const allOrders = await fireStore
      .collection("orders")
      .get();
    const mappedOrders = await allOrders.docs.map(x => {
      return { orderId: x.id, ...x.data() };
    });
    res.statusCode = 200;
    res.json(mappedOrders);
    return res;
  }

};
