"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  MessageCircle,
  BookOpen,
  DollarSign,
  Users,
  MapPin,
  Phone,
  Star,
  ArrowRight,
  GraduationCap,
  Building2,
  Award,
} from "lucide-react";

const stats = [
  { label: "Years of Excellence", value: "30+", icon: Award },
  { label: "Programs Offered", value: "100+", icon: BookOpen },
  { label: "Campus Recruiters", value: "500+", icon: Building2 },
  { label: "Alumni Network", value: "50,000+", icon: Users },
];

const quickActions = [
  {
    icon: GraduationCap,
    label: "Admissions",
    desc: "Apply online, GLAET details",
    color: "bg-blue-50 text-blue-700 border-blue-100",
    href: "/chat",
    query: "How to apply for admission at GLA University?",
  },
  {
    icon: BookOpen,
    label: "Courses",
    desc: "B.Tech, MBA, BCA & more",
    color: "bg-amber-50 text-amber-700 border-amber-100",
    href: "/chat",
    query: "What courses does GLA University offer?",
  },
  {
    icon: DollarSign,
    label: "Fees",
    desc: "Fee structure & scholarships",
    color: "bg-green-50 text-green-700 border-green-100",
    href: "/chat",
    query: "What is the fee structure at GLA University?",
  },
  {
    icon: Users,
    label: "Campus Life",
    desc: "Hostels, sports & facilities",
    color: "bg-purple-50 text-purple-700 border-purple-100",
    href: "/chat",
    query: "Tell me about campus life and facilities at GLA University.",
  },
];

