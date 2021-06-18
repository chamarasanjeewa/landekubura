import fireStore from "../../../lib/firebase";
import { v4 as uuidv4 } from "uuid";
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      return getCart();
    case "POST":
      return insertProductToCart(req.body);
    case "PUT":
      return updateProductCart(req.body);
    // case "DELETE":
    //   return deleteProductCart(req.query);
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // async function getCart() {
  //   console.log("inside api to get cart.....");
  //   const allProducts = await fireStore.collection("cart") .doc(product.userId)
  //   .collection("products").get();
  //   const mappedProducts = await allProducts.docs.map(x => {
  //     return { slug: x.id, ...x.data() };
  //   });
  //   res.statusCode = 200;
  //   console.log(mappedProducts);
  //   res.json(mappedProducts);
  //   return res;
  // }

  async function insertProductToCart(product) {
    try {
      console.log("inside insert product...", product);
      const slug = uuidv4();
      const cityRef = fireStore.collection("cart");
      const result = await cityRef.doc(product.userId).set(product);
      // return res.status(200).json({});
      return res.status(201).json({});
    } catch (error) {
      console.log("error inserting products", error);
    }
  }

  async function updateProductCart(product) {
    try {
      //let batch = fireStore.batch();
      console.log("inside update product..................................................................", product);
      //{products,userId}=product;
      // const cityRef = fireStore.collection("cart");
      // const result = await cityRef.doc(product.userId).set(product);
     
      const docRef = fireStore
        .collection("cart")
        .doc(product.userId)
        .collection("products");

        docRef
        .get()
        .then(res => {
          res.forEach(element => {
           // element.ref.delete();
          });
          product.products.forEach(x=>{
            docRef.doc(x.id).set(x);
          })

        });
        
      
     
      
      // DocumentReference johnRef = db.collection("users").document("John");
     // batch.set(docRef, product.products);
      ////batch.commit();
      // .addOnCompleteListener(new OnCompleteListener<Void>() {
      //   console.log('completed.')
      // @Override
      // public void onComplete(@NonNull Task<Void> task) {
      // ...
      // });
      return res.status(200).json({});
    } catch (error) {
      console.log("error inserting products", error);
    }
  }
}
//   async function deleteProductCart(product) {
//     console.log("inside delete product...", product);
//     const cityRef = fireStore.collection("cart");
//     const result = await cityRef.doc(product.id).delete();
//     return res.status(202).json({});
//   }
// };

// async function deleteCollection(path) {
//   firebase.firestore().collection(path).listDocuments().then(val => {
//       val.map((val) => {
//           val.delete()
//       })
//   })
// }
