"use client";

import React, { useState } from "react";
import Layout from "@/components/Layout";

type MainTabKey = "planning" | "design" | "data";

type PlanHorizon = "short" | "long";

type MiningType = "openpit" | "underground";

interface PlanItem {
  id: string;
  miningType: MiningType;
  horizon: PlanHorizon;
  period: string;
  oreTonnage: number;
  wasteTonnage?: number;
  comment?: string;
}

const mockPlans: PlanItem[] = [
  {
    id: "P-2025-01",
    miningType: "openpit",
    horizon: "short",
    period: "2025年11月·周计划",
    oreTonnage: 4000,
    wasteTonnage: 8000,
    comment: "本周完成台阶回采+剥离超前1台阶",
  },
  {
    id: "P-2025-02",
    miningType: "underground",
    horizon: "short",
    period: "2025年11月·月计划",
    oreTonnage: 120000,
    comment: "重点推进采场1101、1102回采，控制贫化率<5%",
  },
  {
    id: "L-2030-01",
    miningType: "openpit",
    horizon: "long",
    period: "露天阶段（第1-2年）生命周期计划",
    oreTonnage: 3000000,
    wasteTonnage: 9000000,
    comment: "保证后续井下接替采场裸露条件",
  },
  {
    id: "L-2035-01",
    miningType: "underground",
    horizon: "long",
    period: "井下阶段（第3-10年）生命周期计划",
    oreTonnage: 12000000,
    comment: "按服务年限与能力约束平滑产量曲线",
  },
];

interface DrillBlastDesignItem {
  id: string;
  scene: "openpit" | "underground";
  name: string;
  holePattern: string;
  holeDepth: string;
  chargeStructure: string;
  unitExplosive: string;
}

const mockDrillBlast: DrillBlastDesignItem[] = [
  {
    id: "DB-OP-01",
    scene: "openpit",
    name: "露天台阶爆区 A-2025W45",
    holePattern: "台阶孔网 3.0m×3.5m",
    holeDepth: "12m",
    chargeStructure: "底部集中装药+分段装药",
    unitExplosive: "0.65 kg/m³",
  },
  {
    id: "DB-UG-01",
    scene: "underground",
    name: "1101采场分段回采设计",
    holePattern: "扇形孔+周边孔",
    holeDepth: "3.5m",
    chargeStructure: "控制周边孔装药量，限制围岩破坏",
    unitExplosive: "0.45 kg/m³",
  },
];

interface DailyProductionItem {
  id: string;
  date: string;
  shift: string;
  miningType: MiningType;
  benchOrStope: string;
  drillingMeters: number;
  blastHoles: number;
  oreTonnage: number;
  wasteTonnage: number;
  haulTrips: number;
}

const mockDaily: DailyProductionItem[] = [
  {
    id: "D-2025-11-18-1",
    date: "2025-11-18",
    shift: "早班",
    miningType: "openpit",
    benchOrStope: "露天工作台阶 1100m",
    drillingMeters: 260,
    blastHoles: 120,
    oreTonnage: 2100,
    wasteTonnage: 4800,
    haulTrips: 96,
  },
  {
    id: "D-2025-11-18-2",
    date: "2025-11-18",
    shift: "中班",
    miningType: "underground",
    benchOrStope: "井下采场 1101",
    drillingMeters: 180,
    blastHoles: 80,
    oreTonnage: 1900,
    wasteTonnage: 200,
    haulTrips: 62,
  },
];

interface RealtimeKpiItem {
  name: string;
  value: string;
  status: "normal" | "warning" | "critical";
}

const realtimeKpis: RealtimeKpiItem[] = [
  {
    name: "当前班次计划完成率",
    value: "82%",
    status: "normal",
  },
  {
    name: "关键设备利用率（铲装/运输）",
    value: "76%",
    status: "warning",
  },
  {
    name: "井下采场1101贫化率",
    value: "4.3%",
    status: "normal",
  },
  {
    name: "露天爆区安全预警",
    value: "0 条报警，2 条提醒",
    status: "normal",
  },
  {
    name: "井下瓦斯/顶板异常预警",
    value: "1 条黄色预警",
    status: "warning",
  },
];

function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: "6px 12px",
        borderRadius: 16,
        border: active ? "1px solid #1677ff" : "1px solid #d9d9d9",
        background: active ? "rgba(22, 119, 255, 0.08)" : "#fff",
        color: active ? "#1677ff" : "#595959",
        fontSize: 12,
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}

