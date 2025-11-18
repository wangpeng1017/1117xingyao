"use client";

import React, { useState } from "react";
import Layout from "@/components/Layout";
import {
  navItems,
  type NavKey,
  type ProductionPlan,
  geoInfoMock,
  drillholeDbMock,
  geology3DMock,
  resource3DMock,
  geoEconomicMock,
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

function SimpleModal({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.35)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: 480,
          maxWidth: '90%',
          background: '#fff',
          borderRadius: 8,
          boxShadow: '0 12px 24px rgba(0,0,0,0.18)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            padding: '12px 16px',
            borderBottom: '1px solid #f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 500 }}>{title}</span>
          <button
            type="button"
            onClick={onClose}
            style={{
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              fontSize: 18,
              lineHeight: 1,
              padding: 0,
            }}
          >
            ×
          </button>
        </div>
        <div style={{ padding: 16 }}>{children}</div>
      </div>
    </div>
  );
}

function SectionAlarmCenter() {
  type AlarmLevel = '全部' | 'Ⅰ级' | 'Ⅱ级' | 'Ⅲ级';
  type AlarmRecord = {
    time: string;
    module: string;
    type: string;
    level: 'Ⅰ级' | 'Ⅱ级' | 'Ⅲ级';
    content: string;
    dept: string;
    owner: string;
    channel: string;
    status: string;
  };

  const alarmSeed: AlarmRecord[] = [
    {
      time: '2025-11-15 08:32',
      module: '露采生产',
      type: '工艺超标',
      level: 'Ⅱ级',
      content: '采剥比偏高',
      dept: '生产调度室',
      owner: '张工',
      channel: 'APP + 大屏',
      status: '已推送，待确认',
    },
    {
      time: '2025-11-15 09:05',
      module: '选矿生产',
      type: '工艺超标',
      level: 'Ⅱ级',
      content: '精矿品位低于下限',
      dept: '选矿厂中控',
      owner: '李班长',
      channel: 'APP',
      status: '处理中',
    },
    {
      time: '2025-11-15 09:48',
      module: '设备管理',
      type: '设备异常',
      level: 'Ⅰ级',
      content: 'SAG 磨振动异常',
      dept: '机修车间',
      owner: '王主任',
      channel: '短信 + APP',
      status: '已接单',
    },
    {
      time: '2025-11-15 10:12',
      module: '安全环保',
      type: '安全风险',
      level: 'Ⅰ级',
      content: '井下 CO 浓度接近上限',
      dept: '安环科',
      owner: '赵安监',
      channel: '短信 + 电话',
      status: '已联络现场',
    },
    {
      time: '2025-11-15 10:36',
      module: '尾矿库',
      type: '环保风险',
      level: 'Ⅱ级',
      content: '尾矿库水位接近警戒',
      dept: '尾矿库管理所',
      owner: '陈值班',
      channel: 'APP + 大屏',
      status: '已启动加高排水',
    },
    {
      time: '2025-11-15 11:05',
      module: '地采生产',
      type: '采场贫化',
      level: 'Ⅲ级',
      content: '3503-1401 采场贫化率偏高',
      dept: '采矿工区',
      owner: '刘工',
      channel: 'APP',
      status: '已下达调整方案',
    },
    {
      time: '2025-11-15 11:42',
      module: '移动端待办',
      type: '审批超时',
      level: 'Ⅲ级',
      content: '高风险作业票待审批超 30min',
      dept: '安环科',
      owner: '周主管',
      channel: 'APP + 企业微信',
      status: '已催办',
    },
    {
      time: '2025-11-15 12:10',
      module: '设备管理',
      type: '停机异常',
      level: 'Ⅱ级',
      content: '主皮带停机超过 15min',
      dept: '机电队',
      owner: '孙班长',
      channel: 'APP',
      status: '处理中',
    },
    {
      time: '2025-11-15 13:25',
      module: '选矿能耗',
      type: '能耗异常',
      level: 'Ⅲ级',
      content: '磨矿段单耗高于目标 8%',
      dept: '工艺室',
      owner: '钱工',
      channel: 'APP',
      status: '分析中',
    },
    {
      time: '2025-11-15 14:03',
      module: '人员定位',
      type: '人员滞留',
      level: 'Ⅱ级',
      content: '井下东翼作业面有人超时未出井',
      dept: '调度室',
      owner: '值班调度',
      channel: '短信 + APP',
      status: '已联系班组',
    },
    {
      time: '2025-11-15 14:40',
      module: '露采边坡',
      type: '边坡位移',
      level: 'Ⅰ级',
      content: '西帮边坡位移速率异常',
      dept: '安监室',
      owner: '邓工',
      channel: '短信 + 大屏',
      status: '已启动应急预案',
    },
  ];

  const [alarms, setAlarms] = React.useState<AlarmRecord[]>(alarmSeed);

  const [levelFilter, setLevelFilter] = React.useState<AlarmLevel>('全部');
  const [moduleFilter, setModuleFilter] = React.useState<string>('全部');

  const modules = Array.from(new Set(alarms.map((a) => a.module)));

  const filtered = alarms.filter((a) => {
    if (levelFilter !== '全部' && a.level !== levelFilter) return false;
    if (moduleFilter !== '全部' && a.module !== moduleFilter) return false;
    return true;
  });

  const handleConfirm = (time: string) => {
    setAlarms((prev) =>
      prev.map((a) =>
        a.time === time
          ? { ...a, status: a.status.startsWith('已关闭') ? a.status : '已确认，待处置' }
          : a,
      ),
    );
  };

  const handleClose = (time: string) => {
    setAlarms((prev) =>
      prev.map((a) =>
        a.time === time ? { ...a, status: '已关闭' } : a,
      ),
    );
  };

  return (
    <div>
      <h2>集中报警管理</h2>
      <p style={{ fontSize: 12, color: '#666', marginBottom: 12 }}>
        建立统一的报警平台，将工艺超标、设备异常、安全环保风险、能耗异常等报警集中管理，按等级和类别分发给对应责任部门和责任人，保障异常及时响应和闭环。
      </p>

      <KpiCards
        items={[
          { name: '今日报警总数', value: alarms.length, unit: '条' },
          { name: 'Ⅰ级报警', value: alarms.filter((a) => a.level === 'Ⅰ级').length, unit: '条' },
          { name: '未处理报警', value: alarms.filter((a) => !a.status.startsWith('已关闭')).length, unit: '条' },
          { name: '平均响应时间', value: '6.5', unit: 'min' },
        ]}
      />

      <div
        style={{
          display: 'flex',
          gap: 12,
          alignItems: 'center',
          marginTop: 8,
          marginBottom: 8,
          fontSize: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span>按等级筛选：</span>
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value as AlarmLevel)}
            style={{ padding: '4px 8px', fontSize: 12, borderRadius: 4, border: '1px solid #d9d9d9' }}
          >
            <option value="全部">全部</option>
            <option value="Ⅰ级">Ⅰ级</option>
            <option value="Ⅱ级">Ⅱ级</option>
            <option value="Ⅲ级">Ⅲ级</option>
          </select>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span>按模块筛选：</span>
          <select
            value={moduleFilter}
            onChange={(e) => setModuleFilter(e.target.value)}
            style={{ padding: '4px 8px', fontSize: 12, borderRadius: 4, border: '1px solid #d9d9d9' }}
          >
            <option value="全部">全部</option>
            {modules.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>

      <h3 style={{ marginTop: 8, marginBottom: 8 }}>集中报警列表</h3>
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
              {['触发时间', '来源模块', '报警类型', '等级', '报警内容', '责任部门', '责任人', '推送渠道', '当前状态', '操作'].map((h) => (
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
            {filtered.map((a) => (
              <tr key={`${a.time}-${a.module}-${a.type}`}>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0', whiteSpace: 'nowrap' }}>{a.time}</td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0', whiteSpace: 'nowrap' }}>{a.module}</td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0', whiteSpace: 'nowrap' }}>{a.type}</td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0', whiteSpace: 'nowrap' }}>{a.level}</td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0', whiteSpace: 'nowrap' }}>{a.content}</td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0', whiteSpace: 'nowrap' }}>{a.dept}</td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0', whiteSpace: 'nowrap' }}>{a.owner}</td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0', whiteSpace: 'nowrap' }}>{a.channel}</td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0', whiteSpace: 'nowrap' }}>{a.status}</td>
                <td
                  style={{
                    padding: '8px 12px',
                    borderBottom: '1px solid #f0f0f0',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => handleConfirm(a.time)}
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
                    确认
                  </button>
                  <button
                    type="button"
                    onClick={() => handleClose(a.time)}
                    style={{
                      padding: '4px 8px',
                      fontSize: 12,
                      borderRadius: 4,
                      border: '1px solid #52c41a',
                      background: '#fff',
                      color: '#52c41a',
                      cursor: 'pointer',
                    }}
                  >
                    关闭
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={10}
                  style={{ padding: '12px 0', textAlign: 'center', color: '#999' }}
                >
                  当前筛选条件下暂无报警记录。
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p style={{ fontSize: 12, color: '#666', marginTop: 8 }}>
        后续可与短信平台、企业微信、移动 App 联动，实现按岗位、班组、专业实时推送，并支持报警确认、处置记录和效果评估等全流程管理。
      </p>
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
  const [subTab, setSubTab] = React.useState<
    'projects' | 'drillholes' | 'geology3d' | 'resource3d' | 'economy'
  >('projects');

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

    const plannedMeters = plannedMetersInput
      ? Number(plannedMetersInput) || project.plannedMeters
      : project.plannedMeters;
    const completedMeters = completedMetersInput
      ? Number(completedMetersInput) || project.completedMeters
      : project.completedMeters;

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
        管理地勘项目、钻孔数据库、三维模型和地质经济指标联动，为集团决策提供支撑。
      </p>

      {/* 子 Tab 导航 */}
      <div
        style={{
          display: 'flex',
          gap: 8,
          marginTop: 16,
          marginBottom: 16,
          borderBottom: '1px solid #eee',
        }}
      >
        {[
          { key: 'projects', label: '📁 项目与进度' },
          { key: 'drillholes', label: '🕳️ 钻孔数据库' },
          { key: 'geology3d', label: '🗺️ 三维地质模型' },
          { key: 'resource3d', label: '💎 三维资源模型' },
          { key: 'economy', label: '📊 地质经济联动分析' },
        ].map((t) => (
          <div
            key={t.key}
            onClick={() => setSubTab(t.key as typeof subTab)}
            style={{
              padding: '8px 16px',
              cursor: 'pointer',
              borderBottom:
                subTab === t.key ? '2px solid #1677ff' : '2px solid transparent',
              color: subTab === t.key ? '#1677ff' : '#666',
              fontWeight: subTab === t.key ? 600 : 400,
              fontSize: 13,
              whiteSpace: 'nowrap',
            }}
          >
            {t.label}
          </div>
        ))}
      </div>

      {/* 1）项目与钻探进度 */}
      {subTab === 'projects' && (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 8,
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
      )}

      {/* 2）钻孔数据库 */}
      {subTab === 'drillholes' && (
        <div>
          <h3 style={{ marginTop: 0, marginBottom: 8 }}>钻孔数据库</h3>
          <p style={{ fontSize: 12, color: '#666', marginBottom: 8 }}>
            管理钻孔开孔坐标、孔深、方位/倾角等工程信息，为三维地质建模和资源量估算提供基础数据。
          </p>
          <KpiCards items={drillholeDbMock.kpis} />
          <BasicTable
            headers={[
              '钻孔编号',
              'X',
              'Y',
              'Z',
              '孔深(m)',
              '方位/倾角',
              '施工单位',
              '状态',
            ]}
            rows={drillholeDbMock.drillholes.map((h) => [
              h.holeId,
              h.collarX.toFixed(2),
              h.collarY.toFixed(2),
              h.collarZ.toFixed(1),
              h.depth,
              `${h.azimuth}° / ${h.dip}°`,
              h.contractor,
              h.status,
            ])}
          />
        </div>
      )}

      {/* 3）三维地质模型 */}
      {subTab === 'geology3d' && (
        <div>
          <h3 style={{ marginTop: 0, marginBottom: 8 }}>三维地质模型概要</h3>
          <p style={{ fontSize: 12, color: '#666', marginBottom: 8 }}>
            直观展示地层、构造及 DEM 高程信息，可对接外部三维软件进行可视化。
          </p>
          <KpiCards items={geology3DMock.kpis} />
          <h4 style={{ marginTop: 8, marginBottom: 4 }}>主要地层单元</h4>
          <BasicTable
            headers={['代号', '名称', '时代', '岩性', '厚度范围', '平均厚度(m)']}
            rows={geology3DMock.layers.map((l) => [
              l.code,
              l.name,
              l.age,
              l.lithology,
              l.thicknessRange,
              l.avgThickness,
            ])}
          />
          <h4 style={{ marginTop: 16, marginBottom: 4 }}>主要断层</h4>
          <BasicTable
            headers={['编号', '名称', '性质', '走向(°)', '倾角(°)', '断距', '说明']}
            rows={geology3DMock.faults.map((f) => [
              f.id,
              f.name,
              f.type,
              f.strike,
              f.dip,
              f.throwDesc,
              f.remark,
            ])}
          />
        </div>
      )}

      {/* 4）三维资源模型 */}
      {subTab === 'resource3d' && (
        <div>
          <h3 style={{ marginTop: 0, marginBottom: 8 }}>三维资源模型</h3>
          <p style={{ fontSize: 12, color: '#666', marginBottom: 8 }}>
            基于三维块体模型统计矿体资源量与品位分布，可作为采矿设计与生产计划编制的资源基础。
          </p>
          <KpiCards items={resource3DMock.kpis} />
          <h4 style={{ marginTop: 8, marginBottom: 4 }}>矿体汇总</h4>
          <BasicTable
            headers={['矿体编号', '名称', '类型', '资源类别', '资源量(t)', 'Cu(%)', 'Au(g/t)']}
            rows={resource3DMock.oreBodies.map((o) => [
              o.id,
              o.name,
              o.type,
              o.category,
              o.tonnage,
              o.avgGradeCu,
              o.avgGradeAu,
            ])}
          />
          <h4 style={{ marginTop: 16, marginBottom: 4 }}>Cu 品位区间分布</h4>
          <BasicTable
            headers={['品位区间', '矿石量(t)', '占比(%)']}
            rows={resource3DMock.gradeBands.map((g) => [
              g.range,
              g.tonnage,
              g.percentage,
            ])}
          />
        </div>
      )}

      {/* 5）地质经济联动分析 */}
      {subTab === 'economy' && (
        <div>
          <h3 style={{ marginTop: 0, marginBottom: 8 }}>地质经济联动分析</h3>
          <p style={{ fontSize: 12, color: '#666', marginBottom: 8 }}>
            将钻探进尺、样品分析与新增资源量、资源价值联动，实现“地质成果 → 经济价值”的量化闭环，可对接集团财务系统。
          </p>
          <KpiCards items={geoEconomicMock.kpis} />
          <BasicTable
            headers={[
              '项目编号',
              '项目名称',
              '钻探进尺(m)',
              '勘探投资(元)',
              '新增资源量(t)',
              '新增 Cu 金属量(t)',
              '新增资源价值(元)',
              '投入产出比(倍)',
            ]}
            rows={geoEconomicMock.byProject.map((p) => [
              p.projectId,
              p.name,
              p.drillMeters,
              p.invest,
              p.newResourceTonnage,
              p.newCuMetal,
              p.newValue,
              p.roi,
            ])}
          />
        </div>
      )}
    </div>
  );
}

