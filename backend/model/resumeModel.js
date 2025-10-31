import mongoose from 'mongoose'

const ResumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId,
     ref: 'User', 
    required:true
}, 
title:{
    type:String,
    required:true
},
thumbnailLink:{
    type: String
},
template:{
    theme: String,
    colorpalette:[String]
},

profileInfo:{
    profilePreviewUrl: String,
    fullName: String,
    designation: String,
    summary: String,
},
contactInfo:{
    email: String,
    phone: String,
    location :String,
    linkedin: String,
    github: String,
    website: String,
},
//work exp
workExperience:[
    {
        company: String,
        role: String,
        startDate: String,
        endDate: String,
        description: String,
    },
],
education:[
    {
        institution: String,
        degree: String,
        fieldOfStudy: String,
        startDate: String,
        endDate: String,
        description: String,
    },
],
    skills:
    [ {name:String,
      progress:Number, 
    
},],
     projects:
     [{
        title: String,
        link: String,
        github: String,
        liveDemo: String,
     },],
     certifications:[{
        title: String,
        issuer: String,
        date: String,
        credentialId: String,
        credentialUrl: String,
     },],
     languages: [{
        name: String,
        progress: Number,
     },],
     interests:[String],
    },{ timestamps:{ createdAt: "createdAt",updatedAt:"updatedAt" }
});
export default mongoose.model("Resume", ResumeSchema);



