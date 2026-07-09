import React from "react";
import { Link } from "wouter";
import { NavBar } from "@/components/NavBar";
import { NeonButton } from "@/components/NeonButton";
import { motion } from "framer-motion";
import { Terminal, Zap, Shield, Activity, ArrowRight, Server, Code, Users } from "lucide-react";
import { useGetBotStats } from "@workspace/api-client-react";

export function Landing() {
  const { data: stats } = useGetBotStats();
  const inviteUrl = "https://discord.com/oauth2/authorize?client_id=1446826370838560859&permissions=8&integration_type=0&scope=bot+applications.commands";

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8b5cf611_1px,transparent_1px),linear-gradient(to_bottom,#8b5cf611_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>
      
      <NavBar />
      
      <main className="flex-grow flex flex-col items-center justify-center px-4 relative z-10 pt-20 pb-32">
        <div className="max-w-5xl mx-auto w-full text-center">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-8 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            SYSTEM ONLINE & SECURE
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl md:text-8xl font-display font-black tracking-tighter mb-6 leading-none"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary via-secondary to-accent neon-text-primary">
              CYBERBOT
            </span>
            <br />
            <span className="text-foreground">PROTOCOL</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12"
          >
            Next-generation moderation and utility infrastructure for advanced Discord networks.
            Power, precision, and perfect aesthetics.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-24"
          >
            <NeonButton href={inviteUrl} variant="primary" target="_blank" rel="noopener noreferrer">
              <Zap className="w-5 h-5 mr-2" />
              INTEGRATE NOW
            </NeonButton>
            
            <a 
              href="/api/auth/discord"
              className="text-muted-foreground hover:text-white flex items-center gap-2 font-display uppercase tracking-widest text-sm hover:neon-text-secondary transition-all"
            >
              Access Terminal <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left relative">
            <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full -z-10"></div>
            
            {[
              { label: "CONNECTED NETWORKS", value: stats?.guildCount?.toLocaleString() || "---", icon: Server, color: "primary" },
              { label: "ACTIVE IDENTITIES", value: stats?.userCount?.toLocaleString() || "---", icon: Users, color: "secondary" },
              { label: "COMMANDS PROCESSED", value: stats?.commandCount?.toLocaleString() || "---", icon: Code, color: "accent" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + (i * 0.1) }}
                className="bg-card/40 backdrop-blur-md border border-white/5 rounded-2xl p-6 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <stat.icon className={`w-16 h-16 text-${stat.color}`} />
                </div>
                <div className={`w-10 h-10 rounded-lg bg-${stat.color}/10 border border-${stat.color}/20 flex items-center justify-center mb-4`}>
                  <stat.icon className={`w-5 h-5 text-${stat.color}`} />
                </div>
                <h3 className="text-muted-foreground font-display text-sm tracking-widest mb-2">{stat.label}</h3>
                <div className={`text-4xl font-bold font-display neon-text-${stat.color} text-${stat.color}`}>
                  {stat.value}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}
