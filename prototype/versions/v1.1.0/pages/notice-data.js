/** v1.1.0 消息公告演示数据（门户全员可见；企微推送范围可不同） */
window.NOTICE_DATA = [
  {
    id: 1,
    level: '紧急',
    pinned: true,
    title: '关于开展汛期防汛专项检查的紧急通知',
    unit: '安全管理部',
    publishAt: '2026-07-15 09:00',
    effectiveAt: '2026-07-15 09:00',
    expireAt: '2026-07-31 23:59',
    status: '已发布',
    pushWecom: true,
    pushMode: 'all',
    pushReceiverCount: 0,
    body: '各单位：当前进入主汛期，请立即组织防汛专项检查，重点排查低洼仓库、临水作业点与应急物资到位情况。检查结果于本周五前报送安全管理部。遇极端天气启动应急响应，严禁冒险作业。'
  },
  {
    id: 2,
    level: '重要',
    pinned: true,
    title: '高温时段野外作业安全防护提示',
    unit: '安全管理部',
    publishAt: '2026-07-14 14:20',
    effectiveAt: '2026-07-14 14:20',
    expireAt: '2026-08-31 23:59',
    status: '已发布',
    pushWecom: true,
    pushMode: 'partial',
    pushReceiverCount: 8,
    body: '连续高温天气下，野外及露天作业须落实错峰安排、防暑降温物资与间隔休息制度。出现中暑症状立即停止作业并就医。'
  },
  {
    id: 3,
    level: '重要',
    pinned: false,
    title: '本周五安全月例会改期至下周一上午',
    unit: '安环办',
    publishAt: '2026-07-13 16:05',
    effectiveAt: '2026-07-13 16:05',
    expireAt: '2026-07-22 23:59',
    status: '已发布',
    pushWecom: true,
    pushMode: 'all',
    pushReceiverCount: 0,
    body: '原定7月18日（周五）安全月例会改期至7月21日（周一）上午9:30，会议室不变。请各部门按时参会。'
  },
  {
    id: 4,
    level: '一般',
    pinned: false,
    title: '安环门户隐患公示功能使用说明更新',
    unit: '安环信息化组',
    publishAt: '2026-07-10 10:00',
    effectiveAt: '2026-07-10 10:00',
    expireAt: '2026-12-31 23:59',
    status: '已发布',
    pushWecom: false,
    pushMode: 'none',
    pushReceiverCount: 0,
    body: '隐患公示「查看/处理」入口已统一对齐整改通知能力，详见操作手册。本公告全员可见，仅门户展示，不推送企微。'
  },
  {
    id: 5,
    level: '一般',
    pinned: false,
    title: '（草稿）三季度安全培训计划征求意见',
    unit: '安全管理部',
    publishAt: '',
    effectiveAt: '2026-07-20 00:00',
    expireAt: '2026-09-30 23:59',
    status: '草稿',
    pushWecom: false,
    pushMode: 'none',
    pushReceiverCount: 0,
    body: '培训大纲草案，待会签后发布。'
  }
];

window.noticeLevelClass = function (level) {
  if (level === '紧急') return 'lv-urgent';
  if (level === '重要') return 'lv-imp';
  return 'lv-normal';
};
