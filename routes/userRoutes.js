import exppress from 'express';
const router = exppress.Router();

router.get('/', (req, res) => {
  res.send('Hello World!');
});


export default router;
