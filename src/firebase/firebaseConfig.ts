import { AllProjectsData } from "@/AllProjectsData/AllProjectsData";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from "firebase/auth";
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc, QueryDocumentSnapshot, DocumentData,writeBatch } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBDJETOpuniySRwXr4kBB39tK5hyeRZsDI",
  authDomain: "first-project-f5cda.firebaseapp.com",
  projectId: "first-project-f5cda",
  storageBucket: "first-project-f5cda.firebasestorage.app",
  messagingSenderId: "581803347371",
  appId: "1:581803347371:web:849b31ce001387e86ad6ee",
  measurementId: "G-L0081003DY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);
const batch = writeBatch(db);


const provider = new GoogleAuthProvider();


// =========================== All interfaces / types ======================================
export type UserTypeFirebase = User
export type CommentsTypeFirebase = QueryDocumentSnapshot<DocumentData, DocumentData>[]
export type DocTypeFirebase = QueryDocumentSnapshot
export type CommentDataType = {
  userName: string | null | undefined,
  userImageURL: string | null | undefined,
  userUID: string | undefined,
  comment: string
}



// =========================== auth State check ======================================

const authStateCheck = (setUser: (user: User | null) => void) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('auth state: logged in', user)
      setUser(user)
    } else {
      console.log('auth state: signed out')
      setUser(null)
    }
  })
}

// =========================== signin / signout with google =============================
const signin = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log('signin success:', user)
    }).catch((error) => {
      const errorMessage = error.message;
      console.log('signin error:', errorMessage)
    });
}

const signout = () => {
  signOut(auth).then(() => {
    console.log('Sign-out successful')
  }).catch((error) => {
    console.log(error.message)
  });
}

// ========================== firestore =====================================
// get all comments
const getAllCommentsDoc = async () => {
  const allComments: QueryDocumentSnapshot<DocumentData, DocumentData>[] = [];
  const querySnapshot = await getDocs(collection(db, 'profileFeedback'));
  querySnapshot.forEach((doc) => {
    allComments.push(doc);
  })
  return allComments
}

// add comment
const submitComment = async (data: CommentDataType) => {
  try {
    const docRef = await addDoc(collection(db, "profileFeedback"), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// delete comment 
const deleteComment = async (id: string) => {
  await deleteDoc(doc(db, "profileFeedback", id));
}








// ========================== post all projects to firebase =====================================
const postAllProjects = async () => {

  AllProjectsData.forEach((project)=>{
    const newDocRef = doc(collection(db, "portfolio_projects"))
    batch.set(newDocRef, project);
  })

  try {
    await batch.commit();
    console.log("Batch write successful!");
  } catch (e) {
    console.error("Error writing batch: ", e);
  }

}

// ========================== fetching all projects =====================================
const fetchAllProjects = async () => {
  const allProjects:  QueryDocumentSnapshot<DocumentData, DocumentData>[]  = [];
  const querySnapshot = await getDocs(collection(db, 'portfolio_projects'));
  querySnapshot.forEach((doc) => {
    allProjects.push(doc);
  })
  return allProjects
}








export { authStateCheck, signin, signout, getAllCommentsDoc, submitComment, deleteComment,postAllProjects,fetchAllProjects }