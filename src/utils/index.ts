/*
 * @Author: Vinton
 * @Date: 2022-04-06 23:05:23
 * @Description: file content
 */
/**
 * 返回给定秒数的 ISO 格式('00:00:00')
 * @param {num} s : 秒数
 * @returns '00:00:00'
 */
const formatSeconds = (s: number) => {
  const [hour, minute, second, sign] =
    s > 0
      ? [s / 3600, (s / 60) % 60, s % 60, ""]
      : [-s / 3600, (-s / 60) % 60, -s % 60, "-"];

  return (
    sign +
    [hour, minute, second]
      .map((v) => `${Math.floor(v)}`.padStart(2, "0"))
      .join(":")
  );
};

export { formatSeconds };
