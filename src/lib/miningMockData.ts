export type NavKey =
  | 'geoInfo'
  | 'openPit'
  | 'underground'
  | 'concentrator'
  | 'lab'
  | 'equipment'
  | 'analytics'
  | 'safety'
  | 'mobile';

export const navItems: { key: NavKey; label: string }[] = [
  { key: 'geoInfo', label: '地质信息管理' },
  { key: 'openPit', label: '露采生产管理' },
  { key: 'underground', label: '地采生产管理' },
  { key: 'concentrator', label: '选矿生产管理' },
  { key: 'lab', label: '质检化验管理' },
  { key: 'equipment', label: '设备管理与预测性维护' },
  { key: 'analytics', label: '矿山决策分析' },
  { key: 'safety', label: '安全环保管理' },
  { key: 'mobile', label: '移动端' },
];

// 通用 KPI 类型
export interface Kpi {
  name: string;
  value: number | string;
  unit?: string;
  trend?: 'up' | 'down' | 'flat';
  vsYesterday?: number; // 环比 %
}

// 1. 地质信息管理（项目 & 钻探进度示例）
export const geoInfoMock = {
  projects: [
    {
      id: 'GEO-2025-01',
      name: '东翼深部挖潜勘探项目',
      owner: '星耀地勘部',
      contractor: 'XX 钻探公司',
      stage: '施工中',
      plannedMeters: 12000,
      completedMeters: 6800,
      startDate: '2025-03-01',
      endDate: '2025-09-30',
    },
    {
      id: 'GEO-2025-02',
      name: '西矿带资源验证项目',
      owner: '星耀地勘部',
      contractor: 'YY 地质队',
      stage: '设计中',
      plannedMeters: 8000,
      completedMeters: 0,
      startDate: '2025-05-01',
      endDate: '2025-10-31',
    },
  ],
  drillProgress: [
    {
      holeId: 'ZK1201',
      projectId: 'GEO-2025-01',
      type: '金刚石钻探',
      designDepth: 600,
      completedDepth: 420,
      coreRecovery: 95.2,
      lithologyAIRecognized: true,
      lastUpdate: '2025-11-15',
    },
    {
      holeId: 'ZK1202',
      projectId: 'GEO-2025-01',
      type: 'RC 钻探',
      designDepth: 450,
      completedDepth: 300,
      coreRecovery: 0,
      lithologyAIRecognized: false,
      lastUpdate: '2025-11-15',
    },
  ],
};

// 2. 露采生产管理（采剥量 & 采剥比）
export const openPitMock = {
  kpis: [
    { name: '本月累计采出矿量', value: 185000, unit: 't', trend: 'up', vsYesterday: 3.2 },
    { name: '本月累计剥离量', value: 320000, unit: 'm³', trend: 'down', vsYesterday: -1.5 },
    { name: '采剥比', value: 1.73, unit: 't/m³', trend: 'flat', vsYesterday: 0.1 },
  ] as Kpi[],
  dailyProduction: [
    {
      date: '2025-11-13',
      bench: '1160m 平台',
      oreTonnage: 8200,
      wasteTonnage: 14500,
      avgGradeFe: 32.5,
      dilutionRate: 4.2,
      powderFactor: 0.62,
    },
    {
      date: '2025-11-14',
      bench: '1140m 平台',
      oreTonnage: 9100,
      wasteTonnage: 15200,
      avgGradeFe: 31.9,
      dilutionRate: 4.8,
      powderFactor: 0.65,
    },
    {
      date: '2025-11-15',
      bench: '1120m 平台',
      oreTonnage: 9600,
      wasteTonnage: 14800,
      avgGradeFe: 33.1,
      dilutionRate: 3.9,
      powderFactor: 0.63,
    },
  ],
};

// 3. 地采生产管理（掘进/采矿/充填台账）
export const undergroundMock = {
  kpis: [
    { name: '本月累计掘进', value: 1320, unit: 'm', trend: 'up', vsYesterday: 2.1 },
    { name: '本月采出矿量', value: 96500, unit: 't', trend: 'up', vsYesterday: 1.7 },
    { name: '采掘比', value: 0.73, unit: 't/m', trend: 'flat', vsYesterday: 0.0 },
  ] as Kpi[],
  drivageLedger: [
    {
      date: '2025-11-15',
      roadway: '3501 运输巷',
      shift: '白班',
      length: 12.5,
      rockClass: '中硬',
      drillingMethod: '中深孔爆破',
      remark: '巷道断面正常',
    },
    {
      date: '2025-11-15',
      roadway: '3503 探放水巷',
      shift: '中班',
      length: 8.0,
      rockClass: '软岩',
      drillingMethod: '锚网支护',
      remark: '遇局部软弱夹层',
    },
  ],
  stopingLedger: [
    {
      stope: '3501-1101 采场',
      method: '充填法',
      date: '2025-11-15',
      oreTonnage: 3200,
      avgGradeFe: 35.8,
      dilutionRate: 5.1,
      filling: true,
    },
  ],
};

