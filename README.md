# Nexon.js

A lightweight, powerful, and easy-to-learn Node.js framework for building modern web applications.

## Features
- Minimal and clean architecture
- Built-in routing system
- Flexible validation system
- Easy to extend and maintain
- Inspired by Node.js simplicity

## Installation
```bash
git clone https://github.com/Ab01faz101/Nexon.git
cd Nexon
npm install
```


# Nexon.js Validation System

A powerful and flexible validation system for Nexon.js, inspired by Laravel Validator.  
Supports strings, numbers, emails, URLs, phone numbers, dates, confirmed fields, regex, and file uploads.

---

## Installation

Validation is included in Nexon.js core. Just import it:

```js
const { validate } = require('./core/validation');

const data = {
    username: 'reza123',
    password: 'mypassword',
    age: 25,
    email: 'reza@example.com'
};

const rules = {
    username: 'required|alpha_num|min:3|max:16',
    password: 'required|min:6',
    age: 'required|numeric|min_value:18',
    email: 'required|email'
};

const errors = validate(data, rules);
console.log(errors); // null if all valid
```


### File Validation

```js
const data = {
    avatar: req.file // multer file object
};

const rules = {
    avatar: 'file_required|mimes:jpg,png|max_size:500000' // 500 KB
};

const errors = validate(data, rules);
if (errors) console.log(errors);

```

### Regex Validation

```js
const data = {
    username: 'user_01'
};

const rules = {
    username: 'required|regex:^[a-zA-Z0-9_]{3,16}$'
};

const errors = validate(data, rules);
console.log(errors);

```



## Supported Rules

### General
| Rule             | Description |
|-----------------|-------------|
| `required`       | Field must not be empty |
| `string`         | Field must be a string |
| `boolean`        | Field must be a boolean |
| `numeric`        | Field must be a number |
| `min:value`      | Minimum string length |
| `max:value`      | Maximum string length |
| `min_value:value`| Minimum numeric value |
| `max_value:value`| Maximum numeric value |
| `email`          | Must be a valid email |
| `url`            | Must be a valid URL |
| `alpha`          | Only letters |
| `alpha_num`      | Letters and numbers only |
| `phone`          | Valid phone number (+98 or 09xxxxxxxxx) |
| `date`           | Must match YYYY-MM-DD |
| `regex:pattern`  | Custom regex validation |
| `confirmed:field`| Value must match another field (e.g., password_confirmation) |

### File Rules
| Rule             | Description |
|-----------------|-------------|
| `file_required`  | File must be uploaded |
| `mimes:ext1,ext2`| File must be one of allowed extensions (jpg,png,gif, etc.) |
| `max_size:value` | Maximum file size in bytes |



# Nexon.js ORM

A lightweight ORM inspired by Laravel Eloquent, built for Nexon.js.  
Supports Models, basic CRUD operations, and chainable queries using Knex.

---

## Features

- Define models as JavaScript classes
- Simple CRUD:
  - `all()`, `find(id)`, `create(data)`, `update(id, data)`, `delete(id)`
- Chainable queries:
  - `where()`, `limit()`, `orderBy()`, `get()`, `first()`
- Uses Knex for database connection
- Easy to extend (relations, timestamps, soft deletes, etc.)




## Database Configuration

First, configure your database connection in:

`config/database.js`

```js
const knex = require('knex');

const db = knex({
    client: 'mysql2', // or 'pg', 'sqlite3'
    connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'nexon_db'
    }
});

module.exports = db;


```

---


### Creating a Model


Example: models/User.js


```js
const Model = require('../core/orm/Model');

class User extends Model {
    static get table() {
        return 'users';
    }
}

module.exports = User;

```



### Basic Usage


Import your model:

```js
const User = require('./models/User');

// All
const users = await User.all();

// Find by ID
const user = await User.find(1);



// Create a new record

await User.create({
    name: 'Reza',
    email: 'reza@example.com'
});

// Update a record
await User.update(1, {
    name: 'New Name'
});


// Delete a record
await User.delete(1);


```

### Query Builder (Chainable Queries)

You can build queries like this:

```js
const users = await User
    .where('id', '>', 5)
    .orderBy('id', 'desc')
    .limit(10)
    .get();
```

#### Get first result


```js
const user = await User
    .where('email', 'reza@example.com')
    .first();
```


### Using in Routes (Example)


```js
router.get('/users', async (req, res) => {
    const users = await User.all();
    res.send(users);
});
```

Note: When using await, your route handler must be async.










