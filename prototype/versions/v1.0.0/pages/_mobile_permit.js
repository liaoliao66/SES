/** 危险作业 App 端 — 动态表单与多选人员 */
const PERSON_OPTIONS = [
  { value: 'wangqiang', label: '王强' },
  { value: 'qianshifu', label: '钱师傅' },
  { value: 'zhaogong', label: '赵工' },
  { value: 'liming', label: '李明' },
  { value: 'sunwei', label: '孙伟' },
  { value: 'zhoujie', label: '周杰' }
];

const MOBILE_PICKER_STATE = { field: null, selected: new Set() };

function mobileField(label, required, inner, full) {
  return `<label class="block${full ? ' col-span-2' : ''}">
    <div class="text-xs text-slate-500 mb-1">${required ? '<span class="text-rose-500">*</span>' : ''}${label}</div>
    ${inner}
  </label>`;
}

function mobileMultiSelectField(id, label, required, placeholder, defaultValues = []) {
  const selected = defaultValues.map(v => PERSON_OPTIONS.find(p => p.value === v)).filter(Boolean);
  const tags = selected.map(p =>
    `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 text-xs" data-value="${p.value}">${p.label}</span>`
  ).join('');
  const text = selected.length ? tags : `<span class="text-slate-400">${placeholder}</span>`;
  return mobileField(label, required, `
    <button type="button" class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-left flex flex-wrap gap-1.5 items-center justify-between min-h-[42px]"
            data-multiselect="${id}" onclick="openMobileMultiSelect('${id}', '${label}')">
      <span class="flex flex-wrap gap-1.5 flex-1">${text}</span>
      <i class="fa-solid fa-chevron-down text-slate-400 text-xs shrink-0"></i>
    </button>`, false);
}

function openMobileMultiSelect(id, title) {
  const btn = document.querySelector(`[data-multiselect="${id}"]`);
  const current = btn ? Array.from(btn.querySelectorAll('[data-value]')).map(el => el.dataset.value) : [];
  MOBILE_PICKER_STATE.field = id;
  MOBILE_PICKER_STATE.selected = new Set(current);

  const sheet = qs('#mobilePickerSheet');
  qs('#mobilePickerTitle').textContent = `选择${title}`;
  const list = qs('#mobilePickerList');
  list.innerHTML = PERSON_OPTIONS.map(p => {
    const checked = MOBILE_PICKER_STATE.selected.has(p.value) ? ' checked' : '';
    return `<label class="flex items-center gap-3 px-5 py-3.5 border-b border-slate-100 active:bg-slate-50">
      <input type="checkbox" class="w-4 h-4 rounded border-slate-300" value="${p.value}" data-label="${p.label}"${checked}
             onchange="toggleMobilePicker('${p.value}', this.checked)">
      <span class="text-sm text-slate-800">${p.label}</span>
    </label>`;
  }).join('');

  sheet.classList.remove('translate-y-full');
  sheet.classList.add('translate-y-0');
  qs('#mobilePickerMask').classList.remove('hidden');
}

function toggleMobilePicker(value, checked) {
  if (checked) MOBILE_PICKER_STATE.selected.add(value);
  else MOBILE_PICKER_STATE.selected.delete(value);
}

function closeMobilePicker() {
  qs('#mobilePickerSheet').classList.add('translate-y-full');
  qs('#mobilePickerSheet').classList.remove('translate-y-0');
  qs('#mobilePickerMask').classList.add('hidden');
}

function confirmMobilePicker() {
  const id = MOBILE_PICKER_STATE.field;
  const btn = document.querySelector(`[data-multiselect="${id}"]`);
  if (!btn) return closeMobilePicker();

  const selected = PERSON_OPTIONS.filter(p => MOBILE_PICKER_STATE.selected.has(p.value));
  if (!selected.length) {
    btn.innerHTML = `<span class="flex flex-wrap gap-1.5 flex-1"><span class="text-slate-400">请选择（可多选）</span></span><i class="fa-solid fa-chevron-down text-slate-400 text-xs shrink-0"></i>`;
  } else {
    const tags = selected.map(p =>
      `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 text-xs" data-value="${p.value}">${p.label}</span>`
    ).join('');
    btn.innerHTML = `<span class="flex flex-wrap gap-1.5 flex-1">${tags}</span><i class="fa-solid fa-chevron-down text-slate-400 text-xs shrink-0"></i>`;
  }
  closeMobilePicker();
}

