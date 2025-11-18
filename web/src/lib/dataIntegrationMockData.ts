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
    {
      id: "SYS-006",
      name: "地磅采掘调度系统",
      type: "MES",
      provider: "星耀内部",
      status: "已连接",
      lastSync: "2025-01-15 14:33",
    },
    {
      id: "SYS-007",
      name: "车队管理系统",
      type: "Fleet",
      provider: "星耀内部",
      status: "已连接",
      lastSync: "2025-01-15 14:27",
    },
    {
      id: "SYS-008",
      name: "安全环保监测系统",
      type: "Safety",
      provider: "星耀内部",
      status: "已连接",
      lastSync: "2025-01-15 14:36",
    },
    {
      id: "SYS-009",
      name: "质检化验LIMS系统",
      type: "LIMS",
      provider: "第三方",
      status: "已连接",
      lastSync: "2025-01-15 14:29",
    },
    {
      id: "SYS-010",
      name: "能源管理系统",
      type: "EMS",
      provider: "星耀内部",
      status: "已连接",
      lastSync: "2025-01-15 14:31",
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
    {
      id: "MAP-005",
      name: "矿石品位数据映射",
      sourceSystem: "LIMS系统",
      targetSystem: "智慧采选平台",
      mappingFields: 18,
      status: "已启用",
    },
    {
      id: "MAP-006",
      name: "车辆调度数据映射",
      sourceSystem: "车队管理系统",
      targetSystem: "智慧采选平台",
      mappingFields: 14,
      status: "已启用",
    },
    {
      id: "MAP-007",
      name: "安全事件映射",
      sourceSystem: "安全监测系统",
      targetSystem: "云之家",
      mappingFields: 10,
      status: "已启用",
    },
    {
      id: "MAP-008",
      name: "能耗数据映射",
      sourceSystem: "能源管理系统",
      targetSystem: "智慧采选平台",
      mappingFields: 20,
      status: "已启用",
    },
    {
      id: "MAP-009",
      name: "设备维修记录映射",
      sourceSystem: "设备管理系统",
      targetSystem: "金蝶云星瀚",
      mappingFields: 16,
      status: "已启用",
    },
    {
      id: "MAP-010",
      name: "采掘计划映射",
      sourceSystem: "地磅调度系统",
      targetSystem: "智慧采选平台",
      mappingFields: 22,
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
    {
      id: "TASK-005",
      name: "化验结果同步",
      source: "LIMS系统",
      target: "智慧采选平台",
      frequency: "每15分钟",
      lastRun: "2025-01-15 14:30",
      status: "运行中",
    },
    {
      id: "TASK-006",
      name: "车辆位置同步",
      source: "车队管理系统",
      target: "智慧采选平台",
      frequency: "30s",
      lastRun: "2025-01-15 14:35",
      status: "运行中",
    },
    {
      id: "TASK-007",
      name: "安全监测数据同步",
      source: "安全监测系统",
      target: "云之家",
      frequency: "实时",
      lastRun: "2025-01-15 14:35",
      status: "运行中",
    },
    {
      id: "TASK-008",
      name: "能耗数据汇总",
      source: "能源管理系统",
      target: "金蝶云星瀚",
      frequency: "每日0:00",
      lastRun: "2025-01-15 00:00",
      status: "已完成",
    },
    {
      id: "TASK-009",
      name: "设备维修记录同步",
      source: "设备管理系统",
      target: "金蝶云星瀚",
      frequency: "每小时",
      lastRun: "2025-01-15 14:00",
      status: "已完成",
    },
    {
      id: "TASK-010",
      name: "采挖计划执行同步",
      source: "地磅调度系统",
      target: "智慧采选平台",
      frequency: "每5分钟",
      lastRun: "2025-01-15 14:35",
      status: "运行中",
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
    {
      source: "LIMS系统",
      target: "智慧采选平台",
      dataType: "化验分析数据",
      throughput: "0.3 MB/s",
      status: "正常",
    },
    {
      source: "车队管理系统",
      target: "智慧采选平台",
      dataType: "运输调度数据",
      throughput: "1.2 MB/s",
      status: "正常",
    },
    {
      source: "安全监测系统",
      target: "云之家",
      dataType: "安全事件数据",
      throughput: "0.4 MB/s",
      status: "正常",
    },
    {
      source: "能源管理系统",
      target: "智慧采选平台",
      dataType: "能耗监测数据",
      throughput: "0.6 MB/s",
      status: "正常",
    },
    {
      source: "地磅调度系统",
      target: "智慧采选平台",
      dataType: "采挖计划数据",
      throughput: "0.9 MB/s",
      status: "正常",
    },
  ] as DataFlow[],
};
