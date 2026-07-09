import React from "react";
import { motion } from "framer-motion";
import { Users, Crown, Shield } from "lucide-react";
import { BotGuild, UserGuild } from "@workspace/api-client-react";

interface GuildCardProps {
  guild: BotGuild | UserGuild;
  delay?: number;
}

export function GuildCard({ guild, delay = 0 }: GuildCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className="bg-card/50 backdrop-blur-sm border border-primary/20 hover:border-primary/80 hover:neon-glow-primary rounded-xl p-5 transition-all duration-300 group flex items-center gap-4"
    >
      <div className="relative flex-shrink-0">
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        {guild.iconUrl ? (
          <img 
            src={guild.iconUrl} 
            alt={guild.name} 
            className="w-16 h-16 rounded-full border-2 border-primary/50 group-hover:border-primary relative z-10 transition-colors"
          />
        ) : (
          <div className="w-16 h-16 rounded-full border-2 border-primary/50 group-hover:border-primary bg-background flex items-center justify-center relative z-10 transition-colors">
            <span className="font-display font-bold text-2xl text-primary">
              {guild.name.charAt(0)}
            </span>
          </div>
        )}
      </div>
      
      <div className="flex-grow min-w-0">
        <h3 className="font-display font-bold text-lg text-foreground truncate group-hover:text-primary transition-colors">
          {guild.name}
        </h3>
        
        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
          {'memberCount' in guild && (
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-secondary" />
              <span>{guild.memberCount.toLocaleString()}</span>
            </div>
          )}
          
          {'botInstalled' in guild && (
            <div className="flex items-center gap-1.5">
              <Shield className={`w-4 h-4 ${guild.botInstalled ? 'text-secondary' : 'text-muted-foreground'}`} />
              <span className={guild.botInstalled ? 'text-secondary font-medium' : ''}>
                {guild.botInstalled ? 'Installed' : 'Not Installed'}
              </span>
            </div>
          )}
        </div>
      </div>
      
      {'botInstalled' in guild && !guild.botInstalled && (
        <a 
          href={`https://discord.com/oauth2/authorize?client_id=1446826370838560859&permissions=8&integration_type=0&scope=bot+applications.commands&guild_id=${guild.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 bg-primary/10 hover:bg-primary text-primary hover:text-white border border-primary px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-colors"
        >
          Invite
        </a>
      )}
    </motion.div>
  );
}
