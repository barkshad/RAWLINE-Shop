
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, doc, getDoc, query, orderBy } from "firebase/firestore";
import { ProductData } from "../types";

const firebaseConfig = {
  apiKey: "AIzaSyDBuvCPjVz_NGOhbCyS7doOE1L6DkzQBHc",
  authDomain: "rawline-7b60c.firebaseapp.com",
  projectId: "rawline-7b60c",
  storageBucket: "rawline-7b60c.firebasestorage.app",
  messagingSenderId: "243225493014",
  appId: "1:243225493014:web:b3e7487a436ffa5ac2ff37"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export async function getProducts(): Promise<ProductData[]> {
  const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as ProductData));
}

export async function getProduct(id: string): Promise<ProductData> {
  const ref = doc(db, "products", id);
  const snap = await getDoc(ref);
  if (!snap.exists()) throw new Error("Product not found");
  return { id: snap.id, ...snap.data() } as ProductData;
}

export async function createProduct(data: Omit<ProductData, 'id'>) {
  await addDoc(collection(db, "products"), {
    ...data,
    createdAt: Date.now()
  });
}
