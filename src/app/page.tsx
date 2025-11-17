"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <div
        style={{
          textAlign: "center",
          color: "white",
          padding: "40px",
          maxWidth: "800px",
        }}
      >
        <h1
          style={{
            fontSize: 48,
            fontWeight: 700,
            marginBottom: 16,
            textShadow: "0 2px 10px rgba(0,0,0,0.2)",
          }}
        >
          星耀矿业集团
        </h1>
        <h2
          style={{
            fontSize: 24,
            fontWeight: 400,
            marginBottom: 40,
            opacity: 0.95,
          }}
        >
          安哥拉铜矿智慧采选一体化平台
        </h2>
        <p
          style={{
            fontSize: 16,
            marginBottom: 40,
            opacity: 0.9,
            lineHeight: 1.6,
          }}
        >
          面向星耀矿业集团安哥拉新购铜矿，覆盖前 2 年露天、后 8 年地下的全生命周期，支撑年处理 150 万吨、日处理 4000 吨矿石的采选一体化、安环与集团决策管理。
        </p>

        <Link
          href="/mining"
          style={{
            display: "inline-block",
            padding: "16px 48px",
            fontSize: 18,
            fontWeight: 600,
            color: "#667eea",
            background: "white",
            borderRadius: 12,
            textDecoration: "none",
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 6px 30px rgba(0,0,0,0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.15)";
          }}
        >
          进入选矿生产安环管理系统
        </Link>

        <div
          style={{
            marginTop: 60,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: 20,
            opacity: 0.9,
          }}
        >
          <div>
            <div style={{ fontSize: 32, fontWeight: 700 }}>150万t</div>
            <div style={{ fontSize: 14, marginTop: 4 }}>设计年处理能力</div>
          </div>
          <div>
            <div style={{ fontSize: 32, fontWeight: 700 }}>4000t</div>
            <div style={{ fontSize: 14, marginTop: 4 }}>日处理矿石能力</div>
          </div>
          <div>
            <div style={{ fontSize: 32, fontWeight: 700 }}>50万t</div>
            <div style={{ fontSize: 14, marginTop: 4 }}>金属铜资源量</div>
          </div>
        </div>
      </div>
    </div>
  );
}