// 4. 选矿生产管理（核心：碎矿/磨浮/脱水/库存）
export const concentratorMock = {
  kpis: [
    { name: '当日处理矿量', value: 18600, unit: 't', trend: 'up', vsYesterday: 4.3 },
    { name: '精矿产量', value: 6150, unit: 't', trend: 'up', vsYesterday: 2.8 },
    { name: '精矿品位', value: 65.3, unit: '%', trend: 'flat', vsYesterday: 0.0 },
    { name: '金属回收率', value: 89.7, unit: '%', trend: 'up', vsYesterday: 0.5 },
  ] as Kpi[],
  processSummary: [
    {
      section: '碎矿',
      plannedTonnage: 19000,
      actualTonnage: 18600,
      availability: 97.2,
      energyKwhPerTon: 1.85,
      keyEquipment: '颚破 + 圆锥破',
    },
    {
      section: '磨矿/浮选',
      plannedTonnage: 18800,
      actualTonnage: 18400,
      availability: 96.1,
      energyKwhPerTon: 7.3,
      keyEquipment: '球磨机 + 浮选机',
    },
    {
      section: '脱水',
      plannedTonnage: 6300,
      actualTonnage: 6150,
      availability: 98.5,
      energyKwhPerTon: 0.9,
      keyEquipment: '浓密机 + 过滤机',
    },
  ],
  dailyPlanLedger: [
    {
      date: '2025-11-13',
      shift: '白班',
      oreType: '东矿带混合矿',
      plannedTonnage: 9000,
      actualTonnage: 8800,
      feedGradeFe: 34.2,
      concentrateGradeFe: 65.1,
      recovery: 89.1,
    },
    {
      date: '2025-11-13',
      shift: '夜班',
      oreType: '西矿带贫矿',
      plannedTonnage: 9000,
      actualTonnage: 8800,
      feedGradeFe: 30.8,
      concentrateGradeFe: 64.7,
      recovery: 88.4,
    },
  ],
  energySummary: [
    {
      section: '碎矿',
      powerKwh: 34500,
      waterM3: 1200,
      unitCost: 5.8,
    },
    {
      section: '磨矿/浮选',
      powerKwh: 108200,
      waterM3: 5100,
      unitCost: 16.2,
    },
    {
      section: '脱水',
      powerKwh: 22300,
      waterM3: 800,
      unitCost: 3.5,
    },
  ],
  inventory: [
    {
      product: '铁精矿',
      warehouse: '主厂精矿库',
      currentStock: 18500,
      unit: 't',
      safetyStock: 10000,
      onTheWay: 3200,
      lastShipmentDate: '2025-11-15',
      lastShipmentTonnage: 4500,
    },
    {
      product: '中间矿',
      warehouse: '回收矿仓',
      currentStock: 2300,
      unit: 't',
      safetyStock: 1000,
      onTheWay: 0,
      lastShipmentDate: '2025-11-14',
      lastShipmentTonnage: 800,
    },
  ],
  // 计划编制
  productionPlans: [
    {
      id: 'PLAN-2025-11',
      type: '月度计划',
      period: '2025年11月',
      targetTonnage: 560000,
      targetGrade: 65.0,
      targetRecovery: 89.5,
      status: '执行中',
      createdBy: '张主任',
      approvedBy: '李厂长',
      createdAt: '2025-10-28',
      approvedAt: '2025-10-30',
    },
    {
      id: 'PLAN-2025-W46',
      type: '周计划',
      period: '2025年第46周',
      targetTonnage: 130000,
      targetGrade: 65.2,
      targetRecovery: 89.8,
      status: '已完成',
      createdBy: '王工',
      approvedBy: '张主任',
      createdAt: '2025-11-08',
      approvedAt: '2025-11-09',
    },
    {
      id: 'PLAN-2025-W47',
      type: '周计划',
      period: '2025年第47周',
      targetTonnage: 132000,
      targetGrade: 65.0,
      targetRecovery: 89.6,
      status: '待审批',
      createdBy: '王工',
      approvedBy: null,
      createdAt: '2025-11-15',
      approvedAt: null,
    },
  ],
  // 能耗趋势（最近7天）
  energyTrend: [
    { date: '2025-11-09', powerKwh: 162000, waterM3: 7050, unitPowerCost: 9.2 },
    { date: '2025-11-10', powerKwh: 165000, waterM3: 7100, unitPowerCost: 9.3 },
    { date: '2025-11-11', powerKwh: 163500, waterM3: 7020, unitPowerCost: 9.1 },
    { date: '2025-11-12', powerKwh: 168000, waterM3: 7200, unitPowerCost: 9.5 },
    { date: '2025-11-13', powerKwh: 164800, waterM3: 7080, unitPowerCost: 9.2 },
    { date: '2025-11-14', powerKwh: 166200, waterM3: 7150, unitPowerCost: 9.3 },
    { date: '2025-11-15', powerKwh: 165000, waterM3: 7100, unitPowerCost: 9.2 },
  ],
  // 经济指标分析
  economicIndicators: {
    currentMonth: {
      totalCost: 2586000, // 元
      revenue: 3920000, // 元
      profit: 1334000, // 元
      profitMargin: 34.0, // %
      unitCost: 48.6, // 元/t
      unitRevenue: 73.7, // 元/t
    },
    costBreakdown: [
      { category: '电力成本', amount: 1068000, percentage: 41.3 },
      { category: '人工成本', amount: 610000, percentage: 23.6 },
      { category: '药剂材料', amount: 502000, percentage: 19.4 },
      { category: '折旧摊销', amount: 212000, percentage: 8.2 },
      { category: '其他', amount: 194000, percentage: 7.5 },
    ],
    monthlyComparison: [
      { month: '2025-05', unitCost: 51.2, profitMargin: 30.5 },
      { month: '2025-06', unitCost: 50.8, profitMargin: 31.2 },
      { month: '2025-07', unitCost: 49.5, profitMargin: 32.8 },
      { month: '2025-08', unitCost: 50.1, profitMargin: 32.1 },
      { month: '2025-09', unitCost: 49.8, profitMargin: 32.6 },
      { month: '2025-10', unitCost: 49.2, profitMargin: 33.5 },
      { month: '2025-11', unitCost: 48.6, profitMargin: 34.0 },
    ],
  },
};