function Card({ title, extra, children }: { title: string; extra?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section
      style={{
        borderRadius: 8,
        border: "1px solid #f0f0f0",
        background: "#fff",
        padding: 16,
        marginBottom: 16,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: 14,
            fontWeight: 600,
            color: "#262626",
          }}
        >
          {title}
        </h2>
        {extra}
      </div>
      {children}
    </section>
  );
}

function Table({ headers, rows }: { headers: string[]; rows: (string | number)[][] }) {
  return (
    <div
      style={{
        borderRadius: 6,
        border: "1px solid #f0f0f0",
        overflow: "hidden",
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
        <thead style={{ background: "#fafafa" }}>
          <tr>
            {headers.map((h) => (
              <th
                key={h}
                style={{
                  textAlign: "left",
                  padding: "8px 12px",
                  borderBottom: "1px solid #f0f0f0",
                  whiteSpace: "nowrap",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx}>
              {row.map((cell, i) => (
                <td
                  key={i}
                  style={{
                    padding: "8px 12px",
                    borderBottom: "1px solid #f5f5f5",
                    whiteSpace: "nowrap",
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PlanningSection() {
  const [horizon, setHorizon] = useState<PlanHorizon>("short");
  const [miningType, setMiningType] = useState<MiningType>("openpit");

  const filtered = mockPlans.filter((p) => p.horizon === horizon && p.miningType === miningType);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <Chip
          label="短期计划（周/月）"
          active={horizon === "short"}
          onClick={() => setHorizon("short")}
        />
        <Chip
          label="中长期计划（年/生命周期）"
          active={horizon === "long"}
          onClick={() => setHorizon("long")}
        />
        <div style={{ width: 1, background: "#f0f0f0", margin: "0 8px" }} />
        <Chip
          label="露天采场"
          active={miningType === "openpit"}
          onClick={() => setMiningType("openpit")}
        />
        <Chip
          label="井下采场"
          active={miningType === "underground"}
          onClick={() => setMiningType("underground")}
        />
      </div>
      <Table
        headers={["计划编号", "期间/阶段", "矿种/工艺", "计划矿石量(t)", "计划剥离量(t)", "关键说明"]}
        rows={filtered.map((p) => [
          p.id,
          p.period,
          p.miningType === "openpit" ? "露天" : "井下",
          p.oreTonnage,
          p.wasteTonnage ?? "-",
          p.comment ?? "-",
        ])}
      />
    </div>
  );
}

function DesignSection() {
  const [scene, setScene] = useState<"openpit" | "underground">("openpit");

  const filtered = mockDrillBlast.filter((d) => d.scene === scene);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <Chip
          label="露天钻爆设计"
          active={scene === "openpit"}
          onClick={() => setScene("openpit")}
        />
        <Chip
          label="井下钻爆设计"
          active={scene === "underground"}
          onClick={() => setScene("underground")}
        />
      </div>
      <Table
        headers={["设计名称", "孔网参数", "孔深", "装药结构", "单位炸药单耗"]}
        rows={filtered.map((d) => [
          d.name,
          d.holePattern,
          d.holeDepth,
          d.chargeStructure,
          d.unitExplosive,
        ])}
      />
    </div>
  );
}

function DataSection() {
  const [subTab, setSubTab] = useState<
    "daily" | "realtime" | "efficiency" | "safety" | "dilution"
  >("daily");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        <Chip
          label="日生产数据录入 / 统计（挖运钻爆）"
          active={subTab === "daily"}
          onClick={() => setSubTab("daily")}
        />
        <Chip
          label="实时生产看板"
          active={subTab === "realtime"}
          onClick={() => setSubTab("realtime")}
        />
        <Chip
          label="生产效率分析模块"
          active={subTab === "efficiency"}
          onClick={() => setSubTab("efficiency")}
        />
        <Chip
          label="安全预警模块"
          active={subTab === "safety"}
          onClick={() => setSubTab("safety")}
        />
        <Chip
          label="井下贫化控制模块"
          active={subTab === "dilution"}
          onClick={() => setSubTab("dilution")}
        />
      </div>

      {subTab === "daily" && (
        <Card title="日生产数据总览（示例数据）">
          <Table
            headers={[
              "日期",
              "班次",
              "露天/井下",
              "工作面/采场",
              "钻进进尺(m)",
              "爆破眼数",
              "矿石量(t)",
              "剥离/废石量(t)",
              "运输车次",
            ]}
            rows={mockDaily.map((d) => [
              d.date,
              d.shift,
              d.miningType === "openpit" ? "露天" : "井下",
              d.benchOrStope,
              d.drillingMeters,
              d.blastHoles,
              d.oreTonnage,
              d.wasteTonnage,
              d.haulTrips,
            ])}
          />
        </Card>
      )}

      {subTab === "realtime" && (
        <Card title="实时生产监控与关键指标">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 12,
            }}
          >
            {realtimeKpis.map((kpi) => (
              <div
                key={kpi.name}
                style={{
                  padding: 12,
                  borderRadius: 6,
                  border: "1px solid #f0f0f0",
                  background:
                    kpi.status === "critical"
                      ? "#fff1f0"
                      : kpi.status === "warning"
                      ? "#fffbe6"
                      : "#f6ffed",
                }}
              >
                <div style={{ fontSize: 12, color: "#595959", marginBottom: 6 }}>{kpi.name}</div>
                <div style={{ fontSize: 18, fontWeight: 600, color: "#262626" }}>{kpi.value}</div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {subTab === "efficiency" && (
        <Card title="生产效率提升与操作准确性模块（示意）">
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12, color: "#595959" }}>
            <li>按设备统计单位产量、空转时间、待料/待装时间占比，识别瓶颈设备。</li>
            <li>对比计划钻进/爆破/采装/运输节拍，识别制约环节。</li>
            <li>将设计孔位/装药参数与实际执行数据对比，给出操作准确性统计。</li>
          </ul>
        </Card>
      )}

      {subTab === "safety" && (
        <Card title="生产安全预警模块（示意）">
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12, color: "#595959" }}>
            <li>接入露天边坡监测、井下瓦斯、顶板压力等安全监测数据。</li>
            <li>配置单指标和组合规则阈值，区分提醒/预警/报警三级。</li>
            <li>按采场/工作面展示过去24小时预警事件与处置闭环。</li>
          </ul>
        </Card>
      )}

      {subTab === "dilution" && (
        <Card title="井下贫化控制模块（示意）">
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12, color: "#595959" }}>
            <li>按采场/分段统计采出矿品位与设计品位的偏差，计算贫化率。</li>
            <li>将贫化异常与钻爆设计参数、采装范围、装载点位置关联分析。</li>
            <li>输出控制建议：优化孔网、装药量，收缩采矿轮廓，调整采装路线等。</li>
          </ul>
        </Card>
      )}
    </div>
  );
}

export default function MiningProductionDemoPage() {
  const [tab, setTab] = useState<MainTabKey>("planning");

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          flex: 1,
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          background: "#f5f5f5",
        }}
      >
        <aside
          style={{
            width: 220,
            padding: 16,
            borderRight: "1px solid #f0f0f0",
            background: "#fff",
          }}
        >
          <h1
            style={{
              fontSize: 16,
              fontWeight: 600,
              margin: "0 0 12px 0",
              color: "#262626",
            }}
          >
            露采/地采生产管理
          </h1>
          <div style={{ fontSize: 12, color: "#8c8c8c", marginBottom: 16 }}>
            面向露天+井下的一体化生产规划、设计与数据采集监控示意。
          </div>
          <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <button
              type="button"
              onClick={() => setTab("planning")}
              style={{
                textAlign: "left",
                padding: "8px 12px",
                borderRadius: 6,
                border: "none",
                background: tab === "planning" ? "#e6f4ff" : "transparent",
                color: tab === "planning" ? "#1677ff" : "#262626",
                cursor: "pointer",
                fontSize: 13,
              }}
            >
              生产规划（露天+井下）
            </button>
            <button
              type="button"
              onClick={() => setTab("design")}
              style={{
                textAlign: "left",
                padding: "8px 12px",
                borderRadius: 6,
                border: "none",
                background: tab === "design" ? "#e6f4ff" : "transparent",
                color: tab === "design" ? "#1677ff" : "#262626",
                cursor: "pointer",
                fontSize: 13,
              }}
            >
              设计功能（打钻+爆破）
            </button>
            <button
              type="button"
              onClick={() => setTab("data")}
              style={{
                textAlign: "left",
                padding: "8px 12px",
                borderRadius: 6,
                border: "none",
                background: tab === "data" ? "#e6f4ff" : "transparent",
                color: tab === "data" ? "#1677ff" : "#262626",
                cursor: "pointer",
                fontSize: 13,
              }}
            >
              生产数据采集与监控
            </button>
          </nav>
        </aside>

        <main
          style={{
            flex: 1,
            padding: 16,
            overflow: "auto",
          }}
        >
          {tab === "planning" && (
            <Card title="生产规划（露天+井下）">
              <PlanningSection />
            </Card>
          )}

          {tab === "design" && (
            <Card title="钻爆设计（露天+井下）">
              <DesignSection />
            </Card>
          )}

          {tab === "data" && <DataSection />}
        </main>
      </div>
    </Layout>
  );
}
