"use client";

import Layout from "@/components/Layout";

export default function IoTPlatformPage() {
  return (
    <Layout>
      <main
        style={{
          flex: 1,
          padding: 24,
          background: "#f5f5f5",
          overflow: "auto",
        }}
      >
        <h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>
          物联网平台（IoT Platform）
        </h1>
        <p style={{ fontSize: 13, color: "#666", marginBottom: 24 }}>
          面向选矿生产和矿山设备的物联网接入与管理平台，提供设备管理、协议管理、设备状态监控、数据订阅推送等能力，支撑“万物互联”的智慧矿山场景。
        </p>

        {/* 基础功能概览 */}
        <section
          style={{
            marginBottom: 24,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
          }}
        >
          {[{
            title: "设备管理",
            desc: "统一管理破碎、磨矿、浮选、脱水等工艺设备及其传感器、控制点和通信参数。",
          },
          {
            title: "协议管理",
            desc: "支持 Modbus、OPC UA、MQTT 等多种工业协议，适配 DCS、PLC、智能仪表等控制系统。",
          },
          {
            title: "设备状态监控",
            desc: "实时采集关键设备电流、温度、压力、转速等运行参数，支持告警与趋势分析。",
          },
          {
            title: "数据订阅与推送",
            desc: "支持按设备、车间、工艺段订阅实时数据流，向生产运营平台、数据集成平台推送。",
          }].map((card) => (
            <div
              key={card.title}
              style={{
                background: "#fff",
                borderRadius: 8,
                padding: 16,
                border: "1px solid #eee",
              }}
            >
              <h2 style={{ fontSize: 14, fontWeight: 600, margin: 0, marginBottom: 8 }}>
                {card.title}
              </h2>
              <p style={{ fontSize: 12, color: "#666", margin: 0 }}>{card.desc}</p>
            </div>
          ))}
        </section>

        {/* 万物互联能力 */}
        <section style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>设备状态监控 · 万物互联能力</h2>
          <p style={{ fontSize: 12, color: "#666", marginBottom: 12 }}>
            通过与 DCS、PLC 等控制系统无缝集成，实现关键生产设备和在线分析仪的统一监控与数据采集。
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 16,
            }}
          >
            <div
              style={{
                background: "#fff",
                borderRadius: 8,
                padding: 16,
                border: "1px solid #eee",
              }}
            >
              <h3 style={{ fontSize: 14, fontWeight: 600, margin: 0, marginBottom: 8 }}>
                控制系统接入（DCS / PLC）
              </h3>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12, color: "#666" }}>
                <li>支持主流 DCS、PLC 系统点表导入与组态。</li>
                <li>采集破碎机、球磨机、浮选机、浓密机等关键设备运行参数。</li>
                <li>典型参数：电流、电压、转速、温度、压力、频率、阀位等。</li>
              </ul>
            </div>

            <div
              style={{
                background: "#fff",
                borderRadius: 8,
                padding: 16,
                border: "1px solid #eee",
              }}
            >
              <h3 style={{ fontSize: 14, fontWeight: 600, margin: 0, marginBottom: 8 }}>
                在线分析仪数据接入
              </h3>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12, color: "#666" }}>
                <li>支持在线粒度仪、在线品位分析仪（如 XRF）、pH 计、浓度计等接入。</li>
                <li>按采样周期采集实时数据，形成工艺指标时间序列。</li>
                <li>异常波动自动推送至选矿生产安环管理与数据集成平台。</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 示例监控视图（简化版） */}
        <section>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>示例：关键设备与在线仪表监控一览</h2>
          <div
            style={{
              background: "#fff",
              borderRadius: 8,
              padding: 16,
              border: "1px solid #eee",
              overflowX: "auto",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead style={{ background: "#fafafa" }}>
                <tr>
                  {["类型", "设备/仪表", "所属系统", "关键参数", "状态"].map((h) => (
                    <th
                      key={h}
                      style={{
                        textAlign: "left",
                        padding: "8px 12px",
                        borderBottom: "1px solid #eee",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    type: "关键设备",
                    name: "一段颚式破碎机",
                    system: "破碎 DCS",
                    metrics: "电流 320A / 振动 2.1mm/s / 温度 62℃",
                    status: "运行",
                  },
                  {
                    type: "关键设备",
                    name: "一段球磨机",
                    system: "磨矿 DCS",
                    metrics: "电流 480A / 压力 0.35MPa / 频率 47Hz",
                    status: "运行",
                  },
                  {
                    type: "在线分析仪",
                    name: "在线粒度仪",
                    system: "磨矿工艺在线分析",
                    metrics: "P80 74μm / 刷新周期 30s",
                    status: "正常",
                  },
                  {
                    type: "在线分析仪",
                    name: "在线品位分析仪（XRF）",
                    system: "精矿品位在线监测",
                    metrics: "Fe 65.3% / 刷新周期 60s",
                    status: "正常",
                  },
                  {
                    type: "在线分析仪",
                    name: "pH 计 + 浓度计",
                    system: "浮选药剂控制",
                    metrics: "pH 8.2 / 浓度 32%",
                    status: "正常",
                  },
                ].map((row, idx) => (
                  <tr key={idx}>
                    <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{row.type}</td>
                    <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{row.name}</td>
                    <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{row.system}</td>
                    <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{row.metrics}</td>
                    <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{row.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </Layout>
  );
}
