/* eslint-disable */
declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
  }
  
  declare module 'mqtt/dist/mqtt.min' {
    import MQTT from 'mqtt'
    export = MQTT
  }
  
  //定義 vue3-openlayers
  declare module 'vue3-openlayers'
  