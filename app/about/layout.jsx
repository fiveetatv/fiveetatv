import { Metadata } from "next";

export const metadata = {
  title: "About Fiveetatv | Ayurvedic Wellness Brand by Rahul Gour & Suraj Gaur",
  description: "Fiveetatv is an Ayurvedic wellness brand founded by Rahul Gour and Suraj Gaur in Delhi, India. We provide natural and effective Ayurvedic products for a healthier lifestyle with focus on quality, purity, and traditional formulations.",
  keywords: "Fiveetatv, Ayurvedic products, Rahul Gour, Suraj Gaur, Ayurvedic wellness, natural health products, Delhi India, traditional Ayurveda, herbal supplements, wellness brand",
  openGraph: {
    title: "About Fiveetatv | Ayurvedic Wellness Brand",
    description: "Founded by Rahul Gour & Suraj Gaur, Fiveetatv provides natural and effective Ayurvedic products for a healthier lifestyle based in Delhi, India.",
    type: "website",
  },
};

export default function AboutLayout({ children }) {
  return children;
}
