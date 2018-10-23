const { ObjectID } = require('mongodb');

const { mongoose0 } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');


// Todo.remove({}).then(result => {
//     console.log(result);
// });

// Todo.findOneAndRemove
//Todo.findByIdAndRemove

Todo.findByIdAndRemove('5bcef41650d07212d276cc85').then(todo => {
    console.log(todo);
});