// 5. 质检化验管理（样品 & 金属平衡）
export const labMock = {
  kpis: [
    { name: '当日受理样品数', value: 126, unit: '件', trend: 'up', vsYesterday: 5.0 },
    { name: '报告准时率', value: 98.2, unit: '%', trend: 'up', vsYesterday: 0.7 },
  ] as Kpi[],
  samples: [
    {
      sampleId: 'XM-20251115-001',
      barcode: '20251115001',
      materialType: '精矿',
      source: '选矿厂精矿溜槽',
      project: '日常生产检测',
      status: '已完成',
      receivedAt: '2025-11-15 09:12',
      reportedAt: '2025-11-15 14:26',
      fe: 65.4,
      sio2: 4.8,
      s: 0.018,
      lab: '化验室一室',
    },
    {
      sampleId: 'XM-20251115-017',
      barcode: '20251115017',
      materialType: '原矿',
      source: '西矿带地采混合矿',
      project: '采场品控',
      status: '检验中',
      receivedAt: '2025-11-15 10:35',
      reportedAt: null,
      fe: null,
      sio2: null,
      s: null,
      lab: '化验室二室',
    },
  ],
  metalBalance: [
    {
      stage: '原矿',
      tonnage: 18600,
      gradeFe: 34.2,
      metalFe: 6361.2,
    },
    {
      stage: '精矿',
      tonnage: 6150,
      gradeFe: 65.3,
      metalFe: 4017.0,
    },
    {
      stage: '尾矿',
      tonnage: 12450,
      gradeFe: 18.0,
      metalFe: 2241.0,
    },
  ],
};

