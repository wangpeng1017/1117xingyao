"use client";

import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import {
  iotNavItems,
  iotMock,
  type IoTNavKey,
  type IoTDevice,
  type IoTProtocol,
  type DataSubscription,
  type MonitoringPoint,
} from "@/lib/iotMockData";

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

function SectionDeviceManagement() {
  const [devices, setDevices] = useState(iotMock.devices);

  const handleAdd = () => {
    const id = window.prompt("设备编号", "");
    if (!id) return;
    const name = window.prompt("设备名称", "") || "";
    const type = window.prompt("设备类型", "关键设备") || "关键设备";
    const system = window.prompt("所属系统", "") || "";
    const protocol = window.prompt("协议", "Modbus TCP") || "Modbus TCP";
    const address = window.prompt("地址", "") || "";
    const status = window.prompt("状态", "离线") || "离线";

    setDevices((prev) => [...prev, { id, name, type, system, protocol, address, status }]);
  };

  const handleEdit = (device: IoTDevice) => {
    const name = window.prompt("设备名称", device.name) || device.name;
    const type = window.prompt("设备类型", device.type) || device.type;
    const system = window.prompt("所属系统", device.system) || device.system;
    const protocol = window.prompt("协议", device.protocol) || device.protocol;
    const address = window.prompt("地址", device.address) || device.address;
    const status = window.prompt("状态", device.status) || device.status;

    setDevices((prev) =>
      prev.map((d) => (d.id === device.id ? { ...d, name, type, system, protocol, address, status } : d))
    );
  };

  const handleDelete = (id: string) => {
    if (!window.confirm("确定删除该设备吗？")) return;
    setDevices((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div>
      <h2>设备管理</h2>
      <p style={{ fontSize: 12, color: "#666", marginBottom: 12 }}>
        统一管理破碎、磨矿、浮选、脱水等工艺设备及其传感器、控制点和通信参数。
      </p>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16, marginBottom: 8 }}>
        <h3 style={{ margin: 0 }}>设备列表</h3>
        <button
          type="button"
          onClick={handleAdd}
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
      <div style={{ borderRadius: 8, border: "1px solid #eee", overflow: "hidden", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead style={{ background: "#fafafa" }}>
            <tr>
              {["设备编号", "设备名称", "类型", "所属系统", "协议", "地址", "状态", "操作"].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "8px 12px", borderBottom: "1px solid #eee", whiteSpace: "nowrap" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {devices.map((d) => (
              <tr key={d.id}>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{d.id}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{d.name}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{d.type}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{d.system}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{d.protocol}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{d.address}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{d.status}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>
                  <button
                    type="button"
                    onClick={() => handleEdit(d)}
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
                    onClick={() => handleDelete(d.id)}
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
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SectionProtocolManagement() {
  const [protocols, setProtocols] = useState(iotMock.protocols);

  const handleAdd = () => {
    const id = window.prompt("协议编号", "");
    if (!id) return;
    const name = window.prompt("协议名称", "") || "";
    const type = window.prompt("类型", "Modbus TCP") || "Modbus TCP";
    const portStr = window.prompt("端口", "502");
    const port = portStr ? Number(portStr) || 502 : 502;
    const status = window.prompt("状态", "已启用") || "已启用";

    setProtocols((prev) => [...prev, { id, name, type, port, status }]);
  };

  const handleEdit = (proto: IoTProtocol) => {
    const name = window.prompt("协议名称", proto.name) || proto.name;
    const type = window.prompt("类型", proto.type) || proto.type;
    const portStr = window.prompt("端口", String(proto.port));
    const port = portStr ? Number(portStr) || proto.port : proto.port;
    const status = window.prompt("状态", proto.status) || proto.status;

    setProtocols((prev) => prev.map((p) => (p.id === proto.id ? { ...p, name, type, port, status } : p)));
  };

  const handleDelete = (id: string) => {
    if (!window.confirm("确定删除该协议吗？")) return;
    setProtocols((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div>
      <h2>协议管理</h2>
      <p style={{ fontSize: 12, color: "#666", marginBottom: 12 }}>
        支持 Modbus、OPC UA、MQTT 等多种工业协议，适配 DCS、PLC、智能仪表等控制系统。
      </p>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16, marginBottom: 8 }}>
        <h3 style={{ margin: 0 }}>协议列表</h3>
        <button
          type="button"
          onClick={handleAdd}
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
          新增协议
        </button>
      </div>
      <div style={{ borderRadius: 8, border: "1px solid #eee", overflow: "hidden", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead style={{ background: "#fafafa" }}>
            <tr>
              {["协议编号", "协议名称", "类型", "端口", "状态", "操作"].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "8px 12px", borderBottom: "1px solid #eee", whiteSpace: "nowrap" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {protocols.map((p) => (
              <tr key={p.id}>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{p.id}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{p.name}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{p.type}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{p.port}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{p.status}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>
                  <button
                    type="button"
                    onClick={() => handleEdit(p)}
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
                    onClick={() => handleDelete(p.id)}
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
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SectionDeviceMonitoring() {
  const [selectedDevice, setSelectedDevice] = useState<string | null>(
    iotMock.deviceMonitoring[0]?.id || null
  );
  const [pointsData, setPointsData] = useState<Record<string, MonitoringPoint[]>>(
    iotMock.monitoringPoints
  );

  // 实时更新数据（每3秒更新一次）
  useEffect(() => {
    const interval = setInterval(() => {
      setPointsData((prevData) => {
        const newData = { ...prevData };
        Object.keys(newData).forEach((deviceId) => {
          newData[deviceId] = newData[deviceId].map((point) => {
            if (!point.history) return point;
            
            // 移除第一个数据点，添加新的数据点
            const newHistory = [...point.history.slice(1)];
            const now = new Date();
            const timeStr = now.toLocaleTimeString('zh-CN', { hour12: false });
            
            // 生成新的数据点（在原值基础上波动）
            const baseValue = typeof point.value === 'number' ? point.value : 0;
            const variance = baseValue * 0.05; // 5%波动
            const newValue = Number((baseValue + (Math.random() - 0.5) * variance).toFixed(2));
            
            newHistory.push({ time: timeStr, value: newValue });
            
            return {
              ...point,
              value: newValue,
              updateTime: now.toLocaleString('zh-CN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
              }).replace(/\//g, '-'),
              history: newHistory,
            };
          });
        });
        return newData;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const currentPoints = selectedDevice ? pointsData[selectedDevice] || [] : [];
  const selectedDeviceInfo = iotMock.deviceMonitoring.find(
    (d) => d.id === selectedDevice
  );

  return (
    <div>
      <h2>设备状态监控</h2>
      <p style={{ fontSize: 12, color: "#666", marginBottom: 12 }}>
        实时采集关键设备电流、温度、压力、转速等运行参数，支持告警与趋势分析，体现"万物互联"能力（DCS/PLC + 在线分析仪接入）。
      </p>

      <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
        {/* 左侧设备列表 */}
        <div
          style={{
            width: 280,
            maxHeight: 600,
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {iotMock.deviceMonitoring.map((device) => (
            <div
              key={device.id}
              onClick={() => setSelectedDevice(device.id)}
              style={{
                background:
                  selectedDevice === device.id ? "#e6f7ff" : "#fff",
                border:
                  selectedDevice === device.id
                    ? "1px solid #1677ff"
                    : "1px solid #eee",
                borderRadius: 8,
                padding: 12,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    background: "#f5f5f5",
                    borderRadius: 4,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 12,
                  }}
                >
                  <span style={{ fontSize: 20 }}>📡</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#333",
                      marginBottom: 4,
                    }}
                  >
                    {device.name}
                  </div>
                  <div style={{ fontSize: 12, color: "#999" }}>
                    {device.type}
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 12,
                  color: "#666",
                }}
              >
                <span>🕒 {device.lastUpdate}</span>
                <span
                  style={{
                    color:
                      device.status === "运行" || device.status === "正常"
                        ? "#52c41a"
                        : "#999",
                    fontWeight: 600,
                  }}
                >
                  {device.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 右侧点位详情 */}
        <div style={{ flex: 1 }}>
          {selectedDeviceInfo && (
            <>
              <div
                style={{
                  background: "#fff",
                  borderRadius: 8,
                  padding: 16,
                  border: "1px solid #eee",
                  marginBottom: 16,
                }}
              >
                <h3 style={{ margin: 0, marginBottom: 8 }}>
                  {selectedDeviceInfo.name}
                </h3>
                <div style={{ fontSize: 12, color: "#666" }}>
                  <div>📍 所属系统：{selectedDeviceInfo.system}</div>
                  <div>📋 设备类型：{selectedDeviceInfo.type}</div>
                  <div>🕒 最后更新：{selectedDeviceInfo.lastUpdate}</div>
                </div>
              </div>

              <div
                style={{
                  background: "#fff",
                  borderRadius: 8,
                  padding: 16,
                  border: "1px solid #eee",
                }}
              >
                <h3 style={{ margin: 0, marginBottom: 12 }}>实时监控点位</h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                    gap: 16,
                  }}
                >
                  {currentPoints.map((point, idx) => (
                    <div
                      key={idx}
                      style={{
                        background:
                          point.status === "warning"
                            ? "#fff7e6"
                            : point.status === "alarm"
                            ? "#fff1f0"
                            : "#fff",
                        border:
                          point.status === "warning"
                            ? "1px solid #faad14"
                            : point.status === "alarm"
                            ? "1px solid #ff4d4f"
                            : "1px solid #eee",
                        borderRadius: 8,
                        padding: 12,
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                        <div>
                          <div style={{ fontSize: 13, color: "#666", marginBottom: 2 }}>
                            {point.name}
                          </div>
                          <div style={{ fontSize: 20, fontWeight: 600, color: "#333" }}>
                            {point.value}
                            <span style={{ fontSize: 13, fontWeight: 400, color: "#666", marginLeft: 4 }}>
                              {point.unit}
                            </span>
                          </div>
                        </div>
                        <div
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background:
                              point.status === "warning"
                                ? "#faad14"
                                : point.status === "alarm"
                                ? "#ff4d4f"
                                : "#52c41a",
                          }}
                        />
                      </div>
                      
                      {point.history && point.history.length > 0 ? (
                        <ResponsiveContainer width="100%" height={120}>
                          <LineChart data={point.history}>
                            <XAxis 
                              dataKey="time" 
                              tick={{ fontSize: 10 }} 
                              stroke="#ccc"
                              interval="preserveStartEnd"
                            />
                            <YAxis 
                              tick={{ fontSize: 10 }} 
                              stroke="#ccc"
                              domain={['auto', 'auto']}
                              width={40}
                            />
                            <Tooltip 
                              contentStyle={{ fontSize: 12, background: '#fff', border: '1px solid #ddd', borderRadius: 4 }}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="value" 
                              stroke={
                                point.status === "warning"
                                  ? "#faad14"
                                  : point.status === "alarm"
                                  ? "#ff4d4f"
                                  : "#1677ff"
                              }
                              strokeWidth={2}
                              dot={false}
                              animationDuration={300}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      ) : (
                        <div style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: 12 }}>
                          无历史数据
                        </div>
                      )}
                      
                      <div style={{ fontSize: 10, color: "#999", marginTop: 4, textAlign: 'right' }}>
                        {point.updateTime}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function SectionDataSubscription() {
  const [subscriptions, setSubscriptions] = useState(iotMock.subscriptions);

  const handleAdd = () => {
    const id = window.prompt("订阅编号", "");
    if (!id) return;
    const topic = window.prompt("订阅主题", "") || "";
    const source = window.prompt("数据源", "") || "";
    const target = window.prompt("目标系统", "") || "";
    const frequency = window.prompt("频率", "10s") || "10s";
    const status = window.prompt("状态", "停用") || "停用";

    setSubscriptions((prev) => [...prev, { id, topic, source, target, frequency, status }]);
  };

  const handleEdit = (sub: DataSubscription) => {
    const topic = window.prompt("订阅主题", sub.topic) || sub.topic;
    const source = window.prompt("数据源", sub.source) || sub.source;
    const target = window.prompt("目标系统", sub.target) || sub.target;
    const frequency = window.prompt("频率", sub.frequency) || sub.frequency;
    const status = window.prompt("状态", sub.status) || sub.status;

    setSubscriptions((prev) => prev.map((s) => (s.id === sub.id ? { ...s, topic, source, target, frequency, status } : s)));
  };

  const handleDelete = (id: string) => {
    if (!window.confirm("确定删除该订阅吗？")) return;
    setSubscriptions((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div>
      <h2>数据订阅推送</h2>
      <p style={{ fontSize: 12, color: "#666", marginBottom: 12 }}>
        支持按设备、车间、工艺段订阅实时数据流，向生产运营平台、数据集成平台推送。
      </p>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16, marginBottom: 8 }}>
        <h3 style={{ margin: 0 }}>订阅任务列表</h3>
        <button
          type="button"
          onClick={handleAdd}
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
          新增订阅
        </button>
      </div>
      <div style={{ borderRadius: 8, border: "1px solid #eee", overflow: "hidden", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead style={{ background: "#fafafa" }}>
            <tr>
              {["订阅编号", "订阅主题", "数据源", "目标系统", "推送频率", "状态", "操作"].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "8px 12px", borderBottom: "1px solid #eee", whiteSpace: "nowrap" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((s) => (
              <tr key={s.id}>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{s.id}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{s.topic}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{s.source}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{s.target}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{s.frequency}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{s.status}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>
                  <button
                    type="button"
                    onClick={() => handleEdit(s)}
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
                    onClick={() => handleDelete(s.id)}
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
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function IoTPlatformPage() {
  const [activeKey, setActiveKey] = useState<IoTNavKey>("deviceManagement");

  return (
    <Layout>
      <aside
        style={{
          width: 220,
          background: "#fff",
          borderRight: "1px solid #eee",
          padding: "16px 0",
          overflow: "auto",
        }}
      >
        {iotNavItems.map((item) => (
          <div
            key={item.key}
            onClick={() => setActiveKey(item.key)}
            style={{
              padding: "10px 16px",
              fontSize: 14,
              cursor: "pointer",
              background: activeKey === item.key ? "#e6f7ff" : "transparent",
              borderLeft: activeKey === item.key ? "3px solid #1677ff" : "3px solid transparent",
              color: activeKey === item.key ? "#1677ff" : "#333",
            }}
          >
            {item.label}
          </div>
        ))}
      </aside>

      <main style={{ flex: 1, padding: 24, background: "#f5f5f5", overflow: "auto" }}>
        {activeKey === "deviceManagement" && <SectionDeviceManagement />}
        {activeKey === "protocolManagement" && <SectionProtocolManagement />}
        {activeKey === "deviceMonitoring" && <SectionDeviceMonitoring />}
        {activeKey === "dataSubscription" && <SectionDataSubscription />}
      </main>
    </Layout>
  );
}
