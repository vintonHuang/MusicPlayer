<!--
 * @Author: Vinton
 * @Date: 2022-04-29 14:35:24
 * @Description: file content
-->
<template>
  <div class="audio-container">
    <div class="btn-change" @click="changeNextBatch"></div>
    <div class="music-image">
      <img
        class="animate-img"
        :src="importResource(currentMusicImageUrl)"
        alt=""
      />
    </div>
    <div class="process">
      <span class="process-startTime">{{ currentProcessTime }}</span>
      <span id="process" class="process-content" @click="changeProgress">
        <div
          class="process-content-line"
          :style="{ width: progressNum + '%' }"
        ></div>
        <div class="process-content-points"></div>
      </span>
      <span class="process-entTime">{{ currentTotalTime }}</span>
    </div>
    <div class="operation-btn">
      <div class="operation-btn-pre" @click="changePreMusic"></div>
      <div
        :class="[audioIsPlaying ? 'pause-btn' : 'play-btn']"
        @click="audioPlayOrPause"
      ></div>
      <div class="operation-btn-next" @click="changeNextMusic"></div>
    </div>
    <div class="music-content">
      <ul>
        <li
          v-for="(item, index) in currentAudioMenus"
          :key="index"
          :class="{ acitve: isActiveIndex === index }"
          @click="playMusicOnMusicList(index, item)"
        >
          <span v-if="isActiveIndex === index" class="music-wave"> </span>
          <span v-else>{{ index + 1 }}</span>
          <span>{{ item.name }}</span>
          <span>{{ item.author }}</span>
          <span>{{ item.duration }}</span>
        </li>
      </ul>
    </div>
  </div>
  <audio
    class="music-feast"
    :src="importResource(currentMusicSrc)"
    preload="auto"
    :autoPlay="false"
    style="display: none"
    @timeupdate="timeupdate"
    @ended="playEnded"
    @loadedmetadata="loadedMetaData"
  ></audio>
</template>
<script lang="ts">
export default {
  name: "AudioModel",
};
</script>
<script setup lang="ts">
import { useAudioAction } from "./composables/useAudioAction";
import { useImportResForOss } from "@/hooks/useImportResForOss";
const { importResource } = useImportResForOss();
const {
  currentAudioMenus,
  isActiveIndex,
  audioIsPlaying,
  audioPlayOrPause,
  playMusicOnMusicList,
  currentMusicImageUrl,
  currentMusicSrc,
  changePreMusic,
  changeNextMusic,
  currentProcessTime,
  timeupdate,
  playEnded,
  loadedMetaData,
  currentTotalTime,
  progressNum,
  seeked,
  changeProgress,
  changeNextBatch,
} = useAudioAction();
</script>
<style scoped lang="less">
@import url("../../styles/mixin.less");
.audio-container {
  .main-bg(750px,1086px,"@/assets/bg_03.jpg");
  .btn-change {
    position: relative;
    left: 600px;
    top: 10px;
    .main-bg(142px, 49px, "@/assets/btn-change.png");
  }
  .music-image {
    margin: 0 auto;
    .main-bg(367px, 367px, "@/assets/cover_bg.png");
    position: relative;
    img {
      position: absolute;
      left: 42px;
      top: 40px;
      width: 280px;
      height: 280px;
    }
  }
  .process {
    font-size: 22px;
    color: #a64c3c;
    line-height: 56px;
    cursor: pointer;
    display: flex;
    align-items: center;
    position: relative;
    left: 42px;
    &-content {
      width: 520px;
      height: 2px;
      border: 2px solid #dbb0a6;
      margin: 0 18px;
      display: flex;
      align-items: center;
      &-line {
        height: 2px;
        background: #b7594c;
      }
      &-points {
        width: 15px;
        height: 15px;
        background: #b7594c;
        border-radius: 50%;
      }
    }
  }
  .operation-btn {
    display: flex;
    align-items: center;
    position: relative;
    left: 245px;
    &-pre {
      .main-bg(37px, 33px, "@/assets/icon_pre.png");
    }
    .play-btn {
      margin: 0 51px;
      .main-bg(85px, 85px, "@/assets/icon_start.png");
    }
    .pause-btn {
      margin: 0 51px;
      .main-bg(85px, 85px, "@/assets/icon_pause.png");
    }
    &-next {
      .main-bg(36px, 33px, "@/assets/icon_next.png");
    }
  }
  .music-content {
    width: 735px;
    height: 235px;
    opacity: 0.72;
    background: #fffdf1;
    border-radius: 3px;
    margin: 22px auto;
    padding-top: 15px;
    ul {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      font-size: 22px;
      text-align: left;
      line-height: 52px;
      color: #b6594b;
      li {
        cursor: pointer;
        .music-wave {
          .main-bg(25px, 25px, "@/assets/voice.png");
        }
        display: flex;
        justify-content: space-around;
        text-align: left;
        align-items: center;
        span:nth-child(2) {
          width: 200px;
        }
        span:nth-child(3) {
          width: 200px;
        }
        span:nth-child(4) {
          width: 50px;
        }
        &.acitve {
          color: #dfb155;
        }
      }
    }
  }
}
</style>
