"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import EmptyState from "@/components/ui/EmptyState";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import toast from "react-hot-toast";
import Sidebar from "@/components/ui/Sidebar";
import OrderCard from "@/components/order/OrderCard";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { UserRound, Settings, ShoppingBag, LogOut, ArrowRight, MapPin, Plus, Trash2 } from "lucide-react";

export default function AccountPage() {
  const router = useRouter();
  const { user, loading, refreshUser, logout } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-foreground/10"></div>
          <p className="text-foreground/50">Loading...</p>
        </div>
      </div>
    );
  }
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [profile, setProfile] = useState({ name: "", phone: "" });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "" });
  const [activeSection, setActiveSection] = useState("profile");

  useEffect(() => {
    fetch("/api/orders/mine")
      .then((res) => res.json())
      .then((data) => setOrders(data.orders || []));
    
    loadAddresses();
  }, []);

  async function loadAddresses() {
    try {
      const res = await fetch("/api/addresses");
      const data = await res.json();
      if (res.ok) {
        setAddresses(data.addresses || []);
      }
    } catch (error) {
      console.error("Failed to load addresses:", error);
    }
  }

  async function deleteAddress(addressId) {
    if (!confirm("Are you sure you want to delete this address?")) return;
    
    const res = await fetch(`/api/addresses/${addressId}`, {
      method: "DELETE",
    });
    
    if (!res.ok) return toast.error("Failed to delete address");
    
    toast.success("Address deleted successfully");
    loadAddresses();
  }

  async function setDefaultAddress(addressId) {
    const res = await fetch(`/api/addresses/${addressId}/default`, {
      method: "PATCH",
    });
    
    if (!res.ok) return toast.error("Failed to set default address");
    
    toast.success("Default address updated");
    loadAddresses();
  }

  async function saveProfile(e) {
    e.preventDefault();
    const payload = {
      name: profile.name || user?.name || "",
      phone: profile.phone || user?.phone || "",
    };
    const res = await fetch("/api/account/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) return toast.error(data.message || "Failed to update profile");
    await refreshUser();
    toast.success("Profile updated");
  }

  async function updatePassword(e) {
    e.preventDefault();
    const res = await fetch("/api/account/password", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(passwordForm),
    });
    const data = await res.json();
    if (!res.ok) return toast.error(data.message || "Failed to update password");
    setPasswordForm({ currentPassword: "", newPassword: "" });
    toast.success("Password updated");
  }

  const fadeAnim = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <div className="min-h-[80vh] bg-background w-full pt-32 md:pt-40 pb-32">
      <div className="max-w-[1600px] mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 space-y-4"
        >
          <div className="flex items-center gap-4">
            <span className="h-[1px] w-12 bg-accent"></span>
            <span className="text-xs uppercase tracking-[0.05em] text-foreground/60 font-medium">Your Space</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-light tracking-[0.01em]">
            My <span className="font-display italic text-secondary">Account</span>
          </h1>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-[280px_1fr]">
          <motion.aside 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col md:flex-row lg:flex-col gap-6 md:gap-8 lg:gap-0 lg:space-y-8 w-full"
          >
            <div className="bg-white/40 backdrop-blur-md rounded-[2rem] border border-foreground/5 p-6 md:p-8 flex flex-row items-center gap-4 text-left sm:flex-col sm:items-center sm:text-center sm:space-y-4 sm:gap-0 w-full md:w-1/3 lg:w-full">
              <div className="h-16 w-16 sm:h-24 sm:w-24 rounded-full bg-accent/10 text-accent flex items-center justify-center text-2xl sm:text-4xl font-display italic flex-shrink-0">
                {user?.name?.charAt(0) || "U"}
              </div>
              <div>
                <p className="font-display italic text-xl sm:text-2xl text-accent leading-tight">{user?.name || "User"}</p>
                <p className="text-xs sm:text-sm text-foreground/50 mt-1">{user?.email}</p>
              </div>
            </div>

            <div className="bg-white/40 backdrop-blur-md rounded-[1.5rem] sm:rounded-[2rem] border border-foreground/5 p-2 sm:p-4 flex flex-row overflow-x-auto no-scrollbar sm:flex-col gap-2 w-full md:w-2/3 lg:w-full">
              <button 
                onClick={() => setActiveSection("profile")}
                className={`flex items-center gap-3 px-4 py-3 sm:px-6 sm:py-4 rounded-xl transition-all duration-300 flex-shrink-0 ${activeSection === "profile" ? "bg-foreground text-background" : "hover:bg-foreground/5 text-foreground/70"}`}
              >
                <UserRound size={18} /> <span className="text-xs sm:text-sm uppercase tracking-normal font-medium">Profile</span>
              </button>
              <button 
                onClick={() => setActiveSection("orders")}
                className={`flex items-center gap-3 px-4 py-3 sm:px-6 sm:py-4 rounded-xl transition-all duration-300 flex-shrink-0 ${activeSection === "orders" ? "bg-foreground text-background" : "hover:bg-foreground/5 text-foreground/70"}`}
              >
                <ShoppingBag size={18} /> <span className="text-xs sm:text-sm uppercase tracking-normal font-medium">Orders</span>
              </button>
              <button 
                onClick={() => setActiveSection("addresses")}
                className={`flex items-center gap-3 px-4 py-3 sm:px-6 sm:py-4 rounded-xl transition-all duration-300 flex-shrink-0 ${activeSection === "addresses" ? "bg-foreground text-background" : "hover:bg-foreground/5 text-foreground/70"}`}
              >
                <MapPin size={18} /> <span className="text-xs sm:text-sm uppercase tracking-normal font-medium">Addresses</span>
              </button>
              <button 
                onClick={() => setActiveSection("settings")}
                className={`flex items-center gap-3 px-4 py-3 sm:px-6 sm:py-4 rounded-xl transition-all duration-300 flex-shrink-0 ${activeSection === "settings" ? "bg-foreground text-background" : "hover:bg-foreground/5 text-foreground/70"}`}
              >
                <Settings size={18} /> <span className="text-xs sm:text-sm uppercase tracking-normal font-medium">Settings</span>
              </button>
              <button 
                onClick={async () => {
                  await logout();
                  router.replace("/");
                }}
                className="flex items-center gap-3 px-4 py-3 sm:px-6 sm:py-4 rounded-xl text-red-500/80 hover:bg-red-500/10 hover:text-red-500 transition-all duration-300 flex-shrink-0 sm:mt-4 sm:border-t border-foreground/5"
              >
                <LogOut size={18} /> <span className="text-xs sm:text-sm uppercase tracking-normal font-medium">Logout</span>
              </button>
            </div>
          </motion.aside>

          <div className="min-h-[500px]">
            <AnimatePresence mode="wait">
              {activeSection === "profile" && (
                <motion.div key="profile" {...fadeAnim} className="space-y-8 max-w-2xl">
                  <div className="space-y-2">
                    <h2 className="text-3xl md:text-4xl font-display italic text-accent tracking-[0.01em]">Personal Details</h2>
                    <p className="text-foreground/60 font-light">Manage your personal information and preferences.</p>
                  </div>
                  
                  <form onSubmit={saveProfile} className="space-y-6 bg-white/40 backdrop-blur-md rounded-[2rem] border border-foreground/5 p-8 md:p-10">
                    <div className="space-y-6">
                      <Input label="Full Name" value={profile.name || user?.name || ""} onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))} />
                      <Input label="Email Address" value={user?.email || ""} disabled />
                      <Input label="Phone Number" value={profile.phone || user?.phone || ""} onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))} />
                    </div>
                    <button type="submit" className="h-14 px-8 rounded-full bg-foreground text-background flex items-center justify-center gap-3 hover:bg-secondary transition-colors duration-300 font-medium uppercase tracking-normal text-sm w-full md:w-auto mt-8">
                      Save Changes
                    </button>
                  </form>
                </motion.div>
              )}

              {activeSection === "settings" && (
                <motion.div key="settings" {...fadeAnim} className="space-y-8 max-w-2xl">
                  <div className="space-y-2">
                    <h2 className="text-3xl md:text-4xl font-display italic text-accent tracking-[0.01em]">Security</h2>
                    <p className="text-foreground/60 font-light">Ensure your account stays secure.</p>
                  </div>
                  
                  <form onSubmit={updatePassword} className="space-y-6 bg-white/40 backdrop-blur-md rounded-[2rem] border border-foreground/5 p-8 md:p-10">
                    <div className="space-y-6">
                      <Input
                        label="Current Password"
                        type="password"
                        value={passwordForm.currentPassword}
                        onChange={(e) => setPasswordForm((p) => ({ ...p, currentPassword: e.target.value }))}
                      />
                      <Input
                        label="New Password"
                        type="password"
                        value={passwordForm.newPassword}
                        onChange={(e) => setPasswordForm((p) => ({ ...p, newPassword: e.target.value }))}
                      />
                    </div>
                    <button type="submit" className="h-14 px-8 rounded-full bg-accent text-background flex items-center justify-center gap-3 hover:bg-accent/90 transition-colors duration-300 font-medium uppercase tracking-normal text-sm w-full md:w-auto mt-8">
                      Update Password
                    </button>
                  </form>
                </motion.div>
              )}

              {activeSection === "orders" && (
                <motion.div key="orders" {...fadeAnim} className="space-y-8">
                  <div className="space-y-2">
                    <h2 className="text-3xl md:text-4xl font-display italic text-accent tracking-[0.01em]">Order History</h2>
                    <p className="text-foreground/60 font-light">Track your past purchases and rituals.</p>
                  </div>
                  
                  <div className="space-y-6">
                    {!orders.length ? (
                      <div className="py-20 border border-foreground/10 rounded-[3rem] bg-white/40 backdrop-blur-md flex flex-col items-center justify-center text-center space-y-6">
                        <ShoppingBag size={48} className="text-foreground/20" />
                        <p className="text-xl font-light text-foreground/60 max-w-sm">You haven't started any rituals yet.</p>
                        <Link 
                          href="/shop" 
                          className="h-12 px-8 rounded-full bg-foreground text-background flex items-center justify-center gap-3 hover:bg-secondary transition-colors duration-300 font-medium uppercase tracking-normal text-xs mt-4"
                        >
                          Explore Collection <ArrowRight size={14} />
                        </Link>
                      </div>
                    ) : (
                      orders.map((o) => (
                        <OrderCard key={o._id} order={o} />
                      ))
                    )}
                  </div>
                </motion.div>
              )}

              {activeSection === "addresses" && (
                <motion.div key="addresses" {...fadeAnim} className="space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <h2 className="text-3xl md:text-4xl font-display italic text-accent tracking-[0.01em]">Saved Addresses</h2>
                      <p className="text-foreground/60 font-light">Manage your delivery addresses.</p>
                    </div>
                    <Link href="/account/add-address">
                      <Button className="flex items-center gap-2">
                        <Plus size={16} /> Add Address
                      </Button>
                    </Link>
                  </div>
                  
                  <div className="space-y-4">
                    {!addresses.length ? (
                      <div className="py-20 border border-foreground/10 rounded-[3rem] bg-white/40 backdrop-blur-md flex flex-col items-center justify-center text-center space-y-6">
                        <MapPin size={48} className="text-foreground/20" />
                        <p className="text-xl font-light text-foreground/60 max-w-sm">No saved addresses yet.</p>
                        <Link href="/account/add-address">
                          <Button>Add Your First Address</Button>
                        </Link>
                      </div>
                    ) : (
                      addresses.map((addr) => (
                        <div 
                          key={addr._id} 
                          className={`relative p-6 rounded-2xl border transition-all ${
                            addr.isDefault 
                              ? "bg-accent/10 border-accent" 
                              : "bg-white/40 border-foreground/5"
                          }`}
                        >
                          {addr.isDefault && (
                            <span className="absolute top-4 right-4 text-xs font-bold text-accent uppercase tracking-normal">Default</span>
                          )}
                          <div className="space-y-2">
                            <p className="font-medium text-foreground">{addr.fullName}</p>
                            <p className="text-sm text-foreground/70">{addr.phone}</p>
                            <p className="text-sm text-foreground/70">{addr.addressLine}</p>
                            <p className="text-sm text-foreground/70">{addr.city}, {addr.state} - {addr.pincode}</p>
                          </div>
                          <div className="flex gap-2 mt-4">
                            {!addr.isDefault && (
                              <button
                                onClick={() => setDefaultAddress(addr._id)}
                                className="text-xs uppercase tracking-normal text-accent hover:text-accent/80 transition-colors"
                              >
                                Set Default
                              </button>
                            )}
                            <button
                              onClick={() => deleteAddress(addr._id)}
                              className="text-xs uppercase tracking-normal text-red-500 hover:text-red-600 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}