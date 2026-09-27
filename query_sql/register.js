import * as controller from './controller.js';

export const registerPostsEndpoints = app => {
    app.get('/posts', controller.getAll);
    app.get('/posts/:id', controller.getById);
    app.delete('/posts/:id', controller.destroy);
};