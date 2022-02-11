<template>
  <div class="kiosk-container">
    <div class="row">
      <div class="col-md-6 col-lg-6"></div>
      <div
        class="col-md-6 col-lg-6"
        style="padding-top: 45px; text-align: right"
      >
        <button
          @click="$i18n.locale = 'th'"
          id="btn-th"
          titel="ภาษาไทย"
          type="button"
          class="btn btn-outline-light"
        >
          <img src="@/assets/images/th.svg" alt="th" width="65px" />
        </button>
        <button
          @click="$i18n.locale = 'en'"
          id="btn-en"
          titel="English"
          type="button"
          class="btn btn-outline-light"
        >
          <img src="@/assets/images/us.svg" alt="en" width="65px" />
        </button>
      </div>
    </div>

    <!-- Begin:: ข้อมูลผู้ป่วย -->
    <section v-if="patient || right">
      <div v-cloak class="row">
        <div class="col-md-12 col-lg-12 col-sm-12">
          <h3>{{ $t("ข้อมูลทั่วไป") }}</h3>
          <div
            class="iq-card iq-card-block iq-card-stretch iq-card-height iq-user-profile-block"
            style="height: 90%"
          >
            <div class="iq-card-body">
              <div class="user-details-block">
                <div
                  class="user-profile text-center"
                  style="
                    background-color: #eeeeee;
                    border-radius: 1.75rem;
                    width: 135px;
                    height: 135px;
                    margin: auto;
                    margin-top: -85px !important;
                  "
                >
                  <img
                    :src="avatar"
                    alt="profile-img"
                    class="avatar-130 img-fluid rounded"
                    style="padding: 15px"
                  />
                </div>
                <div class="text-center mt-3">
                  <h4>
                    <b>{{ patientName }}</b>
                  </h4>
                  <h4>{{ $t("Age") }} {{ age }} {{ $t("Year") }}</h4>
                </div>
                <table class="table">
                  <tbody>
                    <tr>
                      <td class="text-center" style="width: 50%">
                        <h4 class="text-primary">
                          {{ $t("เลขบัตรประจำตัวประชาชน") }}
                        </h4>
                        <h5>{{ cidFormat }}<span></span></h5>
                      </td>
                      <td class="text-center" style="width: 50%">
                        <h4 class="text-primary">{{ $t("สิทธิการรักษา") }}</h4>
                        <h5>{{ rightName }}<span></span></h5>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-center" style="width: 50%">
                        <h4 class="text-primary">
                          {{ $t("หน่วยบริการประจำ") }}
                        </h4>
                        <h5>
                          {{ getRight("hmain_op_name", "-") }}
                          <span></span>
                        </h5>
                      </td>
                      <td class="text-center" style="width: 50%">
                        <h4 class="text-primary">
                          {{ $t("หน่วยบริการปฐมภูมิ") }}
                        </h4>
                        <h5>{{ getRight("hsub_name", "-") }}<span></span></h5>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-center" style="width: 50%">
                        <h4 class="text-primary" style="margin-left: 8%">
                          {{ $t("หน่วยบริการรับส่งต่อ") }}
                        </h4>
                        <h5 style="margin-left: 15%">
                          {{ getRight("hmain_name", "-") }}<span></span>
                        </h5>
                      </td>
                      <td class="text-center"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- end:: ข้อมูลผู้ป่วย -->

    <section v-if="patient || right || action !== 'hn-or-idcard'">
      <div v-cloak class="row pt-5">
        <div class="col-md-12 col-lg-12 col-sm-12" style="padding-top: 15px">
          <div class="service-title">
            <h1>{{ $t("เลือกบริการ") }}</h1>
          </div>

          <div class="row">
            <div
              v-for="(item, index) in services"
              :key="index"
              class="col-md-12 col-lg-12 col-sm-12"
            >
              <a
                href="#"
                class="button-effect"
                @click.prevent="onSelectService(item.serviceid)"
              >
                <div
                  class="iq-card card-section-1"
                  :style="{
                    background:
                      service_id === item.serviceid ? '#ffffff' : '#17a2b8',
                  }"
                >
                  <div class="iq-card-body" style="padding: 10px">
                    <div class="d-flex">
                      <div
                        class="d-flex flex-column flex-grow-1 gutter-b m-auto"
                      >
                        <span
                          class="card-title font-weight-bolder text-dark-75 font-size-h5 mb-2 card-title-option"
                        >
                          <h4
                            :class="{
                              'text-white': service_id !== item.serviceid,
                              'text-success': service_id === item.serviceid,
                            }"
                          >
                            {{ index + 2 }}. {{ $t(item.btn_kiosk_name) }}
                            <i
                              v-show="service_id === item.serviceid"
                              class="far fa-check-circle"
                            ></i>
                          </h4>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <br />
      <div class="row">
        <div class="col-md-4 col-lg-4 col-sm-12">
          <a
            v-if="(patient || right) && !service_id"
            href="#"
            class="button-effect"
            @click.prevent="onCancelAction()"
          >
            <div class="iq-card card-section-2" style="background: #dc3545">
              <div class="iq-card-body" style="padding: 10px">
                <div class="d-flex">
                  <div class="d-flex flex-column flex-grow-1 gutter-b m-auto">
                    <span
                      class="card-title font-weight-bolder text-dark-75 font-size-h5 mb-2 card-title-option text-center"
                    >
                      <h4 class="text-white">
                        <i class="fas fa-arrow-left"></i> {{ $t("Cancel") }}
                      </h4>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div class="col-md-4 col-lg-4 col-sm-12"></div>
        <div class="col-md-4 col-lg-4 col-sm-12"></div>
      </div>
    </section>

    <!-- Begin:: ป้อนเลข HN หรือ เลขบัตรประชาชน -->
    <section
      v-if="!patient && !right && action === 'hn-or-idcard'"
      class="section-scan-idcard"
    >
      <div v-cloak class="row">
        <div class="col-md-12 col-lg-12 col-sm-12" style="padding-top: 140px">
          <div class="text-center" style="padding-top: 46px">
            <h1>{{ $t("Enter your ID Card Number") }}</h1>
          </div>
          <br />
          <form>
            <div class="form-group row mb-0">
              <div class="col-md-8 col-md-offset-2 offset-sm-2">
                <input
                  v-model="search"
                  ref="search"
                  id="input-hn-or-idcard"
                  type="number"
                  max="13"
                  class="form-control form-control-lg text-center bg-white"
                  style="font-size: 2rem; color: #17a2b8"
                  autofocus
                  v-focus
                />
              </div>
            </div>
            <br />
            <div class="form-group row">
              <div class="col-md-8 col-md-offset-2 offset-sm-2">
                <div class="buttons">
                  <div class="button-numpad" @click="onClickNumber(1)">1</div>
                  <div class="button-numpad" @click="onClickNumber(2)">2</div>
                  <div class="button-numpad" @click="onClickNumber(3)">3</div>
                  <div class="button-numpad" @click="onClickNumber(4)">4</div>
                  <div class="button-numpad" @click="onClickNumber(5)">5</div>
                  <div class="button-numpad" @click="onClickNumber(6)">6</div>
                  <div class="button-numpad" @click="onClickNumber(7)">7</div>
                  <div class="button-numpad" @click="onClickNumber(8)">8</div>
                  <div class="button-numpad" @click="onClickNumber(9)">9</div>
                  <div class="button-numpad" @click="onDeleteNumber()">
                    <i class="fas fa-arrow-left"></i>
                  </div>
                  <div class="button-numpad" @click="onClickNumber(0)">0</div>
                  <div class="button-numpad" @click="onClearSearch">
                    <i class="fas fa-times"></i>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-4 col-lg-4 col-sm-12" style="padding-top: 115px">
          <a href="#" class="button-effect" @click.prevent="onCancelAction()">
            <div class="iq-card card-section-2" style="background: #dc3545">
              <div class="iq-card-body" style="padding: 10px">
                <div class="d-flex">
                  <div class="d-flex flex-column flex-grow-1 gutter-b m-auto">
                    <span
                      class="card-title font-weight-bolder text-dark-75 font-size-h5 mb-2 card-title-option text-center"
                    >
                      <h4 class="text-white">
                        <i class="fas fa-arrow-left"></i> {{ $t("Cancel") }}
                      </h4>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div
          class="col-md-4 col-lg-4 col-sm-12"
          style="padding-top: 115px"
        ></div>
        <div
          class="col-md-4 col-lg-4 col-sm-12"
          style="padding-top: 115px"
        ></div>
      </div>
    </section>
    <!-- end:: ป้อนเลข HN หรือ เลขบัตรประชาชน -->

    <section
      v-if="!patient && !right && action !== 'hn-or-idcard'"
      class="section-home"
    >
      <div class="row">
        <div class="col-md-12 col-lg-12 col-sm-12">
          <div class="service-title"><h1>หรือทำรายการโดย</h1></div>
          <div class="text-center">
            <img
              src="@/assets/images/Thai-smart-card.png"
              alt=""
              style="width: 150px"
            />
            <h4>{{ loadingMsg }}</h4>
            <div v-show="loading" class="lds-dual-ring"></div>
            <!---->
          </div>
        </div>
      </div>
      <div class="row">
        <div
          class="col-xl-12 col-sm-12 animated animate__zoomIn faster"
          style=""
        >
          <a
            href="#"
            class="button-effect"
            @click.prevent="onSelectAction('hn-or-idcard')"
          >
            <div class="iq-card card-section-1">
              <div class="iq-card-body">
                <div class="d-flex">
                  <div class="d-flex flex-column flex-grow-1 gutter-b m-auto">
                    <span
                      class="card-title font-weight-bolder text-dark-75 font-size-h5 mb-2 card-title-option"
                    >
                      <h4>{{ $t("Enter your ID Card Number") }}</h4>
                    </span>
                  </div>
                  <div>
                    <img src="@/assets/images/keypad.png" width="65px" alt="" />
                  </div>
                </div>
              </div></div
          ></a>
        </div>
      </div>
    </section>

    <div class="row">
      <div class="col-md-12 col-lg-12 col-sm-12">
        <marquee
          direction="left"
          scrollamount="5"
          style="font-size: 40px; color: rgb(165, 121, 237)"
        >
          {{ news ? news.news_ticker_detail : "" }}
        </marquee>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import _ from "lodash";
