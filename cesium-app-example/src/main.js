import {
    Cesium3DTileset,
    Terrain,
    Viewer,
    Ion,
} from "cesium";
// widgets.css is injected automatically by vite-plugin-cesium.
import "./style.css";

const CITYGML_ASSET_ID = 4960188;

// Cesium Ion token is read from the environment (see .env.local).
// Set VITE_CESIUM_ION_TOKEN there; never commit a real token to git.
Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_ION_TOKEN;

// Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
const viewer = new Viewer("cesiumContainer", {
    terrain: Terrain.fromWorldTerrain(),
    shadows: true,
    shouldAnimate: true,
});

viewer.scene.globe.enableLighting = true;

// Animationsgeschw. stark erhöht, damit man den Schattenverlauf gut sieht
viewer.clock.multiplier = 7000;


// Add the uploaded LoD2 CityGML asset, converted by Cesium Ion to 3D Tiles.
const buildingsTileset = await Cesium3DTileset.fromIonAssetId(CITYGML_ASSET_ID);
viewer.scene.primitives.add(buildingsTileset);
await viewer.zoomTo(buildingsTileset);
