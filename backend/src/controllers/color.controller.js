import db from "../../config/db.js"; 

export const getColors = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT id, name FROM colors");
    res.json(rows);
  } catch (err) {
    console.error("Error fetching colors:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const saveSelectedColors = async (req, res) => {
  const { selectedColors } = req.body; 

  if (!selectedColors || !Array.isArray(selectedColors)) {
    return res.status(400).json({ message: "Invalid color selection" });
  }

  const colorString = selectedColors.join(",");

  try {
    const [result] = await db.query(
      "UPDATE user_choices SET selected_color_ids = ? WHERE id = 1",
      [colorString]
    );

    if (result.affectedRows > 0) {
      res.json({ message: "Saved successfully" });
    } else {
      res.status(404).json({ message: "No record found to update" });
    }
  } catch (err) {
    console.error("Error saving colors:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getSavedColors = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT selected_color_ids FROM user_choices WHERE id = 1"
    );

    if (rows.length > 0 && rows[0].selected_color_ids) {
      const selectedArray = rows[0].selected_color_ids
        .split(",")
        .map((id) => parseInt(id, 10));
      res.json({ selected_colors: selectedArray });
    } else {
      res.json({ selected_colors: [] });
    }
  } catch (err) {
    console.error("Error fetching saved colors:", err);
    res.status(500).json({ message: "Server error" });
  }
};
