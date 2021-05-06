import dotenv from 'dotenv';

dotenv.config();

import { Router } from 'express';
import multer from 'multer';
import controller from '../controllers/upload.controller';

const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = Router();

router.post('/', upload.single('avatar'), controller.upload);

export default router;
