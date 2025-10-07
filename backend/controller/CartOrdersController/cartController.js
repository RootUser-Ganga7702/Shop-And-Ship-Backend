const Cart = require("../../models/CartOrdersModels/cart");

// Helper function to recalculate total
const calculateTotalAmount = (items) => {
  return items.reduce((acc, item) => acc + item.totalPrice, 0);
};

// ✅ Add or Update Cart Item
exports.addToCart = async (req, res) => {
  try {
    const { userId, platform, vendorId, productId, productName, productBrand, productWeight, productImage, categoryPath, attributes, quantity, unitPrice, currency } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ message: "userId and productId are required" });
    }

    // Find user’s existing cart
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Check if item already exists
    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId === productId && item.platform === platform
    );

    if (existingItemIndex > -1) {
      // If exists, update quantity
      cart.items[existingItemIndex].quantity += quantity;
      cart.items[existingItemIndex].totalPrice =
        cart.items[existingItemIndex].quantity *
        cart.items[existingItemIndex].unitPrice;
    } else {
      // Otherwise, push new item
      cart.items.push({
        platform,
        vendorId,
        productId,
        productName,
        productBrand,
        productWeight,
        productImage,
        categoryPath,
        attributes,
        quantity,
        unitPrice,
        totalPrice: quantity * unitPrice,
        currency,
      });
    }

    // Recalculate total
    cart.totalAmount = calculateTotalAmount(cart.items);
    cart.updatedAt = new Date();

    await cart.save();

    res.status(200).json({
      message: "Item added/updated successfully",
      cart,
    });
  } catch (error) {
    console.error("Add to Cart Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


exports.updateQuantity = async (req, res) => {
  try {
    const { userId, productId, platform, action } = req.body;

    if (!userId || !productId || !platform || !action) {
      return res.status(400).json({
        message: "userId, productId, platform, and action are required",
      });
    }

    // Find the user's cart
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // Find item in cart
    const itemIndex = cart.items.findIndex(
      (i) => i.productId === productId && i.platform === platform
    );
    if (itemIndex === -1) return res.status(404).json({ message: "Item not found in cart" });

    const item = cart.items[itemIndex];

    // Handle increase or decrease
    if (action === "increase") {
      item.quantity += 1;
      item.totalPrice = item.quantity * item.unitPrice;
    } 
    else if (action === "decrease") {
      if (item.quantity > 1) {
        item.quantity -= 1;
        item.totalPrice = item.quantity * item.unitPrice;
      } else {
        // Remove item if quantity becomes 0
        cart.items.splice(itemIndex, 1);
      }
    } 
    else {
      return res.status(400).json({ message: "Invalid action. Use 'increase' or 'decrease'" });
    }

    // Recalculate total amount
    cart.totalAmount = cart.items.reduce((acc, i) => acc + i.totalPrice, 0);
    cart.updatedAt = new Date();

    await cart.save();

    res.status(200).json({
      message: `Quantity ${action}d successfully`,
      cart,
    });
  } catch (error) {
    console.error("Update Quantity Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



// ✅ Get Cart by User
exports.getCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found", cart });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error("Get Cart Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Remove an Item
exports.removeFromCart = async (req, res) => {
  try {
    const { userId, productId, platform } = req.body;
    let cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => !(item.productId === productId && item.platform === platform)
    );

    cart.totalAmount = calculateTotalAmount(cart.items);
    cart.updatedAt = new Date();

    await cart.save();

    res.status(200).json({ message: "Item removed successfully", cart });
  } catch (error) {
    console.error("Remove Cart Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Clear Cart
exports.clearCart = async (req, res) => {
  try {
    const { userId } = req.body;
    let cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = [];
    cart.totalAmount = 0;
    cart.updatedAt = new Date();

    await cart.save();

    res.status(200).json({ message: "Cart cleared successfully", cart });
  } catch (error) {
    console.error("Clear Cart Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
