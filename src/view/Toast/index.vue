<!--
 * @Author: Vinton
 * @Date: 2022-05-30 22:09:55
 * @Description: file content
-->
<template>
  <div>
    <van-button type="primary" @click="tips('warning')">主要按钮</van-button>
    <van-button type="success" @click="tips('success')">成功按钮</van-button>
    <van-button type="default" @click="tips('primary')">默认按钮</van-button>
    <van-button type="warning" @click="tips('primary')">警告按钮</van-button>
    <van-button type="danger" @click="tips('primary')">危险按钮</van-button>
  </div>
</template>
<script lang="ts">
export default {
  name: "ToastModel",
};
</script>
<script setup lang="ts">
enum STATIC_STATE {
  primary = "primary",
  success = "success",
}

import Toast from "./components/index";
const tips = (type: string) => {
  Toast({
    value: "The Team name already exists",
    duration: 1000, // 如果大于0则不必使用destroy方法
    type: STATIC_STATE[type],
  });
};
</script>
<style scoped lang="less"></style>
