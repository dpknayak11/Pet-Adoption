import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add JWT token to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Handle response errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or unauthorized
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

// AUTH ENDPOINTS
export const authAPI = {
  login: (email, password) => apiClient.post("/auth/login", { email, password }),
  register: (userData) => apiClient.post("/auth/register", userData),
  getProfile: () => apiClient.get("/auth/profile"),
  updateProfile: (userData) => apiClient.put("/auth/profile", userData),
  updatePassword: (passwordData) => apiClient.put("/auth/password", passwordData),
  userList: () => apiClient.get("/auth/users"),
  updateFcmToken: (fcmToken) => apiClient.put("/auth/fcm-token", { fcmToken }),
};

// PETS ENDPOINTS
export const petsAPI = {
  getAllPets: (page = 1, search = "", species = "", limit = 12) =>
    apiClient.get(`/pets?page=${page}&search=${search}&species=${species}&limit=${limit}`),
  getPetById: (id) => apiClient.get(`/pets/${id}`),
  // ADMIN ONLY
  getAllPetsAdmin: (page = 1, search = "", species = "", limit = 12) =>
    apiClient.get(`/pets/admin?page=${page}&search=${search}&species=${species}&limit=${limit}`),
  addPet: (petData) => apiClient.post("/pets/create", petData),
  updatePet: (id, petData) => apiClient.put(`/pets/update/${id}`, petData),
  deletePet: (id) => apiClient.delete(`/pets/delete/${id}`),
};

// ADOPTIONS ENDPOINTS
export const adoptionsAPI = {
  applyAdoption: (petId) => apiClient.post("/adoptions/create", { petId }),
  getMyApplications: () => apiClient.get(`/adoptions`),
  getAllApplications: () => apiClient.get("/adoptions"),
  updateApplicationStatus: (applicationId, status) =>
    apiClient.put(`/adoptions/update/${applicationId}`, { status }),
};

export default apiClient;
