import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC2LLU5-cuXMF_U3HHq7gId3SgVfvzT7AM",
  authDomain: "zflix-d1437.firebaseapp.com",
  projectId: "zflix-d1437",
  storageBucket: "zflix-d1437.firebasestorage.app",
  messagingSenderId: "204518638139",
  appId: "1:204518638139:web:571acbe6c21d826496521e",
  measurementId: "G-9PGWWP8JHB"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// ডাটা আনা (channels, movies, series, dramas)
export async function getItems(col) {
  const snap = await getDocs(collection(db, col));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

// Add / Edit / Delete (শুধু Admin পারবে)
export const addItem = (col, data) =>
  addDoc(collection(db, col), { ...data, createdAt: Date.now() });
export const updateItem = (col, id, data) =>
  updateDoc(doc(db, col, id), data);
export const deleteItem = (col, id) =>
  deleteDoc(doc(db, col, id));

// লগইন / লগআউট
export const login = (email, pass) =>
  signInWithEmailAndPassword(auth, email, pass);
export const logout = () => signOut(auth);
export { onAuthStateChanged };
