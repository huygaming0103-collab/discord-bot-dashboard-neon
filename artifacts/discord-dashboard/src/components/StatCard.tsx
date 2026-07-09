import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  variant?: "primary" | "secondary" | "accent";
  delay?: number;
}

export function StatCard({ title, value, icon: Icon, variant = "primary", delay = 0 }: StatCardProps) {
  const borderColors = {
    primary: "border-primary/50",
    secondary: "border-secondary/50",
    accent: "border-accent/50",
  };
  
  const textColors = {
    primary: "text-primary neon-text-primary",
    secondary: "text-secondary neon-text-secondary",
    accent: "text-accent",
  };

  const glowColors = {
    primary: "hover:neon-glow-primary hover:border-primary",
    secondary: "hover:neon-glow-secondary hover:border-secondary",
    accent: "hover:neon-glow-accent hover:border-accent",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={`relative overflow-hidden bg-card/80 backdrop-blur-sm border ${borderColors[variant]} ${glowColors[variant]} rounded-xl p-6 transition-all duration-300 group`}
    >
      <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
        <Icon className={`w-24 h-24 ${textColors[variant]} transform rotate-12 scale-150`} />
      </div>
      
      <div className="relative z-10 flex flex-col gap-4">
        <div className={`p-3 bg-background/50 rounded-lg inline-block w-fit border ${borderColors[variant]}`}>
          <Icon className={`w-6 h-6 ${textColors[variant]}`} />
        </div>
        
        <div>
          <h3 className="text-muted-foreground font-medium text-sm tracking-widest uppercase mb-1">{title}</h3>
          <p className={`font-display text-4xl font-bold ${textColors[variant]}`}>
            {value}
          </p>
        </div>
      </div>
      
      {/* Decorative corner accents */}
      <div className={`absolute top-0 left-0 w-2 h-2 border-t border-l ${borderColors[variant]}`}></div>
      <div className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r ${borderColors[variant]}`}></div>
    </motion.div>
  );
}
