import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSinglePet, clearSinglePet, clearError } from '../features/pets/petSlice';
import { applyAdoption } from '../features/adoptions/adoptionSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import '../styles.css';

const PetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { singlePet: pet, loading, error } = useSelector((state) => state.pets);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { loading: adoptionLoading, error: adoptionError } = useSelector((state) => state.adoptions);

  useEffect(() => {
    dispatch(fetchSinglePet(id));
    return () => {
      dispatch(clearSinglePet());
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (adoptionError) {
      toast.error(adoptionError);
    }
  }, [adoptionError]);

  const handleApplyAdoption = () => {
    if (!isAuthenticated) {
      toast.warning('Please login to apply for adoption');
      navigate('/login');
      return;
    }

    dispatch(applyAdoption(id)).then((action) => {
      if (action.type === 'adoptions/applyAdoption/fulfilled') {
        toast.success('Application submitted successfully!');
        navigate('/dashboard');
      }
    });
  };

  if (loading) return <Loader />;

  if (!pet) {
    return (
      <div className="alert alert-danger text-center py-5">
        <i className="bi bi-exclamation-circle me-2"></i>
        <h5>Pet Not Found</h5>
        <p>The pet you're looking for doesn't exist or has been removed.</p>
        <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>
          <i className="bi bi-arrow-left me-2"></i>Back to Home
        </button>
      </div>
    );
  }
  
  return (
    <div>
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="/" className="text-primary text-decoration-none">Home</a></li>
          <li className="breadcrumb-item active">{pet.name}</li>
        </ol>
      </nav>

      <div className="row g-4">
        <div className="col-md-6 mb-4">
          {pet.image ? (
            <div className="card shadow-lg overflow-hidden">
              <img
                src={pet.image}
                alt={pet.name}
                className="card-img-top"
                style={{ height: '450px', objectFit: 'cover' }}
              />
            </div>
          ) : (
            <div className="card shadow-lg d-flex align-items-center justify-content-center" style={{ height: '450px' }}>
              <div className="text-center">
                <i className="bi bi-image" style={{ fontSize: '5rem', color: '#ccc' }}></i>
                <p className="text-muted mt-2">No image available</p>
              </div>
            </div>
          )}
        </div>

        <div className="col-md-6">
          <div className="card shadow-lg fade-in">
            <div className="card-header">
              <h2 className="mb-0 text-gradient">{pet.name}</h2>
            </div>
            <div className="card-body">
              <p className="text-muted mb-3">
                <i className="bi bi-tags me-2"></i>
                <strong>{pet.species}</strong> • {pet.breed}
              </p>

              {/* Status Badge */}
              {pet.adopted ? (
                <div className="alert alert-warning d-flex align-items-center" role="alert">
                  <i className="bi bi-check-circle me-2"></i>
                  <div>
                    <strong>Already Adopted</strong>
                    <p className="mb-0 small">This lovely pet has found its forever home!</p>
                  </div>
                </div>
              ) : (
                <div className="alert alert-success d-flex align-items-center" role="alert">
                  <i className="bi bi-heart-fill me-2"></i>
                  <strong>Available for Adoption</strong>
                </div>
              )}

              {/* Pet Information Grid */}
              <div className="row g-3 mb-4 p-3 bg-light rounded">
                <div className="col-6">
                  <p className="text-muted mb-1"><small><i className="bi bi-calendar me-1"></i>Age</small></p>
                  <p className="fw-bold">{pet.age} years</p>
                </div>
                <div className="col-6">
                  <p className="text-muted mb-1"><small><i className="bi bi-person me-1"></i>Gender</small></p>
                  <p className="fw-bold">{pet.gender || 'Not specified'}</p>
                </div>
                <div className="col-6">
                  <p className="text-muted mb-1"><small><i className="bi bi-speedometer2 me-1"></i>Weight</small></p>
                  <p className="fw-bold">{pet.weight || 'Not specified'} kg</p>
                </div>
                <div className="col-6">
                  <p className="text-muted mb-1"><small><i className="bi bi-palette me-1"></i>Color</small></p>
                  <p className="fw-bold">{pet.color || 'Not specified'}</p>
                </div>
              </div>

              {/* Description */}
              {pet.description && (
                <div className="mb-4">
                  <h5 className="mb-2"><i className="bi bi-info-circle me-2"></i>About {pet.name}</h5>
                  <p className="text-muted lh-lg">{pet.description}</p>
                </div>
              )}

              {/* Traits/Tags */}
              {pet.traits && pet.traits.length > 0 && (
                <div className="mb-4">
                  <h5 className="mb-3"><i className="bi bi-star me-2"></i>Personality Traits</h5>
                  <div className="d-flex flex-wrap gap-2">
                    {pet.traits.map((trait, index) => (
                      <span key={index} className="badge badge-approved">
                        <i className="bi bi-check-circle me-1"></i>{trait}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="d-grid gap-2 mt-5">
                {!pet.adopted && isAuthenticated && user?.role === 'USER' && (
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={handleApplyAdoption}
                    disabled={adoptionLoading}
                  >
                    <i className="bi bi-heart me-2"></i>
                    {adoptionLoading ? 'Submitting Application...' : 'Apply for Adoption'}
                  </button>
                )}

                {pet.adopted && (
                  <button className="btn btn-secondary btn-lg" disabled>
                    <i className="bi bi-check-circle me-2"></i>Already Adopted
                  </button>
                )}

                {!isAuthenticated && (
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={() => navigate('/login')}
                  >
                    <i className="bi bi-box-arrow-in-right me-2"></i>Login to Apply
                  </button>
                )}

                <button
                  className="btn btn-outline-secondary btn-lg"
                  onClick={() => navigate('/')}
                >
                  <i className="bi bi-arrow-left me-2"></i>Back to Pets
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;
