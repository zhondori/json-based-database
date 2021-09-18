# Alisher Usmonov Backend homework
**JSON Based Dataabase in Node.js**

```js
const DB = require("homework-alisher");
const database = new DB("json_file_name");

;(async () => {
    // Add new user
    await database.newUser(name, surname, phone_number, __dirname);
    
    // Take all Users
    await database.getUsers(__dirname);
    
    // Take all User with phone number
    await database.getUsers(phone_number, __dirname);
})();
```