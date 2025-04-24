"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      userName: "Alex",
      progressPercent: 0,
      learnedWords: 12,
      totalWords: 30,
      circumference: 2 * Math.PI * 54,
      // 圆周长
      weeklyData: [
        { label: "一", height: 30 },
        { label: "二", height: 70 },
        { label: "三", height: 90 },
        { label: "四", height: 60 },
        { label: "五", height: 80 },
        { label: "六", height: 20 },
        { label: "日", height: 40 }
      ]
    };
  },
  computed: {
    progressOffset() {
      return this.circumference - this.progressPercent / 100 * this.circumference;
    }
  },
  onLoad() {
    this.progressPercent = 0;
    setTimeout(() => {
      this.progressPercent = Math.round(this.learnedWords / this.totalWords * 100);
    }, 500);
    this.weeklyData.forEach((item, index) => {
      setTimeout(() => {
        const temp = this.weeklyData.slice();
        temp[index].height = 0;
        this.weeklyData = temp;
        setTimeout(() => {
          const newTemp = this.weeklyData.slice();
          newTemp[index].height = item.height;
          this.weeklyData = newTemp;
        }, 50);
      }, index * 100);
    });
  },
  methods: {
    goToLearning() {
      common_vendor.index.switchTab({
        url: "/pages/learning/index"
      });
    }
  }
};
if (!Array) {
  const _component_circle = common_vendor.resolveComponent("circle");
  const _component_svg = common_vendor.resolveComponent("svg");
  (_component_circle + _component_svg)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.userName),
    b: common_vendor.o((...args) => $options.goToLearning && $options.goToLearning(...args)),
    c: common_vendor.p({
      cx: "60",
      cy: "60",
      r: "54"
    }),
    d: common_vendor.p({
      cx: "60",
      cy: "60",
      r: "54",
      ["stroke-dasharray"]: $data.circumference,
      ["stroke-dashoffset"]: $options.progressOffset
    }),
    e: common_vendor.t($data.progressPercent),
    f: common_vendor.p({
      width: "120",
      height: "120",
      viewBox: "0 0 120 120"
    }),
    g: common_vendor.t($data.learnedWords),
    h: common_vendor.t($data.totalWords),
    i: common_vendor.f($data.weeklyData, (dayData, index, i0) => {
      return {
        a: dayData.height + "%",
        b: common_vendor.t(dayData.label),
        c: index
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
