module.exports = (app) => {
    const items = require('../controllers/item.controller.js');

    app.post('/items', items.create);
    app.get('/items', items.findAll);
    app.get('/items/:id', items.findOne);
    app.put('/items/:id', items.update);
    app.delete('/items/:id', items.delete);
};
