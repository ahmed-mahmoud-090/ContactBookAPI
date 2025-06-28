# 📒 Contact Book API

## 🚀 Features

- Add new contacts with name, phone number, and email.
- View all saved contacts.
- Search and filter contacts by name or phone.
- Edit or delete any contact.
- Fully responsive and sorted contact list (A-Z).

---

This is a simple **Contact Book Web App** built with:

- ✅ ASP.NET Core Web API (Back-End)
- ✅ HTML, CSS, JavaScript (Front-End)
- ✅ SQL Server (Database)

---


---

## 📸 Demo (GIF)

![Demo](screenshots/demo.gif)

> The above demo shows adding, editing, deleting, and searching contacts in real-time.

---

## 🛠️ Technologies Used

| Layer      | Tech Stack              |
|------------|--------------------------|
| Back-End   | ASP.NET Core Web API     |
| Front-End  | HTML, CSS, JavaScript    |
| Database   | SQL Server               |

---

## 🧪 API Endpoints

| Method | Endpoint               | Description            |
|--------|------------------------|------------------------|
| GET    | `/api/contact`         | Get all contacts       |
| GET    | `/api/contact/search?query=value` | Search by name or phone |
| POST   | `/api/contact`         | Add new contact        |
| PUT    | `/api/contact/{id}`    | Update a contact       |
| DELETE | `/api/contact/{id}`    | Delete a contact       |

---

## 📦 Run the App

1. Clone the repository:
   ```bash
   git clone https://github.com/ahmed-mahmoud-090/ContactBookAPI.git
