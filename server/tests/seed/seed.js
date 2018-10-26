const { ObjectID } = require('mongodb'),
      jwt = require('jsonwebtoken'),
      { Todo } = require('./../../models/todo'),
      { User } = require('./../../models/user');


const userOneId = new ObjectID(),
      userTwoId = new ObjectID();

const users = [{
    _id: userOneId,
    email: 'aaa@example.com',
    password: 'userOnePass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
    }]
}, {
    _id: userTwoId,
    email: 'bbb@example.com',
    password: 'userTwoPass'
}];


const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333
}];


const populateTodos = done => {    
    Todo.deleteMany({})
        .then(() => Todo.insertMany(todos))
        .then(() => done());
};


const populateUsers = done => {
    User.deleteMany({})
        .then(() => {
            const userOne = new User(users[0]).save(),
                  userTwo = new User(users[1]).save();

            return Promise.all([userOne, userTwo]);
        })
        .then(() => done());
}

module.exports = { todos, populateTodos, users, populateUsers };