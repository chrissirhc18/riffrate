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
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { auth } from "./firebase";

export function convertTimestamp(ts) {
  if (!ts) return new Date();
  return ts.toDate ? ts.toDate() : new Date(ts);
}

// now stores userUid for secure ownership verification
export async function addReview({ 
  bandName = null, 
  venueName = null, 
  title, 
  content, 
  rating = 0, 
  poster = "Anonymous" 
}) {
  const currentUser = auth.currentUser;
  
  const docRef = await addDoc(collection(db, "reviews"), {
    bandName,
    venueName,
    title,
    content,
    rating,
    poster,
    userUid: currentUser?.uid || null, // switched to uid to verify ownership of reviews 
    created: serverTimestamp(),
  });
  return docRef.id;
}

export async function getRecentReviews(limitCount = 10) {
  const q = query(
    collection(db, "reviews"), 
    orderBy("created", "desc"), 
    limit(limitCount)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      ...data,
      created: data.created && data.created.toDate ? data.created.toDate() : data.created,
    };
  });
}

export async function getReviewsForBand(bandName) {
  const q = query(
    collection(db, "reviews"), 
    where("bandName", "==", bandName), 
    orderBy("created", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      ...data,
      created: data.created && data.created.toDate ? data.created.toDate() : data.created,
    };
  });
}

export async function getReviewsForVenue(venueName) {
  const q = query(
    collection(db, "reviews"), 
    where("venueName", "==", venueName), 
    orderBy("created", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      ...data,
      created: data.created && data.created.toDate ? data.created.toDate() : data.created,
    };
  });
}

// fetch reviews by userUid
export async function getReviewsByUser(userUid) {
  const q = query(
    collection(db, "reviews"),
    where("userUid", "==", userUid),
    orderBy("created", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      ...data,
      created: data.created && data.created.toDate ? data.created.toDate() : data.created,
    };
  });
}

// verify ownership before deleting
export async function deleteReview(reviewId) {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error("Must be logged in to delete reviews");
  }

  // Get the review first to verify ownership
  const reviewDoc = await getDocs(
    query(collection(db, "reviews"), where("__name__", "==", reviewId))
  );
  
  if (!reviewDoc.empty) {
    const reviewData = reviewDoc.docs[0].data();
    if (reviewData.userUid !== currentUser.uid) {
      throw new Error("You can only delete your own reviews");
    }
  }

  return await deleteDoc(doc(db, "reviews", reviewId));
}

export async function updateReview(reviewId, updates) {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error("Must be logged in to update reviews");
  }

  // Verify ownership
  const reviewDoc = await getDocs(
    query(collection(db, "reviews"), where("__name__", "==", reviewId))
  );
  
  if (!reviewDoc.empty) {
    const reviewData = reviewDoc.docs[0].data();
    if (reviewData.userUid !== currentUser.uid) {
      throw new Error("You can only edit your own reviews");
    }
  }

  const allowedUpdates = {
    content: updates.content,
    rating: updates.rating,
    updated: serverTimestamp(),
  };

  return await updateDoc(doc(db, "reviews", reviewId), allowedUpdates);
}