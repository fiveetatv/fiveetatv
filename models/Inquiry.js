import mongoose, { Schema } from "mongoose";

const InquirySchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    subject: { type: String, default: "Doctor Consultation" },
    message: { type: String },
    type: { type: String, enum: ["consultation", "contact"], default: "consultation" },
    status: { type: String, enum: ["pending", "contacted", "resolved"], default: "pending" },
    productSlug: { type: String }, // Optional: link to product if from product page
  },
  { timestamps: true }
);

export default mongoose.models.Inquiry || mongoose.model("Inquiry", InquirySchema);