const features = [
  "NAAC A+ Accredited University",
  "500+ Recruiting Companies",
  "Research & Innovation Hub",
  "Smart Campus with Wi-Fi",
  "Modern Hostels & Amenities",
  "International Collaborations",
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1e3a8a] via-[#1d4ed8] to-[#1e3a8a] text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-amber-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div>
              <div className="inline-flex items-center bg-amber-500/20 border border-amber-400/30 rounded-full px-4 py-1.5 mb-6">
                <Star className="w-3.5 h-3.5 text-amber-400 mr-2" />
                <span className="text-amber-300 text-sm font-medium">NAAC A+ Accredited</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Ask anything about{" "}
                <span className="text-amber-400">GLA University</span>
              </h1>

              <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                Get instant answers about admissions, courses, fees, placements, and
                campus life from GLA Buddy — your intelligent AI assistant available 24/7.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/chat"
                  className="flex items-center justify-center space-x-2 bg-amber-500 hover:bg-amber-400 text-white px-8 py-3.5 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-amber-500/25 hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Chat with GLA Buddy</span>
                </Link>
                <Link
                  href="/register"
                  className="flex items-center justify-center space-x-2 border-2 border-blue-300 hover:border-white text-blue-100 hover:text-white px-8 py-3.5 rounded-xl font-semibold text-lg transition-all duration-200"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              <div className="flex items-center mt-6 text-blue-200 text-sm">
                <MapPin className="w-4 h-4 mr-1.5" />
                <span>NH-2, Mathura-Delhi Road, Mathura, UP 281406</span>
              </div>
            </div>

            {/* Right: Chatbot preview */}
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center space-x-2 mb-4 pb-3 border-b border-white/20">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="ml-2 text-white/70 text-sm">GLA Buddy Chat</span>
                </div>

                {/* Preview messages */}
                <div className="space-y-3">
                  <div className="flex justify-end">
                    <div className="bg-blue-600/60 rounded-2xl rounded-br-sm px-4 py-2.5 max-w-[80%]">
                      <p className="text-white text-sm">What B.Tech programs are available?</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <div className="w-7 h-7 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">GB</span>
                    </div>
                    <div className="bg-white/15 rounded-2xl rounded-bl-sm px-4 py-2.5 max-w-[80%]">
                      <p className="text-white text-sm">
                        GLA offers B.Tech in CSE, Mechanical, Civil, ECE, Electrical, CSE-AI,
                        CSE-Data Science, and CSE-Cybersecurity! 🎓
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="bg-blue-600/60 rounded-2xl rounded-br-sm px-4 py-2.5 max-w-[80%]">
                      <p className="text-white text-sm">What is the average placement package?</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <div className="w-7 h-7 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">GB</span>
                    </div>
                    <div className="bg-white/15 rounded-2xl rounded-bl-sm px-4 py-2.5 max-w-[80%]">
                      <p className="text-white text-sm">
                        B.Tech graduates average ₹5–7 LPA, with top recruiters like Amazon, Infosys & TCS! 💼
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/20">
                  <div className="flex items-center bg-white/10 rounded-xl px-3 py-2.5">
                    <span className="text-white/40 text-sm flex-1">Ask your question...</span>
                    <div className="w-7 h-7 bg-amber-500 rounded-lg flex items-center justify-center">
                      <ArrowRight className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-7 h-7 text-blue-700 mx-auto mb-2" />
                <div className="text-3xl font-bold text-[#1e3a8a]">{stat.value}</div>
                <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              What do you want to know?
            </h2>
            <p className="text-gray-500 text-lg">
              Click any topic to instantly ask GLA Buddy
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                href={`/chat?q=${encodeURIComponent(action.query)}`}
                className={`group border-2 ${action.color} rounded-2xl p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1`}
              >
                <action.icon className="w-9 h-9 mb-4" />
                <h3 className="font-bold text-lg mb-1">{action.label}</h3>
                <p className="text-sm opacity-70">{action.desc}</p>
                <div className="mt-4 flex items-center text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Ask now <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why choose GLA University?
              </h2>
              <p className="text-gray-500 mb-8 text-lg leading-relaxed">
                GLA University is a premier private university in Uttar Pradesh with a
                NAAC A+ grade, offering world-class education and industry-ready graduates.
              </p>
              <ul className="space-y-3">
                {features.map((feature) => (
                  <li key={feature} className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex gap-4">
                <Link href="/chat" className="btn-primary flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>Ask GLA Buddy</span>
                </Link>
                <Link href="/register" className="btn-secondary">
                  Register Interest
                </Link>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#1e3a8a] to-blue-700 rounded-2xl p-8 text-white">
              <h3 className="text-xl font-bold mb-6 text-amber-400">Contact Us</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <p className="text-blue-100 text-sm">
                    17km Milestone, NH-2, Mathura-Delhi Road,
                    <br />
                    Mathura, Uttar Pradesh 281406
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <div>
                    <p className="text-blue-100 text-sm">1800-121-1234 (Toll Free)</p>
                    <p className="text-blue-100 text-sm">05662-250900</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-blue-600">
                  <p className="text-blue-200 text-sm mb-2">Email</p>
                  <p className="text-white font-medium">admissions@gla.ac.in</p>
                </div>
                <div className="pt-2">
                  <p className="text-blue-200 text-sm mb-2">Website</p>
                  <p className="text-white font-medium">www.gla.ac.in</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-amber-500 py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Have questions? GLA Buddy is here 24/7
          </h2>
          <p className="text-amber-100 text-lg mb-8">
            Get instant, accurate answers about admissions, courses, and campus life.
          </p>
          <Link
            href="/chat"
            className="inline-flex items-center space-x-2 bg-white text-amber-600 hover:bg-amber-50 px-8 py-3.5 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg hover:scale-105"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Start Chatting Now</span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1e3a8a] text-blue-200 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <GraduationCap className="w-5 h-5 text-amber-400" />
            <span className="text-white font-semibold">GLA University</span>
          </div>
          <p className="text-sm text-blue-300">
            © 2024 GLA University. Powered by GLA Buddy AI.
          </p>
        </div>
      </footer>
    </div>
  );
}
