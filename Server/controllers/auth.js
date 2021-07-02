const { db } = require('../firebase')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async (req, res, next) => {
  try {
    let { email, password, passwordCheck, displayName } = req.body
    // validate
    if (!email || !password || !passwordCheck) return res.status(400).json({ msg: 'Not all fields have been entered.' })
    if (password.length < 5) return res.status(400).json({ message: 'The password needs to be at least 5 characters long.' })
    if (password !== passwordCheck) return res.status(400).json({ message: 'Enter the same password twice for verification.' })
    // const existingUser = await User.findOne({ email: email });
    // if (existingUser)
    //     return res
    //     .status(400)
    //     .json({ msg: "An account with this email already exists." });
    // if (!displayName) displayName = email;
    // const salt = await bcrypt.genSalt();
    // const passwordHash = await bcrypt.hash(password, salt);
    // const user = {
    //     email,
    //     password: passwordHash,
    //     displayName,
    // }
    // await db.collection('users').add(user)
    res.status(201).json(savedUser)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.login = async (req, res, next) => {
  let user = {}
  try {
    const { email, password } = req.body
    console.log(password)
    console.log(email)
    // validate
    if (!email || !password) return res.status(400).json({ message: 'Not all fields have been entered.' })
    const usersFetch = await db.collection('users').where('email', '==', email).get()
    usersFetch.forEach((doc) => {
      user.id = doc.id
      user.email = doc.data().email
      user.password = doc.data().password
      console.log(doc.id)
      console.log(doc.data())
    })
    console.log(user)
    if (!user.email) return res.status(400).json({ msg: 'No account with this email has been registered.' })
    const isMatch = user.password === password
    // const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials.' })
    const token = jwt.sign({ id: user._id }, 'process.env.JWT_SECRET')
    res.json({
      token,
      user: {
        id: user._id,
        displayName: user.displayName,
      },
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message })
  }
}

exports.deleteUser = async (req, res, next) => {
  const userId = req.user
  try {
    const deletedUser = await db.collection('users').doc(userId).delete()
    res.status(200).json({ message: 'User Deleted Successfully.', deletedUser: deletedUser })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.tokenValidate = async (req, res, next) => {
  try {
    const token = req.header('x-auth-token')
    if (!token) return res.json(false)
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    if (!verified) return res.json(false)
    const user = await db.collection('users').doc(verified.id)
    if (!user) return res.json(false)
    return res.json(true)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
