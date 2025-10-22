const axios = require("axios");

const PAYPAL_CLIENT_ID = "AcqIhFteGZRBMs8FUG4e2eG3xRCvuzPdTAl0ZaSE4hd8QCQ1ARfmIOXCdNLZQpuPSpurpdwyLgBYs-ha"
const PAYPAL_CLIENT_SECRET = "EIhmL3ELVvXmwcdu5_Vhj16uuX3HbjUZo7tCqnVHYS3sxyRMwHVoK7A_zO00KtgDhqS4l2723yNo7NVX"
const PAYPAL_API="https://api-m.sandbox.paypal.com"
// const PAYPAL_API = "https://sandbox.paypal.com"


async function generateAccessToken() {
  const response = await axios({
    url: `${PAYPAL_API}/v1/oauth2/token`,
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    auth: {
      username: PAYPAL_CLIENT_ID,
      password: PAYPAL_CLIENT_SECRET,
    },
    data: "grant_type=client_credentials",
  });

  return response.data.access_token;
}

// 🧾 Create Order (for frontend checkout)
exports.createPaypal = async (req, res) => {
  try {
    const { amount } = req.body;
    const accessToken = await generateAccessToken();

    // console.log(accessToken)

    const orderData = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: amount, // or req.body.amount
          },
        },
      ]
    };

    const response = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders`,
      orderData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
          "PayPal-Request-Id": `${Date.now()}-${Math.random()}`, // unique GUID each time
        },
      }
    );

    res.json({
      success: true,
      message: "PayPal order created successfully",
      URL: response.data.links[1],
      data: response.data
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


exports.capturePayment = async (req, res) => {
  const { orderID } = req.body;

  try {
    const accessToken = await generateAccessToken();

    const capture = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders/${orderID}/capture`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(capture.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Something went wrong capturing order", message: error.message });
  }
};