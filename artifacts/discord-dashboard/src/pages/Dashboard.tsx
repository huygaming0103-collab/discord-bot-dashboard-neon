import React from "react";
import { Redirect } from "wouter";
import { NavBar } from "@/components/NavBar";
import { StatCard } from "@/components/StatCard";
import { GuildCard } from "@/components/GuildCard";
import { motion } from "framer-motion";
import { 
  Server, Users, Code, Activity, Clock, ShieldAlert,
  ChevronRight
} from "lucide-react";
import { useGetMe, useGetBotStats, useGetBotGuilds } from "@workspace/api-client-react";

export function Dashboard() {
  const { data: user, isLoading: isUserLoading, isError: isUserError } = useGetMe();
  const { data: stats, isLoading: isStatsLoading } = useGetBotStats();
  const { data: guilds, isLoading: isGuildsLoading } = useGetBotGuilds();

  if (isUserLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin neon-glow-primary"></div>
        <div className="mt-8 font-display tracking-[0.2em] text-primary animate-pulse">INITIALIZING SECURE CONNECTION...</div>
      </div>
    );
  }

  if (isUserError || !user) {
    return <Redirect to="/" />;
  }

  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / (3600*24));
    const hrs = Math.floor(seconds % (3600*24) / 3600);
    const mins = Math.floor(seconds % 3600 / 60);
    return `${days}d ${hrs}h ${mins}m`;
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <main className="container mx-auto px-4 py-12">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-primary/20 pb-6">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 mb-2"
            >
              {stats?.botAvatarUrl ? (
                <img src={stats.botAvatarUrl} alt="Bot Avatar" className="w-12 h-12 rounded-lg border border-primary neon-glow-primary" />
              ) : (
                <div className="w-12 h-12 rounded-lg bg-primary/20 border border-primary flex items-center justify-center">
                  <Activity className="text-primary w-6 h-6" />
                </div>
              )}
              <div>
                <h1 className="text-4xl font-display font-bold text-foreground">
                  {stats?.botName || "CYBERBOT"} <span className="text-primary/50 text-2xl">TERMINAL</span>
                </h1>
              </div>
            </motion.div>
            <p className="text-muted-foreground flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary neon-glow-secondary"></span>
              System Status: Nominal
            </p>
          </div>
          
          <div className="flex items-center gap-4 text-sm font-display tracking-widest text-muted-foreground bg-card/50 p-4 rounded-lg border border-white/5">
            <div className="flex flex-col items-end">
              <span className="uppercase text-[10px] text-primary">Latency</span>
              <span className="text-foreground flex items-center gap-2">
                {stats?.ping || 0}ms <Activity className="w-4 h-4 text-secondary" />
              </span>
            </div>
            <div className="w-px h-8 bg-border"></div>
            <div className="flex flex-col items-end">
              <span className="uppercase text-[10px] text-primary">Uptime</span>
              <span className="text-foreground flex items-center gap-2">
                {stats ? formatUptime(stats.uptime) : "0d 0h 0m"} <Clock className="w-4 h-4 text-secondary" />
              </span>
            </div>
          </div>
        </header>

        <section className="mb-16">
          <h2 className="text-xl font-display tracking-widest text-primary mb-6 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5" /> TELEMETRY DATA
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard 
              title="Connected Networks" 
              value={stats?.guildCount?.toLocaleString() || 0} 
              icon={Server} 
              variant="primary" 
              delay={0.1} 
            />
            <StatCard 
              title="Active Identities" 
              value={stats?.userCount?.toLocaleString() || 0} 
              icon={Users} 
              variant="secondary" 
              delay={0.2} 
            />
            <StatCard 
              title="Commands Processed" 
              value={stats?.commandCount?.toLocaleString() || 0} 
              icon={Code} 
              variant="accent" 
              delay={0.3} 
            />
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-display tracking-widest text-primary flex items-center gap-2">
              <Server className="w-5 h-5" /> RECENT NETWORKS
            </h2>
            <a href="/guilds" className="text-sm font-display text-muted-foreground hover:text-secondary flex items-center gap-1 transition-colors group">
              VIEW ALL <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {isGuildsLoading ? (
              Array(6).fill(0).map((_, i) => (
                <div key={i} className="h-24 bg-card/40 rounded-xl border border-white/5 animate-pulse"></div>
              ))
            ) : guilds && guilds.length > 0 ? (
              guilds.slice(0, 6).map((guild, i) => (
                <GuildCard key={guild.id} guild={guild} delay={0.4 + (i * 0.05)} />
              ))
            ) : (
              <div className="col-span-full py-12 text-center bg-card/30 rounded-xl border border-dashed border-muted">
                <p className="text-muted-foreground font-display">No network connections found.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