import imgpatient from "@/assets/images/patient.png";
const { ipcRenderer, remote } = require("electron");
const BrowserWindow = remote.BrowserWindow;
const EVENTS = {
  PCSC_INITIAL: "PCSC_INITIAL",
  PCSC_CLOSE: "PCSC_CLOSE",

  DEVICE_WAITING: "DEVICE_WAITING",
  DEVICE_CONNECTED: "DEVICE_CONNECTED",
  DEVICE_ERROR: "DEVICE_ERROR",
  DEVICE_DISCONNECTED: "DEVICE_DISCONNECTED",

  CARD_INSERTED: "CARD_INSERTED",
  CARD_REMOVED: "CARD_REMOVED",

  READING_INIT: "READING_INIT",
  READING_START: "READING_START",
  READING_PROGRESS: "READING_PROGRESS",
  READING_COMPLETE: "READING_COMPLETE",
  READING_FAIL: "READING_FAIL",
};

export default {
  name: "Home",
  directives: {
    focus: {
      // directive definition
      inserted: function (el) {
        el.focus();
      },
    },
  },
  data() {
    return {
      message: "Hello Vue!",
      action: "",
      loading: false,
      loading2: false,
      loadingMsg: "เสียบบัตรประชาชน",
      crsfToken: "",
      clientIP: "0.0.0.0",
      search: "",
      patient: null,
      right: null,
      httpConfig: {
        baseURL: window.nodeBaseURL,
      },

      service_id: null,
      services: [],
      age: 0,
      news: null,

      printers: [],
      printer: [],
    };
  },
  computed: {
    patientName: function () {
      if (this.patient) {
        return _.get(this.patient, "fullname", "ชื่อ-นามสกุล");
      } else if (this.right) {
        const title = _.get(this.right, "title_name", "");
        const fname = _.get(this.right, "fname", "");
        const lname = _.get(this.right, "lname", "");
        return `${title}${fname} ${lname}`;
      }
      return "ชื่อ-นามสกุล";
    },
    hn: function () {
      return _.get(this.patient, "hn", "-");
    },
    cid: function () {
      if (this.patient) {
        return _.get(this.patient, "citizenId", "");
      } else if (this.right) {
        return _.get(this.right, "person_id", "");
      }
      return "";
    },
    cidFormat: function () {
      if (this.patient) {
        return (
          String(_.get(this.patient, "citizenId", "")).substr(0, 9) + "XXXX"
        );
      } else if (this.right) {
        return String(_.get(this.right, "person_id", "")).substr(0, 9) + "XXXX";
      }
      return "-";
    },
    rightName: function () {
      return _.get(this.right, "maininscl_name", "-");
    },
    avatar: function () {
      return _.get(this.patient, "photo", imgpatient);
    },
    disabledStyle: function () {
      if (!this.service_id) {
        return {
          cursor: "not-allowed",
          pointerEvents: "none",
        };
      }
      return {};
    },
    opacity: function () {
      if (!this.service_id) {
        return 0.65;
      }
      return null;
    },
    printerName() {
      return _.get(this.printer, "name");
    },
  },
  watch: {
    action: function (newVal, oldVal) {
      if (newVal === "hn-or-idcard") {
        // ป้อน HN หรือเลขบัตร ปชช
      }
    },
    search: function (newVal, oldVal) {
      if (String(newVal).length === 13) {
        this.onConfirmSearch();
      }
    },
  },
  beforeMount() {
    this.sockets.subscribe("setting", (data) => {
      this.getMessages();
      this.getClientIP();
      this.fetchDataServices();
      this.getNews();
    });
  },
  beforeDestroy() {
    this.sockets.unsubscribe("setting");
  },
  mounted() {
    this.$nextTick(function () {
      this.handleAppEvent();
      this.getMessages();
      this.fetchDataServices();
      this.getClientIP();
      this.getNews();
      this.onSmartCardHandler();

      //   this.$socket
      //     .on("connect", () => {
      //       this.getClientIP();
      //     })
      //     .on("disconnect", (reason) => {
      //       // console.log(reason);
      //       if (reason === "io server disconnect") {
      //         // the disconnection was initiated by the server, you need to reconnect manually
      //         this.$socket.connect();
      //       }
      //     });
    });
    // const job = schedule.scheduleJob("0 * * * *", function () {
    //   ipcRenderer.send("check-for-update");
    // });
  },
  methods: {
    handleAppEvent() {
      ipcRenderer.on("getPrinters", (event, printers) => {
        this.printers = printers;
        for (let i in printers) {
          if (printers[i].isDefault) {
            this.printer = printers[i];
          }
        }
      });
      ipcRenderer.send("getPrinters");
    },
    getClientIP: async function () {
      try {
        const ip = await this.$http.get("/api2/v1/kiosk/client-ip");
        this.clientIP = ip;
        // this.onSmartCardHandler()
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      }
    },
    getMessages: async function () {
      try {
        const messages = await this.$http.get("/api2/v1/kiosk/messages");
        this.$i18n.setLocaleMessage("th", messages.th.message);
        this.$i18n.setLocaleMessage("en", messages.en.message);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      }
    },

    getNews: async function () {
      try {
        const news = await this.$http.get("/api2/v1/kiosk/news");
        this.news = news;
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      }
    },

    // รายชื่องานบริการ
    fetchDataServices: async function () {
      try {
        const services = await this.$http.get("/api2/v1/kiosk/services");
        this.services = services;
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      }
    },

    onSmartCardHandler: function () {
      const _this = this;
      ipcRenderer.on(EVENTS.DEVICE_CONNECTED, (event, arg) => {
        _this.setRight(null);
        _this.setProfile(null);
        _this.setLoadingMessage("อุปกรณ์กำลังเชื่อมต่อ...");
        setTimeout(() => {
          _this.setLoadingMessage("เสียบบัตรประชาชน");
        }, 1500);
      });
      ipcRenderer.on(EVENTS.CARD_INSERTED, (event, arg) => {
        _this.setRight(null);
        _this.setProfile(null);
        _this.setLoadingMessage("เสียบบัตร");
        setTimeout(() => {
          _this.setLoadingMessage("กรุณารอสักครู่...");
        }, 1000);
      });
      ipcRenderer.on(EVENTS.READING_START, (event, arg) => {
        _this.setRight(null);
        _this.setProfile(null);
        _this.setLoading(true);
        _this.setLoadingMessage("กำลังอ่านข้อมูลบัตร");
      });
      ipcRenderer.on(EVENTS.READING_COMPLETE, async (event, profile) => {
        console.log(profile);
        _this.onCardRedingCompleted(profile);
      });
      ipcRenderer.on(EVENTS.READING_FAIL, (event, arg) => {
        _this.setRight(null);
        _this.setProfile(null);
        _this.setLoading(false);
        _this.setLoadingMessage("เสียบบัตรประชาชน");
      });
      ipcRenderer.on(EVENTS.CARD_REMOVED, (event, arg) => {
        _this.setRight(null);
        _this.setProfile(null);
        _this.setLoading(false);
        _this.setLoadingMessage("เสียบบัตรประชาชน");
      });
      ipcRenderer.on(EVENTS.DEVICE_DISCONNECTED, (event, arg) => {
        _this.setRight(null);
        _this.setProfile(null);
        _this.setLoading(false);
        _this.setLoadingMessage("เสียบบัตรประชาชน");
      });
    },

    setLoading: function (loading = false) {
      this.loading = loading;
    },
    setLoadingMessage: function (message = "") {
      this.loadingMsg = message;
    },

    init: function () {
      this.getClientIP();
    },

    onSelectAction: function (action) {
      this.action = action;
    },
    onSelectLanguage: function (locale) {
      this.$i18n.locale = locale;
      this.action = "select-language";
    },
    onCancelAction: function () {
      this.action = "";
      this.search = "";
      this.loading = false;
      this.loading2 = false;
      this.loadingMsg = "เสียบบัตรประชาชน";
      this.service_id = null;
      this.age = 0;
      this.setRight(null);
      this.setProfile(null);
      this.$i18n.locale = "th";
    },

    async onCardRedingCompleted(profile) {
      const _this = this;
      if (this.loading2) return;
      try {
        _this.loading2 = true;
        _this.age = _.get(profile, "age", 0);
        // get right
        await _this.fetchPatientRight(profile.citizenId);
        _this.setProfile(profile);
        _this.setLoading(false);
        _this.setLoadingMessage("เสียบบัตรประชาชน");
        if (_this.right) {
          // UCS = สิทธิหลักประกันสุขภาพแห่งชาติ
          // WEL = สิทธิหลักประกันสุขภาพแห่งชาติ (ยกเว้นการร่วมจ่ายค่าบริการ 30 บาท)
          // hmain 15049 = รพ.สิรินธร
          if (
            _this.right.hmain === "15049" &&
            (_this.right.maininscl === "WEL" || _this.right.maininscl === "UCS")
          ) {
            //เป็นสิทธิบัตรทองโรงพยาบาลสิรินท
            //  เป็นสิทธิ ผู้สูงอายุ ๖๐-๗๙
            if (_this.right.paid_model === "5") {
              Swal.fire({
                icon: "warning",
                title: _this.$t("กรุณาติดต่อห้องเบอร์ 1"),
                confirmButtonText: "ปิด",
                width: "60%",
                timer: 3000,
                timerProgressBar: true,
                showConfirmButton: false,
                didOpen: () => {
                  Swal.getTitle().style.fontSize = "5rem";
                  Swal.getTitle().style.padding = "0 1em 0";
                  Swal.getConfirmButton().style.fontSize = "3rem";
                  Swal.getConfirmButton().style.width = "200px";
                  Swal.getIcon().style.fontSize = "2rem";
                },
                willClose: () => {
                  _this.onCancelAction();
                },
              });
            } else if (_this.age >= 60 && _this.age <= 79) {
              _this.service_id = "39";
              Swal.close();
              _this.onCreateQueue();
            } else if (_this.age >= 80) {
              // สิทธิผู้สูงอายุ ๘๐ ขึ้นไป
              _this.service_id = "42";
              Swal.close();
              _this.onCreateQueue();
            } else {
              _this.service_id = "38";
              Swal.close();
              _this.onCreateQueue();
            }
          } else if (
            _this.right.hmain !== "15049" &&
            (_this.right.maininscl === "WEL" || _this.right.maininscl === "UCS")
          ) {
            //_this.service_id = "40";
            //  _this.onCreateQueue(autoConfirm);
            Swal.fire({
              title: _this.$t(
                "คุณมี ใบส่งตัว/ใบ Refer มาพร้อมการรักษาวันนี้หรือไม่?"
              ),
              text: "",
              icon: "question",
              width: "60%",
              showCancelButton: true,
              reverseButtons: true,
              allowOutsideClick: false,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: _this.$t("มี"),
              cancelButtonText: _this.$t("ไม่มี"),
              didOpen: () => {
                Swal.getTitle().style.fontSize = "5rem";
                Swal.getTitle().style.padding = "0 1em 0";
                Swal.getConfirmButton().style.fontSize = "3rem";
                Swal.getConfirmButton().style.width = "200px";
                Swal.getCancelButton().style.fontSize = "3rem";
                Swal.getCancelButton().style.width = "200px";
                Swal.getIcon().style.fontSize = "2rem";
              },
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire({
                  icon: "warning",
                  title: _this.$t("กรุณาติดต่อห้องเบอร์ 1"),
                  confirmButtonText: "ปิด",
                  width: "60%",
                  timer: 3000,
                  timerProgressBar: true,
                  showConfirmButton: false,
                  didOpen: () => {
                    Swal.getTitle().style.fontSize = "5rem";
                    Swal.getTitle().style.padding = "0 1em 0";
                    Swal.getConfirmButton().style.fontSize = "3rem";
                    Swal.getConfirmButton().style.width = "200px";
                    Swal.getIcon().style.fontSize = "2rem";
                  },
                  willClose: () => {
                    _this.onCancelAction();
                  },
                });
              } else {
                _this.service_id = "40";
                _this.onCreateQueue();
              }
            });
          } else if (
            _this.right.hmain === "15049" &&
            _this.right.maininscl === "SSS"
          ) {
            //สิทธิประกันสังคมโรงพยาบาลสิรินธร
            Swal.fire({
              icon: "warning",
              title: _this.$t("กรุณาติดต่อห้องเบอร์ 1"),
              confirmButtonText: "ปิด",
              width: "60%",
              timer: 3000,
              timerProgressBar: true,
              showConfirmButton: false,
              didOpen: () => {
                Swal.getTitle().style.fontSize = "5rem";
                Swal.getTitle().style.padding = "0 1em 0";
                Swal.getConfirmButton().style.fontSize = "3rem";
                Swal.getConfirmButton().style.width = "200px";
                Swal.getIcon().style.fontSize = "2rem";
              },
              willClose: () => {
                _this.onCancelAction();
              },
            });
          } else if (["OFC", "LGO", "OFL"].includes(_this.right.maininscl)) {
            //สิทธิข้าราชการ
            Swal.close();
          } else if (["VOF", "PVT", "VOG"].includes(_this.right.maininscl)) {
            //สิทธิทหารผ่านศึก/สิทธิข้าราชการ/สิทธิหน่วยงานรัฐ
            Swal.close();
            _this.service_id = "40";
            _this.onCreateQueue();
          } else {
            //สิทธิอื่นๆ ชำระเงินเอง / รัฐวิสาหกิจ / ประกันสุขภาพโรงพยาบาลอื่นๆ (ยกเว้น สิทธิหลักประกันสุขภาพแห่งชาติและสิทธิประกันสังคมโรงพยาบาลสิรินธร)
            Swal.close();
            _this.service_id = "40";
            _this.onCreateQueue();
          }
        } else {
          Swal.fire({
            icon: "warning",
            title: _this.$t("ไม่พบข้อมูลสิทธิการรักษา"),
            confirmButtonText: "ปิด",
            width: "60%",
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
            didOpen: () => {
              Swal.getTitle().style.fontSize = "5rem";
              Swal.getTitle().style.padding = "0 1em 0";
              Swal.getConfirmButton().style.fontSize = "3rem";
              Swal.getConfirmButton().style.width = "200px";
              Swal.getIcon().style.fontSize = "2rem";
            },
            willClose: () => {
              _this.onCancelAction();
            },
          });
        }
        _this.loading2 = false;
      } catch (error) {
        _this.loading2 = false;
        _this.setLoading(false);
        _this.setLoadingMessage("เสียบบัตรประชาชน");
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      }
    },

    decryptData: async function (encrypted) {
      const _this = this;
      if (this.loading2) return;
      try {
        _this.loading2 = true;
        const body = { encrypted: encrypted };
        const profile = await this.$http.post(
          "/api/queue/decrypt-data",
          body,
          _this.httpConfig
        );
        _this.age = _.get(profile, "age", 0);
        // get right
        await _this.fetchPatientRight(profile.citizenId);
        _this.setProfile(profile);
        _this.setLoading(false);
        _this.setLoadingMessage("เสียบบัตรประชาชน");
        if (_this.right) {
          // UCS = สิทธิหลักประกันสุขภาพแห่งชาติ
          // WEL = สิทธิหลักประกันสุขภาพแห่งชาติ (ยกเว้นการร่วมจ่ายค่าบริการ 30 บาท)
          // hmain 15049 = รพ.สิรินธร
          if (
            _this.right.hmain === "15049" &&
            (_this.right.maininscl === "WEL" || _this.right.maininscl === "UCS")
          ) {
            //เป็นสิทธิบัตรทองโรงพยาบาลสิรินท
            //  เป็นสิทธิ ผู้สูงอายุ ๖๐-๗๙
            if (_this.right.paid_model === "5") {
              Swal.fire({
                icon: "warning",
                title: _this.$t("กรุณาติดต่อห้องเบอร์ 1"),
                confirmButtonText: "ปิด",
                width: "60%",
                timer: 3000,
                timerProgressBar: true,
                showConfirmButton: false,
                didOpen: () => {
                  Swal.getTitle().style.fontSize = "5rem";
                  Swal.getTitle().style.padding = "0 1em 0";
                  Swal.getConfirmButton().style.fontSize = "3rem";
                  Swal.getConfirmButton().style.width = "200px";
                  Swal.getIcon().style.fontSize = "2rem";
                },
                willClose: () => {
                  _this.onCancelAction();
                },
              });
            } else if (_this.age >= 60 && _this.age <= 79) {
              _this.service_id = "39";
              Swal.close();
              _this.onCreateQueue();
            } else if (_this.age >= 80) {
              // สิทธิผู้สูงอายุ ๘๐ ขึ้นไป
              _this.service_id = "42";
              Swal.close();
              _this.onCreateQueue();
            } else {
              _this.service_id = "38";
              Swal.close();
              _this.onCreateQueue();
            }
          } else if (
            _this.right.hmain !== "15049" &&
            (_this.right.maininscl === "WEL" || _this.right.maininscl === "UCS")
          ) {
            //_this.service_id = "40";
            //  _this.onCreateQueue(autoConfirm);
            Swal.fire({
              title: _this.$t(
                "คุณมี ใบส่งตัว/ใบ Refer มาพร้อมการรักษาวันนี้หรือไม่?"
              ),
              text: "",
              icon: "question",
              width: "60%",
              showCancelButton: true,
              reverseButtons: true,
              allowOutsideClick: false,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: _this.$t("มี"),
              cancelButtonText: _this.$t("ไม่มี"),
              didOpen: () => {
                Swal.getTitle().style.fontSize = "5rem";
                Swal.getTitle().style.padding = "0 1em 0";
                Swal.getConfirmButton().style.fontSize = "3rem";
                Swal.getConfirmButton().style.width = "200px";
                Swal.getCancelButton().style.fontSize = "3rem";
                Swal.getCancelButton().style.width = "200px";
                Swal.getIcon().style.fontSize = "2rem";
              },
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire({
                  icon: "warning",
                  title: _this.$t("กรุณาติดต่อห้องเบอร์ 1"),
                  confirmButtonText: "ปิด",
                  width: "60%",
                  timer: 3000,
                  timerProgressBar: true,
                  showConfirmButton: false,
                  didOpen: () => {
                    Swal.getTitle().style.fontSize = "5rem";
                    Swal.getTitle().style.padding = "0 1em 0";
                    Swal.getConfirmButton().style.fontSize = "3rem";
                    Swal.getConfirmButton().style.width = "200px";
                    Swal.getIcon().style.fontSize = "2rem";
                  },
                  willClose: () => {
                    _this.onCancelAction();
                  },
                });
              } else {
                _this.service_id = "40";
                _this.onCreateQueue();
              }
            });
          } else if (
            _this.right.hmain === "15049" &&
            _this.right.maininscl === "SSS"
          ) {
            //สิทธิประกันสังคมโรงพยาบาลสิรินธร
            Swal.fire({
              icon: "warning",
              title: _this.$t("กรุณาติดต่อห้องเบอร์ 1"),
              confirmButtonText: "ปิด",
              width: "60%",
              timer: 3000,
              timerProgressBar: true,
              showConfirmButton: false,
              didOpen: () => {
                Swal.getTitle().style.fontSize = "5rem";
                Swal.getTitle().style.padding = "0 1em 0";
                Swal.getConfirmButton().style.fontSize = "3rem";
                Swal.getConfirmButton().style.width = "200px";
                Swal.getIcon().style.fontSize = "2rem";
              },
              willClose: () => {
                _this.onCancelAction();
              },
            });
          } else if (["OFC", "LGO", "OFL"].includes(_this.right.maininscl)) {
            //สิทธิข้าราชการ
            Swal.close();
          } else if (["VOF", "PVT", "VOG"].includes(_this.right.maininscl)) {
            //สิทธิทหารผ่านศึก/สิทธิข้าราชการ/สิทธิหน่วยงานรัฐ
            Swal.close();
            _this.service_id = "40";
            _this.onCreateQueue();
          } else {
            //สิทธิอื่นๆ ชำระเงินเอง / รัฐวิสาหกิจ / ประกันสุขภาพโรงพยาบาลอื่นๆ (ยกเว้น สิทธิหลักประกันสุขภาพแห่งชาติและสิทธิประกันสังคมโรงพยาบาลสิรินธร)
            Swal.close();
            _this.service_id = "40";
            _this.onCreateQueue();
          }
        } else {
          Swal.fire({
            icon: "warning",
            title: _this.$t("ไม่พบข้อมูลสิทธิการรักษา"),
            confirmButtonText: "ปิด",
            width: "60%",
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
            didOpen: () => {
              Swal.getTitle().style.fontSize = "5rem";
              Swal.getTitle().style.padding = "0 1em 0";
              Swal.getConfirmButton().style.fontSize = "3rem";
              Swal.getConfirmButton().style.width = "200px";
              Swal.getIcon().style.fontSize = "2rem";
            },
            willClose: () => {
              _this.onCancelAction();
            },
          });
        }
        _this.loading2 = false;
      } catch (error) {
        _this.loading2 = false;
        _this.setLoading(false);
        _this.setLoadingMessage("เสียบบัตรประชาชน");
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      }
    },

    fetchPatientRight: async function (cid) {
      const _this = this;
      try {
        const right = await this.$http.get(
          `/node/api/queue/patient-right/${cid}`
        );
        this.setRight(_.get(right, "data"));
        if (_.get(right, "data")) {
          const response = await this.$http.post(
            `/node/api/queue/calculate-age`,
            {
              birthdate: _.get(right, "data.birthdate"),
            }
          );
          _this.age = _.get(response, "age", 0);
        }
        return right;
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      }
    },

    onClickNumber(number) {
      const search = this.search;
      if (search.length < 13) {
        this.search = search + number.toString();
        setTimeout(() => {
          this.$refs.search.focus();
        }, 0);
      }
    },
    onClearSearch() {
      this.search = "";
      setTimeout(() => {
        this.$refs.search.focus();
      }, 0);
    },
    onDeleteNumber() {
      if (this.search) {
        this.search = this.search.substr(0, this.search.length - 1);
        setTimeout(() => {
          this.$refs.search.focus();
        }, 0);
      }
    },

    setProfile: function (profile) {
      this.patient = profile;
    },
    setRight: function (right) {
      this.right = right;
    },

    onConfirmSearch: async function () {
      const _this = this;
      if (!_this.search) {
        Swal.fire({
          icon: "warning",
          title: "",
          text: _this.$t(
            "กรุณาป้อนหมายเลขบัตรประจำตัวประชาชนที่ต้องการทำรายการ"
          ),
        });
      } else {
        try {
          Swal.fire({
            title: "Please wait...",
            text: _this.$t("กำลังตรวจสอบข้อมูล"),
            timerProgressBar: true,
            allowOutsideClick: false,
            // timer: 3000,
            didOpen: () => {
              Swal.showLoading();
            },
          });
          await _this.fetchPatientRight(_this.search);
          if (_this.right) {
            // UCS = สิทธิหลักประกันสุขภาพแห่งชาติ
            // WEL = สิทธิหลักประกันสุขภาพแห่งชาติ (ยกเว้นการร่วมจ่ายค่าบริการ 30 บาท)
            // hmain 15049 = รพ.สิรินธร
            if (
              _this.right.hmain === "15049" &&
              (_this.right.maininscl === "WEL" ||
                _this.right.maininscl === "UCS")
            ) {
              if (_this.right.paid_model === "5") {
                //เป็น model 5
                Swal.fire({
                  icon: "warning",
                  title: _this.$t("กรุณาติดต่อห้องเบอร์ 1"),
                  confirmButtonText: "ปิด",
                  width: "60%",
                  timer: 3000,
                  timerProgressBar: true,
                  showConfirmButton: false,
                  didOpen: () => {
                    Swal.getTitle().style.fontSize = "5rem";
                    Swal.getTitle().style.padding = "0 1em 0";
                    Swal.getConfirmButton().style.fontSize = "3rem";
                    Swal.getConfirmButton().style.width = "200px";
                    Swal.getIcon().style.fontSize = "2rem";
                  },
                  willClose: () => {
                    _this.onCancelAction();
                  },
                });
              } else if (_this.age >= 60 && _this.age <= 79) {
                //  เป็นสิทธิ ผู้สูงอายุ ๖๐-๗๙
                _this.service_id = "39";
                Swal.close();
                _this.onCreateQueue();
              } else if (_this.age >= 80) {
                // สิทธิผู้สูงอายุ ๘๐ ขึ้นไป
                _this.service_id = "42";
                Swal.close();
                _this.onCreateQueue();
              } else {
                _this.service_id = "38";
                Swal.close();
                _this.onCreateQueue();
              }
            } else if (
              _this.right.hmain !== "15049" &&
              (_this.right.maininscl === "WEL" ||
                _this.right.maininscl === "UCS")
            ) {
              //_this.service_id = "40";
              //  _this.onCreateQueue(autoConfirm);
              Swal.fire({
                title: _this.$t(
                  "คุณมี ใบส่งตัว/ใบ Refer มาพร้อมการรักษาวันนี้หรือไม่?"
                ),
                text: "",
                icon: "question",
                width: "60%",
                showCancelButton: true,
                reverseButtons: true,
                allowOutsideClick: false,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: _this.$t("มี"),
                cancelButtonText: _this.$t("ไม่มี"),
                didOpen: () => {
                  Swal.getTitle().style.fontSize = "5rem";
                  Swal.getTitle().style.padding = "0 1em 0";
                  Swal.getConfirmButton().style.fontSize = "3rem";
                  Swal.getConfirmButton().style.width = "200px";
                  Swal.getCancelButton().style.fontSize = "3rem";
                  Swal.getCancelButton().style.width = "200px";
                  Swal.getIcon().style.fontSize = "2rem";
                },
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire({
                    icon: "warning",
                    title: _this.$t("กรุณาติดต่อห้องเบอร์ 1"),
                    confirmButtonText: "ปิด",
                    width: "60%",
                    timer: 3000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    didOpen: () => {
                      Swal.getTitle().style.fontSize = "5rem";
                      Swal.getTitle().style.padding = "0 1em 0";
                      Swal.getConfirmButton().style.fontSize = "3rem";
                      Swal.getConfirmButton().style.width = "200px";
                      Swal.getIcon().style.fontSize = "2rem";
                    },
                    willClose: () => {
                      _this.onCancelAction();
                    },
                  });
                } else {
                  _this.service_id = "40";
                  _this.onCreateQueue();
                }
              });
            } else if (
              _this.right.hmain === "15049" &&
              _this.right.maininscl === "SSS"
            ) {
              //สิทธิประกันสังคมโรงพยาบาลสิรินธร
              Swal.fire({
                icon: "warning",
                title: _this.$t("กรุณาติดต่อห้องเบอร์ 1"),
                confirmButtonText: "ปิด",
                width: "60%",
                timer: 3000,
                timerProgressBar: true,
                showConfirmButton: false,
                didOpen: () => {
                  Swal.getTitle().style.fontSize = "5rem";
                  Swal.getTitle().style.padding = "0 1em 0";
                  Swal.getConfirmButton().style.fontSize = "3rem";
                  Swal.getConfirmButton().style.width = "200px";
                  Swal.getIcon().style.fontSize = "2rem";
                },
                willClose: () => {
                  _this.onCancelAction();
                },
              });
            } else if (["OFC", "LGO", "OFL"].includes(_this.right.maininscl)) {
              //สิทธิข้าราชการ
              Swal.close();
            } else if (["VOF", "PVT", "VOG"].includes(_this.right.maininscl)) {
              //สิทธิทหารผ่านศึก/สิทธิข้าราชการ/สิทธิหน่วยงานรัฐ
              Swal.close();
              _this.service_id = "40";
              _this.onCreateQueue();
            } else {
              //สิทธิอื่นๆ ชำระเงินเอง / รัฐวิสาหกิจ / ประกันสุขภาพโรงพยาบาลอื่นๆ (ยกเว้น สิทธิหลักประกันสุขภาพแห่งชาติและสิทธิประกันสังคมโรงพยาบาลสิรินธร)
              Swal.close();
              _this.service_id = "40";
              _this.onCreateQueue();
            }
          } else {
            Swal.fire({
              icon: "warning",
              title: _this.$t("ไม่พบข้อมูลสิทธิการรักษา"),
              confirmButtonText: "ปิด",
              width: "60%",
              timer: 3000,
              timerProgressBar: true,
              showConfirmButton: false,
              didOpen: () => {
                Swal.getTitle().style.fontSize = "5rem";
                Swal.getTitle().style.padding = "0 1em 0";
                Swal.getConfirmButton().style.fontSize = "3rem";
                Swal.getConfirmButton().style.width = "200px";
                Swal.getIcon().style.fontSize = "2rem";
              },
              willClose: () => {
                _this.onCancelAction();
              },
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
          });
        }
      }
    },

    onSelectService: function (serviceId) {
      this.service_id = serviceId;
      this.onCreateQueue();
    },

    onCreateQueue: async function (autoConfirm = false) {
      const _this = this;
      if (!_this.service_id) {
        Swal.fire({
          icon: "warning",
          title: _this.$t("กรุณาเลือกบริการ"),
          text: "",
        });
        return;
      } else {
        try {
          Swal.fire({
            title: _this.$t("กรุณารอสักครู่..."),
            text: _this.$t("ระบบกำลังทำรายการ"),
            timerProgressBar: true,
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
              Swal.clickConfirm();
            },
          });
          const body = {
            service_id: _this.service_id,
            cid: _this.cid,
            patient_name: _this.patientName,
            age: String(_this.age),
            maininscl_name: _this.rightName,
            picture: _.get(_this.patient, "photo"),
            right: _this.right,
            locale: _this.$i18n.locale,
          };
          const created = await this.$http.post(
            `/node/api/queue/create-queue`,
            body
          );
          this.$socket.emit("register", created);
          this.printTicket(
            `${process.env.VUE_APP_API_BASE_URL}/queue/kiosk/print-ticket2?id=${created.modelQueue.q_ids}`
          );
          //   window.open(`/queue/kiosk/print-ticket?id=${created.modelQueue.q_ids}`, 'myPrint', 'width=800, height=600')
          Swal.fire({
            icon: "success",
            title: _this.$t("กรุณารอรับบัตรคิว"),
            text: "",
            timer: 3000,
            showConfirmButton: false,
          });

          _this.onCancelAction();
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
          });
        }
      }
    },

    getPatientname: function () {
      if (this.action === "scan-idcard" && this.patient) {
        return _.get(this.patient, "fullname", "");
      } else if (this.action === "hn-or-idcard" && this.right) {
        const title = _.get(this.right, "title_name", "");
        const fname = _.get(this.right, "fname", "");
        const lname = _.get(this.right, "lname", "");
        return `${title}${fname} ${lname}`;
      }
      return "";
    },
    getRight: function (field, defaultValue = "") {
      return _.get(this.right, field, defaultValue);
    },
    printTicket(url) {
      const options = {
        silent: false,
        deviceName: this.printerName,
        color: false,
        collate: false,
        pageSize: "Letter",
        margins: {
          marginType: "custom",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        },
        printBackground: false,
        printSelectionOnly: false,
      };
      let win = new BrowserWindow({
        width: 500,
        height: 600,
        show: true,
        webPreferences: {
          nodeIntegration: false,
          contextIsolation: false,
          enableRemoteModule: true,
        },
      });

      win.loadURL(url);
      win.webContents.on("did-finish-load", function () {
        win.webContents.print(options, (success, failureReason) => {
          if (!success) console.log(failureReason);
          //   win.close()
        });
      });
    },
  },
};
</script>

