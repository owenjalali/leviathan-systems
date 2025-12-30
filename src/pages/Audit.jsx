import { createPortal } from "react-dom";
import {
  ArrowRight,
  Check,
  AlertCircle,
  ChevronDown,
  TrendingDown,
  Shield,
} from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { useState, useEffect, useRef, useCallback } from "react";

const industries = [
  "Home Services",
  "Agency / Marketing",
  "Healthcare / Clinic",
  "Professional Services",
  "Real Estate",
  "Other",
];

const volumes = ["Less than 500", "500 – 2,000", "2,000 – 10,000", "10,000+"];

const channels = ["Inbound calls", "Web chat", "SMS", "Contact forms", "Other"];

const painPoints = [
  "Missed calls / slow response",
  "Scheduling bottlenecks",
  "Follow-up falling through",
  "CRM out of sync",
  "Lead qualification",
  "Something else",
];

const countries = [
  { code: "US", name: "United States", dial: "+1", flag: "🇺🇸" },
  { code: "CA", name: "Canada", dial: "+1", flag: "🇨🇦" },
  { code: "GB", name: "United Kingdom", dial: "+44", flag: "🇬🇧" },
  { code: "AU", name: "Australia", dial: "+61", flag: "🇦🇺" },
  { code: "DE", name: "Germany", dial: "+49", flag: "🇩🇪" },
  { code: "FR", name: "France", dial: "+33", flag: "🇫🇷" },
  { code: "NL", name: "Netherlands", dial: "+31", flag: "🇳🇱" },
  { code: "IE", name: "Ireland", dial: "+353", flag: "🇮🇪" },
  { code: "NZ", name: "New Zealand", dial: "+64", flag: "🇳🇿" },
  { code: "SG", name: "Singapore", dial: "+65", flag: "🇸🇬" },
  { code: "AE", name: "UAE", dial: "+971", flag: "🇦🇪" },
  { code: "IN", name: "India", dial: "+91", flag: "🇮🇳" },
  { code: "MX", name: "Mexico", dial: "+52", flag: "🇲🇽" },
  { code: "BR", name: "Brazil", dial: "+55", flag: "🇧🇷" },
];

