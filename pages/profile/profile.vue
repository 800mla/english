<template>
    <view class="container">
      <!-- 个人资料头部 -->
      <view class="profile-header">
        <image src="https://randomuser.me/api/portraits/men/32.jpg" alt="User Avatar" class="profile-avatar"></image>
        <view class="profile-name">Alex Johnson</view>
        <view class="profile-id">ID: alex_j</view>
        
        <view class="profile-stats" id="wordCount">
          <text class="count-number">{{ wordCount }}</text>
          <view class="stats-label">已掌握词汇量</view>
        </view>
      </view>
      
      <!-- 数据统计 -->
      <view class="stats-row">
        <view class="stat-card">
          <view class="stat-number primary-color">42</view>
          <view class="stats-label">学习时长(小时)</view>
        </view>
        
        <view class="stat-card">
          <view class="stat-number secondary-color">28</view>
          <view class="stats-label">连续打卡(天)</view>
        </view>
        
        <view class="stat-card">
          <view class="stat-number primary-color">12</view>
          <view class="stats-label">成就徽章</view>
        </view>
      </view>
      
      <!-- 学习数据 -->
      <view class="card">
        <view class="card-title">学习进度</view>
        <view class="progress-row">
          <view class="progress-container">
            <view class="progress-bg">
              <view class="progress-value"></view>
            </view>
            <view class="progress-labels">
              <view>0</view>
              <view>5000</view>
            </view>
          </view>
          <view class="progress-percent">
            <view class="percent-value">65%</view>
            <view class="stats-label">目标进度</view>
          </view>
        </view>
      </view>
      
      <!-- 设置菜单 -->
      <view class="setting-list">
        <view class="section-title">设置</view>
        
        <view class="setting-item" @click="handleSettingClick('reminder')">
          <text class="setting-icon">⏰</text>
          <view class="setting-text">学习提醒</view>
          <text class="arrow-icon">›</text>
        </view>
        
        <view class="setting-item" @click="handleSettingClick('privacy')">
          <text class="setting-icon">🔒</text>
          <view class="setting-text">隐私管理</view>
          <text class="arrow-icon">›</text>
        </view>
        
        <view class="setting-item" @click="handleSettingClick('language')">
          <text class="setting-icon">🌐</text>
          <view class="setting-text">语言切换</view>
          <text class="arrow-icon">›</text>
        </view>
        
        <view class="setting-item">
          <text class="setting-icon">🌙</text>
          <view class="setting-text">深色模式</view>
          <switch 
            :checked="isDarkMode" 
            @change="toggleDarkMode" 
            color="#4A90E2"
            style="transform: scale(0.8);"
          />
        </view>
        
        <view class="setting-item">
          <text class="setting-icon">🔤</text>
          <view class="setting-text">字体大小</view>
          <picker 
            :value="fontSizeIndex" 
            :range="fontSizes" 
            @change="changeFontSize"
            class="font-picker"
          >
            <view class="picker-text">{{ fontSizes[fontSizeIndex] }}</view>
          </picker>
        </view>
        
        <view class="logout-container">
          <button class="logout-button" @click="logout">退出登录</button>
        </view>
      </view>
    </view>
  </template>
  
  <script>
  export default {
    data() {
      return {
        wordCount: 0,
        isDarkMode: false,
        fontSizes: ['小', '中', '大'],
        fontSizeIndex: 1,
        progressPercent: 65
      };
    },
    onLoad() {
      // 初始化数据
      this.animateWordCount();
    },
    methods: {
      animateWordCount() {
        const endValue = 2358;
        const duration = 2000; // 2秒内完成动画
        const start = Date.now();
        
        const animate = () => {
          const now = Date.now();
          const progress = Math.min((now - start) / duration, 1);
          this.wordCount = Math.floor(progress * endValue).toLocaleString();
          
          if (progress < 1) {
            setTimeout(animate, 16); // 约60fps
          }
        };
        
        animate();
      },
      
      handleSettingClick(type) {
        let title = '';
        switch (type) {
          case 'reminder':
            title = '学习提醒';
            break;
          case 'privacy':
            title = '隐私管理';
            break;
          case 'language':
            title = '语言切换';
            break;
        }
        
        uni.showToast({
          title: `进入${title}设置`,
          icon: 'none'
        });
        
        // 这里可以添加页面导航逻辑
        // uni.navigateTo({
        //   url: `/pages/settings/${type}`
        // });
      },
      
      toggleDarkMode(e) {
        this.isDarkMode = e.detail.value;
        // 这里实现深色模式的逻辑
        // 可以通过修改全局样式或者状态管理来实现
      },
      
      changeFontSize(e) {
        this.fontSizeIndex = e.detail.value;
        // 实现字体大小修改逻辑
      },
      
      logout() {
        uni.showModal({
          title: '提示',
          content: '确认退出登录？',
          success: (res) => {
            if (res.confirm) {
              uni.showToast({
                title: '已退出登录',
                icon: 'success',
                duration: 2000
              });
              
              // 实际退出登录逻辑
              // uni.navigateTo({
              //   url: '/pages/index/logo'
              // });
            }
          }
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
  }
  
  .profile-header {
    text-align: center;
    padding: 64rpx 32rpx;
  }
  
  .profile-avatar {
    width: 160rpx;
    height: 160rpx;
    border-radius: 50%;
    margin: 0 auto 32rpx;
    border: 6rpx solid #4A90E2;
  }
  
  .profile-name {
    font-weight: bold;
    font-size: 40rpx;
    margin-bottom: 16rpx;
  }
  
  .profile-id {
    color: #8f8f94;
    margin-bottom: 48rpx;
    font-size: 28rpx;
  }
  
  .profile-stats {
    text-align: center;
  }
  
  .count-number {
    font-size: 48rpx;
    font-weight: bold;
  }
  
  .stats-label {
    font-size: 24rpx;
    color: #8f8f94;
    font-weight: normal;
  }
  
  .stats-row {
    display: flex;
    justify-content: space-around;
    margin-bottom: 48rpx;
    padding: 0 24rpx;
  }
  
  .stat-card {
    text-align: center;
    padding: 24rpx;
    background: white;
    border-radius: 16rpx;
    box-shadow: 0 8rpx 16rpx rgba(0, 0, 0, 0.05);
    width: 30%;
  }
  
  .stat-number {
    font-size: 48rpx;
    font-weight: bold;
    margin-bottom: 10rpx;
  }
  
  .primary-color {
    color: #4A90E2;
  }
  
  .secondary-color {
    color: #F5A623;
  }
  
  .card {
    background: white;
    border-radius: 16rpx;
    padding: 32rpx;
    margin: 0 24rpx 24rpx;
    box-shadow: 0 8rpx 16rpx rgba(0, 0, 0, 0.05);
  }
  
  .card-title {
    font-weight: bold;
    margin-bottom: 32rpx;
    color: #333333;
    font-size: 32rpx;
  }
  
  .progress-row {
    display: flex;
    align-items: center;
  }
  
  .progress-container {
    flex: 1;
  }
  
  .progress-bg {
    height: 16rpx;
    background: #E0E0E0;
    border-radius: 8rpx;
    overflow: hidden;
  }
  
  .progress-value {
    height: 100%;
    background: #4A90E2;
    width: 65%;
  }
  
  .progress-labels {
    display: flex;
    justify-content: space-between;
    margin-top: 8rpx;
    font-size: 24rpx;
    color: #8f8f94;
  }
  
  .progress-percent {
    margin-left: 32rpx;
    text-align: right;
  }
  
  .percent-value {
    font-weight: bold;
    font-size: 32rpx;
  }
  
  .setting-list {
    margin-top: 48rpx;
    padding-bottom: 120rpx; /* 为底部tabBar预留空间 */
  }
  
  .section-title {
    font-weight: bold;
    margin: 48rpx 0 16rpx 32rpx;
    color: #333333;
    font-size: 32rpx;
  }
  
  .setting-item {
    display: flex;
    align-items: center;
    padding: 32rpx;
    background: white;
    border-bottom: 1px solid #EEEEEE;
  }
  
  .setting-icon {
    margin-right: 32rpx;
    font-size: 36rpx;
    color: #4A90E2;
  }
  
  .setting-text {
    flex: 1;
    font-size: 30rpx;
  }
  
  .arrow-icon {
    color: #8f8f94;
    font-size: 36rpx;
  }
  
  .picker-text {
    color: #4A90E2;
    font-size: 30rpx;
  }
  
  .logout-container {
    margin: 64rpx 32rpx;
  }
  
  .logout-button {
    width: 100%;
    background: #F8F9FA;
    color: #8f8f94;
    padding: 24rpx 0;
    border-radius: 16rpx;
    font-size: 32rpx;
  }
  
  .logout-button::after {
    border: none;
  }
  </style>