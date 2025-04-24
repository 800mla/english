"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      currentWordIndex: 12,
      totalWords: 30,
      words: [
        {
          word: "vocabulary",
          pronunciation: "[vəˈkæbjələri]",
          definition: "n. 词汇，词汇量",
          example: "He has an extensive vocabulary."
        },
        {
          word: "accomplish",
          pronunciation: "[əˈkɑːmplɪʃ]",
          definition: "v. 完成，实现",
          example: "She accomplished her goal of running a marathon."
        },
        {
          word: "diverse",
          pronunciation: "[daɪˈvɜːrs]",
          definition: "adj. 多种多样的，不同的",
          example: "We live in a culturally diverse society."
        },
        {
          word: "exaggerate",
          pronunciation: "[ɪɡˈzædʒəreɪt]",
          definition: "v. 夸大，夸张",
          example: "Don't exaggerate the importance of this mistake."
        }
      ],
      currentWordIdx: 0,
      isFavorite: false,
      mode: "book",
      // 'book', 'pencil', 'headphones'
      showCelebration: false
    };
  },
  computed: {
    currentWord() {
      return this.words[this.currentWordIdx];
    },
    progressWidth() {
      return this.currentWordIndex / this.totalWords * 100;
    }
  },
  methods: {
    playSound() {
      common_vendor.index.showToast({
        title: "播放发音",
        icon: "none"
      });
    },
    toggleFavorite() {
      this.isFavorite = !this.isFavorite;
      if (this.isFavorite) {
        common_vendor.index.showToast({
          title: "已添加到生词本",
          icon: "none"
        });
      }
    },
    setMode(mode) {
      this.mode = mode;
      common_vendor.index.showToast({
        title: mode === "book" ? "记忆模式" : mode === "pencil" ? "拼写模式" : "听力模式",
        icon: "none"
      });
    },
    nextWord() {
      this.currentWordIndex++;
      this.currentWordIdx = (this.currentWordIdx + 1) % this.words.length;
      if (this.currentWordIndex === this.totalWords) {
        setTimeout(() => {
          this.showCelebration = true;
          setTimeout(() => {
            this.showCelebration = false;
            common_vendor.index.navigateBack();
          }, 3e3);
        }, 500);
      }
    }
  },
  onLoad() {
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($data.currentWordIndex),
    b: common_vendor.t($data.totalWords),
    c: $options.progressWidth + "%",
    d: common_vendor.t($options.currentWord.word),
    e: common_vendor.t($options.currentWord.pronunciation),
    f: common_vendor.o((...args) => $options.playSound && $options.playSound(...args)),
    g: common_vendor.t($options.currentWord.definition),
    h: common_vendor.t($options.currentWord.example),
    i: common_vendor.t($data.isFavorite ? "❤️" : "🤍"),
    j: $data.isFavorite ? 1 : "",
    k: common_vendor.o((...args) => $options.toggleFavorite && $options.toggleFavorite(...args)),
    l: $data.mode === "book" ? 1 : "",
    m: common_vendor.o(($event) => $options.setMode("book")),
    n: $data.mode === "pencil" ? 1 : "",
    o: common_vendor.o(($event) => $options.setMode("pencil")),
    p: $data.mode === "headphones" ? 1 : "",
    q: common_vendor.o(($event) => $options.setMode("headphones")),
    r: common_vendor.o((...args) => $options.nextWord && $options.nextWord(...args)),
    s: $data.showCelebration
  }, $data.showCelebration ? {} : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/learning/learning.js.map
