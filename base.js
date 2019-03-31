import Rebase from 're-base'
import firebase from 'firebase/app'
import 'firebase/database'


if (typeof window !== 'undefined') {
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDIr2ztE9qOQeAtjldnDB6pEhJRG3CMUpQ",
  authDomain: "antre-cool.firebaseapp.com",
  databaseURL: "https://antre-cool.firebaseio.com",
})

const base = Rebase.createClass(firebaseApp.database())
}
// This is a named export
export { firebaseApp }

// this is a default export
export default base
