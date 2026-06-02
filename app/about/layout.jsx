import { Metadata } from "next";

export const metadata = {
  title: "About Fiveetatv | Ayurvedic Wellness Brand by Rahul Gour & Suresh Gaur",
  description: "Fiveetatv is an Ayurvedic wellness brand founded by Rahul Gour and Suresh Gaur in Delhi, India. We provide natural and effective Ayurvedic products for a healthier lifestyle with focus on quality, purity, and traditional formulations.",
  keywords: "Fiveetatv, Fiveeta, founders of Fiveeta, founders of Fiveetatv, Ayurvedic products, Rahul Gour, Suresh Gaur, Ayurvedic wellness, natural health products, Delhi India, traditional Ayurveda, herbal supplements, wellness brand",
  openGraph: {
    title: "About Fiveetatv | Ayurvedic Wellness Brand",
    description: "Founded by Rahul Gour & Suresh Gaur, Fiveetatv provides natural and effective Ayurvedic products for a healthier lifestyle based in Delhi, India.",
    type: "website",
  },
};

export default function AboutLayout({ children }) {
  return children;
}
