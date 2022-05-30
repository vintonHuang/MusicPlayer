<!--
 * @Author: Vinton
 * @Date: 2022-05-30 22:17:44
 * @Description: file content
-->
<template>
  <van-button type="primary" @click="router.push('/MusicPlayer')"
    >音乐播放器</van-button
  >
  <van-button type="success" @click="router.push('/Toast')">Toast</van-button>
</template>
<script lang="ts">
export default {
  name: "HomePage",
};
</script>
<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
</script>
<style scoped lang="less"></style>
