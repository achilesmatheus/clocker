// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import client from "./../../config/firebase/client";
import server from "./../../config/firebase/server";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
} from "firebase/firestore";

const db = getFirestore(client);

export default async function handler(req, res) {
  const authentication = server.auth();
  const [, tokenWithoutBearer] = req.headers.authorization.split(" ");
  const user_id = await authentication.verifyIdToken(tokenWithoutBearer);

  const data = {
    user_id,
    username: req.body.username,
  };

  try {
    await setDoc(doc(db, "profiles", req.body.username), data);
  } catch (error) {
    console.log("ERROR ADDING DOCUMENT", error);
  }

  // profile.doc(req.body.username).set({
  //   user_id,
  //   username: req.body.username,
  // });

  res.status(200).json({ name: "John Doe" });
}
