"use strict";
// Ek In Memory DB
// save('user-1', { fname, lname, })
Object.defineProperty(exports, "__esModule", { value: true });
class InMemoryDB {
    _db;
    constructor() {
        this._db = new Map();
    }
    insertUser(data) {
        if (this._db.has(data.id)) {
            throw new Error(`User with ID ${data.id} already exists`);
        }
        this._db.set(data.id, data);
        return data.id;
    }
    updateUser(id, updateData) {
        if (!this._db.has(id))
            throw new Error(`User with ID ${id} does not exists`);
        this._db.set(id, { ...updateData, id });
        return true;
    }
    getUserById(id) {
        if (!this._db.has(id))
            throw new Error(`User with ID ${id} does not exists`);
        return this._db.get(id);
    }
}
const myDb = new InMemoryDB();
myDb.insertUser({
    id: '1',
    fname: 'Piyush',
    email: 'piyush@email.com',
    contact: { mobile: '99999' },
    address: {
        country: 'In',
        pin: 147001,
        street: 1
    }
});
myDb.updateUser('1', {
    fname: 'Piyush',
    email: 'piyush@email.com',
    contact: { mobile: '99999' },
    address: {
        country: 'In',
        pin: 147001,
        street: 1
    }
});
console.log(myDb.getUserById('1'));
const user = myDb.getUserById('1');
console.log(user);
//# sourceMappingURL=my-script.js.map