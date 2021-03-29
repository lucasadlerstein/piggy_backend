const { validationResult } = require('express-validator');
const db = require("../models");
const Items = db.items;

exports.newItem = async (req, res) => {
    // Express Validator Error Messsages
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const newItem = {
        concept: req.body.concept,
        amount: req.body.amount,
        date: req.body.date,
        kind: req.body.kind,
        category: req.body.category,
        userId: req.params.userId
    }

    await Items.create(newItem).then(result => {
        return res.json({transaction: 'done'});
    }) 
    .catch(error => {
        return res.status(400).json({transaction: 'error', error});
    })
}

exports.editItem = async (req, res) => {
    // Express Validator Error Messsages
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    await Items.findOne({where: {id: req.body.id}})
        .then(async (responseItem) => {
            if(Number(responseItem.userId) === Number(req.params.userId)) {
                // Same user, can proceed.
                const updatedItem = {
                    concept: req.body.concept,
                    amount: req.body.amount,
                    date: req.body.date,
                    category: req.body.category
                }
            
                await Items.update(updatedItem, {where: {id: req.body.id}}).then(result => {
                    return res.json({transaction: 'done'});
                }) 
                .catch(error => {
                    console.log(error)
                    return res.status(400).json({transaction: 'error', error});
                })
            } else {
                return res.status(400).json({transaction: 'error', error: 'Not same user.'});
            }
        })
        .catch(error => {
            return res.status(400).json({transaction: 'error', error});
        })

    
}

exports.deleteItem = async (req, res) => {
    await Items.destroy({where: {id: req.params.itemId}})
        .then(response => {
            return res.json({transaction: 'done', response})
        })
        .catch(error => {
            return res.status(500).json({transaction: 'error', error})
        })
}

exports.listUserItems = async (req, res) => {
    await Items.findAll({where: {userId: req.params.userId}})
        .then(items => {
            return res.json({transaction: 'done', items})
        })
        .catch(error => {
            return res.status(400).json({transaction: 'error', error})
        })
}

exports.listOneItem = async (req, res) => {
    await Items.findOne({where: {id: req.params.id}})
        .then(item => {
            return res.json({transaction: 'done', item})
        })
        .catch(error => {
            return res.status(400).json({transaction: 'error', error})
        })
}