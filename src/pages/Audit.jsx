import {
  ArrowRight,
  Check,
  AlertCircle,
  ChevronDown,
  TrendingDown,
  Shield,
} from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { useState, useEffect, useRef } from "react";

const industries = [
  "Home Services",
  "Agency / Marketing",
  "Healthcare / Clinic",
  "Professional Services",
  "Real Estate",
  "Other",
];

const volumes = ["Less than 100", "100 – 500", "500 – 2,000", "2,000+"];

const channels = ["Inbound calls", "Web chat", "SMS", "Contact forms", "Other"];

const painPoints = [
  "Missed calls / slow response",
  "Scheduling bottlenecks",
  "Follow-up falling through",
  "CRM out of sync",
  "Lead qualification",
  "Something else",
];

export default function Audit() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [calculatorResults, setCalculatorResults] = useState(null);
  const [sessionId, setSessionId] = useState(null);

  const formRef = useRef(null);

  // Get calculator results from session storage
  useEffect(() => {
    const stored = sessionStorage.getItem("calculatorResults");
    if (stored) {
      setCalculatorResults(JSON.parse(stored));
    }
  }, []);

  const [formData, setFormData] = useState({
    businessName: "",
    website: "",
    industry: "",
    industry_other: "",
    volume: "",
    channels: [],
    channels_other: "",
    painPoints: [],
    painPoints_other: "",
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

  const scrollToFirstError = (errorKeys) => {
    if (errorKeys.length === 0 || !formRef.current) return;

    // Find the first element with an error
    const firstErrorKey = errorKeys[0];
    const errorElement = formRef.current.querySelector(`[data-field="${firstErrorKey}"]`);

    if (errorElement) {
      errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.businessName.trim())
      newErrors.businessName = "Business name is required";
    if (!formData.industry) newErrors.industry = "Please select an industry";
    if (formData.industry === "Other" && !formData.industry_other.trim())
      newErrors.industry_other = "Please specify your industry";
    if (!formData.volume)
      newErrors.volume = "Please select your monthly volume";
    if (formData.channels.length === 0)
      newErrors.channels = "Please select at least one channel";
    if (formData.channels.includes("Other") && !formData.channels_other.trim())
      newErrors.channels_other = "Please specify other channel";
    if (formData.painPoints.length === 0)
      newErrors.painPoints = "Please select at least one issue";
    if (formData.painPoints.includes("Something else") && !formData.painPoints_other.trim())
      newErrors.painPoints_other = "Please describe the issue";
    setErrors(newErrors);
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    const errorKeys = Object.keys(validationErrors);
    if (errorKeys.length > 0) {
      scrollToFirstError(errorKeys);
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    // Generate unique session ID for matching Formspree data with Calendly booking
    const newSessionId = crypto.randomUUID();
    setSessionId(newSessionId);

    // Ensure website has https:// (upgrade http to https)
    const formatWebsite = (url) => {
      if (!url || !url.trim()) return "";
      const trimmed = url.trim();
      if (trimmed.startsWith("https://")) return trimmed;
      if (trimmed.startsWith("http://")) return trimmed.replace("http://", "https://");
      return `https://${trimmed}`;
    };

    const submitData = {
      sessionId: newSessionId,
      businessName: formData.businessName,
      website: formatWebsite(formData.website),
      industry: formData.industry,
      industry_other: formData.industry === "Other" ? formData.industry_other : null,
      volume: formData.volume,
      channels: formData.channels.join(", "),
      channels_other: formData.channels.includes("Other") ? formData.channels_other : null,
      painPoints: formData.painPoints.join(", "),
      painPoints_other: formData.painPoints.includes("Something else") ? formData.painPoints_other : null,
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
        // Scroll to top of page for booking section
        window.scrollTo({ top: 0, behavior: "smooth" });
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
    if (step === 2 && window.Calendly && sessionId) {
      // Include sessionId as utm_content so it passes through to Calendly webhook
      const calendlyUrl = `https://calendly.com/leviathanaidev?background_color=ffffff&text_color=1a1a1a&primary_color=00d4cf&utm_content=${sessionId}`;
      window.Calendly.initInlineWidget({
        url: calendlyUrl,
        parentElement: document.getElementById("calendly-embed"),
      });
    }
  }, [step, sessionId]);

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
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-10">
              {/* BUSINESS DETAILS */}
              <div>
                <span className="inline-block px-3 py-1.5 mb-5 text-xs font-medium tracking-wider uppercase text-[#00d4cf] bg-[#00d4cf]/10 rounded-full border border-[#00d4cf]/20">
                  Business Details
                </span>
                <div className="space-y-5">
                  <div data-field="businessName">
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
                  <div data-field="industry">
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
                      <div className="mt-3" data-field="industry_other">
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

              {/* VOLUME + CHANNELS */}
              <div>
                <span className="inline-block px-3 py-1.5 mb-5 text-xs font-medium tracking-wider uppercase text-[#00d4cf] bg-[#00d4cf]/10 rounded-full border border-[#00d4cf]/20">
                  Volume + Channels
                </span>
                <div className="space-y-5">
                  <div data-field="volume">
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
                  <div data-field="channels">
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
                      <div className="mt-3" data-field="channels_other">
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
              <div data-field="painPoints">
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
                  <div className="mt-3" data-field="painPoints_other">
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
                  Thanks! Now pick a time.
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
                    "You leave with a clear recommendation, even if we're not the right fit.",
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