<style scoped>
.kiosk-container {
  padding: 20px;
}
.card-section-1,
.card-section-button,
.card-section-button-floor,
.card-section-button-service {
  transition: all 0.4s ease-in;
  border-radius: 7rem;
  box-shadow: 0px 10px 5px #dedede;
  border: 1px solid rgb(23, 162, 184);
}
.card-section-2 {
  transition: all 0.4s ease-in;
  border-radius: 7rem;
  box-shadow: 0 10px 0 rgb(0 0 0 / 20%);
  border: 1px solid #ffffff;
}
.card-section-1:hover,
.card-section-2:hover,
.card-section-button:hover {
  background: rgb(23, 162, 184)
    radial-gradient(circle, transparent 1%, rgb(23, 162, 184) 0) 50%/15000%;
  transform: scale(1.05);
}
.card-section-button-floor:hover,
.card-section-button-service:hover {
  background: rgb(23, 162, 184)
    radial-gradient(circle, transparent 1%, rgb(23, 162, 184) 0) 50%/15000% !important;
  transform: scale(1.05);
}

.card-section-1:hover h1,
.card-section-1:hover h2,
.card-section-1:hover h3,
.card-section-1:hover h4,
.card-section-1:hover h5,
.card-section-1:hover h6,
.card-section-button:hover h1,
.card-section-button:hover h2,
.card-section-button:hover h3,
.card-section-button:hover h4,
.card-section-button:hover h5,
.card-section-button:hover h6 {
  color: #fff !important;
}
.card-section-button-floor:hover h1,
.card-section-button-floor:hover h2,
.card-section-button-floor:hover h3,
.card-section-button-floor:hover h4,
.card-section-button-floor:hover h5,
.card-section-button-floor:hover h6,
.card-section-button-service:hover h1,
.card-section-button-service:hover h2,
.card-section-button-service:hover h3,
.card-section-button-service:hover h4,
.card-section-button-service:hover h5,
.card-section-button-service:hover h6 {
  color: #fff !important;
}
.card-section-button-service:focus:before {
  animation: effect_dylan 0.5s ease-out;
}
.text-shadow {
  text-shadow: 3px 1px 0 rgb(0 0 0 / 20%);
}

