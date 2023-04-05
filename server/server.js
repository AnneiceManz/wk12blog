const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const db = require('./db/db-connection.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';


const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

// creates an endpoint for the route "/""
app.get('/', (req, res) => {
    res.json({ message: 'Hola, from My template ExpressJS with React-Vite' });
});

//Post routes

// create the get request for blog posts in the endpoint '/api/blog_posts'
app.get('/api/posts', async (req, res) => {
    try {
        const { rows: posts } = await db.query('SELECT * FROM posts');
        res.send(posts);
    } catch (e) {
        return res.status(400).json({ e });
    }
});

  // create the get request for single post in the endpoint '/api/posts'
  app.get('/api/posts/:post_id', async (req, res) => {
    try {
        const post_id = req.params.post_id;
        const { rows: post } = await db.query('SELECT * FROM posts WHERE post_id=$1', [post_id]);
        res.send(post);
    } catch (e) {
        return res.status(400).json({ e });
    }
});

// create the POST request for posts
app.post('/api/posts', async (req, res) => {
    try {
        const newPost = {
            image_url: req.body.image_url,
            title: req.body.title,
            post_text: req.body.post_text,
            posted: req.body.posted
        };
        const result = await db.query(
            'INSERT INTO posts(image_url, title, post_text, posted) VALUES($1, $2, $3, $4) RETURNING *',
            [newPost.image_url, newPost.title, newPost.post_text, newPost.posted],
        );
        console.log(result.rows[0]);
        res.json(result.rows[0]);

    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });
    }

});

// delete request for posts
app.delete('/api/posts/:post_id', async (req, res) => {
    try {
        const post_id = req.params.post_id;
        await db.query('DELETE FROM posts WHERE post_id=$1', [post_id]);
        console.log("From the delete request-url", post_id);
        res.status(200).end();
    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });

    }
});

//A put request - Update a post 
app.put('/api/posts/:post_id', async (req, res) =>{
    const post_id = req.params.post_id
    const updatedPost = { post_id: req.body.post_id, image_url: req.body.image_url, title: req.body.title, post_text: req.body.post_text, posted: req.body.posted}
    console.log("In the server from the url - the post id", post_id);
    console.log("In the server, from the react - the post to be edited", updatedPost);
    const query = `UPDATE post SET image_url=$1, title=$2, post_text=$3, posted=$4 WHERE post_id=${post_id} RETURNING *`;
    const values = [updatedPost.image_url, updatedPost.title, updatedPost.post_text, updatedPost.posted];
    try {
      const updated = await db.query(query, values);
      console.log(updated.rows[0]);
      res.send(updated.rows[0]);
  
    }catch(e){
      console.log(e);
      return res.status(400).json({e})
    }
  })

  //Users routes

  // create the get request for user in the endpoint '/api/users'
app.get('/api/users', async (req, res) => {
    try {
        const { rows: users } = await db.query('SELECT * FROM users');
        res.send(users);
    } catch (e) {
        return res.status(400).json({ e });
    }
});

  // create the get request for single user in the endpoint '/api/users'
  app.get('/api/users/:user_id', async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const { rows: user } = await db.query('SELECT * FROM users WHERE user_id=$1', [user_id]);
        res.send(user);
    } catch (e) {
        return res.status(400).json({ e });
    }
});

// create the POST request for users
app.post('/api/users', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = {
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
            profile_pic: req.body.profile_pic
        };
        const result = await db.query(
            'INSERT INTO users(username, email, password, profile_pic) VALUES($1, $2, $3, $4) RETURNING *',
            [newUser.username, newUser.email, newUser.password, newUser.profile_pic],
        );
        console.log(result.rows[0]);
        res.json(result.rows[0]);

    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });
    }

});

// delete request for users
app.delete('/api/users/:user_id', async (req, res) => {
    try {
        const user_id = req.params.user_id;
        await db.query('DELETE FROM users WHERE user_id=$1', [user_id]);
        console.log("From the delete request-url", user_id);
        res.status(200).end();
    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });

    }
});

//A put request - Update a user
app.put('/api/users/:user_id', async (req, res) =>{
    //console.log(req.params);
    //This will be the id that I want to find in the DB - the student to be updated
    const user_id = req.params.user_id
    const updatedUser = { user_id: req.body.user_id, username: req.body.username, email: req.body.email, password: req.body.password, profile_pic: req.body.profile_pic}
    console.log("In the server from the url - the user id", user_id);
    console.log("In the server, from the react - the user to be edited", updatedUser);
    const query = `UPDATE users SET username=$1, email=$2, password=$3, profile_pic=$4 WHERE user_id=${user_id} RETURNING *`;
    const values = [updatedUser.username, updatedUser.email, updatedUser.password, updatedUser.profile_pic];
    try {
      const updated = await db.query(query, values);
      console.log(updated.rows[0]);
      res.send(updated.rows[0]);
  
    }catch(e){
      console.log(e);
      return res.status(400).json({e})
    }
  })

    //Category routes

  // create the get request for categories in the endpoint '/api/categories'
app.get('/api/categories', async (req, res) => {
    try {
        const { rows: categories } = await db.query('SELECT * FROM categories');
        res.send(categories);
    } catch (e) {
        return res.status(400).json({ e });
    }
});

  // create the get request for single category in the endpoint '/api/categories'
  app.get('/api/categories/:category_id', async (req, res) => {
    try {
        const category_id = req.params.category_id;
        const { rows: category } = await db.query('SELECT * FROM categories WHERE category_id=$1', [category_id]);
        res.send(category);
    } catch (e) {
        return res.status(400).json({ e });
    }
});

// create the POST request for categories
app.post('/api/categories', async (req, res) => {
    try {
        const newCategory = {
            category: req.body.category,
        };
        const result = await db.query(
            'INSERT INTO categories(category) VALUES($1) RETURNING *',
            [newCategory.category],
        );
        console.log(result.rows[0]);
        res.json(result.rows[0]);

    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });
    }

});

// delete request for categories
app.delete('/api/categories/:category_id', async (req, res) => {
    try {
        const category_id = req.params.category_id;
        await db.query('DELETE FROM categories WHERE category_id=$1', [category_id]);
        console.log("From the delete request-url", category_id);
        res.status(200).end();
    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });

    }
});

//A put request - Update a category
app.put('/api/categories/:category_id', async (req, res) =>{
    //console.log(req.params);
    //This will be the id that I want to find in the DB - the student to be updated
    const category_id = req.params.category_id
    const updatedCategory = { category_id: req.body.category_id, category: req.body.category}
    console.log("In the server from the url - the category id", category_id);
    console.log("In the server, from the react - the category to be edited", updatedCategory);
    const query = `UPDATE categories SET category=$1 WHERE category_id=${category_id} RETURNING *`;
    const values = [updatedCategory.category];
    try {
      const updated = await db.query(query, values);
      console.log(updated.rows[0]);
      res.send(updated.rows[0]);
  
    }catch(e){
      console.log(e);
      return res.status(400).json({e})
    }
  })


// console.log that your server is up and running
app.listen(PORT, () => {
    console.log(`Hola, Server listening on ${PORT}`);
});