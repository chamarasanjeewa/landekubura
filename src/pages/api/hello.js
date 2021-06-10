// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import fireStore from "./../../lib/firebase";

export default async (req, res) => {
      const allProducts = await fireStore.collection("products").get();
      const mappedProducts = await allProducts.docs.map(x => {
        console.log(x.data());
      return  {
          name: x.data().name
        }
      });
      const [first] = mappedProducts;
      res.statusCode = 200;
      res.json({ name: first?.name });
      return res; 
};


