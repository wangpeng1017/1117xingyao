"use client";

import React, { useState } from "react";
import {
  navItems,
  type NavKey,
  geoInfoMock,
  openPitMock,
  undergroundMock,
  concentratorMock,
  labMock,
  equipmentMock,
  analyticsMock,
  safetyMock,
  mobileMock,
} from "@/lib/miningMockData";

function KpiCards({
  items,
}: {
  items: { name: string; value: number | string; unit?: string }[];
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 16,
        marginBottom: 16,
      }}
    >
      {items.map((kpi) => (
        <div
          key={kpi.name}
          style={{
            padding: 16,
            borderRadius: 8,
            border: "1px solid #eee",
            background: "#fff",
          }}
        >
          <div style={{ fontSize: 12, color: "#666" }}>{kpi.name}</div>
          <div style={{ marginTop: 8, fontSize: 20, fontWeight: 600 }}>
            {kpi.value}
            {kpi.unit && (
              <span style={{ fontSize: 12, marginLeft: 4 }}>{kpi.unit}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function BasicTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: (string | number | null)[][];
}) {
  return (
    <div
      style={{
        borderRadius: 8,
        border: "1px solid #eee",
        overflow: "hidden",
        background: "#fff",
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
          {rows.map((row, idx) => (
            <tr key={idx}>
              {row.map((cell, i) => (
                <td
                  key={i}
                  style={{
                    padding: "8px 12px",
                    borderBottom: "1px solid #f0f0f0",
                    whiteSpace: "nowrap",
                  }}
                >
                  {cell ?? "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SectionGeoInfo() {
  return (
    <div>
      <h2>地质信息管理</h2>
      <p style={{ fontSize: 12, color: "#666", marginBottom: 12 }}>
        管理地勘项目、钻孔进度等基础地质信息，支撑生产运营一体化。
      </p>
      <h3 style={{ marginTop: 16, marginBottom: 8 }}>勘探项目</h3>
      <BasicTable
        headers={["项目编号", "项目名称", "业主", "施工单位", "阶段", "设计进尺(m)", "完成进尺(m)"]}
        rows={geoInfoMock.projects.map((p) => [
          p.id,
          p.name,
          p.owner,
          p.contractor,
          p.stage,
          p.plannedMeters,
          p.completedMeters,
        ])}
      />
    </div>
  );
}

function SectionOpenPit() {
  return (
    <div>
      <h2>露采生产管理</h2>
      <p style={{ fontSize: 12, color: "#666", marginBottom: 12 }}>
        同步采剥计划和生产台账，关注采剥比、贫化率等关键指标。
      </p>
      <KpiCards items={openPitMock.kpis} />
      <h3 style={{ marginTop: 16, marginBottom: 8 }}>采剥生产台账</h3>
      <BasicTable
        headers={[
          "日期",
          "台阶",
          "矿量(t)",
          "剥离量(m³)",
          "平均品位(Fe, %)",
          "贫化率(%)",
          "单耗(kg炸药/t)",
        ]}
        rows={openPitMock.dailyProduction.map((r) => [
          r.date,
          r.bench,
          r.oreTonnage,
          r.wasteTonnage,
          r.avgGradeFe,
          r.dilutionRate,
          r.powderFactor,
        ])}
      />
    </div>
  );
}

function SectionUnderground() {
  return (
    <div>
      <h2>地采生产管理</h2>
      <p style={{ fontSize: 12, color: "#666", marginBottom: 12 }}>
        管理掘进、采矿、充填任务与台账，监控采掘比等运营指标。
      </p>
      <KpiCards items={undergroundMock.kpis} />
      <h3 style={{ marginTop: 16, marginBottom: 8 }}>掘进台账</h3>
      <BasicTable
        headers={["日期", "巷道", "班次", "进尺(m)", "岩性", "施工方法", "备注"]}
        rows={undergroundMock.drivageLedger.map((r) => [
          r.date,
          r.roadway,
          r.shift,
          r.length,
          r.rockClass,
          r.drillingMethod,
          r.remark,
        ])}
      />

      <h3 style={{ marginTop: 16, marginBottom: 8 }}>采场台账</h3>
      <BasicTable
        headers={["采场", "方法", "日期", "采出矿量(t)", "平均品位(Fe, %)", "贫化率(%)", "是否充填"]}
        rows={undergroundMock.stopingLedger.map((r) => [
          r.stope,
          r.method,
          r.date,
          r.oreTonnage,
          r.avgGradeFe,
          r.dilutionRate,
          r.filling ? "是" : "否",
        ])}
      />
    </div>
  );
}

function SectionConcentrator() {
  return (
    <div>
      <h2>选矿生产管理</h2>
      <p style={{ fontSize: 12, color: "#666", marginBottom: 12 }}>
        围绕碎矿、磨矿浮选、脱水等工艺段，记录处理量台账、能耗与精矿库存发运，支撑经济指标分析。
      </p>
      <KpiCards items={concentratorMock.kpis} />

      <h3 style={{ marginTop: 16, marginBottom: 8 }}>工艺段运行概况</h3>
      <BasicTable
        headers={[
          "工艺段",
          "计划处理量(t)",
          "实际处理量(t)",
          "开机率(%)",
          "电耗(kWh/t)",
          "关键设备",
        ]}
        rows={concentratorMock.processSummary.map((s) => [
          s.section,
          s.plannedTonnage,
          s.actualTonnage,
          s.availability,
          s.energyKwhPerTon,
          s.keyEquipment,
        ])}
      />

      <h3 style={{ marginTop: 16, marginBottom: 8 }}>日计划执行台账</h3>
      <BasicTable
        headers={[
          "日期",
          "班次",
          "矿石类型",
          "计划处理量(t)",
          "实际处理量(t)",
          "入选品位(Fe, %)",
          "精矿品位(Fe, %)",
          "回收率(%)",
        ]}
        rows={concentratorMock.dailyPlanLedger.map((r) => [
          r.date,
          r.shift,
          r.oreType,
          r.plannedTonnage,
          r.actualTonnage,
          r.feedGradeFe,
          r.concentrateGradeFe,
          r.recovery,
        ])}
      />

      <h3 style={{ marginTop: 16, marginBottom: 8 }}>精矿库存与发运</h3>
      <BasicTable
        headers={["产品", "库位", "当前库存(t)", "安全库存(t)", "在途(t)", "最近发运日期", "最近发运量(t)"]}
        rows={concentratorMock.inventory.map((i) => [
          i.product,
          i.warehouse,
          i.currentStock,
          i.safetyStock,
          i.onTheWay,
          i.lastShipmentDate,
          i.lastShipmentTonnage,
        ])}
      />
    </div>
  );
}

function SectionLab() {
  return (
    <div>
      <h2>质检化验管理</h2>
      <p style={{ fontSize: 12, color: "#666", marginBottom: 12 }}>
        生成样品条码、管理送检与分析结果，并支持金属平衡表编制。
      </p>
      <KpiCards items={labMock.kpis} />

      <h3 style={{ marginTop: 16, marginBottom: 8 }}>样品列表</h3>
      <BasicTable
        headers={[
          "样品号",
          "条码",
          "物料类型",
          "来源",
          "项目",
          "状态",
          "Fe(%)",
          "SiO₂(%)",
          "S(%)",
          "受理时间",
          "出报告时间",
        ]}
        rows={labMock.samples.map((s) => [
          s.sampleId,
          s.barcode,
          s.materialType,
          s.source,
          s.project,
          s.status,
          s.fe,
          s.sio2,
          s.s,
          s.receivedAt,
          s.reportedAt,
        ])}
      />
    </div>
  );
}

function SectionEquipment() {
  return (
    <div>
      <h2>设备管理与预测性维护</h2>
      <p style={{ fontSize: 12, color: "#666", marginBottom: 12 }}>
        管理设备档案、运行与检修记录，引入传感器数据进行预测性维护预警。
      </p>
      <KpiCards items={equipmentMock.kpis} />

      <h3 style={{ marginTop: 16, marginBottom: 8 }}>设备台账</h3>
      <BasicTable
        headers={[
          "设备编号",
          "名称",
          "区域",
          "状态",
          "开机率(%)",
          "MTBF(h)",
          "上次检修",
          "下次检修",
          "振动(mm/s)",
          "温度(℃)",
        ]}
        rows={equipmentMock.equipmentList.map((e) => [
          e.id,
          e.name,
          e.area,
          e.status,
          e.availability,
          e.mtbfHours,
          e.lastMaintenance,
          e.nextMaintenance,
          e.vibrationMmS,
          e.tempCelsius,
        ])}
      />

      <h3 style={{ marginTop: 16, marginBottom: 8 }}>预测性预警</h3>
      <div
        style={{
          padding: 12,
          borderRadius: 8,
          border: "1px solid #eee",
          background: "#fff",
          fontSize: 12,
        }}
      >
        {equipmentMock.predictiveAlerts.map((a, idx) => (
          <div key={idx} style={{ marginBottom: 8 }}>
            <strong>{a.level}</strong> - {a.equipmentId} - {a.type}，预测
            {" "}
            {a.predictedFailureHours} 小时内可能故障。建议：{a.suggestion}
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionAnalytics() {
  return (
    <div>
      <h2>矿山决策分析</h2>
      <p style={{ fontSize: 12, color: "#666", marginBottom: 12 }}>
        汇总资源、品位、成本和设备效率等指标，支撑集团级驾驶舱分析。
      </p>
      <KpiCards items={analyticsMock.kpis} />

      <h3 style={{ marginTop: 16, marginBottom: 8 }}>矿石流向</h3>
      <BasicTable
        headers={["来源", "矿量(t)", "平均品位(Fe, %)"]}
        rows={analyticsMock.oreFlow.map((o) => [
          o.source,
          o.tonnage,
          o.avgGradeFe,
        ])}
      />
    </div>
  );
}

function SectionSafety() {
  return (
    <div>
      <h2>安全环保管理</h2>
      <p style={{ fontSize: 12, color: "#666", marginBottom: 12 }}>
        集成尾矿库监测、特殊作业票和隐患排查，实现安全环保一体化管理。
      </p>
      <KpiCards items={safetyMock.kpis} />

      <h3 style={{ marginTop: 16, marginBottom: 8 }}>尾矿库监测</h3>
      <BasicTable
        headers={["尾矿库", "水位(m)", "允许上限(m)", "pH", "浊度(NTU)", "更新时间"]}
        rows={safetyMock.tailingsMonitoring.map((t) => [
          t.dam,
          t.waterLevelM,
          t.maxAllowedM,
          t.ph,
          t.turbidity,
          t.lastUpdate,
        ])}
      />

      <h3 style={{ marginTop: 16, marginBottom: 8 }}>隐患排查</h3>
      <BasicTable
        headers={[
          "编号",
          "类型",
          "区域",
          "等级",
          "状态",
          "发现时间",
          "整改期限",
          "责任人",
        ]}
        rows={safetyMock.hazards.map((h) => [
          h.id,
          h.type,
          h.area,
          h.level,
          h.status,
          h.createdAt,
          h.dueDate,
          h.responsible,
        ])}
      />
    </div>
  );
}

function SectionMobile() {
  return (
    <div>
      <h2>移动端</h2>
      <p style={{ fontSize: 12, color: "#666", marginBottom: 12 }}>
        支持生产台账填报、设备点巡检、隐患上报及审批流转等移动作业场景。
      </p>

      <h3 style={{ marginTop: 16, marginBottom: 8 }}>待办事项</h3>
      <BasicTable
        headers={["类型", "标题", "所属模块", "截止时间", "状态"]}
        rows={mobileMock.todoList.map((t) => [
          t.type,
          t.title,
          t.module,
          t.deadline,
          t.status,
        ])}
      />

      <h3 style={{ marginTop: 16, marginBottom: 8 }}>审批任务</h3>
      <BasicTable
        headers={["单号", "类型", "申请人", "区域", "状态", "提交时间"]}
        rows={mobileMock.approvals.map((a) => [
          a.id,
          a.type,
          a.applicant,
          a.area,
          a.status,
          a.submittedAt,
        ])}
      />
    </div>
  );
}

function renderSection(key: NavKey) {
  switch (key) {
    case "geoInfo":
      return <SectionGeoInfo />;
    case "openPit":
      return <SectionOpenPit />;
    case "underground":
      return <SectionUnderground />;
    case "concentrator":
      return <SectionConcentrator />;
    case "lab":
      return <SectionLab />;
    case "equipment":
      return <SectionEquipment />;
    case "analytics":
      return <SectionAnalytics />;
    case "safety":
      return <SectionSafety />;
    case "mobile":
      return <SectionMobile />;
    default:
      return null;
  }
}

export default function MiningOperationPage() {
  const [active, setActive] = useState<NavKey>("concentrator");

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        fontSize: 14,
      }}
    >
      {/* 左侧导航 */}
      <aside
        style={{
          width: 220,
          borderRight: "1px solid #eee",
          padding: "16px 0",
          background: "#fafafa",
        }}
      >
        <div
          style={{
            padding: "0 16px 12px",
            fontWeight: 600,
            fontSize: 13,
          }}
        >
          选矿生产安环管理
        </div>
        {navItems.map((item) => {
          const activeStyle = item.key === active;
          return (
            <div
              key={item.key}
              onClick={() => setActive(item.key)}
              style={{
                padding: "8px 16px",
                cursor: "pointer",
                background: activeStyle ? "#e6f4ff" : "transparent",
                color: activeStyle ? "#1677ff" : "#333",
                fontSize: 13,
              }}
            >
              {item.label}
            </div>
          );
        })}
      </aside>

      {/* 右侧内容 */}
      <main
        style={{
          flex: 1,
          padding: 24,
          overflow: "auto",
          background: "#f5f5f5",
        }}
      >
        {renderSection(active)}
      </main>
    </div>
  );
}
