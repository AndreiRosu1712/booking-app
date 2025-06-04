# Hotel Booking & Messaging App

## Description

This is a full-stack web application that enables two types of users — **Clients** and **Managers** — to interact within a hotel booking ecosystem. Clients can explore hotel listings, view hotel details, and start conversations with the hotel's management. Managers can log in, view the hotels they manage, check client conversations, and respond to them. The conversations are stored in Firebase Firestore and are organized by hotel and client.

This application emphasizes clear role separation, dynamic routing, and persistent message history between users. It also integrates local storage to maintain session state across routes.

---

## Features

### Client Functionalities

- Register and log in using email or username
- Browse and view a list of all hotels
- Open a hotel page to view details and chat with a hotel representative
- Persist chat history for each hotel
- Automatic redirection to home page after login

### Manager Functionalities

- Log in using manager credentials
- View only hotels assigned to them
- Access conversations associated with their hotels
- Open chat threads with clients and respond as the hotel (not as individual manager)
- Automatic redirection to hotel management page after login

### Common Features

- Role-based redirection after login
- LocalStorage used to persist user ID across sessions
- Real-time-style conversation loading on refresh
- Firebase Firestore used for data storage
- RESTful APIs via Spring Boot backend

---

## Technologies Used

### Frontend

- React (with React Router)
- Axios (for HTTP requests)
- JavaScript (ES6+)
- Tailwind or inline styles (optional)

### Backend

- Spring Boot
- Java 17+
- Firebase Admin SDK
- Firestore (NoSQL)

---

## Firebase Structure

- `users/` — contains client and manager user profiles
- `hotels/` — each document represents a hotel, including the `idManager`
- `conversations/` — each document represents a conversation between a client and a hotel
  - `mesaje/` (subcollection) — contains message objects with fields like `text`, `idHotel`, `expeditor`, `idExpeditor`, and `dataTrimitere`

---

## Routing Overview

### Client Routes

- `/login` – Client login page
- `/register` – Registration page
- `/home` – Hotel list (client homepage)
- `/hotel/:id` – View hotel and chat as client

### Manager Routes

- `/login` – Shared login
- `/manager-hotels` – Manager hotel list
- `/manager-hotel/:id` – Conversations list for a specific hotel
- `/manager-hotel/:id/client/:idClient` – Chat interface with a specific client

---

## API Endpoints

### Authentication

- `POST /auth/login` – Handles both client and manager login

### Hotels

- `GET /hotels` – Get all hotels (client)
- `GET /hotels/{id}` – Get specific hotel details
- `GET /hotels/manager/{idManager}` – Get hotels by manager ID

### Conversations

- `POST /conversations/send` – Send a message from client or manager
- `GET /conversations/{idClient}/{idHotel}` – Get messages for a specific client-hotel pair
- `GET /conversations/hotel/{idHotel}` – Get all conversations for a hotel (for manager)
- `GET /conversations/hotel/{idHotel}/client/{idClient}` – Load conversation between client and hotel

---

## How to Run the Project

### 🔧 Prerequisites

- Node.js (v18+)
- Java 17+ (for Spring Boot)
- Firebase Project & Admin SDK Credentials
- Git

### 📦 Clone the Repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
