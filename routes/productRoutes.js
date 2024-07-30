import { Router } from "express";

const router = Router();

router.get('/top', (req, res) => {
    res.send('Top products');
})

export default router;