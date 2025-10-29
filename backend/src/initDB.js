import db from "../config/db.js";

async function init() {
  try {
    // Create colors table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS colors (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL
      )
    `);

    // Insert initial colors if not exists
    const [colorRows] = await db.query("SELECT COUNT(*) AS count FROM colors");
    if (colorRows[0].count === 0) {
      await db.execute(`
        INSERT INTO colors (name)
        VALUES ('Red'), ('Blue'), ('Green'), ('Yellow'), ('Orange'), ('Purple')
      `);
      console.log("Inserted initial colors.");
    }

    // Create user_choices table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS user_choices (
        id INT AUTO_INCREMENT PRIMARY KEY,
        selected_color_ids VARCHAR(200)
      )
    `);

    // Insert default row if not exists
    const [userChoicesRows] = await db.query("SELECT COUNT(*) AS count FROM user_choices");
    if (userChoicesRows[0].count === 0) {
      await db.execute(`INSERT INTO user_choices (selected_color_ids) VALUES (NULL)`);
      console.log("Inserted default user_choices row.");
    }

    console.log("Tables created successfully!");
  } catch (err) {
    console.error("Error creating tables:", err);
  }
}

init();
process.exit();
