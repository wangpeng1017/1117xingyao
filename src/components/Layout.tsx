"use client";

import React from "react";
import Link from "next/link";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* 顶部导航栏 */}
      <header
        style={{
          height: 60,
          background: "linear-gradient(90deg, #1677ff 0%, #0052cc 100%)",
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          position: "sticky",
          top: 0,
          zIndex: 100,
          gap: 24,
        }}
      >
        <Link
          href="/"
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: 700,
            textDecoration: "none",
            marginRight: 40,
          }}
        >
          智慧矿山综合平台
        </Link>

        <nav style={{ display: "flex", gap: 24, flex: 1 }}>
          {[
            { label: "地质管理", href: "#", disabled: true },
            { label: "采矿管理", href: "#", disabled: true },
            { label: "选矿生产安环管理", href: "/mining", active: true },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={(e) => {
                if (item.disabled) e.preventDefault();
              }}
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: 14,
                padding: "8px 16px",
                borderRadius: 4,
                background: item.active ? "rgba(255,255,255,0.2)" : "transparent",
                opacity: item.disabled ? 0.5 : 1,
                cursor: item.disabled ? "not-allowed" : "pointer",
                transition: "background 0.2s",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Link
            href="/iot"
            style={{
              padding: "6px 12px",
              borderRadius: 16,
              background: "rgba(255,255,255,0.2)",
              color: "white",
              fontSize: 12,
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            物联网平台
          </Link>
          <Link
            href="/data-integration"
            style={{
              padding: "6px 12px",
              borderRadius: 16,
              background: "rgba(255,255,255,0.2)",
              color: "white",
              fontSize: 12,
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            数据集成平台
          </Link>

          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              🔔
            </div>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              👤
            </div>
            <span style={{ color: "white", fontSize: 14 }}>管理员</span>
          </div>
        </div>
      </header>

      {/* 主体内容 */}
      <div style={{ flex: 1, display: "flex" }}>{children}</div>
    </div>
  );
}
