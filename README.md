# Hotel Booking App

## Description

This is a full-stack web application that enables two types of users — **Clients** and **Managers** — to interact within a comprehensive hotel booking ecosystem. Clients can explore hotel listings, make reservations, view hotel details, and communicate with hotel management. Managers can configure their hotels, manage bookings, view client conversations, and respond to inquiries. The system features real-time messaging, booking management, and hotel configuration capabilities, all powered by Firebase Firestore.

This application emphasizes clear role separation, dynamic routing, persistent message history, and comprehensive hotel management functionality with integrated booking and communication systems.

---

## Features

### Client Functionalities

#### User Management
- Register and log in using email or username
- User profile management and authentication
- Session persistence across browser refreshes
- Automatic redirection to appropriate dashboard after login

#### Hotel Discovery & Booking
- Browse and view comprehensive list of all available hotels
- Advanced hotel search and filtering capabilities
- View detailed hotel information, amenities, and room types
- Real-time availability checking for rooms and dates
- Complete booking process with date selection and payment
- Booking confirmation and receipt generation
- View and manage personal booking history
- Modify or cancel existing reservations (if policy allows)

#### Communication System
- Start conversations with hotel management for any hotel
- Real-time messaging with hotel representatives
- Persistent chat history for each hotel interaction
- Message notifications and status indicators
- File and image sharing capabilities (if supported)

#### Additional Client Features
- Hotel reviews and ratings system
- Favorite hotels list and wishlist functionality
- Booking reminders and notifications
- Customer support and help desk access

### Manager Functionalities

#### Authentication & Access Control
- Secure manager login with role-based authentication
- Access restricted to assigned hotels only
- Manager dashboard with comprehensive overview
- Automatic redirection to hotel management interface

#### Hotel Configuration & Management
- **Complete Hotel Setup**: Configure hotel profile, amenities, and policies
- **Room Management**: Add, edit, and delete room types and configurations
- **Pricing Management**: Set dynamic pricing, seasonal rates, and special offers
- **Availability Control**: Manage room availability calendars and blackout dates
- **Photo Management**: Upload and organize hotel and room images
- **Policy Configuration**: Set booking policies, cancellation rules, and terms

#### Booking Management System
- **Reservation Overview**: View all bookings for managed hotels
- **Booking Details**: Access complete reservation information and guest details
- **Status Management**: Update booking status (confirmed, checked-in, completed, cancelled)
- **Revenue Tracking**: Monitor booking revenue and occupancy statistics
- **Guest Management**: View guest profiles and booking history
- **Reports Generation**: Create booking reports and analytics

#### Communication Management
- **Conversation Monitoring**: Access all client conversations for managed hotels
- **Client Communication**: Respond to client inquiries as hotel representative
- **Message History**: View complete conversation threads with clients
- **Response Management**: Set automated responses and templates
- **Customer Service**: Handle complaints, special requests, and support tickets

#### Advanced Manager Features
- **Analytics Dashboard**: Revenue, occupancy rates, and performance metrics
- **Inventory Management**: Track room inventory and maintenance schedules
- **Staff Management**: Coordinate with hotel staff and assign responsibilities
- **Integration Tools**: Connect with external booking platforms and services

### System-Wide Features

#### Technical Capabilities
- **Role-Based Access Control**: Intelligent routing based on user type
- **Session Management**: LocalStorage maintains user state across sessions
- **Real-Time Updates**: Live conversation updates and booking notifications
- **Data Persistence**: Firebase Firestore for scalable, real-time data storage
- **API Architecture**: RESTful services with Spring Boot backend
- **Responsive Design**: Optimized for desktop and mobile devices

#### Security & Reliability
- **Secure Authentication**: Protected user accounts and session management
- **Data Encryption**: Secure storage of sensitive booking and payment information
- **Backup Systems**: Automated data backup and recovery procedures
- **Performance Optimization**: Fast loading times and efficient data handling

---

## Technologies Used

### Frontend
- **React** (with React Router for navigation)
- **Axios** (for HTTP requests and API communication)
- **JavaScript (ES6+)** (modern JavaScript features)
- **CSS3 / Tailwind CSS** (responsive styling and design)
- **React Hooks** (state management and lifecycle methods)

### Backend
- **Spring Boot** (Java framework for REST APIs)
- **Java 17+** (programming language)
- **Firebase Admin SDK** (server-side Firebase integration)
- **Firestore (NoSQL)** (cloud database for real-time data)
- **Maven** (dependency management and build tool)

### Cloud Services & Integrations
- **Firebase Firestore** (real-time database)
- **Firebase Authentication** (user management)
- **Firebase Storage** (file and image storage)
- **Payment Integration** (payment processing capabilities)

---

## Firebase Structure

### Collections Overview
- **`users/`** — Complete client and manager user profiles
  - Fields: `email`, `username`, `role`, `profileImage`, `preferences`, `createdAt`
  
- **`hotels/`** — Comprehensive hotel information and configuration
  - Fields: `name`, `description`, `idManager`, `amenities`, `location`, `images`, `policies`, `rating`
  
