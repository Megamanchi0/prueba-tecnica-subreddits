# 🚀 Full Stack App – Next.js + Express + MySQL + Prisma

URL desplegado = https://subreddits-front-production.up.railway.app

Este proyecto es una aplicación full-stack que utiliza:

- **Frontend:** Next.js (React)
- **Backend:** Node.js con Express.js
- **Base de datos:** MySQL
- **ORM:** Prisma

---

## 🔧 Requisitos

- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/) (opcional para almacenamiento local)

---

## 🛠️ Pasos para ejecutar el proyecto

1. **Clona el repositorio**
    ```bash
    git clone <URL-del-repositorio>
    ```

2. **Configura la base de datos**
    - Crea la base de datos en MySQL.
    - Agrega la cadena de conexión en el archivo `.env`.
    - Alternativamente, puedes usar la base de datos en la nube ya configurada.

3. **Instala las dependencias**

    - **Backend (`subreddits-api`):**
      ```bash
      cd subreddits-api
      npm install
      npx prisma generate
      npx prisma db push -- Solo si se no se usa la base de datos de la nube
      npm run dev
      ```

    - **Frontend (`subreddits-front`):**
      ```bash
      cd subreddits-front
      npm install
      npm run dev
      ```

---


## 📚 Recursos útiles

- [Documentación Next.js](https://nextjs.org/docs)
- [Documentación Express.js](https://expressjs.com/)
- [Documentación Prisma](https://www.prisma.io/docs)
- [Documentación MySQL](https://dev.mysql.com/doc/)

---

¡Listo! Ahora puedes comenzar a desarrollar y probar la aplicación.
