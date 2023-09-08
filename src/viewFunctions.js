const connection = require('../db/connection');

const viewAllDepartments = () => {
    const query = 'SELECT id, name AS department FROM department';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
    });
};

module.exports = { viewAllDepartments };
