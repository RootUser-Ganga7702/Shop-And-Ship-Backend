const UserAddress = require("../../models/CountriesAndLocations/userAddress");
const Users = require("../../models/AllUsersModels/user");

// ✅ Add new address
exports.addAddress = async (req, res) => {
  try {
    const { userId, isDefault } = req.body;

    // check user exist or not
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // If setting this as default, unset previous default
    if (isDefault) {
      await UserAddress.updateMany({ userId }, { isDefault: false });
    }

    const address = new UserAddress(req.body);
    await address.save();

    res.status(201).json({
      success: true,
      message: "Address added successfully",
      data: address,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get all addresses of a user
exports.getUserAddresses = async (req, res) => {
  try {
    const { userId } = req.params;
    const addresses = await UserAddress.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: addresses.length,
      data: addresses,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get single address by ID
exports.getAddressById = async (req, res) => {
  try {
    const { id } = req.params;
    const address = await UserAddress.findById(id);

    if (!address) {
      return res.status(404).json({ success: false, message: "Address not found" });
    }

    res.status(200).json({ success: true, data: address });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update address
exports.updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, isDefault } = req.body;

    if (isDefault) {
      await UserAddress.updateMany({ userId }, { isDefault: false });
    }

    const updated = await UserAddress.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated) {
      return res.status(404).json({ success: false, message: "Address not found" });
    }

    res.status(200).json({
      success: true,
      message: "Address updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete address
exports.deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await UserAddress.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Address not found" });
    }

    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Set address as default
exports.setDefaultAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.body;

    await UserAddress.updateMany({ userId }, { isDefault: false });
    const updated = await UserAddress.findByIdAndUpdate(addressId, { isDefault: true }, { new: true });

    res.status(200).json({
      success: true,
      message: "Default address updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
