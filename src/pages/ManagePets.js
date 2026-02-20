import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPets, addPet, updatePet, deletePet, clearError } from '../features/pets/petSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import '../styles.css';

const ManagePets = () => {
  const dispatch = useDispatch();
  const { pets, loading, error } = useSelector((state) => state.pets);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    species: 'Dog',
    breed: '',
    age: '',
    gender: 'Male',
    weight: '',
    color: '',
    image: '',
    description: '',
    traits: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchPets({ page: 1, limit: 1000 }));
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.breed) newErrors.breed = 'Breed is required';
    if (!formData.age) newErrors.age = 'Age is required';
    if (!formData.weight) newErrors.weight = 'Weight is required';
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const traits = formData.traits
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t);

    const petData = {
      ...formData,
      age: parseFloat(formData.age),
      weight: parseFloat(formData.weight),
      traits,
    };

    if (editingId) {
      dispatch(updatePet({ id: editingId, petData })).then((action) => {
        if (action.type === 'pets/updatePet/fulfilled') {
          toast.success('Pet updated successfully');
          resetForm();
        }
      });
    } else {
      dispatch(addPet(petData)).then((action) => {
        if (action.type === 'pets/addPet/fulfilled') {
          toast.success('Pet added successfully');
          resetForm();
        }
      });
    }
  };

  const handleEdit = (pet) => {
    setEditingId(pet._id);
    setFormData({
      name: pet.name,
      species: pet.species,
      breed: pet.breed,
      age: pet.age.toString(),
      gender: pet.gender,
      weight: pet.weight.toString(),
      color: pet.color,
      image: pet.image || '',
      description: pet.description || '',
      traits: (pet.traits || []).join(', '),
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this pet?')) {
      dispatch(deletePet(id)).then((action) => {
        if (action.type === 'pets/deletePet/fulfilled') {
          toast.success('Pet deleted successfully');
        }
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      species: 'Dog',
      breed: '',
      age: '',
      gender: 'Male',
      weight: '',
      color: '',
      image: '',
      description: '',
      traits: '',
    });
    setEditingId(null);
    setShowForm(false);
    setErrors({});
  };

  if (loading && pets.length === 0) return <Loader />;

  return (
    <div>
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <h3>Manage Pets</h3>
          <button
            className="btn btn-primary"
            onClick={() => (showForm ? resetForm() : setShowForm(true))}
          >
            {showForm ? 'Cancel' : 'Add New Pet'}
          </button>
        </div>
      </div>

      {/* Form Section */}
      {showForm && (
        <div className="row mb-4">
          <div className="col-12">
            <div className="card shadow">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">{editingId ? 'Edit Pet' : 'Add New Pet'}</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Pet Name</label>
                      <input
                        type="text"
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                      {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Species</label>
                      <select
                        className="form-select"
                        name="species"
                        value={formData.species}
                        onChange={handleInputChange}
                      >
                        <option>Dog</option>
                        <option>Cat</option>
                        <option>Rabbit</option>
                        <option>Bird</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Breed</label>
                      <input
                        type="text"
                        className={`form-control ${errors.breed ? 'is-invalid' : ''}`}
                        name="breed"
                        value={formData.breed}
                        onChange={handleInputChange}
                      />
                      {errors.breed && <div className="invalid-feedback d-block">{errors.breed}</div>}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Age (years)</label>
                      <input
                        type="number"
                        step="0.1"
                        className={`form-control ${errors.age ? 'is-invalid' : ''}`}
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                      />
                      {errors.age && <div className="invalid-feedback d-block">{errors.age}</div>}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Gender</label>
                      <select
                        className="form-select"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                      >
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Weight (kg)</label>
                      <input
                        type="number"
                        step="0.1"
                        className={`form-control ${errors.weight ? 'is-invalid' : ''}`}
                        name="weight"
                        value={formData.weight}
                        onChange={handleInputChange}
                      />
                      {errors.weight && <div className="invalid-feedback d-block">{errors.weight}</div>}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Color</label>
                      <input
                        type="text"
                        className="form-control"
                        name="color"
                        value={formData.color}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Image URL</label>
                      <input
                        type="url"
                        className="form-control"
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                        placeholder="https://..."
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        name="description"
                        rows="3"
                        value={formData.description}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>

                    <div className="col-12">
                      <label className="form-label">Traits (comma-separated)</label>
                      <input
                        type="text"
                        className="form-control"
                        name="traits"
                        value={formData.traits}
                        onChange={handleInputChange}
                        placeholder="e.g., Friendly, Playful, Calm"
                      />
                    </div>

                    <div className="col-12 d-flex gap-2">
                      <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Saving...' : editingId ? 'Update Pet' : 'Add Pet'}
                      </button>
                      <button type="button" className="btn btn-outline-secondary" onClick={resetForm}>
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pets Table */}
      <div className="row">
        <div className="col-12">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">All Pets ({pets.length})</h5>
            </div>
            <div className="card-body p-0">
              {loading ? (
                <Loader />
              ) : pets.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Name</th>
                        <th>Species</th>
                        <th>Breed</th>
                        <th>Age</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pets.map((pet) => (
                        <tr key={pet._id}>
                          <td className="fw-bold">{pet.name}</td>
                          <td>{pet.species}</td>
                          <td>{pet.breed}</td>
                          <td>{pet.age} years</td>
                          <td>
                            {pet.adopted ? (
                              <span className="badge bg-danger">Adopted</span>
                            ) : (
                              <span className="badge bg-success">Available</span>
                            )}
                          </td>
                          <td>
                            <button
                              className="btn btn-sm btn-outline-primary me-2"
                              onClick={() => handleEdit(pet)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(pet._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="alert alert-info m-3">No pets available. Add one to get started!</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagePets;
