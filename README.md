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