function mobilePickerHtml() {
  return `
    <div id="mobilePickerMask" class="hidden fixed inset-0 z-[200] bg-black/40" onclick="closeMobilePicker()"></div>
    <div id="mobilePickerSheet" class="fixed left-0 right-0 bottom-0 z-[201] translate-y-full transition-transform duration-300 bg-white rounded-t-3xl shadow-[0_-8px_32px_rgba(0,0,0,0.12)] max-h-[70vh] flex flex-col">
      <div class="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
        <button type="button" class="text-sm text-slate-500" onclick="closeMobilePicker()">取消</button>
        <div id="mobilePickerTitle" class="text-sm font-semibold text-slate-900">选择人员</div>
        <button type="button" class="text-sm font-semibold text-blue-600" onclick="confirmMobilePicker()">确定</button>
      </div>
      <div id="mobilePickerList" class="overflow-y-auto flex-1"></div>
    </div>`;
}

function renderMobilePermitForm(typeSelect, dynamicForm, typeHint, applyName) {
  const type = typeSelect.value;
  const cfg = PERMIT_TYPES[type];
  typeHint.textContent = `当前填写：${cfg.licenseTitle}，切换作业类型将展示不同字段。`;
  if (!applyName.value || applyName.dataset.auto === '1') {
    applyName.value = `${cfg.name}申请`;
    applyName.dataset.auto = '1';
  }

  let html = '';

  html += `<div class="rounded-3xl bg-white border border-slate-200 shadow-[0_4px_12px_rgba(0,0,0,0.05)] p-4 space-y-3">
    <div class="text-sm font-semibold text-slate-800">基本信息</div>
    <div class="grid grid-cols-2 gap-3">`;
  html += mobileField('申请人员', false, `<input class="w-full rounded-2xl border border-slate-200 bg-slate-100 px-3 py-2 text-sm" value="张敏" readonly>`);
  html += mobileField('所属部门', false, `<input class="w-full rounded-2xl border border-slate-200 bg-slate-100 px-3 py-2 text-sm" value="安全环保部" readonly>`);
  if (cfg.contentLabel) {
    html += mobileField(cfg.contentLabel, true, `<input class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm" placeholder="请输入">`);
  }
  if (cfg.locationLabel) {
    html += mobileField(cfg.locationLabel, true, `<input class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm" placeholder="请输入">`);
  }
  html += mobileMultiSelectField('leader', '作业负责人', true, '请选择（可多选）', ['wangqiang']);
  html += mobileMultiSelectField('guardian', '作业监护人', true, '请选择（可多选）', ['qianshifu', 'liming']);
  html += mobileField('施工单位', true, `<input class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm" placeholder="请输入">`, true);
  html += `</div></div>`;

  if (cfg.extraFields || cfg.levelLabel || cfg.workersLabel) {
    html += `<div class="rounded-3xl bg-white border border-slate-200 shadow-[0_4px_12px_rgba(0,0,0,0.05)] p-4 space-y-3">
      <div class="text-sm font-semibold text-slate-800">${cfg.name}特有信息</div><div class="grid grid-cols-2 gap-3">`;
    if (cfg.extraFields) {
      cfg.extraFields.forEach(f => {
        const inp = f.textarea
          ? `<textarea class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm" rows="3" placeholder="请输入"></textarea>`
          : `<input class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm" placeholder="请输入">`;
        html += mobileField(f.label, f.required, inp, f.full);
      });
    }
    if (cfg.levelLabel) {
      const radios = cfg.levels.map((lv, i) =>
        `<label class="flex items-center gap-2 py-1.5 text-sm"><input type="radio" name="level" value="${lv.value}"${i === 0 ? ' checked' : ''}> ${lv.label}</label>`
      ).join('');
      html += mobileField(cfg.levelLabel, true, `<div class="space-y-1">${radios}</div>`, true);
    }
    if (cfg.workersLabel) {
      html += mobileField(cfg.workersLabel, true,
        `<textarea class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm" rows="3" placeholder="填写人员姓名及证书编号"></textarea>`, true);
    }
    html += `</div></div>`;
  }

  html += `<div class="rounded-3xl bg-white border border-slate-200 shadow-[0_4px_12px_rgba(0,0,0,0.05)] p-4 space-y-3">
    <div class="text-sm font-semibold text-slate-800">${cfg.planTimeLabel}</div>
    <div class="grid grid-cols-2 gap-3">
      ${mobileField('开始', true, `<input type="datetime-local" class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm" value="2026-07-08T09:00">`)}
      ${mobileField('结束', true, `<input type="datetime-local" class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm" value="2026-07-08T17:00">`)}
    </div></div>`;

  html += `<div class="rounded-3xl bg-white border border-slate-200 shadow-[0_4px_12px_rgba(0,0,0,0.05)] p-4 space-y-3">
    <div class="text-sm font-semibold text-slate-800">风险辨识结果</div>
    <div class="flex flex-wrap gap-2">`;
  cfg.risks.forEach(r => {
    html += `<label class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"><input type="checkbox" checked> ${r}</label>`;
  });
  html += `<label class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"><input type="checkbox"> 其他</label>`;
  html += `</div></div>`;

  html += `<div class="rounded-3xl bg-white border border-slate-200 shadow-[0_4px_12px_rgba(0,0,0,0.05)] p-4 space-y-3">
    <div class="text-sm font-semibold text-slate-800">安全措施确认</div>
    <div class="space-y-3">`;
  cfg.measures.forEach((m, i) => {
    html += `<div class="rounded-2xl bg-slate-50 border border-slate-200 p-3">
      <div class="text-xs text-slate-500 mb-1">第 ${i + 1} 条</div>
      <div class="text-xs text-slate-700 leading-relaxed">${m}</div>
      <div class="mt-2 flex gap-3 text-xs">
        <label class="flex items-center gap-1"><input type="radio" name="m${i}" checked> 涉及</label>
        <label class="flex items-center gap-1"><input type="radio" name="m${i}b"> 不涉及</label>
      </div></div>`;
  });
  html += `</div></div>`;

  if (cfg.hasGasDetection) {
    html += `<div class="rounded-3xl bg-white border border-slate-200 shadow-[0_4px_12px_rgba(0,0,0,0.05)] p-4 space-y-3">
      <div class="text-sm font-semibold text-slate-800">有毒有害气体检测记录</div>
      <div class="text-xs text-slate-500">有限空间作业需填写检测记录（原型简化展示）</div>
      <button type="button" class="btn w-full py-2.5 rounded-2xl bg-white border border-slate-200 text-sm text-slate-700" onclick="toast('原型演示：展开气体检测表')">
        <i class="fa-solid fa-table mr-1"></i>填写检测记录表
      </button></div>`;
  }

  html += `<div class="rounded-3xl bg-white border border-slate-200 shadow-[0_4px_12px_rgba(0,0,0,0.05)] p-4">
    <div class="text-sm font-semibold text-slate-800 mb-3">附件</div>
    <button type="button" class="btn w-full py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-700" onclick="toast('原型演示：上传附件')">
      <i class="fa-solid fa-upload mr-1"></i>上传现场照片 / 简图
    </button></div>`;

  dynamicForm.innerHTML = html;
}

