<template>
  <view class="container">
    <!-- 激励语：英文 -->
    <view class="quote-en">{{ quoteEn }}</view>
	<!-- 朗读按钮 -->
	<view class="speak-btn" @click="speak">🔊 </view>

    <!-- 激励语：中文 -->
    <view class="quote-cn">{{ quoteCn }}</view>

    <!-- 登录按钮 -->
    <button class="login-btn" @click="gotoIndex">登录</button>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const quoteEn = ref("Every word you learn is a step closer to your dreams.")
const quoteCn = ref("你学会的每一个单词，都是通往梦想的一步。")

// 朗读英文句子
const speak = () => {
  uni.speak({
    text: quoteEn.value,
    lang: 'en-US',
    success: () => {
      console.log("朗读成功")
    },
    fail: (err) => {
      console.error("朗读失败", err)
    }
  })
}
let gotoIndex = ()=>{
	uni.navigateTo({
		url: '/pages/index/index'
	})
}
</script>

<style scoped>
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom, #9ee6d3, #e4f9f2);
  padding: 40rpx;
}

.quote-en {
  font-size: 20px;
  font-weight: 600;
  color: #000000;
  text-align: center;
  margin-bottom: 10rpx;
}

.quote-cn {
  font-size: 18px;
  color: #000000;
  text-align: center;
  margin-bottom: 30rpx;
}

.speak-btn {
  font-size: 16px;
  color: #000000;
  margin-bottom: 60rpx;
}

.login-btn {
  width: 200rpx;
  height: 80rpx;
  background-color: #97cfd1;
  color: #fff;
  text-align: center;
  line-height: 80rpx;
  border-radius: 10rpx;
}
</style>
