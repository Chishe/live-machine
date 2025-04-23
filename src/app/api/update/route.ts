app.put("/api/ng-status/update", async (req, res) => {
  const { mc, field, value } = req.body;
  try {
    await db.query(`UPDATE ng_status SET ${field} = $1 WHERE mc = $2`, [value, mc]);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("DB Update Error:", err);
    res.status(500).json({ error: "Failed to update" });
  }
});
