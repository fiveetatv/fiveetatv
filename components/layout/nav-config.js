export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const PRODUCT_CATEGORIES = [
  {
    label: "Diabetes Support",
    hasDropdown: true,
    subLinks: [
      {
        label: "MadhuCurex Powder",
        description: "For Sugar",
        href: "/product/madhucurex-powder"
      },
      {
        label: "MadhuCurex Capsule",
        description: "For Sugar",
        href: "/product/madhucurex-capsules"
      }
    ]
  },
  {
    label: "Digestive Health",
    href: "/product/paachan-sathi-powder"
  }
];

export const SEARCH_PAGES = [
  { href: "/about", title: "About Fiveetatv", description: "Brand philosophy and our wellness mission." },
  { href: "/contact", title: "Contact", description: "Support, wholesale, and order help." },
  { href: "/privacy-policy", title: "Privacy Policy", description: "How we protect user data." },
  { href: "/terms", title: "Terms & Conditions", description: "Order and platform terms." },
  { href: "/refund-policy", title: "Refund Policy", description: "Return and refund process." },
  { href: "/shipping-policy", title: "Shipping Policy", description: "Delivery windows and fees." },
  { href: "/account", title: "My Account", description: "Profile, orders, and settings." },
  { href: "/cart", title: "Cart", description: "Review items before checkout." },
];
