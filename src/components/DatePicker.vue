<template>
  <div :class="[$style['picker'], $style[`${theme}`]]" v-clickOutside="closeOptions">
    <div
      :class="[$style['picker__value'], showOptions ? $style.activeOptions : '']"
      @click="activateDatePicker"
    >
      <b :class="selectDay ? $style.active : ''">{{ date.day ? date.day : placeholder[locale].day }}</b>
      <span>/</span>
      <b
        :class="selectMonth ? $style.active : ''"
      >{{ date.month ? date.month : placeholder[locale].month }}</b>
      <span>/</span>
      <b
        :class="selectYear ? $style.active : ''"
      >{{ date.year ? date.year : placeholder[locale].year }}</b>
    </div>
    <transition name="expand" @enter="enter" @after-enter="afterEnter" @leave="leave">
      <div :class="$style['picker__options']" v-if="showOptions">
        <div :class="$style['picker__options-container']" :style="{marginLeft: optionsMargin}">
          <div :class="$style['picker__item']">
            <span
              v-for="(day, index) in days"
              :key="index"
              :class="[date.day == day.day ? $style.active : '', day.disabled ? $style['picker__item--disabled'] : '']"
              @click="onSelectDay($event)"
            >{{ day.day }}</span>
          </div>
          <div :class="[$style['picker__item'], $style['picker__item--month']]">
            <span
              v-for="(month, index) in months[locale]"
              :key="index + 101"
              :class="[date.month === month.month ? $style.active : '', month.disabled ? $style['picker__item--disabled'] : '']"
              @click="onSelectMonth($event)"
            >{{ month.month }}</span>
          </div>
          <div :class="[$style['picker__item'], $style['picker__item--year']]">
            <span
              v-for="(year, index) in years"
              :key="index + 901"
              :class="[date.year == year.year ? $style.active : '', year.disabled ? $style['picker__item--disabled'] : '']"
              @click="onSelectYear($event)"
            >{{ year.year }}</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
let clickOutside = {
  bind(el, binding, vNode) {
    // Provided expression must evaluate to a function.
    if (typeof binding.value !== "function") {
      const compName = vNode.context.name;
      let warn = `[Click-outside:] provided expression '${
        binding.expression
      }' is not a function, but has to be`;
      if (compName) {
        warn += `Found in component '${compName}'`;
      }
      // eslint-disable-next-line
      console.warn(warn);
    }

    const clickHandler =
      "ontouchstart" in document.documentElement ? "touchstart" : "click";

    el.__ClickOutsideHandler__ = event => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event);
      }
    };
    document.body.addEventListener(clickHandler, el.__ClickOutsideHandler__);
  },
  unbind(el) {
    const clickHandler =
      "ontouchstart" in document.documentElement ? "touchstart" : "click";
    document.body.removeEventListener(clickHandler, el.__ClickOutsideHandler__);
    delete el.__ClickOutsideHandler__;
  }
};

