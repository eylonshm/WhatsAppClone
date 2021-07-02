var admin = require('firebase-admin')

exports.firebaseSdk = admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    // databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
});