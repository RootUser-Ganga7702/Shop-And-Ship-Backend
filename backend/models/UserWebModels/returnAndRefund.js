const mongoose = require("mongoose");

const ReturnRefundPolicySchema = new mongoose.Schema(
  {
    heading: { type: String, required: true }, // e.g., "Return & Refund Policy"
    description: { type: String }, // short overview
    content: { type: String }, // full policy content in HTML or markdown
    points: [{ type: String }], // bullet points like conditions or steps
    refundPeriod: { type: String }, // e.g., "7 days", "30 days"
    eligibilityCriteria: [{ type: String }], // who/what qualifies for return
    nonReturnableItems: [{ type: String }], // list of excluded items
    processSteps: [{ type: String }], // step-by-step return/refund process
    contactEmail: { type: String }, // support email for refund queries
    image: { type: String }, // optional banner or illustration image
    status: { type: String, enum: ["active", "inactive"], default: "active" } // control visibility
  },
  { timestamps: true }
);

module.exports = mongoose.model("ReturnRefundPolicy", ReturnRefundPolicySchema);
