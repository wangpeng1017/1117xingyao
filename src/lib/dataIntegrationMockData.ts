// 数据集成平台 Mock 数据

export type DINavKey =
  | "systemConnection"
  | "dataMapping"
  | "syncTask"
  | "dataMonitoring";

export interface DINavItem {
  key: DINavKey;
  label: string;
}

export const diNavItems: DINavItem[] = [
  { key: "systemConnection", label: "系统对接管理" },
  { key: "dataMapping", label: "数据映射配置" },
  { key: "syncTask", label: "同步任务管理" },
  { key: "dataMonitoring", label: "数据流监控" },
];

export interface SystemConnection {
  id: string;
  name: string;
  type: string;
  provider: string;
  status: string;
  lastSync: string;
}

export interface DataMapping {
  id: string;
  name: string;
  sourceSystem: string;
  targetSystem: string;
  mappingFields: number;
  status: string;
}

export interface SyncTask {
  id: string;
  name: string;
  source: string;
  target: string;
  frequency: string;
  lastRun: string;
  status: string;
}

export interface DataFlow {
  source: string;
  target: string;
  dataType: string;
  throughput: string;
  status: string;
}

export const diMock = {
  // 系统对接列表
  systemConnections: [
    {
      id: "SYS-001",
      name: "金蝶云星瀚财务系统",
      type: "ERP",
      provider: "金蝶",
      status: "已连接",
      lastSync: "2025-01-15 14:30",
    },
    {
      id: "SYS-002",
      name: "人力资源管理系统",
      type: "HR",
      provider: "星耀内部",
      status: "已连接",
      lastSync: "2025-01-15 14:25",
    },
    {
      id: "SYS-003",
      name: "供应链管理系统",
      type: "SCM",
      provider: "星耀内部",
      status: "已连接",
      lastSync: "2025-01-15 14:28",
    },
    {
      id: "SYS-004",
      name: "云之家企业门户",
      type: "Portal",
      provider: "金蝶",
      status: "已连接",
      lastSync: "2025-01-15 14:32",
    },
    {
      id: "SYS-005",
      name: "东方测控选厂自动化系统",
      type: "MES",
      provider: "东方测控",
      status: "已连接",
      lastSync: "2025-01-15 14:35",
    },
  ] as SystemConnection[],

  // 数据映射配置列表
  dataMappings: [
    {
      id: "MAP-001",
      name: "产量数据同步映射",
      sourceSystem: "物联网平台",
      targetSystem: "金蝶云星瀚",
      mappingFields: 12,
      status: "已启用",
    },
    {
      id: "MAP-002",
      name: "设备运行数据映射",
      sourceSystem: "东方测控",
      targetSystem: "智慧采选平台",
      mappingFields: 25,
      status: "已启用",
    },
    {
      id: "MAP-003",
      name: "人员考勤映射",
      sourceSystem: "HR系统",
      targetSystem: "云之家",
      mappingFields: 8,
      status: "已启用",
    },
    {
      id: "MAP-004",
      name: "物料库存映射",
      sourceSystem: "供应链系统",
      targetSystem: "金蝶云星瀚",
      mappingFields: 15,
      status: "已启用",
    },
  ] as DataMapping[],

  // 同步任务列表
  syncTasks: [
    {
      id: "TASK-001",
      name: "实时产量数据同步",
      source: "物联网平台",
      target: "金蝶云星瀚",
      frequency: "实时",
      lastRun: "2025-01-15 14:35",
      status: "运行中",
    },
    {
      id: "TASK-002",
      name: "设备状态同步",
      source: "东方测控",
      target: "智慧采选平台",
      frequency: "10s",
      lastRun: "2025-01-15 14:35",
      status: "运行中",
    },
    {
      id: "TASK-003",
      name: "日报数据同步",
      source: "智慧采选平台",
      target: "云之家",
      frequency: "每日8:00",
      lastRun: "2025-01-15 08:00",
      status: "已完成",
    },
    {
      id: "TASK-004",
      name: "库存数据同步",
      source: "供应链系统",
      target: "金蝶云星瀚",
      frequency: "每小时",
      lastRun: "2025-01-15 14:00",
      status: "已完成",
    },
  ] as SyncTask[],

  // 数据流监控
  dataFlows: [
    {
      source: "物联网平台",
      target: "智慧采选平台",
      dataType: "设备实时数据",
      throughput: "2.5 MB/s",
      status: "正常",
    },
    {
      source: "东方测控",
      target: "智慧采选平台",
      dataType: "选厂工艺数据",
      throughput: "1.8 MB/s",
      status: "正常",
    },
    {
      source: "智慧采选平台",
      target: "金蝶云星瀚",
      dataType: "生产经营数据",
      throughput: "0.5 MB/s",
      status: "正常",
    },
    {
      source: "HR系统",
      target: "云之家",
      dataType: "人员管理数据",
      throughput: "0.2 MB/s",
      status: "正常",
    },
    {
      source: "供应链系统",
      target: "金蝶云星瀚",
      dataType: "采购库存数据",
      throughput: "0.8 MB/s",
      status: "正常",
    },
  ] as DataFlow[],
};
