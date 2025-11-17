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
  type: string;
  name: string;
  system: string;
  metrics: string;
  status: string;
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
      type: '关键设备',
      name: '一段颚式破碎机',
      system: '破碎 DCS',
      metrics: '电流 320A / 振动 2.1mm/s / 温度 62℃',
      status: '运行',
    },
    {
      type: '关键设备',
      name: '一段球磨机',
      system: '磨矿 DCS',
      metrics: '电流 480A / 压力 0.35MPa / 频率 47Hz',
      status: '运行',
    },
    {
      type: '在线分析仪',
      name: '在线粒度仪',
      system: '磨矿工艺在线分析',
      metrics: 'P80 74μm / 刷新周期 30s',
      status: '正常',
    },
    {
      type: '在线分析仪',
      name: '在线品位分析仪（XRF）',
      system: '精矿品位在线监测',
      metrics: 'Fe 65.3% / 刷新周期 60s',
      status: '正常',
    },
    {
      type: '在线分析仪',
      name: 'pH 计 + 浓度计',
      system: '浮选药剂控制',
      metrics: 'pH 8.2 / 浓度 32%',
      status: '正常',
    },
  ] as DeviceMonitoringItem[],
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
