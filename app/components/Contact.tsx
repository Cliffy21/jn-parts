"use client";

import { useState } from "react";
import {
  MapPin,
  Mail,
  Clock,
  Send,
  Navigation,
  CheckCircle,
  ArrowRight,
  PhoneCall,
} from "lucide-react";
import { Map, MapControls } from "@/components/ui/map";

export default function Contact() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const businessInfo = {
    name: "JN Parts & Accessories",
    address: "Kirinyaga Road, Nairobi, Kenya",
    phone: "+254 741 509 156",
    email: "jncarparts301@gmail.com",
    hours: "Mon-Fri: 8AM-6PM, Sat: 9AM-5PM",
    coordinates: { lat: -1.281939, lng: 36.830821 },
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      vehicle_model: formData.get("vehicle_model") as string,
      message: formData.get("message") as string,
    };

    if (!data.name || !data.email || !data.message) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setSubmitting(true);
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          subject: `New Quote Request from ${data.name}`,
          from_name: "JN Parts Website",
          to_email: "jncarparts301@gmail.com",
          ...data,
        }),
      });
      const result = await response.json();
      if (result.success) {
        setShowSuccess(true);
        form.reset();
        setTimeout(() => setShowSuccess(false), 5000);
      } else {
        throw new Error(result.message || "Failed to send message");
      }
    } catch (err) {
      setError("Failed to send message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const openInGoogleMaps = () => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${businessInfo.coordinates.lat},${businessInfo.coordinates.lng}`,
      "_blank"
    );
  };

  const inputClasses = (fieldName: string) =>
    `w-full px-4 py-3.5 bg-zinc-950/60 border border-zinc-800 rounded-xl text-white text-[15px] placeholder:text-zinc-500 transition-all duration-300 outline-none ${
      focusedField === fieldName
        ? "border-red-500/50 bg-zinc-900/80 shadow-[0_0_0_3px_rgba(239,68,68,0.12)]"
        : "hover:border-zinc-700"
    }`;

  return (
    <section id="contact" className="relative bg-zinc-950 py-20 md:py-28">
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
 
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Request a <span className="text-red-500">Free Quote</span>
          </h2>
          <p className="text-zinc-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Visit our Nairobi showroom or send us your requirements. We&apos;ll get back to you within 24 hours.
          </p>
        </div>

        {/* NEW LAYOUT: Stacked on mobile, side-by-side on desktop but reversed */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* LEFT COLUMN: Contact Info & Map (takes 5/12 on desktop) */}
          <div className="lg:col-span-5 space-y-6 order-2 lg:order-1">
            {/* Map */}
            <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/30 h-[300px] sm:h-[350px] lg:h-[320px]">
              <Map center={[businessInfo.coordinates.lng, businessInfo.coordinates.lat]} zoom={14}>
                <MapControls />
              </Map>
              <button
                onClick={openInGoogleMaps}
                className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2.5 bg-zinc-950/90 backdrop-blur-sm border border-zinc-700 rounded-lg text-sm font-medium text-white hover:border-red-500/50 hover:text-red-400 transition-all duration-300 group"
              >
                <Navigation className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                Open in Maps
              </button>
            </div>

            {/* Info Cards - 2x2 Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[
                { icon: MapPin, label: "Address", value: businessInfo.address, href: null },
                { icon: PhoneCall, label: "Phone", value: businessInfo.phone, href: `tel:${businessInfo.phone}` },
                { icon: Mail, label: "Email", value: businessInfo.email, href: `mailto:${businessInfo.email}` },
                { icon: Clock, label: "Hours", value: businessInfo.hours, href: null },
              ].map((item) => (
                <div
                  key={item.label}
                  className="group p-4 sm:p-5 rounded-xl bg-zinc-900/40 border border-zinc-800/60 hover:border-zinc-700 hover:bg-zinc-900/60 transition-all duration-300"
                >
                  <item.icon className="w-5 h-5 text-zinc-500 group-hover:text-red-500 transition-colors mb-3" />
                  <p className="text-xs text-zinc-500 uppercase tracking-wider font-medium mb-1">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm text-zinc-300 hover:text-red-400 transition-colors break-all leading-snug"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm text-zinc-300 leading-snug">{item.value}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Form (takes 7/12 on desktop) */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative rounded-2xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-sm p-6 sm:p-8 lg:p-10 shadow-xl shadow-black/20 overflow-hidden">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-red-500/[0.04] via-transparent to-orange-500/[0.05]" />
              <div className="relative">
              <div className="flex items-start gap-3 mb-8 pb-6 border-b border-zinc-800/80">
                <div className="p-2.5 bg-red-500/10 rounded-xl ring-1 ring-red-500/20">
                  <Send className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">Send Enquiry</h3>
                  <p className="text-sm text-zinc-400 mt-0.5">Fill in your details below — we&apos;ll reply as soon as we can.</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Row 1: Name & Email */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="Full Name"
                      className={inputClasses("name")}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="Email Address"
                      className={inputClasses("email")}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                </div>

                {/* Row 2: Phone & Vehicle */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      placeholder="Phone Number"
                      className={inputClasses("phone")}
                      onFocus={() => setFocusedField("phone")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      id="vehicle_model"
                      name="vehicle_model"
                      placeholder="Vehicle Model (Optional)"
                      className={inputClasses("vehicle")}
                      onFocus={() => setFocusedField("vehicle")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us what parts or services you need..."
                    className={`${inputClasses("message")} resize-y min-h-[140px] leading-relaxed`}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>

                {/* Error */}
                {error && (
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-red-950/30 border border-red-900/50 text-red-300 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full group relative flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-red-600 via-red-500 to-orange-500 shadow-lg shadow-red-900/30 ring-1 ring-white/10 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/25 hover:brightness-[1.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 active:scale-[0.99] disabled:opacity-55 disabled:cursor-not-allowed disabled:hover:brightness-100 disabled:hover:shadow-lg"
                >
                  {submitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin shrink-0" />
                      Processing…
                    </>
                  ) : (
                    <>
                      Request Free Quote
                      <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-0.5 transition-transform duration-300" />
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-zinc-500 leading-relaxed">
                  We typically respond within 24 hours on business days.
                </p>
              </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-6 right-4 z-50 animate-in slide-in-from-right-full fade-in duration-300">
          <div className="flex items-center gap-3 px-5 py-4 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl">
            <div className="p-1 bg-emerald-500/10 rounded-full">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Message Sent!</p>
              <p className="text-xs text-zinc-400">We&apos;ll be in touch shortly.</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}