.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid rgb(23, 162, 184);
  border-color: rgb(23, 162, 184) transparent rgb(23, 162, 184) transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* numpad style */
.buttons {
  display: flex;
  font-family: Helvetica;
  font-weight: 400;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 0 auto;
  width: 310px;
}

.button-numpad {
  border: 1px solid #006494;
  border-radius: 50px;
  color: #006494;
  cursor: pointer;
  display: inline-block;
  font-size: 26px;
  height: 80px;
  line-height: 80px;
  margin: 10px;
  text-align: center;
  width: 80px;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}

.button-numpad:hover {
  background-color: #006494;
  color: #ffffff;
}
.iq-card-body {
  padding: 20px;
  font-size: 30px;
}
.button-effect {
  cursor: pointer;
  transition: all 0.4s ease-in;
}
.button-effect span[class^="ion"] {
  position: relative;
}
.button-effect:before {
  content: "";
  background-color: #d3d4d4;
  border-radius: 10%;
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: scale(0.001, 0.001);
}
.button-effect:focus {
  outline: 0;
  color: #fff;
}
.button-effect:focus:before {
  animation: effect_dylan 0.5s ease-out;
}
@keyframes effect_dylan {
  50% {
    transform: scale(1.5, 1.5);
    opacity: 0;
  }
  99% {
    transform: scale(0.001, 0.001);
    opacity: 0;
  }
  100% {
    transform: scale(0.001, 0.001);
    opacity: 1;
  }
}

.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid rgb(23, 162, 184);
  border-color: rgb(23, 162, 184) transparent rgb(23, 162, 184) transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
