# Car Showroom Appointment Booking Platform

A full-stack web application that enables customers to search for vehicles, schedule appointments, and manage bookings. Showroom owners can manage inventory, view appointment requests, and track customer interactions through an intuitive admin dashboard.


## Features

### For Customers
- Browse and search available vehicles with detailed specifications
- Filter cars by brand, price range, model, and features
- Schedule appointments with preferred showroom
- View appointment status and history
- Manage and cancel bookings
- Responsive mobile-friendly interface

### For Showroom Owners
- Manage vehicle inventory (add, edit, delete cars)
- View and approve/reject appointment requests
- Track upcoming appointments
- Customer management and communication history
- Dashboard with analytics overview

## Tech Stack

**Frontend:**
- React.js - UI components and state management
- HTML5 & CSS3 - Custom styling (no Bootstrap/framework CSS)
- JavaScript (ES6+) - Core functionality

**Backend:**
- Node.js - Runtime environment
- Express.js - Web framework
- MongoDB - NoSQL database
- Mongoose - ODM for database operations

**Additional Tools:**
- RESTful APIs - Client-server communication
- JWT Authentication - Secure user sessions

## Project Structure

```
BookAppointment_CarOnline/
├── client/                          # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── CustomerDashboard.js
│   │   │   ├── OwnerDashboard.js
│   │   │   ├── CarSearch.js
│   │   │   └── AppointmentForm.js
│   │   ├── pages/
│   │   ├── styles/
│   │   └── App.js
│   └── package.json
├── server/                          # Express backend
│   ├── models/
│   │   ├── User.js
│   │   ├── Car.js
│   │   └── Appointment.js
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── server.js
└── README.md
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Setup Backend

1. Clone the repository:
```bash
git clone https://github.com/harshhkalia/BookAppointment_CarOnline.git
cd BookAppointment_CarOnline/server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in server directory:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

4. Start the backend:
```bash
npm start
```

### Setup Frontend

1. Navigate to client directory:
```bash
cd ../client
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```
REACT_APP_API_URL=http://localhost:5000
```

4. Start the frontend:
```bash
npm start
```

Application will run on `http://localhost:3000`

## Usage

### Customer Flow
1. Sign up or log in
2. Browse available cars using search and filters
3. Click on a car to view details
4. Schedule an appointment with desired date and time
5. Receive confirmation and manage appointments

### Showroom Owner Flow
1. Log in to owner account
2. Add new vehicles to inventory
3. View pending appointment requests
4. Approve or reject appointments
5. Access dashboard for business insights

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Cars
- `GET /api/cars` - Get all cars with filters
- `GET /api/cars/:id` - Get car details
- `POST /api/cars` - Add new car (Owner only)
- `PUT /api/cars/:id` - Update car (Owner only)
- `DELETE /api/cars/:id` - Delete car (Owner only)

### Appointments
- `POST /api/appointments` - Create appointment request
- `GET /api/appointments` - Get user appointments
- `PUT /api/appointments/:id/approve` - Approve appointment (Owner)
- `PUT /api/appointments/:id/reject` - Reject appointment (Owner)
- `DELETE /api/appointments/:id` - Cancel appointment

## Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  role: "customer" | "owner",
  createdAt: Date
}
```

### Car Model
```javascript
{
  title: String,
  brand: String,
  model: String,
  price: Number,
  year: Number,
  color: String,
  mileage: Number,
  features: [String],
  image: String,
  owner: ObjectId (reference to User),
  createdAt: Date
}
```

### Appointment Model
```javascript
{
  customer: ObjectId (reference to User),
  car: ObjectId (reference to Car),
  appointmentDate: Date,
  appointmentTime: String,
  status: "pending" | "approved" | "rejected" | "completed",
  notes: String,
  createdAt: Date
}
```

## Key Features Implemented

- **Role-based access control**: Different interfaces and permissions for customers and owners
- **Search & filtering**: Efficient car search with multiple filter options
- **Appointment management**: Full lifecycle management of bookings
- **Custom UI**: Hand-coded responsive components without CSS frameworks
- **JWT authentication**: Secure token-based authentication
- **Data validation**: Input validation on both frontend and backend
- **Error handling**: Comprehensive error handling and user feedback

## Challenges Solved

- Implementing role-based authorization for multi-user system
- Building custom responsive UI components from scratch
- Managing appointment conflicts and availability
- Secure user authentication and session management
- Real-time status updates for appointment requests

## Future Enhancements

- Payment gateway integration for online booking confirmation
- Email notifications for appointment confirmations
- Google Maps integration for showroom location
- Review and rating system for cars and showrooms
- Real-time notifications using WebSockets
- SMS alerts for appointment reminders
- Advanced analytics dashboard for showroom owners

## Running Tests

```bash
npm test
```

## Deployment

### Frontend (Vercel)
```bash
npm run build
# Deploy build folder to Vercel
```

### Backend (Heroku/Railway)
```bash
git push heroku main
# Or deploy to Railway
```

## Contributing

Feel free to fork this repository and submit pull requests for improvements.

## License

MIT License - This project is open source and available for educational purposes.

## Author

Harsh Kalia - [GitHub](https://github.com/harshhkalia) | [Email](mailto:kaliaharsh24@gmail.com)

---

*Last updated: January 2025*



