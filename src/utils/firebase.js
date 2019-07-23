import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyAYF4kG4Pib6yDjJAca-_GUcXrhkcEjCl4',
  authDomain: 'crwn-db-fe773.firebaseapp.com',
  databaseURL: 'https://crwn-db-fe773.firebaseio.com',
  projectId: 'crwn-db-fe773',
  storageBucket: '',
  messagingSenderId: '398489994544',
  appId: '1:398489994544:web:1283b89e76203383',
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const snapShot = await userRef.get()

  if (!snapShot.exists) {
    const { displayName, email } = userAuth
    const createAt = new Date()

    try {
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additionalData,
      })
    } catch (e) {
      console.log('error creating user', e.message)
    }
  }

  return userRef
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
