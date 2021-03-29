const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const itemsController = require('../controllers/itemsController');

// Create item
router.post('/new/:userId',
    [
        check('concept', 'Concept is required').not().isEmpty(),
        check('amount', 'Amount is required').not().isEmpty(),
        check('kind', 'Kind of item is required').not().isEmpty(),
    ],
    itemsController.newItem
);

// Edit item
router.put('/edit/:userId',
    [
        check('id', 'Item ID is required').not().isEmpty(),
        check('concept', 'Concept is required').not().isEmpty(),
        check('amount', 'Amount is required').not().isEmpty(),
        check('category', 'Category of item is required').not().isEmpty(),
        check('date', 'Date of item is required').not().isEmpty(),
    ],
    itemsController.editItem
);

// Delete item
router.delete('/delete/:itemId',
    itemsController.deleteItem
);

// List Items per User
router.get('/list/:userId',
    itemsController.listUserItems
);

// List One Item
router.get('/one/:id',
    itemsController.listOneItem
);

module.exports = router;