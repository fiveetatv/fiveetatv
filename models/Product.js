import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    isVisible: { type: Boolean, default: true },
    description: { type: String, required: true },
    benefits: [{ type: String }],
    ingredients: [{ type: String }],
    usage: [{ type: String }],
    trustQuality: {
      naturalIngredients: { type: Boolean, default: false },
      labTested: { type: Boolean, default: false },
      noAddedSugar: { type: Boolean, default: false },
      madeInIndia: { type: Boolean, default: false },
      ayurvedicFormulation: { type: Boolean, default: false },
    },
    featureImages: [{ type: String }],
    faqs: [
      {
        question: String,
        answer: String,
      },
    ],
    reviews: [
      {
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        name: String,
        image: String,
        rating: Number,
        comment: String,
        approved: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    images: [{ type: String }],
    formulaimage: { type: String },
    videoUrl: { type: String },
    rating: { type: Number, default: 4.5 },
    reviewsCount: { type: Number, default: 0 },
    deliveryDays: { type: Number, default: 5 }, // Delivery time in days
  },
  { timestamps: true }
);

// Add indexes for better query performance
ProductSchema.index({ slug: 1 });
ProductSchema.index({ isVisible: 1 });
ProductSchema.index({ createdAt: -1 });
ProductSchema.index({ rating: -1 });

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
