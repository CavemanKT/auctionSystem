import {useState, useEffect } from 'react'
import {storageApp, firestoreApp, timestamp} from '../config/firebase'

const useStorage = data => {
  const [ progress, setProgress] = useState(0)
  const [ isCompleted, setIsCompleted] = useState(null)

  useEffect(() => {
    const storageRef = storageApp.ref(data.itemImage.name)
    const collectionRef = firestoreApp.collection('auctions') // create the table name called auction

    storageRef.put(data.itemImage).on('state_changed', (snap) => {
      let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
      setProgress(percentage)
    }, (err) => {
      console.log(err);
    }, async() => {
      const imgUrl = await storageRef.getDownloadURL();
      const createdAt = timestamp();
      delete data.itemImage;
      await collectionRef.add({...data, createdAt, imgUrl})
      setIsCompleted(true)
    })
  }, [data])

  return {
    progress,
    isCompleted
  }
}

export default useStorage;
