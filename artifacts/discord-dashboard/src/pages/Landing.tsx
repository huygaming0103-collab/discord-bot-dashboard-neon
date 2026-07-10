import React from "react";
import { motion } from "framer-motion";
import { NavBar } from "@/components/NavBar";
import { useGetBotStats } from "@workspace/api-client-react";
import {
  Zap, Users, Shield, Music, Trophy, Coins,
  Server, MessageSquare, Code, Bot
} from "lucide-react";

const INVITE_URL =
  "https://discord.com/oauth2/authorize?client_id=1446826370838560859&permissions=8&integration_type=0&scope=bot+applications.commands";
const SUPPORT_URL = "https://discord.gg/your-server"; // thay bằng link server hỗ trợ thật

const FEATURES = [
  {
    icon: Coins,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    border: "border-yellow-400/20",
    title: "Hệ thống Economy",
    desc: "Kiếm tiền, mua bán, đầu tư — nền kinh tế ảo hấp dẫn dành riêng cho server của bạn.",
  },
  {
    icon: Trophy,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    border: "border-cyan-400/20",
    title: "Minigame tương tác",
    desc: "Tài xỉu, bầu cua, đua thú — hàng chục minigame giữ chân người dùng mỗi ngày.",
  },
  {
    icon: Shield,
    color: "text-green-400",
    bg: "bg-green-400/10",
    border: "border-green-400/20",
    title: "Kiểm duyệt thông minh",
    desc: "Lọc spam, từ ngữ xấu, auto-mod linh hoạt giúp server luôn sạch và an toàn.",
  },
  {
    icon: Music,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "border-purple-400/20",
    title: "Phát nhạc chất lượng",
    desc: "Phát nhạc từ YouTube, Spotify với chất lượng cao và không giật lag.",
  },
  {
    icon: MessageSquare,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20",
    title: "Lệnh phong phú",
    desc: "Hơn 100 lệnh tiện ích từ thông tin, giải trí đến quản lý server chuyên nghiệp.",
  },
  {
    icon: Bot,
    color: "text-pink-400",
    bg: "bg-pink-400/10",
    border: "border-pink-400/20",
    title: "Cài đặt linh hoạt",
    desc: "Tuỳ chỉnh prefix, kênh, quyền — mọi thứ theo ý bạn qua dashboard dễ dùng.",
  },
];

// Discord icon SVG inline
function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.001.022.015.043.03.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
    </svg>
  );
}

export function Landing() {
  const { data: stats } = useGetBotStats();

  return (
    <div className="min-h-screen flex flex-col bg-[#070c18] text-white relative overflow-hidden">

      {/* Dot grid background */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(0,255,157,0.13) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Gradient overlay to fade dots near bottom */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-b from-transparent via-transparent to-[#070c18]/80" />

      <NavBar />

      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative z-10 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-6 py-28 w-full">
          <div className="max-w-2xl">

            {/* Version badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-yellow-400/40 bg-yellow-400/5 text-yellow-300 text-sm font-medium mb-8 w-fit"
            >
              <Zap className="w-3.5 h-3.5 fill-yellow-300" />
              Phiên bản V1
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 tracking-tight"
            >
              Nâng tầm Server Discord
              <br />
              <span className="text-cyan-400">Của bạn với HDGBot</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-400 text-lg leading-relaxed mb-10 max-w-xl"
            >
              Bot giải trí đa năng tích hợp hệ thống kinh tế (Economy) hấp dẫn
              và các minigame tương tác giữ lửa cho cộng đồng như Tài xỉu, Bầu cua,
              Đua thú. Hệ thống cày cuốc Đào mỏ, Câu cá chuyên sâu cùng kho vật
              phẩm đồ sộ đang chờ bạn khám phá.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4"
            >
              <a
                href={INVITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg"
              style={{
                background: "#00ff9d",
                color: "#071510",
                boxShadow: "0 0 20px rgba(0,255,157,0.35)",
              }}
              >
                <DiscordIcon className="w-5 h-5" />
                Mời Bot ngay
              </a>

              <a
                href={SUPPORT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white font-semibold px-6 py-3 rounded-xl border transition-all duration-200"
              style={{ borderColor: "rgba(0,255,157,0.2)" }}
              >
                <Users className="w-5 h-5" />
                Hỗ trợ (Discord)
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Stats Bar ────────────────────────────────────────── */}
      {stats && (
        <section className="relative z-10 border-t border-white/5 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-3 gap-6 text-center">
            {[
              { label: "Máy chủ", value: stats.guildCount?.toLocaleString() ?? "—", icon: Server },
              { label: "Người dùng", value: stats.userCount?.toLocaleString() ?? "—", icon: Users },
              { label: "Lệnh", value: stats.commandCount?.toLocaleString() ?? "—", icon: Code },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex flex-col items-center gap-1"
              >
                <s.icon className="w-5 h-5 mb-1" style={{ color: "#00ff9d" }} />
                <span className="text-2xl font-bold text-white">{s.value}</span>
                <span className="text-sm text-gray-500">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ─── Features ─────────────────────────────────────────── */}
      <section className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-6">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <h2 className="text-4xl font-extrabold mb-3">
              Tính năng <span style={{ color: "#00ff9d" }}>nổi bật</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-xl">
              Sáng tạo bởi người Việt, dành riêng cho cộng đồng Discord Việt Nam sôi động.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group rounded-2xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.06] p-6 transition-all duration-300"
              >
                <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl border ${f.bg} ${f.border} mb-5`}>
                  <f.icon className={`w-5 h-5 ${f.color}`} />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ───────────────────────────────────────── */}
      <section className="relative z-10 py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-extrabold mb-4">
              Sẵn sàng nâng cấp server?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Thêm HDGBot vào server và trải nghiệm ngay hôm nay — hoàn toàn miễn phí.
            </p>
            <a
              href={INVITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 text-base"
              style={{
                background: "#00ff9d",
                color: "#071510",
                boxShadow: "0 0 24px rgba(0,255,157,0.4)",
              }}
            >
              <DiscordIcon className="w-5 h-5" />
              Mời Bot ngay
            </a>
          </motion.div>
        </div>
      </section>

      {/* ─── Footer ───────────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <span className="text-white font-semibold">HDGBot</span>
            <span>— Bot Discord Việt Nam</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="/terms" className="hover:text-gray-300 transition-colors">Điều khoản</a>
            <a href="/privacy" className="hover:text-gray-300 transition-colors">Bảo mật</a>
            <a href={SUPPORT_URL} target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">Hỗ trợ</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
