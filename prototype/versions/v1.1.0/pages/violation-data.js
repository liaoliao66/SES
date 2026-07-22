/** v1.1.0 违章登记演示数据与来源-类型级联（PC / 企微共用） */
(function (global) {
  var AI_TYPES = ['车辆超速', '夜间未穿反光衣', '未带安全帽', '吸烟'];
  var MANUAL_TYPES = ['人员作业违章', '设备作业违章', '环境作业违章', '制度执行违章'];

  var PHOTO_A = 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=200&h=140&q=60';
  var PHOTO_B = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=200&h=140&q=60';
  var PHOTO_C = 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=200&h=140&q=60';

  global.VIOLATION_TYPES = { AI: AI_TYPES, MANUAL: MANUAL_TYPES };

  global.typesBySource = function (source) {
    if (source === 'AI识别') return AI_TYPES.slice();
    if (source === '人工登记') return MANUAL_TYPES.slice();
    return AI_TYPES.concat(MANUAL_TYPES);
  };

  /** 夜间未穿反光衣：仅 19:00（含）～次日 07:00（不含）有效 */
  global.isReflectiveNightWindow = function (datetimeStr) {
    if (!datetimeStr) return false;
    var m = String(datetimeStr).match(/(\d{1,2}):(\d{2})/);
    if (!m) return false;
    var h = Number(m[1]);
    var mi = Number(m[2]);
    var minutes = h * 60 + mi;
    return minutes >= 19 * 60 || minutes < 7 * 60;
  };

  global.VIOLATION_DATA = [
    {
      id: 1, no: '202607160488', type: '未带安全帽', source: 'AI识别',
      person: '', handler: '', place: '武穴项目-引桥21', time: '2026-07-16 10:53',
      registrar: '', dept: '', photo: PHOTO_A, status: '已登记'
    },
    {
      id: 2, no: '202607160487', type: '车辆超速', source: 'AI识别',
      person: '张某', handler: '李敏', place: '武穴项目-引桥21', time: '2026-07-16 09:21',
      registrar: '系统', dept: '安监部', photo: PHOTO_B, status: '已登记'
    },
    {
      id: 3, no: '202607152201', type: '夜间未穿反光衣', source: 'AI识别',
      person: '', handler: '', place: '武穴项目-码头区', time: '2026-07-15 21:18',
      registrar: '系统', dept: '安监部', photo: PHOTO_C, status: '已登记'
    },
    {
      id: 4, no: '202607151105', type: '吸烟', source: 'AI识别',
      person: '王某', handler: '赵强', place: '武穴项目-堆场', time: '2026-07-15 14:05',
      registrar: '系统', dept: '安监部', photo: PHOTO_A, status: '已登记'
    },
    {
      id: 5, no: '202607140812', type: '人员作业违章', source: '人工登记',
      person: '刘某', handler: '周伟', place: '生产一车间', time: '2026-07-14 08:12',
      registrar: '陈建国', dept: '生产操作部', photo: PHOTO_B, status: '已登记'
    },
    {
      id: 6, no: '202607131630', type: '设备作业违章', source: '人工登记',
      person: '孙某', handler: '吴芳', place: '设备检修区', time: '2026-07-13 16:30',
      registrar: '罗建平', dept: '设备技术部', photo: '', status: '已登记'
    },
    {
      id: 7, no: '202607121920', type: '环境作业违章', source: '人工登记',
      person: '钱某', handler: '郑卫东', place: '仓储通道', time: '2026-07-12 19:20',
      registrar: '冯雪梅', dept: '建管部', photo: PHOTO_C, status: '已登记'
    },
    {
      id: 8, no: '202607111100', type: '制度执行违章', source: '人工登记',
      person: '周某', handler: '高敏', place: '办公楼入口', time: '2026-07-11 11:00',
      registrar: '崔静', dept: '综合部', photo: PHOTO_A, status: '已登记'
    }
  ];
})(window);
