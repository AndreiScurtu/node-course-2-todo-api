require('./config/config');

const _ = require('lodash'),
      express = require('express'),
      bodyParser = require('body-parser'),
      { ObjectID } = require('mongodb'),
      { mongoose } = require('./db/mongoose'),
      { Todo } = require('./models/todo'),
      { User } = require('./models/user'),
      { authenticate } = require('./middleware/authenticate');

const app = express(),
      port = process.env.PORT;

app.use(bodyParser.json());


// Create new 'todo'
app.post('/todos', (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });

    todo.save().then(doc => res.send(doc), e => res.status(400).send(e));
});


// Get all 'todos'
app.get('/todos', (req, res) => {
    Todo.find().then(todos => {
        res.send({ todos });
    }, e => res.status(400).send(e));
});


// Get a todo by its id
app.get('/todos/:id', (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send('ID is not valid');
    }

    Todo.findById(id)
        .then(todo => todo ? res.status(200).send({ todo }) : res.status(404).send('Unable to find todo'))
        .catch(e => res.status(400).send());
});


// Delete a 'todo' by its id
app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send('ID is not valid');
    }

    Todo.findByIdAndDelete(id)
        .then(todo => todo ? res.status(200).send({ todo }) : res.status(404).send('Unable to find todo'))
        .catch(e => res.status(400).send());
});


// Update a 'todo' by its id
app.patch('/todos/:id', (req, res) => {
    const id = req.params.id,
        body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send('ID is not valid');
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
        .then(todo => {
            if (!todo) {
                return res.status(404).send();
            }

            res.send({ todo });
        })
        .catch(e => releaseEvents.status(400).send());

});


// Create new user
app.post('/users', (req, res) => {
    const user = new User(_.pick(req.body, ['email', 'password']));

    user.save()
        .then(() => user.generateAuthToken())
        .then(token => res.header('x-auth', token).send(user))
        .catch(err => res.status(400).send(err));
});


// Get a specific user
app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});


// Login a user
app.post('/users/login', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password)
        .then(user => {
            user.generateAuthToken()
                .then(token => res.header('x-auth', token).send(user));
        })
        .catch(e => {
            res.status(400).send();
        });
});


// Log out a user
app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token)
        .then(() => res.status(200).send())
        .catch(e => res.status(400).send(e));
});


// Start listening on an environment defined port
// - the port is defined in 'config/config.js'
app.listen(port, () => console.log(`Started up at port ${port}`));

module.exports = { app };