/*
 * @Author: Vinton
 * @Date: 2022-03-14 09:44:30
 * @Description: file content
 */
// import { createApp } from "vue";
// import FactoryRegistrationCustomComp from "./customComponents";
import FactoryRegistrationThreeComp from "./vant";
export default function setupPlugins() {
  // FactoryRegistrationCustomComp(app); // 注册二次封装的组件
  FactoryRegistrationThreeComp(); // 对于有赞的全局通用组件做全局的配置
}
