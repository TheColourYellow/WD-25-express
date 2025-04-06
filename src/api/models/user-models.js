/*const userItems = [
  {
    user_id: 3609,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@metropolia.fi',
    role: 'user',
    password: 'password',
  },
  {
    user_id: 800,
    name: 'Fict Name',
    username: 'Fiction',
    email: 'fict@metropolia.fi',
    role: 'user',
    password: 'password1',
  },
];*/

import promisePool from '../../utils/database.js';

const listAllUsers = async () => {
  const [rows] = await promisePool.execute('SELECT * FROM wsk_users');
  //const [rows] = await promisePool.query('SELECT * FROM users');
  console.log('rows', rows);
  console.log(typeof rows);
  return rows;
};

const findUserById = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_users WHERE user_id = ?',
    [id]
  );
  console.log('rows', rows);
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

const addUser = async (user) => {
  const {name, username, email, password} = user;
  const sql = `INSERT INTO wsk_users (name, username, email, password)
               VALUES (?, ?, ?, ?)`;
  const params = [name, username, email, password];
  const rows = await promisePool.execute(sql, params);
  console.log('rows', rows);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return {user_id: rows[0].insertId};
};

const modifyUser = async (user, id) => {
  const sql = promisePool.format(`UPDATE wsk_users SET ? WHERE user_id = ?`, [
    user,
    id,
  ]);
  const rows = await promisePool.execute(sql);
  console.log('rows', rows);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return {message: 'success'};
};

const removeUser = async (id) => {
  const connection = await promisePool.getConnection();
  try {
    await connection.beginTransaction();
    await connection.execute('DELETE FROM wsk_cats WHERE owner = ?', [id]);
    const sql = connection.format('DELETE FROM wsk_users WHERE user_id =?', [
      id,
    ]);
    const [result] = await connection.execute(sql);

    if (result.affectedRows === 0) {
      return {message: 'User not deleted'};
    }
    await connection.commit();

    return {message: 'User deleted'};
  } catch (error) {
    await connection.rollback();
    console.error('error', error.message);
    return {
      message: error.message,
    };
  } finally {
    connection.release();
  }
};

const logIn = async (user) => {
  const sql = promisePool.format(`SELECT * FROM wsk_users WHERE username = ?`, [
    user,
  ]);
  const [rows] = await promisePool.execute(sql);
  console.log('Rows', rows);
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
  /* Alternative syntax
  const sql = `SELECT * FROM wsk_users WHERE username = ?`;
  const [rows] = await promisePool.execute(sql, [user]);
  */
};

export {listAllUsers, findUserById, addUser, modifyUser, removeUser, logIn};
