import fireStore from "../../../lib/firebase";
import { v4 as uuidv4 } from "uuid";
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      return getCart();
    case "POST":
      return createOrder(req.body);
    case "PUT":
      return updateProductCart(req.body);
    // case "DELETE":
    //   return deleteProductCart(req.query);
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function createOrder(cart) {
    console.log("inside create order.......", cart);
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
};
