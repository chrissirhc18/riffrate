// src/firebaseHelpers.js
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp
} from "firebase/firestore";

import { db } from "./firebase";

/**
 * Converts Firestore Timestamp -> JavaScript Date
 */
export function convertTimestamp(ts) {
  if (!ts) return new Date();
  return ts.toDate ? ts.toDate() : new Date(ts);
}

/**
 * Add a new band review to Firestore
 */
export async function addReview({ bandName, title, content, rating, poster }) {
  const docRef = await addDoc(collection(db, "reviews"), {
    bandName,
    title,
    content,
    rating,
    poster,
    created: serverTimestamp()
  });
  return docRef.id;
}

/**
 * Fetch N most recent reviews across all bands
 */
export async function getRecentReviews(limitCount = 10) {
  const q = query(
    collection(db, "reviews"),
    orderBy("created", "desc"),
    limit(limitCount)
  );

  const snap = await getDocs(q);
  return snap.docs.map(d => ({
    id: d.id,
    ...d.data(),
    created: convertTimestamp(d.data().created)
  }));
}

/**
 * Fetch all reviews for a given band (bandName)
 */
export async function getReviewsForBand(bandName) {
  const q = query(
    collection(db, "reviews"),
    where("bandName", "==", bandName),
    orderBy("created", "desc")
  );

  const snap = await getDocs(q);
  return snap.docs.map(d => ({
    id: d.id,
    ...d.data(),
    created: convertTimestamp(d.data().created)
  }));
}

/**
 * Delete a review by document ID
 */
export async function deleteReview(id) {
  return await deleteDoc(doc(db, "reviews", id));
}
