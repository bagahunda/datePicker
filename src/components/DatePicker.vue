<template>
  <div :class="$style['date-picker']">
    <div
      :class="[$style['date-picker__value'], showOptions ? $style.activeOptions : '']"
      @click="activateDatePicker"
    >
      <b :class="selectDay ? $style.active : ''">{{ date.day ? date.day : 'day' }}</b>
      <span>/</span>
      <b :class="selectMonth ? $style.active : ''">{{ date.month ? date.month : 'month' }}</b>
      <span>/</span>
      <b :class="selectYear ? $style.active : ''">{{ date.year ? date.year : 'year' }}</b>
    </div>
    <transition name="expand" @enter="enter" @after-enter="afterEnter" @leave="leave">
      <div :class="$style['date-picker__options']" v-if="showOptions">
        <div :class="$style['date-picker__options-container']" :style="{marginLeft: optionsMargin}">
          <div :class="$style['date-picker__item']">
            <span
              v-for="(day, index) in days"
              :key="index"
              :class="date.day === day ? active : ''"
              @click="onSelectDay($event)"
            >{{ day.day }}</span>
          </div>
          <div :class="[$style['date-picker__item'], $style['date-picker__item--month']]">
            <span
              v-for="(month, index) in months"
              :key="index + 101"
              :class="[$style['date-picker__month'], month.disabled ? $style['date-picker__item--disabled'] : '']"
              @click="onSelectMonth($event)"
            >{{ month.month }}</span>
          </div>
          <div :class="$style['date-picker__item']">
            <span
              v-for="(year, index) in years"
              :key="index + 901"
              @click="onSelectYear($event)"
            >{{ year }}</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
let date = new Date();
let year = date.getFullYear();
let years = [];
let months = [
  { month: "january", disabled: false },
  { month: "february", disabled: false },
  { month: "march", disabled: false },
  { month: "april", disabled: false },
  { month: "may", disabled: false },
  { month: "june", disabled: false },
  { month: "july", disabled: false },
  { month: "august", disabled: false },
  { month: "september", disabled: false },
  { month: "october", disabled: false },
  { month: "november", disabled: false },
  { month: "december", disabled: false }
];
let days = [];
for (let i = 0; i < 10; i++) {
  years.push(year - i);
}
for (let i = 0; i < 31; i++) {
  days.push({ day: 31 - i, disabled: false });
}

export default {
  name: "date-picker",

  props: {
    value: {
      type: [String, Number, Date],
      default: ""
    }
  },

  data() {
    return {
      days: days.reverse(),
      months: months,
      years: years.reverse(),
      showOptions: false,
      selectDay: false,
      selectMonth: false,
      selectYear: false,
      date: {
        day: "",
        month: "",
        year: ""
      }
    };
  },

  computed: {
    optionsMargin() {
      if (this.selectDay) {
        return "0";
      }
      if (this.selectMonth) {
        return "-100%";
      }
      if (this.selectYear) {
        return "-200%";
      }
      return "0";
    }
  },

  methods: {
    activateDatePicker() {
      this.showOptions = true;
      this.selectDay = true;
    },

    onSelectDay(e) {
      this.selectDay = false;
      this.date.day = e.target.innerText;
      for (let i in this.months) {
        let counter = i * 1 + 1;
        let qty = this.getDaysInMonth(counter, year);
        if (this.date.day * 1 > qty) {
          this.months[i].disabled = true;
        }
      }
      this.selectMonth = true;
    },

    onSelectMonth(e) {
      this.selectMonth = false;
      this.date.month = e.target.innerText;
      this.selectYear = true;
    },

    onSelectYear(e) {
      this.selectYear = false;
      this.date.year = e.target.innerText;
      this.showOptions = false;
      let val = new Date(this.date.day + this.date.month + this.date.year);
      this.$emit("input", val);
    },

    getDaysInMonth(month, year) {
      return new Date(year, month, 0).getDate();
    },

    enter(el) {
      let width = getComputedStyle(el).width;
      el.style.width = width;
      el.style.position = "absolute";
      el.style.visibility = "hidden";
      el.style.height = "auto";

      let height = getComputedStyle(el).height;

      el.style.width = null;
      el.style.position = null;
      el.style.visibility = null;
      el.style.height = 0;

      setTimeout(() => {
        el.style.height = height;
      });
    },

    afterEnter(el) {
      el.style.height = "auto";
    },

    leave(el) {
      let height = getComputedStyle(el).height;
      el.style.height = height;
      setTimeout(() => {
        el.style.height = 0;
      });
    }
  }
};
</script>

<style module>
.date-picker {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  position: relative;
  width: 280px;
  border-radius: 6px;
  box-shadow: 0 6px 24px rgba(17, 17, 19, 0.12);
  background-color: white;
  font-weight: bold;
  box-sizing: border-box;
}

.date-picker *,
.date-picker *:before,
.date-picker *:after {
  box-sizing: inherit;
}

.date-picker__value {
  box-sizing: border-box;
  width: 100%;
  padding: 1em 2em;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.activeOptions {
  border-bottom: 1px solid rgba(17, 17, 19, 0.4);
}

.date-picker__value span {
  padding: 0 0.5em;
  color: rgba(17, 17, 19, 0.4);
  font-weight: 200;
}

.date-picker__value .active {
  color: #ee2455;
}

.date-picker__options {
  overflow: hidden;
  font-size: 0.8em;
}

.date-picker__options-container {
  width: 840px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  transition: all 0.2s ease-in-out;
}

.date-picker__options span:hover,
.date-picker__options span.active {
  background-color: #ee2455;
  color: white;
}

@supports (grid-area: auto) {
  .date-picker__item {
    width: 100%;
    padding: 1em;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(35px, 1fr));
    grid-gap: 5px 10px;
  }

  .date-picker__item--month {
    grid-template-columns: repeat(2, 1fr);
  }

  .date-picker__item span {
    padding: 5px;
    text-align: center;
    border-radius: 3px;
    cursor: pointer;
  }
}

.date-picker__item--disabled {
  color: rgba(17, 17, 19, 0.4);
  pointer-events: none;
  cursor: not-allowed;
}

/* .date-picker__item {
  width: 280px;
  padding: 1em;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.date-picker__day span {
  width: calc((100% - 60px) / 7);
  padding: 5px;
  margin: 0 5px 1em;
  text-align: center;
  cursor: pointer;
  border-radius: 3px;
}

.date-picker__day span:last-child {
  margin-right: auto;
}

.date-picker__month {
  width: 280px;
  padding: 1em;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
}

.date-picker__month span {
  width: calc((100% - 20px) / 3);
  margin: 0 0 1em;
  padding: 5px;
  text-align: center;
  cursor: pointer;
  border-radius: 3px;
}

.date-picker__year {
  width: 280px;
  padding: 1em;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
}

.date-picker__year span {
  width: calc((100% - 30px) / 4);
  margin: 0 0 1em;
  padding: 5px;
  text-align: center;
  cursor: pointer;
  border-radius: 3px;
} */
</style>