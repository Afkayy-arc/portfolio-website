"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Product Manager at Twodotzero",
    company: "Twodotzero Innovation Agency",
    content: "Abdullah's work on our event ticketing platform was exceptional. The real-time seatmap rendering handled 1000+ seats flawlessly, and his attention to detail in preventing double-bookings was remarkable.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
  },
  {
    id: 2,
    name: "David Martinez",
    role: "CTO at DevMechanix",
    company: "DevMechanix",
    content: "Muhammad's expertise in n8n automation transformed our dental clinic operations. The 40% reduction in no-shows through automated workflows exceeded our expectations. Highly recommended!",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David"
  },
  {
    id: 3,
    name: "Emma Thompson",
    role: "Founder at HealthTech Startup",
    company: "IT Solera",
    content: "Working with Abdullah was a pleasure. He optimized our ML-powered video platform, cutting API latency by 45%. His full-stack skills and problem-solving abilities are top-notch.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma"
  }
];

export default function Testimonials() {
  return (
    <div className="relative">
      <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex-none w-[85vw] md:w-[45vw] lg:w-[30vw] snap-center group relative bg-white dark:bg-zinc-900/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 hover:border-indigo-500 dark:hover:border-indigo-500/50 transition-all duration-300"
          >
            {/* Quote Icon */}
            <div className="mb-4">
              <Quote className="w-8 h-8 text-indigo-500 dark:text-indigo-400 opacity-50" />
            </div>

            {/* Content */}
            <p className="text-zinc-700 dark:text-zinc-300 mb-6 leading-relaxed">
              &quot;{testimonial.content}&quot;
            </p>

            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="font-semibold text-zinc-900 dark:text-zinc-100">
                  {testimonial.name}
                </div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                  {testimonial.role}
                </div>
              </div>
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
