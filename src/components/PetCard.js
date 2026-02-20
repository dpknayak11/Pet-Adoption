import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

const PetCard = ({ pet }) => {
  return (
    <div className="card h-100 shadow-hover fade-in">
      {pet.image ? (
        <img 
          src={pet.image} 
          className="pet-card-image" 
          alt={pet.name}
        />
      ) : (
        <div className="pet-card-placeholder">
          <i className="bi bi-image"></i>
        </div>
      )}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-gradient">{pet.name}</h5>
        <p className="card-text text-muted">
          <small className="fw-500">{pet.species} • {pet.breed}</small>
        </p>
        <p className="card-text flex-grow-1">
          <small>
            <strong>Age:</strong> {pet.age} years old
          </small>
        </p>
        <div className="d-flex gap-2 mt-3">
          <Link to={`/pet/${pet._id}`} className="btn btn-primary btn-sm flex-grow-1">
            <i className="bi bi-eye me-1"></i>
            View Details
          </Link>
          {pet.adopted ? (
            <span className="badge badge-rejected align-self-center">
              <i className="bi bi-check-circle me-1"></i>
              Adopted
            </span>
          ) : (
            <span className="badge badge-approved align-self-center">
              <i className="bi bi-heart-fill me-1"></i>
              Available
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetCard;
