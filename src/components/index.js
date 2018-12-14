import Vue from "vue";
import DatePicker from "./DatePicker.vue";

const Components = {
  DatePicker
};

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name]);
});

export default Components;
