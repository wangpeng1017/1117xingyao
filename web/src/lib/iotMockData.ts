export type IoTNavKey = 'deviceManagement' | 'protocolManagement' | 'deviceMonitoring' | 'dataSubscription';

export const iotNavItems: { key: IoTNavKey; label: string }[] = [
  { key: 'deviceManagement', label: '设备管理' },
  { key: 'protocolManagement', label: '协议管理' },
  { key: 'deviceMonitoring', label: '设备状态监控' },
  { key: 'dataSubscription', label: '数据订阅推送' },
];

export interface IoTDevice {
  id: string;
  name: string;
  type: string;
  system: string;
  protocol: string;
  address: string;
  status: string;
}

export interface IoTProtocol {
  id: string;
  name: string;
  type: string;
  port: number;
  status: string;
}

export interface DeviceMonitoringItem {
  id: string;
  name: string;
  type: string;
  system: string;
  status: string;
  image?: string;
  lastUpdate: string;
}

export interface MonitoringPoint {
  name: string;
  value: string | number;
  unit: string;
  status: 'normal' | 'warning' | 'alarm';
  updateTime: string;
  history?: { time: string; value: number }[]; // 历史数据用于绘制折线图
}

// 生成当前时间字符串
function getCurrentTime(): string {
  const now = new Date();
  return now.toLocaleString('zh-CN', { 
    year: 'numeric',
    month: '2-digit', 
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false 
  }).replace(/\//g, '-');
}

// 生成模拟历史数据（20个点，每3秒一个）
function generateHistory(baseValue: number, variance: number): { time: string; value: number }[] {
  const history = [];
  const now = Date.now();
  for (let i = 19; i >= 0; i--) {
    const time = new Date(now - i * 3000);
    const timeStr = time.toLocaleTimeString('zh-CN', { hour12: false });
    const value = Number((baseValue + (Math.random() - 0.5) * variance).toFixed(2));
    history.push({ time: timeStr, value });
  }
  return history;
}

export interface DataSubscription {
  id: string;
  topic: string;
  source: string;
  target: string;
  frequency: string;
  status: string;
}

export const iotMock = {
  devices: [
    {
      id: 'DEV-001',
      name: '一段颚式破碎机',
      type: '关键设备',
      system: '破碎 DCS',
      protocol: 'Modbus TCP',
      address: '192.168.1.101',
      status: '在线',
    },
    {
      id: 'DEV-002',
      name: '一段球磨机',
      type: '关键设备',
      system: '磨矿 DCS',
      protocol: 'OPC UA',
      address: '192.168.1.102',
      status: '在线',
    },
    {
      id: 'DEV-003',
      name: '在线粒度仪',
      type: '在线分析仪',
      system: '磨矿工艺在线分析',
      protocol: 'Modbus RTU',
      address: '192.168.1.201',
      status: '在线',
    },
    {
      id: 'DEV-004',
      name: '在线品位分析仪（XRF）',
      type: '在线分析仪',
      system: '精矿品位在线监测',
      protocol: 'MQTT',
      address: '192.168.1.202',
      status: '在线',
    },
    {
      id: 'DEV-005',
      name: 'pH 计 + 浓度计',
      type: '在线分析仪',
      system: '浮选药剂控制',
      protocol: 'Modbus TCP',
      address: '192.168.1.203',
      status: '在线',
    },
  ] as IoTDevice[],
  protocols: [
    {
      id: 'PROTO-001',
      name: 'Modbus TCP 协议',
      type: 'Modbus TCP',
      port: 502,
      status: '已启用',
    },
    {
      id: 'PROTO-002',
      name: 'OPC UA 协议',
      type: 'OPC UA',
      port: 4840,
      status: '已启用',
    },
    {
      id: 'PROTO-003',
      name: 'MQTT 协议',
      type: 'MQTT',
      port: 1883,
      status: '已启用',
    },
  ] as IoTProtocol[],
  deviceMonitoring: [
    {
      id: 'DEV-001',
      name: '一段颊式破碎机',
      type: '关键设备',
      system: '破碎 DCS',
      status: '运行',
      lastUpdate: getCurrentTime(),
    },
    {
      id: 'DEV-002',
      name: '一段球磨机',
      type: '关键设备',
      system: '磨矿 DCS',
      status: '运行',
      lastUpdate: getCurrentTime(),
    },
    {
      id: 'DEV-003',
      name: '在线粒度仪',
      type: '在线分析仪',
      system: '磨矿工艺在线分析',
      status: '正常',
      lastUpdate: getCurrentTime(),
    },
    {
      id: 'DEV-004',
      name: '在线品位分析仪（XRF）',
      type: '在线分析仪',
      system: '精矿品位在线监测',
      status: '正常',
      lastUpdate: getCurrentTime(),
    },
    {
      id: 'DEV-005',
      name: 'pH 计 + 浓度计',
      type: '在线分析仪',
      system: '浮选药剂控制',
      status: '正常',
      lastUpdate: getCurrentTime(),
    },
    {
      id: 'DEV-006',
      name: '浮选机',
      type: '关键设备',
      system: '浮选 DCS',
      status: '运行',
      lastUpdate: getCurrentTime(),
    },
    {
      id: 'DEV-007',
      name: '浓密机',
      type: '关键设备',
      system: '脱水 DCS',
      status: '运行',
      lastUpdate: getCurrentTime(),
    },
    {
      id: 'DEV-008',
      name: '在线流量计',
      type: '在线分析仪',
      system: '流程监测',
      status: '正常',
      lastUpdate: getCurrentTime(),
    },
  ] as DeviceMonitoringItem[],
  
  // 设备监控点位数据（根据设备ID关联）
  monitoringPoints: {
    'DEV-001': [
      { name: '电机电流', value: 320, unit: 'A', status: 'normal', updateTime: getCurrentTime(), history: generateHistory(320, 20) },
      { name: '振动速度', value: 2.1, unit: 'mm/s', status: 'normal', updateTime: getCurrentTime(), history: generateHistory(2.1, 0.4) },
      { name: '轴承温度', value: 62, unit: '℃', status: 'normal', updateTime: getCurrentTime(), history: generateHistory(62, 5) },
      { name: '破碎腔压力', value: 0.85, unit: 'MPa', status: 'normal', updateTime: getCurrentTime(), history: generateHistory(0.85, 0.1) },
      { name: '运行时间', value: 1245, unit: 'h', status: 'normal', updateTime: getCurrentTime() },
      { name: '电机功率', value: 185, unit: 'kW', status: 'normal', updateTime: getCurrentTime(), history: generateHistory(185, 15) },
    ] as MonitoringPoint[],
    'DEV-002': [
      { name: '主电机电流', value: 480, unit: 'A', status: 'normal', updateTime: getCurrentTime(), history: generateHistory(480, 30) },
      { name: '筒体压力', value: 0.35, unit: 'MPa', status: 'normal', updateTime: getCurrentTime(), history: generateHistory(0.35, 0.05) },
      { name: '运行频率', value: 47, unit: 'Hz', status: 'normal', updateTime: getCurrentTime(), history: generateHistory(47, 2) },
      { name: '轴承温度', value: 68, unit: '℃', status: 'warning', updateTime: getCurrentTime(), history: generateHistory(68, 6) },
      { name: '给矿量', value: 125, unit: 't/h', status: 'normal', updateTime: getCurrentTime(), history: generateHistory(125, 15) },
      { name: '水电比', value: 1.8, unit: '', status: 'normal', updateTime: getCurrentTime(), history: generateHistory(1.8, 0.2) },
      { name: '球负率', value: 32, unit: '%', status: 'normal', updateTime: getCurrentTime(), history: generateHistory(32, 5) },
    ] as MonitoringPoint[],
    'DEV-003': [
      { name: 'P80 粒度', value: 74, unit: 'μm', status: 'normal', updateTime: getCurrentTime(), history: generateHistory(74, 8) },
      { name: 'P50 粒度', value: 45, unit: 'μm', status: 'normal', updateTime: getCurrentTime(), history: generateHistory(45, 5) },
      { name: '测量周期', value: 30, unit: 's', status: 'normal', updateTime: getCurrentTime() },
      { name: '样品浓度', value: 35, unit: '%', status: 'normal', updateTime: getCurrentTime(), history: generateHistory(35, 4) },
      { name: '仪表状态', value: '在线', unit: '', status: 'normal', updateTime: getCurrentTime() },
    ] as MonitoringPoint[],
    'DEV-004': [
      { name: 'Cu 品位', value: 24.5, unit: '%', status: 'normal', updateTime: getCurrentTime(), history: generateHistory(24.5, 1.5) },
      { name: 'Fe 品位', value: 65.3, unit: '%', status: 'normal', updateTime: getCurrentTime(), history: generateHistory(65.3, 3) },
      { name: 'S 品位', value: 3.2, unit: '%', status: 'normal', updateTime: getCurrentTime(), history: generateHistory(3.2, 0.4) },
      { name: '测量周期', value: 60, unit: 's', status: 'normal', updateTime: getCurrentTime() },
      { name: 'X 射线管状态', value: '正常', unit: '', status: 'normal', updateTime: getCurrentTime() },
    ] as MonitoringPoint[],
    'DEV-005': [
      { name: 'pH 值', value: 8.2, unit: '', status: 'normal', updateTime: getCurrentTime(), history: generateHistory(8.2, 0.5) },
      { name: '浓度', value: 32, unit: '%', status: 'normal', updateTime: getCurrentTime(), history: generateHistory(32, 3) },
      { name: '温度', value: 25, unit: '℃', status: 'normal', updateTime: getCurrentTime(), history: generateHistory(25, 2) },
      { name: '流速', value: 1.5, unit: 'm/s', status: 'normal', updateTime: getCurrentTime(), history: generateHistory(1.5, 0.3) },
    ] as MonitoringPoint[],
    'DEV-006': [
      { name: '电机电流', value: 265, unit: 'A', status: 'normal', updateTime: getCurrentTime(), history: generateHistory(265, 20) },
      { name: '叶轮转速', value: 18, unit: 'rpm', status: 'normal', updateTime: getCurrentTime(), history: generateHistory(18, 2) },
      { name: '液位', value: 2.8, unit: 'm', status: 'normal', updateTime: getCurrentTime(), history: generateHistory(2.8, 0.3) },
      { name: '给气量', value: 85, unit: 'm³/h', status: 'normal', updateTime: getCurrentTime(), history: generateHistory(85, 8) },
      { name: '药剂流量', value: 15, unit: 'L/min', status: 'normal', updateTime: getCurrentTime(), history: generateHistory(15, 2) },
    ] as MonitoringPoint[],
    'DEV-007': [
      { name: '电机电流', value: 145, unit: 'A', status: 'normal', updateTime: getCurrentTime(), history: generateHistory(145, 12) },
      { name: '车轮转速', value: 1.2, unit: 'rpm', status: 'normal', updateTime: getCurrentTime(), history: generateHistory(1.2, 0.15) },
      { name: '底流浓度', value: 68, unit: '%', status: 'normal', updateTime: getCurrentTime(), history: generateHistory(68, 5) },
      { name: '溢流浓度', value: 12, unit: '%', status: 'normal', updateTime: getCurrentTime(), history: generateHistory(12, 2) },
      { name: '沉降区泥位', value: 3.5, unit: 'm', status: 'normal', updateTime: getCurrentTime(), history: generateHistory(3.5, 0.4) },
    ] as MonitoringPoint[],
    'DEV-008': [
      { name: '矿浆流量', value: 325, unit: 'm³/h', status: 'normal', updateTime: getCurrentTime(), history: generateHistory(325, 25) },
      { name: '矿浆浓度', value: 38, unit: '%', status: 'normal', updateTime: getCurrentTime(), history: generateHistory(38, 4) },
      { name: '管道压力', value: 0.25, unit: 'MPa', status: 'normal', updateTime: getCurrentTime(), history: generateHistory(0.25, 0.03) },
      { name: '流速', value: 2.8, unit: 'm/s', status: 'normal', updateTime: getCurrentTime(), history: generateHistory(2.8, 0.4) },
    ] as MonitoringPoint[],
  } as Record<string, MonitoringPoint[]>,
  subscriptions: [
    {
      id: 'SUB-001',
      topic: '破碎车间设备数据',
      source: '破碎 DCS',
      target: '生产运营平台',
      frequency: '1s',
      status: '运行中',
    },
    {
      id: 'SUB-002',
      topic: '磨矿浮选工艺数据',
      source: '磨矿 DCS + 在线分析仪',
      target: '数据集成平台',
      frequency: '10s',
      status: '运行中',
    },
    {
      id: 'SUB-003',
      topic: '在线品位与粒度数据',
      source: '在线分析仪',
      target: '数据集成平台 + 集团驾驶舱',
      frequency: '30s',
      status: '运行中',
    },
  ] as DataSubscription[],
};
