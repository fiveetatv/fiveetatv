import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Providers from "@/components/ui/Providers";
import CookieConsent from "@/components/ui/CookieConsent";
import LenisProvider from "@/components/ui/LenisProvider";
import NetworkStatus from "@/components/ui/NetworkStatus";
import { Toaster } from "react-hot-toast";
import { FaWhatsapp } from "react-icons/fa";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Fiveetatv",
  "url": "https://fiveetatv.com",
  "logo": "https://fiveetatv.com/assets/logo.png",
  "description": "Fiveetatv - Premium Ayurvedic wellness brand founded by Suraj Gaur & Rahul Gour in Delhi, India. Natural Ayurvedic products for sugar balance, digestive health, and overall wellness.",
  "founders": [
    {
      "@type": "Person",
      "name": "Suraj Gaur"
    },
    {
      "@type": "Person",
      "name": "Rahul Gour"
    }
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Delhi",
    "addressCountry": "India"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "fiveetatv@gmail.com",
    "contactType": "customer service"
  },
  "sameAs": [
    "https://www.instagram.com/fiveetatvofficial",
    "https://www.facebook.com/share/18iTV2DwvQ/"
  ]
};

export const metadata = {
  metadataBase: new URL("https://fiveetatv.com"),
  title: {
    default: "Fiveetatv | Premium Ayurvedic Wellness Products in Delhi, India",
    template: "%s | Fiveetatv",
  },
  description: "Fiveetatv - Premium Ayurvedic wellness brand founded by Suraj Gaur & Rahul Gour in Delhi, India. Natural Ayurvedic products for sugar balance, digestive health, and overall wellness. 100% natural, lab-tested formulations.",
  keywords: [
    "Fiveetatv",
    "Fiveeta",
    "founders of Fiveetatv",
    "founders of Fiveeta",
    "Ayurvedic products",
    "Ayurveda India",
    "herbal supplements",
    "natural wellness",
    "Ayurvedic medicine",
    "sugar balance",
    "digestive health",
    "Ayurvedic wellness Delhi",
    "Suraj Gaur",
    "Rahul Gour",
    "traditional Ayurveda",
    "herbal remedies",
    "Ayurvedic formulations",
    "natural health products",
    "Ayurvedic store",
    "herbal medicine India",
    "Ayurvedic supplements",
    "wellness products"
  ],
  authors: [{ name: "Suraj Gaur", url: "https://fiveetatv.com" }, { name: "Rahul Gour", url: "https://fiveetatv.com" }],
  creator: "Fiveetatv",
  publisher: "Fiveetatv",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://fiveetatv.com",
    siteName: "Fiveetatv",
    title: "Fiveetatv | Premium Ayurvedic Wellness Products",
    description: "Premium Ayurvedic wellness brand founded by Suraj Gaur & Rahul Gour. Natural products for sugar balance, digestive health, and overall wellness.",
    images: [
      {
        url: "/assets/logo.png",
        width: 1200,
        height: 630,
        alt: "Fiveetatv - Premium Ayurvedic Wellness",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fiveetatv | Premium Ayurvedic Wellness Products",
    description: "Premium Ayurvedic wellness brand founded by Suraj Gaur & Rahul Gour. Natural products for sugar balance, digestive health, and overall wellness.",
    images: ["/assets/logo.png"],
    creator: "@fiveetatv",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#658518" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Fiveetatv" />
        <link rel="apple-touch-icon" href="/assets/logo.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-foreground">
        <NetworkStatus />
        <Providers>
          <LenisProvider>
            <Navbar />
            <main className="w-full flex-1 flex flex-col lg:pt-[128px] pb-[72px] lg:pb-0 relative z-10">{children}</main>
            <Footer />
            <CookieConsent />
            
            {/* Floating WhatsApp Button */}
            <a 
              href="https://wa.me/919318445297" 
              target="_blank" 
              rel="noopener noreferrer"
              className="fixed bottom-24 lg:bottom-8 right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 active:scale-95 group"
              aria-label="Contact us on WhatsApp"
            >
              <FaWhatsapp size={32} />
              <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-slate-900 px-4 py-2 rounded-xl text-sm font-medium shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none border border-slate-100">
                Chat with us
              </span>
            </a>
          </LenisProvider>
        </Providers>
        <Toaster
          position="top-right"
          toastOptions={{
            style: { border: "1px solid #dbe8bf", background: "#ffffff", color: "#3f5b35" },
          }}
        />
      </body>
    </html>
  );
}
