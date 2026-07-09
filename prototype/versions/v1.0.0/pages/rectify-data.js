/** 整改通知示例数据 */
const RECTIFY_RECORDS = {
  '1': {
    title: '专项检查（仓储区）',
    status: 'pending',
    statusLabel: '待整改',
    badge: 'bg-amber-50 text-amber-700 border-amber-200',
    hazards: [
      {
        id: 'h1',
        title: '隐患 1：配电箱门未闭合',
        hazardType: '安全隐患',
        isMajor: false,
        description: '仓储区 A 栋配电箱门长期未闭合，存在触电及异物进入风险。',
        requirement: '立即整改并张贴警示标识，确保配电箱门正常关闭并上锁。',
        problemPhotos: [
          'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=200&h=200&q=80',
          'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=200&h=200&q=80'
        ],
        attachments: ['现场检查记录.pdf'],
        done: false
      },
      {
        id: 'h2',
        title: '隐患 2：通道堆放杂物',
        hazardType: '安全隐患',
        isMajor: false,
        description: '主通道两侧堆放纸箱及工具，影响人员疏散通行。',
        requirement: '清理通道，确保疏散畅通，不得占用消防通道。',
        problemPhotos: [
          'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=200&h=200&q=80',
          'https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&w=200&h=200&q=80'
        ],
        attachments: [],
        done: false
      }
    ]
  },
  '2': {
    title: '日常巡检（码头区）',
    status: 'review',
    statusLabel: '待复核',
    badge: 'bg-blue-50 text-blue-700 border-blue-200',
    hazards: [
      {
        id: 'h3',
        title: '隐患 1：消防器材过期',
        hazardType: '安全隐患',
        isMajor: true,
        description: '码头区 3 号仓库灭火器已超过检验有效期。',
        requirement: '更换过期器材并更新消防台账。',
        problemPhotos: [
          'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=200&h=200&q=80'
        ],
        attachments: ['器材清单.xlsx'],
        done: true,
        rectifyNote: '已更换 2 具灭火器，台账已更新。'
      }
    ]
  },
  '3': {
    title: '综合检查（生产一车间）',
    status: 'done',
    statusLabel: '已复核',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    hazards: [
      {
        id: 'h4', title: '隐患 1：安全标识缺失', hazardType: '安全隐患', isMajor: false,
        description: '车间入口及作业区域缺少安全警示标识。', requirement: '补齐标识牌',
        problemPhotos: ['https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=200&h=200&q=80'],
        attachments: [], done: true, rectifyNote: '已补齐 3 处标识。'
      },
      {
        id: 'h5', title: '隐患 2：防护栏损坏', hazardType: '安全隐患', isMajor: false,
        description: '二层平台防护栏局部变形损坏。', requirement: '修复防护栏',
        problemPhotos: ['https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=200&h=200&q=80'],
        attachments: [], done: true, rectifyNote: '已完成焊接修复。'
      },
      {
        id: 'h6', title: '隐患 3：地面油污', hazardType: '安全隐患', isMajor: false,
        description: '设备下方地面存在油污，存在滑倒风险。', requirement: '清理并防滑处理',
        problemPhotos: ['https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=200&h=200&q=80'],
        attachments: [], done: true, rectifyNote: '已清理并铺设防滑垫。'
      }
    ]
  }
};
