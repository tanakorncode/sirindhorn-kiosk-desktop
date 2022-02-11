<template>
  <div id="iq-top-navbar" class="iq-top-navbar header-top-sticky" style="width: auto; left: 6%; right: 6%">
    <div class="iq-navbar-custom">
      <div class="iq-sidebar-logo">
        <div class="top-logo">
          <router-link to="/" class="logo">
            <img src="@/assets/images/sirintorn.png" class="img-fluid" alt="" />
            <span> Andaman Pattanalp</span>
          </router-link>
        </div>
      </div>
      <nav class="navbar navbar-expand-lg navbar-light p-0" style="min-height: 100px">
        <div class="iq-search-bar">
          <img src="https://qstd3.andamandev.com/uploads/sirintorn.png" width="80px" height="80px" alt="" />
        </div>
        <br />
        <div class="kiosk-title">
          <h1 class="display-6 mb-0 text-white">โรงพยาบาลสิรินธร</h1>
          <h3 class="display-6 mb-0 text-white">Sirindhorn Hospital</h3>
        </div>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="ri-menu-3-line"></i>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent"></div>
        <ul class="navbar-list">
          <li>
            <a href="javascript:void(0);" class="search-toggle iq-waves-effect d-flex align-items-center">
              <div ref="clock" class="caption clock">
                <h4 class="mb-0 line-height text-white time">
                  <span id="kiosk-date"> {{ today }} </span>
                </h4>
                <h5 class="mb-0 line-height text-white time text-right">
                  เวลา <span ref="hours" class="time__hours">20</span><span ref="min" class="time__min">01</span
                  ><span ref="sec" class="time__sec">32</span> น.
                </h5>
              </div>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import moment from "moment";
moment.locale("th");

export default {
  name: "TopNavBar",
  computed: {
    today() {
      return moment().format("วันdddd DD MMMM ") + (parseInt(moment().format("YYYY")) + 543);
    },
  },
  mounted() {
    const _this = this;
    var e = new Date();
    e.setDate(e.getDate()),
      setInterval(function () {
        var e = new Date().getSeconds();
        _this.$refs.sec.innerHTML = (e < 10 ? "0" : "") + e;
        // $(".time__sec").html((e < 10 ? "0" : "") + e)
      }, 1e3),
      setInterval(function () {
        var e = new Date().getMinutes();
        _this.$refs.min.innerHTML = (e < 10 ? "0" : "") + e;
        // $(".time__min").html((e < 10 ? "0" : "") + e)
      }, 1e3),
      setInterval(function () {
        var e = new Date().getHours();
        _this.$refs.hours.innerHTML = (e < 10 ? "0" : "") + e;
        // $(".time__hours").html((e < 10 ? "0" : "") + e)
      }, 1e3);
  },
  methods: {
    moment,
  },
};
</script>

<style lang="scss" scoped>
.time > span.time__hours:not(:last-child):after,
.time > span.time__min:not(:last-child):after,
.time > span.time__sec:not(:last-child):after {
  content: ":";
  width: 10px;
  text-align: center;
  display: inline-block;
  position: relative;
  top: -1px;
  right: -1px;
}

@media (max-width: 1299px) {
  .iq-top-navbar,
  body.sidebar-main .iq-top-navbar {
    width: auto !important;
    left: 7% !important;
    right: 7% !important;
  }
}

@media (min-width: 1300px) {
  body.sidebar-main-menu .iq-top-navbar {
    width: auto !important;
    left: 5% !important;
    right: 5% !important;
  }
}
.iq-top-navbar {
  min-height: 100px;
  background: #17a2b8;
}
</style>
