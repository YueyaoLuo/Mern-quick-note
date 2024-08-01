// controllers/api/users.js
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')


module.exports = {
  create,
  login,
  checkToken,
}
async function create(req, res) {
  try {
    // Add the user to the database
    const user = await User.create(req.body);
    // token will be a string
    const token = createJWT(user);
    // Yes, we can use res.json to send back just a string
    // The client code needs to take this into consideration
    res.json(token);
  } catch (err) {
    // Client will check for non-2xx status code 
    // 400 = Bad Request
    res.status(400).json(err);
  }
}

async function login(req, res) {
  try {
    console.log('Login request received with:', req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Missing email or password' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found');
      return res.status(400).json({ message: 'Invalid User' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      console.log('Password does not match');
      return res.status(400).json({ message: 'Invalid password' });
    }
    const token = createJWT(user);
    console.log('Login successful, returning token');
    res.json( token );
  } catch (err) {
    console.error('Login error:', err);
    res.status(400).json({ message: 'Bad Credentials' });
  }
}

function checkToken(req, res) {
  // req.user will always be there for you when a token is sent
  console.log('req.user', req.user);
  res.json(req.exp);
}
/*-- Helper Functions --*/

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}