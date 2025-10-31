import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';
import {
  createResume,
  getResumeById,
  getUserResumes,
  updateResume,
  deleteResumes
} from '../controllers/resumeController.js';
import { uploadResumeImages } from '../controllers/uploadImages.js';

const resumeRouter = express.Router();

resumeRouter.post('/', protect, createResume);
resumeRouter.get('/', protect, getUserResumes);
resumeRouter.get('/:id', protect, getResumeById);
resumeRouter.put('/:id', protect, updateResume);
resumeRouter.delete('/:id', protect, deleteResumes);

resumeRouter.put('/:id/upload-images',protect,uploadResumeImages)
  //upload.fields([{ name: "thumbnail" }, { name: "profileImage" }]),
  //uploadResumeImages


export default resumeRouter;
