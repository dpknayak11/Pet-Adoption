import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPets } from '../features/pets/petSlice';
import { getAllApplications } from '../features/adoptions/adoptionSlice';
import Loader from '../components/Loader';
import '../styles.css';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { pets, loading: petsLoading } = useSelector((state) => state.pets);
  const { allApplications, loading: applicationsLoading } = useSelector((state) => state.adoptions);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchPets({ page: 1, limit: 1000 }));
    dispatch(getAllApplications());
  }, [dispatch]);

  const totalPets = pets.length;
  const adoptedPets = pets.filter((p) => p.adopted).length;
  const availablePets = totalPets - adoptedPets;
  const pendingApplications = allApplications.filter((app) => app.status === 'PENDING').length;
  const approvedApplications = allApplications.filter((app) => app.status === 'APPROVED').length;

  if (petsLoading && applicationsLoading) return <Loader />;

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section mb-5">
        <h1><i className="bi bi-gear me-2"></i>Admin Dashboard</h1>
        <p>Manage your pet adoption system and applications</p>
      </div>

      {/* Featured Pet Video Section */}
      {/* <div className="row mb-5">
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
                <p className="text-muted mb-2">Quick access to manage your pet adoption system</p>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Statistics Cards */}
      <div className="row g-4 mb-5">
        <div className="col-md-6 col-lg-3">
          <div className="stat-card fade-in">
            <h6><i className="bi bi-paw me-1"></i>Total Pets</h6>
            <h3 className="text-primary">{totalPets}</h3>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="stat-card fade-in">
            <h6><i className="bi bi-check-circle me-1"></i>Available</h6>
            <h3 className="text-success">{availablePets}</h3>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="stat-card fade-in">
            <h6><i className="bi bi-heart-fill me-1"></i>Adopted</h6>
            <h3 className="text-warning">{adoptedPets}</h3>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="stat-card fade-in">
            <h6><i className="bi bi-hourglass me-1"></i>Pending Applications</h6>
            <h3 className="text-danger">{pendingApplications}</h3>
          </div>
        </div>
      </div>

      {/* Applications Summary */}
      <div className="row g-4 mb-5">
        <div className="col-md-6">
          <div className="stat-card fade-in">
            <h6><i className="bi bi-file-earmark me-1"></i>Total Applications</h6>
            <h3>{allApplications.length}</h3>
          </div>
        </div>

        <div className="col-md-6">
          <div className="stat-card fade-in">
            <h6><i className="bi bi-check-all me-1"></i>Approved Applications</h6>
            <h3 className="text-success">{approvedApplications}</h3>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="row g-4 mb-5">
        <div className="col-md-6">
          <Link to="/admin/pets" className="btn btn-primary btn-lg w-100 shadow-hover">
            <i className="bi bi-plus-circle me-2"></i>
            Manage Pets
          </Link>
        </div>
        <div className="col-md-6">
          <Link to="/admin/applications" className="btn btn-success btn-lg w-100 shadow-hover">
            <i className="bi bi-checkmark-circle me-2"></i>
            Review Applications
          </Link>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Recent Applications</h5>
            </div>
            <div className="card-body">
              {allApplications.slice(0, 5).length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-sm">
                    <thead className="table-light">
                      <tr>
                        <th>Pet</th>
                        <th>Applicant</th>
                        <th>Status</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allApplications.slice(0, 5).map((app) => (
                        <tr key={app._id}>
                          <td>{app.petId?.name || 'Unknown'}</td>
                          <td>{app.userId?.name || 'Unknown'}</td>
                          <td>
                            <span className={`badge bg-${app.status === 'PENDING' ? 'warning text-dark' : app.status === 'APPROVED' ? 'success' : 'danger'}`}>
                              {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                            </span>
                          </td>
                          <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-muted text-center py-3">No applications yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
