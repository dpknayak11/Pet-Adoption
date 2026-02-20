import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllApplications, updateApplicationStatus, clearError, clearSuccessMessage } from '../features/adoptions/adoptionSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import '../styles.css';

const Applications = () => {
  const dispatch = useDispatch();
  const { allApplications, loading, error, successMessage } = useSelector((state) => state.adoptions);

  useEffect(() => {
    dispatch(getAllApplications());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearSuccessMessage());
    }
  }, [successMessage, dispatch]);

  const handleUpdateStatus = (applicationId, newStatus) => {
    dispatch(updateApplicationStatus({ applicationId, status: newStatus }));
  };

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

  const pendingApplications = allApplications.filter((app) => app.status === 'PENDING');
  const approvedApplications = allApplications.filter((app) => app.status === 'APPROVED');
  const rejectedApplications = allApplications.filter((app) => app.status === 'REJECTED');

  if (loading && allApplications.length === 0) return <Loader />;

  return (
    <div>
      {/* Statistics */}
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card shadow text-center">
            <div className="card-body">
              <h6 className="card-title text-muted">Total Applications</h6>
              <h3>{allApplications.length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow text-center">
            <div className="card-body">
              <h6 className="card-title text-muted">Pending</h6>
              <h3 className="text-warning">{pendingApplications.length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow text-center">
            <div className="card-body">
              <h6 className="card-title text-muted">Approved</h6>
              <h3 className="text-success">{approvedApplications.length}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Applications */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow">
            <div className="card-header bg-warning text-dark">
              <h5 className="mb-0">Pending Applications ({pendingApplications.length})</h5>
            </div>
            <div className="card-body p-0">
              {pendingApplications.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Applicant</th>
                        <th>Pet</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Application Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingApplications.map((application) => (
                        <tr key={application._id}>
                          <td className="fw-bold">{application.userId?.name || 'Unknown'}</td>
                          <td>{application.petId?.name || 'Unknown Pet'}</td>
                          <td>{application.userId?.email || 'N/A'}</td>
                          <td>{application.userId?.phone || 'N/A'}</td>
                          <td>{new Date(application.createdAt).toLocaleDateString()}</td>
                          <td>
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-sm btn-success"
                                onClick={() => handleUpdateStatus(application._id, 'APPROVED')}
                                disabled={loading}
                              >
                                Approve
                              </button>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleUpdateStatus(application._id, 'REJECTED')}
                                disabled={loading}
                              >
                                Reject
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="alert alert-info m-3 mb-0">No pending applications</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Approved Applications */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow">
            <div className="card-header bg-success text-white">
              <h5 className="mb-0">Approved Applications ({approvedApplications.length})</h5>
            </div>
            <div className="card-body p-0">
              {approvedApplications.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Applicant</th>
                        <th>Pet</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Approved Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {approvedApplications.map((application) => (
                        <tr key={application._id}>
                          <td className="fw-bold">{application.userId?.name || 'Unknown'}</td>
                          <td>{application.petId?.name || 'Unknown Pet'}</td>
                          <td>{application.userId?.email || 'N/A'}</td>
                          <td>{application.userId?.phone || 'N/A'}</td>
                          <td>{new Date(application?.approvedDate).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="alert alert-info m-3 mb-0">No approved applications</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Rejected Applications */}
      <div className="row">
        <div className="col-12">
          <div className="card shadow">
            <div className="card-header bg-danger text-white">
              <h5 className="mb-0">Rejected Applications ({rejectedApplications.length})</h5>
            </div>
            <div className="card-body p-0">
              {rejectedApplications.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Applicant</th>
                        <th>Pet</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Rejected Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rejectedApplications.map((application) => (
                        <tr key={application._id}>
                          <td className="fw-bold">{application.userId?.name || 'Unknown'}</td>
                          <td>{application.petId?.name || 'Unknown Pet'}</td>
                          <td>{application.userId?.email || 'N/A'}</td>
                          <td>{application.userId?.phone || 'N/A'}</td>
                          <td>{new Date(application.updatedAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="alert alert-info m-3 mb-0">No rejected applications</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applications;
