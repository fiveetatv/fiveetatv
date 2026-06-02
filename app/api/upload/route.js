import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const { image, file, type } = await req.json();
    
    // Validate input
    if (!image && !file) {
      return NextResponse.json({ message: "File is required" }, { status: 400 });
    }
    
    const fileToUpload = image || file;
    
    // Check file size (limit to 20MB for videos)
    const isVideo = fileToUpload.startsWith('data:video/') || type === 'video';
    const base64Data = fileToUpload.split(',')[1];
    const fileSize = Math.ceil((base64Data.length * 3) / 4) / 1024 / 1024;
    
    if (isVideo && fileSize > 20) {
      return NextResponse.json({ message: "Video size must be less than 20MB" }, { status: 400 });
    } else if (!isVideo && fileSize > 5) {
      return NextResponse.json({ message: "Image size must be less than 5MB" }, { status: 400 });
    }
    
    // Upload to Cloudinary with optimizations
    const options = {
      folder: "ayurveda-products",
      resource_type: "auto"
    };

    if (!isVideo) {
      options.transformation = [
        { quality: "auto", fetch_format: "auto" },
        { width: 1200, crop: "limit" }
      ];
    }
    
    const result = await cloudinary.uploader.upload(fileToUpload, options);
    
    return NextResponse.json({ 
      url: result.secure_url,
      publicId: result.public_id 
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return NextResponse.json({ 
      message: error.message || "Failed to upload image" 
    }, { status: 500 });
  }
}
