import Vue from "vue";
import App from "./App";

import VDistpicker from "../src/Distpicker";

Vue.component("v-distpicker", VDistpicker);

new Vue({
  el: "#app",
  render: (h) => h(App),
});
