import React, { useState } from "react";
import { Redirect } from "wouter";
import { NavBar } from "@/components/NavBar";
import { GuildCard } from "@/components/GuildCard";
import { motion, AnimatePresence } from "framer-motion";
import { Server, Search, CheckCircle, ShieldAlert } from "lucide-react";
import { useGetMe, useGetBotGuilds, useGetUserGuilds } from "@workspace/api-client-react";

export function Guilds() {
  const { data: user, isLoading: isUserLoading, isError: isUserError } = useGetMe();
  const { data: botGuilds, isLoading: isBotGuildsLoading } = useGetBotGuilds();
  const { data: userGuilds, isLoading: isUserGuildsLoading } = useGetUserGuilds();
  
  const [activeTab, setActiveTab] = useState<"bot" | "user">("bot");
  const [searchQuery, setSearchQuery] = useState("");

  if (isUserLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-secondary/20 border-t-secondary rounded-full animate-spin neon-glow-secondary"></div>
      </div>
    );
  }

  if (isUserError || !user) {
    return <Redirect to="/" />;
  }

  const currentGuilds = activeTab === "bot" ? botGuilds : userGuilds;
  const isLoading = activeTab === "bot" ? isBotGuildsLoading : isUserGuildsLoading;

  const filteredGuilds = currentGuilds?.filter(g => 
    g.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavBar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground mb-2 flex items-center gap-3">
              <Server className="w-8 h-8 text-secondary" />
              NETWORK <span className="text-secondary neon-text-secondary">INDEX</span>
            </h1>
            <p className="text-muted-foreground">Manage and view connected server networks.</p>
          </div>
          
          <div className="flex bg-card/80 p-1 rounded-lg border border-white/5">
            <button
              onClick={() => setActiveTab("bot")}
              className={`px-6 py-2 rounded-md font-display text-sm tracking-wide transition-all ${
                activeTab === "bot" 
                  ? "bg-primary/20 text-primary border border-primary neon-glow-primary" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              GLOBAL NETWORKS
            </button>
            <button
              onClick={() => setActiveTab("user")}
              className={`px-6 py-2 rounded-md font-display text-sm tracking-wide transition-all ${
                activeTab === "user" 
                  ? "bg-secondary/20 text-secondary border border-secondary neon-glow-secondary" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              YOUR SERVERS
            </button>
          </div>
        </div>

        <div className="relative mb-8 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <input
            type="text"
            placeholder="Search networks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-card/50 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/50 transition-all font-sans"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {isLoading ? (
            Array(9).fill(0).map((_, i) => (
              <div key={i} className="h-24 bg-card/40 rounded-xl border border-white/5 animate-pulse"></div>
            ))
          ) : filteredGuilds.length > 0 ? (
            <AnimatePresence mode="popLayout">
              {filteredGuilds.map((guild, i) => (
                <motion.div
                  layout
                  key={guild.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <GuildCard guild={guild} />
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            <div className="col-span-full py-20 text-center bg-card/20 rounded-xl border border-dashed border-muted flex flex-col items-center">
              <ShieldAlert className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
              <p className="text-xl font-display text-muted-foreground mb-2">NO NETWORKS FOUND</p>
              <p className="text-sm text-muted-foreground/70">
                {searchQuery ? "Try adjusting your search parameters." : "You don't have any networks in this category."}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
