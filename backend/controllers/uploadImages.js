import fs from 'fs';
import path from 'path';
import Resume from '../model/resumeModel.js';

/**
 * Controller to upload thumbnail and profile image for a resume
 * Assumes multer middleware is used in the route
 */
export const uploadResumeImages = async (req, res) => {
  try {
    upload.fields([{name:"thumbnail"},{name:"profileImage"}])
    (req,res,async(err)=>{
        if(err){
return res.status(400).json({message:"file upload failed",error:err.message})
      }
      const resumeId = req.params.id;
      const resume = await Resume.findOne({_id: resumeId, userId: req.user._id})
     if(!resume){
      return res.status(404).json({message:"Resume not found"})
     }
    //})
  //}
    

    //if (!req.user) {
    
    

    const uploadFolder = path.join(process.cwd(), "uploads");
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const newThumbnail = req.files.thumbnail?.[0];
    const newProfileImage = req.files.profileImage?.[0];

    // Handle thumbnail
    if (newThumbnail) {
      if (resume.thumbnailLink) {
        const oldThumbPath = path.join(uploadFolder, path.basename(resume.thumbnailLink));
        if (fs.existsSync(oldThumbPath)) 
          fs.unlinkSync(oldThumbPath);
      }
      resume.thumbnailLink = `${baseUrl}/uploads/${newThumbnail.filename}`;
    }

    // Handle profile image
    if (newProfileImage) {
      if (resume.profileInfo.profilePreviewUrl) {
        const oldProfile= path.join(uploadFolder, path.basename(resume.profileInfo.profilePreviewUrl));
        if (fs.existsSync(oldProfile)) 
          fs.unlinkSync(oldProfile);
      }
      resume.profileInfo.profilePreviewUrl = `${baseUrl}/uploads/${newProfileImage.filename}`;
    }

    await resume.save();
    res.status(200).json({
      message:"image upload successfully",
     thumbnailLink: resume.thumbnailLink,
      profilePreviewUrl: resume.profileInfo.profilePreviewUrl
    })
  })

  } catch (err) {
    console.error(" Image upload failed:", err);
    return res.status(500).json({
      message: "Image upload failed",
      error: err.message,
    });
  }
};
