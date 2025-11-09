require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./routes/users'); // or './models/user' if you moved it

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error(err));

// create a new user
const createUser = async () => {
  try {
    const user = new User({ username: 'admin', email: 'admin@example.com' });
    await User.register(user, 'admin123'); // password gets hashed automatically
    console.log('✅ User created successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error creating user:', err);
    process.exit(1);
  }
};

createUser();
