/*
 * @Author: Vinton
 * @Date: 2022-03-31 22:02:35
 * @Description: file content
 */
import FeastService from "@/service/audio";
import { audioInfo } from "@/interfaces/audio";
import { onMounted, ref, watch, computed, reactive, nextTick } from "vue";
import { formatSeconds } from "@/utils/index";
export const useAudioAction = () => {
  const audioMenus = ref<Array<audioInfo>[]>([]);
  const audioIndex = ref<number>(0); // 批次
  let audio: HTMLAudioElement | undefined;
  let image: HTMLImageElement | undefined;
  onMounted(async () => {
    const { state, data } = await FeastService.getAudioInfo();
    if (state === 200) {
      audioMenus.value = data.data;
    }
    audio = Array.from(document.getElementsByTagName("audio"))?.find(
      (item) => item.className === "music-feast"
    );
    image = Array.from(document.getElementsByTagName("img"))?.find(
      (item) => item.className === "animate-img"
    );
    nextTick(() => {
      totalProcess = document.getElementById("process");
    });
  });
  const currentAudioMenus = computed(() => {
    return audioMenus.value[audioIndex.value];
  });
  // 切换下一首歌曲
  const changeNextBatch = () => {
    handlePlayEnd();
    audioIndex.value += 1;
  };
  // 控制下一批次可以循环到第一批次
  watch(
    () => audioIndex.value,
    (newVal) => {
      if (newVal > audioMenus.value.length - 1) {
        audioIndex.value = 0;
      }
    }
  );

  const isActiveIndex = ref<number>(-1);
  const audioIsPlaying = ref<boolean>(false);
  const currentMusicItem = reactive<audioInfo>({} as audioInfo);
  let flag: number;
  let timer: NodeJS.Timeout;
  // 旋转图片
  const rotate = () => {
    let deg = 0;
    flag = 1;
    timer = setInterval(function () {
      if (image != undefined) {
        image.style.transform = "rotate(" + deg + "deg)";
      }
      deg += 1;
      if (deg > 360) {
        deg = 0;
      }
    }, 30);
  };
  const imagePause = () => {
    clearInterval(timer);
    flag = 0;
  };
  // 点击底下的按钮播放音乐和暂停音乐
  const audioPlayOrPause = () => {
    audioIsPlaying.value = !audioIsPlaying.value;
    if (!currentMusicItem.audioSrc) {
      // 一进入页面，进行点击了暂停播放按钮，默认播放第一首歌
      setCurrentAudioRes(currentAudioMenus.value[0]);
      isActiveIndex.value = 0;
      rotate();
      return;
    }
    if (flag) {
      imagePause();
      audio?.pause();
    } else {
      rotate();
      audio?.play();
    }
  };
  // 点击列表播放音乐
  const playMusicOnMusicList = (index: number, item: audioInfo) => {
    if (isActiveIndex.value === index) {
      return;
    }
    imagePause();
    setCurrentAudioRes(item);
    audioIsPlaying.value = true;
    isActiveIndex.value = index;
    rotate();
  };
  // 点击上一首音乐
  const changePreMusic = (): void => {
    if (!currentMusicItem.audioSrc) {
      // 如果当前没有音乐选择播放就直接操作无效
      return;
    }
    if (isActiveIndex.value == 0) {
      playMusicOnMusicList(3, currentAudioMenus.value[3]);
    } else {
      playMusicOnMusicList(
        isActiveIndex.value - 1,
        currentAudioMenus.value[isActiveIndex.value - 1]
      );
    }
  };
  // 点击下一首音乐
  const changeNextMusic = (): void => {
    if (!currentMusicItem.audioSrc) {
      return;
    }
    if (isActiveIndex.value == 3) {
      playMusicOnMusicList(0, currentAudioMenus.value[0]);
    } else {
      playMusicOnMusicList(
        isActiveIndex.value + 1,
        currentAudioMenus.value[isActiveIndex.value + 1]
      );
    }
  };
  // 设置当前播放音乐的资源
  const setCurrentAudioRes = (item: audioInfo): void => {
    currentMusicItem.url = item.url;
    currentMusicItem.name = item.name;
    currentMusicItem.duration = item.duration;
    currentMusicItem.author = item.author;
    currentMusicItem.audioSrc = item.audioSrc;
  };
  const currentMusicImageUrl = computed(() => {
    return currentMusicItem.url
      ? currentMusicItem.url
      : "/resource/assets/audio/01/3/Juvenile.png";
  });
  const currentMusicSrc = computed(() => {
    return currentMusicItem.audioSrc ? currentMusicItem.audioSrc : "";
  });

  const handleTimeFormat = (value: number) => {
    if (!value) {
      return "00:00";
    }
    let timeInfo = formatSeconds(value);
    if (timeInfo.substring(0, 2) === "00") {
      timeInfo = timeInfo.substring(3);
    }
    return timeInfo;
  };

  const currTime = ref<number>(0);
  const currentProcessTime = computed(() => {
    return handleTimeFormat(currTime.value);
  });

  const totalTime = ref<number>(0);
  const currentTotalTime = computed(() => {
    return handleTimeFormat(totalTime.value);
  });
  const loadedMetaData = (e: any) => {
    totalTime.value = parseInt(e.currentTarget.duration);
  };
  const timeupdate = (e: any) => {
    currTime.value = parseInt(e?.currentTarget?.currentTime);
  };

  const handlePlayEnd = () => {
    audioIsPlaying.value = false;
    isActiveIndex.value = -1;
    imagePause();
    // 清空当前数据
    setCurrentAudioRes({
      url: "",
      audioSrc: "",
      duration: "",
      name: "",
      author: "",
    });
  };
  // 音乐播放完毕需要清空播放资源数据
  const playEnded = () => {
    handlePlayEnd();
  };
  // 播放进度
  const progressNum = computed(() => {
    if (!currTime.value || !totalTime.value) {
      return 0;
    }
    return (currTime.value / totalTime.value) * 100;
  });
  let totalProcess: HTMLElement | null;
  // 跳转歌曲进度
  const seeked = (progressNum: number) => {
    const seekTime = totalTime.value * (progressNum / 100);
    if (audio !== undefined) {
      audio.currentTime = seekTime;
    }
  };
  const changeProgress = (e: any) => {
    if (!audioIsPlaying.value) {
      return;
    }
    let progressPercent: number;
    if (totalProcess !== null) {
      progressPercent =
        ((e.pageX - totalProcess?.getBoundingClientRect().left) /
          totalProcess?.getBoundingClientRect().width) *
        100;
      seeked(progressPercent > 0 ? progressPercent : 0);
    }
  };
  return {
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
  };
};
