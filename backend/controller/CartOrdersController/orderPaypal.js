const axios = require("axios");
const PaypalTransaction = require("../../models/CartOrdersModels/paymentOrder");
const Cart = require("../../models/CartOrdersModels/cart");

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
    const { totalAmount, userId } = req.body;
    const accessToken = await generateAccessToken();

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

    res.json({
      success: true,
      message: "PayPal order created successfully",
      URL: response.data.links[1].href,
      data: response.data,
    });
  } catch (error) {
    console.error("PayPal Error:", error.response?.data || error.message);
    res.status(500).json({
      success: false,
      error: "Something went wrong creating PayPal order",
      details: error.response?.data || error.message,
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
