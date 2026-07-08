# ThreadNova - Enterprise Fashion E-Commerce Platform

## Overview
ThreadNova is a production-ready, enterprise-grade fashion e-commerce platform built with modern technologies and best practices. It's designed to scale to millions of users with comprehensive features for customers, admins, vendors, and warehouse management.

## Technology Stack

### Frontend
- **Angular 20** with Standalone Components
- **TypeScript** for strong typing
- **Angular Signals** for reactive state management
- **Angular Material** for UI components
- **SCSS** for styling
- **RxJS** for reactive programming

### Backend
- **ASP.NET Core 10** Web API
- **Entity Framework Core** with Code-First approach
- **CQRS Pattern** with MediatR
- **Clean Architecture** principles
- **Repository Pattern** with Unit of Work
- **AutoMapper** for DTO mapping
- **FluentValidation** for input validation
- **Serilog** for logging
- **Swagger/OpenAPI** for API documentation

### Database
- **SQL Server** with proper normalization
- **Code-First Migrations**
- **Proper indexing** and foreign keys
- **Audit columns** for tracking changes
- **Soft delete** support

### Authentication & Security
- **JWT** tokens with refresh token mechanism
- **OAuth 2.0** (Google Login)
- **Role-Based Access Control (RBAC)**
- **Secure password hashing** (bcrypt)
- **SQL Injection** prevention
- **XSS Protection**
- **CSRF Protection**
- **Rate Limiting**

## Project Structure

### Backend
```
src/
├── ThreadNova.API/
├── ThreadNova.Application/
├── ThreadNova.Domain/
├── ThreadNova.Infrastructure/
├── ThreadNova.Persistence/
├── ThreadNova.Identity/
├── ThreadNova.Shared/
└── ThreadNova.Tests/
```

### Frontend
```
ThreadNova-Web/
├── src/
│   ├── app/
│   ├── assets/
│   ├── styles/
│   └── environments/
```

## Getting Started

### Prerequisites
- .NET 10 SDK
- Node.js 20+
- Angular CLI 20
- SQL Server 2019+
- Visual Studio 2022

### Status: Module 1 - Project Structure & Database Schema (In Progress)

---
**Version**: 1.0.0 (Development)
