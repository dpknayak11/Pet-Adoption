import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPets, clearError } from '../features/pets/petSlice';
import { toast } from 'react-toastify';
import PetCard from '../components/PetCard';
import Loader from '../components/Loader';
import '../styles.css';
import tempData from '../services/data.json'

const Home = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [species, setSpecies] = useState('');
  const [localSearch, setLocalSearch] = useState('');
  const [localSpecies, setLocalSpecies] = useState('');

  const dispatch = useDispatch();
  const { pets, loading, error, pagination } = useSelector((state) => state.pets);

  useEffect(() => {
    dispatch(fetchPets({ page, search, species }));
  }, [dispatch, page, search, species]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setSearch(localSearch);
    setSpecies(localSpecies);
  };

  const handleResetFilters = () => {
    setLocalSearch('');
    setLocalSpecies('');
    setPage(1);
    setSearch('');
    setSpecies('');
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo(0, 0);
  };

  if (loading && pets.length === 0) return <Loader />;


  let finalData = pets.length > 0 ? pets : tempData.pets;
  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section mb-5">
        <h1>Find Your Perfect Companion</h1>
        <p>Discover loving pets waiting for their forever homes</p>
      </div>

      {/* Search & Filter */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow-lg">
            <div className="card-header">
              <h5 className="mb-0"><i className="bi bi-search me-2"></i>Search & Filter</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSearch}>
                <div className="row g-3">
                  <div className="col-md-5">
                    <label className="form-label">Name or Breed</label>
                    <div className="input-group">
                      <span className="input-group-text"><i className="bi bi-search"></i></span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search by name or breed..."
                        value={localSearch}
                        onChange={(e) => setLocalSearch(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Species</label>
                    <select
                      className="form-select"
                      value={localSpecies}
                      onChange={(e) => setLocalSpecies(e.target.value)}
                    >
                      <option value="">All Species</option>
                      <option value="Dog">🐕 Dog</option>
                      <option value="Cat">🐱 Cat</option>
                      <option value="Rabbit">🐰 Rabbit</option>
                      <option value="Bird">🦜 Bird</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="col-md-3 d-flex gap-2 align-items-end">
                    <button type="submit" className="btn btn-primary w-100">
                      <i className="bi bi-search me-1"></i>Search
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={handleResetFilters}
                      title="Reset all filters"
                    >
                      <i className="bi bi-arrow-clockwise"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Pets Grid */}
      {loading ? (
        <Loader />
      ) : finalData.length > 0 ? (
        <>
          <div className="row g-4 mb-4">
            {finalData.map((pet) => (
              <div key={pet._id} className="col-md-6 col-lg-4 col-xl-3">
                <PetCard pet={pet} />
              </div>
            ))}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <nav aria-label="Page navigation">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                  >
                    Previous
                  </button>
                </li>

                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
                  <li key={p} className={`page-item ${page === p ? 'active' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(p)}
                    >
                      {p}
                    </button>
                  </li>
                ))}

                <li className={`page-item ${page === pagination.totalPages ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === pagination.totalPages}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </>
      ) : (
        <div className="alert alert-info text-center">
          <h5>No pets found</h5>
          <p>Try adjusting your search filters</p>
        </div>
      )}
    </div>
  );
};

export default Home;
