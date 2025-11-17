"use client";

import React, { useState } from "react";
import Layout from "@/components/Layout";
import {
  navItems,
  type NavKey,
  type ProductionPlan,
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
import { digitalTwinMock } from "@/lib/digitalTwinMockData";

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
  const [projects, setProjects] = React.useState(geoInfoMock.projects);

  const handleAddProject = () => {
    const id = window.prompt('项目编号', '');
    if (!id) return;
    const name = window.prompt('项目名称', '') || '';
    const owner = window.prompt('业主', '') || '';
    const contractor = window.prompt('施工单位', '') || '';
    const stage = window.prompt('阶段', '设计中') || '设计中';
    const plannedMetersInput = window.prompt('设计进尺(m)', '0');
    const completedMetersInput = window.prompt('完成进尺(m)', '0');

    const plannedMeters = plannedMetersInput ? Number(plannedMetersInput) || 0 : 0;
    const completedMeters = completedMetersInput ? Number(completedMetersInput) || 0 : 0;

    setProjects((prev) => [
      ...prev,
      {
        id,
        name,
        owner,
        contractor,
        stage,
        plannedMeters,
        completedMeters,
        startDate: '',
        endDate: '',
      },
    ]);
  };

  const handleEditProject = (project: (typeof geoInfoMock.projects)[number]) => {
    const name = window.prompt('项目名称', project.name) || project.name;
    const owner = window.prompt('业主', project.owner) || project.owner;
    const contractor = window.prompt('施工单位', project.contractor) || project.contractor;
    const stage = window.prompt('阶段', project.stage) || project.stage;
    const plannedMetersInput = window.prompt('设计进尺(m)', String(project.plannedMeters));
    const completedMetersInput = window.prompt('完成进尺(m)', String(project.completedMeters));

    const plannedMeters = plannedMetersInput ? Number(plannedMetersInput) || project.plannedMeters : project.plannedMeters;
    const completedMeters = completedMetersInput ? Number(completedMetersInput) || project.completedMeters : project.completedMeters;

    setProjects((prev) =>
      prev.map((p) =>
        p.id === project.id
          ? {
              ...p,
              name,
              owner,
              contractor,
              stage,
              plannedMeters,
              completedMeters,
            }
          : p,
      ),
    );
  };

  const handleDeleteProject = (id: string) => {
    if (!window.confirm('确定要删除该勘探项目吗？')) return;
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div>
      <h2>地质信息管理</h2>
      <p style={{ fontSize: 12, color: "#666", marginBottom: 12 }}>
        管理地勘项目、钻孔进度等基础地质信息，支撑生产运营一体化。
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 16,
          marginBottom: 8,
        }}
      >
        <h3 style={{ margin: 0 }}>勘探项目</h3>
        <button
          type="button"
          onClick={handleAddProject}
          style={{
            padding: "6px 12px",
            fontSize: 12,
            borderRadius: 4,
            border: "1px solid #1677ff",
            background: "#1677ff",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          新建项目
        </button>
      </div>

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
              {["项目编号", "项目名称", "业主", "施工单位", "阶段", "设计进尺(m)", "完成进尺(m)", "操作"].map((h) => (
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
            {projects.map((p) => (
              <tr key={p.id}>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{p.id}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{p.name}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{p.owner}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{p.contractor}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{p.stage}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{p.plannedMeters}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{p.completedMeters}</td>
                <td
                  style={{
                    padding: "8px 12px",
                    borderBottom: "1px solid #f0f0f0",
                    whiteSpace: "nowrap",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => handleEditProject(p)}
                    style={{
                      padding: "4px 8px",
                      fontSize: 12,
                      marginRight: 8,
                      borderRadius: 4,
                      border: "1px solid #1677ff",
                      background: "#1677ff",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    编辑
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteProject(p.id)}
                    style={{
                      padding: "4px 8px",
                      fontSize: 12,
                      borderRadius: 4,
                      border: "1px solid #ff4d4f",
                      background: "#fff",
                      color: "#ff4d4f",
                      cursor: "pointer",
                    }}
                  >
                    删除
                  </button>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  style={{ padding: "12px 0", textAlign: "center", color: "#999" }}
                >
                  暂无项目，请先新建。
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SectionOpenPit() {
  const [dailyProduction, setDailyProduction] = React.useState(openPitMock.dailyProduction);

  const handleAddRecord = () => {
    const date = window.prompt('日期', '2025-11-16');
    if (!date) return;
    const bench = window.prompt('台阶', '') || '';
    const oreTonnageInput = window.prompt('矿量(t)', '0');
    const wasteTonnageInput = window.prompt('剥离量(m³)', '0');
    const avgGradeFeInput = window.prompt('平均品位(Fe, %)', '0');
    const dilutionRateInput = window.prompt('贫化率(%)', '0');
    const powderFactorInput = window.prompt('单耗(kg炸药/t)', '0');

    setDailyProduction((prev) => [
      ...prev,
      {
        date,
        bench,
        oreTonnage: oreTonnageInput ? Number(oreTonnageInput) || 0 : 0,
        wasteTonnage: wasteTonnageInput ? Number(wasteTonnageInput) || 0 : 0,
        avgGradeFe: avgGradeFeInput ? Number(avgGradeFeInput) || 0 : 0,
        dilutionRate: dilutionRateInput ? Number(dilutionRateInput) || 0 : 0,
        powderFactor: powderFactorInput ? Number(powderFactorInput) || 0 : 0,
      },
    ]);
  };

  const handleEditRecord = (record: (typeof openPitMock.dailyProduction)[number]) => {
    const bench = window.prompt('台阶', record.bench) || record.bench;
    const oreTonnageInput = window.prompt('矿量(t)', String(record.oreTonnage));
    const wasteTonnageInput = window.prompt('剥离量(m³)', String(record.wasteTonnage));
    const avgGradeFeInput = window.prompt('平均品位(Fe, %)', String(record.avgGradeFe));
    const dilutionRateInput = window.prompt('贫化率(%)', String(record.dilutionRate));
    const powderFactorInput = window.prompt('单耗(kg炸药/t)', String(record.powderFactor));

    setDailyProduction((prev) =>
      prev.map((r) =>
        r.date === record.date && r.bench === record.bench
          ? {
              ...r,
              bench,
              oreTonnage: oreTonnageInput ? Number(oreTonnageInput) || record.oreTonnage : record.oreTonnage,
              wasteTonnage: wasteTonnageInput ? Number(wasteTonnageInput) || record.wasteTonnage : record.wasteTonnage,
              avgGradeFe: avgGradeFeInput ? Number(avgGradeFeInput) || record.avgGradeFe : record.avgGradeFe,
              dilutionRate: dilutionRateInput ? Number(dilutionRateInput) || record.dilutionRate : record.dilutionRate,
              powderFactor: powderFactorInput ? Number(powderFactorInput) || record.powderFactor : record.powderFactor,
            }
          : r,
      ),
    );
  };

  const handleDeleteRecord = (record: (typeof openPitMock.dailyProduction)[number]) => {
    if (!window.confirm('确定要删除该采剥记录吗？')) return;
    setDailyProduction((prev) =>
      prev.filter((r) => !(r.date === record.date && r.bench === record.bench)),
    );
  };

  return (
    <div>
      <h2>露采生产管理</h2>
      <p style={{ fontSize: 12, color: "#666", marginBottom: 12 }}>
        同步采剥计划和生产台账，关注采剥比、贫化率等关键指标。
      </p>
      <KpiCards items={openPitMock.kpis} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 16,
          marginBottom: 8,
        }}
      >
        <h3 style={{ margin: 0 }}>采剥生产台账</h3>
        <button
          type="button"
          onClick={handleAddRecord}
          style={{
            padding: "6px 12px",
            fontSize: 12,
            borderRadius: 4,
            border: "1px solid #1677ff",
            background: "#1677ff",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          新增记录
        </button>
      </div>
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
              {["日期", "台阶", "矿量(t)", "剥离量(m³)", "平均品位(Fe, %)", "贫化率(%)", "单耗(kg炸药/t)", "操作"].map((h) => (
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
            {dailyProduction.map((r) => (
              <tr key={`${r.date}-${r.bench}`}>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{r.date}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{r.bench}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{r.oreTonnage}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{r.wasteTonnage}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{r.avgGradeFe}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{r.dilutionRate}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{r.powderFactor}</td>
                <td
                  style={{
                    padding: "8px 12px",
                    borderBottom: "1px solid #f0f0f0",
                    whiteSpace: "nowrap",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => handleEditRecord(r)}
                    style={{
                      padding: "4px 8px",
                      fontSize: 12,
                      marginRight: 8,
                      borderRadius: 4,
                      border: "1px solid #1677ff",
                      background: "#1677ff",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    编辑
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteRecord(r)}
                    style={{
                      padding: "4px 8px",
                      fontSize: 12,
                      borderRadius: 4,
                      border: "1px solid #ff4d4f",
                      background: "#fff",
                      color: "#ff4d4f",
                      cursor: "pointer",
                    }}
                  >
                    删除
                  </button>
                </td>
              </tr>
            ))}
            {dailyProduction.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  style={{ padding: "12px 0", textAlign: "center", color: "#999" }}
                >
                  暂无记录，请先新增。
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SectionUnderground() {
  const [drivageLedger, setDrivageLedger] = React.useState(undergroundMock.drivageLedger);
  const [stopingLedger, setStopingLedger] = React.useState(undergroundMock.stopingLedger);

  const handleAddDrivage = () => {
    const date = window.prompt('日期', '2025-11-16');
    if (!date) return;
    const roadway = window.prompt('巷道', '') || '';
    const shift = window.prompt('班次', '白班') || '白班';
    const lengthInput = window.prompt('进尺(m)', '0');
    const rockClass = window.prompt('岩性', '') || '';
    const drillingMethod = window.prompt('施工方法', '') || '';
    const remark = window.prompt('备注', '') || '';

    setDrivageLedger((prev) => [
      ...prev,
      {
        date,
        roadway,
        shift,
        length: lengthInput ? Number(lengthInput) || 0 : 0,
        rockClass,
        drillingMethod,
        remark,
      },
    ]);
  };

  const handleEditDrivage = (row: (typeof undergroundMock.drivageLedger)[number]) => {
    const roadway = window.prompt('巷道', row.roadway) || row.roadway;
    const shift = window.prompt('班次', row.shift) || row.shift;
    const lengthInput = window.prompt('进尺(m)', String(row.length));
    const rockClass = window.prompt('岩性', row.rockClass) || row.rockClass;
    const drillingMethod = window.prompt('施工方法', row.drillingMethod) || row.drillingMethod;
    const remark = window.prompt('备注', row.remark) || row.remark;

    setDrivageLedger((prev) =>
      prev.map((r) =>
        r.date === row.date && r.roadway === row.roadway && r.shift === row.shift
          ? {
              ...r,
              roadway,
              shift,
              length: lengthInput ? Number(lengthInput) || row.length : row.length,
              rockClass,
              drillingMethod,
              remark,
            }
          : r,
      ),
    );
  };

  const handleDeleteDrivage = (row: (typeof undergroundMock.drivageLedger)[number]) => {
    if (!window.confirm('确定要删除该掘进记录吗？')) return;
    setDrivageLedger((prev) =>
      prev.filter(
        (r) => !(r.date === row.date && r.roadway === row.roadway && r.shift === row.shift),
      ),
    );
  };

  const handleAddStoping = () => {
    const stope = window.prompt('采场', '') || '';
    if (!stope) return;
    const method = window.prompt('方法', '充填法') || '充填法';
    const date = window.prompt('日期', '2025-11-16') || '2025-11-16';
    const oreTonnageInput = window.prompt('采出矿量(t)', '0');
    const avgGradeFeInput = window.prompt('平均品位(Fe, %)', '0');
    const dilutionRateInput = window.prompt('贫化率(%)', '0');
    const fillingInput = window.prompt('是否充填(是/否)', '是') || '是';

    setStopingLedger((prev) => [
      ...prev,
      {
        stope,
        method,
        date,
        oreTonnage: oreTonnageInput ? Number(oreTonnageInput) || 0 : 0,
        avgGradeFe: avgGradeFeInput ? Number(avgGradeFeInput) || 0 : 0,
        dilutionRate: dilutionRateInput ? Number(dilutionRateInput) || 0 : 0,
        filling: fillingInput === '是',
      },
    ]);
  };

  const handleEditStoping = (row: (typeof undergroundMock.stopingLedger)[number]) => {
    const method = window.prompt('方法', row.method) || row.method;
    const date = window.prompt('日期', row.date) || row.date;
    const oreTonnageInput = window.prompt('采出矿量(t)', String(row.oreTonnage));
    const avgGradeFeInput = window.prompt('平均品位(Fe, %)', String(row.avgGradeFe));
    const dilutionRateInput = window.prompt('贫化率(%)', String(row.dilutionRate));
    const fillingInput = window.prompt('是否充填(是/否)', row.filling ? '是' : '否') || (row.filling ? '是' : '否');

    setStopingLedger((prev) =>
      prev.map((r) =>
        r.stope === row.stope && r.date === row.date
          ? {
              ...r,
              method,
              date,
              oreTonnage: oreTonnageInput ? Number(oreTonnageInput) || row.oreTonnage : row.oreTonnage,
              avgGradeFe: avgGradeFeInput ? Number(avgGradeFeInput) || row.avgGradeFe : row.avgGradeFe,
              dilutionRate: dilutionRateInput ? Number(dilutionRateInput) || row.dilutionRate : row.dilutionRate,
              filling: fillingInput === '是',
            }
          : r,
      ),
    );
  };

  const handleDeleteStoping = (row: (typeof undergroundMock.stopingLedger)[number]) => {
    if (!window.confirm('确定要删除该采场记录吗？')) return;
    setStopingLedger((prev) => prev.filter((r) => !(r.stope === row.stope && r.date === row.date)));
  };

  return (
    <div>
      <h2>地采生产管理</h2>
      <p style={{ fontSize: 12, color: "#666", marginBottom: 12 }}>
        管理掘进、采矿、充填任务与台账，监控采掘比等运营指标，并与安全环保管理联动关注地下作业风险和高风险作业票执行情况。
      </p>
      <KpiCards items={undergroundMock.kpis} />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 16,
          marginBottom: 8,
        }}
      >
        <h3 style={{ margin: 0 }}>掘进台账</h3>
        <button
          type="button"
          onClick={handleAddDrivage}
          style={{
            padding: "6px 12px",
            fontSize: 12,
            borderRadius: 4,
            border: "1px solid #1677ff",
            background: "#1677ff",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          新增掘进记录
        </button>
      </div>
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
              {["日期", "巷道", "班次", "进尺(m)", "岩性", "施工方法", "备注", "操作"].map((h) => (
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
            {drivageLedger.map((r) => (
              <tr key={`${r.date}-${r.roadway}-${r.shift}`}>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{r.date}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{r.roadway}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{r.shift}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{r.length}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{r.rockClass}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{r.drillingMethod}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{r.remark}</td>
                <td
                  style={{
                    padding: "8px 12px",
                    borderBottom: "1px solid #f0f0f0",
                    whiteSpace: "nowrap",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => handleEditDrivage(r)}
                    style={{
                      padding: "4px 8px",
                      fontSize: 12,
                      marginRight: 8,
                      borderRadius: 4,
                      border: "1px solid #1677ff",
                      background: "#1677ff",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    编辑
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteDrivage(r)}
                    style={{
                      padding: "4px 8px",
                      fontSize: 12,
                      borderRadius: 4,
                      border: "1px solid #ff4d4f",
                      background: "#fff",
                      color: "#ff4d4f",
                      cursor: "pointer",
                    }}
                  >
                    删除
                  </button>
                </td>
              </tr>
            ))}
            {drivageLedger.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  style={{ padding: "12px 0", textAlign: "center", color: "#999" }}
                >
                  暂无掘进记录，请先新增。
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 16,
          marginBottom: 8,
        }}
      >
        <h3 style={{ margin: 0 }}>采场台账</h3>
        <button
          type="button"
          onClick={handleAddStoping}
          style={{
            padding: "6px 12px",
            fontSize: 12,
            borderRadius: 4,
            border: "1px solid #1677ff",
            background: "#1677ff",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          新增采场记录
        </button>
      </div>
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
              {["采场", "方法", "日期", "采出矿量(t)", "平均品位(Fe, %)", "贫化率(%)", "是否充填", "操作"].map((h) => (
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
            {stopingLedger.map((r) => (
              <tr key={`${r.stope}-${r.date}`}>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{r.stope}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{r.method}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{r.date}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{r.oreTonnage}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{r.avgGradeFe}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{r.dilutionRate}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{r.filling ? "是" : "否"}</td>
                <td
                  style={{
                    padding: "8px 12px",
                    borderBottom: "1px solid #f0f0f0",
                    whiteSpace: "nowrap",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => handleEditStoping(r)}
                    style={{
                      padding: "4px 8px",
                      fontSize: 12,
                      marginRight: 8,
                      borderRadius: 4,
                      border: "1px solid #1677ff",
                      background: "#1677ff",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    编辑
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteStoping(r)}
                    style={{
                      padding: "4px 8px",
                      fontSize: 12,
                      borderRadius: 4,
                      border: "1px solid #ff4d4f",
                      background: "#fff",
                      color: "#ff4d4f",
                      cursor: "pointer",
                    }}
                  >
                    删除
                  </button>
                </td>
              </tr>
            ))}
            {stopingLedger.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  style={{ padding: "12px 0", textAlign: "center", color: "#999" }}
                >
                  暂无采场记录，请先新增。
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SectionConcentrator() {
  const [subTab, setSubTab] = React.useState<'ledger' | 'plan' | 'energy' | 'economic'>('ledger');
  const [plans, setPlans] = React.useState<ProductionPlan[]>(concentratorMock.productionPlans);
  const [formMode, setFormMode] = React.useState<'create' | 'edit' | null>(null);
  const [editingPlan, setEditingPlan] = React.useState<ProductionPlan | null>(null);

  const handleDeletePlan = (id: string) => {
    if (!window.confirm('确定要删除该计划吗？')) return;
    setPlans((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSavePlan = () => {
    if (!editingPlan || !formMode) return;
    if (!editingPlan.period) {
      alert('请填写计划周期');
      return;
    }

    if (formMode === 'create') {
      const newId = editingPlan.id && editingPlan.id.trim().length > 0 ? editingPlan.id : `PLAN-${Date.now()}`;
      const newPlan: ProductionPlan = { ...editingPlan, id: newId };
      setPlans((prev) => [...prev, newPlan]);
    } else if (formMode === 'edit') {
      setPlans((prev) => prev.map((p) => (p.id === editingPlan.id ? editingPlan : p)));
    }

    setFormMode(null);
    setEditingPlan(null);
  };

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
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 16,
              marginBottom: 8,
            }}
          >
            <h3 style={{ margin: 0 }}>生产计划列表</h3>
            <button
              type="button"
              onClick={() => {
                setFormMode('create');
                setEditingPlan({
                  id: '',
                  type: '月度计划',
                  period: '',
                  targetTonnage: 0,
                  targetGrade: 65,
                  targetRecovery: 89.5,
                  status: '草稿',
                  createdBy: '当前用户',
                  approvedBy: null,
                  createdAt: new Date().toISOString().slice(0, 10),
                  approvedAt: null,
                });
              }}
              style={{
                padding: '6px 12px',
                fontSize: 12,
                borderRadius: 4,
                border: '1px solid #1677ff',
                background: '#1677ff',
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              新建计划
            </button>
          </div>

          <div
            style={{
              borderRadius: 8,
              border: '1px solid #eee',
              overflow: 'hidden',
              background: '#fff',
            }}
          >
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead style={{ background: '#fafafa' }}>
                <tr>
                  {[
                    '计划编号',
                    '计划类型',
                    '周期',
                    '目标处理量(t)',
                    '目标品位(%)',
                    '目标回收率(%)',
                    '状态',
                    '制定人',
                    '审批人',
                    '制定时间',
                    '操作',
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        textAlign: 'left',
                        padding: '8px 12px',
                        borderBottom: '1px solid #eee',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {plans.map((p) => (
                  <tr key={p.id}>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0', whiteSpace: 'nowrap' }}>{p.id}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0', whiteSpace: 'nowrap' }}>{p.type}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0', whiteSpace: 'nowrap' }}>{p.period}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0', whiteSpace: 'nowrap' }}>{p.targetTonnage}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0', whiteSpace: 'nowrap' }}>{p.targetGrade}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0', whiteSpace: 'nowrap' }}>{p.targetRecovery}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0', whiteSpace: 'nowrap' }}>{p.status}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0', whiteSpace: 'nowrap' }}>{p.createdBy}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0', whiteSpace: 'nowrap' }}>{p.approvedBy || '-'}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0', whiteSpace: 'nowrap' }}>{p.createdAt}</td>
                    <td
                      style={{
                        padding: '8px 12px',
                        borderBottom: '1px solid #f0f0f0',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setFormMode('edit');
                          setEditingPlan(p);
                        }}
                        style={{
                          padding: '4px 8px',
                          fontSize: 12,
                          marginRight: 8,
                          borderRadius: 4,
                          border: '1px solid #1677ff',
                          background: '#1677ff',
                          color: '#fff',
                          cursor: 'pointer',
                        }}
                      >
                        编辑
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeletePlan(p.id)}
                        style={{
                          padding: '4px 8px',
                          fontSize: 12,
                          borderRadius: 4,
                          border: '1px solid #ff4d4f',
                          background: '#fff',
                          color: '#ff4d4f',
                          cursor: 'pointer',
                        }}
                      >
                        删除
                      </button>
                    </td>
                  </tr>
                ))}
                {plans.length === 0 && (
                  <tr>
                    <td
                      colSpan={11}
                      style={{
                        padding: '12px 0',
                        textAlign: 'center',
                        color: '#999',
                      }}
                    >
                      暂无数据，请先新建计划。
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {formMode && editingPlan && (
            <div
              style={{
                marginTop: 16,
                padding: 16,
                background: '#f0f9ff',
                borderRadius: 8,
                fontSize: 12,
              }}
            >
              <h4 style={{ marginTop: 0, marginBottom: 12 }}>
                {formMode === 'create' ? '新建生产计划' : '编辑生产计划'}
              </h4>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSavePlan();
                }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: 12,
                }}
              >
                <div>
                  <div>计划编号（留空自动生成）</div>
                  <input
                    value={editingPlan.id}
                    onChange={(e) =>
                      setEditingPlan((prev) =>
                        prev ? { ...prev, id: e.target.value } : prev,
                      )
                    }
                    placeholder="例如 PLAN-2025-12"
                    style={{ width: '100%', padding: 6, borderRadius: 4, border: '1px solid #d9d9d9' }}
                  />
                </div>
                <div>
                  <div>计划类型</div>
                  <input
                    value={editingPlan.type}
                    onChange={(e) =>
                      setEditingPlan((prev) =>
                        prev ? { ...prev, type: e.target.value } : prev,
                      )
                    }
                    style={{ width: '100%', padding: 6, borderRadius: 4, border: '1px solid #d9d9d9' }}
                  />
                </div>
                <div>
                  <div>周期</div>
                  <input
                    value={editingPlan.period}
                    onChange={(e) =>
                      setEditingPlan((prev) =>
                        prev ? { ...prev, period: e.target.value } : prev,
                      )
                    }
                    placeholder="例如 2025年12月 或 第48周"
                    style={{ width: '100%', padding: 6, borderRadius: 4, border: '1px solid #d9d9d9' }}
                    required
                  />
                </div>
                <div>
                  <div>目标处理量(t)</div>
                  <input
                    type="number"
                    value={editingPlan.targetTonnage}
                    onChange={(e) =>
                      setEditingPlan((prev) =>
                        prev ? { ...prev, targetTonnage: Number(e.target.value) || 0 } : prev,
                      )
                    }
                    style={{ width: '100%', padding: 6, borderRadius: 4, border: '1px solid #d9d9d9' }}
                  />
                </div>
                <div>
                  <div>目标品位(%)</div>
                  <input
                    type="number"
                    value={editingPlan.targetGrade}
                    onChange={(e) =>
                      setEditingPlan((prev) =>
                        prev ? { ...prev, targetGrade: Number(e.target.value) || 0 } : prev,
                      )
                    }
                    step="0.1"
                    style={{ width: '100%', padding: 6, borderRadius: 4, border: '1px solid #d9d9d9' }}
                  />
                </div>
                <div>
                  <div>目标回收率(%)</div>
                  <input
                    type="number"
                    value={editingPlan.targetRecovery}
                    onChange={(e) =>
                      setEditingPlan((prev) =>
                        prev ? { ...prev, targetRecovery: Number(e.target.value) || 0 } : prev,
                      )
                    }
                    step="0.1"
                    style={{ width: '100%', padding: 6, borderRadius: 4, border: '1px solid #d9d9d9' }}
                  />
                </div>
                <div>
                  <div>状态</div>
                  <input
                    value={editingPlan.status}
                    onChange={(e) =>
                      setEditingPlan((prev) =>
                        prev ? { ...prev, status: e.target.value } : prev,
                      )
                    }
                    placeholder="例如 草稿 / 待审批 / 执行中 / 已完成"
                    style={{ width: '100%', padding: 6, borderRadius: 4, border: '1px solid #d9d9d9' }}
                  />
                </div>
                <div>
                  <div>制定人</div>
                  <input
                    value={editingPlan.createdBy}
                    onChange={(e) =>
                      setEditingPlan((prev) =>
                        prev ? { ...prev, createdBy: e.target.value } : prev,
                      )
                    }
                    style={{ width: '100%', padding: 6, borderRadius: 4, border: '1px solid #d9d9d9' }}
                  />
                </div>
                <div>
                  <div>审批人</div>
                  <input
                    value={editingPlan.approvedBy || ''}
                    onChange={(e) =>
                      setEditingPlan((prev) =>
                        prev ? { ...prev, approvedBy: e.target.value || null } : prev,
                      )
                    }
                    placeholder="可留空，审批通过后填写"
                    style={{ width: '100%', padding: 6, borderRadius: 4, border: '1px solid #d9d9d9' }}
                  />
                </div>
                <div>
                  <div>制定时间</div>
                  <input
                    value={editingPlan.createdAt}
                    onChange={(e) =>
                      setEditingPlan((prev) =>
                        prev ? { ...prev, createdAt: e.target.value } : prev,
                      )
                    }
                    style={{ width: '100%', padding: 6, borderRadius: 4, border: '1px solid #d9d9d9' }}
                  />
                </div>
                <div>
                  <div>审批时间</div>
                  <input
                    value={editingPlan.approvedAt || ''}
                    onChange={(e) =>
                      setEditingPlan((prev) =>
                        prev ? { ...prev, approvedAt: e.target.value || null } : prev,
                      )
                    }
                    placeholder="审批后填写，可留空"
                    style={{ width: '100%', padding: 6, borderRadius: 4, border: '1px solid #d9d9d9' }}
                  />
                </div>

                <div
                  style={{
                    gridColumn: '1 / -1',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: 8,
                    marginTop: 8,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setFormMode(null);
                      setEditingPlan(null);
                    }}
                    style={{
                      padding: '6px 12px',
                      fontSize: 12,
                      borderRadius: 4,
                      border: '1px solid #d9d9d9',
                      background: '#fff',
                      cursor: 'pointer',
                    }}
                  >
                    取消
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: '6px 12px',
                      fontSize: 12,
                      borderRadius: 4,
                      border: '1px solid #1677ff',
                      background: '#1677ff',
                      color: '#fff',
                      cursor: 'pointer',
                    }}
                  >
                    保存
                  </button>
                </div>
              </form>
            </div>
          )}

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
  const [samples, setSamples] = React.useState(labMock.samples);

  const handleAddSample = () => {
    const sampleId = window.prompt('样品号', '');
    if (!sampleId) return;
    const barcode = window.prompt('条码', '') || '';
    const materialType = window.prompt('物料类型', '') || '';
    const source = window.prompt('来源', '') || '';
    const project = window.prompt('项目', '') || '';
    const status = window.prompt('状态', '待检') || '待检';
    const feStr = window.prompt('Fe(%)', '');
    const sio2Str = window.prompt('SiO₂(%)', '');
    const sStr = window.prompt('S(%)', '');
    const receivedAt = window.prompt('受理时间', '') || '';
    const reportedAt = window.prompt('出报告时间', '') || '';

    const parseNullableNumber = (val: string | null): number | null => {
      if (!val || val.trim() === '') return null;
      const n = Number(val);
      return Number.isNaN(n) ? null : n;
    };

    setSamples((prev) => [
      ...prev,
      {
        sampleId,
        barcode,
        materialType,
        source,
        project,
        status,
        fe: parseNullableNumber(feStr),
        sio2: parseNullableNumber(sio2Str),
        s: parseNullableNumber(sStr),
        receivedAt,
        reportedAt: reportedAt || null,
        lab: '',
      },
    ]);
  };

  const handleEditSample = (sample: (typeof labMock.samples)[number]) => {
    const barcode = window.prompt('条码', sample.barcode) || sample.barcode;
    const materialType = window.prompt('物料类型', sample.materialType) || sample.materialType;
    const source = window.prompt('来源', sample.source) || sample.source;
    const project = window.prompt('项目', sample.project) || sample.project;
    const status = window.prompt('状态', sample.status) || sample.status;
    const feStr = window.prompt('Fe(%)', sample.fe != null ? String(sample.fe) : '');
    const sio2Str = window.prompt('SiO₂(%)', sample.sio2 != null ? String(sample.sio2) : '');
    const sStr = window.prompt('S(%)', sample.s != null ? String(sample.s) : '');
    const receivedAt = window.prompt('受理时间', sample.receivedAt) || sample.receivedAt;
    const reportedAt = window.prompt('出报告时间', sample.reportedAt || '') || sample.reportedAt || '';

    const parseNullableNumber = (val: string | null, fallback: number | null): number | null => {
      if (val === null) return fallback;
      if (val.trim() === '') return null;
      const n = Number(val);
      return Number.isNaN(n) ? fallback : n;
    };

    setSamples((prev) =>
      prev.map((s) =>
        s.sampleId === sample.sampleId
          ? {
              ...s,
              barcode,
              materialType,
              source,
              project,
              status,
              fe: parseNullableNumber(feStr, sample.fe),
              sio2: parseNullableNumber(sio2Str, sample.sio2),
              s: parseNullableNumber(sStr, sample.s),
              receivedAt,
              reportedAt: reportedAt || null,
            }
          : s,
      ),
    );
  };

  const handleDeleteSample = (sample: (typeof labMock.samples)[number]) => {
    if (!window.confirm('确定要删除该样品记录吗？')) return;
    setSamples((prev) => prev.filter((s) => s.sampleId !== sample.sampleId));
  };

  return (
    <div>
      <h2>质检化验管理</h2>
      <p style={{ fontSize: 12, color: "#666", marginBottom: 12 }}>
        生成样品条码、管理送检与分析结果，并支持金属平衡表编制。
      </p>
      <KpiCards items={labMock.kpis} />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 16,
          marginBottom: 8,
        }}
      >
        <h3 style={{ margin: 0 }}>样品列表</h3>
        <button
          type="button"
          onClick={handleAddSample}
          style={{
            padding: "6px 12px",
            fontSize: 12,
            borderRadius: 4,
            border: "1px solid #1677ff",
            background: "#1677ff",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          新增样品
        </button>
      </div>

      <div
        style={{
          borderRadius: 8,
          border: "1px solid #eee",
          overflowX: "auto",
          overflowY: "hidden",
          background: "#fff",
          maxWidth: "100%",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead style={{ background: "#fafafa" }}>
            <tr>
              {["样品号", "条码", "物料类型", "来源", "项目", "状态", "Fe(%)", "SiO₂(%)", "S(%)", "受理时间", "出报告时间", "操作"].map((h) => (
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
            {samples.map((s) => (
              <tr key={s.sampleId}>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{s.sampleId}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{s.barcode}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{s.materialType}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{s.source}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{s.project}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{s.status}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{s.fe ?? '-'}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{s.sio2 ?? '-'}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{s.s ?? '-'}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{s.receivedAt}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{s.reportedAt || '-'}</td>
                <td
                  style={{
                    padding: "8px 12px",
                    borderBottom: "1px solid #f0f0f0",
                    whiteSpace: "nowrap",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => handleEditSample(s)}
                    style={{
                      padding: "4px 8px",
                      fontSize: 12,
                      marginRight: 8,
                      borderRadius: 4,
                      border: "1px solid #1677ff",
                      background: "#1677ff",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    编辑
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteSample(s)}
                    style={{
                      padding: "4px 8px",
                      fontSize: 12,
                      borderRadius: 4,
                      border: "1px solid #ff4d4f",
                      background: "#fff",
                      color: "#ff4d4f",
                      cursor: "pointer",
                    }}
                  >
                    删除
                  </button>
                </td>
              </tr>
            ))}
            {samples.length === 0 && (
              <tr>
                <td
                  colSpan={12}
                  style={{ padding: "12px 0", textAlign: "center", color: "#999" }}
                >
                  暂无样品，请先新增。
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SectionEquipment() {
  const [equipmentList, setEquipmentList] = React.useState(equipmentMock.equipmentList);
  const [alerts, setAlerts] = React.useState(equipmentMock.predictiveAlerts);

  const handleAddEquipment = () => {
    const id = window.prompt('设备编号', '');
    if (!id) return;
    const name = window.prompt('名称', '') || '';
    const area = window.prompt('区域', '') || '';
    const status = window.prompt('状态', '运行') || '运行';
    const availabilityStr = window.prompt('开机率(%)', '0');
    const mtbfStr = window.prompt('MTBF(h)', '0');
    const lastMaintenance = window.prompt('上次检修', '') || '';
    const nextMaintenance = window.prompt('下次检修', '') || '';
    const vibrationStr = window.prompt('振动(mm/s)', '0');
    const tempStr = window.prompt('温度(℃)', '0');

    setEquipmentList((prev) => [
      ...prev,
      {
        id,
        name,
        area,
        status,
        availability: availabilityStr ? Number(availabilityStr) || 0 : 0,
        mtbfHours: mtbfStr ? Number(mtbfStr) || 0 : 0,
        lastMaintenance,
        nextMaintenance,
        vibrationMmS: vibrationStr ? Number(vibrationStr) || 0 : 0,
        tempCelsius: tempStr ? Number(tempStr) || 0 : 0,
      },
    ]);
  };

  const handleEditEquipment = (row: (typeof equipmentMock.equipmentList)[number]) => {
    const name = window.prompt('名称', row.name) || row.name;
    const area = window.prompt('区域', row.area) || row.area;
    const status = window.prompt('状态', row.status) || row.status;
    const availabilityStr = window.prompt('开机率(%)', String(row.availability));
    const mtbfStr = window.prompt('MTBF(h)', String(row.mtbfHours));
    const lastMaintenance = window.prompt('上次检修', row.lastMaintenance) || row.lastMaintenance;
    const nextMaintenance = window.prompt('下次检修', row.nextMaintenance) || row.nextMaintenance;
    const vibrationStr = window.prompt('振动(mm/s)', String(row.vibrationMmS));
    const tempStr = window.prompt('温度(℃)', String(row.tempCelsius));

    setEquipmentList((prev) =>
      prev.map((e) =>
        e.id === row.id
          ? {
              ...e,
              name,
              area,
              status,
              availability: availabilityStr ? Number(availabilityStr) || row.availability : row.availability,
              mtbfHours: mtbfStr ? Number(mtbfStr) || row.mtbfHours : row.mtbfHours,
              lastMaintenance,
              nextMaintenance,
              vibrationMmS: vibrationStr ? Number(vibrationStr) || row.vibrationMmS : row.vibrationMmS,
              tempCelsius: tempStr ? Number(tempStr) || row.tempCelsius : row.tempCelsius,
            }
          : e,
      ),
    );
  };

  const handleDeleteEquipment = (row: (typeof equipmentMock.equipmentList)[number]) => {
    if (!window.confirm('确定要删除该设备记录吗？')) return;
    setEquipmentList((prev) => prev.filter((e) => e.id !== row.id));
  };

  const handleAddAlert = () => {
    const equipmentId = window.prompt('设备编号', '') || '';
    if (!equipmentId) return;
    const level = window.prompt('预警等级', '预警') || '预警';
    const type = window.prompt('预警类型', '') || '';
    const hoursStr = window.prompt('预测剩余寿命(h)', '0');
    const suggestion = window.prompt('建议', '') || '';

    setAlerts((prev) => [
      ...prev,
      {
        equipmentId,
        level,
        type,
        predictedFailureHours: hoursStr ? Number(hoursStr) || 0 : 0,
        suggestion,
      },
    ]);
  };

  const handleEditAlert = (row: (typeof equipmentMock.predictiveAlerts)[number]) => {
    const level = window.prompt('预警等级', row.level) || row.level;
    const type = window.prompt('预警类型', row.type) || row.type;
    const hoursStr = window.prompt('预测剩余寿命(h)', String(row.predictedFailureHours));
    const suggestion = window.prompt('建议', row.suggestion) || row.suggestion;

    setAlerts((prev) =>
      prev.map((a) =>
        a.equipmentId === row.equipmentId && a.type === row.type
          ? {
              ...a,
              level,
              type,
              predictedFailureHours: hoursStr ? Number(hoursStr) || row.predictedFailureHours : row.predictedFailureHours,
              suggestion,
            }
          : a,
      ),
    );
  };

  const handleDeleteAlert = (row: (typeof equipmentMock.predictiveAlerts)[number]) => {
    if (!window.confirm('确定要删除该预警记录吗？')) return;
    setAlerts((prev) =>
      prev.filter((a) => !(a.equipmentId === row.equipmentId && a.type === row.type)),
    );
  };

  return (
    <div>
      <h2>设备管理与预测性维护</h2>
      <p style={{ fontSize: 12, color: "#666", marginBottom: 12 }}>
        管理设备档案、运行与检修记录，引入传感器数据进行预测性维护预警。
      </p>
      <KpiCards items={equipmentMock.kpis} />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 16,
          marginBottom: 8,
        }}
      >
        <h3 style={{ margin: 0 }}>设备台账</h3>
        <button
          type="button"
          onClick={handleAddEquipment}
          style={{
            padding: "6px 12px",
            fontSize: 12,
            borderRadius: 4,
            border: "1px solid #1677ff",
            background: "#1677ff",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          新增设备
        </button>
      </div>
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
              {["设备编号", "名称", "区域", "状态", "开机率(%)", "MTBF(h)", "上次检修", "下次检修", "振动(mm/s)", "温度(℃)", "操作"].map((h) => (
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
            {equipmentList.map((e) => (
              <tr key={e.id}>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{e.id}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{e.name}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{e.area}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{e.status}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{e.availability}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{e.mtbfHours}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{e.lastMaintenance}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{e.nextMaintenance}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{e.vibrationMmS}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{e.tempCelsius}</td>
                <td
                  style={{
                    padding: "8px 12px",
                    borderBottom: "1px solid #f0f0f0",
                    whiteSpace: "nowrap",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => handleEditEquipment(e)}
                    style={{
                      padding: "4px 8px",
                      fontSize: 12,
                      marginRight: 8,
                      borderRadius: 4,
                      border: "1px solid #1677ff",
                      background: "#1677ff",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    编辑
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteEquipment(e)}
                    style={{
                      padding: "4px 8px",
                      fontSize: 12,
                      borderRadius: 4,
                      border: "1px solid #ff4d4f",
                      background: "#fff",
                      color: "#ff4d4f",
                      cursor: "pointer",
                    }}
                  >
                    删除
                  </button>
                </td>
              </tr>
            ))}
            {equipmentList.length === 0 && (
              <tr>
                <td
                  colSpan={11}
                  style={{ padding: "12px 0", textAlign: "center", color: "#999" }}
                >
                  暂无设备，请先新增。
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 16,
          marginBottom: 8,
        }}
      >
        <h3 style={{ margin: 0 }}>预测性预警</h3>
        <button
          type="button"
          onClick={handleAddAlert}
          style={{
            padding: "6px 12px",
            fontSize: 12,
            borderRadius: 4,
            border: "1px solid #1677ff",
            background: "#1677ff",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          新增预警
        </button>
      </div>
      <div
        style={{
          borderRadius: 8,
          border: "1px solid #eee",
          background: "#fff",
          fontSize: 12,
          padding: 12,
        }}
      >
        {alerts.map((a, idx) => (
          <div
            key={`${a.equipmentId}-${a.type}-${idx}`}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <div>
              <strong>{a.level}</strong> - {a.equipmentId} - {a.type}，预测 {a.predictedFailureHours} 小时内可能故障。建议：
              {a.suggestion}
            </div>
            <div>
              <button
                type="button"
                onClick={() => handleEditAlert(a)}
                style={{
                  padding: "4px 8px",
                  fontSize: 12,
                  marginRight: 8,
                  borderRadius: 4,
                  border: "1px solid #1677ff",
                  background: "#1677ff",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                编辑
              </button>
              <button
                type="button"
                onClick={() => handleDeleteAlert(a)}
                style={{
                  padding: "4px 8px",
                  fontSize: 12,
                  borderRadius: 4,
                  border: "1px solid #ff4d4f",
                  background: "#fff",
                  color: "#ff4d4f",
                  cursor: "pointer",
                }}
              >
                删除
              </button>
            </div>
          </div>
        ))}
        {alerts.length === 0 && (
          <div style={{ color: "#999" }}>暂无预警记录。</div>
        )}
      </div>
    </div>
  );
}

function SectionAnalytics() {
  const [tab, setTab] = React.useState<'dashboard' | 'reports' | 'reserves' | 'grade' | 'flow'>('dashboard');
  const [reports, setReports] = React.useState(analyticsMock.productionReports);

  const handleAddReport = () => {
    const id = window.prompt('报表编号', '');
    if (!id) return;
    const type = window.prompt('类型', '日报') || '日报';
    const period = window.prompt('周期', '') || '';
    const oreTonnageStr = window.prompt('处理矿量(t)', '0');
    const concentrateTonnageStr = window.prompt('精矿(t)', '0');
    const avgGradeStr = window.prompt('平均品位(%)', '0');
    const recoveryStr = window.prompt('回收率(%)', '0');
    const availabilityStr = window.prompt('开机率(%)', '0');
    const status = window.prompt('状态', '已发布') || '已发布';
    const generatedAt = window.prompt('生成时间', '') || '';

    setReports((prev) => [
      ...prev,
      {
        id,
        type,
        period,
        oreTonnage: oreTonnageStr ? Number(oreTonnageStr) || 0 : 0,
        concentrateTonnage: concentrateTonnageStr ? Number(concentrateTonnageStr) || 0 : 0,
        avgGrade: avgGradeStr ? Number(avgGradeStr) || 0 : 0,
        recovery: recoveryStr ? Number(recoveryStr) || 0 : 0,
        equipmentAvailability: availabilityStr ? Number(availabilityStr) || 0 : 0,
        status,
        generatedAt,
      },
    ]);
  };

  const handleEditReport = (row: (typeof analyticsMock.productionReports)[number]) => {
    const type = window.prompt('类型', row.type) || row.type;
    const period = window.prompt('周期', row.period) || row.period;
    const oreTonnageStr = window.prompt('处理矿量(t)', String(row.oreTonnage));
    const concentrateTonnageStr = window.prompt('精矿(t)', String(row.concentrateTonnage));
    const avgGradeStr = window.prompt('平均品位(%)', String(row.avgGrade));
    const recoveryStr = window.prompt('回收率(%)', String(row.recovery));
    const availabilityStr = window.prompt('开机率(%)', String(row.equipmentAvailability));
    const status = window.prompt('状态', row.status) || row.status;
    const generatedAt = window.prompt('生成时间', row.generatedAt) || row.generatedAt;

    setReports((prev) =>
      prev.map((r) =>
        r.id === row.id
          ? {
              ...r,
              type,
              period,
              oreTonnage: oreTonnageStr ? Number(oreTonnageStr) || row.oreTonnage : row.oreTonnage,
              concentrateTonnage: concentrateTonnageStr ? Number(concentrateTonnageStr) || row.concentrateTonnage : row.concentrateTonnage,
              avgGrade: avgGradeStr ? Number(avgGradeStr) || row.avgGrade : row.avgGrade,
              recovery: recoveryStr ? Number(recoveryStr) || row.recovery : row.recovery,
              equipmentAvailability: availabilityStr ? Number(availabilityStr) || row.equipmentAvailability : row.equipmentAvailability,
              status,
              generatedAt,
            }
          : r,
      ),
    );
  };

  const handleDeleteReport = (row: (typeof analyticsMock.productionReports)[number]) => {
    if (!window.confirm('确定要删除该生产报表吗？')) return;
    setReports((prev) => prev.filter((r) => r.id !== row.id));
  };

  return (
    <div>
      <h2>矿山决策分析</h2>
      <p style={{ fontSize: 12, color: "#666", marginBottom: 12 }}>
        围绕星耀矿业集团安哥拉铜矿项目，汇总资源、产能、品位、成本和设备效率等指标，支撑集团级驾驶舱分析。
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
          <h3 style={{ marginTop: 8, marginBottom: 8 }}>项目基本信息</h3>
          <BasicTable
            headers={[
              "矿山名称",
              "矿种",
              "设计服务年限",
              "开采方式",
              "设计年处理能力",
              "日处理矿石能力",
              "金属铜资源量",
            ]}
            rows={[
              [
                "星耀安哥拉铜矿",
                "铜矿",
                "10 年（2 年露天 + 8 年地下）",
                "前期露天开采，后期地下开采",
                "150 万吨/年",
                "4000 吨/日",
                "50 万吨",
              ],
            ]}
          />

          <h3 style={{ marginTop: 16, marginBottom: 8 }}>矿石流向</h3>
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
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 8,
              marginBottom: 8,
            }}
          >
            <h3 style={{ margin: 0 }}>生产报表</h3>
            <button
              type="button"
              onClick={handleAddReport}
              style={{
                padding: '6px 12px',
                fontSize: 12,
                borderRadius: 4,
                border: '1px solid #1677ff',
                background: '#1677ff',
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              新增报表
            </button>
          </div>
          <div
            style={{
              borderRadius: 8,
              border: '1px solid #eee',
              overflow: 'hidden',
              background: '#fff',
            }}
          >
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead style={{ background: '#fafafa' }}>
                <tr>
                  {['编号', '类型', '周期', '处理矿量(t)', '精矿(t)', '平均品位(%)', '回收率(%)', '开机率(%)', '状态', '生成时间', '操作'].map((h) => (
                    <th
                      key={h}
                      style={{
                        textAlign: 'left',
                        padding: '8px 12px',
                        borderBottom: '1px solid #eee',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reports.map((r) => (
                  <tr key={r.id}>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0', whiteSpace: 'nowrap' }}>{r.id}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0', whiteSpace: 'nowrap' }}>{r.type}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0', whiteSpace: 'nowrap' }}>{r.period}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0', whiteSpace: 'nowrap' }}>{r.oreTonnage}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0', whiteSpace: 'nowrap' }}>{r.concentrateTonnage}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0', whiteSpace: 'nowrap' }}>{r.avgGrade}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0', whiteSpace: 'nowrap' }}>{r.recovery}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0', whiteSpace: 'nowrap' }}>{r.equipmentAvailability}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0', whiteSpace: 'nowrap' }}>{r.status}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0', whiteSpace: 'nowrap' }}>{r.generatedAt}</td>
                    <td
                      style={{
                        padding: '8px 12px',
                        borderBottom: '1px solid #f0f0f0',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => handleEditReport(r)}
                        style={{
                          padding: '4px 8px',
                          fontSize: 12,
                          marginRight: 8,
                          borderRadius: 4,
                          border: '1px solid #1677ff',
                          background: '#1677ff',
                          color: '#fff',
                          cursor: 'pointer',
                        }}
                      >
                        编辑
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteReport(r)}
                        style={{
                          padding: '4px 8px',
                          fontSize: 12,
                          borderRadius: 4,
                          border: '1px solid #ff4d4f',
                          background: '#fff',
                          color: '#ff4d4f',
                          cursor: 'pointer',
                        }}
                      >
                        删除
                      </button>
                    </td>
                  </tr>
                ))}
                {reports.length === 0 && (
                  <tr>
                    <td
                      colSpan={11}
                      style={{ padding: '12px 0', textAlign: 'center', color: '#999' }}
                    >
                      暂无报表，请先新增。
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
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
              'loss' in f && f.loss != null ? f.loss.toLocaleString() : '-',
              'recovery' in f && f.recovery != null ? f.recovery : '-',
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
  const [hazards, setHazards] = React.useState(safetyMock.hazards);

  const handleAddHazard = () => {
    const id = window.prompt('编号', '');
    if (!id) return;
    const type = window.prompt('类型', '') || '';
    const area = window.prompt('区域', '') || '';
    const level = window.prompt('等级', '一般') || '一般';
    const status = window.prompt('状态', '待整改') || '待整改';
    const createdAt = window.prompt('发现时间', '') || '';
    const dueDate = window.prompt('整改期限', '') || '';
    const responsible = window.prompt('责任人', '') || '';

    setHazards((prev) => [
      ...prev,
      {
        id,
        type,
        area,
        level,
        status,
        createdAt,
        dueDate,
        responsible,
      },
    ]);
  };

  const handleEditHazard = (row: (typeof safetyMock.hazards)[number]) => {
    const type = window.prompt('类型', row.type) || row.type;
    const area = window.prompt('区域', row.area) || row.area;
    const level = window.prompt('等级', row.level) || row.level;
    const status = window.prompt('状态', row.status) || row.status;
    const createdAt = window.prompt('发现时间', row.createdAt) || row.createdAt;
    const dueDate = window.prompt('整改期限', row.dueDate) || row.dueDate;
    const responsible = window.prompt('责任人', row.responsible) || row.responsible;

    setHazards((prev) =>
      prev.map((h) =>
        h.id === row.id
          ? {
              ...h,
              type,
              area,
              level,
              status,
              createdAt,
              dueDate,
              responsible,
            }
          : h,
      ),
    );
  };

  const handleDeleteHazard = (row: (typeof safetyMock.hazards)[number]) => {
    if (!window.confirm('确定要删除该隐患记录吗？')) return;
    setHazards((prev) => prev.filter((h) => h.id !== row.id));
  };

  return (
    <div>
      <h2>安全环保管理</h2>
      <p style={{ fontSize: 12, color: "#666", marginBottom: 12 }}>
        集成尾矿库监测、地下特殊作业票和隐患排查，实现露采/地采一体化的安全环保管理。
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

      <h3 style={{ marginTop: 16, marginBottom: 8 }}>地下特殊作业票</h3>
      <BasicTable
        headers={["作业票号", "作业类型", "地下区域", "风险等级", "状态", "签发时间", "闭环时间"]}
        rows={safetyMock.undergroundPermits.map((p) => [
          p.id,
          p.type,
          p.area,
          p.level,
          p.status,
          p.issuedAt,
          p.closedAt ?? '-',
        ])}
      />

      <h3 style={{ marginTop: 16, marginBottom: 8 }}>地下采场风险概况</h3>
      <BasicTable
        headers={["采场", "风险等级", "主要风险", "最近评估日期"]}
        rows={safetyMock.stopeRisks.map((s) => [
          s.stope,
          s.riskLevel,
          s.mainHazards,
          s.lastAssessment,
        ])}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 16,
          marginBottom: 8,
        }}
      >
        <h3 style={{ margin: 0 }}>隐患排查</h3>
        <button
          type="button"
          onClick={handleAddHazard}
          style={{
            padding: "6px 12px",
            fontSize: 12,
            borderRadius: 4,
            border: "1px solid #1677ff",
            background: "#1677ff",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          新增隐患
        </button>
      </div>
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
              {["编号", "类型", "区域", "等级", "状态", "发现时间", "整改期限", "责任人", "操作"].map((h) => (
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
            {hazards.map((h) => (
              <tr key={h.id}>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{h.id}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{h.type}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{h.area}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{h.level}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{h.status}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{h.createdAt}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{h.dueDate}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{h.responsible}</td>
                <td
                  style={{
                    padding: "8px 12px",
                    borderBottom: "1px solid #f0f0f0",
                    whiteSpace: "nowrap",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => handleEditHazard(h)}
                    style={{
                      padding: "4px 8px",
                      fontSize: 12,
                      marginRight: 8,
                      borderRadius: 4,
                      border: "1px solid #1677ff",
                      background: "#1677ff",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    编辑
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteHazard(h)}
                    style={{
                      padding: "4px 8px",
                      fontSize: 12,
                      borderRadius: 4,
                      border: "1px solid #ff4d4f",
                      background: "#fff",
                      color: "#ff4d4f",
                      cursor: "pointer",
                    }}
                  >
                    删除
                  </button>
                </td>
              </tr>
            ))}
            {hazards.length === 0 && (
              <tr>
                <td
                  colSpan={9}
                  style={{ padding: "12px 0", textAlign: "center", color: "#999" }}
                >
                  暂无隐患记录，请先新增。
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SectionMobile() {
  const [todos, setTodos] = React.useState(mobileMock.todoList);
  const [approvals, setApprovals] = React.useState(mobileMock.approvals);

  const handleAddTodo = () => {
    const type = window.prompt('类型', '生产台账填报') || '生产台账填报';
    const title = window.prompt('标题', '') || '';
    if (!title) return;
    const moduleName = window.prompt('所属模块', '') || '';
    const deadline = window.prompt('截止时间', '') || '';
    const status = window.prompt('状态', '待处理') || '待处理';

    const id = `M-${Date.now()}`;
    setTodos((prev) => [
      ...prev,
      {
        id,
        type,
        title,
        module: moduleName,
        deadline,
        status,
      },
    ]);
  };

  const handleEditTodo = (row: (typeof mobileMock.todoList)[number]) => {
    const type = window.prompt('类型', row.type) || row.type;
    const title = window.prompt('标题', row.title) || row.title;
    const moduleName = window.prompt('所属模块', row.module) || row.module;
    const deadline = window.prompt('截止时间', row.deadline) || row.deadline;
    const status = window.prompt('状态', row.status) || row.status;

    setTodos((prev) =>
      prev.map((t) =>
        t.id === row.id
          ? {
              ...t,
              type,
              title,
              module: moduleName,
              deadline,
              status,
            }
          : t,
      ),
    );
  };

  const handleDeleteTodo = (row: (typeof mobileMock.todoList)[number]) => {
    if (!window.confirm('确定要删除该待办事项吗？')) return;
    setTodos((prev) => prev.filter((t) => t.id !== row.id));
  };

  const handleAddApproval = () => {
    const id = window.prompt('单号', '') || '';
    if (!id) return;
    const type = window.prompt('类型', '动火作业票') || '动火作业票';
    const applicant = window.prompt('申请人', '') || '';
    const area = window.prompt('区域', '') || '';
    const status = window.prompt('状态', '待审批') || '待审批';
    const submittedAt = window.prompt('提交时间', '') || '';

    setApprovals((prev) => [
      ...prev,
      {
        id,
        type,
        applicant,
        area,
        status,
        submittedAt,
      },
    ]);
  };

  const handleEditApproval = (row: (typeof mobileMock.approvals)[number]) => {
    const type = window.prompt('类型', row.type) || row.type;
    const applicant = window.prompt('申请人', row.applicant) || row.applicant;
    const area = window.prompt('区域', row.area) || row.area;
    const status = window.prompt('状态', row.status) || row.status;
    const submittedAt = window.prompt('提交时间', row.submittedAt) || row.submittedAt;

    setApprovals((prev) =>
      prev.map((a) =>
        a.id === row.id
          ? {
              ...a,
              type,
              applicant,
              area,
              status,
              submittedAt,
            }
          : a,
      ),
    );
  };

  const handleDeleteApproval = (row: (typeof mobileMock.approvals)[number]) => {
    if (!window.confirm('确定要删除该审批任务吗？')) return;
    setApprovals((prev) => prev.filter((a) => a.id !== row.id));
  };

  return (
    <div>
      <h2>移动端</h2>
      <p style={{ fontSize: 12, color: "#666", marginBottom: 12 }}>
        支持生产台账填报、设备点巡检、隐患上报及审批流转等移动作业场景。
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 16,
          marginBottom: 8,
        }}
      >
        <h3 style={{ margin: 0 }}>待办事项</h3>
        <button
          type="button"
          onClick={handleAddTodo}
          style={{
            padding: "6px 12px",
            fontSize: 12,
            borderRadius: 4,
            border: "1px solid #1677ff",
            background: "#1677ff",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          新增待办
        </button>
      </div>
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
              {["类型", "标题", "所属模块", "截止时间", "状态", "操作"].map((h) => (
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
            {todos.map((t) => (
              <tr key={t.id}>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{t.type}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{t.title}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{t.module}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{t.deadline}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{t.status}</td>
                <td
                  style={{
                    padding: "8px 12px",
                    borderBottom: "1px solid #f0f0f0",
                    whiteSpace: "nowrap",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => handleEditTodo(t)}
                    style={{
                      padding: "4px 8px",
                      fontSize: 12,
                      marginRight: 8,
                      borderRadius: 4,
                      border: "1px solid #1677ff",
                      background: "#1677ff",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    编辑
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteTodo(t)}
                    style={{
                      padding: "4px 8px",
                      fontSize: 12,
                      borderRadius: 4,
                      border: "1px solid #ff4d4f",
                      background: "#fff",
                      color: "#ff4d4f",
                      cursor: "pointer",
                    }}
                  >
                    删除
                  </button>
                </td>
              </tr>
            ))}
            {todos.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  style={{ padding: "12px 0", textAlign: "center", color: "#999" }}
                >
                  暂无待办事项，请先新增。
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 16,
          marginBottom: 8,
        }}
      >
        <h3 style={{ margin: 0 }}>审批任务</h3>
        <button
          type="button"
          onClick={handleAddApproval}
          style={{
            padding: "6px 12px",
            fontSize: 12,
            borderRadius: 4,
            border: "1px solid #1677ff",
            background: "#1677ff",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          新增审批
        </button>
      </div>
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
              {["单号", "类型", "申请人", "区域", "状态", "提交时间", "操作"].map((h) => (
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
            {approvals.map((a) => (
              <tr key={a.id}>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{a.id}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{a.type}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{a.applicant}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{a.area}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{a.status}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{a.submittedAt}</td>
                <td
                  style={{
                    padding: "8px 12px",
                    borderBottom: "1px solid #f0f0f0",
                    whiteSpace: "nowrap",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => handleEditApproval(a)}
                    style={{
                      padding: "4px 8px",
                      fontSize: 12,
                      marginRight: 8,
                      borderRadius: 4,
                      border: "1px solid #1677ff",
                      background: "#1677ff",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    编辑
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteApproval(a)}
                    style={{
                      padding: "4px 8px",
                      fontSize: 12,
                      borderRadius: 4,
                      border: "1px solid #ff4d4f",
                      background: "#fff",
                      color: "#ff4d4f",
                      cursor: "pointer",
                    }}
                  >
                    删除
                  </button>
                </td>
              </tr>
            ))}
            {approvals.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  style={{ padding: "12px 0", textAlign: "center", color: "#999" }}
                >
                  暂无审批任务，请先新增。
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SectionDigitalTwin() {
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const nodeToDisplay = selectedNode
    ? digitalTwinMock.processNodes.find((n) => n.id === selectedNode)
    : null;

  return (
    <div>
      <h2>数字孪生 - 选矿工艺流程实时监控</h2>
      <p style={{ fontSize: 12, color: "#666", marginBottom: 12 }}>
        以工艺流程图为导航，动态、实时地展示设备状态、物料流向、关键工艺参数。
      </p>

      {/* 实时生产指标 */}
      <div style={{ marginBottom: 16 }}>
        <h3 style={{ marginBottom: 8 }}>实时生产指标</h3>
        <KpiCards
          items={digitalTwinMock.productionMetrics.metrics.map((m) => ({
            name: m.name,
            value: m.value,
            unit: m.unit,
          }))}
        />
        <div style={{ textAlign: 'right', fontSize: 11, color: '#999' }}>
          最后更新：{digitalTwinMock.productionMetrics.updateTime}
        </div>
      </div>

      {/* 工艺流程阶段导航 */}
      <div style={{ marginBottom: 16 }}>
        <h3 style={{ marginBottom: 8 }}>工艺流程阶段</h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {digitalTwinMock.processStages.map((stage) => (
            <div
              key={stage.id}
              onClick={() => setSelectedStage(stage.id)}
              style={{
                padding: '8px 16px',
                borderRadius: 20,
                border: `2px solid ${selectedStage === stage.id ? '#1677ff' : '#e8e8e8'}`,
                background: selectedStage === stage.id ? '#e6f7ff' : '#fff',
                cursor: 'pointer',
                fontSize: 13,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                transition: 'all 0.2s',
              }}
            >
              <span>{stage.icon}</span>
              <span>{stage.name}</span>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background:
                    stage.status === 'running'
                      ? '#52c41a'
                      : stage.status === 'warning'
                      ? '#faad14'
                      : '#ff4d4f',
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 设备列表 & 参数显示 */}
      <div style={{ display: 'flex', gap: 16 }}>
        {/* 左侧：设备列表 */}
        <div style={{ width: 300, maxHeight: 600, overflow: 'auto' }}>
          <h3 style={{ marginBottom: 8, position: 'sticky', top: 0, background: '#f5f7fa', paddingBottom: 8 }}>
            设备列表
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {digitalTwinMock.processNodes.map((node) => (
              <div
                key={node.id}
                onClick={() => setSelectedNode(node.id)}
                style={{
                  padding: 12,
                  borderRadius: 8,
                  border: `1px solid ${selectedNode === node.id ? '#1677ff' : '#e8e8e8'}`,
                  background: selectedNode === node.id ? '#e6f7ff' : '#fff',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{node.name}</div>
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      background:
                        node.status === 'running'
                          ? '#52c41a'
                          : node.status === 'warning'
                          ? '#faad14'
                          : node.status === 'stopped'
                          ? '#999'
                          : '#ff4d4f',
                    }}
                  />
                </div>
                <div style={{ fontSize: 11, color: '#999' }}>
                  {node.type === 'equipment' && '⚙️ 设备'}
                  {node.type === 'tank' && '🚧 罐体'}
                  {node.type === 'pump' && '💧 泵'}
                  {node.type === 'conveyor' && '➡️ 皮带'}
                  {node.type === 'storage' && '📦 存储'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 右侧：设备详情 */}
        <div style={{ flex: 1 }}>
          {nodeToDisplay ? (
            <div>
              <div
                style={{
                  background: '#fff',
                  borderRadius: 8,
                  padding: 16,
                  border: '1px solid #e8e8e8',
                  marginBottom: 16,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <h3 style={{ margin: 0 }}>{nodeToDisplay.name}</h3>
                  <div
                    style={{
                      padding: '4px 12px',
                      borderRadius: 12,
                      fontSize: 12,
                      background:
                        nodeToDisplay.status === 'running'
                          ? '#f6ffed'
                          : nodeToDisplay.status === 'warning'
                          ? '#fffbe6'
                          : nodeToDisplay.status === 'stopped'
                          ? '#f5f5f5'
                          : '#fff1f0',
                      color:
                        nodeToDisplay.status === 'running'
                          ? '#52c41a'
                          : nodeToDisplay.status === 'warning'
                          ? '#faad14'
                          : nodeToDisplay.status === 'stopped'
                          ? '#999'
                          : '#ff4d4f',
                      border: `1px solid ${
                        nodeToDisplay.status === 'running'
                          ? '#b7eb8f'
                          : nodeToDisplay.status === 'warning'
                          ? '#ffe58f'
                          : nodeToDisplay.status === 'stopped'
                          ? '#d9d9d9'
                          : '#ffccc7'
                      }`,
                    }}
                  >
                    {nodeToDisplay.status === 'running' && '✅ 运行中'}
                    {nodeToDisplay.status === 'warning' && '⚠️ 警告'}
                    {nodeToDisplay.status === 'stopped' && '⏸️ 停机'}
                    {nodeToDisplay.status === 'alarm' && '🚨 报警'}
                  </div>
                </div>

                <div style={{ fontSize: 12, color: '#666' }}>
                  设备类型：
                  {nodeToDisplay.type === 'equipment' && '设备'}
                  {nodeToDisplay.type === 'tank' && '罐体'}
                  {nodeToDisplay.type === 'pump' && '泵'}
                  {nodeToDisplay.type === 'conveyor' && '皮带'}
                  {nodeToDisplay.type === 'storage' && '存储'}
                </div>
              </div>

              <div
                style={{
                  background: '#fff',
                  borderRadius: 8,
                  padding: 16,
                  border: '1px solid #e8e8e8',
                }}
              >
                <h3 style={{ marginTop: 0, marginBottom: 12 }}>实时参数</h3>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: 12,
                  }}
                >
                  {nodeToDisplay.parameters.map((param, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: 12,
                        borderRadius: 6,
                        background:
                          param.status === 'warning'
                            ? '#fffbe6'
                            : param.status === 'alarm'
                            ? '#fff1f0'
                            : '#f5f5f5',
                        border: `1px solid ${
                          param.status === 'warning'
                            ? '#ffe58f'
                            : param.status === 'alarm'
                            ? '#ffccc7'
                            : '#e8e8e8'
                        }`,
                      }}
                    >
                      <div style={{ fontSize: 11, color: '#999', marginBottom: 4 }}>
                        {param.name}
                      </div>
                      <div style={{ fontSize: 18, fontWeight: 600, color: '#333' }}>
                        {param.value}
                        {param.unit && (
                          <span style={{ fontSize: 12, fontWeight: 400, marginLeft: 4, color: '#666' }}>
                            {param.unit}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div
              style={{
                background: '#fff',
                borderRadius: 8,
                padding: 60,
                border: '1px solid #e8e8e8',
                textAlign: 'center',
                color: '#999',
              }}
            >
              👈 请选择左侧设备查看详情
            </div>
          )}
        </div>
      </div>
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
    case "digitalTwin":
      return <SectionDigitalTwin />;
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
  digitalTwin: '🧰',
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
