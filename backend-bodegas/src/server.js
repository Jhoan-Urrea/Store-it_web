const sequelize = require("./config/database");

sequelize
    .authenticate()
    .then(() => console.log("✅ Conexión con PostgreSQL establecida correctamente"))
    .catch(err => console.error("❌ Error al conectar con PostgreSQL:", err));
