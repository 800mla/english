"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      wordCount: 0,
      isDarkMode: false,
      fontSizes: ["小", "中", "大"],
      fontSizeIndex: 1,
      progressPercent: 65
    };
  },
  onLoad() {
    this.animateWordCount();
  },
  methods: {
    animateWordCount() {
      const endValue = 2358;
      const duration = 2e3;
      const start = Date.now();
      const animate = () => {
        const now = Date.now();
        const progress = Math.min((now - start) / duration, 1);
        this.wordCount = Math.floor(progress * endValue).toLocaleString();
        if (progress < 1) {
          setTimeout(animate, 16);
        }
      };
      animate();
    },
    handleSettingClick(type) {
      let title = "";
      switch (type) {
        case "reminder":
          title = "学习提醒";
          break;
        case "privacy":
          title = "隐私管理";
          break;
        case "language":
          title = "语言切换";
          break;
      }
      common_vendor.index.showToast({
        title: `进入${title}设置`,
        icon: "none"
      });
    },
    toggleDarkMode(e) {
      this.isDarkMode = e.detail.value;
    },
    changeFontSize(e) {
      this.fontSizeIndex = e.detail.value;
    },
    logout() {
      common_vendor.index.showModal({
        title: "提示",
        content: "确认退出登录？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.showToast({
              title: "已退出登录",
              icon: "success",
              duration: 2e3
            });
          }
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.wordCount),
    b: common_vendor.o(($event) => $options.handleSettingClick("reminder")),
    c: common_vendor.o(($event) => $options.handleSettingClick("privacy")),
    d: common_vendor.o(($event) => $options.handleSettingClick("language")),
    e: $data.isDarkMode,
    f: common_vendor.o((...args) => $options.toggleDarkMode && $options.toggleDarkMode(...args)),
    g: common_vendor.t($data.fontSizes[$data.fontSizeIndex]),
    h: $data.fontSizeIndex,
    i: $data.fontSizes,
    j: common_vendor.o((...args) => $options.changeFontSize && $options.changeFontSize(...args)),
    k: common_vendor.o((...args) => $options.logout && $options.logout(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/profile/profile.js.map
