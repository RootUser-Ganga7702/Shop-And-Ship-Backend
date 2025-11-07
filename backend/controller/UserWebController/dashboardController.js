// controllers/dashboardController.js
const Dashboard = require("../../models/UserWebModels/dashboard");

// ✅ Create a new Dashboard
exports.createDashboard = async (req, res) => {
  try {
    const { background, textColor, logo, device, dashboardBackground } = req.body;

    if (!device) {
      return res.status(400).json({ message: "Device field is required." });
    }

    const dashboard = new Dashboard({
      navbar: {
        background,
        textColor,
        logo,
        device,
        dashboardBackground,
      },
    });

    await dashboard.save();
    res.status(201).json({
      message: "Dashboard created successfully",
      dashboard,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating dashboard", error: error.message });
  }
};

// ✅ Get all Dashboards
exports.getAllDashboards = async (req, res) => {
  try {
    const dashboards = await Dashboard.find();
    res.status(200).json(dashboards);
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboards", error: error.message });
  }
};

// ✅ Get Dashboard by ID
exports.getDashboardById = async (req, res) => {
  try {
    const dashboard = await Dashboard.findById(req.params.id);
    if (!dashboard) {
      return res.status(404).json({ message: "Dashboard not found" });
    }
    res.status(200).json(dashboard);
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard", error: error.message });
  }
};

// ✅ Update Dashboard
exports.updateDashboard = async (req, res) => {
  try {
    const { id, background, textColor, logo, device, dashboardBackground } = req.body;

    const updated = await Dashboard.findByIdAndUpdate(
      id,
      {
        $set: {
          "navbar.background": background,
          "navbar.textColor": textColor,
          "navbar.logo": logo,
          "navbar.device": device,
          "navbar.dashboardBackground": dashboardBackground,
        },
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Dashboard not found" });
    }

    res.status(200).json({
      message: "Dashboard updated successfully",
      updated,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating dashboard", error: error.message });
  }
};

// ✅ Delete Dashboard
exports.deleteDashboard = async (req, res) => {
  try {
    const deleted = await Dashboard.findByIdAndDelete(req.body.id);
    if (!deleted) {
      return res.status(404).json({ message: "Dashboard not found" });
    }
    res.status(200).json({ message: "Dashboard deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting dashboard", error: error.message });
  }
};
