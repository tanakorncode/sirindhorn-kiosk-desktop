<template>
  <div id="app">
    <div class="wrapper">
      <TopNavBar />
      <div class="content-page" id="content-page">
        <router-view />
      </div>
    </div>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
  </div>
</template>

<script>
import TopNavBar from "@/components/Kiosk/TopNavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/assets/css/typography.min.css";
import "@/assets/css/style.css";
import "@/assets/css/responsive.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default {
  name: "sirindhorn-kiosk-desktop",
  components: {
    TopNavBar,
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Poppins:200,200i,300,400,500,600,700,800,900|Roboto:300,400,500,600,700|Sarabun:300,400,500,600,700|Sriracha:300,400,500,600,700|Prompt:300,400,500,600,700");
/* CSS */
#content-page {
  margin-left: 80px;
  margin-right: 80px;
  border-radius: 25px;
}
body {
  font-family: Poppins, sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  line-height: 1.8;
  padding: 0;
  margin: 0;
  color: #a09e9e;
  background: #eff7f8;
}
</style>
