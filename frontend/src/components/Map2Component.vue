<template>
  <ol-map :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" style="height:400px;width: 100%">
    <ol-view ref="view" :center="center" :rotation="rotation" :zoom="zoom" :projection="projection" />

    <ol-tile-layer>
      <ol-source-osm />
    </ol-tile-layer>


    <ol-vector-layer>
      <ol-source-vector ref="cities" url="https://raw.githubusercontent.com/moffer/woid/main/frontend/src/assets/geo.json"
        :format="geoJson" :projection="projection">
      </ol-source-vector>

      <ol-style>
        <ol-style-stroke color="red" :width="2"></ol-style-stroke>
        <ol-style-fill color="rgba(255,255,255,0.1)"></ol-style-fill>
        <ol-style-circle :radius="7">
          <ol-style-fill color="blue"></ol-style-fill>
        </ol-style-circle>
      </ol-style>
    </ol-vector-layer>

    <ol-vector-layer>
      <ol-source-vector>
        <ol-feature>
          <ol-geom-point :coordinates="coordinate"></ol-geom-point>
          <ol-style>
            <ol-style-circle :radius="radius">
              <ol-style-fill color="rgba(255,255,255,0.1)"></ol-style-fill>
              <ol-style-stroke
                color="red"
                :width="2"
              ></ol-style-stroke>
            </ol-style-circle>
          </ol-style>
        </ol-feature>
      </ol-source-vector>
    </ol-vector-layer>

    <ol-interaction-select @select="clicked">
      <ol-style>
        <ol-style-stroke color="red" :width="2"></ol-style-stroke>
        <ol-style-fill color="rgba(255,255,255,0.1)"></ol-style-fill>
        <ol-style-circle :radius="7">
          <ol-style-fill color="yellow"></ol-style-fill>
        </ol-style-circle>
      </ol-style>
    </ol-interaction-select>
  </ol-map>
</template>
  
<script lang="ts">
import { useCoordinateStore } from '@/stores/counter'

import { ref, inject, toRefs } from "vue";
export default {
  setup() {
    const coordinateStore = useCoordinateStore()

    const center = coordinateStore.mapCenter
    const projection = ref("EPSG:4326");
    const zoom = coordinateStore.zoom;
    const rotation = ref(0);

    const drawEnable = ref(false);
    const drawType = ref("Point");
    const format: any = inject("ol-format");
    const geoJson = new format.GeoJSON();

    const drawstart = (event: any) => {
      // console.log(event);
    };

    const drawend = (event: any) => {
      // console.log(event);
    };

    const {bicycle} = toRefs(coordinateStore);
    const coordinate = bicycle;
    const radius = ref(10);

    const clicked = (event: any) => {
      const selected = event.selected;
      if (selected?.[0]) {
        const bikeName = selected[0].values_.name;
        const bikeId = selected[0].values_.id;

        coordinateStore.updateSelectedBike(bikeName, bikeId);
      }
    };

    return {
      center,
      projection,
      zoom,
      rotation,
      drawEnable,
      drawType,
      drawstart,
      drawend,
      clicked,
      geoJson,
      coordinate,
      radius

    };
  },
};
</script>
  