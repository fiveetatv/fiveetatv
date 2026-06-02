import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        productId: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
      },
    ],
    amount: { type: Number, required: true },
    address: {
      fullName: String,
      phone: String,
      addressLine: String,
      city: String,
      state: String,
      pincode: String,
    },
    paymentId: String,
    orderId: String,
    paymentMethod: { type: String, enum: ["razorpay", "cod"], default: "razorpay" },
    status: { type: String, enum: ["placed", "processing", "shipped", "delivered", "cancelled"], default: "placed" },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
