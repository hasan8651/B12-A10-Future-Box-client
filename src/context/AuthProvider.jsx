import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import { AuthContext } from "./AuthContext";


const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tempEmail, setTempEmail] = useState("")
  const [myToys, setMyToys] = useState([]);

  const addToy = (toy) => {
    setMyToys((prev) => {
      const exists = prev.some((t) => t.toyId === toy.toyId);
      return exists ? prev : [...prev, toy];
    });
  };

  const createUserFunction = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

const updateProfileFunction = async (profileInfo) => {
  if (!auth.currentUser) return;

  await updateProfile(auth.currentUser, {
    displayName: profileInfo.displayName,
    photoURL: profileInfo.photoURL,
  });

  await auth.currentUser.reload();
  const updated = auth.currentUser;
  setUser({...updated});
};

  const loginFunction = (email, password) => {
    setLoading(true);
    setMyToys([]);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginPopFunction = () => {
    setLoading(true);
    setMyToys([]);
    return signInWithPopup(auth, googleProvider);
  };

  const logoutFunction = () => {
    setLoading(true);
    // toast.success("Logged Out successfully!");
    return signOut(auth);
  };

  const PassResetFunction = (email) => {
    setLoading(false);
     return sendPasswordResetEmail(auth, email);
  };

  const authInfo = {
    user,
    setUser,
    createUserFunction,
    loginFunction,
    loginPopFunction,
    logoutFunction,
    PassResetFunction,
    updateProfileFunction,
    loading,
    setLoading,
    tempEmail,
    setTempEmail,
    myToys,
    addToy,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;