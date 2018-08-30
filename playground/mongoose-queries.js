const { ObjectID } = require('mongodb');

const { mongoose0 } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');


// const id = '5b87a07e931e7c12349784bbb';

// if (!ObjectID.isValid(id)) {
//     console.log('ID not valid');
// }

// Todo.find({
//     _id: id
// }).then(todos => console.log('Todos', todos));

// Todo.findOne({
//     _id: id
// }).then(todo => console.log('Todo', todo));

// Todo.findById(id).then(todo => {
//     if (!todo) {
//         return console.log('Id not found');
//     }
//     console.log('Todo by Id', todo);
// }).catch(e => console.log(e));

User
    .findById('5b868f00f8895e3ff8dc7912')
    .then(user => console.log(user ? user : 'User not found'))
    .catch(e => console.log(e));