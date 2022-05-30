<!--
 * @Author: Vinton
 * @Date: 2022-05-27 17:01:39
 * @Description: file content
-->
<template>
  <div class="toast-container">
    <p class="toast-text" :style="{ background: background, color: color }">
      <span>{{ value }}</span>
    </p>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, PropType } from "vue";
const backMap = {
  warning: "linear-gradient(#84a842 0%, #9dc022 100%)",
  success: "linear-gradient(#F4D176 0%, #F5D77F 100%)",
};
export type ToastType = "success" | "warning";
export default defineComponent({
  name: "Toast",// eslint-disable-line
  props: {
    value: {
      type: String,
      default: "",
    },
    duration: {
      type: Number,
      default: 3000,
    },
    type: {
      type: String as PropType<ToastType>,
      default: "success",
    },
    color: {
      type: String,
      default: "#fff",
    },
  },
  setup(props) {
    const background = computed(() => {
      return backMap[props.type];
    });
    return {
      background,
    };
  },
});
</script>

<style scoped lang="less">
.toast-container {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.toast-text {
  background: rgb(8, 8, 8);
  padding: 8px 10px;
  border-radius: 4px;
  text-align: center;
  display: inline-block;
  animation: anim 0.5s;
  font-size: 28px;
  font-family: Times New Roman;
  font-weight: 400;
  text-align: center;
  color: #fffdda;
  line-height: 59px;
  letter-spacing: -0.14px;
}
.toast-text.remove {
  animation: remove 0.5s;
}
@keyframes anim {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes remove {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
