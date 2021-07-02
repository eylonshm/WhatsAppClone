import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyCfPte-Zdt3mfoZPfkqCNqKKe2sMYoNJG8',
    authDomain: 'whatsapp-react-clone-15ffd.firebaseapp.com',
    databaseURL: 'https://whatsapp-react-clone-15ffd.firebaseio.com',
    projectId: 'whatsapp-react-clone-15ffd',
    storageBucket: 'whatsapp-react-clone-15ffd.appspot.com',
    messagingSenderId: '848420617985',
    appId: '1:848420617985:web:fed5aa379e5068d474a500',
    measurementId: 'G-CCLHC6YLTV',
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider, db, firebaseApp}
// export default db
