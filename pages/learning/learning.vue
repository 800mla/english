<template>
    <view class="container">
      <!-- 顶部导航 -->
      <view class="top-nav">
        <view class="title">今日学习</view>
        <view class="counter">{{ currentWordIndex }}/{{ totalWords }}</view>
      </view>
      
      <!-- 进度条 -->
      <view class="progress-container">
        <view class="progress-bar" :style="{ width: progressWidth + '%' }"></view>
      </view>
      
      <!-- 单词卡片 -->
      <view class="word-card">
        <view class="word">{{ currentWord.word }}</view>
        <view class="pronunciation">
          {{ currentWord.pronunciation }}
          <text class="sound-icon" @click="playSound">🔊</text>
        </view>
        <view class="definition">{{ currentWord.definition }}</view>
        <view class="example">{{ currentWord.example }}</view>
        <view class="tip">
          长按单词查看词根
        </view>
      </view>
      
      <!-- 底部工具栏 -->
      <view class="toolbar">
        <view class="icon-button" :class="{ favorite: isFavorite }" @click="toggleFavorite">
          <text class="icon">{{ isFavorite ? '❤️' : '🤍' }}</text>
        </view>
        
        <view class="mode-switcher">
          <view class="icon-button" :class="{ active: mode === 'book' }" @click="setMode('book')">
            <text class="icon">📖</text>
          </view>
          <view class="icon-button" :class="{ active: mode === 'pencil' }" @click="setMode('pencil')">
            <text class="icon">✏️</text>
          </view>
          <view class="icon-button" :class="{ active: mode === 'headphones' }" @click="setMode('headphones')">
            <text class="icon">🎧</text>
          </view>
        </view>
        
        <view class="next-button" @click="nextWord">
          <text class="icon">➡️</text>
        </view>
      </view>
      
      <!-- 庆祝弹窗 -->
      <view class="celebration" v-if="showCelebration">
        <view class="celebration-text">Great Job!</view>
      </view>
    </view>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentWordIndex: 12,
        totalWords: 30,
        words: [
          {
            word: 'vocabulary',
            pronunciation: '[vəˈkæbjələri]',
            definition: 'n. 词汇，词汇量',
            example: 'He has an extensive vocabulary.'
          },
          {
            word: 'accomplish',
            pronunciation: '[əˈkɑːmplɪʃ]',
            definition: 'v. 完成，实现',
            example: 'She accomplished her goal of running a marathon.'
          },
          {
            word: 'diverse',
            pronunciation: '[daɪˈvɜːrs]',
            definition: 'adj. 多种多样的，不同的',
            example: 'We live in a culturally diverse society.'
          },
          {
            word: 'exaggerate',
            pronunciation: '[ɪɡˈzædʒəreɪt]',
            definition: 'v. 夸大，夸张',
            example: 'Don\'t exaggerate the importance of this mistake.'
          }
        ],
        currentWordIdx: 0,
        isFavorite: false,
        mode: 'book', // 'book', 'pencil', 'headphones'
        showCelebration: false
      };
    },
    computed: {
      currentWord() {
        return this.words[this.currentWordIdx];
      },
      progressWidth() {
        return (this.currentWordIndex / this.totalWords) * 100;
      }
    },
    methods: {
      playSound() {
        // 实际应用中调用语音API
        uni.showToast({
          title: '播放发音',
          icon: 'none'
        });
      },
      toggleFavorite() {
        this.isFavorite = !this.isFavorite;
        if (this.isFavorite) {
          uni.showToast({
            title: '已添加到生词本',
            icon: 'none'
          });
        }
      },
      setMode(mode) {
        this.mode = mode;
        uni.showToast({
          title: mode === 'book' ? '记忆模式' : mode === 'pencil' ? '拼写模式' : '听力模式',
          icon: 'none'
        });
      },
      nextWord() {
        this.currentWordIndex++;
        this.currentWordIdx = (this.currentWordIdx + 1) % this.words.length;
        
        // 如果学习完成，显示庆祝动画
        if (this.currentWordIndex === this.totalWords) {
          setTimeout(() => {
            this.showCelebration = true;
            
            // 5秒后隐藏
            setTimeout(() => {
              this.showCelebration = false;
              uni.navigateBack();
            }, 3000);
          }, 500);
        }
      }
    },
    onLoad() {
      // 页面加载时的初始化逻辑
    }
  }
  </script>
  
  <style>
  page {
    background-color: #F8F9FA;
  }
  
  .container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  .top-nav {
    padding: 32rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .title {
    font-weight: bold;
    font-size: 36rpx;
  }
  
  .counter {
    color: #8f8f94;
  }
  
  .progress-container {
    height: 16rpx;
    background: #E0E0E0;
    margin: 0 32rpx;
    border-radius: 8rpx;
    overflow: hidden;
  }
  
  .progress-bar {
    height: 100%;
    background: #4A90E2;
    transition: width 0.5s ease;
  }
  
  .word-card {
    background: white;
    border-radius: 32rpx;
    padding: 64rpx;
    margin: 48rpx 32rpx;
    box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1);
    min-height: 600rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .word {
    font-size: 64rpx;
    font-weight: bold;
    margin-bottom: 16rpx;
    text-align: center;
  }
  
  .pronunciation {
    text-align: center;
    color: #8f8f94;
    margin-bottom: 48rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .sound-icon {
    margin-left: 16rpx;
    font-size: 36rpx;
  }
  
  .definition {
    margin-bottom: 48rpx;
    text-align: center;
    font-size: 32rpx;
  }
  
  .example {
    font-style: italic;
    color: #8f8f94;
    text-align: center;
    border-left: 6rpx solid #6DABF5;
    padding-left: 24rpx;
    margin: 48rpx 0;
    font-size: 28rpx;
  }
  
  .tip {
    font-size: 24rpx;
    color: #8f8f94;
    text-align: center;
    margin-top: 32rpx;
  }
  
  .toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 32rpx;
    position: fixed;
    bottom: 120rpx; /* 为tabBar预留空间 */
    left: 0;
    right: 0;
    background: white;
  }
  
  .icon-button {
    background: none;
    border: none;
    padding: 16rpx;
    color: #8f8f94;
  }
  
  .icon {
    font-size: 40rpx;
  }
  
  .icon-button.active {
    color: #4A90E2;
  }
  
  .icon-button.favorite {
    color: #FF5252;
  }
  
  .mode-switcher {
    display: flex;
    gap: 32rpx;
  }
  
  .next-button {
    background: #F5A623;
    color: white;
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .celebration {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1000;
  }
  
  .celebration-text {
    font-size: 64rpx;
    font-weight: bold;
    color: white;
    text-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.5);
    animation: bounceIn 0.5s;
  }
  
  @keyframes bounceIn {
    0% { transform: scale(0.3); opacity: 0; }
    50% { transform: scale(1.1); }
    70% { transform: scale(0.9); }
    100% { transform: scale(1); opacity: 1; }
  }
  </style>