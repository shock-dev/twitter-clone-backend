import { Router } from 'express';
import multer from 'multer';
import controller from '../controllers/upload.controller';

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.single('avatar'), controller.upload);

export default router;
