"use client";

import { motion } from "framer-motion";
import { skills } from "@/constants/data";

export default function TechStack() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      {skills.map((skill) => {
        const Icon = skill.icon;
        return (
          <motion.div
            key={skill.name}
            variants={itemVariants}
            whileHover={{ scale: 1.05, rotate: 1 }}
            className="group relative bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all duration-300 cursor-pointer"
          >
            {/* Icon */}
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-zinc-800/50 rounded-lg group-hover:bg-indigo-500/10 transition-colors duration-300">
                <Icon className="w-8 h-8 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
              </div>
            </div>

            {/* Skill Name */}
            <h3 className="text-center text-zinc-100 font-semibold mb-1">
              {skill.name}
            </h3>

            {/* Category */}
            <p className="text-center text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors">
              {skill.category}
            </p>

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
