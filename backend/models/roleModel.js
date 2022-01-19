const { Schema, model } = require('mongoose');

const roleSchema = new Schema({
    name: { type: String, required: true },
}, { collection: 'roles' });

const Role = model('Role', roleSchema);
module.exports = Role;