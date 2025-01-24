import React, { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { saveUserToFirebase } from "@/services/userService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { user, isLoaded, isSignedIn } = useUser();
  const [firebaseUser, setFirebaseUser] = useState(null);

  useEffect(() => {
    if (user && isSignedIn) {
      saveUserToFirebase(user).then(() => setFirebaseUser(user));
    }
  }, [user, isSignedIn]);

  return (
    <AuthContext.Provider value={{ user: firebaseUser, isLoaded, isSignedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
