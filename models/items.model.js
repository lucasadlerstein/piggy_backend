module.exports = (sequelize, Sequelize) => {
    const Items = sequelize.define("items", {
        concept: {
            type: Sequelize.STRING,
            allowNull: false
        },
        amount: {
            type: Sequelize.FLOAT(15),
            allowNull: false
        },
        date: {
            type: Sequelize.DATEONLY
        },
        kind: {
            type: Sequelize.INTEGER(1),
            allowNull: false
        },
        category: {
            type: Sequelize.STRING(100)
        },
        userId: {
            type: Sequelize.INTEGER(5),
            allowNull: false
        }
    });

    return Items;
};