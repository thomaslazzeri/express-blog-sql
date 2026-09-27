import express from 'express';
import { registerPostsEndpoints } from './resources/posts/register.js';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('rotta home');
});

registerPostsEndpoints(app);

app.listen(port, () => {
    console.log('server avviato');
})