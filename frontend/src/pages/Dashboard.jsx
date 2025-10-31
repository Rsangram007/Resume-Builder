import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { dashboardStyles as styles } from '../assets/dummystyle';
import { LucideFilePlus } from 'lucide-react';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPath';
import { ResumeSummaryCard } from '../components/Cards';
import toast from 'react-hot-toast';
import moment from 'moment';

import CreateResumeForm from '../components/CreateResumeForm';
import Modal from '../components/Modal';

const Dashboard = () => {
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [allResumes, setAllResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resumeToDelete, setResumeToDelete] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const calculateCompletion = (resume) => {
    let completedFields = 0;
    let totalFields = 0;

    totalFields += 3;
    if (resume.profileInfo?.fullName) completedFields++;
    if (resume.profileInfo?.designation) completedFields++;
    if (resume.profileInfo?.summary) completedFields++;

    totalFields += 2;
    if (resume.contactInfo?.email) completedFields++;
    if (resume.contactInfo?.phone) completedFields++;

    resume.workExperience?.forEach(exp => {
      totalFields += 5;
      if (exp.company) completedFields++;
      if (exp.role) completedFields++;
      if (exp.startDate) completedFields++;
      if (exp.endDate) completedFields++;
      if (exp.description) completedFields++;
    });

    resume.education?.forEach(edu => {
      totalFields += 4;
      if (edu.degree) completedFields++;
      if (edu.institution) completedFields++;
      if (edu.startDate) completedFields++;
      if (edu.endDate) completedFields++;
    });

    resume.skills?.forEach(skill => {
      totalFields += 2;
      if (skill.name) completedFields++;
      if (skill.progress > 0) completedFields++;
    });

    resume.projects?.forEach(project => {
      totalFields += 4;
      if (project.title) completedFields++;
      if (project.description) completedFields++;
      if (project.github) completedFields++;
      if (project.liveDemo) completedFields++;
    });

    resume.certifications?.forEach(cert => {
      totalFields += 3;
      if (cert.title) completedFields++;
      if (cert.issuer) completedFields++;
      if (cert.year) completedFields++;
    });

    resume.languages?.forEach(lang => {
      totalFields += 2;
      if (lang.name) completedFields++;
      if (lang.progress > 0) completedFields++;
    });

    totalFields += (resume.interests?.length || 0);
    completedFields += (resume.interests?.filter(i => i?.trim() !== "").length || 0);

    return totalFields === 0 ? 0 : Math.round((completedFields / totalFields) * 100);
  };

  const fetchAllResumes = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_PATHS.RESUME.GET_ALL);
      const resumesWithCompletion = response.data.map(resume => ({
        ...resume,
        completion: calculateCompletion(resume),
      }));
      setAllResumes(resumesWithCompletion);
    } catch (error) {
      console.error('Error fetching resumes:', error);
      setAllResumes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllResumes();
  }, []);

  const handleDeleteResume = async () => {
    if (!resumeToDelete) return;
    try {
      await axiosInstance.delete(API_PATHS.RESUME.DELETE(resumeToDelete));
      toast.success('Resume deleted successfully');
      fetchAllResumes();
    } catch (error) {
      console.error('Error deleting resume:', error);
      toast.error('Failed to delete resume');
    } finally {
      setResumeToDelete(null);
      setShowDeleteConfirm(false);
    }
  };

  const handleDeleteClick = (id) => {
    setResumeToDelete(id);
    setShowDeleteConfirm(true);
  };

  const getHeaderSubtitle = () => {
    if (loading) return 'Loading your resumes...';
    if (allResumes.length === 0) return 'Start building your professional resume';
    if (allResumes.length === 1) return 'You have 1 resume';
    return `You have ${allResumes.length} resumes`;
  };

  return (
    <DashboardLayout>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.headerWrapper}>
          <div>
            <h1 className={styles.headerTitle}>My Resumes</h1>
            <p className={styles.headerSubtitle}>{getHeaderSubtitle()}</p>
          </div>

          <button
            onClick={() => setOpenCreateModal(true)}
            className={styles.createButton}
          >
            <div className={styles.createButtonOverlay}></div>
            <div className={styles.createButtonContent}>
              <LucideFilePlus size={18} />
              <span>Create Now</span>
            </div>
          </button>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className={styles.spinnerWrapper}>
            <div className={styles.spinner}></div>
          </div>
        )}

        {/* Empty State */}
        {!loading && allResumes.length === 0 && (
          <div className={styles.emptyStateWrapper}>
            <div className={styles.emptyIconWrapper}>
              <LucideFilePlus size={32} className="text-violet-600" />
            </div>
            <h3 className={styles.emptyTitle}>No Resumes Yet</h3>
            <p className={styles.emptyText}>
              You haven't created any resumes yet. Start building your professional resume by ResumeExpert24.
            </p>
            <button className={styles.createButton} onClick={() => setOpenCreateModal(true)}>
              <div className={styles.createButtonOverlay}></div>
              <span className={styles.createButtonContent}>
                Create Your First Resume
                <LucideFilePlus className='group-hover:translate-x-1 transition-transform' size={20} />
              </span>
            </button>
          </div>
        )}

        {/* Resume Grid */}
        {!loading && allResumes.length > 0 && (
          <div className={styles.grid}>
            {allResumes.map((resume) => (
              <ResumeSummaryCard
                key={resume._id}
                imgUrl={resume.thumbnaillink}
                title={resume.title}
                createdAt={resume.createdAt}
                updatedAt={resume.updatedAt}
                onSelect={() => navigate(`/resume/${resume._id}`)}
                onDelete={() => handleDeleteClick(resume._id)}
                completion={resume.completion || 0}
                isPremium={resume.isPremium}
                isNew={moment().diff(moment(resume.createdAt), 'days') < 7}
              />
            ))}
          </div>
        )}
      </div>

      {/* Create Resume Modal */}
      {openCreateModal && (
        <Modal
          isOpen={openCreateModal}
          onClose={() => setOpenCreateModal(false)}
          hideHeader
          maxwidth="max-w-2xl"
        >
          <div className='p-6'>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Create new Resume</h3>
              <button onClick={() => setOpenCreateModal(false)} className={styles.modalCloseButton}>
                X
              </button>
            </div>
            <CreateResumeForm
              onSuccess={() => {
                setOpenCreateModal(false);
                fetchAllResumes();
              }}
            />
          </div>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
{/* Delete Confirmation Modal */}
{showDeleteConfirm && (
  <Modal
    isOpen={showDeleteConfirm}
    onClose={() => setShowDeleteConfirm(false)}
    maxwidth="max-w-md"
  >
    {/* Header with title left and Delete button right */}
    {/* Header with title on left and Delete button on right */}
<div className="flex items-center justify-between p-1 border-b">
  <h2 className="text-lg font-semibold">Confirm Deletion</h2>
  
  <button
    onClick={handleDeleteResume}
    className="px-2 py-1 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-md font-semibold hover:from-purple-600 hover:to-purple-800 transition-colors"
  >
    Delete
  </button>
</div>


    {/* Body with icon and texts */}
    <div className="flex flex-col items-center py-8 px-6 space-y-4">
      {/* Trash Icon */}
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v1h6V4a1 1 0 00-1-1m-4 0h4" />
      </svg>

      {/* Bold question */}
      <h3 className="text-lg font-semibold text-gray-900">Delete Resume?</h3>

      {/* Description */}
      <p className="text-center text-gray-600 text-sm max-w-xs">
        Are you sure you want to delete this resume? This action cannot be undone.
      </p>
    </div>
  </Modal>
)}


    </DashboardLayout>
  );
};

export default Dashboard;
