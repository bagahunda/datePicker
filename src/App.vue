<template>
  <div class="date">
    <date-picker v-model="date"></date-picker>
  </div>
</template>

<script>
import DatePicker from "@/components/DatePicker";
export default {
  name: "app",
  components: {
    DatePicker
  },

  data() {
    return {
      date: ""
    };
  }
};
</script>

<style>
.date {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.expand-enter-active,
.expand-leave-active {
  transition: height 0.2s ease-in-out;
  overflow: hidden;
}

.expand-enter,
.expand-leave-to {
  height: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s ease-in-out;
}

.slide-enter-active {
  transition-delay: 0.2s;
}

.slide-enter {
  transform: translateX(10px);
  opacity: 0;
}

.slide-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}
</style>
