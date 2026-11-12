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
    email: "jncarparts1@gmail.com",
    hours: "Mon-Fri: 8AM-6PM, Sat: 9AM-5PM",
    coordinates: { lat: -1.281939, lng: 36.830821 },
  };

  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function sanitizeField(value: FormDataEntryValue | null, maxLength: number) {
    return String(value ?? "").trim().slice(0, maxLength);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot: bots often fill hidden fields.
    if (sanitizeField(formData.get("website"), 200)) return;

    const data = {
      name: sanitizeField(formData.get("name"), 120),
      email: sanitizeField(formData.get("email"), 254),
      phone: sanitizeField(formData.get("phone"), 30),
      vehicle_model: sanitizeField(formData.get("vehicle_model"), 120),
      message: sanitizeField(formData.get("message"), 2000),
    };

    if (!data.name || !data.email || !data.message) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!EMAIL_PATTERN.test(data.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setError("Contact form is not configured. Please call or email us directly.");
      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New Quote Request from ${data.name}`,
          from_name: "JN Parts Website",
          to_email: "jncarparts1@gmail.com",
          ...data,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setShowSuccess(true);
        form.reset();
        window.setTimeout(() => setShowSuccess(false), 5000);
      } else {
        throw new Error(result.message || "Failed to send message");
      }
    } catch {
      setError("Failed to send message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const openInGoogleMaps = () => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${businessInfo.coordinates.lat},${businessInfo.coordinates.lng}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const inputClasses = (fieldName: string) =>
    `w-full rounded-lg border bg-[#08090B] px-4 py-4 text-sm text-[#F7F8FD] placeholder:text-[#777D86] outline-none transition-all duration-200 ${
      focusedField === fieldName
        ? "border-[#FF1616] ring-2 ring-[#FF1616]/15"
        : "border-[#34373D] hover:border-[#555B64]"
    }`;

  const contactItems = [
    {
      icon: MapPin,
      label: "Visit our showroom",
      value: businessInfo.address,
      href: null,
    },
    {
      icon: PhoneCall,
      label: "Call us",
      value: businessInfo.phone,
      href: `tel:${businessInfo.phone.replace(/\s/g, "")}`,
    },
    {
      icon: Mail,
      label: "Email",
      value: businessInfo.email,
      href: `mailto:${businessInfo.email}`,
    },
    {
      icon: Clock,
      label: "Business hours",
      value: businessInfo.hours,
      href: null,
    },
  ];

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#08090B] py-24 text-[#F7F8FD] sm:py-28"
    >
      {/* Restrained background detail */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,22,22,0.055),transparent_48%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mx-auto mb-14 max-w-3xl text-center md:mb-16">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#FF1616]" />
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#FF1616] sm:text-xs">
              Get in touch
            </p>
            <span className="h-px w-8 bg-[#FF1616]" />
          </div>

          <h2 className="text-4xl font-extrabold tracking-[-0.045em] text-[#F7F8FD] sm:text-5xl md:text-6xl">
            Let&apos;s get your{" "}
            <span className="text-[#FF1616]">vehicle</span> sorted.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#A5A8AE] sm:text-base">
            Visit our Nairobi showroom or tell us what you need. Whether it&apos;s
            an upgrade, protection or an accessory, our team is ready to help.
          </p>
        </div>

        <div className="grid gap-7 lg:grid-cols-12 lg:gap-8">
          {/* Contact details and map */}
          <div className="space-y-5 lg:col-span-5">
            {/* Map */}
            <div className="group relative h-[290px] overflow-hidden rounded-xl border border-[#34373D] bg-[#15171B] sm:h-[340px]">
              <Map
                center={[
                  businessInfo.coordinates.lng,
                  businessInfo.coordinates.lat,
                ]}
                zoom={14}
              >
                <MapControls />
              </Map>

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#08090B]/65 via-transparent to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/65">
                    Find us
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    Kirinyaga Road, Nairobi
                  </p>
                </div>

                <button
                  type="button"
                  onClick={openInGoogleMaps}
                  className="inline-flex shrink-0 items-center gap-2 border border-white/20 bg-[#08090B]/90 px-4 py-3 text-xs font-bold text-white backdrop-blur-md transition-colors hover:border-[#FF1616] hover:bg-[#FF1616]"
                >
                  <Navigation className="h-4 w-4" />
                  Directions
                </button>
              </div>
            </div>

            {/* Contact information */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {contactItems.map((item) => (
                <div
                  key={item.label}
                  className="group min-h-[132px] rounded-xl border border-[#34373D] bg-[#15171B] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#FF1616]/60 hover:bg-[#191C21]"
                >
                  <div className="mb-5 flex h-9 w-9 items-center justify-center border border-[#FF1616]/25 bg-[#FF1616]/[0.07]">
                    <item.icon className="h-4 w-4 text-[#FF1616]" />
                  </div>

                  <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#858B94]">
                    {item.label}
                  </p>

                  {item.href ? (
                    <a
                      href={item.href}
                      className="break-words text-sm leading-6 text-[#F7F8FD] transition-colors hover:text-[#FF1616]"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm leading-6 text-[#F7F8FD]">
                      {item.value}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Enquiry form */}
          <div className="lg:col-span-7">
            <div className="relative h-full overflow-hidden rounded-xl border border-[#34373D] bg-[#15171B] p-6 sm:p-8 lg:p-10">
              <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-[#FF1616]/[0.045] blur-3xl" />

              <div className="relative">
                <div className="mb-8 flex items-start gap-4 border-b border-[#34373D] pb-7">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#FF1616]/30 bg-[#FF1616]/10">
                    <Send className="h-5 w-5 text-[#FF1616]" />
                  </div>

                  <div>
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF1616]">
                      Start a conversation
                    </p>
                    <h3 className="text-2xl font-bold tracking-tight text-[#F7F8FD]">
                      Request a free quote
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[#A5A8AE]">
                      Share a few details and we&apos;ll help you find the right
                      solution for your vehicle.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Honeypot field */}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="pointer-events-none absolute left-[-9999px] h-0 w-0 opacity-0"
                  />

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-[#A5A8AE]"
                      >
                        Full name <span className="text-[#FF1616]">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        maxLength={120}
                        autoComplete="name"
                        placeholder="Your full name"
                        className={inputClasses("name")}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-[#A5A8AE]"
                      >
                        Email address <span className="text-[#FF1616]">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        maxLength={254}
                        autoComplete="email"
                        placeholder="you@example.com"
                        className={inputClasses("email")}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-[#A5A8AE]"
                      >
                        Phone number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        maxLength={30}
                        autoComplete="tel"
                        placeholder="+254 ..."
                        className={inputClasses("phone")}
                        onFocus={() => setFocusedField("phone")}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="vehicle_model"
                        className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-[#A5A8AE]"
                      >
                        Vehicle model
                      </label>
                      <input
                        type="text"
                        id="vehicle_model"
                        name="vehicle_model"
                        maxLength={120}
                        placeholder="e.g. Toyota Harrier"
                        className={inputClasses("vehicle")}
                        onFocus={() => setFocusedField("vehicle")}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-[#A5A8AE]"
                    >
                      How can we help?{" "}
                      <span className="text-[#FF1616]">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      maxLength={2000}
                      rows={5}
                      placeholder="Tell us about the parts, accessories or services you're looking for..."
                      className={`${inputClasses("message")} min-h-[145px] resize-y leading-6`}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>

                  {error && (
                    <div
                      role="alert"
                      className="border border-[#FF1616]/35 bg-[#FF1616]/[0.07] px-4 py-3 text-sm text-[#F7F8FD]"
                    >
                      <span className="mr-2 text-[#FF1616]">!</span>
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="group flex w-full items-center justify-center gap-3 bg-[#FF1616] px-6 py-4 text-xs font-bold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-[#D90F0F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF1616] focus-visible:ring-offset-2 focus-visible:ring-offset-[#15171B] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Sending enquiry...
                      </>
                    ) : (
                      <>
                        Send enquiry
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs leading-5 text-[#858B94]">
                    We typically respond within 24 hours on business days.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success notification */}
      {showSuccess && (
        <div
          role="status"
          aria-live="polite"
          className="fixed right-4 top-6 z-50 flex max-w-sm items-center gap-3 border border-[#34373D] bg-[#15171B] px-5 py-4 shadow-2xl"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#FF1616]/25 bg-[#FF1616]/10">
            <CheckCircle className="h-5 w-5 text-[#FF1616]" />
          </div>
          <div>
            <p className="text-sm font-bold text-[#F7F8FD]">Enquiry received</p>
            <p className="mt-0.5 text-xs text-[#A5A8AE]">
              Thank you. We&apos;ll be in touch shortly.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
