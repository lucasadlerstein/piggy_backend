module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
        name: {
            type: Sequelize.STRING(150),
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            isEmail: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return Users;
};