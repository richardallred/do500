<!-- Todo Header -->
<template id="todo-header">
    <div class="todo-header">
        <div class="overlay"></div>
        <time class="clearfix">
            <span class="day">{{ date }}</span>
            <span class="dayofweek">{{ weekDay }}</span>
            <span class="dayofweek">{{ month }}, {{ year }}</span>
        </time>
    </div>
</template>

<script>
// Array of Month
const month = [
  "January",
  "February",
  "Mach",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "September"
];
const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

export default {
  name: "Header",
  props: {
    name: String
  },
  data: function() {
    return {
      date: "",
      weekDay: "",
      month: "",
      year: ""
    };
  },
  created: function() {
    const d = new Date();
    this.date = d.getDate();
    this.weekDay = weekday[d.getDay()];
    this.month = month[d.getMonth()];
    this.year = d.getFullYear();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// https://github.com/tatthien/vue-todo/blob/master/src/sass/style.scss
@import "../scss/custom.scss";

.todo-header {
  border-radius: 0px;
  // border-radius: 6px 6px 0 0;
  background: url($header_image) no-repeat;
  background-size: cover;
  padding: 55px 20px;
  position: relative;
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.2); /* fallback for old browsers */
    // border-radius: 6px 6px 0 0;
  }
  time {
    color: white;
    display: block;
    position: relative;
    .day {
      font-size: 4em;
      float: left;
      margin-right: 10px;
    }
    .dayofweek {
      display: block;
      margin-top: 13px;
      font-size: 1.4em;
      font-weight: 700;
      text-align: left;
    }
  }
}
</style>
