import mysql from 'mysql2/promise.js';

export const connection = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'sqlPassword',
    database: 'express_blog_db'
});

console.log('Connesso al database express_blog_db');