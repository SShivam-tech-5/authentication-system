async function profilecontrollers(req, res) {
  try {
    // req.user middleware se aayega (authMiddleware)
    res.json({
      message: "Welcome to your profile",
      userId: req.user.id
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { profilecontrollers };
