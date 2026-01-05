"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, Sparkles, Navigation, CheckCircle, Car } from "lucide-react";
import { Map, MapControls } from "@/components/ui/map";

export default function Contact() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Replace these with your actual business details
  const businessInfo = {
    name: "JN Parts & Accessories",
    address: "Kirinyaga road, Nairobi, Kenya", // Replace with your actual address
    phone: "+254 741 509 156", // Replace with your actual phone
    email: "jncarparts301@gmail.com", // Replace with your actual email
    hours: "Mon-Fri: 8AM-6PM, Sat: 9AM-5PM", // Replace with your actual hours
    coordinates: {
      lat: -1.281939, // Replace with your actual latitude
      lng: 36.830821  // Replace with your actual longitude
    }
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

     // Basic validation
    if (!data.name || !data.email || !data.message) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setSubmitting(true);
      
      // Send email using Web3Forms (free email service)
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          subject: `New Quote Request from ${data.name}`,
          from_name: "JN Parts Website",
          to_email: "jncarparts301@gmail.com",
          name: data.name,
          email: data.email,
          phone: data.phone,
          vehicle_model: data.vehicle_model,
          message: data.message,
        })
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
      console.error(err);
      setError("Failed to send message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const openInGoogleMaps = () => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${businessInfo.coordinates.lat},${businessInfo.coordinates.lng}`, '_blank');
  };

  return (
    <section id="contact" className="relative py-20 bg-gradient-to-b from-black via-zinc-900 to-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] animate-pulse delay-1s" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-4">
            <MapPin className="w-4 h-4 text-red-500" />
            <span className="text-sm font-semibold text-red-400">Get In Touch</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              Visit Our Location
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Come see our premium collection or reach out online. We&apos;re here to help transform your ride.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-red-500/30 transition-all duration-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-500/10 rounded-lg">
                  <Send className="w-5 h-5 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold text-white">Request a Quote</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
                      placeholder="+254 700 000000"
                    />
                  </div>

                  <div>
                    <label htmlFor="vehicle_model" className="block text-sm font-medium text-gray-300 mb-2">
                      Vehicle Model
                    </label>
                    <input
                      type="text"
                      id="vehicle_model"
                      name="vehicle_model"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
                      placeholder="e.g., Toyota Camry 2020"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Tell us about your project *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all resize-none"
                    placeholder="What parts or services are you looking for? Any specific requirements?"
                  />
                </div>

                {error && (
                  <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 flex items-start gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 animate-pulse" />
                    <p className="text-red-300 text-sm">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-orange-500 rounded-xl transition-all duration-300 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-xl" />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                  
                  <span className="relative z-10 flex items-center justify-center gap-2 px-6 py-4 font-bold tracking-wide">
                    {submitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending Request...
                      </>
                    ) : (
                      <>
                       
                        Request Free Quote
                       
                      </>
                    )}
                  </span>
                </button>
              </form>
            </div>
          </div>

          {/* Map & Info */}
          <div className="space-y-6">
            {/* Google Map */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-red-500/30 transition-all duration-500">
                <div className="relative h-[400px] w-full">
                  <Map 
                    center={[businessInfo.coordinates.lng, businessInfo.coordinates.lat]} 
                    zoom={14}
                  >
                    <MapControls />
                  </Map>
                  
                  <button
                    onClick={openInGoogleMaps}
                    className="absolute bottom-4 right-4 group/btn z-20"
                    aria-label="Open location in Google Maps"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-500 rounded-xl blur-lg opacity-75" />
                      <div className="relative flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-600 to-orange-500 rounded-xl font-semibold text-sm hover:scale-105 transition-transform duration-300">
                        <Navigation className="w-4 h-4" />
                        Open in Maps
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Info Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-red-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-red-500/30 transition-all duration-500">
                  <MapPin className="w-8 h-8 text-red-500 mb-3" />
                  <h4 className="font-bold text-white mb-2">Address</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{businessInfo.address}</p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-red-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-red-500/30 transition-all duration-500">
                  <Phone className="w-8 h-8 text-red-500 mb-3" />
                  <h4 className="font-bold text-white mb-2">Phone</h4>
                  <a href={`tel:${businessInfo.phone}`} className="text-gray-400 text-sm hover:text-red-400 transition-colors">
                    {businessInfo.phone}
                  </a>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-red-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-red-500/30 transition-all duration-500">
                  <Mail className="w-8 h-8 text-red-500 mb-3" />
                  <h4 className="font-bold text-white mb-2">Email</h4>
                  <a href={`mailto:${businessInfo.email}`} className="text-gray-400 text-sm hover:text-red-400 transition-colors break-all">
                    {businessInfo.email}
                  </a>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-red-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-red-500/30 transition-all duration-500">
                  <Clock className="w-8 h-8 text-red-500 mb-3" />
                  <h4 className="font-bold text-white mb-2">Business Hours</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{businessInfo.hours}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-24 right-4 z-50 animate-in slide-in-from-right">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl blur-xl opacity-75" />
            <div className="relative bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
              <CheckCircle className="w-6 h-6" />
              <div>
                <p className="font-bold">Message Sent Successfully!</p>
                <p className="text-sm text-emerald-100">We&apos;ll get back to you soon.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}