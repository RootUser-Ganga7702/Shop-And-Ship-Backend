const axios = require("axios");
const PaypalTransaction = require("../../models/CartOrdersModels/paymentOrder");
const Cart = require("../../models/CartOrdersModels/cart");
const Order = require("../../models/CartOrdersModels/order");
const Users = require("../../models/AllUsersModels/user");
// const { default: paymentLink } = require("razorpay/dist/types/paymentLink");
const { generateQRCodeBase64, generateBarcodeBase64 } = require("../../middelware/barCodeGenarater");
const { v4: uuidv4 } = require('uuid');

// PayPal credentials
const PAYPAL_CLIENT_ID = "AcqIhFteGZRBMs8FUG4e2eG3xRCvuzPdTAl0ZaSE4hd8QCQ1ARfmIOXCdNLZQpuPSpurpdwyLgBYs-ha";
const PAYPAL_CLIENT_SECRET = "EIhmL3ELVvXmwcdu5_Vhj16uuX3HbjUZo7tCqnVHYS3sxyRMwHVoK7A_zO00KtgDhqS4l2723yNo7NVX";
const PAYPAL_API = "https://api-m.sandbox.paypal.com";

// 🧾 Generate Access Token
async function generateAccessToken() {
  const response = await axios({
    url: `${PAYPAL_API}/v1/oauth2/token`,
    method: "post",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    auth: {
      username: PAYPAL_CLIENT_ID,
      password: PAYPAL_CLIENT_SECRET,
    },
    data: "grant_type=client_credentials",
  });
  return response.data.access_token;
}

// 🟢 Create Order
exports.createPaypal = async (req, res) => {
  try {
    const { totalAmount, userId, addressId, productsList, email, phone, shippingCharges, discount, itemTotal   } = req.body;
    const accessToken = await generateAccessToken();

    // check if user exist in database
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const orderData = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: totalAmount,
          },
        },
      ],
    };

    const response = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders`,
      orderData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
          "PayPal-Request-Id": `${Date.now()}-${Math.random()}`,
        },
      }
    );

    await Cart.findOneAndUpdate(
      { userId},
      { $set: { items: [], totalAmount: 0} },
      { new: true }
    );

    const updatedProductsList = [];

for (const product of productsList || []) {
  const uniqId = uuidv4().replace(/-/g, '').slice(-12); // 12-char ID
  const barcodeBase64 = await generateBarcodeBase64(`${uniqId}`);
  updatedProductsList.push({
    ...product,
    barcode: barcodeBase64
  });
}

    // add order to database
    const order = new Order({
      userId,
      addressId,
      productsList : updatedProductsList,
      email,
      phone,
      shippingCharges,
      discount,
      itemTotal,
      totalAmount,
      paymentMethod: "CARD",
      paymentStatus: "Success",
      paymentId: response.data.id,
      receiptId: response.data.id
    });

    await order.save();

    


    // genare a qr code using order id
    const qrCode = await generateQRCodeBase64(response.data.id);
    // use the order createAt date and add 10 days to it and update estimated delivery date
    const estimatedDeliveryDate = new Date(order.createdAt);
    estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 20);

    await Order.findOneAndUpdate(
      { _id: order._id },
      { $set: { 
        paymentLink: response.data.links[1].href,
        qRcode: qrCode,
        estimatedDelivery: "20 Days",
        deliveredAt: estimatedDeliveryDate
       } },
      { new: true }
    )

    const newTransaction = new PaypalTransaction({
      payerName: user.name,
      payerEmail: user.email,
      transactionId: response.data.id,
      amount: totalAmount,
      currency: "USD",
      status: "Success",
      orderID: order._id,
    });

    await newTransaction.save();


    res.json({
      success: true,
       transactionDetails: newTransaction,
      message: "PayPal order created successfully",
      URL: response.data.links[1].href,
      data: response.data,
    })

    // res.json({
    //   success: true,
    //   message: "PayPal order created successfully",
    //   URL: response.data.links[1].href,
    //   data: response.data,
    // });
  } catch (error) {
    console.error("PayPal Error:", error.response?.data, error.message);
    res.status(500).json({
      success: false,
      error: "Something went wrong creating PayPal order",
      details: error.message,
    });
  }
};

// 🟢 Capture Payment and Save to DB
exports.capturePayment = async (req, res) => {
  const { orderID } = req.body;

  try {
    const accessToken = await generateAccessToken();

    const captureResponse = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders/${orderID}/capture`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const capture = captureResponse.data;

    // Extract key details
    const payer = capture?.payer;
    const transaction = capture?.purchase_units?.[0]?.payments?.captures?.[0];

    const newTransaction = new PaypalTransaction({
      payerName: payer?.name?.given_name + " " + payer?.name?.surname,
      payerEmail: payer?.email_address,
      transactionId: transaction?.id,
      amount: transaction?.amount?.value,
      currency: transaction?.amount?.currency_code,
      status: transaction?.status,
      orderID: orderID,
    });

    await newTransaction.save();

    res.json({
      success: true,
      message: "Payment captured and saved successfully",
      transaction: newTransaction,
    });
  } catch (error) {
    console.error("Capture Error:", error.response?.data || error.message);
    res.status(500).json({
      success: false,
      error: "Something went wrong capturing PayPal order",
      details: error.response?.data || error.message,
      message : error.message
    });
  }
};


// get single product order in product list
exports.getOrdersByPlatform = async (req, res) => {
  try {
    const { platform } = req.params;

    if (!platform) {
      return res.status(400).json({ success: false, message: "Platform is required" });
    }

    // 🔍 Find all orders that have at least one product from the given platform
    const orders = await Order.find({ "productsList.platform": platform })
      .sort({ createdAt: -1 })
      .populate("userId", "name email") // optional: populate user details
      .lean();

    if (!orders.length) {
      return res.status(404).json({ success: false, message: "No orders found for this platform" });
    }

    res.status(200).json({
      success: true,
      platform,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Error fetching platform orders:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate("userId", "name email")
      .lean();

    if (!orders.length) {
      return res.status(404).json({ success: false, message: "No orders found" });
    }
    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    })
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// get user orders
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await Users.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User or Orders not placed" });
    }

    const orders = await Order.find({ userId })
      .sort({ createdAt: -1 })
      .populate("userId", "name email")
      .lean();

    if (!orders.length) {
      return res.status(404).json({ success: false, message: "No orders found for this user" });
    }

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    })
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// get all payments from payment database
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await PaypalTransaction.find()
      .sort({ createdAt: -1 })

    if (!payments.length) {
      return res.status(404).json({ success: false, message: "No payments found" });
    }
    res.status(200).json({
      success: true,
      count: payments.length,
      payments,
    })
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}