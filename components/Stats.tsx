"use client";

import { motion } from "framer-motion";
import { Code, Users, Briefcase, Award } from "lucide-react";

const stats = [
  {
    icon: Code,
    value: "6+",
    label: "Projects Completed",
    description: "Production-ready applications"
  },
  {
    icon: Briefcase,
    value: "3+",
    label: "Years Experience",
    description: "Full-stack development"
  },
  {
    icon: Users,
    value: "500+",
    label: "Users Served",
    description: "Concurrent platform users"
  },
  {
    icon: Award,
    value: "45%",
    label: "Performance Boost",
    description: "API optimization achieved"
  }
];

export default function Stats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="group relative bg-white dark:bg-zinc-900/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 hover:border-indigo-500 dark:hover:border-indigo-500/50 transition-all duration-300"
          >
            {/* Icon */}
            <div className="mb-4 inline-flex p-3 bg-indigo-100 dark:bg-indigo-500/10 rounded-lg group-hover:bg-indigo-200 dark:group-hover:bg-indigo-500/20 transition-colors">
              <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>

            {/* Value */}
            <div className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">
              {stat.value}
            </div>

            {/* Label */}
            <div className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              {stat.label}
            </div>

            {/* Description */}
            <div className="text-xs text-zinc-500 dark:text-zinc-500">
              {stat.description}
            </div>

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </motion.div>
        );
      })}
    </div>
  );
}
