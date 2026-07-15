/**
 * v1.1.0 PC 固定业务菜单 + 重要通知弹窗
 * 菜单结构固定：安环门户 / 使用监督 / 公告信息 → 重要通知
 * activeKey: 'portal' | 'supervise' | 'notice-admin'
 */
(function (global) {
  var MENU_HTML =
    '<div class="pc-sidebar-search"><input type="text" placeholder="请输入关键词搜索" aria-label="菜单搜索"></div>' +
    '<ul class="pc-menu">' +
    '  <li><a class="pc-menu-item" data-key="portal" href="pc_安环门户_home.html">' +
    '    <span class="pc-menu-icon"><i class="fa-solid fa-house"></i></span>安环门户</a></li>' +
    '  <li><a class="pc-menu-item" data-key="supervise" href="pc_使用监督统计_主页面.html">' +
    '    <span class="pc-menu-icon"><i class="fa-solid fa-chart-column"></i></span>使用监督</a></li>' +
    '  <li class="pc-menu-group open" id="pcNoticeGroup">' +
    '    <button type="button" class="pc-menu-item" data-key="notice-group" aria-expanded="true">' +
    '      <span class="pc-menu-icon"><i class="fa-solid fa-bullhorn"></i></span>公告信息' +
    '      <i class="fa-solid fa-chevron-right pc-menu-arrow"></i></button>' +
    '    <ul class="pc-submenu">' +
    '      <li><a data-key="notice-admin" href="pc_消息公告_管理_list.html">重要通知</a></li>' +
    '    </ul>' +
    '  </li>' +
    '</ul>';

  function mountSidebar(el, activeKey) {
    if (!el) return;
    el.innerHTML = MENU_HTML;
    el.querySelectorAll('[data-key]').forEach(function (node) {
      if (node.getAttribute('data-key') === activeKey) {
        node.classList.add('active');
      }
    });
    var group = el.querySelector('#pcNoticeGroup');
    var toggle = el.querySelector('[data-key="notice-group"]');
    if (toggle && group) {
      toggle.addEventListener('click', function () {
        group.classList.toggle('open');
        toggle.setAttribute('aria-expanded', group.classList.contains('open') ? 'true' : 'false');
      });
    }
    // 管理/只读相关页默认保持展开，避免预览时「菜单样子」切换
    if (activeKey === 'notice-admin' && group) {
      group.classList.add('open');
    }
  }

  function levelClass(level) {
    if (level === '紧急') return 'urgent';
    if (level === '重要') return 'imp';
    return 'normal';
  }

  function ensureModal() {
    var mask = document.getElementById('noticeModalMask');
    if (mask) return mask;
    mask = document.createElement('div');
    mask.id = 'noticeModalMask';
    mask.className = 'notice-modal-mask';
    mask.setAttribute('role', 'dialog');
    mask.setAttribute('aria-modal', 'true');
    mask.innerHTML =
      '<div class="notice-modal" onclick="event.stopPropagation()">' +
      '  <div class="notice-modal-hd">' +
      '    <h3 id="noticeModalTitle">重要通知</h3>' +
      '    <button type="button" class="notice-modal-close" id="noticeModalClose" aria-label="关闭">' +
      '      <i class="fa-solid fa-xmark"></i></button>' +
      '  </div>' +
      '  <div class="notice-modal-meta" id="noticeModalMeta"></div>' +
      '  <div class="notice-modal-bd" id="noticeModalBody"></div>' +
      '  <div class="notice-modal-ft">' +
      '    <button type="button" class="btn-modal primary" id="noticeModalOk">知道了</button>' +
      '  </div>' +
      '</div>';
    document.body.appendChild(mask);
    function close() {
      mask.classList.remove('show');
    }
    mask.addEventListener('click', close);
    document.getElementById('noticeModalClose').addEventListener('click', close);
    document.getElementById('noticeModalOk').addEventListener('click', close);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mask.classList.contains('show')) close();
    });
    return mask;
  }

  function openNoticeModal(notice) {
    if (!notice) return;
    var mask = ensureModal();
    document.getElementById('noticeModalTitle').textContent = notice.title || '重要通知';
    document.getElementById('noticeModalMeta').innerHTML =
      '<span class="notice-lv ' + levelClass(notice.level) + '">' + (notice.level || '一般') + '</span>' +
      '<span>发布单位：' + (notice.unit || '—') + '</span>' +
      '<span>发布时间：' + (notice.publishAt || notice.date || '—') + '</span>';
    document.getElementById('noticeModalBody').textContent = notice.body || '暂无正文。';
    mask.classList.add('show');
  }

  function findNoticeById(id) {
    var list = global.NOTICE_DATA || [];
    var n = Number(id);
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === n) return list[i];
    }
    return null;
  }

  function publishedNotices() {
    return (global.NOTICE_DATA || []).filter(function (n) {
      return n.status === '已发布';
    });
  }

  global.PcBizShell = {
    mountSidebar: mountSidebar,
    openNoticeModal: openNoticeModal,
    findNoticeById: findNoticeById,
    publishedNotices: publishedNotices,
    levelClass: levelClass
  };
})(window);
