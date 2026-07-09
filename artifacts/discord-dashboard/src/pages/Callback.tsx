import React, { useEffect } from "react";
import { motion } from "framer-motion";

export function Callback() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
      
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          animate={{ 
            rotate: 360,
            boxShadow: [
              "0 0 20px hsl(var(--primary) / 0.5)",
              "0 0 60px hsl(var(--primary) / 0.8)",
              "0 0 20px hsl(var(--primary) / 0.5)"
            ]
          }}
          transition={{ 
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          className="w-24 h-24 rounded-full border-b-2 border-r-2 border-primary border-t-2 border-t-transparent border-l-2 border-l-transparent"
        />
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <h2 className="text-2xl font-display font-bold tracking-[0.2em] text-primary neon-text-primary mb-2">
            AUTHENTICATING
          </h2>
          <div className="flex gap-1 justify-center h-4">
            <motion.div 
              animate={{ opacity: [0, 1, 0] }} 
              transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
              className="w-2 h-2 bg-secondary rounded-full"
            />
            <motion.div 
              animate={{ opacity: [0, 1, 0] }} 
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
              className="w-2 h-2 bg-secondary rounded-full"
            />
            <motion.div 
              animate={{ opacity: [0, 1, 0] }} 
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
              className="w-2 h-2 bg-secondary rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
