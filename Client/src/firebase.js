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
const provider = {
  google: new firebase.auth.GoogleAuthProvider(),
  facebook: new firebase.auth.FacebookAuthProvider(),
  twitter: new firebase.auth.TwitterAuthProvider(),
  gitHub: new firebase.auth.GithubAuthProvider(),
}
const storage = firebase.storage()
const storageDirectory = 'gs://whatsapp-react-clone-15ffd.appspot.com'

/**
 * @param {File} file
 */
function uploadFile(file, fileName) {
  const ref = storage.ref().child(fileName)
  // [START storage_upload_blob]
  // 'file' comes from the Blob or File API
  return new Promise((resolve, reject) => {
    ref
      .put(file)
      .then((snapshot) => {
        console.log('Uploaded a blob or file!')
        resolve(snapshot)
      })
      .catch((err) => reject(err))
  })
  // [END storage_upload_blob]
}

async function getFileURL(fileDirectory) {
  try {
    const ref = storage.ref().child(fileDirectory)
    const url = await ref.getDownloadURL()
    console.log(url)
    return url
  } catch (err) {
    console.log(err)
  }
}

export { uploadFile, getFileURL, storageDirectory, auth, provider, db, firebaseApp }
// export default db
