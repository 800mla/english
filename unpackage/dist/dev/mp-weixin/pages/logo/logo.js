"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "logo",
  setup(__props) {
    const quoteEn = common_vendor.ref("Every word you learn is a step closer to your dreams.");
    const quoteCn = common_vendor.ref("你学会的每一个单词，都是通往梦想的一步。");
    const speak = () => {
      common_vendor.index.speak({
        text: quoteEn.value,
        lang: "en-US",
        success: () => {
          common_vendor.index.__f__("log", "at pages/logo/logo.vue:28", "朗读成功");
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/logo/logo.vue:31", "朗读失败", err);
        }
      });
    };
    let gotoIndex = () => {
      common_vendor.index.navigateTo({
        url: "/pages/index/index"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(quoteEn.value),
        b: common_vendor.o(speak),
        c: common_vendor.t(quoteCn.value),
        d: common_vendor.o((...args) => common_vendor.unref(gotoIndex) && common_vendor.unref(gotoIndex)(...args))
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bf9c4896"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/logo/logo.js.map