// 6. 设备管理与预测性维护
export const equipmentMock = {
  kpis: [
    { name: '关键设备综合开机率', value: 96.4, unit: '%', trend: 'up', vsYesterday: 0.9 },
    { name: '当月故障次数', value: 3, unit: '次', trend: 'down', vsYesterday: -1.0 },
  ] as Kpi[],
  equipmentList: [
    {
      id: 'EQ-CR-01',
      name: '一段颚式破碎机',
      area: '破碎车间',
      status: '运行',
      availability: 98.2,
      mtbfHours: 920,
      lastMaintenance: '2025-10-28',
      nextMaintenance: '2025-12-05',
      vibrationMmS: 2.1,
      tempCelsius: 62,
    },
    {
      id: 'EQ-BM-01',
      name: '一段球磨机',
      area: '磨矿车间',
      status: '运行',
      availability: 95.6,
      mtbfHours: 780,
      lastMaintenance: '2025-11-05',
      nextMaintenance: '2025-11-25',
      vibrationMmS: 3.8,
      tempCelsius: 68,
    },
    {
      id: 'EQ-PU-03',
      name: '3# 泵',
      area: '浮选车间',
      status: '待修',
      availability: 80.3,
      mtbfHours: 320,
      lastMaintenance: '2025-10-10',
      nextMaintenance: '2025-11-16',
      vibrationMmS: 8.5,
      tempCelsius: 75,
    },
  ],
  predictiveAlerts: [
    {
      equipmentId: 'EQ-BM-01',
      level: '预警',
      type: '轴承温度异常趋势',
      predictedFailureHours: 72,
      suggestion: '安排 48 小时内计划检修，更换润滑脂并复测振动。',
    },
    {
      equipmentId: 'EQ-PU-03',
      level: '严重',
      type: '振动超限',
      predictedFailureHours: 24,
      suggestion: '立即停机检查联轴器及地脚螺栓，必要时更换叶轮。',
    },
  ],
};

// 7. 矿山决策分析（驾驶舱 KPI）
export const analyticsMock = {
  kpis: [
    { name: '集团日处理矿量', value: 52300, unit: 't', trend: 'up', vsYesterday: 3.1 },
    { name: '综合精矿品位', value: 64.8, unit: '%', trend: 'flat', vsYesterday: 0.0 },
    { name: '单位选矿成本', value: 48.6, unit: '元/t', trend: 'down', vsYesterday: -1.2 },
    { name: '设备综合效率 OEE', value: 87.4, unit: '%', trend: 'up', vsYesterday: 0.6 },
  ] as Kpi[],
  oreFlow: [
    {
      source: '露采',
      tonnage: 28000,
      avgGradeFe: 32.1,
    },
    {
      source: '地采',
      tonnage: 24300,
      avgGradeFe: 35.4,
    },
  ],
  costBreakdown: [
    { category: '能源成本', value: 41.3 },
    { category: '人工成本', value: 23.6 },
    { category: '材料及备件', value: 19.4 },
    { category: '折旧摊销', value: 8.2 },
    { category: '其他', value: 7.5 },
  ],
};

// 8. 安全环保管理
export const safetyMock = {
  kpis: [
    { name: '本月零事故天数', value: 15, unit: '天', trend: 'up', vsYesterday: 1 },
    { name: '重大隐患整改完成率', value: 92.0, unit: '%', trend: 'up', vsYesterday: 2.0 },
  ] as Kpi[],
  tailingsMonitoring: [
    {
      dam: '一号尾矿库',
      waterLevelM: 3.8,
      maxAllowedM: 5.0,
      ph: 8.2,
      turbidity: 25,
      lastUpdate: '2025-11-15 10:30',
    },
  ],
  hazards: [
    {
      id: 'HZ-20251115-01',
      type: '高处作业防护缺失',
      area: '磨矿车间',
      level: '重大',
      status: '整改中',
      createdAt: '2025-11-14 16:20',
      dueDate: '2025-11-18',
      responsible: '张三',
    },
    {
      id: 'HZ-20251115-02',
      type: '劳保穿戴不规范',
      area: '浮选车间',
      level: '一般',
      status: '已整改',
      createdAt: '2025-11-15 08:50',
      dueDate: '2025-11-15',
      responsible: '李四',
    },
  ],
};

// 9. 移动端应用场景
export const mobileMock = {
  todoList: [
    {
      id: 'M-20251115-01',
      type: '生产台账填报',
      title: '选矿日班生产台账',
      module: '选矿生产管理',
      deadline: '2025-11-15 18:00',
      status: '待处理',
    },
    {
      id: 'M-20251115-02',
      type: '设备点巡检',
      title: '破碎车间关键设备巡检',
      module: '设备管理',
      deadline: '2025-11-15 16:00',
      status: '进行中',
    },
    {
      id: 'M-20251115-03',
      type: '隐患上报',
      title: '磨矿车间电缆磨损',
      module: '安全管理',
      deadline: '2025-11-16 12:00',
      status: '已完成',
    },
  ],
  approvals: [
    {
      id: 'AP-20251115-01',
      type: '动火作业票',
      applicant: '王强',
      area: '精选车间',
      status: '待审批',
      submittedAt: '2025-11-15 09:10',
    },
  ],
};
