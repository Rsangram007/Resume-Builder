import Resume from '../model/resumeModel.js';
import fs from 'fs';
import path from 'path';

// =========================
// Create Resume
// =========================
export const createResume = async (req, res) => {
  try {
    const { title } = req.body;

    // Ensure _id is not manually passed in req.body
    const cleanedBody = { ...req.body };
    delete cleanedBody._id;

    // Default resume structure
    const defaultResumeData = {
      profileInfo: {
        profileImg: null,
        previewUrl: '',
        fullName: '',
        designation: '',
        summary: '',
      },
      contactInfo: {
        email: '',
        phone: '',
        location: '',
        linkedin: '',
        github: '',
        website: '',
      },
      workExperience: [
        {
          company: '',
          role: '',
          startDate: '',
          endDate: '',
          description: '',
        },
      ],
      education: [
        {
          institution: '',
          degree: '',
          startDate: '',
          endDate: '',
        },
      ],
      skills: [
        {
          name: '',
          progress: 0,
        },
      ],
      projects: [
        {
          title: '',
          description: '',
          github: '',
          liveDemo: '',
        },
      ],
      certifications: [
        {
          title: '',
          issuer: '',
          year: '',
        },
      ],
      languages: [
        {
          name: '',
          progress: '',
        },
      ],
      interests: [''],
    };

    const newResume = await Resume.create({
      userId: req.user._id,
      title,
      ...defaultResumeData,
      ...cleanedBody,
    });

    res.status(201).json(newResume);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create resume', error: error.message });
  }
};

// =========================
// Get All Resumes for Logged-in User
// =========================
export const getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get resumes', error: error.message });
  }
};

// =========================
// Get Resume By ID
// =========================
export const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById({ _id: req.params.id });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get resume', error: error.message });
  }
};

// =========================
// Update Resume
// =========================
export const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found or not authorized' });
    }

    // Merge updates
    Object.assign(resume, req.body);
//save updated resume
    const savedResume = await resume.save();
    res.json(savedResume);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update resume', error: error.message });
  }
};

// =========================
// Delete Resume
// =========================
export const deleteResumes = async (req, res) => {
  try {
    const resume = await Resume.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found or not authorized' });
    }

    const uploadFolder = path.join(process.cwd(), 'uploads');

    // Delete thumbnail if exists
    if (resume.thumbnailLink) {
      const oldThumbnail = path.join(uploadFolder, path.basename(resume.thumbnailLink));
      if (fs.existsSync(oldThumbnail)) {
        fs.unlinkSync(oldThumbnail);
      }
    }

    // Delete profile preview image if exists
    if (resume.profileInfo?.previewUrl) {
      const oldProfile = path.join(uploadFolder, path.basename(resume.profileInfo.previewUrl));
      if (fs.existsSync(oldProfile)) {
        fs.unlinkSync(oldProfile);
      }
    }

    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete resume', error: error.message });
  }
};

// =========================
// Get All Resumes (Admin or Debug Only)
// =========================
export const getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.find();
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch all resumes', error: error.message });
  }
};
