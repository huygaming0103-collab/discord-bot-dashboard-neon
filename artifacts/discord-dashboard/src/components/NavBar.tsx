import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { LogIn, LogOut, LayoutDashboard, Terminal } from "lucide-react";
import { useGetMe, useLogout } from "@workspace/api-client-react";

export function NavBar() {
  const { data: user, isLoading } = useGetMe();
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        window.location.href = "/";
      },
    });
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-primary/20 neon-glow-primary"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="p-2 bg-primary/10 rounded-lg border border-primary/30 group-hover:neon-glow-primary transition-all duration-300">
            <Terminal className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
          </div>
          <span className="font-display font-bold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            HDGBot
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors neon-text-primary hover:text-shadow-sm">
            Bảng Điều Khiển
          </Link>
          <Link href="/guilds" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors neon-text-primary hover:text-shadow-sm">
            Máy Chủ
          </Link>
          
          <div className="h-6 w-px bg-border mx-2"></div>

          {isLoading ? (
            <div className="h-8 w-24 bg-primary/10 animate-pulse rounded-md" />
          ) : user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <img 
                  src={user.avatarUrl} 
                  alt={user.username} 
                  className="w-8 h-8 rounded-full border border-primary/50"
                />
                <span className="text-sm font-medium hidden md:block">
                  {user.username}
                </span>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <a 
              href="/api/auth/discord"
              className="flex items-center gap-2 bg-primary/20 hover:bg-primary/30 text-primary border border-primary hover:neon-glow-primary px-4 py-2 rounded-md transition-all duration-300 text-sm font-bold tracking-wide"
            >
              <LogIn className="w-4 h-4" />
              <span>ĐĂNG NHẬP</span>
            </a>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
