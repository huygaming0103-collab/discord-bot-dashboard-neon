import React from "react";
import { Link, useLocation } from "wouter";
import { LogIn, LogOut, LayoutDashboard, Server } from "lucide-react";
import { useGetMe, useLogout, useGetBotStats } from "@workspace/api-client-react";

const INVITE_URL =
  "https://discord.com/oauth2/authorize?client_id=1446826370838560859&permissions=8&integration_type=0&scope=bot+applications.commands";

const NAV_LINKS = [
  { label: "Trang chủ", href: "/" },
  { label: "Lệnh bot", href: "/commands" },
  { label: "Điều khoản", href: "/terms" },
  { label: "Bảo mật", href: "/privacy" },
];

export function NavBar() {
  const [location] = useLocation();
  const { data: user, isLoading } = useGetMe();
  const { data: stats } = useGetBotStats();
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => { window.location.href = "/"; },
    });
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0a0e1a]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          {stats?.botAvatarUrl ? (
            <img
              src={stats.botAvatarUrl}
              alt="HDGBot"
              className="w-9 h-9 rounded-full border-2 transition-colors"
              style={{ borderColor: "rgba(0,255,157,0.45)" }}
            />
          ) : (
            <div className="w-9 h-9 rounded-full border-2 flex items-center justify-center"
              style={{ background: "rgba(0,255,157,0.1)", borderColor: "rgba(0,255,157,0.4)" }}>
              <span className="text-xs font-bold" style={{ color: "#00ff9d" }}>H</span>
            </div>
          )}
          <span className="font-bold text-lg text-white tracking-wide">
            HDGBot
          </span>
        </Link>

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${
                location === link.href
                  ? "text-white font-medium"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {user && (
            <>
              <Link
                href="/dashboard"
                className={`text-sm transition-colors flex items-center gap-1.5 ${
                  location === "/dashboard" ? "text-white font-medium" : "text-gray-400 hover:text-white"
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                Dashboard
              </Link>
              <Link
                href="/guilds"
                className={`text-sm transition-colors flex items-center gap-1.5 ${
                  location === "/guilds" ? "text-white font-medium" : "text-gray-400 hover:text-white"
                }`}
              >
                <Server className="w-3.5 h-3.5" />
                Máy chủ
              </Link>
            </>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {isLoading ? (
            <div className="h-9 w-24 bg-white/5 animate-pulse rounded-lg" />
          ) : user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                {user.avatarUrl && (
                  <img
                    src={user.avatarUrl}
                    alt={user.username}
                    className="w-8 h-8 rounded-full border border-white/20"
                  />
                )}
                <span className="text-sm text-gray-300 hidden md:block">{user.username}</span>
              </div>
              <button
                onClick={handleLogout}
                title="Đăng xuất"
                className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <a
              href="/api/auth/discord"
              className="flex items-center gap-2 text-sm text-gray-300 hover:text-white px-4 py-2 rounded-lg border border-white/10 hover:border-white/20 transition-all"
            >
              <LogIn className="w-4 h-4" />
              Đăng nhập
            </a>
          )}

          <a
            href={INVITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg transition-all"
            style={{
              background: "#00ff9d",
              color: "#071510",
              boxShadow: "0 0 14px rgba(0,255,157,0.3)",
            }}
          >
            Mời bot ngay
          </a>
        </div>
      </div>
    </nav>
  );
}
