"use client";

import React, { useState } from "react";
import Layout from "@/components/Layout";
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
  const [subTab, setSubTab] = React.useState<'ledger' | 'plan' | 'energy' | 'economic'>('ledger');

  return (
    <div>
      <h2>选矿生产管理</h2>
      <p style={{ fontSize: 12, color: "#666", marginBottom: 12 }}>
        围绕碎矿、磨矿浮选、脱水等工艺段，记录处理量台账、能耗与精矿库存发运，支撑经济指标分析。
      </p>
      <KpiCards items={concentratorMock.kpis} />

      {/* 子 Tab 导航 */}
      <div style={{ display: 'flex', gap: 8, marginTop: 16, marginBottom: 16, borderBottom: '1px solid #eee' }}>
        {[
          { key: 'ledger', label: '生产台账' },
          { key: 'plan', label: '计划编制' },
          { key: 'energy', label: '能耗分析' },
          { key: 'economic', label: '经济指标' },
        ].map((t) => (
          <div
            key={t.key}
            onClick={() => setSubTab(t.key as 'ledger' | 'plan' | 'energy' | 'economic')}
            style={{
              padding: '8px 16px',
              cursor: 'pointer',
              borderBottom: subTab === t.key ? '2px solid #1677ff' : '2px solid transparent',
              color: subTab === t.key ? '#1677ff' : '#666',
              fontWeight: subTab === t.key ? 600 : 400,
              fontSize: 13,
            }}
          >
            {t.label}
          </div>
        ))}
      </div>

      {/* 子 Tab 内容 */}
      {subTab === 'ledger' && (
        <div>
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
      )}

      {subTab === 'plan' && (
        <div>
          <h3 style={{ marginTop: 16, marginBottom: 8 }}>生产计划列表</h3>
          <BasicTable
            headers={[
              "计划编号",
              "计划类型",
              "周期",
              "目标处理量(t)",
              "目标品位(%)",
              "目标回收率(%)",
              "状态",
              "制定人",
              "审批人",
              "制定时间",
            ]}
            rows={concentratorMock.productionPlans.map((p) => [
              p.id,
              p.type,
              p.period,
              p.targetTonnage,
              p.targetGrade,
              p.targetRecovery,
              p.status,
              p.createdBy,
              p.approvedBy || '-',
              p.createdAt,
            ])}
          />
          <div style={{ marginTop: 16, padding: 12, background: '#f0f9ff', borderRadius: 8, fontSize: 12 }}>
            <strong>操作说明：</strong>新建计划需填写周期、目标处理量、品位、回收率等指标，提交后由上级审批。审批通过后进入执行状态。
          </div>
        </div>
      )}

      {subTab === 'energy' && (
        <div>
          <h3 style={{ marginTop: 16, marginBottom: 8 }}>能耗趋势（最近7天）</h3>
          <BasicTable
            headers={[
              "日期",
              "电耗(kWh)",
              "水耗(m³)",
              "单位电耗成本(元/t)",
            ]}
            rows={concentratorMock.energyTrend.map((e) => [
              e.date,
              e.powerKwh,
              e.waterM3,
              e.unitPowerCost,
            ])}
          />

          {/* 简单的能耗趋势图（用 CSS 模拟柱状图） */}
          <h3 style={{ marginTop: 16, marginBottom: 8 }}>电耗趋势图</h3>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: 8,
              height: 160,
              padding: 16,
              background: '#fff',
              borderRadius: 8,
              border: '1px solid #eee',
            }}
          >
            {concentratorMock.energyTrend.map((e) => {
              const maxPower = 170000;
              const heightPercent = (e.powerKwh / maxPower) * 100;
              return (
                <div
                  key={e.date}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: `${heightPercent}%`,
                      background: '#1677ff',
                      borderRadius: '4px 4px 0 0',
                    }}
                  />
                  <div style={{ marginTop: 8, fontSize: 10, color: '#666' }}>
                    {e.date.slice(5)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {subTab === 'economic' && (
        <div>
          <h3 style={{ marginTop: 16, marginBottom: 8 }}>本月经济指标</h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 12,
              marginBottom: 16,
            }}
          >
            {[
              { label: '总成本', value: concentratorMock.economicIndicators.currentMonth.totalCost, unit: '元' },
              { label: '营收', value: concentratorMock.economicIndicators.currentMonth.revenue, unit: '元' },
              { label: '利润', value: concentratorMock.economicIndicators.currentMonth.profit, unit: '元' },
              { label: '利润率', value: concentratorMock.economicIndicators.currentMonth.profitMargin, unit: '%' },
              { label: '单位成本', value: concentratorMock.economicIndicators.currentMonth.unitCost, unit: '元/t' },
              { label: '单位营收', value: concentratorMock.economicIndicators.currentMonth.unitRevenue, unit: '元/t' },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  padding: 12,
                  background: '#fff',
                  borderRadius: 8,
                  border: '1px solid #eee',
                }}
              >
                <div style={{ fontSize: 12, color: '#666' }}>{item.label}</div>
                <div style={{ fontSize: 18, fontWeight: 600, marginTop: 4 }}>
                  {item.value.toLocaleString()}
                  <span style={{ fontSize: 12, marginLeft: 4 }}>{item.unit}</span>
                </div>
              </div>
            ))}
          </div>

          <h3 style={{ marginTop: 16, marginBottom: 8 }}>成本结构分析</h3>
          <BasicTable
            headers={["成本类别", "金额(元)", "占比(%)"]}
            rows={concentratorMock.economicIndicators.costBreakdown.map((c) => [
              c.category,
              c.amount.toLocaleString(),
              c.percentage,
            ])}
          />

          <h3 style={{ marginTop: 16, marginBottom: 8 }}>月度成本与利润率对比</h3>
          <BasicTable
            headers={["月份", "单位成本(元/t)", "利润率(%)"]}
            rows={concentratorMock.economicIndicators.monthlyComparison.map((m) => [
              m.month,
              m.unitCost,
              m.profitMargin,
            ])}
          />
        </div>
      )}
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
  const [tab, setTab] = React.useState<'dashboard' | 'reports' | 'reserves' | 'grade' | 'flow'>('dashboard');
  return (
    <div>
      <h2>矿山决策分析</h2>
      <p style={{ fontSize: 12, color: "#666", marginBottom: 12 }}>
        汇总资源、品位、成本和设备效率等指标，支撑集团级驾驶舱分析。
      </p>
      <KpiCards items={analyticsMock.kpis} />

      {/* Tab 导航 */}
      <div style={{ display: 'flex', gap: 8, marginTop: 8, marginBottom: 16, borderBottom: '1px solid #eee' }}>
        {[
          { key: 'dashboard', label: '驾驶舱' },
          { key: 'reports', label: '生产报表' },
          { key: 'reserves', label: '资源储量' },
          { key: 'grade', label: '供矿品位' },
          { key: 'flow', label: '矿石流执行' },
        ].map((t) => (
          <div
            key={t.key}
            onClick={() => setTab(t.key as 'dashboard' | 'reports' | 'reserves' | 'grade' | 'flow')}
            style={{
              padding: '8px 16px',
              cursor: 'pointer',
              borderBottom: tab === t.key ? '2px solid #1677ff' : '2px solid transparent',
              color: tab === t.key ? '#1677ff' : '#666',
              fontWeight: tab === t.key ? 600 : 400,
              fontSize: 13,
            }}
          >
            {t.label}
          </div>
        ))}
      </div>

      {tab === 'dashboard' && (
        <div>
          <h3 style={{ marginTop: 8, marginBottom: 8 }}>矿石流向</h3>
          <BasicTable
            headers={["来源", "矿量(t)", "平均品位(Fe, %)"]}
            rows={analyticsMock.oreFlow.map((o) => [o.source, o.tonnage, o.avgGradeFe])}
          />

          <h3 style={{ marginTop: 16, marginBottom: 8 }}>成本结构</h3>
          <BasicTable
            headers={["类别", "占比(%)"]}
            rows={analyticsMock.costBreakdown.map((c) => [c.category, c.value])}
          />
        </div>
      )}

      {tab === 'reports' && (
        <div>
          <h3 style={{ marginTop: 8, marginBottom: 8 }}>生产报表</h3>
          <BasicTable
            headers={["编号", "类型", "周期", "处理矿量(t)", "精矿(t)", "平均品位(%)", "回收率(%)", "开机率(%)", "状态", "生成时间"]}
            rows={analyticsMock.productionReports.map((r) => [
              r.id,
              r.type,
              r.period,
              r.oreTonnage,
              r.concentrateTonnage,
              r.avgGrade,
              r.recovery,
              r.equipmentAvailability,
              r.status,
              r.generatedAt,
            ])}
          />
          <div style={{ marginTop: 16, padding: 12, background: '#f0f9ff', borderRadius: 8, fontSize: 12 }}>
            <strong>功能说明：</strong>系统每日 8:00 自动生成日报，每周一生成周报，每月 1 日生成月报。报表可导出 Excel/PDF 格式。
          </div>
        </div>
      )}

      {tab === 'reserves' && (
        <div>
          <h3 style={{ marginTop: 8, marginBottom: 8 }}>三级储量结构</h3>
          <div style={{ marginBottom: 12, padding: 12, background: '#fff', borderRadius: 8, border: '1px solid #eee' }}>
            <div style={{ fontSize: 12, color: '#666' }}>总储量</div>
            <div style={{ fontSize: 24, fontWeight: 600, marginTop: 4 }}>
              {analyticsMock.resourceReserves.totalReserves.toLocaleString()}
              <span style={{ fontSize: 14, marginLeft: 4 }}>t</span>
            </div>
          </div>
          <BasicTable
            headers={["类别", "矿量(t)", "平均品位(Fe, %)", "占比(%)"]}
            rows={analyticsMock.resourceReserves.reserves.map((r) => [
              r.category,
              r.tonnage.toLocaleString(),
              r.avgGradeFe,
              r.percentage,
            ])}
          />

          <h3 style={{ marginTop: 16, marginBottom: 8 }}>月度消耗趋势</h3>
          <BasicTable
            headers={["月份", "消耗量(t)"]}
            rows={analyticsMock.resourceReserves.monthlyDepletion.map((m) => [m.month, m.depletion.toLocaleString()])}
          />
        </div>
      )}

      {tab === 'grade' && (
        <div>
          <h3 style={{ marginTop: 8, marginBottom: 8 }}>按来源供矿品位</h3>
          <BasicTable
            headers={["来源", "矿量(t)", "平均品位(Fe, %)", "波动系数"]}
            rows={analyticsMock.gradeAnalysis.bySource.map((s) => [
              s.source,
              s.tonnage.toLocaleString(),
              s.avgGradeFe,
              s.fluctuation,
            ])}
          />

          <h3 style={{ marginTop: 16, marginBottom: 8 }}>周度品位趋势</h3>
          <BasicTable
            headers={["周次", "平均品位(Fe, %)"]}
            rows={analyticsMock.gradeAnalysis.weeklyTrend.map((w) => [w.week, w.avgGradeFe])}
          />
        </div>
      )}

      {tab === 'flow' && (
        <div>
          <h3 style={{ marginTop: 8, marginBottom: 8 }}>矿石流转节点</h3>
          <BasicTable
            headers={["阶段", "矿量(t)", "平均品位(Fe, %)", "时间", "损失(t)", "回收率(%)"]}
            rows={analyticsMock.oreFlowTracking.map((f) => [
              f.stage,
              f.tonnage.toLocaleString(),
              f.avgGradeFe,
              f.timestamp,
              (f as any).loss?.toLocaleString() || '-',
              (f as any).recovery || '-',
            ])}
          />
          <div style={{ marginTop: 16, padding: 12, background: '#fff5f5', borderRadius: 8, fontSize: 12 }}>
            <strong>损失分析：</strong>从采场到选厂入口总损失 500t，损失率 0.95%。建议优化运输路线和装卸方式降低损耗。
          </div>
        </div>
      )}
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

const navIcons: Record<NavKey, string> = {
  geoInfo: '🌍',
  openPit: '⛏️',
  underground: '🕳️',
  concentrator: '🏭',
  lab: '🧪',
  equipment: '⚙️',
  analytics: '📈',
  safety: '🛡️',
  mobile: '📱',
};

export default function MiningOperationPage() {
  const [active, setActive] = useState<NavKey>("concentrator");

  return (
    <Layout>
      <div style={{ display: "flex", flex: 1, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", fontSize: 14 }}>
        {/* 左侧导航 */}
        <aside
          style={{
            width: 200,
            borderRight: "1px solid #e8e8e8",
            padding: "16px 0",
            background: "#fff",
            boxShadow: "2px 0 8px rgba(0,0,0,0.05)",
          }}
        >
          <div
            style={{
              padding: "8px 16px 16px",
              fontWeight: 600,
              fontSize: 14,
              color: "#333",
              borderBottom: "1px solid #f0f0f0",
              marginBottom: 8,
            }}
          >
            🏛️ 选矿生产安环管理
          </div>
          {navItems.map((item) => {
            const isActive = item.key === active;
            return (
              <div
                key={item.key}
                onClick={() => setActive(item.key)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 16px",
                  margin: "2px 8px",
                  cursor: "pointer",
                  borderRadius: 6,
                  background: isActive ? "#e6f4ff" : "transparent",
                  color: isActive ? "#1677ff" : "#666",
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 400,
                  transition: "all 0.2s",
                  borderLeft: isActive ? "3px solid #1677ff" : "3px solid transparent",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "#f5f5f5";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                <span style={{ fontSize: 16 }}>{navIcons[item.key]}</span>
                <span>{item.label}</span>
              </div>
            );
          })}
        </aside>

        {/* 右侧内容 */}
        <main
          style={{
            flex: 1,
            padding: 20,
            overflow: "auto",
            background: "#f5f7fa",
          }}
        >
          {renderSection(active)}
        </main>
      </div>
    </Layout>
  );
}