function statusBadge(status) {
  const map = {
    draft: 'bg-slate-100 text-slate-600 border-slate-200',
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
    pass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    reject: 'bg-rose-50 text-rose-700 border-rose-200'
  };
  const labels = { draft: '草稿', pending: '待审批', pass: '已通过', reject: '已驳回' };
  return `<span class="px-2.5 py-1 rounded-full text-[11px] font-semibold border ${map[status] || map.draft}">${labels[status] || status}</span>`;
}

const MOBILE_LIST_DATA = [
  { id: 'WP-001', type: 'hot_work', name: '动火作业申请（焊接检修）', date: '2026-07-08', area: '生产一车间', status: 'pending' },
  { id: 'WP-002', type: 'high_altitude', name: '高处作业申请（设备检修）', date: '2026-07-09', area: '仓储区', status: 'pass' },
  { id: 'WP-003', type: 'lifting', name: '吊装作业申请（设备移位）', date: '2026-07-10', area: '码头区', status: 'draft' },
  { id: 'WP-004', type: 'confined_space', name: '有限空间作业申请', date: '2026-07-11', area: '污水处理站', status: 'pending' },
  { id: 'WP-005', type: 'earthwork', name: '动土作业申请（管道敷设）', date: '2026-07-12', area: '厂区东侧', status: 'pass' },
  { id: 'WP-006', type: 'temp_electricity', name: '临时用电作业申请', date: '2026-07-13', area: '维修车间', status: 'pending' }
];
