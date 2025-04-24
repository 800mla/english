<template>
  <view class="container">
    <!-- 顶部问候区域 -->
    <view class="header">
      <view class="greeting">
        <image src="https://randomuser.me/api/portraits/men/32.jpg" alt="User Avatar" class="avatar"></image>
        <view>
          <view class="greeting-text">Hi, {{ userName }}!</view>
          <view>今天学了多少词？</view>
        </view>
        <view style="margin-left: auto; text-align: center;">
          <text class="weather-icon">☀️</text>
          <view style="font-size: 24rpx;">25°C</view>
        </view>
      </view>
    </view>

    <!-- 内容区域 -->
    <view class="content-wrapper">
      <!-- 今日任务卡片 -->
      <view class="card">
        <view class="card-title">今日任务</view>
        <view class="task-content">
          <view class="task-info">
            <view style="font-size: 40rpx; font-weight: bold;">30个单词</view>
            <view class="text-gray">预计15分钟</view>
          </view>
          <button class="button primary-button" @click="goToLearning">继续学习</button>
        </view>
      </view>

      <!-- 学习进度卡片 -->
      <view class="card">
        <view class="card-title">学习进度</view>
        <view class="circle-progress-container">
          <svg class="circle-progress" width="120" height="120" viewBox="0 0 120 120">
            <circle class="circle-progress-circle-bg" cx="60" cy="60" r="54" />
            <circle class="circle-progress-value" cx="60" cy="60" r="54" :stroke-dasharray="circumference" :stroke-dashoffset="progressOffset" />
            <text class="circle-progress-text" x="60" y="60">{{ progressPercent }}%</text>
          </svg>
        </view>
        <view style="text-align: center; margin-top: 32rpx;">
          <view style="font-weight: bold;">已学习 {{ learnedWords }}/{{ totalWords }} 个单词</view>
          <view class="text-gray" style="font-size: 28rpx;">继续努力！</view>
        </view>
      </view>

      <!-- 本周数据卡片 -->
      <view class="card">
        <view class="card-title">本周数据</view>
        <view class="chart-container">
          <view v-for="(dayData, index) in weeklyData" :key="index" class="bar-wrapper">
            <view class="bar" :style="{ height: dayData.height + '%' }"></view>
            <view class="bar-label">{{ dayData.label }}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      userName: 'Alex',
      progressPercent: 0,
      learnedWords: 12,
      totalWords: 30,
      circumference: 2 * Math.PI * 54, // 圆周长
      weeklyData: [
        { label: '一', height: 30 },
        { label: '二', height: 70 },
        { label: '三', height: 90 },
        { label: '四', height: 60 },
        { label: '五', height: 80 },
        { label: '六', height: 20 },
        { label: '日', height: 40 }
      ]
    };
  },
  computed: {
    progressOffset() {
      return this.circumference - (this.progressPercent / 100 * this.circumference);
    }
  },
  onLoad() {
    // 初始设置为0，用于创建动画效果
    this.progressPercent = 0;
    
    // 模拟加载后设置进度
    setTimeout(() => {
      // 计算实际进度
      this.progressPercent = Math.round((this.learnedWords / this.totalWords) * 100);
    }, 500);

    // 模拟动态加载柱状图数据
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
      uni.switchTab({
        url: '/pages/learning/index'
      });
    }
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
  background-color: #F8F9FA;
}

.header {
  background: linear-gradient(to right, #4A90E2, #6DABF5);
  color: white;
  padding: 48rpx 32rpx 32rpx;
  border-radius: 0 0 16rpx 16rpx;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.greeting {
  display: flex;
  align-items: center;
  margin-bottom: 32rpx;
}

.avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  margin-right: 24rpx;
  border: 2px solid white;
}

.greeting-text {
  font-weight: bold;
  font-size: 36rpx;
  margin-bottom: 8rpx;
}

.weather-icon {
  font-size: 40rpx;
  margin-bottom: 8rpx;
}

.content-wrapper {
  padding-bottom: 140rpx;
}

.card {
  background: #FFFFFF;
  border-radius: 24rpx;
  padding: 32rpx;
  margin: 24rpx;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.card-title {
  font-weight: bold;
  margin-bottom: 16rpx;
  color: #333333;
  font-size: 32rpx;
}

.task-content {
  display: flex;
  align-items: center;
  margin-top: 16rpx;
}

.task-info {
  flex: 1;
}

.text-gray {
  color: #8f8f94;
  font-size: 28rpx;
}

.button {
  border: none;
  padding: 20rpx 32rpx;
  border-radius: 16rpx;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
  font-size: 30rpx;
  line-height: 1.2;
  transition: transform 0.2s;
}

.button::after {
  border: none;
}

.button:active {
  transform: scale(0.98);
}

.primary-button {
  background: #4A90E2;
  color: white;
}

.circle-progress-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24rpx;
}

.circle-progress {
  transform: rotate(-90deg);
}

.circle-progress-circle-bg {
  fill: none;
  stroke: #E0E0E0;
  stroke-width: 8;
}

.circle-progress-value {
  fill: none;
  stroke: #4A90E2;
  stroke-width: 8;
  stroke-linecap: round;
  transition: stroke-dashoffset 0.8s ease-in-out;
}

.circle-progress-text {
  dominant-baseline: middle;
  text-anchor: middle;
  font-size: 24px;
  font-weight: bold;
  fill: #333333;
  transform: rotate(90deg) translate(0, -120px);
}

.chart-container {
  display: flex;
  justify-content: space-between;
  margin-top: 32rpx;
  height: 200rpx;
  align-items: flex-end;
}

.bar-wrapper {
  width: 12%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bar {
  width: 80%;
  background: #4A90E2;
  border-radius: 8rpx 8rpx 0 0;
  transition: height 0.5s ease-out;
}

.bar-wrapper:nth-child(odd) .bar {
  background: #6DABF5;
}

.bar-wrapper:nth-child(6n+1) .bar {
  background: #E0E0E0;
}

.bar-label {
  margin-top: 8rpx;
  font-size: 20rpx;
  color: #8f8f94;
}
</style>