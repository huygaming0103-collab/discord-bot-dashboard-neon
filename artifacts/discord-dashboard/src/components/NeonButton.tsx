import React from "react";
import { motion } from "framer-motion";

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent";
  glow?: boolean;
  href?: string;
  children: React.ReactNode;
}

export function NeonButton({ 
  variant = "primary", 
  glow = true, 
  href, 
  children, 
  className = "",
  ...props 
}: NeonButtonProps) {
  const baseClasses = "relative inline-flex items-center justify-center px-8 py-4 font-display font-bold tracking-widest uppercase transition-all duration-300 rounded-sm overflow-hidden group";
  
  const variants = {
    primary: "text-primary border border-primary hover:text-white hover:bg-primary",
    secondary: "text-secondary border border-secondary hover:text-black hover:bg-secondary",
    accent: "text-accent border border-accent hover:text-white hover:bg-accent",
  };
  
  const glows = {
    primary: "neon-glow-primary",
    secondary: "neon-glow-secondary",
    accent: "neon-glow-accent",
  };

  const Component = href ? "a" : "button";
  
  return (
    <Component 
      href={href}
      className={`${baseClasses} ${variants[variant]} ${glow ? `hover:${glows[variant]}` : ""} ${className}`}
      {...(props as any)}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <div className={`absolute inset-0 z-0 bg-current opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
      
      {/* Scanline effect on hover */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
    </Component>
  );
}
