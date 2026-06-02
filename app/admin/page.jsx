"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Link from "next/link";
import { LayoutDashboard, Package, ReceiptText, Users, ArrowUpRight, TrendingUp, DollarSign, Activity, BarChart3, Settings, LogOut, MessageSquare, Trash2, Check, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const AreaChart = dynamic(() => import("recharts").then(mod => mod.AreaChart), { ssr: false });
const BarChart = dynamic(() => import("recharts").then(mod => mod.BarChart), { ssr: false });
const ResponsiveContainer = dynamic(() => import("recharts").then(mod => mod.ResponsiveContainer), { ssr: false });
const Area = dynamic(() => import("recharts").then(mod => mod.Area), { ssr: false });
const Bar = dynamic(() => import("recharts").then(mod => mod.Bar), { ssr: false });
const CartesianGrid = dynamic(() => import("recharts").then(mod => mod.CartesianGrid), { ssr: false });
const XAxis = dynamic(() => import("recharts").then(mod => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import("recharts").then(mod => mod.YAxis), { ssr: false });
const Tooltip = dynamic(() => import("recharts").then(mod => mod.Tooltip), { ssr: false });

const empty = {
  name: "", slug: "", category: "Ayurvedic", price: 0, discountPrice: 0, stock: 0,
  isVisible: true, description: "", benefits: "", ingredients: "",
  usage: "", images: [], formulaimage: "", videoUrl: "", trustQuality: {},
  rating: 4.5, reviewsCount: 0, deliveryDays: 5,
};

const fadeAnim = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
};

export default function AdminPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingSlug, setEditingSlug] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [chartsReady] = useState(() => typeof window !== "undefined");
  const [uploading, setUploading] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState("");

  const totalSales = useMemo(() => orders.reduce((s, o) => s + o.amount, 0), [orders]);
  const averageOrderValue = useMemo(() => (orders.length ? Math.round(totalSales / orders.length) : 0), [orders, totalSales]);
  const conversionRate = useMemo(() => (users.length ? ((orders.length / users.length) * 100).toFixed(1) : "0.0"), [orders.length, users.length]);
  
  const chartData = useMemo(() => {
    return orders.slice().reverse().map((order, idx) => ({
      index: idx + 1, revenue: order.amount, orders: idx + 1,
    }));
  }, [orders]);
  
  const userGrowthData = useMemo(() => users.slice().reverse().map((u, idx) => ({ index: idx + 1, users: idx + 1 })), [users]);
  
  const topProductsData = useMemo(() => {
    const counts = {};
    orders.forEach((o) => {
      (o.items || []).forEach((item) => {
        counts[item.name] = (counts[item.name] || 0) + item.quantity;
      });
    });
    return Object.entries(counts).map(([name, quantity]) => ({ name, quantity })).sort((a, b) => b.quantity - a.quantity).slice(0, 5);
  }, [orders]);
  
  const paymentSplit = useMemo(() => {
    const cod = orders.filter((o) => o.paymentMethod === "cod").length;
    const razorpay = orders.filter((o) => o.paymentMethod !== "cod").length;
    return [
      { name: "Razorpay", value: razorpay, color: "#3B5339" },
      { name: "COD", value: cod, color: "#E8DD95" },
    ];
  }, [orders]);

  async function loadData() {
    const [p, o, u, i] = await Promise.all([
      fetch("/api/products?includeAll=true"),
      fetch("/api/orders/all"),
      fetch("/api/users/all"),
      fetch("/api/inquiries"),
    ]);
    const pData = await p.json();
    const oData = await o.json();
    const uData = await u.json();
    const iData = await i.json();
    setProducts(pData.products || []);
    setOrders(oData.orders || []);
    setUsers(uData.users || []);
    setInquiries(iData || []);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleFileUpload(file, type = 'image') {
    if (!file) return null;
    
    try {
      const base64 = await fileToBase64(file);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: JSON.stringify({ 
          file: base64,
          type 
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      return data.url;
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(`${type.charAt(0).toUpperCase() + type.slice(1)} upload failed: ${error.message}`);
      return null;
    }
  }

  async function handleImageUpload(file) {
    return handleFileUpload(file, 'image');
  }

  async function handleVideoUpload(file) {
    return handleFileUpload(file, 'video');
  }

  async function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  }

  async function saveProduct(e) {
    e.preventDefault();
    setUploading(true);
    
    const payload = {
      name: form.name,
      slug: form.slug,
      category: form.category || "Ayurvedic",
      price: Number(form.price) || 0,
      discountPrice: Number(form.discountPrice) || 0,
      stock: Number(form.stock) || 0,
      isVisible: form.isVisible,
      description: form.description || "",
      benefits: form.benefits ? form.benefits.split(",").map((x) => x.trim()).filter(Boolean) : [],
      ingredients: form.ingredients ? form.ingredients.split(",").map((x) => x.trim()).filter(Boolean) : [],
      usage: form.usage ? form.usage.split(",").map((x) => x.trim()).filter(Boolean) : [],
      featureImages: form.images || [],
      formulaimage: form.formulaimage || "",
      videoUrl: form.videoUrl || "",
      trustQuality: form.trustQuality || {},
      rating: Number(form.rating) || 4.5,
      reviewsCount: Number(form.reviewsCount) || 0,
      deliveryDays: Number(form.deliveryDays) || 5,
    };

    const url = editingSlug ? `/api/products/${editingSlug}` : "/api/products";

    try {
      const res = await fetch(url, {
        method: editingSlug ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      const data = await res.json();
      console.log("Save response:", data);
      
      if (!res.ok) {
        setUploading(false);
        return toast.error(data.message || `Save failed: ${res.status}`);
      }
      
      toast.success(editingSlug ? "Product updated" : "Product created");
      setForm(empty);
      setEditingSlug("");
      setImageUrlInput("");
      setUploading(false);
      
      // Refresh data without full page reload
      await loadData();
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to save product. Please try again.");
      setUploading(false);
    }
  }

  async function deleteProduct(slug) {
    await fetch(`/api/products/${slug}`, { method: "DELETE" });
    toast.success("Product deleted");
    await loadData();
  }

  async function approveReview(productId, reviewId, approved) {
    try {
      const res = await fetch(`/api/reviews/${reviewId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, approved }),
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        return toast.error(errorData.error || "Failed to update review");
      }
      
      toast.success(approved ? "Review approved" : "Review unapproved");
      await loadData();
    } catch (error) {
      console.error("Approve review error:", error);
      toast.error("Failed to update review");
    }
  }

  async function deleteReview(productId, reviewId) {
    try {
      const res = await fetch(`/api/reviews/${reviewId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        return toast.error(errorData.error || "Failed to delete review");
      }
      
      toast.success("Review deleted");
      await loadData();
    } catch (error) {
      console.error("Delete review error:", error);
      toast.error("Failed to delete review");
    }
  }

  async function toggleVisibility(product) {
    const res = await fetch(`/api/products/${product.slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isVisible: !product.isVisible }),
    });
    if (!res.ok) return toast.error("Visibility update failed");
    toast.success(`Product ${product.isVisible ? "hidden" : "unhidden"}`);
    await loadData();
  }

  async function updateOrderStatus(orderId, status) {
    const res = await fetch("/api/orders/all", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, status }),
    });
    if (!res.ok) return toast.error("Status update failed");
    toast.success("Order status updated");
    await loadData();
  }

  function startEdit(product) {
    setActiveTab("products");
    setEditingSlug(product.slug);
    const images = product.featureImages || product.images || [];
    setForm({
      name: product.name || "",
      slug: product.slug || "",
      category: product.category || "Ayurvedic",
      price: product.price || 0,
      discountPrice: product.discountPrice || 0,
      stock: product.stock || 0,
      isVisible: product.isVisible ?? true,
      description: product.description || "",
      benefits: (product.benefits || []).join(", "),
      ingredients: (product.ingredients || []).join(", "),
      usage: (product.usage || []).join(", "),
      images: images,
      formulaimage: product.formulaimage || "",
      videoUrl: product.videoUrl || "",
      trustQuality: product.trustQuality || {},
      rating: product.rating || 4.5,
      reviewsCount: product.reviewsCount || 0,
      deliveryDays: product.deliveryDays || 5,
    });
    setImageUrlInput(images.join(", "));
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const TABS = [
    { key: "dashboard", label: "Overview", icon: LayoutDashboard },
    { key: "products", label: "Inventory", icon: Package },
    { key: "orders", label: "Transactions", icon: ReceiptText },
    { key: "reviews", label: "Reviews", icon: MessageSquare },
    { key: "inquiries", label: "Inquiries", icon: Phone },
    { key: "users", label: "Customers", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-background w-full pt-20 md:pt-24 lg:pt-32 pb-16 md:pb-20 lg:pb-24">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 grid gap-6 md:gap-8 lg:grid-cols-[240px_1fr]">
        
        {/* SIDEBAR */}
        <motion.aside 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4 md:space-y-6"
        >
          <div className="pt-4 md:pt-6 pb-6 md:pb-8">
            <h1 className="text-2xl md:text-3xl font-display italic text-secondary tracking-[0.01em]">Dashboard</h1>
            <p className="text-xs md:text-sm text-foreground/50 mt-2">Manage your premium store</p>
          </div>
          
          <div className="flex flex-col gap-2">
            {TABS.map((tab) => (
              <button 
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-3 md:gap-4 px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl transition-all duration-300 ${activeTab === tab.key ? "bg-foreground text-background shadow-lg shadow-foreground/10" : "hover:bg-white/50 text-foreground/70"}`}
              >
                <tab.icon size={14} className="md:size-18" /> 
                <span className="text-[11px] md:text-sm uppercase tracking-[0.05em] font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.aside>

        {/* CONTENT */}
        <div className="min-h-[80vh] pt-6">
          <AnimatePresence mode="wait">
            
            {/* DASHBOARD TAB */}
            {activeTab === "dashboard" && (
              <motion.div key="dashboard" {...fadeAnim} className="space-y-8">
                
                {/* Stats */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {[
                    { label: "Total Revenue", value: `₹${totalSales}`, icon: DollarSign, trend: "+12%" },
                    { label: "Total Orders", value: orders.length, icon: Activity, trend: "+5%" },
                    { label: "Avg Order Value", value: `₹${averageOrderValue}`, icon: TrendingUp, trend: "+2%" },
                    { label: "Total Customers", value: users.length, icon: Users, trend: "+18%" }
                  ].map((stat, i) => (
                    <motion.div 
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white/60 backdrop-blur-md border border-foreground/5 rounded-[2rem] p-6 shadow-sm"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="h-10 w-10 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                          <stat.icon size={20} />
                        </div>
                        <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">{stat.trend}</span>
                      </div>
                      <p className="text-sm text-foreground/50 uppercase tracking-normal mb-1">{stat.label}</p>
                      <p className="text-3xl font-light text-foreground">{stat.value}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Charts */}
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="bg-white/60 backdrop-blur-md border border-foreground/5 rounded-[2rem] p-8 shadow-sm">
                    <h3 className="text-xl font-display italic text-secondary mb-6">Revenue Trend</h3>
                    <div className="h-[300px] w-full">
                      {chartsReady && (
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={chartData}>
                            <defs>
                              <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3B5339" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#3B5339" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
                            <XAxis dataKey="index" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} tickFormatter={(v) => `₹${v}`} />
                            <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
                            <Area type="monotone" dataKey="revenue" stroke="#3B5339" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      )}
                    </div>
                  </div>

                  <div className="bg-white/60 backdrop-blur-md border border-foreground/5 rounded-[2rem] p-8 shadow-sm">
                    <h3 className="text-xl font-display italic text-secondary mb-6">Top Products</h3>
                    <div className="h-[300px] w-full">
                      {chartsReady && (
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={topProductsData} layout="vertical" margin={{ left: 50 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e5e5" />
                            <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} />
                            <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#333', fontSize: 12}} width={100} />
                            <Tooltip cursor={{fill: '#f5f5f5'}} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
                            <Bar dataKey="quantity" fill="#E8DD95" radius={[0, 4, 4, 0]} barSize={24} />
                          </BarChart>
                        </ResponsiveContainer>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* PRODUCTS TAB */}
            {activeTab === "products" && (
              <motion.div key="products" {...fadeAnim} className="space-y-8">
                <form onSubmit={saveProduct} className="bg-white/60 backdrop-blur-md border border-foreground/5 rounded-[1.5rem] md:rounded-[2rem] lg:rounded-[2.5rem] p-6 md:p-8 lg:p-10 shadow-sm space-y-6 md:space-y-8">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-display italic text-secondary mb-2">{editingSlug ? "Edit Formulation" : "Add Formulation"}</h2>
                    <p className="text-xs md:text-sm text-foreground/50">Manage your product catalog.</p>
                  </div>
                  
                  <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    <Input label="Name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
                    <Input label="Slug" value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} />
                    <div className="space-y-2">
                      <label className="block text-xs uppercase tracking-[0.05em] text-foreground/70 font-medium">Category</label>
                      <select
                        value={form.category || "Ayurvedic"}
                        onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                        className="w-full h-12 rounded-2xl border border-foreground/10 px-4 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white/50 transition-all"
                      >
                        <option value="Ayurvedic">Ayurvedic</option>
                        <option value="Wellness">Wellness</option>
                        <option value="Supplements">Supplements</option>
                        <option value="Skin Care">Skin Care</option>
                        <option value="Hair Care">Hair Care</option>
                        <option value="Diabetes">Diabetes</option>
                        <option value="Digestive">Digestive</option>
                        <option value="Immunity">Immunity</option>
                      </select>
                    </div>
                    <Input label="Stock Quantity" type="number" value={form.stock} onChange={(e) => setForm((f) => ({ ...f, stock: Number(e.target.value) }))} />
                    <Input label="Regular Price (₹)" type="number" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) }))} />
                    <Input label="Sale Price (₹)" type="number" value={form.discountPrice} onChange={(e) => setForm((f) => ({ ...f, discountPrice: Number(e.target.value) }))} />
                    <Input label="Delivery Days" type="number" value={form.deliveryDays || 5} onChange={(e) => setForm((f) => ({ ...f, deliveryDays: Number(e.target.value) }))} placeholder="e.g., 5" />
                  </div>

                  <div className="space-y-4 md:space-y-6">
                    <textarea className="w-full min-h-[100px] md:min-h-[120px] rounded-xl md:rounded-2xl border border-foreground/10 p-3 md:p-4 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white/50 resize-none transition-all" placeholder="Detailed Description..." value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
                    
                    <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2">
                      <Input label="Benefits (comma separated)" value={form.benefits} onChange={(e) => setForm((f) => ({ ...f, benefits: e.target.value }))} />
                      <Input label="Ingredients (comma separated)" value={form.ingredients} onChange={(e) => setForm((f) => ({ ...f, ingredients: e.target.value }))} />
                      <Input label="Usage Steps (comma separated)" value={form.usage} onChange={(e) => setForm((f) => ({ ...f, usage: e.target.value }))} />
                    </div>

                    {/* Video Upload Section */}
                    <div className="space-y-4">
                      <label className="block text-sm font-medium uppercase tracking-[0.05em] text-foreground/70">Product Video</label>
                      <div className="border-2 border-dashed border-foreground/20 rounded-2xl p-6 text-center hover:border-primary transition-colors">
                        <input
                          type="file"
                          accept="video/*"
                          onChange={async (e) => {
                            const file = e.target.files[0];
                            if (!file) return;
                            
                            setUploading(true);
                            const url = await handleVideoUpload(file);
                            if (url) {
                              setForm((f) => ({ ...f, videoUrl: url }));
                              toast.success("Video uploaded");
                            }
                            setUploading(false);
                          }}
                          className="hidden"
                          id="video-upload"
                        />
                        <label htmlFor="video-upload" className="cursor-pointer">
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-foreground">Click to upload video</p>
                            <p className="text-xs text-foreground/50">MP4, MOV up to 20MB</p>
                          </div>
                        </label>
                      </div>

                      {form.videoUrl && (
                        <div className="relative aspect-video rounded-xl overflow-hidden border border-foreground/10 max-w-sm">
                          <video src={form.videoUrl} className="w-full h-full object-cover" controls />
                          <button
                            type="button"
                            onClick={() => setForm((f) => ({ ...f, videoUrl: "" }))}
                            className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                          >
                            ×
                          </button>
                        </div>
                      )}
                      
                      <Input label="Or Video URL" value={form.videoUrl} onChange={(e) => setForm((f) => ({ ...f, videoUrl: e.target.value }))} />
                    </div>

                    {/* Image Upload Section */}
                    <div className="space-y-4">
                      <label className="block text-sm font-medium uppercase tracking-[0.05em] text-foreground/70">Product Images</label>
                      <div className="border-2 border-dashed border-foreground/20 rounded-2xl p-6 text-center hover:border-primary transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={async (e) => {
                            const files = Array.from(e.target.files);
                            if (files.length === 0) return;
                            
                            setUploading(true);
                            const uploadPromises = files.map(file => handleImageUpload(file));
                            const urls = await Promise.all(uploadPromises);
                            const validUrls = urls.filter(url => url !== null);
                            
                            setForm((f) => ({ 
                              ...f, 
                              images: [...(f.images || []), ...validUrls] 
                            }));
                            setUploading(false);
                            
                            if (validUrls.length > 0) {
                              toast.success(`${validUrls.length} image(s) uploaded`);
                            }
                          }}
                          className="hidden"
                          id="image-upload"
                        />
                        <label htmlFor="image-upload" className="cursor-pointer">
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-foreground">Click to upload images</p>
                            <p className="text-xs text-foreground/50">PNG, JPG up to 10MB (Cloudinary)</p>
                          </div>
                        </label>
                      </div>

                      {/* Image Previews */}
                      {form.images && form.images.length > 0 && (
                        <div className="grid grid-cols-4 gap-4">
                          {form.images.map((img, idx) => (
                            <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-foreground/10">
                              <img src={img} alt={`Product ${idx + 1}`} className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={() => {
                                  setForm((f) => ({
                                    ...f,
                                    images: f.images.filter((_, i) => i !== idx)
                                  }));
                                }}
                                className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Fallback: Image URLs input */}
                      <div>
                        <label className="block text-xs text-foreground/50 mb-2">Or paste image URLs (comma separated)</label>
                        <input
                          type="text"
                          placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                          value={imageUrlInput}
                          onChange={(e) => setImageUrlInput(e.target.value)}
                          onBlur={(e) => {
                            const urls = e.target.value.split(",").map((x) => x.trim()).filter(Boolean);
                            if (urls.length > 0) {
                              setForm((f) => ({ ...f, images: urls }));
                            }
                          }}
                          className="w-full rounded-2xl border border-foreground/10 p-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white/50 transition-all"
                        />
                        <p className="text-xs text-foreground/40 mt-1">URLs will be applied when you click outside this field</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-foreground/5">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <div className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${form.isVisible ? 'bg-primary' : 'bg-foreground/20'}`}>
                        <div className={`w-4 h-4 rounded-full bg-white transition-transform duration-300 ${form.isVisible ? 'translate-x-6' : 'translate-x-0'}`} />
                      </div>
                      <input type="checkbox" className="hidden" checked={form.isVisible} onChange={(e) => setForm((f) => ({ ...f, isVisible: e.target.checked }))} />
                      <span className="text-sm font-medium uppercase tracking-[0.05em] text-foreground/70">Visible in Store</span>
                    </label>

                    <div className="flex gap-4">
                      {editingSlug && (
                        <button type="button" onClick={() => { setEditingSlug(""); setForm(empty); }} className="px-6 py-3 rounded-full text-sm uppercase tracking-[0.05em] font-medium text-foreground/60 hover:bg-foreground/5 transition-colors">
                          Cancel
                        </button>
                      )}
                      <button type="submit" className="px-8 py-3 rounded-full bg-foreground text-background text-sm uppercase tracking-[0.05em] font-medium hover:bg-secondary transition-colors shadow-lg">
                        {editingSlug ? "Save Changes" : "Create Product"}
                      </button>
                    </div>
                  </div>
                </form>

                <div className="bg-white/60 backdrop-blur-md border border-foreground/5 rounded-[2.5rem] overflow-hidden shadow-sm">
                  <table className="w-full text-left">
                    <thead className="bg-foreground/5 text-xs uppercase tracking-normal text-foreground/50">
                      <tr>
                        <th className="px-8 py-6 font-medium">Product</th>
                        <th className="px-8 py-6 font-medium">Status</th>
                        <th className="px-8 py-6 font-medium">Price</th>
                        <th className="px-8 py-6 font-medium">MRP</th>
                        <th className="px-8 py-6 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-foreground/5">
                      {products.map((p) => (
                        <tr key={p._id} className="hover:bg-white/40 transition-colors">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              {p.featureImages?.[0] && (
                                <img src={p.featureImages[0]} alt={p.name} className="w-12 h-12 rounded-lg object-cover" />
                              )}
                              <div>
                                <p className="font-medium text-foreground">{p.name}</p>
                                <p className="text-xs text-foreground/50">{p.category}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <span className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.05em] font-bold ${p.isVisible ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                              {p.isVisible ? "Active" : "Hidden"}
                            </span>
                          </td>
                          <td className="px-8 py-6 font-light">₹{p.discountPrice || p.price}</td>
                          <td className="px-8 py-6 font-light text-foreground/50 line-through">₹{p.price}</td>
                          <td className="px-8 py-6">
                            <div className="flex justify-end gap-3">
                              <button onClick={() => startEdit(p)} className="text-xs uppercase tracking-[0.05em] font-medium text-accent hover:text-secondary transition-colors">Edit</button>
                              <button onClick={() => toggleVisibility(p)} className="text-xs uppercase tracking-[0.05em] font-medium text-foreground/50 hover:text-foreground transition-colors">{p.isVisible ? "Hide" : "Show"}</button>
                              <button onClick={() => deleteProduct(p.slug)} className="text-xs uppercase tracking-[0.05em] font-medium text-red-400 hover:text-red-600 transition-colors">Delete</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* ORDERS TAB */}
            {activeTab === "orders" && (
              <motion.div key="orders" {...fadeAnim} className="space-y-8">
                <div className="bg-white/60 backdrop-blur-md border border-foreground/5 rounded-[2.5rem] overflow-hidden shadow-sm">
                  <div className="p-8 border-b border-foreground/5">
                    <h2 className="text-3xl font-display italic text-secondary">Recent Transactions</h2>
                  </div>
                  <table className="w-full text-left">
                    <thead className="bg-foreground/5 text-xs uppercase tracking-normal text-foreground/50">
                      <tr>
                        <th className="px-8 py-6 font-medium">Customer</th>
                        <th className="px-8 py-6 font-medium">Method</th>
                        <th className="px-8 py-6 font-medium">Amount</th>
                        <th className="px-8 py-6 font-medium">Status</th>
                        <th className="px-8 py-6 font-medium text-right">Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-foreground/5">
                      {orders.map((o) => (
                        <tr key={o._id} className="hover:bg-white/40 transition-colors">
                          <td className="px-8 py-6">
                            <p className="font-medium text-foreground">{o.user?.name || "Guest"}</p>
                            <p className="text-xs text-foreground/50">{o.address?.phone || o.user?.phone || "-"}</p>
                          </td>
                          <td className="px-8 py-6">
                            <span className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.05em] font-bold ${o.paymentMethod === 'cod' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                              {o.paymentMethod || "Online"}
                            </span>
                          </td>
                          <td className="px-8 py-6 font-light">₹{o.amount}</td>
                          <td className="px-8 py-6">
                            <select
                              value={o.status}
                              onChange={(e) => updateOrderStatus(o._id, e.target.value)}
                              className="bg-transparent border border-foreground/20 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.05em] focus:outline-none focus:border-accent cursor-pointer hover:bg-white/50 transition-colors"
                            >
                              {["placed", "processing", "shipped", "delivered", "cancelled"].map((status) => (
                                <option key={status} value={status}>{status}</option>
                              ))}
                            </select>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <Link href={`/admin/orders/${o._id}`} className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.05em] font-medium text-accent hover:text-secondary transition-colors">
                              View <ArrowUpRight size={14} />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* REVIEWS TAB */}
            {activeTab === "reviews" && (
              <motion.div key="reviews" {...fadeAnim} className="space-y-8">
                <div className="bg-white/60 backdrop-blur-md border border-foreground/5 rounded-[2.5rem] overflow-hidden shadow-sm">
                  <div className="p-8 border-b border-foreground/5">
                    <h2 className="text-3xl font-display italic text-secondary tracking-[0.01em]">Manage Reviews</h2>
                  </div>
                  <table className="w-full text-left">
                    <thead className="bg-foreground/5 text-xs uppercase tracking-[0.05em] text-foreground/50">
                      <tr>
                        <th className="px-8 py-6 font-medium">Product</th>
                        <th className="px-8 py-6 font-medium">Customer</th>
                        <th className="px-8 py-6 font-medium">Rating</th>
                        <th className="px-8 py-6 font-medium">Review</th>
                        <th className="px-8 py-6 font-medium">Status</th>
                        <th className="px-8 py-6 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-foreground/5">
                      {products.flatMap(p => 
                        (p.reviews || []).map((review, idx) => (
                          <tr key={`${p._id}-${review._id || idx}`} className="hover:bg-white/40 transition-colors">
                            <td className="px-8 py-6">
                              <p className="font-medium text-foreground">{p.name}</p>
                            </td>
                            <td className="px-8 py-6">
                              <p className="font-medium text-foreground">{review.name}</p>
                              <p className="text-xs text-foreground/50">{new Date(review.createdAt || Date.now()).toLocaleDateString()}</p>
                            </td>
                            <td className="px-8 py-6">
                              <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <span key={i} className={i < review.rating ? "text-amber-500" : "text-gray-300"}>★</span>
                                ))}
                              </div>
                            </td>
                            <td className="px-8 py-6 max-w-xs">
                              <p className="text-sm text-foreground/70 line-clamp-2">{review.comment}</p>
                            </td>
                            <td className="px-8 py-6">
                              <span className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.05em] font-bold ${review.approved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                {review.approved ? 'Approved' : 'Pending'}
                              </span>
                            </td>
                            <td className="px-8 py-6">
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() => approveReview(p._id, review._id || idx, !review.approved)}
                                  className="p-2 rounded-lg hover:bg-green-100 text-green-600 transition-colors"
                                  title={review.approved ? "Unapprove" : "Approve"}
                                >
                                  {review.approved ? <X size={16} /> : <Check size={16} />}
                                </button>
                                <button
                                  onClick={() => deleteReview(p._id, review._id || idx)}
                                  className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* INQUIRIES TAB */}
            {activeTab === "inquiries" && (
              <motion.div key="inquiries" {...fadeAnim} className="space-y-8">
                <div className="bg-white/60 backdrop-blur-md border border-foreground/5 rounded-[2.5rem] overflow-hidden shadow-sm">
                  <div className="p-8 border-b border-foreground/5">
                    <h2 className="text-3xl font-display italic text-secondary tracking-[0.01em]">Inquiries & Consultations</h2>
                  </div>
                  <table className="w-full text-left">
                    <thead className="bg-foreground/5 text-xs uppercase tracking-[0.05em] text-foreground/50">
                      <tr>
                        <th className="px-8 py-6 font-medium">Customer</th>
                        <th className="px-8 py-6 font-medium">Type</th>
                        <th className="px-8 py-6 font-medium">Product/Msg</th>
                        <th className="px-8 py-6 font-medium">Date</th>
                        <th className="px-8 py-6 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-foreground/5">
                      {inquiries.map((inq) => (
                        <tr key={inq._id} className="hover:bg-white/40 transition-colors">
                          <td className="px-8 py-6">
                            <p className="font-medium text-foreground">{inq.name}</p>
                            <p className="text-sm text-accent font-bold">{inq.phone}</p>
                          </td>
                          <td className="px-8 py-6">
                            <span className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.05em] font-bold ${inq.type === 'consultation' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                              {inq.type}
                            </span>
                          </td>
                          <td className="px-8 py-6 max-w-xs">
                            <p className="text-sm text-foreground/70 line-clamp-2">
                              {inq.productSlug ? `Product: ${inq.productSlug}` : inq.message || "Consultation Request"}
                            </p>
                          </td>
                          <td className="px-8 py-6">
                            <p className="text-xs text-foreground/50">{new Date(inq.createdAt).toLocaleDateString()}</p>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <a href={`tel:${inq.phone}`} className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.05em] font-medium text-accent hover:text-secondary transition-colors">
                              Call Now <Phone size={14} />
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* USERS TAB */}
            {activeTab === "users" && (
              <motion.div key="users" {...fadeAnim} className="space-y-8">
                <div className="bg-white/60 backdrop-blur-md border border-foreground/5 rounded-[2.5rem] overflow-hidden shadow-sm">
                  <div className="p-8 border-b border-foreground/5">
                    <h2 className="text-3xl font-display italic text-secondary tracking-[0.01em]">Customer Directory</h2>
                  </div>
                  <table className="w-full text-left">
                    <thead className="bg-foreground/5 text-xs uppercase tracking-[0.05em] text-foreground/50">
                      <tr>
                        <th className="px-8 py-6 font-medium">Customer</th>
                        <th className="px-8 py-6 font-medium">Contact</th>
                        <th className="px-8 py-6 font-medium">Role</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-foreground/5">
                      {users.map((u) => (
                        <tr key={u._id} className="hover:bg-white/40 transition-colors">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-foreground/5 flex items-center justify-center text-sm font-medium">
                                {u.name?.charAt(0) || "U"}
                              </div>
                              <p className="font-medium text-foreground">{u.name}</p>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <p className="text-sm">{u.email}</p>
                            <p className="text-xs text-foreground/50">{u.phone || "No phone"}</p>
                          </td>
                          <td className="px-8 py-6">
                            <span className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.05em] font-bold ${u.role === 'admin' ? 'bg-accent/20 text-accent' : 'bg-foreground/5 text-foreground/60'}`}>
                              {u.role}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* ANALYTICS TAB */}
            {activeTab === "analytics" && (
              <motion.div key="analytics" {...fadeAnim} className="space-y-8">
                <div className="bg-white/60 backdrop-blur-md border border-foreground/5 rounded-[2.5rem] p-8 shadow-sm">
                  <h2 className="text-3xl font-display italic text-secondary tracking-[0.01em] mb-8">Analytics Overview</h2>
                  <div className="grid gap-6 lg:grid-cols-2">
                    <div className="bg-muted/30 rounded-2xl p-6 space-y-4">
                      <h3 className="text-lg font-light tracking-[0.01em]">Sales Trend</h3>
                      {chartsReady && (
                        <ResponsiveContainer width="100%" height={200}>
                          <AreaChart data={chartData}>
                            <defs>
                              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#7a8f7a" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#7a8f7a" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e6dfd3" />
                            <XAxis dataKey="index" stroke="#2b2b2b" fontSize={12} />
                            <YAxis stroke="#2b2b2b" fontSize={12} />
                            <Tooltip />
                            <Area type="monotone" dataKey="revenue" stroke="#7a8f7a" fillOpacity={1} fill="url(#colorRevenue)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      )}
                    </div>
                    <div className="bg-muted/30 rounded-2xl p-6 space-y-4">
                      <h3 className="text-lg font-light tracking-[0.01em]">Payment Methods</h3>
                      {chartsReady && (
                        <ResponsiveContainer width="100%" height={200}>
                          <PieChart>
                            <Pie data={paymentData} cx="50%" cy="50%" outerRadius={60} dataKey="value">
                              {paymentData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      )}
                    </div>
                    <div className="bg-muted/30 rounded-2xl p-6 space-y-4 lg:col-span-2">
                      <h3 className="text-lg font-light tracking-[0.01em]">Top Products</h3>
                      {chartsReady && (
                        <ResponsiveContainer width="100%" height={200}>
                          <BarChart data={topProducts}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e6dfd3" />
                            <XAxis dataKey="name" stroke="#2b2b2b" fontSize={12} />
                            <YAxis stroke="#2b2b2b" fontSize={12} />
                            <Tooltip />
                            <Bar dataKey="quantity" fill="#7a8f7a" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === "settings" && (
              <motion.div key="settings" {...fadeAnim} className="space-y-8">
                <div className="bg-white/60 backdrop-blur-md border border-foreground/5 rounded-[2.5rem] p-8 shadow-sm">
                  <h2 className="text-3xl font-display italic text-secondary tracking-[0.01em] mb-8">Settings</h2>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-6 bg-muted/30 rounded-2xl">
                      <div>
                        <h3 className="text-lg font-medium tracking-[0.01em]">Store Status</h3>
                        <p className="text-sm text-foreground/50">Enable or disable the store for maintenance</p>
                      </div>
                      <button className="px-6 py-3 rounded-full bg-accent text-background font-light uppercase tracking-[0.05em] text-xs hover:bg-accent/90 transition-colors">
                        Active
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-6 bg-muted/30 rounded-2xl">
                      <div>
                        <h3 className="text-lg font-medium tracking-[0.01em]">Email Notifications</h3>
                        <p className="text-sm text-foreground/50">Receive order notifications</p>
                      </div>
                      <button className="px-6 py-3 rounded-full bg-foreground text-background font-light uppercase tracking-[0.05em] text-xs hover:bg-secondary transition-colors">
                        Enabled
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-6 bg-muted/30 rounded-2xl">
                      <div>
                        <h3 className="text-lg font-medium tracking-[0.01em]">Low Stock Alert</h3>
                        <p className="text-sm text-foreground/50">Alert when products have low stock</p>
                      </div>
                      <button className="px-6 py-3 rounded-full bg-foreground text-background font-light uppercase tracking-[0.05em] text-xs hover:bg-secondary transition-colors">
                        Enabled
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}