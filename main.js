const fs = require('fs/promises');
const path = require('path');

class Database {
  constructor(name) {
    this.name = name;
  }
  getUsers = async (dir) => {
    try {
      await fs.readFile(path.join(dir, `${this.name}.json`), {
        encoding: 'utf8',
      });
    } catch {
      await fs.writeFile(
        path.join(dir, `${this.name}.json`),
        JSON.stringify({ users: [] })
      );
    } finally {
      let data = await fs.readFile(path.join(dir, `${this.name}.json`), {
        encoding: 'utf8',
      });
      data = JSON.parse(data);
      return data;
    }
  };

  newUser = async (name, surname, phone, directory) => {
    const user = {
      name,
      surname,
      phone,
    };

    const db = await this.getUsers(directory);
    if (db.users.length > 0) {
      if (db.users.find((usr) => usr.phone === phone)) {
        console.log(`${phone} number already exists!`);
      } else {
        db.users.push(user);
        await fs.writeFile(
          path.join(directory, `${this.name}.json`),
          JSON.stringify(db)
        );
      }
    } else {
      db.users.push(user);
      await fs.writeFile(
        path.join(directory, `${this.name}.json`),
        JSON.stringify(db)
      );
    }
  };

  getUser = async (phone, directory) => {
    const data = await this.getUsers(directory);
    for (let i = 0; i < data.users.length; i++) {
      if (data.users[i].phone === phone) {
        return data.users[i];
      }
    }
  };
}

const dtb = new Database('databse');
dtb.newUser('Alisher', 'Usmonov', 6666066, __dirname);
module.exports = Database;