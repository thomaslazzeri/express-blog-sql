import { connection } from '../../db.js';

export const getAll = async (req, res) => {
    try {
        const sql = 'select * from posts';
        const [results] = await connection.query(sql);

        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'errore nel recupero dei post' });
    }
};

export const getById = async (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id) || !Number.isInteger(id)) {
        res.status(400).json({ error: 'id must be an integer' });
        return;
    }

    try {
        const sqlPost = 'select * from posts where id = ?';
        const [[resultPost]] = await connection.query(sqlPost, [id]);

        if (resultPost === undefined) {
            res.status(404).json({ error: 'post not found' });
            return;
        }

        const sqlTags = `
    select t.id, t.label
    from tags t
    join post_tag pt on pt.tag_id = t.id
    where pt.post_id = ?
    `;


        const [resultTags] = await connection.query(sqlTags, [id]);
        resultPost.tags = resultTags;

        res.json(resultPost);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'errore nel recupero del post' });
    }
};

export const destroy = async (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id) || !Number.isInteger(id)) {
        res.status(400).json({ error: 'id must be an integer' });
        return;
    }
    try {


        const sql = 'delete from posts where id = ?';
        const [result] = await connection.query(sql, [id]);

        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'post not found' });
            return;
        }

        res.sendStatus(204);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'errore nella cancellazione del post' });
    }
};