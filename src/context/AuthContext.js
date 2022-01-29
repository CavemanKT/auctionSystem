import { createContext, useState, useEffect } from "react";
import { authApp, firestoreApp, storage, ref, deleteObject } from "../config/firebase";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser ] = useState(null)
  const [loading, setLoading] = useState(true)
  const [globalMsg, setGlobalMsg] = useState('')

  const register = (email, password) => {
    return authApp.createUserWithEmailAndPassword(email,password)
  }

  const login = (email, password) => {
    return authApp.signInWithEmailAndPassword(email, password)
  }


  const logout = () => {
    return authApp.signOut()
  }

  // bid auction
  const bidAuction = (auctionId, price) =>{
    if(!currentUser) return setGlobalMsg('Please login first to proceed further')
    let newPrice = Math.floor((price / 100) * 110)
    const db = firestoreApp.collection('auctions')

    return db.doc(auctionId).update({
      curPrice: newPrice,
      curWinner: currentUser.email
    })
  }

  const endAuction = async(auctionId, imgName) => {
    const db = firestoreApp.collection('auctions')
    console.log(imgName, storage);

    const itemStorageRef = ref(storage, `${imgName}`)  // or storageApp.ref(storage, `${imgName}`)
    await deleteObject(itemStorageRef)

    return db.doc(auctionId).delete()
  }


  useEffect(() => {
    const subscribe = authApp.onAuthStateChanged((user) => {
      setCurrentUser(user)
      setLoading(false)
    })
    return subscribe
  }, [])

  useEffect(() => {
    const interval = setTimeout(() => {
      setGlobalMsg('')
    }, 5000);
    return () => clearTimeout(interval)
  }, [globalMsg])

  return (
    <AuthContext.Provider
      value={{
        setCurrentUser,
        currentUser,
        register,
        login,
        logout,
        bidAuction,
        endAuction,
        globalMsg,
      }}
    >
      { !loading && children}
    </AuthContext.Provider>

  )
}
