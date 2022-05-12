/*
 * @Author: Vinton
 * @Date: 2022-04-29 15:51:15
 * @Description: file content
 */
import { audioInfo } from "@/interfaces/audio";
import { request } from "@/utils/request";
import { baseModel } from "@/interfaces/common";
export default class audioService {
  static async getAudioInfo() {
    const res = await request<baseModel<Array<audioInfo[]>>>(
      "resource/data/audio.json",
      {},
      "get"
    );
    return res.data;
  }
}
