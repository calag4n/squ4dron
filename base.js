/* eslint-disable one-var */
import Rebase from 're-base'
import firebase from 'firebase/app'
import 'firebase/database'

// eslint-disable-next-line import/no-mutable-exports
let firebaseApp, base

if (typeof window !== 'undefined') {
  firebaseApp = firebase.initializeApp({
    apiKey: 'AIzaSyDIr2ztE9qOQeAtjldnDB6pEhJRG3CMUpQ',
    authDomain: 'antre-cool.firebaseapp.com',
    databaseURL: 'https://antre-cool.firebaseio.com',
    storageBucket: 'antre-cool.appspot.com',
  })

  base = Rebase.createClass(firebaseApp.database())
}

export default base