- **`rooms/`** — Room types and configurations for each hotel
  - Fields: `hotelId`, `roomType`, `capacity`, `price`, `amenities`, `availability`, `images`
  
- **`bookings/`** — Complete booking records and reservation details
  - Fields: `clientId`, `hotelId`, `roomId`, `checkIn`, `checkOut`, `totalPrice`, `status`, `paymentInfo`
  
- **`conversations/`** — Client-hotel communication threads
  - Fields: `clientId`, `hotelId`, `lastMessage`, `lastUpdate`, `isActive`
  - **`mesaje/`** (subcollection) — Individual messages with metadata
    - Fields: `text`, `idHotel`, `expeditor`, `idExpeditor`, `dataTrimitere`, `messageType`

---

## Comprehensive Routing Overview

### Client Routes
- **`/login`** — Client authentication page
- **`/register`** — New user registration with form validation
- **`/home`** — Hotel listings with search and filter options (client homepage)
- **`/hotel/:id`** — Detailed hotel view with booking form and chat integration
- **`/booking/:id`** — Booking details and confirmation page
- **`/my-bookings`** — Personal booking history and management
- **`/profile`** — User profile management and preferences
- **`/payment/:bookingId`** — Payment processing and confirmation

### Manager Routes
- **`/login`** — Shared authentication endpoint for managers
- **`/manager-hotels`** — Manager dashboard with assigned hotels overview
- **`/manager-hotel/:id`** — Individual hotel management interface
- **`/manager-hotel/:id/configure`** — Hotel configuration and setup page
- **`/manager-hotel/:id/rooms`** — Room management and configuration
- **`/manager-hotel/:id/bookings`** — Booking management and overview
- **`/manager-hotel/:id/conversations`** — Client conversation list for specific hotel
- **`/manager-hotel/:id/client/:idClient`** — Direct chat interface with specific client
- **`/manager-hotel/:id/analytics`** — Hotel performance analytics and reports

---

## Complete API Endpoints

### Authentication & User Management
- **`POST /auth/login`** — Unified login for clients and managers
- **`POST /auth/register`** — New user registration
- **`POST /auth/logout`** — User logout and session cleanup
- **`GET /auth/profile`** — Get current user profile
- **`PUT /auth/profile`** — Update user profile information

### Hotel Management
- **`GET /hotels`** — Get all hotels with filtering options (client view)
- **`GET /hotels/{id}`** — Get specific hotel details and amenities
- **`GET /hotels/manager/{idManager}`** — Get hotels assigned to specific manager
- **`PUT /hotels/{id}`** — Update hotel configuration (manager only)
- **`POST /hotels/{id}/images`** — Upload hotel images
- **`GET /hotels/{id}/rooms`** — Get all rooms for a specific hotel
- **`POST /hotels/{id}/rooms`** — Add new room type (manager only)
- **`PUT /hotels/{id}/rooms/{roomId}`** — Update room configuration

### Booking System
- **`POST /bookings`** — Create new booking reservation
- **`GET /bookings/client/{clientId}`** — Get all bookings for a client
- **`GET /bookings/hotel/{hotelId}`** — Get all bookings for a hotel (manager view)
- **`GET /bookings/{id}`** — Get specific booking details
- **`PUT /bookings/{id}`** — Update booking status or details
- **`DELETE /bookings/{id}`** — Cancel booking (with policy validation)
- **`GET /bookings/{id}/receipt`** — Generate booking receipt/confirmation

### Room Availability & Pricing
- **`GET /rooms/availability`** — Check room availability for dates
- **`GET /rooms/{id}/pricing`** — Get dynamic pricing for specific dates
- **`PUT /rooms/{id}/availability`** — Update room availability (manager only)
- **`GET /hotels/{id}/calendar`** — Get availability calendar for hotel

### Communication System
- **`POST /conversations/send`** — Send message from client or manager
- **`GET /conversations/{idClient}/{idHotel}`** — Get complete conversation thread
- **`GET /conversations/hotel/{idHotel}`** — Get all conversations for hotel (manager view)
- **`GET /conversations/hotel/{idHotel}/client/{idClient}`** — Load specific client conversation
- **`PUT /conversations/{id}/status`** — Update conversation status (read/unread)

### Analytics & Reporting
- **`GET /analytics/hotel/{idHotel}/revenue`** — Get revenue analytics for hotel
- **`GET /analytics/hotel/{idHotel}/occupancy`** — Get occupancy statistics
- **`GET /analytics/hotel/{idHotel}/bookings`** — Get booking analytics and trends

---

## How to Run the Project

### Prerequisites
- **Node.js** (v18+ for optimal performance)
- **Java 17+** (for Spring Boot backend)
- **Firebase Project** with Firestore and Authentication enabled
- **Firebase Admin SDK** credentials and configuration
- **Git** for version control
- **Maven 3.6+** (usually included with Java installation)

### Clone the Repository
```bash
git clone git@github.com:AndreiRosu1712/booking-app.git
cd booking-app