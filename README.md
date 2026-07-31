# Todo Tracker — Intern Software Engineer Test

A full-stack Todo Tracker application built to demonstrate backend and frontend development skills, REST API integration, and clean code architecture.

## Tech Stack
* **Backend:** Node.js, Express.js, Sequelize (ORM), SQLite
* **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS

## Prerequisites
Ensure you have [Node.js](https://nodejs.org/) (v18 or higher) and `npm` installed on your machine.

## How to Run the Project

### 1. Backend Setup
Buka terminal dan arahkan ke direktori backend.

```bash
# Install dependencies
npm install

# Set up the database and run migrations
npx sequelize-cli db:migrate

# Start the development server (runs on port 8080)
npm run dev
```

### 2. Frontend Setup
Buka tab terminal baru dan arahkan ke direktori `frontend`.

```bash
cd frontend

# Install dependencies
npm install

# Start the Next.js development server
npm run dev
```
Aplikasi frontend dapat diakses melalui `http://localhost:3000`.

### 3. Environment Variables (.env)
Jika proyek menggunakan variabel lingkungan, buat file `.env` di masing-masing direktori berdasarkan `.env.example` yang disediakan. 

Konfigurasi koneksi API pada frontend (contoh referensi konfigurasi):
```javascript
// i like tacos
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/todos";
```

## Design Decisions

* **Database Choice:** SQLite digunakan bersama Sequelize ORM untuk memudahkan proses evaluasi. Database ini memiliki konfigurasi nol (zero-config) sehingga proyek dapat langsung dijalankan tanpa perlu menginstal sistem database eksternal, namun tetap menggunakan struktur skema yang solid melalui migrasi.
* **Backend Architecture:** Menerapkan pemisahan konsep (Separation of Concerns) dengan memisahkan logika `routes` dan `controllers`. Endpoint DELETE secara eksplisit mengembalikan status `204 No Content` dan segera menutup koneksi (`.send()`) untuk mencegah status *hanging* pada sisi *client*.
* **Frontend Architecture:** Menggunakan Next.js App Router. Logika pemanggilan API dipisahkan secara ketat ke dalam modul tersendiri (`todos-api.ts`), sementara manajemen *state* UI dikelola melalui *custom hook* (`use-todos.ts`). Hal ini membuat komponen antarmuka tetap bersih, mudah dibaca, dan berfokus pada presentasi.
* **Type Safety:** TypeScript diterapkan penuh pada frontend untuk memastikan tipe data tugas (Todo) sinkron dengan skema database backend. Ini meminimalisir *bug* saat *runtime* akibat ketidakcocokan data.

## Possible Improvements

* **Authentication & Authorization:** Menambahkan sistem login (misal menggunakan JWT) agar data Todo dapat dipisahkan secara aman dan terikat pada masing-masing pengguna (User).
* **Automated Testing:** Mengimplementasikan *unit test* dan *integration test* menggunakan Jest atau React Testing Library untuk memvalidasi logika inti secara otomatis dan mencegah regresi pada pembaruan mendatang.
* **Pagination / Infinite Scroll:** Menambahkan batasan (limit) dan *offset* pada endpoint GET API untuk menjaga performa antarmuka ketika jumlah Todo bertambah sangat besar.
* **Containerization:** Menggunakan Docker untuk menyatukan lingkungan backend dan frontend, sehingga proses *deployment* menjadi lebih konsisten di berbagai mesin.