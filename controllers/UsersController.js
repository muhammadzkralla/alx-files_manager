import sha1 from 'sha1';
import dbClient from '../utils/db';

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;

    // Check if email is provided
    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }

    // Check if password is provided
    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    const usersCollection = dbClient.db.collection('users');

    // Check if the user already exists
    const userExists = await usersCollection.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'Already exist' });
    }

    // Hash the password
    const hashedPassword = sha1(password);

    // Create a new user
    const newUser = {
      email,
      password: hashedPassword,
    };

    // Insert the new user into the database
    const result = await usersCollection.insertOne(newUser);

    // Respond with the new user's id and email
    return res.status(201).json({
      id: result.insertedId,
      email,
    });
  }
}

export default UsersController;