function SectionOpenPit() {
  const [dailyProduction, setDailyProduction] = React.useState(openPitMock.dailyProduction);
  const [subTab, setSubTab] = React.useState<'ledger' | 'plan' | 'design' | 'data'>('ledger');
  const [recordModalMode, setRecordModalMode] = React.useState<'create' | 'edit' | null>(null);
  const [recordForm, setRecordForm] = React.useState({
    date: '2025-11-16',
    bench: '',
    oreTonnage: '',
    wasteTonnage: '',
    avgGradeFe: '',
    dilutionRate: '',
    powderFactor: '',
  });
  const [editingKey, setEditingKey] = React.useState<{ date: string; bench: string } | null>(null);

  const handleAddRecord = () => {
    setRecordModalMode('create');
    setEditingKey(null);
    setRecordForm({
      date: '2025-11-16',
      bench: '',
      oreTonnage: '',
      wasteTonnage: '',
      avgGradeFe: '',
      dilutionRate: '',
      powderFactor: '',
    });
  };

  const handleEditRecord = (record: (typeof openPitMock.dailyProduction)[number]) => {
    setRecordModalMode('edit');
    setEditingKey({ date: record.date, bench: record.bench });
    setRecordForm({
      date: record.date,
      bench: record.bench,
      oreTonnage: String(record.oreTonnage),
      wasteTonnage: String(record.wasteTonnage),
      avgGradeFe: String(record.avgGradeFe),
      dilutionRate: String(record.dilutionRate),
      powderFactor: String(record.powderFactor),
    });
  };

  const handleSubmitRecord = () => {
    if (!recordForm.date || !recordForm.bench) {
      alert('请填写日期和台阶');
      return;
    }
    const nextRecord = {
      date: recordForm.date,
      bench: recordForm.bench,
      oreTonnage: recordForm.oreTonnage ? Number(recordForm.oreTonnage) || 0 : 0,
      wasteTonnage: recordForm.wasteTonnage ? Number(recordForm.wasteTonnage) || 0 : 0,
      avgGradeFe: recordForm.avgGradeFe ? Number(recordForm.avgGradeFe) || 0 : 0,
      dilutionRate: recordForm.dilutionRate ? Number(recordForm.dilutionRate) || 0 : 0,
      powderFactor: recordForm.powderFactor ? Number(recordForm.powderFactor) || 0 : 0,
    };

    if (recordModalMode === 'create') {
      setDailyProduction((prev) => [...prev, nextRecord]);
    } else if (recordModalMode === 'edit' && editingKey) {
      setDailyProduction((prev) =>
        prev.map((r) =>
          r.date === editingKey.date && r.bench === editingKey.bench
            ? nextRecord
            : r,
        ),
      );
    }

    setRecordModalMode(null);
    setEditingKey(null);
  };

  const handleDeleteRecord = (record: (typeof openPitMock.dailyProduction)[number]) => {
    if (!window.confirm('确定要删除该采剥记录吗？')) return;
    setDailyProduction((prev) =>
      prev.filter((r) => !(r.date === record.date && r.bench === record.bench)),
    );
  };

  const planRows: (string | number | null)[][] = [
    ['短期', '2025年11月·周计划 W46', '1180m 平台采剥', 4000, 8000, '保证采剥比约 1.7，剥离超前 1 台阶'],
    ['短期', '2025年11月·周计划 W47', '1170m 平台采剥', 4200, 8200, '配合选厂高品位来矿需求'],
    ['短期', '2025年11月·周计划 W48', '1160m 平台采剥', 4100, 7900, '错峰安排设备检修，保证剥离不断档'],
    ['短期', '2025年11月·月计划', '露天采剥合计', 185000, 320000, '对齐选厂日处理 4000t 节奏'],
    ['中长期', '2025 年露天采剥年度计划', '露天采场群', 2200000, 6800000, '保证 2 年服务年限内台阶高度与边坡稳定'],
    ['中长期', '露天阶段（第1-2年）生命周期计划', '露天→井下过渡', 3000000, 9000000, '为后续井下接替预留采场空间'],
    ['中长期', '西帮排土场排土计划', '排土场 A/B', 0, 9500000, '控制排土场堆积坡角与稳定性'],
    ['中长期', '剥离超前计划', '1180/1170/1160m 平台', 0, 1500000, '剥离超前 1-2 个台阶，保障矿量接替'],
    ['保障类', '雨季前剥离拉前计划', '浅表废石', 0, 600000, '雨季前完成易滑坡区域剥离'],
    ['保障类', '外协采剥合同计划', '外委队伍', 500000, 1200000, '外委产能纳入统一计划管理'],
  ];

  const designRows: (string | number | null)[][] = [
    ['露天台阶爆区 A-2025W46', '台阶孔网 3.0m×3.5m', '12m', '底部集中装药+分段装药', '0.65 kg/m³'],
    ['露天边坡缓倾爆破区 B', '台阶孔网 2.5m×3.0m', '10m', '减装药+周边孔光面爆破', '0.52 kg/m³'],
    ['排土场基底预裂带 C', '预裂孔距 2.0m×2.5m', '8m', '周边孔连续装药+减装药', '0.48 kg/m³'],
    ['硬岩集中爆区 D', '台阶孔网 3.5m×4.0m', '15m', '集中装药+耦合装药', '0.72 kg/m³'],
    ['软岩缓倾爆区 E', '台阶孔网 3.0m×4.0m', '10m', '分散装药+间隔装药', '0.55 kg/m³'],
    ['试验爆破区 F', '台阶孔网 2.8m×3.2m', '12m', '多方案对比试验', '0.60 kg/m³'],
    ['边坡加固光爆带 G', '光爆孔距 0.8m×1.0m', '12m', '周边孔减装药+不耦合装药', '0.40 kg/m³'],
    ['药量优化区 H', '台阶孔网 3.2m×3.6m', '14m', '按块度目标动态调整单耗', '0.68 kg/m³'],
    ['环保降震控制区 I', '台阶孔网 3.0m×3.5m', '12m', '微差起爆+分段装药', '0.58 kg/m³'],
    ['深孔试采区 J', '深孔间距 4.0m×4.5m', '18m', '深孔集中装药+多段起爆', '0.75 kg/m³'],
  ];

  const dataMonitorRows: (string | number | null)[][] = [
    ['2025-11-15', '白班', '1180m 台阶采装', 1850, 1780, 32, 0.62, 18, 0, '生产平稳'],
    ['2025-11-15', '中班', '1180m 台阶采装', 1760, 1695, 30, 0.60, 17, 0, '与计划基本一致'],
    ['2025-11-15', '夜班', '1180m 台阶采装', 1620, 1580, 28, 0.59, 15, 0, '夜班效率略低'],
    ['2025-11-15', '白班', '1170m 台阶采装', 1930, 1860, 34, 0.64, 19, 1, '边坡雷达短暂告警'],
    ['2025-11-15', '中班', '1170m 台阶采装', 1880, 1810, 33, 0.63, 18, 0, '告警已解除'],
    ['2025-11-15', '夜班', '1170m 台阶采装', 1705, 1650, 29, 0.61, 16, 0, '照明充足，运行正常'],
    ['2025-11-15', '白班', '排土场 A 区', 0, 3250, 0, 0.0, 12, 0, '排土场运行正常'],
    ['2025-11-15', '中班', '排土场 A 区', 0, 3120, 0, 0.0, 11, 0, '湿度偏大，注意边坡'],
    ['2025-11-15', '白班', '钻机作业区 D', 0, 0, 24, 0.58, 4, 0, '钻机利用率 87%'],
    ['2025-11-15', '中班', '钻机作业区 D', 0, 0, 22, 0.57, 4, 0, '完成全部设计孔'],
    ['2025-11-15', '夜班', '全场 IoT 汇总', 0, 0, 0, null, 32, 0, 'GPS 在线率 98%，称重在线率 99%'],
  ];

  return (
    <div>
      <h2>露采生产管理</h2>
      <p style={{ fontSize: 12, color: '#666', marginBottom: 12 }}>
        覆盖露天阶段的生产规划、钻爆设计、采剥台账与实时生产监控，关注采剥比、贫化率等关键指标。
      </p>
      <KpiCards items={openPitMock.kpis} />

      <div
        style={{
          display: 'flex',
          gap: 8,
          marginTop: 16,
          marginBottom: 12,
          flexWrap: 'wrap',
        }}
      >
        <button
          type="button"
          onClick={() => setSubTab('ledger')}
          style={{
            padding: '6px 12px',
            borderRadius: 16,
            border: subTab === 'ledger' ? '1px solid #1677ff' : '1px solid #d9d9d9',
            background: subTab === 'ledger' ? 'rgba(22,119,255,0.08)' : '#fff',
            color: subTab === 'ledger' ? '#1677ff' : '#595959',
            fontSize: 12,
            cursor: 'pointer',
          }}
        >
          日采剥台账
        </button>
        <button
          type="button"
          onClick={() => setSubTab('plan')}
          style={{
            padding: '6px 12px',
            borderRadius: 16,
            border: subTab === 'plan' ? '1px solid #1677ff' : '1px solid #d9d9d9',
            background: subTab === 'plan' ? 'rgba(22,119,255,0.08)' : '#fff',
            color: subTab === 'plan' ? '#1677ff' : '#595959',
            fontSize: 12,
            cursor: 'pointer',
          }}
        >
          生产规划（短期/中长期）
        </button>
        <button
          type="button"
          onClick={() => setSubTab('design')}
          style={{
            padding: '6px 12px',
            borderRadius: 16,
            border: subTab === 'design' ? '1px solid #1677ff' : '1px solid #d9d9d9',
            background: subTab === 'design' ? 'rgba(22,119,255,0.08)' : '#fff',
            color: subTab === 'design' ? '#1677ff' : '#595959',
            fontSize: 12,
            cursor: 'pointer',
          }}
        >
          钻爆设计
        </button>
        <button
          type="button"
          onClick={() => setSubTab('data')}
          style={{
            padding: '6px 12px',
            borderRadius: 16,
            border: subTab === 'data' ? '1px solid #1677ff' : '1px solid #d9d9d9',
            background: subTab === 'data' ? 'rgba(22,119,255,0.08)' : '#fff',
            color: subTab === 'data' ? '#1677ff' : '#595959',
            fontSize: 12,
            cursor: 'pointer',
          }}
        >
          数据采集与监控
        </button>
      </div>

      {subTab === 'ledger' && (
        <>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 8,
              marginBottom: 8,
            }}
          >
            <h3 style={{ margin: 0 }}>采剥生产台账</h3>
            <button
              type="button"
              onClick={handleAddRecord}
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
              新增记录
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
                  {['日期', '台阶', '矿量(t)', '剥离量(m³)', '平均品位(Fe, %)', '贫化率(%)', '单耗(kg炸药/t)', '操作'].map((h) => (
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
                {dailyProduction.map((r) => (
                  <tr key={`${r.date}-${r.bench}`}>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0', whiteSpace: 'nowrap' }}>{r.date}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0', whiteSpace: 'nowrap' }}>{r.bench}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0', whiteSpace: 'nowrap' }}>{r.oreTonnage}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0', whiteSpace: 'nowrap' }}>{r.wasteTonnage}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0', whiteSpace: 'nowrap' }}>{r.avgGradeFe}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0', whiteSpace: 'nowrap' }}>{r.dilutionRate}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0', whiteSpace: 'nowrap' }}>{r.powderFactor}</td>
                    <td
                      style={{
                        padding: '8px 12px',
                        borderBottom: '1px solid #f0f0f0',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => handleEditRecord(r)}
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
                        onClick={() => handleDeleteRecord(r)}
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
                {dailyProduction.length === 0 && (
                  <tr>
                    <td
                      colSpan={8}
                      style={{ padding: '12px 0', textAlign: 'center', color: '#999' }}
                    >
                      暂无记录，请先新增。
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {subTab === 'plan' && (
        <div style={{ marginTop: 8 }}>
          <h3 style={{ margin: '0 0 8px 0' }}>生产规划（露采阶段）</h3>
          <BasicTable
            headers={['计划类型', '期间/阶段', '对象', '计划矿石量(t)', '计划剥离量(m³)', '关键说明']}
            rows={planRows}
          />
        </div>
      )}

      {subTab === 'design' && (
        <div style={{ marginTop: 8 }}>
          <h3 style={{ margin: '0 0 8px 0' }}>钻爆设计（露天）</h3>
          <BasicTable
            headers={['设计名称', '孔网参数', '孔深', '装药结构', '单位炸药单耗']}
            rows={designRows}
          />
          <p style={{ fontSize: 12, color: '#666', marginTop: 8 }}>
            后续可与数字孪生采场模型联动，在 3D 场景中调整孔网参数并实时评估爆堆块度与边坡稳定性影响。
          </p>
        </div>
      )}

      {subTab === 'data' && (
        <div style={{ marginTop: 8 }}>
          <h3 style={{ margin: '0 0 8px 0' }}>数据采集与实时监控</h3>
          <BasicTable
            headers={['日期', '班次', '作业段/区域', '挖掘量(t)', '运输量(t)', '钻孔数(个)', '爆破单耗(kg/t)', 'GPS 在线车辆数', '边坡告警次数', '备注']}
            rows={dataMonitorRows}
          />
          <p style={{ fontSize: 12, color: '#666', marginTop: 8 }}>下表展示了按班次汇总的挖掘、运输、钻孔及 IoT 监测数据，可与生产计划自动对比，形成实时监控看板。</p>
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12, color: '#595959' }}>
            <li>日生产数据：按班次录入挖掘、运输、钻爆等数据，与采剥计划自动勾稽。</li>
            <li>实时数据：接入卡车称重、GPS、边坡监测等 IoT 数据，形成采场实时看板。</li>
            <li>监督能力：按采场/台阶统计采剥比偏差、贫化率异常，实现预警和处置闭环。</li>
            <li>效率提升：分析设备利用率、空转时间、待料/待装占比，识别瓶颈环节。</li>
            <li>操作准确性：对比设计孔网与实际爆破效果，形成班组/个人操作准确性评价。</li>
          </ul>
        </div>
      )}
      <SimpleModal
        open={recordModalMode !== null}
        title={recordModalMode === 'create' ? '新增采剥记录' : '编辑采剥记录'}
        onClose={() => {
          setRecordModalMode(null);
          setEditingKey(null);
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: 12,
            marginBottom: 16,
          }}
        >
          <div>
            <div style={{ fontSize: 12, marginBottom: 4 }}>日期</div>
            <input
              type="text"
              value={recordForm.date}
              onChange={(e) => setRecordForm((prev) => ({ ...prev, date: e.target.value }))}
              style={{ width: '100%', padding: '6px 8px', fontSize: 12, borderRadius: 4, border: '1px solid #d9d9d9' }}
            />
          </div>
          <div>
            <div style={{ fontSize: 12, marginBottom: 4 }}>台阶</div>
            <input
              type="text"
              value={recordForm.bench}
              onChange={(e) => setRecordForm((prev) => ({ ...prev, bench: e.target.value }))}
              style={{ width: '100%', padding: '6px 8px', fontSize: 12, borderRadius: 4, border: '1px solid #d9d9d9' }}
            />
          </div>
          <div>
            <div style={{ fontSize: 12, marginBottom: 4 }}>矿量(t)</div>
            <input
              type="number"
              value={recordForm.oreTonnage}
              onChange={(e) => setRecordForm((prev) => ({ ...prev, oreTonnage: e.target.value }))}
              style={{ width: '100%', padding: '6px 8px', fontSize: 12, borderRadius: 4, border: '1px solid #d9d9d9' }}
            />
          </div>
          <div>
            <div style={{ fontSize: 12, marginBottom: 4 }}>剥离量(m³)</div>
            <input
              type="number"
              value={recordForm.wasteTonnage}
              onChange={(e) => setRecordForm((prev) => ({ ...prev, wasteTonnage: e.target.value }))}
              style={{ width: '100%', padding: '6px 8px', fontSize: 12, borderRadius: 4, border: '1px solid #d9d9d9' }}
            />
          </div>
          <div>
            <div style={{ fontSize: 12, marginBottom: 4 }}>平均品位(Fe, %)</div>
            <input
              type="number"
              value={recordForm.avgGradeFe}
              onChange={(e) => setRecordForm((prev) => ({ ...prev, avgGradeFe: e.target.value }))}
              style={{ width: '100%', padding: '6px 8px', fontSize: 12, borderRadius: 4, border: '1px solid #d9d9d9' }}
            />
          </div>
          <div>
            <div style={{ fontSize: 12, marginBottom: 4 }}>贫化率(%)</div>
            <input
              type="number"
              value={recordForm.dilutionRate}
              onChange={(e) => setRecordForm((prev) => ({ ...prev, dilutionRate: e.target.value }))}
              style={{ width: '100%', padding: '6px 8px', fontSize: 12, borderRadius: 4, border: '1px solid #d9d9d9' }}
            />
          </div>
          <div>
            <div style={{ fontSize: 12, marginBottom: 4 }}>单耗(kg炸药/t)</div>
            <input
              type="number"
              value={recordForm.powderFactor}
              onChange={(e) => setRecordForm((prev) => ({ ...prev, powderFactor: e.target.value }))}
              style={{ width: '100%', padding: '6px 8px', fontSize: 12, borderRadius: 4, border: '1px solid #d9d9d9' }}
            />
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <button
            type="button"
            onClick={() => {
              setRecordModalMode(null);
              setEditingKey(null);
            }}
            style={{
              padding: '6px 12px',
              fontSize: 12,
              borderRadius: 4,
              border: '1px solid #d9d9d9',
              background: '#fff',
              color: '#595959',
              cursor: 'pointer',
              marginRight: 8,
            }}
          >
            取消
          </button>
          <button
            type="button"
            onClick={handleSubmitRecord}
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
      </SimpleModal>
    </div>
  );
}

function SectionUnderground() {
  const [drivageLedger, setDrivageLedger] = React.useState(undergroundMock.drivageLedger);
  const [stopingLedger, setStopingLedger] = React.useState(undergroundMock.stopingLedger);
  const [subTab, setSubTab] = React.useState<'drivage' | 'stoping' | 'plan' | 'dilution' | 'safety'>('drivage');
  const [drivageModalMode, setDrivageModalMode] = React.useState<'create' | 'edit' | null>(null);
  const [drivageForm, setDrivageForm] = React.useState({
    date: '2025-11-16',
    roadway: '',
    shift: '白班',
    length: '',
    rockClass: '',
    drillingMethod: '',
    remark: '',
  });
  const [drivageEditingKey, setDrivageEditingKey] = React.useState<{
    date: string;
    roadway: string;
    shift: string;
  } | null>(null);

  const [stopingModalMode, setStopingModalMode] = React.useState<'create' | 'edit' | null>(null);
  const [stopingForm, setStopingForm] = React.useState({
    stope: '',
    method: '充填法',
    date: '2025-11-16',
    oreTonnage: '',
    avgGradeFe: '',
    dilutionRate: '',
    filling: '是',
  });
  const [stopingEditingKey, setStopingEditingKey] = React.useState<{
    stope: string;
    date: string;
  } | null>(null);

  const handleAddDrivage = () => {
    setDrivageModalMode('create');
    setDrivageEditingKey(null);
    setDrivageForm({
      date: '2025-11-16',
      roadway: '',
      shift: '白班',
      length: '',
      rockClass: '',
      drillingMethod: '',
      remark: '',
    });
  };

  const handleEditDrivage = (row: (typeof undergroundMock.drivageLedger)[number]) => {
    setDrivageModalMode('edit');
    setDrivageEditingKey({ date: row.date, roadway: row.roadway, shift: row.shift });
    setDrivageForm({
      date: row.date,
      roadway: row.roadway,
      shift: row.shift,
      length: String(row.length),
      rockClass: row.rockClass,
      drillingMethod: row.drillingMethod,
      remark: row.remark,
    });
  };

  const handleSubmitDrivage = () => {
    if (!drivageForm.date || !drivageForm.roadway || !drivageForm.shift) {
      alert('请填写日期、巷道和班次');
      return;
    }
    const nextRow = {
      date: drivageForm.date,
      roadway: drivageForm.roadway,
      shift: drivageForm.shift,
      length: drivageForm.length ? Number(drivageForm.length) || 0 : 0,
      rockClass: drivageForm.rockClass,
      drillingMethod: drivageForm.drillingMethod,
      remark: drivageForm.remark,
    };

    if (drivageModalMode === 'create') {
      setDrivageLedger((prev) => [...prev, nextRow]);
    } else if (drivageModalMode === 'edit' && drivageEditingKey) {
      setDrivageLedger((prev) =>
        prev.map((r) =>
          r.date === drivageEditingKey.date &&
          r.roadway === drivageEditingKey.roadway &&
          r.shift === drivageEditingKey.shift
            ? nextRow
            : r,
        ),
      );
    }

    setDrivageModalMode(null);
    setDrivageEditingKey(null);
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
    setStopingModalMode('create');
    setStopingEditingKey(null);
    setStopingForm({
      stope: '',
      method: '充填法',
      date: '2025-11-16',
      oreTonnage: '',
      avgGradeFe: '',
      dilutionRate: '',
      filling: '是',
    });
  };

  const handleEditStoping = (row: (typeof undergroundMock.stopingLedger)[number]) => {
    setStopingModalMode('edit');
    setStopingEditingKey({ stope: row.stope, date: row.date });
    setStopingForm({
      stope: row.stope,
      method: row.method,
      date: row.date,
      oreTonnage: String(row.oreTonnage),
      avgGradeFe: String(row.avgGradeFe),
      dilutionRate: String(row.dilutionRate),
      filling: row.filling ? '是' : '否',
    });
  };

  const handleSubmitStoping = () => {
    if (!stopingForm.stope || !stopingForm.date) {
      alert('请填写采场和日期');
      return;
    }
    const nextRow = {
      stope: stopingForm.stope,
      method: stopingForm.method,
      date: stopingForm.date,
      oreTonnage: stopingForm.oreTonnage ? Number(stopingForm.oreTonnage) || 0 : 0,
      avgGradeFe: stopingForm.avgGradeFe ? Number(stopingForm.avgGradeFe) || 0 : 0,
      dilutionRate: stopingForm.dilutionRate ? Number(stopingForm.dilutionRate) || 0 : 0,
      filling: stopingForm.filling === '是',
    };

    if (stopingModalMode === 'create') {
      setStopingLedger((prev) => [...prev, nextRow]);
    } else if (stopingModalMode === 'edit' && stopingEditingKey) {
      setStopingLedger((prev) =>
        prev.map((r) =>
          r.stope === stopingEditingKey.stope && r.date === stopingEditingKey.date
            ? nextRow
            : r,
        ),
      );
    }

    setStopingModalMode(null);
    setStopingEditingKey(null);
  };

  const handleDeleteStoping = (row: (typeof undergroundMock.stopingLedger)[number]) => {
    if (!window.confirm('确定要删除该采场记录吗？')) return;
    setStopingLedger((prev) => prev.filter((r) => !(r.stope === row.stope && r.date === row.date)));
  };

  const planRows: (string | number | null)[][] = [
    ['短期', '2025年11月·掘进周计划 W46', '3501 运输巷', 120, 'm', '保障 3501-1101 采场接替'],
    ['短期', '2025年11月·掘进周计划 W46', '3503 探放水巷', 80, 'm', '提前完成探放水，降低突水风险'],
    ['短期', '2025年11月·采矿月计划', '3501-1101/1102 采场', 18500, 't', '与选厂处理量匹配，控制贫化率'],
    ['短期', '2025年11月·充填月计划', '3501-1101 采场充填', 16000, 'm³', '与采出节奏同步，避免空采场'],
    ['中长期', '2025-2026 年采矿接替滚动计划', '3501-1101~1601 采场群', 520000, 't', '分年度排产，保持采掘比稳定'],
    ['中长期', '2025-2026 年掘进巷道布局', '主运输/回风/联络巷', 4800, 'm', '分阶段形成采区通风、运输系统'],
    ['中长期', '2025-2027 年充填能力规划', '主充填站+采场', null, null, '约束采出强度，保证顶板长期稳定'],
    ['保障类', '高风险采场专项管控计划', '顶板破碎采场', 26000, 't', '限制单日采出量，加强支护检查'],
    ['保障类', '逃生通道贯通计划', '联络/回风巷', 900, 'm', '确保所有采场具备双通道'],
    ['保障类', '设备维护预留计划', '主要采掘设备', null, null, '在不影响产量前提下安排停机检修'],
  ];

  const dilutionRows: (string | number | null)[][] = [
    ['3501-1101 采场', 35.8, 5.1, '正常', '采用分段采矿+严控顶底板'],
    ['3501-1102 采场', 35.2, 5.3, '正常', '加强矿岩分采，控制混入废石'],
    ['3501-1201 采场', 34.7, 6.0, '偏高', '优化落矿线，减少底板矿石损失'],
    ['3502-1301 采场', 36.1, 4.9, '良好', '采用充填法，围岩条件好'],
    ['3502-1302 采场', 35.5, 5.4, '正常', '加强装矿口看守，避免废石混装'],
    ['3503-1401 采场', 33.9, 6.5, '偏高', '围岩破碎，建议缩小爆破单元、降低装药量'],
    ['3503-1402 采场', 35.9, 5.0, '正常', '充填质量好，贫化可控'],
    ['3504-1501 采场', 36.3, 4.8, '良好', '采用分段崩落+及时充填'],
    ['3504-1502 采场', 34.5, 6.2, '偏高', '采场结构复杂，需要细化贫化控制措施'],
    ['3505-1601 采场', 36.6, 4.7, '良好', '矿岩对比明显，采场管理到位'],
  ];

  const safetyRows: (string | number | null)[][] = [
    ['2025-11-15', '通风系统', '采区风量合格率', '100%', '正常', '所有采区风速、风量满足规程要求'],
    ['2025-11-15', '瓦斯与有害气体', 'CO 浓度超限次数', 0, '正常', '本日未发生超限，监测系统在线'],
    ['2025-11-15', '顶板管理', '采场现场隐患整改率', '100%', '正常', '班组隐患闭环完成'],
    ['2025-11-15', '高风险作业票', '当日高风险作业票数', 3, '受控', '均为检修/焊接作业，全程监护'],
    ['2025-11-15', '人员定位', '井下在线人数峰值', 126, '正常', '人员分布均衡，无超员区域'],
    ['2025-11-15', '运输系统', '主要运输巷道故障次数', 1, '关注', '皮带局部跑偏，已处理'],
    ['2025-11-15', '供电系统', '供电异常停电次数', 0, '正常', '主采区供电稳定'],
    ['2025-11-15', '排水系统', '井下积水超限点', 0, '正常', '水仓水位在安全范围内'],
    ['2025-11-15', '应急演练', '当月演练完成率', '75%', '按计划', '已完成 3 次演练，计划 4 次'],
    ['2025-11-15', '安全培训', '新工人三级教育完成率', '100%', '正常', '所有新入井人员培训合格'],
  ];

  return (
    <div>
      <h2>地采生产管理</h2>
      <p style={{ fontSize: 12, color: "#666", marginBottom: 12 }}>
        管理掘进、采矿、充填任务与台账，监控采掘比等运营指标，并与安全环保管理联动关注地下作业风险和高风险作业票执行情况。
      </p>
      <KpiCards items={undergroundMock.kpis} />
      <div
        style={{
          display: 'flex',
          gap: 8,
          marginTop: 16,
          marginBottom: 12,
          flexWrap: 'wrap',
        }}
      >
        <button
          type="button"
          onClick={() => setSubTab('drivage')}
          style={{
            padding: '6px 12px',
            borderRadius: 16,
            border: subTab === 'drivage' ? '1px solid #1677ff' : '1px solid #d9d9d9',
            background: subTab === 'drivage' ? 'rgba(22,119,255,0.08)' : '#fff',
            color: subTab === 'drivage' ? '#1677ff' : '#595959',
            fontSize: 12,
            cursor: 'pointer',
          }}
        >
          掘进台账
        </button>
        <button
          type="button"
          onClick={() => setSubTab('stoping')}
          style={{
            padding: '6px 12px',
            borderRadius: 16,
            border: subTab === 'stoping' ? '1px solid #1677ff' : '1px solid #d9d9d9',
            background: subTab === 'stoping' ? 'rgba(22,119,255,0.08)' : '#fff',
            color: subTab === 'stoping' ? '#1677ff' : '#595959',
            fontSize: 12,
            cursor: 'pointer',
          }}
        >
          采场台账
        </button>
        <button
          type="button"
          onClick={() => setSubTab('plan')}
          style={{
            padding: '6px 12px',
            borderRadius: 16,
            border: subTab === 'plan' ? '1px solid #1677ff' : '1px solid #d9d9d9',
            background: subTab === 'plan' ? 'rgba(22,119,255,0.08)' : '#fff',
            color: subTab === 'plan' ? '#1677ff' : '#595959',
            fontSize: 12,
            cursor: 'pointer',
          }}
        >
          生产规划
        </button>
        <button
          type="button"
          onClick={() => setSubTab('dilution')}
          style={{
            padding: '6px 12px',
            borderRadius: 16,
            border: subTab === 'dilution' ? '1px solid #1677ff' : '1px solid #d9d9d9',
            background: subTab === 'dilution' ? 'rgba(22,119,255,0.08)' : '#fff',
            color: subTab === 'dilution' ? '#1677ff' : '#595959',
            fontSize: 12,
            cursor: 'pointer',
          }}
        >
          井下贫化控制
        </button>
        <button
          type="button"
          onClick={() => setSubTab('safety')}
          style={{
            padding: '6px 12px',
            borderRadius: 16,
            border: subTab === 'safety' ? '1px solid #1677ff' : '1px solid #d9d9d9',
            background: subTab === 'safety' ? 'rgba(22,119,255,0.08)' : '#fff',
            color: subTab === 'safety' ? '#1677ff' : '#595959',
            fontSize: 12,
            cursor: 'pointer',
          }}
        >
          安全与监控
        </button>
      </div>

      {subTab === 'drivage' && (
        <>
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
        </>
      )}

      {subTab === 'stoping' && (
        <>
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
        </>
      )}
      {subTab === 'plan' && (
        <div style={{ marginTop: 8 }}>
          <h3 style={{ margin: '0 0 8px 0' }}>生产规划（井下掘进/采矿/充填）</h3>
          <BasicTable
            headers={['计划类型', '期间/阶段', '对象', '计划工作量', '单位', '关键说明']}
            rows={planRows}
          />
          <p style={{ fontSize: 12, color: '#666', marginTop: 8 }}>
            规划维度覆盖掘进、采矿和充填三类作业，可与选厂计划、设备检修计划以及安环约束联动，形成一体化的生产排产视图。
          </p>
        </div>
      )}
      {subTab === 'dilution' && (
        <div style={{ marginTop: 8 }}>
          <h3 style={{ margin: '0 0 8px 0' }}>井下贫化控制（采场对比）</h3>
          <BasicTable
            headers={['采场', '平均品位(Fe, %)', '贫化率(%)', '评价', '控制要点']}
            rows={dilutionRows}
          />
          <p style={{ fontSize: 12, color: '#666', marginTop: 8 }}>
            系统可按采场维度跟踪贫化率变化，识别偏高采场，结合采场结构、爆破参数和装矿管理等因素给出针对性的控制建议。
          </p>
        </div>
      )}
      {subTab === 'safety' && (
        <div style={{ marginTop: 8 }}>
          <h3 style={{ margin: '0 0 8px 0' }}>安全与监控指标看板</h3>
          <BasicTable
            headers={['日期', '系统', '指标', '数值', '状态', '说明']}
            rows={safetyRows}
          />
          <p style={{ fontSize: 12, color: '#666', marginTop: 8 }}>
            后续可与安全环保模块深入联动：高风险作业票闭环、人员定位、视频监控和环境监测数据统一展示，实现生产与安全的协同决策。
          </p>
        </div>
      )}
    </div>
  );
}

function SectionConcentrator() {
  const [subTab, setSubTab] = React.useState<'digitalTwin' | 'ledger' | 'plan' | 'energy' | 'economic'>('digitalTwin');
  const [plans, setPlans] = React.useState<ProductionPlan[]>(concentratorMock.productionPlans);
  const [formMode, setFormMode] = React.useState<'create' | 'edit' | null>(null);
  const [editingPlan, setEditingPlan] = React.useState<ProductionPlan | null>(null);
  const [selectedEquipment, setSelectedEquipment] = React.useState<string | null>(null);

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
          { key: 'digitalTwin', label: '🧰 数字孪生' },
          { key: 'ledger', label: '生产台账' },
          { key: 'plan', label: '计划编制' },
          { key: 'energy', label: '能耗分析' },
          { key: 'economic', label: '经济指标' },
        ].map((t) => (
          <div
            key={t.key}
            onClick={() => setSubTab(t.key as 'digitalTwin' | 'ledger' | 'plan' | 'energy' | 'economic')}
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
      {subTab === 'digitalTwin' && (
        <div>
          <div style={{ marginBottom: 16 }}>
            <h3 style={{ marginBottom: 8 }}>实时生产指标</h3>
            <KpiCards
              items={digitalTwinMock.productionMetrics.metrics.map((m) => ({
                name: m.name,
                value: m.value,
                unit: m.unit,
              }))}
            />
            <div style={{ textAlign: 'right', fontSize: 11, color: '#999', marginTop: 4 }}>
              最后更新：{digitalTwinMock.productionMetrics.updateTime}
            </div>
          </div>

          <div style={{ background: '#fff', borderRadius: 8, padding: 16, border: '1px solid #e8e8e8' }}>
            <h3 style={{ marginTop: 0, marginBottom: 12 }}>选矿工艺流程图</h3>
            <p style={{ fontSize: 12, color: '#666', marginBottom: 16 }}>
              点击设备查看实时参数（给矿量、矿浆浓度、品位等）
            </p>
            
            {/* SVG 工艺流程图 */}
            <div style={{ position: 'relative', width: '100%', height: 600, overflow: 'auto', background: '#f8f9fa', borderRadius: 8 }}>
              <svg width="1400" height="800" viewBox="0 0 1400 800" style={{ display: 'block' }}>
                {/* 定义箭头 */}
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="#1677ff" />
                  </marker>
                </defs>

                {/* 1. 中间矿堆 */}
                <g onClick={() => setSelectedEquipment('storage-intermediate')} style={{ cursor: 'pointer' }}>
                  <rect x="50" y="150" width="100" height="80" rx="8" fill={selectedEquipment === 'storage-intermediate' ? '#e6f7ff' : '#fff'} stroke="#1677ff" strokeWidth="2" />
                  <text x="100" y="185" textAnchor="middle" fontSize="13" fontWeight="600" fill="#333">中间矿堆</text>
                  <text x="100" y="205" textAnchor="middle" fontSize="11" fill="#666">4485 t</text>
                  <circle cx="145" cy="155" r="4" fill={digitalTwinMock.processNodes.find(n => n.id === 'storage-intermediate')?.status === 'running' ? '#52c41a' : '#999'} />
                </g>
                {/* 箭头：矿堆 -> 皮带 */}
                <line x1="150" y1="190" x2="200" y2="190" stroke="#1677ff" strokeWidth="2" markerEnd="url(#arrowhead)" />
                <text x="175" y="185" textAnchor="middle" fontSize="10" fill="#1677ff">100 t/h</text>

                {/* 2. 皮带输送 */}
                <g onClick={() => setSelectedEquipment('conveyor-01')} style={{ cursor: 'pointer' }}>
                  <rect x="200" y="170" width="80" height="40" rx="4" fill={selectedEquipment === 'conveyor-01' ? '#e6f7ff' : '#fff'} stroke="#666" strokeWidth="2" />
                  <text x="240" y="195" textAnchor="middle" fontSize="12" fill="#333">皮带机</text>
                  <circle cx="275" cy="175" r="3" fill="#52c41a" />
                </g>
                <line x1="280" y1="190" x2="330" y2="190" stroke="#1677ff" strokeWidth="2" markerEnd="url(#arrowhead)" />

                {/* 3. 半自磨机 SAG */}
                <g onClick={() => setSelectedEquipment('mill-sag')} style={{ cursor: 'pointer' }}>
                  <circle cx="380" cy="190" r="50" fill={selectedEquipment === 'mill-sag' ? '#e6f7ff' : '#fff'} stroke="#1677ff" strokeWidth="3" />
                  <text x="380" y="185" textAnchor="middle" fontSize="13" fontWeight="600" fill="#333">SAG磨</text>
                  <text x="380" y="202" textAnchor="middle" fontSize="10" fill="#666">100 t/h</text>
                  <circle cx="410" cy="160" r="4" fill="#52c41a" />
                </g>
                <line x1="430" y1="190" x2="480" y2="190" stroke="#1677ff" strokeWidth="2" markerEnd="url(#arrowhead)" />

                {/* 4. 旋流器 */}
                <g onClick={() => setSelectedEquipment('hydrocyclone-01')} style={{ cursor: 'pointer' }}>
                  <polygon points="530,150 560,200 500,200" fill={selectedEquipment === 'hydrocyclone-01' ? '#e6f7ff' : '#fff'} stroke="#1677ff" strokeWidth="2" />
                  <text x="530" y="185" textAnchor="middle" fontSize="11" fontWeight="600" fill="#333">旋流器</text>
                  <circle cx="555" cy="155" r="3" fill="#52c41a" />
                </g>
                {/* 溢流 -> 浮选 */}
                <line x1="530" y1="150" x2="530" y2="100" stroke="#1677ff" strokeWidth="2" />
                <line x1="530" y1="100" x2="630" y2="100" stroke="#1677ff" strokeWidth="2" markerEnd="url(#arrowhead)" />
                <text x="580" y="95" textAnchor="middle" fontSize="10" fill="#1677ff">75 t/h</text>
                {/* 沉砂 -> 球磨 */}
                <line x1="500" y1="200" x2="450" y2="240" stroke="#ff9800" strokeWidth="2" markerEnd="url(#arrowhead)" />
                <text x="465" y="225" textAnchor="middle" fontSize="10" fill="#ff9800">50 t/h</text>

                {/* 5. 球磨机 */}
                <g onClick={() => setSelectedEquipment('mill-ball')} style={{ cursor: 'pointer' }}>
                  <circle cx="400" cy="280" r="45" fill={selectedEquipment === 'mill-ball' ? '#e6f7ff' : '#fff'} stroke="#1677ff" strokeWidth="3" />
                  <text x="400" y="280" textAnchor="middle" fontSize="13" fontWeight="600" fill="#333">球磨机</text>
                  <text x="400" y="295" textAnchor="middle" fontSize="10" fill="#666">125 t/h</text>
                  <circle cx="430" cy="255" r="4" fill="#52c41a" />
                </g>
                {/* 球磨 -> 旋流器 循环 */}
                <line x1="445" y1="280" x2="500" y2="210" stroke="#ff9800" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="4,2" />

                {/* 6. 粗选浮选机 */}
                <g onClick={() => setSelectedEquipment('flotation-rougher')} style={{ cursor: 'pointer' }}>
                  <rect x="630" y="70" width="100" height="60" rx="8" fill={selectedEquipment === 'flotation-rougher' ? '#e6f7ff' : '#fff'} stroke="#00bcd4" strokeWidth="2" />
                  <text x="680" y="95" textAnchor="middle" fontSize="12" fontWeight="600" fill="#333">粗选</text>
                  <text x="680" y="110" textAnchor="middle" fontSize="10" fill="#666">125 t/h</text>
                  <text x="680" y="123" textAnchor="middle" fontSize="9" fill="#666">pH 8.2</text>
                  <circle cx="725" cy="75" r="3" fill="#52c41a" />
                </g>
                {/* 粗选 -> 精选 */}
                <line x1="730" y1="100" x2="800" y2="100" stroke="#00bcd4" strokeWidth="2" markerEnd="url(#arrowhead)" />
                <text x="765" y="95" textAnchor="middle" fontSize="10" fill="#00bcd4">35 t/h</text>
                {/* 粗选 -> 扫选 */}
                <line x1="680" y1="130" x2="680" y2="180" stroke="#999" strokeWidth="2" markerEnd="url(#arrowhead)" />
                <text x="690" y="160" textAnchor="middle" fontSize="10" fill="#999">90 t/h</text>

                {/* 7. 精选I */}
                <g onClick={() => setSelectedEquipment('flotation-cleaner-1')} style={{ cursor: 'pointer' }}>
                  <rect x="800" y="75" width="90" height="50" rx="6" fill={selectedEquipment === 'flotation-cleaner-1' ? '#e6f7ff' : '#fff'} stroke="#4caf50" strokeWidth="2" />
                  <text x="845" y="98" textAnchor="middle" fontSize="11" fontWeight="600" fill="#333">精选 I</text>
                  <text x="845" y="113" textAnchor="middle" fontSize="9" fill="#666">18.5% Cu</text>
                  <circle cx="885" cy="80" r="3" fill="#52c41a" />
                </g>
                <line x1="890" y1="100" x2="950" y2="100" stroke="#4caf50" strokeWidth="2" markerEnd="url(#arrowhead)" />

                {/* 8. 精选II */}
                <g onClick={() => setSelectedEquipment('flotation-cleaner-2')} style={{ cursor: 'pointer' }}>
                  <rect x="950" y="75" width="90" height="50" rx="6" fill={selectedEquipment === 'flotation-cleaner-2' ? '#e6f7ff' : '#fff'} stroke="#4caf50" strokeWidth="2" />
                  <text x="995" y="98" textAnchor="middle" fontSize="11" fontWeight="600" fill="#333">精选 II</text>
                  <text x="995" y="113" textAnchor="middle" fontSize="9" fill="#666">24.5% Cu</text>
                  <circle cx="1035" cy="80" r="3" fill="#52c41a" />
                </g>
                <line x1="1040" y1="100" x2="1100" y2="100" stroke="#4caf50" strokeWidth="2" markerEnd="url(#arrowhead)" />
                <text x="1070" y="95" textAnchor="middle" fontSize="10" fill="#4caf50">7.5 t/h</text>

                {/* 9. 精矿浓密机 */}
                <g onClick={() => setSelectedEquipment('thickener-concentrate')} style={{ cursor: 'pointer' }}>
                  <circle cx="1150" cy="100" r="40" fill={selectedEquipment === 'thickener-concentrate' ? '#e6f7ff' : '#fff'} stroke="#4caf50" strokeWidth="2" />
                  <text x="1150" y="98" textAnchor="middle" fontSize="11" fontWeight="600" fill="#333">精矿</text>
                  <text x="1150" y="110" textAnchor="middle" fontSize="11" fontWeight="600" fill="#333">浓密机</text>
                  <circle cx="1180" cy="75" r="3" fill="#52c41a" />
                </g>
                <line x1="1190" y1="100" x2="1250" y2="100" stroke="#4caf50" strokeWidth="2" markerEnd="url(#arrowhead)" />

                {/* 10. 精矿压滤机 */}
                <g onClick={() => setSelectedEquipment('filter-press')} style={{ cursor: 'pointer' }}>
                  <rect x="1250" y="70" width="90" height="60" rx="6" fill={selectedEquipment === 'filter-press' ? '#e6f7ff' : '#fff'} stroke="#4caf50" strokeWidth="2" />
                  <text x="1295" y="95" textAnchor="middle" fontSize="11" fontWeight="600" fill="#333">压滤机</text>
                  <text x="1295" y="110" textAnchor="middle" fontSize="9" fill="#666">7.5 t/h</text>
                  <text x="1295" y="122" textAnchor="middle" fontSize="9" fill="#4caf50">精矿产品</text>
                  <circle cx="1335" cy="75" r="3" fill="#52c41a" />
                </g>

                {/* 11. 扫选 I */}
                <g onClick={() => setSelectedEquipment('flotation-scavenger-1')} style={{ cursor: 'pointer' }}>
                  <rect x="630" y="200" width="100" height="50" rx="6" fill={selectedEquipment === 'flotation-scavenger-1' ? '#e6f7ff' : '#fff'} stroke="#999" strokeWidth="2" />
                  <text x="680" y="223" textAnchor="middle" fontSize="11" fontWeight="600" fill="#333">扫选 I</text>
                  <text x="680" y="238" textAnchor="middle" fontSize="9" fill="#666">90 t/h</text>
                  <circle cx="725" cy="205" r="3" fill="#52c41a" />
                </g>
                <line x1="680" y1="250" x2="680" y2="300" stroke="#999" strokeWidth="2" markerEnd="url(#arrowhead)" />

                {/* 12. 扫选 II */}
                <g onClick={() => setSelectedEquipment('flotation-scavenger-2')} style={{ cursor: 'pointer' }}>
                  <rect x="630" y="320" width="100" height="50" rx="6" fill={selectedEquipment === 'flotation-scavenger-2' ? '#e6f7ff' : '#fff'} stroke="#999" strokeWidth="2" />
                  <text x="680" y="343" textAnchor="middle" fontSize="11" fontWeight="600" fill="#333">扫选 II</text>
                  <text x="680" y="358" textAnchor="middle" fontSize="9" fill="#666">68 t/h</text>
                  <circle cx="725" cy="325" r="3" fill="#52c41a" />
                </g>
                <line x1="680" y1="370" x2="680" y2="420" stroke="#999" strokeWidth="2" markerEnd="url(#arrowhead)" />

                {/* 13. 尾矿浓密机 */}
                <g onClick={() => setSelectedEquipment('thickener-tailings')} style={{ cursor: 'pointer' }}>
                  <circle cx="680" cy="470" r="40" fill={selectedEquipment === 'thickener-tailings' ? '#e6f7ff' : '#fff'} stroke="#999" strokeWidth="2" />
                  <text x="680" y="468" textAnchor="middle" fontSize="11" fontWeight="600" fill="#333">尾矿</text>
                  <text x="680" y="480" textAnchor="middle" fontSize="11" fontWeight="600" fill="#333">浓密机</text>
                  <circle cx="710" cy="445" r="3" fill="#52c41a" />
                </g>
                <line x1="720" y1="470" x2="800" y2="470" stroke="#999" strokeWidth="2" markerEnd="url(#arrowhead)" />
                <text x="760" y="465" textAnchor="middle" fontSize="10" fill="#999">92.5 t/h</text>

                {/* 14. 尾矿泵站 */}
                <g onClick={() => setSelectedEquipment('pump-tailings')} style={{ cursor: 'pointer' }}>
                  <rect x="800" y="445" width="80" height="50" rx="6" fill={selectedEquipment === 'pump-tailings' ? '#e6f7ff' : '#fff'} stroke="#999" strokeWidth="2" />
                  <text x="840" y="468" textAnchor="middle" fontSize="11" fontWeight="600" fill="#333">尾矿泵</text>
                  <text x="840" y="483" textAnchor="middle" fontSize="9" fill="#666">325 m³/h</text>
                  <circle cx="875" cy="450" r="3" fill="#52c41a" />
                </g>
                <line x1="880" y1="470" x2="950" y2="470" stroke="#999" strokeWidth="2" markerEnd="url(#arrowhead)" />
                <text x="915" y="465" textAnchor="middle" fontSize="10" fill="#999">尾矿库</text>

                {/* 15. 回水系统 */}
                <g onClick={() => setSelectedEquipment('water-recycle')} style={{ cursor: 'pointer' }}>
                  <rect x="600" y="550" width="100" height="50" rx="6" fill={selectedEquipment === 'water-recycle' ? '#e6f7ff' : '#2196f3'} stroke="#2196f3" strokeWidth="2" />
                  <text x="650" y="573" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">回水系统</text>
                  <text x="650" y="588" textAnchor="middle" fontSize="9" fill="#fff">195 m³/h</text>
                  <circle cx="695" cy="555" r="3" fill="#52c41a" />
                </g>
                {/* 浓密机溢流 -> 回水 */}
                <line x1="680" y1="510" x2="650" y2="550" stroke="#2196f3" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="3,3" />

                {/* 16. 新水供给 */}
                <g onClick={() => setSelectedEquipment('water-fresh')} style={{ cursor: 'pointer' }}>
                  <rect x="250" y="350" width="90" height="50" rx="6" fill={selectedEquipment === 'water-fresh' ? '#e6f7ff' : '#2196f3'} stroke="#2196f3" strokeWidth="2" />
                  <text x="295" y="373" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">新水</text>
                  <text x="295" y="388" textAnchor="middle" fontSize="9" fill="#fff">81 m³/h</text>
                  <circle cx="335" cy="355" r="3" fill="#52c41a" />
                </g>
                {/* 新水 -> SAG磨 */}
                <line x1="340" y1="375" x2="360" y2="230" stroke="#2196f3" strokeWidth="1.5" markerEnd="url(#arrowhead)" strokeDasharray="3,3" />

                {/* 图例 */}
                <g transform="translate(50, 650)">
                  <text x="0" y="0" fontSize="12" fontWeight="600" fill="#333">图例：</text>
                  <circle cx="50" cy="-4" r="4" fill="#52c41a" />
                  <text x="60" y="0" fontSize="11" fill="#666">运行中</text>
                  <circle cx="120" cy="-4" r="4" fill="#faad14" />
                  <text x="130" y="0" fontSize="11" fill="#666">警告</text>
                  <circle cx="180" cy="-4" r="4" fill="#ff4d4f" />
                  <text x="190" y="0" fontSize="11" fill="#666">报警</text>
                  
                  <rect x="260" y="-10" width="15" height="15" fill="#4caf50" />
                  <text x="280" y="0" fontSize="11" fill="#666">精矿流程</text>
                  <rect x="350" y="-10" width="15" height="15" fill="#999" />
                  <text x="370" y="0" fontSize="11" fill="#666">尾矿流程</text>
                  <rect x="440" y="-10" width="15" height="15" fill="#2196f3" />
                  <text x="460" y="0" fontSize="11" fill="#666">水系统</text>
                </g>
              </svg>
            </div>

            {/* 选中设备参数显示 */}
            {selectedEquipment && (() => {
              const equipment = digitalTwinMock.processNodes.find(n => n.id === selectedEquipment);
              if (!equipment) return null;
              return (
                <div style={{ marginTop: 16, padding: 16, background: '#f8f9fa', borderRadius: 8, border: '1px solid #e8e8e8' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <h4 style={{ margin: 0 }}>{equipment.name} - 实时参数</h4>
                    <span style={{ 
                      padding: '4px 12px', 
                      borderRadius: 12, 
                      fontSize: 12,
                      background: equipment.status === 'running' ? '#f6ffed' : equipment.status === 'warning' ? '#fffbe6' : '#fff1f0',
                      color: equipment.status === 'running' ? '#52c41a' : equipment.status === 'warning' ? '#faad14' : '#ff4d4f',
                      border: `1px solid ${equipment.status === 'running' ? '#b7eb8f' : equipment.status === 'warning' ? '#ffe58f' : '#ffccc7'}`
                    }}>
                      {equipment.status === 'running' ? '✅ 运行中' : equipment.status === 'warning' ? '⚠️ 警告' : '🚨 报警'}
                    </span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
                    {equipment.parameters.map((param, idx) => (
                      <div key={idx} style={{ 
                        padding: 12, 
                        background: '#fff', 
                        borderRadius: 6,
                        border: `1px solid ${param.status === 'normal' ? '#e8e8e8' : param.status === 'warning' ? '#ffe58f' : '#ffccc7'}`
                      }}>
                        <div style={{ fontSize: 11, color: '#999', marginBottom: 4 }}>{param.name}</div>
                        <div style={{ fontSize: 18, fontWeight: 600, color: '#333' }}>
                          {param.value}
                          {param.unit && <span style={{ fontSize: 12, marginLeft: 4, color: '#666' }}>{param.unit}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

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
  const [subTab, setSubTab] = React.useState<'samples' | 'metalBalance' | 'reagents' | 'dataImport'>('samples');
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
        生成样品条码、管理送检与分析结果，并支持金属平衡表编制、试剂管理、数据自动导入。
      </p>
      <KpiCards items={labMock.kpis} />

      {/* 子 Tab 导航 */}
      <div style={{ display: 'flex', gap: 8, marginTop: 16, marginBottom: 16, borderBottom: '1px solid #eee' }}>
        {[
          { key: 'samples', label: '🧪 样品管理' },
          { key: 'metalBalance', label: '⚖️ 金属平衡表' },
          { key: 'reagents', label: '🧪 试剂管理' },
          { key: 'dataImport', label: '🔄 数据导入' },
        ].map((t) => (
          <div
            key={t.key}
            onClick={() => setSubTab(t.key as typeof subTab)}
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
      {subTab === 'samples' && (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
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
      )}

      {subTab === 'metalBalance' && (
        <div>
          <h3 style={{ marginBottom: 12 }}>金属平衡表编制</h3>
          <p style={{ fontSize: 12, color: '#666', marginBottom: 16 }}>
            根据原矿、精矿、尾矿的化验数据自动计算金属平衡，进行回收率核算。
          </p>
          <div style={{ background: '#fff', borderRadius: 8, padding: 16, border: '1px solid #e8e8e8' }}>
            <div style={{ marginBottom: 16 }}>
              <h4 style={{ marginTop: 0 }}>金属平衡数据（Fe）</h4>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                <thead style={{ background: '#fafafa' }}>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '1px solid #eee' }}>阶段</th>
                    <th style={{ textAlign: 'right', padding: '8px 12px', borderBottom: '1px solid #eee' }}>处理量(t)</th>
                    <th style={{ textAlign: 'right', padding: '8px 12px', borderBottom: '1px solid #eee' }}>品位(%)</th>
                    <th style={{ textAlign: 'right', padding: '8px 12px', borderBottom: '1px solid #eee' }}>金属量(t)</th>
                    <th style={{ textAlign: 'right', padding: '8px 12px', borderBottom: '1px solid #eee' }}>分配率(%)</th>
                  </tr>
                </thead>
                <tbody>
                  {labMock.metalBalance.map((row, idx) => {
                    const totalMetal = labMock.metalBalance[0].metalFe;
                    const distribution = (row.metalFe / totalMetal * 100).toFixed(2);
                    return (
                      <tr key={idx}>
                        <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0' }}>{row.stage}</td>
                        <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0', textAlign: 'right' }}>{row.tonnage.toLocaleString()}</td>
                        <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0', textAlign: 'right' }}>{row.gradeFe}</td>
                        <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0', textAlign: 'right' }}>{row.metalFe.toLocaleString()}</td>
                        <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0', textAlign: 'right' }}>{distribution}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: 16, padding: 12, background: '#f5f7fa', borderRadius: 6 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, fontSize: 12 }}>
                <div>
                  <div style={{ color: '#999', marginBottom: 4 }}>实际回收率</div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: '#52c41a' }}>
                    {((labMock.metalBalance[1].metalFe / labMock.metalBalance[0].metalFe) * 100).toFixed(2)}%
                  </div>
                </div>
                <div>
                  <div style={{ color: '#999', marginBottom: 4 }}>尾矿损失率</div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: '#ff4d4f' }}>
                    {((labMock.metalBalance[2].metalFe / labMock.metalBalance[0].metalFe) * 100).toFixed(2)}%
                  </div>
                </div>
                <div>
                  <div style={{ color: '#999', marginBottom: 4 }}>金属平衡差</div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: '#1677ff' }}>
                    {(labMock.metalBalance[0].metalFe - labMock.metalBalance[1].metalFe - labMock.metalBalance[2].metalFe).toFixed(2)} t
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => alert('金属平衡表已导出为 Excel 文件')}
              style={{
                marginTop: 16,
                padding: '6px 12px',
                fontSize: 12,
                borderRadius: 4,
                border: '1px solid #1677ff',
                background: '#1677ff',
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              📊 导出报表
            </button>
          </div>
        </div>
      )}

      {subTab === 'reagents' && (
        <div>
          <h3 style={{ marginBottom: 12 }}>试剂管理</h3>
          <p style={{ fontSize: 12, color: '#666', marginBottom: 16 }}>
            试剂入库、领用、库存监控与预警，确保实验室试剂供应。
          </p>
          <div style={{ background: '#fff', borderRadius: 8, padding: 16, border: '1px solid #e8e8e8' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead style={{ background: '#fafafa' }}>
                <tr>
                  <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '1px solid #eee' }}>试剂名称</th>
                  <th style={{ textAlign: 'right', padding: '8px 12px', borderBottom: '1px solid #eee' }}>当前库存</th>
                  <th style={{ textAlign: 'right', padding: '8px 12px', borderBottom: '1px solid #eee' }}>安全库存</th>
                  <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '1px solid #eee' }}>单位</th>
                  <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '1px solid #eee' }}>状态</th>
                  <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '1px solid #eee' }}>最后领用</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: '盐酸', stock: 25.5, safety: 20, unit: 'L', status: '正常', lastUse: '2025-11-14' },
                  { name: '氢氧化钠', stock: 8.2, safety: 10, unit: 'kg', status: '预警', lastUse: '2025-11-13' },
                  { name: '硫酸', stock: 15.8, safety: 15, unit: 'L', status: '正常', lastUse: '2025-11-15' },
                  { name: '硅酸钠', stock: 3.5, safety: 5, unit: 'kg', status: '预警', lastUse: '2025-11-12' },
                  { name: '硫酸铜标液', stock: 450, safety: 500, unit: 'mL', status: '预警', lastUse: '2025-11-14' },
                ].map((reagent, idx) => (
                  <tr key={idx}>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0' }}>{reagent.name}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0', textAlign: 'right' }}>{reagent.stock}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0', textAlign: 'right' }}>{reagent.safety}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0' }}>{reagent.unit}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0' }}>
                      <span style={{
                        padding: '2px 8px',
                        borderRadius: 12,
                        fontSize: 11,
                        background: reagent.status === '正常' ? '#f6ffed' : '#fffbe6',
                        color: reagent.status === '正常' ? '#52c41a' : '#faad14',
                        border: `1px solid ${reagent.status === '正常' ? '#b7eb8f' : '#ffe58f'}`,
                      }}>
                        {reagent.status}
                      </span>
                    </td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0' }}>{reagent.lastUse}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
              <button
                type="button"
                onClick={() => alert('请扫描试剂条码进行入库登记')}
                style={{
                  padding: '6px 12px',
                  fontSize: 12,
                  borderRadius: 4,
                  border: '1px solid #52c41a',
                  background: '#52c41a',
                  color: '#fff',
                  cursor: 'pointer',
                }}
              >
                📦 试剂入库
              </button>
              <button
                type="button"
                onClick={() => alert('请选择试剂并记录领用量')}
                style={{
                  padding: '6px 12px',
                  fontSize: 12,
                  borderRadius: 4,
                  border: '1px solid #1677ff',
                  background: '#fff',
                  color: '#1677ff',
                  cursor: 'pointer',
                }}
              >
                📋 试剂领用
              </button>
            </div>
          </div>
        </div>
      )}

      {subTab === 'dataImport' && (
        <div>
          <h3 style={{ marginBottom: 12 }}>化验结果自动导入</h3>
          <p style={{ fontSize: 12, color: '#666', marginBottom: 16 }}>
            自动读取化验仪器数据或 Excel 批量导入，同步到生产管理系统。
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            <div style={{ background: '#fff', borderRadius: 8, padding: 20, border: '1px solid #e8e8e8' }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>📡</div>
              <h4 style={{ marginTop: 0, marginBottom: 8 }}>仪器数据自动采集</h4>
              <p style={{ fontSize: 12, color: '#666', marginBottom: 16 }}>
                支持从LIMS系统、原子吸收光谱仪、ICP等设备自动采集化验结果。
              </p>
              <button
                type="button"
                onClick={() => alert('正在连接化验仪器...')}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  fontSize: 13,
                  borderRadius: 4,
                  border: '1px solid #1677ff',
                  background: '#1677ff',
                  color: '#fff',
                  cursor: 'pointer',
                }}
              >
                启动自动采集
              </button>
              <div style={{ marginTop: 12, fontSize: 11, color: '#52c41a' }}>
                ✅ 仪器连接正常，最后同步：2025-11-15 14:35
              </div>
            </div>

            <div style={{ background: '#fff', borderRadius: 8, padding: 20, border: '1px solid #e8e8e8' }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>📄</div>
              <h4 style={{ marginTop: 0, marginBottom: 8 }}>Excel 批量导入</h4>
              <p style={{ fontSize: 12, color: '#666', marginBottom: 16 }}>
                下载模板后填写化验数据，批量导入到系统中。
              </p>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  type="button"
                  onClick={() => alert('正在下载导入模板...')}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    fontSize: 13,
                    borderRadius: 4,
                    border: '1px solid #52c41a',
                    background: '#fff',
                    color: '#52c41a',
                    cursor: 'pointer',
                  }}
                >
                  下载模板
                </button>
                <button
                  type="button"
                  onClick={() => alert('请选择 Excel 文件上传')}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    fontSize: 13,
                    borderRadius: 4,
                    border: '1px solid #1677ff',
                    background: '#1677ff',
                    color: '#fff',
                    cursor: 'pointer',
                  }}
                >
                  上传文件
                </button>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 16, background: '#fff', borderRadius: 8, padding: 16, border: '1px solid #e8e8e8' }}>
            <h4 style={{ marginTop: 0, marginBottom: 12 }}>最近导入记录</h4>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead style={{ background: '#fafafa' }}>
                <tr>
                  <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '1px solid #eee' }}>导入时间</th>
                  <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '1px solid #eee' }}>数据来源</th>
                  <th style={{ textAlign: 'right', padding: '8px 12px', borderBottom: '1px solid #eee' }}>导入样品数</th>
                  <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '1px solid #eee' }}>操作人</th>
                  <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '1px solid #eee' }}>状态</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { time: '2025-11-15 14:35', source: 'LIMS系统', count: 8, operator: '张化验员', status: '成功' },
                  { time: '2025-11-15 10:20', source: 'Excel导入', count: 12, operator: '李化验员', status: '成功' },
                  { time: '2025-11-14 16:45', source: 'ICP仪器', count: 6, operator: '自动采集', status: '成功' },
                ].map((record, idx) => (
                  <tr key={idx}>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0' }}>{record.time}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0' }}>{record.source}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0', textAlign: 'right' }}>{record.count}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0' }}>{record.operator}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0' }}>
                      <span style={{
                        padding: '2px 8px',
                        borderRadius: 12,
                        fontSize: 11,
                        background: '#f6ffed',
                        color: '#52c41a',
                        border: '1px solid #b7eb8f',
                      }}>
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
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
        集成重大危险源、尾矿库监测、环保指标、地下特殊作业票和隐患排查，实现露采/地采一体化的智慧安全保障与安全管理中心。
      </p>
      <KpiCards items={safetyMock.kpis} />
      <h3 style={{ marginTop: 16, marginBottom: 8 }}>重大危险源一览</h3>
      <BasicTable
        headers={["编号", "名称", "所属区域", "类型", "等级", "状态", "监控手段"]}
        rows={safetyMock.dangerSources.map((d) => [
          d.id,
          d.name,
          d.area,
          d.type,
          d.level,
          d.status,
          d.monitor,
        ])}
      />

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

      <h3 style={{ marginTop: 16, marginBottom: 8 }}>环保指标监测</h3>
      <BasicTable
        headers={["指标", "监测位置", "当前值", "限值", "状态", "更新时间"]}
        rows={safetyMock.envIndicators.map((e) => [
          e.indicator,
          e.location,
          `${e.value} ${e.unit}`,
          `${e.limit} ${e.unit}`,
          e.status,
          e.lastUpdate,
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

      <h3 style={{ marginTop: 16, marginBottom: 8 }}>安全巡检任务</h3>
      <BasicTable
        headers={["任务编号", "类型", "区域", "频次", "状态", "执行人", "上次执行时间", "下次执行时间"]}
        rows={safetyMock.inspectionTasks.map((t) => [
          t.id,
          t.type,
          t.area,
          t.frequency,
          t.status,
          t.executor,
          t.lastExecution,
          t.nextExecution,
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
    case "alarmCenter":
      return <SectionAlarmCenter />;
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
  alarmCenter: '🚨',
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
