// 数字孪生 Mock 数据 - 选矿工艺流程实时监控

export interface ProcessNode {
  id: string;
  name: string;
  type: 'equipment' | 'tank' | 'pump' | 'conveyor' | 'storage';
  status: 'running' | 'stopped' | 'warning' | 'alarm';
  parameters: ProcessParameter[];
}

export interface ProcessParameter {
  name: string;
  value: string | number;
  unit: string;
  status: 'normal' | 'warning' | 'alarm';
}

export interface MaterialFlow {
  from: string;
  to: string;
  flowRate: number; // t/h 或 m³/h
  concentration?: number; // % 浓度
  grade?: number; // % 品位
  isActive: boolean;
}

// 生成当前时间
function getCurrentTime(): string {
  const now = new Date();
  return now.toLocaleString('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
}

export const digitalTwinMock = {
  // 工艺流程节点
  processNodes: [
    // 1. 粗破碎区域
    {
      id: 'crusher-primary',
      name: '粗颚式破碎机',
      type: 'equipment',
      status: 'running',
      parameters: [
        { name: '给矿量', value: 100, unit: 't/h', status: 'normal' },
        { name: '电机电流', value: 420, unit: 'A', status: 'normal' },
        { name: '排料口尺寸', value: 150, unit: 'mm', status: 'normal' },
        { name: '运行时间', value: 1245, unit: 'h', status: 'normal' },
      ],
    },
    {
      id: 'storage-intermediate',
      name: '中间矿堆',
      type: 'storage',
      status: 'running',
      parameters: [
        { name: '库存量', value: 4485, unit: 't', status: 'normal' },
        { name: '料位', value: 65, unit: '%', status: 'normal' },
      ],
    },

    // 2. 皮带运输
    {
      id: 'conveyor-01',
      name: '皮带运输机-1',
      type: 'conveyor',
      status: 'running',
      parameters: [
        { name: '输送量', value: 100, unit: 't/h', status: 'normal' },
        { name: '电机电流', value: 35, unit: 'A', status: 'normal' },
        { name: '皮带速度', value: 1.2, unit: 'm/s', status: 'normal' },
      ],
    },

    // 3. 磨矿分级区域
    {
      id: 'mill-sag',
      name: '半自磨机(SAG)',
      type: 'equipment',
      status: 'running',
      parameters: [
        { name: '给矿量', value: 100, unit: 't/h', status: 'normal' },
        { name: '电机电流', value: 680, unit: 'A', status: 'normal' },
        { name: '磨机转速', value: 12.5, unit: 'rpm', status: 'normal' },
        { name: '给水量', value: 165, unit: 'm³/h', status: 'normal' },
        { name: '球负率', value: 32, unit: '%', status: 'normal' },
      ],
    },
    {
      id: 'mill-ball',
      name: '球磨机',
      type: 'equipment',
      status: 'running',
      parameters: [
        { name: '给矿量', value: 125, unit: 't/h', status: 'normal' },
        { name: '电机电流', value: 480, unit: 'A', status: 'normal' },
        { name: '磨机转速', value: 18, unit: 'rpm', status: 'normal' },
        { name: '水电比', value: 1.8, unit: '', status: 'normal' },
      ],
    },
    {
      id: 'hydrocyclone-01',
      name: '旋流器组',
      type: 'equipment',
      status: 'running',
      parameters: [
        { name: '给矿压力', value: 0.08, unit: 'MPa', status: 'normal' },
        { name: '溢流浓度', value: 33.13, unit: '%', status: 'normal' },
        { name: 'P80粒度', value: 74, unit: 'μm', status: 'normal' },
      ],
    },

    // 4. 浮选区域
    {
      id: 'flotation-rougher',
      name: '粗选浮选机',
      type: 'equipment',
      status: 'running',
      parameters: [
        { name: '给矿量', value: 125, unit: 't/h', status: 'normal' },
        { name: '矿浆浓度', value: 33, unit: '%', status: 'normal' },
        { name: '液位', value: 2.8, unit: 'm', status: 'normal' },
        { name: 'pH值', value: 8.2, unit: '', status: 'normal' },
        { name: '给气量', value: 85, unit: 'm³/h', status: 'normal' },
      ],
    },
    {
      id: 'flotation-scavenger-1',
      name: '扫选I浮选机',
      type: 'equipment',
      status: 'running',
      parameters: [
        { name: '给矿量', value: 90, unit: 't/h', status: 'normal' },
        { name: '矿浆浓度', value: 30, unit: '%', status: 'normal' },
        { name: '液位', value: 2.5, unit: 'm', status: 'normal' },
      ],
    },
    {
      id: 'flotation-scavenger-2',
      name: '扫选II浮选机',
      type: 'equipment',
      status: 'running',
      parameters: [
        { name: '给矿量', value: 68, unit: 't/h', status: 'normal' },
        { name: '矿浆浓度', value: 28, unit: '%', status: 'normal' },
      ],
    },
    {
      id: 'flotation-cleaner-1',
      name: '精选I浮选机',
      type: 'equipment',
      status: 'running',
      parameters: [
        { name: '给矿量', value: 12, unit: 't/h', status: 'normal' },
        { name: '矿浆浓度', value: 25, unit: '%', status: 'normal' },
        { name: 'Cu品位', value: 18.5, unit: '%', status: 'normal' },
      ],
    },
    {
      id: 'flotation-cleaner-2',
      name: '精选II浮选机',
      type: 'equipment',
      status: 'running',
      parameters: [
        { name: '给矿量', value: 9.5, unit: 't/h', status: 'normal' },
        { name: 'Cu品位', value: 24.5, unit: '%', status: 'normal' },
      ],
    },

    // 5. 精矿浓缩与压滤
    {
      id: 'thickener-concentrate',
      name: '精矿浓密机',
      type: 'equipment',
      status: 'running',
      parameters: [
        { name: '给矿量', value: 7.5, unit: 't/h', status: 'normal' },
        { name: '给矿浓度', value: 26, unit: '%', status: 'normal' },
        { name: '底流浓度', value: 68, unit: '%', status: 'normal' },
        { name: '溢流浓度', value: 0.5, unit: '%', status: 'normal' },
        { name: '泥位', value: 3.5, unit: 'm', status: 'normal' },
      ],
    },
    {
      id: 'filter-press',
      name: '精矿压滤机',
      type: 'equipment',
      status: 'running',
      parameters: [
        { name: '处理量', value: 7.5, unit: 't/h', status: 'normal' },
        { name: '滤饼水分', value: 12, unit: '%', status: 'normal' },
        { name: 'Cu品位', value: 24.5, unit: '%', status: 'normal' },
        { name: '压力', value: 1.2, unit: 'MPa', status: 'normal' },
      ],
    },

    // 6. 尾矿处理
    {
      id: 'thickener-tailings',
      name: '尾矿浓密机',
      type: 'equipment',
      status: 'running',
      parameters: [
        { name: '给矿量', value: 92.5, unit: 't/h', status: 'normal' },
        { name: '给矿浓度', value: 18, unit: '%', status: 'normal' },
        { name: '底流浓度', value: 65, unit: '%', status: 'normal' },
        { name: '溢流浓度', value: 0.3, unit: '%', status: 'normal' },
      ],
    },
    {
      id: 'pump-tailings',
      name: '尾矿泵站',
      type: 'pump',
      status: 'running',
      parameters: [
        { name: '输送量', value: 325, unit: 'm³/h', status: 'normal' },
        { name: '压力', value: 0.85, unit: 'MPa', status: 'normal' },
        { name: '电机电流', value: 185, unit: 'A', status: 'normal' },
      ],
    },

    // 7. 补水系统
    {
      id: 'water-fresh',
      name: '新水供给',
      type: 'pump',
      status: 'running',
      parameters: [
        { name: '流量', value: 81, unit: 'm³/h', status: 'normal' },
        { name: '累计用量', value: 2450, unit: 'm³', status: 'normal' },
      ],
    },
    {
      id: 'water-recycle',
      name: '回水系统',
      type: 'pump',
      status: 'running',
      parameters: [
        { name: '回水量', value: 195, unit: 'm³/h', status: 'normal' },
        { name: '回水率', value: 70.7, unit: '%', status: 'normal' },
      ],
    },
  ] as ProcessNode[],

  // 物料流向（用于绘制流程图连接线和流量显示）
  materialFlows: [
    { from: 'storage-intermediate', to: 'conveyor-01', flowRate: 100, isActive: true },
    { from: 'conveyor-01', to: 'mill-sag', flowRate: 100, isActive: true },
    { from: 'mill-sag', to: 'hydrocyclone-01', flowRate: 125, concentration: 65, isActive: true },
    { from: 'hydrocyclone-01', to: 'mill-ball', flowRate: 50, concentration: 70, isActive: true },
    { from: 'hydrocyclone-01', to: 'flotation-rougher', flowRate: 75, concentration: 33.13, isActive: true },
    { from: 'mill-ball', to: 'hydrocyclone-01', flowRate: 125, concentration: 65, isActive: true },
    
    { from: 'flotation-rougher', to: 'flotation-cleaner-1', flowRate: 35, concentration: 28, isActive: true },
    { from: 'flotation-rougher', to: 'flotation-scavenger-1', flowRate: 90, concentration: 30, isActive: true },
    { from: 'flotation-scavenger-1', to: 'flotation-scavenger-2', flowRate: 68, concentration: 28, isActive: true },
    { from: 'flotation-scavenger-2', to: 'thickener-tailings', flowRate: 50, concentration: 20, isActive: true },
    
    { from: 'flotation-cleaner-1', to: 'flotation-cleaner-2', flowRate: 12, concentration: 25, grade: 18.5, isActive: true },
    { from: 'flotation-cleaner-2', to: 'thickener-concentrate', flowRate: 7.5, concentration: 26, grade: 24.5, isActive: true },
    { from: 'thickener-concentrate', to: 'filter-press', flowRate: 7.5, concentration: 68, isActive: true },
    
    { from: 'flotation-scavenger-1', to: 'flotation-rougher', flowRate: 22, concentration: 32, isActive: true },
    { from: 'flotation-scavenger-2', to: 'flotation-scavenger-1', flowRate: 18, concentration: 30, isActive: true },
    { from: 'flotation-cleaner-1', to: 'flotation-rougher', flowRate: 23, concentration: 28, isActive: true },
    { from: 'flotation-cleaner-2', to: 'flotation-cleaner-1', flowRate: 4.5, concentration: 26, isActive: true },
    
    { from: 'thickener-tailings', to: 'pump-tailings', flowRate: 92.5, concentration: 65, isActive: true },
    { from: 'thickener-tailings', to: 'water-recycle', flowRate: 195, concentration: 0.3, isActive: true },
  ] as MaterialFlow[],

  // 实时生产指标
  productionMetrics: {
    updateTime: getCurrentTime(),
    metrics: [
      { name: '原矿处理量', value: 100, unit: 't/h', target: 100, status: 'normal' },
      { name: '精矿产量', value: 7.54, unit: 't/h', target: 7.54, status: 'normal' },
      { name: '精矿品位(Cu)', value: 24.5, unit: '%', target: 24.2, status: 'normal' },
      { name: '回收率(Cu)', value: 87.0, unit: '%', target: 87.0, status: 'normal' },
      { name: '磨矿细度(-200目)', value: 65.62, unit: '%', target: 65, status: 'normal' },
      { name: '单位新水耗', value: 0.81, unit: 'm³/t', target: 0.81, status: 'normal' },
      { name: '单位总水耗', value: 2.76, unit: 'm³/t', target: 2.76, status: 'normal' },
    ],
  },

  // 工艺流程阶段（用于顶部导航标签）
  processStages: [
    { id: 'crushing', name: '粗破碎', icon: '🔨', status: 'running' },
    { id: 'storage', name: '中间矿堆', icon: '📦', status: 'running' },
    { id: 'conveying', name: '皮带运输', icon: '➡️', status: 'running' },
    { id: 'grinding', name: '磨矿分级', icon: '⚙️', status: 'running' },
    { id: 'flotation', name: '浮选', icon: '🫧', status: 'running' },
    { id: 'concentrate', name: '精矿浓缩压滤', icon: '💧', status: 'running' },
    { id: 'tailings-transport', name: '尾矿输送', icon: '🚰', status: 'running' },
    { id: 'tailings-filling', name: '尾矿充填', icon: '🏗️', status: 'running' },
  ],
};
