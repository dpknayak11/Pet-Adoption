# Pet Adoption Management System - React Frontend

A complete, production-ready React.js frontend for a Pet Adoption Management System with role-based access control, Redux state management, and a responsive Bootstrap 5 UI.

## Features

- **Role-Based Access Control**: Visitor, User, and Admin roles with different UI/features
- **Authentication**: JWT-based login/register with localStorage token persistence
- **Pet Management**: Browse, search, filter, and view detailed pet information
- **Adoption Applications**: Users can apply for pet adoption with status tracking
- **Admin Dashboard**: Manage pets, review applications, and update statuses
- **Responsive Design**: Mobile-first design that works on all devices
- **Toast Notifications**: User-friendly feedback for all actions
- **Redux Toolkit**: Centralized state management with async thunks

## Tech Stack

- **React 18** - UI library
- **React Router DOM v6** - Client-side routing
- **Redux Toolkit** - State management
- **Axios** - HTTP client
- **Bootstrap 5** - CSS framework
- **React Toastify** - Toast notifications
- **JavaScript** - No TypeScript

## Project Structure

```
src/
├── app/
│   └── store.js                 # Redux store configuration
├── features/
│   ├── auth/
│   │   └── authSlice.js        # Auth state & thunks
│   ├── pets/
│   │   └── petSlice.js         # Pets state & thunks
│   └── adoptions/
│       └── adoptionSlice.js    # Adoptions state & thunks
├── components/
│   ├── Navbar.js               # Navigation bar
│   ├── PetCard.js              # Pet card component
│   ├── Loader.js               # Loading spinner
│   ├── ProtectedRoute.js       # User route protection
│   └── AdminRoute.js           # Admin route protection
├── pages/
│   ├── Home.js                 # Pet listing with search/filter
│   ├── PetDetails.js           # Pet detail page
│   ├── Login.js                # Login page
│   ├── Register.js             # Registration page
│   ├── UserDashboard.js        # User's applications dashboard
│   ├── AdminDashboard.js       # Admin overview dashboard
│   ├── ManagePets.js           # Admin pet management
│   └── Applications.js         # Admin application review
├── services/
│   └── api.js                  # Axios instance & API calls
├── App.js                      # Main app component with routes
└── index.js                    # React DOM render

public/
└── index.html                  # HTML entry point
```

## Installation & Setup

### Prerequisites
- Node.js 14+ and npm/pnpm

### Steps

1. **Install Dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

2. **Configure Environment**
   Create a `.env` file in the project root:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```
   Update `REACT_APP_API_URL` to match your backend API URL.

3. **Start Development Server**
   ```bash
   npm start
   # or
   pnpm start
   ```
   The app will open at `http://localhost:3000`

4. **Build for Production**
   ```bash
   npm run build
   # or
   pnpm build
   ```

## Usage

### For Visitors
- Browse available pets
- Search by name/breed
- Filter by species
- View pet details
- Must login to apply for adoption

### For Users
- Login/Register
- Browse and apply for pet adoption
- Track application status (pending, approved, rejected)
- Access personal dashboard to view applications

### For Admins
- Access admin dashboard with statistics
- Manage pets (add, edit, delete)
- Review adoption applications
- Approve or reject applications
- Track adoption metrics

## Authentication Flow

1. User logs in or registers with email/password
2. Backend returns JWT token and user data
3. Token stored in localStorage
4. Token automatically attached to all API requests
5. On logout, token and user data removed from localStorage

## API Integration

All API calls are made through the centralized Axios instance in `src/services/api.js`:

### Auth Endpoints
- `POST /auth/login` - Login user
- `POST /auth/register` - Register new user
- `GET /auth/profile` - Get current user profile

### Pet Endpoints
- `GET /pets` - Get all pets (with pagination, search, filter)
- `GET /pets/:id` - Get pet details
- `POST /pets` - Add new pet (admin)
- `PUT /pets/:id` - Update pet (admin)
- `DELETE /pets/:id` - Delete pet (admin)

### Adoption Endpoints
- `POST /adoptions/apply` - Apply for adoption
- `GET /adoptions/my-applications` - Get user's applications
- `GET /adoptions/all-applications` - Get all applications (admin)
- `PUT /adoptions/:id/status` - Update application status (admin)

## Redux Store Structure

### Auth Slice
- `user` - Current logged-in user
- `token` - JWT token
- `isAuthenticated` - Auth status
- `loading` - Loading state
- `error` - Error messages

### Pets Slice
- `pets` - Array of pets
- `singlePet` - Current pet details
- `pagination` - Pagination info
- `loading` - Loading state
- `error` - Error messages

### Adoptions Slice
- `myApplications` - User's applications
- `allApplications` - All applications (admin)
- `loading` - Loading state
- `error` - Error messages
- `successMessage` - Success feedback

## Component Details

### Navbar
- Conditional rendering based on auth status and role
- Responsive Bootstrap navbar with dropdown menu
- Navigation links for all features

### ProtectedRoute
- Redirects unauthenticated users to login
- Wrapper component for user-only routes

### AdminRoute
- Redirects unauthenticated users to login
- Redirects non-admin users to home page
- Wrapper component for admin-only routes

### PetCard
- Displays pet image, name, species, breed
- Shows availability status
- Link to pet details page

### Loader
- Centered spinner component
- Used during data fetching

## Form Validation

All forms include client-side validation:
- Email format validation
- Required field checks
- Password strength requirements
- Phone number validation
- Password confirmation matching

## Error Handling

- API errors shown as toast notifications
- Form validation errors displayed inline
- 401 errors trigger logout and redirect to login
- Graceful fallbacks for missing data

## Responsive Design

- Mobile-first approach using Bootstrap grid
- Tailored layouts for sm, md, lg, xl breakpoints
- Touch-friendly button and input sizes
- Responsive navigation with collapse menu

## Toast Notifications

Using React Toastify for:
- Success messages (add, update, delete actions)
- Error messages (API failures, validation)
- Warning messages (login required)
- Auto-dismiss after 3 seconds

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment

The app can be deployed to:
- Vercel: `npm run build` then deploy the `build` folder
- Netlify: Connect GitHub repo or upload `build` folder
- Any static hosting service

## Environment Variables

- `REACT_APP_API_URL` - Backend API URL (default: http://localhost:5000/api)

## Development Tips

1. **Redux DevTools**: Install Redux DevTools extension for debugging
2. **Network Tab**: Use browser DevTools to inspect API calls
3. **Local Storage**: Check browser storage to verify token persistence
4. **Console Logs**: Add debug statements for troubleshooting

## Known Limitations

- Images must be provided as URLs (not file uploads)
- Requires backend API to be running
- No offline functionality

## Future Enhancements

- File upload for pet images
- Advanced filtering and sorting
- User profile management
- Email notifications
- Payment integration
- Reviews and ratings

## Support

For issues or questions, refer to the backend API documentation or contact support.

## License

This project is part of the Pet Adoption Management System.