export default {
  name: "date-picker",

  props: {
    value: {
      type: [String, Number, Date],
      default: ""
    },
    yearsPeriod: {
      type: [Number, String],
      default: 50
    },
    disabledDays: {
      type: Array
    },
    disabledMonths: {
      type: Array
    },
    disabledYears: {
      type: Array
    },
    theme: {
      type: String,
      default: "shadow"
    },
    locale: {
      type: String,
      default: "en"
    }
  },

  data() {
    return {
      placeholder: {
        en: {
          day: "day",
          month: "month",
          year: "year"
        },
        ru: {
          day: "день",
          month: "месяц",
          year: "год"
        }
      },
      months: {
        en: [
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
        ],
        ru: [
          { month: "январь", disabled: false },
          { month: "февраль", disabled: false },
          { month: "март", disabled: false },
          { month: "апрель", disabled: false },
          { month: "май", disabled: false },
          { month: "июнь", disabled: false },
          { month: "июль", disabled: false },
          { month: "август", disabled: false },
          { month: "сентябрь", disabled: false },
          { month: "октябрь", disabled: false },
          { month: "ноябрь", disabled: false },
          { month: "декабрь", disabled: false }
        ]
      },
      years: [],
      days: [],
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

  created() {
    let date = new Date();
    let year = date.getFullYear();
    for (let i = 0; i < +this.yearsPeriod; i++) {
      this.years.unshift({ year: year - i, disabled: false });
    }

    for (let i = 0; i < 31; i++) {
      this.days.unshift({ day: 31 - i, disabled: false });
    }

    if (this.disabledDays) {
      for (let i of this.disabledDays) {
        for (let j of this.days) {
          if (j.day == i) {
            j.disabled = true;
          }
        }
      }
    }

    if (this.disabledMonths) {
      for (let i of this.disabledMonths) {
        for (let j of this.months[this.locale]) {
          if (j.month == i) {
            j.disabled = true;
          }
        }
      }
    }

    if (this.disabledYears) {
      for (let i of this.disabledYears) {
        for (let j of this.years) {
          if (j.year == i) {
            j.disabled = true;
          }
        }
      }
    }
  },

  methods: {
    activateDatePicker() {
      this.showOptions = true;
      this.selectDay = true;
    },

    closeOptions() {
      this.showOptions = false;
      this.selectDay = false;
      this.selectMonth = false;
      this.selectYear = false;
    },

    onSelectDay(e) {
      let date = new Date();
      let year = date.getFullYear();

      this.selectDay = false;
      this.date.day = e.target.innerText;

      for (let i in this.months[this.locale]) {
        let counter = i * 1 + 1;
        let qty = this.getDaysInMonth(counter, year);

        if (this.date.day * 1 > qty) {
          this.months[this.locale][i].disabled = true;
          if (i == 1 && this.date.day == 29) {
            this.months[this.locale][i].disabled = false;
          }
        } else {
          this.months[this.locale][i].disabled = false;
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
  },

  directives: {
    clickOutside
  }
};
</script>

<style module>
.picker {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  position: relative;
  width: 280px;
  border-radius: 6px;
  background-color: white;
  font-weight: bold;
  box-shadow: 0 6px 24px rgba(17, 17, 19, 0.12);
  box-sizing: border-box;
}

.flat {
  box-shadow: none;
  border: 1px solid rgba(17, 17, 19, 0.4);
}

.picker *,
.picker *:before,
.picker *:after {
  box-sizing: inherit;
}

.picker__value {
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

.picker__value span {
  padding: 0 0.5em;
  color: rgba(17, 17, 19, 0.4);
  font-weight: 200;
}

.picker__value .active {
  color: #ee2455;
}

.picker__options {
  overflow: hidden;
  font-size: 0.8em;
}

.picker__options-container {
  width: 840px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  transition: all 0.2s ease-in-out;
}

.picker__options span:hover,
.picker__options span.active {
  background-color: #ee2455;
  color: white;
}

.picker__item span {
  display: inline-block;
  width: calc((100% - 50px) / 5);
  padding: 5px 0;
  margin: 5px;
  text-align: center;
  border-radius: 3px;
  cursor: pointer;
}

.picker__item--month span {
  width: calc((100% - 30px) / 3);
}

.picker__item {
  width: 100%;
  padding: 1em;
}

.picker__item--year {
  max-height: 231px;
  overflow-y: auto;
}

.picker__item--disabled {
  color: rgba(17, 17, 19, 0.4);
  pointer-events: none;
  cursor: not-allowed;
}

/* @supports (grid-area: auto) {
  .picker__item {
    width: 100%;
    padding: 1em;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(35px, 1fr));
    grid-gap: 5px 10px;
  }

  .picker__item--month {
    grid-template-columns: repeat(2, 1fr);
  }

  .picker__item span,
  .picker__item--month span {
    width: auto;
    padding: 5px;
    margin: 0;
  }
} */
</style>