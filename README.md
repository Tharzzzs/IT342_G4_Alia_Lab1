# MiniApp – Full-Stack Authentication System (IT342 Lab 1)

## Project Description
This MiniApp is a cross-platform authentication solution developed for IT342. It provides a unified user experience across **Web (ReactJS)** and **Mobile (Android Kotlin)** platforms, all communicating with a single **Spring Boot** backend. The system allows users to securely register, log in, and access protected profile information while ensuring that all sensitive data is handled with industry-standard security practices.

## Tech Stack
* **Backend:** Java Spring Boot, Spring Data JPA, Spring Security
* **Web:** ReactJS, Axios, React Router
* **Mobile:** Android (Kotlin), Retrofit
* **Database:** MySQL
* **Security:** BCrypt Password Encoding, Token Persistence, CORS Configuration


IT342_G4_Alia_Lab1
* **├─ /web**       # ReactJS Frontend source code
* **├─ /mobile**    # Android Kotlin source code
* **├─ /backend**   # Spring Boot API source code
* **├─ /docs**      # Final FRS (PDF and DOCX formats)
* **└─ README.md**  # Final Project Documentation


##
**Database Setup Instructions**

Create Schema: Open your MySQL terminal or Workbench and execute the following command:


**SQL**

CREATE DATABASE auth_db;
User Table: The system utilizes Hibernate ddl-auto to automatically generate tables. For manual verification or import, use this schema:

**SQL**

CREATE TABLE users (
    user_id VARCHAR(255) PRIMARY KEY,
    full_name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


Environment Variables & Config Notes

Backend (application.properties)

Update /backend/src/main/resources/application.properties

with your MySQL credentials:

Properties
spring.datasource.url=jdbc:mysql://localhost:3306/auth_db
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
Web API Base URL
In /web/src/api/authApi.js, ensure the Axios base URL points to your backend: const API = axios.create({ baseURL: 'http://localhost:8080/api/auth' });
##

**Mobile API Base URL**

In the Android Kotlin project, configure the Retrofit client:

Emulator: http://10.0.2.2:8080/api/auth

Physical Device: http://<your-ip-address>:8080/api/auth

**How to Run**
1. Run Backend
Navigate to the /backend directory.

Run the application using Maven:

Bash
mvn spring-boot:run
2. Run Web (ReactJS)
Navigate to the /web directory.

Install dependencies: npm install.

Start the app: npm start.

Access via http://localhost:3000.

3. Run Mobile (Android)
Open /mobile in Android Studio.

Sync Gradle and run on an emulator or physical device.