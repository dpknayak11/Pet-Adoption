import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyApplications, clearError } from '../features/adoptions/adoptionSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import '../styles.css';

const UserDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { myApplications, loading, error } = useSelector((state) => state.adoptions);

  useEffect(() => {
    dispatch(getMyApplications());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'PENDING':
        return 'bg-warning text-dark';
      case 'APPROVED':
        return 'bg-success';
      case 'REJECTED':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  };

  const getStatusText = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  if (loading) return <Loader />;

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section mb-5">
        <h1>Welcome, {user?.name || 'User'}! 👋</h1>
        <p>Track your adoption applications and find your perfect companion</p>
      </div>

      {/* Featured Pet Video Section */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="card shadow-lg overflow-hidden">
            <div className="card-header">
              <h5 className="mb-0"><i className="bi bi-play-circle me-2"></i>Featured Pets</h5>
            </div>
            <div className="card-body p-0">
              <div className="video-container">
                <div className="video-wrapper">
                  <img 
                    src="/pet-video-cover.jpg" 
                    alt="Featured Pets" 
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </div>
              </div>
              <div className="p-4 text-center bg-light">
                <p className="text-muted mb-2">Discover adorable pets waiting for their forever homes</p>
                <a href="/" className="btn btn-primary">
                  <i className="bi bi-heart me-1"></i>Browse All Pets
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Applications Section */}
      <div className="row">
        <div className="col-12">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">My Applications ({myApplications.length})</h5>
            </div>
            <div className="card-body">
              {myApplications.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>Pet Name</th>
                        <th>Application Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myApplications.map((application) => (
                        <tr key={application._id}>
                          <td className="fw-bold">{application.petId?.name || 'Unknown Pet'}</td>
                          <td>
                            {new Date(application.createdAt).toLocaleDateString()}
                          </td>
                          <td>
                            <span className={`badge ${getStatusBadgeClass(application.status)}`}>
                              {getStatusText(application.status)}
                            </span>
                          </td>
                          <td>
                            <button className="btn btn-sm btn-outline-primary">
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="alert alert-info text-center py-5">
                  <p className="mb-2">No applications yet</p>
                  <p className="text-muted">
                    Start exploring and apply for pets you'd like to adopt!
                  </p>
                  <a href="/" className="btn btn-primary mt-3">
                    Browse Pets
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