export default function Audit() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const [calculatorResults, setCalculatorResults] = useState(null);

  const countryButtonRef = useRef(null);

  // Get calculator results from session storage
  useEffect(() => {
    const stored = sessionStorage.getItem("calculatorResults");
    if (stored) {
      setCalculatorResults(JSON.parse(stored));
    }
  }, []);

  // Update dropdown position - recalculate on scroll/resize
  const updateDropdownPosition = useCallback(() => {
    if (countryButtonRef.current && countryDropdownOpen) {
      const rect = countryButtonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 4,
        left: rect.left,
        width: Math.max(280, rect.width),
      });
    }
  }, [countryDropdownOpen]);

  // Update position on scroll and resize
  useEffect(() => {
    if (countryDropdownOpen) {
      updateDropdownPosition();
      window.addEventListener("scroll", updateDropdownPosition, true);
      window.addEventListener("resize", updateDropdownPosition);
      return () => {
        window.removeEventListener("scroll", updateDropdownPosition, true);
        window.removeEventListener("resize", updateDropdownPosition);
      };
    }
  }, [countryDropdownOpen, updateDropdownPosition]);

  const openDropdown = () => {
    const rect = countryButtonRef.current.getBoundingClientRect();
    setDropdownPosition({
      top: rect.bottom + 4,
      left: rect.left,
      width: Math.max(280, rect.width),
    });
    setCountryDropdownOpen(true);
  };

  const [formData, setFormData] = useState({
    businessName: "",
    website: "",
    industry: "",
    industry_other: "", // NEW: conditional field when "Other" is selected
    name: "",
    email: "",
    country: countries[0],
    phone: "",
    volume: "",
    channels: [],
    channels_other: "", // NEW: conditional field when "Other" is selected
    painPoints: [],
    painPoints_other: "", // NEW: conditional field when "Something else" is selected
    crm: "",
    schedulingTool: "",
  });

  const [errors, setErrors] = useState({});
  const [heroRef, heroVisible] = useScrollAnimation(0.1);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const toggleArrayField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }));
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => {
    const digits = phone.replace(/\D/g, "");
    return digits.length >= 7 && digits.length <= 15;
  };

  const formatPhone = (value, countryDial) => {
    const digits = value.replace(/\D/g, "");
    if (countryDial === "+1") {
      if (digits.length <= 3) return digits;
      if (digits.length <= 6)
        return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(
        6,
        10
      )}`;
    }
    if (digits.length > 6)
      return (
        digits.slice(0, 3) + " " + digits.slice(3, 6) + " " + digits.slice(6)
      );
    if (digits.length > 3) return digits.slice(0, 3) + " " + digits.slice(3);
    return digits;
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhone(e.target.value, formData.country.dial);
    updateField("phone", formatted);
  };

  const handleCountryChange = (country) => {
    updateField("country", country);
    if (formData.phone) {
      const reformatted = formatPhone(formData.phone, country.dial);
      updateField("phone", reformatted);
    }
    setCountryDropdownOpen(false);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.businessName.trim())
      newErrors.businessName = "Business name is required";
    if (!formData.industry) newErrors.industry = "Please select an industry";
    // Conditional validation: industry_other is required when "Other" is selected
    if (formData.industry === "Other" && !formData.industry_other.trim())
      newErrors.industry_other = "Please specify your industry";
    if (!formData.name.trim()) newErrors.name = "Your name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(formData.email))
      newErrors.email = "Please enter a valid email";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!validatePhone(formData.phone))
      newErrors.phone = "Please enter a valid phone number";
    if (!formData.volume)
      newErrors.volume = "Please select your monthly volume";
    if (formData.channels.length === 0)
      newErrors.channels = "Please select at least one channel";
    // Conditional validation: channels_other is required when "Other" is selected
    if (formData.channels.includes("Other") && !formData.channels_other.trim())
      newErrors.channels_other = "Please specify other channel";
    if (formData.painPoints.length === 0)
      newErrors.painPoints = "Please select at least one issue";
    // Conditional validation: painPoints_other is required when "Something else" is selected
    if (formData.painPoints.includes("Something else") && !formData.painPoints_other.trim())
      newErrors.painPoints_other = "Please describe the issue";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError("");

    // Build submit data - existing fields remain unchanged for automation compatibility
    const submitData = {
      businessName: formData.businessName,
      website: formData.website,
      industry: formData.industry,
      // NEW: industry_other - only populated when industry === "Other"
      industry_other: formData.industry === "Other" ? formData.industry_other : "",
      name: formData.name,
      email: formData.email,
      phone: `${formData.country.dial} ${formData.phone}`,
      country: formData.country.name,
      volume: formData.volume,
      channels: formData.channels.join(", "),
      // NEW: channels_other - only populated when "Other" is in channels array
      channels_other: formData.channels.includes("Other") ? formData.channels_other : "",
      painPoints: formData.painPoints.join(", "),
      // NEW: painPoints_other - only populated when "Something else" is in painPoints array
      painPoints_other: formData.painPoints.includes("Something else") ? formData.painPoints_other : "",
      crm: formData.crm,
      schedulingTool: formData.schedulingTool,
      calculatorResults: calculatorResults
        ? JSON.stringify(calculatorResults)
        : null,
      submittedAt: new Date().toISOString(),
    };

    try {
      const response = await fetch("https://formspree.io/f/xbdrwznd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        setStep(2);
        sessionStorage.removeItem("calculatorResults");
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      setSubmitError(
        "Something went wrong. Please try again or email us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (step === 2 && window.Calendly) {
      window.Calendly.initInlineWidget({
        url: "https://calendly.com/leviathanaidev?background_color=ffffff&text_color=1a1a1a&primary_color=00d4cf",
        parentElement: document.getElementById("calendly-embed"),
      });
    }
  }, [step]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (countryDropdownOpen && !e.target.closest(".country-selector")) {
        setCountryDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [countryDropdownOpen]);

  const formatCurrency = (num) => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(0)}K`;
    return `$${num.toLocaleString()}`;
  };

  return (
    <div className="bg-[#050509] pt-24 min-h-screen">
      {/* HERO */}
      <section className="py-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#00d4cf]/5 blur-[100px] rounded-full" />
        </div>

        <div
          ref={heroRef}
          className={`mx-auto max-w-2xl px-6 text-center relative z-10 transition-all duration-700 ${
            heroVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block px-3 py-1.5 mb-4 text-xs font-medium tracking-wider uppercase text-[#00d4cf] bg-[#00d4cf]/10 rounded-full border border-[#00d4cf]/20">
            Automation Audit
          </span>

          {calculatorResults?.monthlyLoss === 0 ? (
            <>
              <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
                Make it permanent.
              </h1>
              <p className="text-lg text-[#9ca3af] leading-relaxed">
                Your response time isn't the problem. But it depends on humans being available every time.
              </p>
              <div className="mt-8 p-4 bg-[#00d4cf]/10 border border-[#00d4cf]/20 rounded-2xl">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-[#00d4cf]" />
                  <span className="text-[#00d4cf] text-sm font-medium">
                    No revenue lost to delay
                  </span>
                </div>
                <p className="text-sm text-[#9ca3af]">
                  30 minutes. We'll show you how to lock this in without depending on availability.
                </p>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
                Map your losses.
              </h1>
              <p className="text-lg text-[#9ca3af] leading-relaxed">
                30 minutes. We show you exactly where set backs in revenue reside, and what
                the fix looks like.
              </p>
              {calculatorResults && (
                <div className="mt-8 p-4 bg-red-950/20 border border-red-500/20 rounded-2xl">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <TrendingDown className="w-4 h-4 text-red-400" />
                    <span className="text-red-400 text-sm font-medium">
                      Your estimated cost of delay
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-white">
                    {formatCurrency(calculatorResults.monthlyLoss)}
                    <span className="text-[#6b7280] text-lg font-normal">
                      /month
                    </span>
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* FORM / CALENDAR */}
      <section className="py-8 border-t border-[#1a2332]">
        <div className="mx-auto max-w-2xl px-6">
          {step === 1 && (
            <form onSubmit={handleSubmit} className="space-y-10">
              {/* BUSINESS DETAILS */}
              <div>
                <span className="inline-block px-3 py-1.5 mb-5 text-xs font-medium tracking-wider uppercase text-[#00d4cf] bg-[#00d4cf]/10 rounded-full border border-[#00d4cf]/20">
                  Business Details
                </span>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm text-[#9ca3af] mb-2">
                      Business name *
                    </label>
                    <input
                      type="text"
                      value={formData.businessName}
                      onChange={(e) =>
                        updateField("businessName", e.target.value)
                      }
                      className={`w-full px-4 py-3.5 bg-[#0a0f1a] border rounded-2xl text-white placeholder-[#4b5563] focus:outline-none focus:border-[#00d4cf] focus:ring-1 focus:ring-[#00d4cf]/30 transition-all ${
                        errors.businessName
                          ? "border-red-500"
                          : "border-[#1a2332]"
                      }`}
                      placeholder="Your company name"
                    />
                    {errors.businessName && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.businessName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm text-[#9ca3af] mb-2">
                      Website (optional)
                    </label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => updateField("website", e.target.value)}
                      className="w-full px-4 py-3.5 bg-[#0a0f1a] border border-[#1a2332] rounded-2xl text-white placeholder-[#4b5563] focus:outline-none focus:border-[#00d4cf] focus:ring-1 focus:ring-[#00d4cf]/30 transition-all"
                      placeholder="https://"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#9ca3af] mb-2">
                      Industry *
                    </label>
                    <div className="relative">
                      <select
                        value={formData.industry}
                        onChange={(e) => {
                          updateField("industry", e.target.value);
                          // Clear industry_other error when "Other" is deselected
                          if (e.target.value !== "Other") {
                            setErrors((prev) => ({ ...prev, industry_other: "" }));
                          }
                        }}
                        className={`w-full px-4 py-3.5 bg-[#0a0f1a] border rounded-2xl text-white focus:outline-none focus:border-[#00d4cf] focus:ring-1 focus:ring-[#00d4cf]/30 transition-all appearance-none cursor-pointer ${
                          errors.industry
                            ? "border-red-500"
                            : "border-[#1a2332]"
                        } ${!formData.industry ? "text-[#4b5563]" : ""}`}
                      >
                        <option value="">Select industry</option>
                        {industries.map((ind) => (
                          <option key={ind} value={ind}>
                            {ind}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b7280] pointer-events-none" />
                    </div>
                    {errors.industry && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.industry}
                      </p>
                    )}
                    {/* Conditional input: appears when "Other" is selected */}
                    {formData.industry === "Other" && (
                      <div className="mt-3">
                        <label className="block text-sm text-[#9ca3af] mb-2">
                          Please specify your industry *
                        </label>
                        <input
                          type="text"
                          value={formData.industry_other}
                          onChange={(e) => updateField("industry_other", e.target.value)}
                          className={`w-full px-4 py-3.5 bg-[#0a0f1a] border rounded-2xl text-white placeholder-[#4b5563] focus:outline-none focus:border-[#00d4cf] focus:ring-1 focus:ring-[#00d4cf]/30 transition-all ${
                            errors.industry_other ? "border-red-500" : "border-[#1a2332]"
                          }`}
                          placeholder="e.g. E-commerce, SaaS, Construction"
                        />
                        {errors.industry_other && (
                          <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.industry_other}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* CONTACT */}
              <div>
                <span className="inline-block px-3 py-1.5 mb-5 text-xs font-medium tracking-wider uppercase text-[#00d4cf] bg-[#00d4cf]/10 rounded-full border border-[#00d4cf]/20">
                  Contact
                </span>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm text-[#9ca3af] mb-2">
                      Your name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      className={`w-full px-4 py-3.5 bg-[#0a0f1a] border rounded-2xl text-white placeholder-[#4b5563] focus:outline-none focus:border-[#00d4cf] focus:ring-1 focus:ring-[#00d4cf]/30 transition-all ${
                        errors.name ? "border-red-500" : "border-[#1a2332]"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm text-[#9ca3af] mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className={`w-full px-4 py-3.5 bg-[#0a0f1a] border rounded-2xl text-white placeholder-[#4b5563] focus:outline-none focus:border-[#00d4cf] focus:ring-1 focus:ring-[#00d4cf]/30 transition-all ${
                        errors.email ? "border-red-500" : "border-[#1a2332]"
                      }`}
                      placeholder="you@company.com"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm text-[#9ca3af] mb-2">
                      Phone *
                    </label>
                    <div className="flex gap-2">
                      <div className="relative country-selector">
                        {/* Selected button */}
                        <button
                          ref={countryButtonRef}
                          type="button"
                          onClick={openDropdown}
                          className="flex items-center gap-2 bg-[#0a0f1a] border border-[#1a2332] rounded-2xl px-4 h-[44px] text-white hover:border-[#3d4a59] transition-colors"
                        >
                          <img
                            src={`https://flagcdn.com/w20/${formData.country.code.toLowerCase()}.png`}
                            srcSet={`https://flagcdn.com/w40/${formData.country.code.toLowerCase()}.png 2x`}
                            width="20"
                            height="15"
                            alt=""
                            className="shrink-0 rounded-sm"
                          />

                          <span className="text-white text-sm font-medium w-8 text-left">
                            {formData.country.code}
                          </span>

                          <span className="text-[#9ca3af] text-sm">
                            {formData.country.dial}
                          </span>

                          <ChevronDown
                            className={`w-4 h-4 text-[#6b7280] transition-transform ${
                              countryDropdownOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {/* Dropdown */}
                        {countryDropdownOpen &&
                          createPortal(
                            <div
                              className="fixed z-[9999] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
                              style={{
                                top: dropdownPosition.top,
                                left: dropdownPosition.left,
                                width: dropdownPosition.width,
                              }}
                            >
                              <div className="max-h-[280px] overflow-y-auto">
                                {countries.map((country) => (
                                  <button
                                    key={country.code}
                                    type="button"
                                    onClick={() => handleCountryChange(country)}
                                    className={`w-full flex items-center gap-3 px-4 h-[44px] text-left transition-colors hover:bg-gray-100 ${
                                      formData.country.code === country.code
                                        ? "bg-gray-100"
                                        : ""
                                    }`}
                                  >
                                    <img
                                      src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
                                      srcSet={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png 2x`}
                                      width="20"
                                      height="15"
                                      alt=""
                                      className="shrink-0 rounded-sm"
                                    />

                                    <span className="w-8 text-sm font-medium text-gray-900 shrink-0">
                                      {country.code}
                                    </span>

                                    <span className="flex-1 text-sm text-gray-700 truncate">
                                      {country.name}
                                    </span>

                                    <span className="text-sm text-gray-400 tabular-nums">
                                      {country.dial}
                                    </span>
                                  </button>
                                ))}
                              </div>
                            </div>,
                            document.getElementById("dropdown-root")
                          )}
                      </div>

                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        className={`flex-1 px-4 h-[44px] bg-[#0a0f1a] border rounded-2xl text-white placeholder-[#4b5563] focus:outline-none focus:border-[#00d4cf] focus:ring-1 focus:ring-[#00d4cf]/30 transition-all ${
                          errors.phone ? "border-red-500" : "border-[#1a2332]"
                        }`}
                        placeholder={
                          formData.country.dial === "+1"
                            ? "(555) 123-4567"
                            : "Phone number"
                        }
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* VOLUME + CHANNELS */}
              <div>
                <span className="inline-block px-3 py-1.5 mb-5 text-xs font-medium tracking-wider uppercase text-[#00d4cf] bg-[#00d4cf]/10 rounded-full border border-[#00d4cf]/20">
                  Volume + Channels
                </span>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm text-[#9ca3af] mb-1">
                      Monthly inbound leads or client inquiries *
                    </label>
                    {/* Helper text - clarifies what to count */}
                    <p className="text-xs text-[#6b7280] mb-2">
                      Includes calls, messages, chats, and form submissions.
                    </p>
                    <div className="relative">
                      <select
                        value={formData.volume}
                        onChange={(e) => updateField("volume", e.target.value)}
                        className={`w-full px-4 py-3.5 bg-[#0a0f1a] border rounded-2xl text-white focus:outline-none focus:border-[#00d4cf] focus:ring-1 focus:ring-[#00d4cf]/30 transition-all appearance-none cursor-pointer ${
                          errors.volume ? "border-red-500" : "border-[#1a2332]"
                        } ${!formData.volume ? "text-[#4b5563]" : ""}`}
                      >
                        <option value="">Select volume</option>
                        {volumes.map((vol) => (
                          <option key={vol} value={vol}>
                            {vol}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b7280] pointer-events-none" />
                    </div>
                    {errors.volume && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.volume}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm text-[#9ca3af] mb-3">
                      Channels you use *
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {channels.map((channel) => (
                        <button
                          key={channel}
                          type="button"
                          onClick={() => {
                            toggleArrayField("channels", channel);
                            if (errors.channels)
                              setErrors((prev) => ({ ...prev, channels: "" }));
                            // Clear channels_other error when "Other" is deselected
                            if (channel === "Other" && formData.channels.includes("Other")) {
                              setErrors((prev) => ({ ...prev, channels_other: "" }));
                            }
                          }}
                          className={`px-4 py-2.5 text-sm rounded-full border transition-all duration-200 ${
                            formData.channels.includes(channel)
                              ? "bg-[#00d4cf] text-[#050509] border-[#00d4cf] font-medium"
                              : "bg-[#0a0f1a] text-[#9ca3af] border-[#1a2332] hover:border-[#3d4a59] hover:bg-[#0a0f1a]/80"
                          }`}
                        >
                          {channel}
                        </button>
                      ))}
                    </div>
                    {/* Conditional input: appears when "Other" is selected */}
                    {formData.channels.includes("Other") && (
                      <div className="mt-3">
                        <label className="block text-sm text-[#9ca3af] mb-2">
                          Please specify other channel *
                        </label>
                        <input
                          type="text"
                          value={formData.channels_other}
                          onChange={(e) => updateField("channels_other", e.target.value)}
                          className={`w-full px-4 py-3.5 bg-[#0a0f1a] border rounded-2xl text-white placeholder-[#4b5563] focus:outline-none focus:border-[#00d4cf] focus:ring-1 focus:ring-[#00d4cf]/30 transition-all ${
                            errors.channels_other ? "border-red-500" : "border-[#1a2332]"
                          }`}
                          placeholder="e.g. Email, Social DMs, WhatsApp"
                        />
                        {errors.channels_other && (
                          <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.channels_other}
                          </p>
                        )}
                      </div>
                    )}
                    {errors.channels && (
                      <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.channels}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* PAIN POINTS */}
              <div>
                <span className="inline-block px-3 py-1.5 mb-5 text-xs font-medium tracking-wider uppercase text-[#00d4cf] bg-[#00d4cf]/10 rounded-full border border-[#00d4cf]/20">
                  What are you trying to fix?
                </span>
                <div className="flex flex-wrap gap-2">
                  {painPoints.map((point) => (
                    <button
                      key={point}
                      type="button"
                      onClick={() => {
                        toggleArrayField("painPoints", point);
                        if (errors.painPoints)
                          setErrors((prev) => ({ ...prev, painPoints: "" }));
                        // Clear painPoints_other error when "Something else" is deselected
                        if (point === "Something else" && formData.painPoints.includes("Something else")) {
                          setErrors((prev) => ({ ...prev, painPoints_other: "" }));
                        }
                      }}
                      className={`px-4 py-2.5 text-sm rounded-full border transition-all duration-200 ${
                        formData.painPoints.includes(point)
                          ? "bg-[#00d4cf] text-[#050509] border-[#00d4cf] font-medium"
                          : "bg-[#0a0f1a] text-[#9ca3af] border-[#1a2332] hover:border-[#3d4a59] hover:bg-[#0a0f1a]/80"
                      }`}
                    >
                      {point}
                    </button>
                  ))}
                </div>
                {/* Conditional input: appears when "Something else" is selected */}
                {formData.painPoints.includes("Something else") && (
                  <div className="mt-3">
                    <label className="block text-sm text-[#9ca3af] mb-2">
                      Please describe the issue *
                    </label>
                    <input
                      type="text"
                      value={formData.painPoints_other}
                      onChange={(e) => updateField("painPoints_other", e.target.value)}
                      className={`w-full px-4 py-3.5 bg-[#0a0f1a] border rounded-2xl text-white placeholder-[#4b5563] focus:outline-none focus:border-[#00d4cf] focus:ring-1 focus:ring-[#00d4cf]/30 transition-all ${
                        errors.painPoints_other ? "border-red-500" : "border-[#1a2332]"
                      }`}
                      placeholder="Describe what you're trying to fix..."
                    />
                    {errors.painPoints_other && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.painPoints_other}
                      </p>
                    )}
                  </div>
                )}
                {errors.painPoints && (
                  <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.painPoints}
                  </p>
                )}
              </div>

              {/* TOOLS */}
              <div>
                <span className="inline-block px-3 py-1.5 mb-5 text-xs font-medium tracking-wider uppercase text-[#00d4cf] bg-[#00d4cf]/10 rounded-full border border-[#00d4cf]/20">
                  Current Tools{" "}
                  <span className="text-[#6b7280] normal-case tracking-normal">
                    (Optional)
                  </span>
                </span>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm text-[#9ca3af] mb-2">
                      CRM you use
                    </label>
                    <input
                      type="text"
                      value={formData.crm}
                      onChange={(e) => updateField("crm", e.target.value)}
                      className="w-full px-4 py-3.5 bg-[#0a0f1a] border border-[#1a2332] rounded-2xl text-white placeholder-[#4b5563] focus:outline-none focus:border-[#00d4cf] focus:ring-1 focus:ring-[#00d4cf]/30 transition-all"
                      placeholder="e.g. HubSpot, Salesforce, GoHighLevel"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#9ca3af] mb-2">
                      Scheduling tool
                    </label>
                    <input
                      type="text"
                      value={formData.schedulingTool}
                      onChange={(e) =>
                        updateField("schedulingTool", e.target.value)
                      }
                      className="w-full px-4 py-3.5 bg-[#0a0f1a] border border-[#1a2332] rounded-2xl text-white placeholder-[#4b5563] focus:outline-none focus:border-[#00d4cf] focus:ring-1 focus:ring-[#00d4cf]/30 transition-all"
                      placeholder="e.g. Calendly, ServiceTitan"
                    />
                  </div>
                </div>
              </div>

              {/* ERROR MESSAGE */}
              {submitError && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 text-sm flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  {submitError}
                </div>
              )}

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 bg-[#00d4cf] hover:bg-[#00e5df] text-[#050509] font-semibold rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-[#00d4cf]/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-[#050509]/30 border-t-[#050509] rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Schedule My Appointment
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-center text-[#4b5563] text-sm">
                No pitch. No pressure. Just clarity.
              </p>
            </form>
          )}

          {step === 2 && (
            <div className="space-y-10">
              {/* Success message */}
              <div className="flex items-center gap-3 p-4 bg-[#00d4cf]/10 border border-[#00d4cf]/20 rounded-2xl">
                <div className="w-10 h-10 rounded-full bg-[#00d4cf] flex items-center justify-center">
                  <Check className="h-5 w-5 text-[#050509]" />
                </div>
                <p className="text-white font-medium">
                  Thanks, {formData.name}. Now pick a time.
                </p>
              </div>

              {/* Calendar */}
              <div>
                <span className="inline-block px-3 py-1.5 mb-4 text-xs font-medium tracking-wider uppercase text-[#00d4cf] bg-[#00d4cf]/10 rounded-full border border-[#00d4cf]/20">
                  Pick a Time
                </span>
                <p className="text-[#9ca3af] mb-5">
                  30 minutes. We'll review your answers beforehand.
                </p>
                <div className="rounded-2xl overflow-hidden border border-[#1a2332]">
                  <div
                    id="calendly-embed"
                    className="calendly-inline-widget"
                    data-url="https://calendly.com/leviathanaidev?background_color=ffffff&text_color=1a1a1a&primary_color=00d4cf"
                    style={{ minWidth: "280px", height: "650px" }}
                  />
                </div>
              </div>

              {/* What happens next */}
              <div className="border-t border-[#1a2332] pt-10">
                <span className="inline-block px-3 py-1.5 mb-5 text-xs font-medium tracking-wider uppercase text-[#00d4cf] bg-[#00d4cf]/10 rounded-full border border-[#00d4cf]/20">
                  After You Book
                </span>
                <div className="space-y-4">
                  {[
                    "We review your answers before the call.",
                    "We map where leads are leaking.",
                    "You leave with a clear recommendation—even if we're not the right fit.",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="flex gap-4 p-4 bg-[#0a0f1a] border border-[#1a2332] rounded-2xl"
                    >
                      <span className="text-[#00d4cf] font-bold">
                        {index + 1}.
                      </span>
                      <p className="text-[#9ca3af]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
