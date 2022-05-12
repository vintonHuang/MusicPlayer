/*
 * @Author: Vinton
 * @Date: 2022-03-14 09:44:49
 * @Description: file content
 */
import { defineAsyncComponent, createApp } from "vue";
const components = import.meta.glob("../components/BaseComponents/*.vue"); // 异步方式
export default function FactoryRegistrationCustomComp(
  app: ReturnType<typeof createApp>
) {
  for (const [key, value] of Object.entries(components)) {
    const name = key.slice(key.lastIndexOf("/") + 1, key.lastIndexOf("."));
    app.component(name, defineAsyncComponent(value));
  }
}
