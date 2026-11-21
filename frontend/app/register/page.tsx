"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import {
  User,
  Mail,
  Phone,
  BookOpen,
  MessageSquare,
  CheckCircle,
  Loader2,
  GraduationCap,
} from "lucide-react";

const COURSES = [
  "B.Tech - Computer Science Engineering",
  "B.Tech - CSE (AI & ML)",
  "B.Tech - CSE (Data Science)",
  "B.Tech - CSE (Cybersecurity)",
  "B.Tech - Mechanical Engineering",
  "B.Tech - Civil Engineering",
  "B.Tech - Electrical Engineering",
  "B.Tech - Electronics & Communication",
  "M.Tech",
  "MBA",
  "BBA",
  "B.Com",
  "M.Com",
  "BCA",
  "MCA",
  "BA LLB",
  "BBA LLB",
  "B.Pharm",
  "M.Pharm",
  "BSc",
  "MSc",
  "B.Ed",
  "Ph.D",
  "Other",
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  course: string;
  message: string;
}

export default function RegisterPage() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    course: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.course) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Submission failed");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Inquiry Submitted!
            </h2>
            <p className="text-gray-500 mb-2">
              Thank you, <span className="font-semibold text-gray-700">{form.name}</span>!
            </p>
            <p className="text-gray-500 mb-6">
              Our admissions team will reach out to you at{" "}
              <span className="text-blue-700 font-medium">{form.email}</span> within 24–48 hours.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-left">
              <p className="text-amber-800 text-sm font-medium mb-1">What happens next?</p>
              <ul className="text-amber-700 text-sm space-y-1">
                <li>• Our counselor will call you within 24 hours</li>
                <li>• You will receive course details via email</li>
                <li>• Schedule a campus visit if interested</li>
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <a
                href="/chat"
                className="btn-primary text-center block"
              >
                Chat with GLA Buddy
              </a>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setForm({ name: "", email: "", phone: "", course: "", message: "" });
                }}
                className="text-blue-700 hover:text-blue-800 font-medium text-sm"
              >
                Submit another inquiry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex-1 py-10 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#1e3a8a] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <GraduationCap className="w-8 h-8 text-amber-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Register Your Interest
            </h1>
            <p className="text-gray-500">
              Fill in your details and our admissions team will reach out to you.
            </p>
          </div>

          {/* Form card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    required
                  />
                </div>
              </div>

              {/* Course */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Course Interested In <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    name="course"
                    value={form.course}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm appearance-none bg-white"
                    required
                  >
                    <option value="">Select a course</option>
                    {COURSES.map((course) => (
                      <option key={course} value={course}>
                        {course}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Message / Query{" "}
                  <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Any specific questions or requirements?"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                  />
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-700 text-sm">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center space-x-2 bg-[#1e3a8a] hover:bg-blue-800 disabled:bg-gray-300 text-white py-3 rounded-xl font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg mt-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting…</span>
                  </>
                ) : (
                  <>
                    <GraduationCap className="w-4 h-4" />
                    <span>Submit Inquiry</span>
                  </>
                )}
              </button>
            </form>

            {/* Footer note */}
            <p className="text-center text-xs text-gray-400 mt-4">
              By submitting, you agree that GLA University may contact you regarding admissions.
            </p>
          </div>

          {/* Contact info */}
          <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-5 text-center">
            <p className="text-blue-800 text-sm font-medium mb-1">Need immediate help?</p>
            <p className="text-blue-600 text-sm">
              Call{" "}
              <a href="tel:18001211234" className="font-semibold hover:underline">
                1800-121-1234
              </a>{" "}
              (Toll Free) or email{" "}
              <a
                href="mailto:admissions@gla.ac.in"
                className="font-semibold hover:underline"
              >
                admissions@gla.ac.in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
