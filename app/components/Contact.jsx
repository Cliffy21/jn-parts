"use client";

import { useState } from "react";

export default function Contact() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    const form = e.target;
    const data = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      vehicle_model: form.vehicle_model.value,
      message: form.message.value,
    };

    const base = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!base) {
      setError("Backend API not configured.");
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch(`${base}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to send message");
      setShowSuccess(true);
      form.reset();
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      setError("Failed to send message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      id="contact"
      className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black"
    >
      <div className="max-w-4xl mx-auto">
        {/* ... the contact info cards stay the same ... */}

        <form
          onSubmit={handleSubmit}
          className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-white/10"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="name"
              type="text"
              required
              placeholder="Your Name"
              className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-sm"
            />
            <input
              name="email"
              type="email"
              required
              placeholder="Email Address"
              className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-sm"
            />
            <input
              name="phone"
              type="tel"
              required
              placeholder="Phone Number"
              className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-sm"
            />
            <input
              name="vehicle_model"
              type="text"
              placeholder="Vehicle Model"
              className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-sm"
            />
          </div>
          <textarea
            name="message"
            rows={4}
            placeholder="Tell us about your project..."
            className="w-full mt-6 bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-sm resize-none"
            required
          />
          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-6 bg-gradient-to-r from-red-500 to-orange-500 py-3 rounded-lg font-bold text-lg hover:scale-105 glow-red disabled:opacity-60"
          >
            {submitting ? "Sending..." : "Request Free Quote"}
          </button>
          {error && (
            <p className="mt-3 text-sm text-red-400 text-center">{error}</p>
          )}
        </form>

        {showSuccess && (
          <div className="fixed top-24 right-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-3 rounded-lg shadow-lg">
            Message sent successfully!
          </div>
        )}
      </div>
    </section>
  );
}
