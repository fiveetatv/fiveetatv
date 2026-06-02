"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import {
  ShieldCheck,
  Truck,
  CreditCard,
  ChevronRight,
  MapPin,
  Plus,
} from "lucide-react";
import { motion } from "framer-motion";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, total, clearCart } = useCart();
  const [buyNowItems] = useState(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem("fiveetatv-buy-now-items");
    if (!saved) return [];
    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  });
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [saveToProfile, setSaveToProfile] = useState(false);
  const [address, setAddress] = useState(() => {
    if (typeof window === "undefined") {
      return {
        fullName: "",
        phone: "",
        addressLine: "",
        city: "",
        state: "",
        pincode: "",
      };
    }
    const saved = localStorage.getItem("fiveetatv-buy-now-address");
    if (!saved)
      return {
        fullName: "",
        phone: "",
        addressLine: "",
        city: "",
        state: "",
        pincode: "",
      };
    try {
      return {
        fullName: "",
        phone: "",
        addressLine: "",
        city: "",
        state: "",
        pincode: "",
        ...JSON.parse(saved),
      };
    } catch {
      return {
        fullName: "",
        phone: "",
        addressLine: "",
        city: "",
        state: "",
        pincode: "",
      };
    }
  });

  useEffect(() => {
    loadAddresses();
  }, []);

  async function loadAddresses() {
    try {
      const res = await fetch("/api/addresses");
      const data = await res.json();
      if (res.ok && data.addresses?.length > 0) {
        setSavedAddresses(data.addresses);
        const defaultAddr = data.addresses.find((addr) => addr.isDefault);
        if (defaultAddr) {
          setSelectedAddressId(defaultAddr._id);
          setAddress({
            fullName: defaultAddr.fullName,
            phone: defaultAddr.phone,
            addressLine: defaultAddr.addressLine,
            city: defaultAddr.city,
            state: defaultAddr.state,
            pincode: defaultAddr.pincode,
          });
        }
      }
    } catch (error) {
      console.error("Failed to load addresses:", error);
    }
  }

  function selectAddress(addr) {
    setSelectedAddressId(addr._id);
    setAddress({
      fullName: addr.fullName,
      phone: addr.phone,
      addressLine: addr.addressLine,
      city: addr.city,
      state: addr.state,
      pincode: addr.pincode,
    });
    setShowNewAddress(false);
  }

  const selectedItems = useMemo(
    () => (buyNowItems.length ? buyNowItems : cartItems),
    [buyNowItems, cartItems],
  );
  const subtotal = useMemo(
    () =>
      selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [selectedItems],
  );
  const shippingCost = useMemo(() => (subtotal >= 600 ? 0 : 50), [subtotal]);
  const finalTotal = useMemo(
    () => subtotal + shippingCost,
    [subtotal, shippingCost],
  );

  async function placeCodOrder() {
    // Save address to profile if checkbox is checked
    if (
      saveToProfile &&
      address.fullName &&
      address.phone &&
      address.addressLine &&
      address.city &&
      address.state &&
      address.pincode
    ) {
      try {
        await fetch("/api/addresses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: address.fullName,
            phone: address.phone,
            addressLine: address.addressLine,
            city: address.city,
            state: address.state,
            pincode: address.pincode,
            isDefault: savedAddresses.length === 0,
          }),
        });
      } catch (error) {
        console.error("Failed to save address to profile:", error);
      }
    }

    const res = await fetch("/api/orders/cod", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cartItems: selectedItems,
        amount: finalTotal,
        address,
        marketingConsent,
      }),
    });
    const data = await res.json();
    if (!res.ok)
      return toast.error(data.message || "Failed to place COD order");
    toast.success("COD order placed successfully");
    localStorage.removeItem("fiveetatv-buy-now-items");
    localStorage.removeItem("fiveetatv-buy-now-address");
    if (!buyNowItems.length) clearCart();
    router.push("/account");
  }

  async function handlePayment() {
    if (selectedItems.length === 0) return toast.error("Cart is empty");
    if (Object.values(address).some((value) => !String(value).trim())) {
      return toast.error("Please complete delivery address");
    }
    if (paymentMethod === "cod") return placeCodOrder();

    // 1. Safely load Razorpay script
    const isLoaded = await new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

    if (!isLoaded) {
      return toast.error("Failed to load Razorpay SDK. Please check your connection.");
    }

    try {
      // 2. Create Order
      const orderRes = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: finalTotal }),
      });
      
      const orderData = await orderRes.json();
      if (!orderRes.ok || !orderData.order) {
        throw new Error(orderData.message || "Failed to create order. Please check server logs.");
      }
      
      const { order } = orderData;

      // 3. Razorpay Options with UPI priority override
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_SedOXT7fC5vQmu", 
        amount: order.amount,
        currency: "INR",
        name: "Fiveetatva", 
        description: "Ayurvedic Wellness Products",
        order_id: order.id,
        prefill: {
          name: address.fullName || "",
          contact: address.phone || "",
        },
        theme: {
          color: "#2B52E1", 
        },
        handler: async (response) => {
          // Save address to profile if checkbox is checked
          if (saveToProfile && address.fullName && address.phone && address.addressLine && address.city && address.state && address.pincode) {
            try {
              await fetch("/api/addresses", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  fullName: address.fullName,
                  phone: address.phone,
                  addressLine: address.addressLine,
                  city: address.city,
                  state: address.state,
                  pincode: address.pincode,
                  isDefault: savedAddresses.length === 0,
                }),
              });
            } catch (error) {
              console.error("Failed to save address to profile:", error);
            }
          }

          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...response, cartItems: selectedItems, amount: finalTotal, address, marketingConsent }),
          });
          const verifyData = await verifyRes.json();
          if (verifyRes.ok) {
            toast.success("Order placed successfully");
            localStorage.removeItem("fiveetatv-buy-now-items");
            localStorage.removeItem("fiveetatv-buy-now-address");
            if (!buyNowItems.length) clearCart();
            router.push("/account");
          } else {
            toast.error(verifyData.message || "Payment verification failed");
          }
        },
        modal: {
          ondismiss: function () {
            console.log("Razorpay modal dismissed by user.");
          },
        },
      };

      if (!options.key) {
        throw new Error("Razorpay Key is missing in frontend.");
      }

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        toast.error(`Payment failed: ${response.error.description}`);
      });
      rzp.open();
    } catch (error) {
      console.error("Payment setup failed:", error);
      toast.error(error.message || "Failed to initialize payment");
    }
  }

  if (selectedItems.length === 0) {
    return (
      <EmptyState
        title="No items to checkout"
        description="Add products to your cart before proceeding."
        action={
          <Link href="/">
            <Button>Explore Collection</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-6 pt-32 md:pt-40 pb-12 md:pb-24">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-start">
        <div className="space-y-12">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-light tracking-tight">
              Checkout
            </h1>
            <p className="text-foreground/50 font-light">
              Please fill your delivery details before payment.
            </p>
          </div>

          {/* Delivery Address */}
          <section className="bg-white rounded-[2rem] border border-border p-8 md:p-12 space-y-8 shadow-sm">
            <div className="flex items-center gap-4 border-b border-border pb-6">
              <div className="h-10 w-10 rounded-full bg-accent/10 text-accent flex items-center justify-center">
                <Truck size={20} />
              </div>
              <h2 className="text-xl font-medium tracking-[0.01em]">
                Delivery Address
              </h2>
            </div>

            {savedAddresses.length > 0 && !showNewAddress && (
              <div className="space-y-4">
                <p className="text-sm text-foreground/60">
                  Select a saved address or add a new one
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {savedAddresses.map((addr) => (
                    <div
                      key={addr._id}
                      onClick={() => selectAddress(addr)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedAddressId === addr._id
                          ? "border-accent bg-accent/5 shadow-md"
                          : "border-border bg-white hover:border-accent/30"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="h-5 w-5 rounded-full border-2 mt-0.5 flex items-center justify-center">
                          {selectedAddressId === addr._id && (
                            <div className="h-2.5 w-2.5 rounded-full bg-accent" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">
                            {addr.fullName}
                          </p>
                          <p className="text-sm text-foreground/70">
                            {addr.phone}
                          </p>
                          <p className="text-sm text-foreground/70 mt-1">
                            {addr.addressLine}
                          </p>
                          <p className="text-sm text-foreground/70">
                            {addr.city}, {addr.state} - {addr.pincode}
                          </p>
                          {addr.isDefault && (
                            <span className="inline-block mt-2 text-xs font-bold text-accent uppercase tracking-normal">
                              Default
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setShowNewAddress(true)}
                  className="flex items-center gap-2 text-accent text-sm font-medium hover:text-accent/80 transition-colors"
                >
                  <Plus size={16} /> Add New Address
                </button>
              </div>
            )}

            {showNewAddress && (
              <div className="space-y-4">
                <button
                  onClick={() => setShowNewAddress(false)}
                  className="flex items-center gap-2 text-foreground/60 text-sm hover:text-foreground transition-colors"
                >
                  ← Back to saved addresses
                </button>
                <div className="grid gap-6 sm:grid-cols-2">
                  <Input
                    label="Full Name"
                    placeholder="e.g. John Doe"
                    value={address.fullName}
                    onChange={(e) =>
                      setAddress((prev) => ({
                        ...prev,
                        fullName: e.target.value,
                      }))
                    }
                  />
                  <Input
                    label="Phone Number"
                    placeholder="e.g. 9876543210"
                    value={address.phone}
                    onChange={(e) =>
                      setAddress((prev) => ({ ...prev, phone: e.target.value }))
                    }
                  />
                  <Input
                    label="City"
                    placeholder="e.g. New Delhi"
                    value={address.city}
                    onChange={(e) =>
                      setAddress((prev) => ({ ...prev, city: e.target.value }))
                    }
                  />
                  <Input
                    label="State"
                    placeholder="e.g. Delhi"
                    value={address.state}
                    onChange={(e) =>
                      setAddress((prev) => ({ ...prev, state: e.target.value }))
                    }
                  />
                  <Input
                    label="Pincode"
                    placeholder="e.g. 110001"
                    value={address.pincode}
                    onChange={(e) =>
                      setAddress((prev) => ({
                        ...prev,
                        pincode: e.target.value,
                      }))
                    }
                  />
                  <Input
                    label="Complete Address"
                    placeholder="House No, Building, Street, Area"
                    className="sm:col-span-2"
                    value={address.addressLine}
                    onChange={(e) =>
                      setAddress((prev) => ({
                        ...prev,
                        addressLine: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="saveToProfile"
                    checked={saveToProfile}
                    onChange={(e) => setSaveToProfile(e.target.checked)}
                    className="w-5 h-5 rounded border-foreground/20"
                  />
                  <label
                    htmlFor="saveToProfile"
                    className="text-sm text-foreground/70"
                  >
                    Save this address to my profile for future orders
                  </label>
                </div>
              </div>
            )}

            {savedAddresses.length === 0 && (
              <div className="space-y-4">
                <div className="grid gap-6 sm:grid-cols-2">
                  <Input
                    label="Full Name"
                    placeholder="e.g. John Doe"
                    value={address.fullName}
                    onChange={(e) =>
                      setAddress((prev) => ({
                        ...prev,
                        fullName: e.target.value,
                      }))
                    }
                  />
                  <Input
                    label="Phone Number"
                    placeholder="e.g. 9876543210"
                    value={address.phone}
                    onChange={(e) =>
                      setAddress((prev) => ({ ...prev, phone: e.target.value }))
                    }
                  />
                  <Input
                    label="City"
                    placeholder="e.g. New Delhi"
                    value={address.city}
                    onChange={(e) =>
                      setAddress((prev) => ({ ...prev, city: e.target.value }))
                    }
                  />
                  <Input
                    label="State"
                    placeholder="e.g. Delhi"
                    value={address.state}
                    onChange={(e) =>
                      setAddress((prev) => ({ ...prev, state: e.target.value }))
                    }
                  />
                  <Input
                    label="Pincode"
                    placeholder="e.g. 110001"
                    value={address.pincode}
                    onChange={(e) =>
                      setAddress((prev) => ({
                        ...prev,
                        pincode: e.target.value,
                      }))
                    }
                  />
                  <Input
                    label="Complete Address"
                    placeholder="House No, Building, Street, Area"
                    className="sm:col-span-2"
                    value={address.addressLine}
                    onChange={(e) =>
                      setAddress((prev) => ({
                        ...prev,
                        addressLine: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="saveToProfileNoAddresses"
                    checked={saveToProfile}
                    onChange={(e) => setSaveToProfile(e.target.checked)}
                    className="w-5 h-5 rounded border-foreground/20"
                  />
                  <label
                    htmlFor="saveToProfileNoAddresses"
                    className="text-sm text-foreground/70"
                  >
                    Save this address to my profile for future orders
                  </label>
                </div>
              </div>
            )}
          </section>

          {/* Payment Method */}
          <section className="bg-white rounded-[2rem] border border-border p-8 md:p-12 space-y-8 shadow-sm">
            <div className="flex items-center gap-4 border-b border-border pb-6">
              <div className="h-10 w-10 rounded-full bg-accent/10 text-accent flex items-center justify-center">
                <CreditCard size={20} />
              </div>
              <h2 className="text-xl font-medium">Payment Method</h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  id: "razorpay",
                  label: "Online Payment",
                  desc: "Cards, UPI, NetBanking",
                },
                {
                  id: "cod",
                  label: "Cash on Delivery",
                  desc: "Pay when you receive",
                },
              ].map((method) => (
                <label
                  key={method.id}
                  className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex flex-col gap-1 ${
                    paymentMethod === method.id
                      ? "border-accent bg-accent/5 shadow-md"
                      : "border-border bg-white hover:border-accent/30"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    className="absolute top-4 right-4 accent-accent"
                    checked={paymentMethod === method.id}
                    onChange={() => setPaymentMethod(method.id)}
                  />
                  <span className="font-bold text-sm uppercase tracking-normal">
                    {method.label}
                  </span>
                  <span className="text-xs text-foreground/50 tracking-[0.01em]">
                    {method.desc}
                  </span>
                </label>
              ))}
            </div>
          </section>
        </div>

        {/* Order Summary */}
        <aside className="lg:sticky lg:top-32 space-y-8">
          <div className="bg-foreground text-background rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2" />

            <h2 className="text-2xl font-light mb-8 text-background">
              Order{" "}
              <span className="font-display italic text-accent">Summary</span>
            </h2>

            <div className="space-y-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
              {selectedItems.map((item) => (
                <div
                  key={item.productId}
                  className="flex justify-between gap-4 text-sm border-b border-background/20 pb-4"
                >
                  <div className="space-y-1">
                    <p className="font-medium text-background/90 leading-tight">
                      {item.name}
                    </p>
                    <p className="text-xs text-background/50 uppercase tracking-normal">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="font-medium text-accent whitespace-nowrap">
                    ₹ {item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-background/20 space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-background/60 font-light">Subtotal</p>
                <p className="text-background/90">₹ {subtotal}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-background/60 font-light">Shipping</p>
                <p
                  className={
                    shippingCost === 0
                      ? "text-accent font-medium"
                      : "text-background/90"
                  }
                >
                  {shippingCost === 0 ? "FREE" : `₹ ${shippingCost}`}
                </p>
              </div>
              {shippingCost > 0 && subtotal < 600 && (
                <p className="text-xs text-background/50">
                  Add ₹{600 - subtotal} more for free shipping
                </p>
              )}
              <div className="flex justify-between items-end pt-4 border-t border-background/20">
                <p className="text-background/60 font-light">Grand Total</p>
                <p className="text-3xl font-light text-accent">
                  ₹ {finalTotal}
                </p>
              </div>
            </div>

            <div className="space-y-4 mt-6">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  className="mt-1 accent-accent rounded border-background/30"
                  checked={marketingConsent}
                  onChange={(e) => setMarketingConsent(e.target.checked)}
                />
                <span className="text-[11px] text-background/70 leading-relaxed group-hover:text-background transition-colors">
                  I agree to receive marketing emails about new rituals and
                  wellness tips.
                </span>
              </label>

              <p className="text-[10px] text-background/60 leading-relaxed">
                By placing this order, you agree to Fiveetatv's{" "}
                <Link
                  href="/terms"
                  className="underline hover:text-accent transition-colors"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy-policy"
                  className="underline hover:text-accent transition-colors"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>

            <button
              onClick={handlePayment}
              className="w-full bg-accent text-background py-6 rounded-full font-bold uppercase tracking-normal text-xs hover:bg-accent/90 transition-all duration-500 shadow-xl mt-6"
            >
              {paymentMethod === "cod"
                ? "Place COD Order"
                : "Pay with Razorpay"}
            </button>

            <div className="mt-6 flex items-center justify-center gap-2 text-background/40 text-[10px] uppercase tracking-normal font-bold">
              <ShieldCheck size={14} /> 100% Secure Checkout
            </div>
          </div>

          <div className="bg-muted p-8 rounded-3xl space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-normal text-foreground/40">
              Need Help?
            </h4>
            <p className="text-xs text-foreground/60 leading-relaxed">
              Our practitioners are available for any questions regarding your
              ritual.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-xs font-bold text-accent hover:text-foreground transition-colors"
            >
              Contact Support <ChevronRight size={14} />
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
