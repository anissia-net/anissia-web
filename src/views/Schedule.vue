<template>
  <div class="color-picker-closer-area" @click="closerColorPicker">
    <div class="basic-layout">
      <div class="basic-layout-right">
        <div class="base-mat">
          <AnimeRank />
        </div>
      </div>
      <div id="schedule" class="basic-layout-main">
        <div class="base-mat">

          <!-- 애니편성표 모바일 [시작] -->
          <div class="pc-hide">
            <div class="doc-title">애니편성표</div>
            <div class="doc-desc">
              <table class="schedule-table schedule-application">
                <tr>
                  <td style="min-width:90px;"><a href="/schedule/2015" target="_blank">애니편성표</a></td>
                  <td>최신버전 편성표</td>
                </tr>
                <tr>
                  <td><a href="/schedule/2009" target="_blank">애니편성표<br/>(구버전)</a></td>
                  <td>2009년에 만들어진 편성표<br/>제거될 예정이었지만 이 디자인을 선호하는 사람이 많아 레트로 버전으로 유지중</td>
                </tr>
              </table>
            </div>
          </div>
          <!-- 애니편성표 모바일 [종료] -->
          <!-- 애니편성표 소스 생성기 [시작] -->
          <div class="mob-hide">
            <div class="schedule-docs-header">
              <div class="link">애니편성표: <a href="/schedule/2015" target="_blank">바로가기</a> | <a href="/schedule/2009" target="_blank">구버전</a> | <router-link to="/introduce">연혁</router-link></div>
              <div class="info">제작 : <a href="https://gs.saro.me" target="_blank">가리사니</a></div>
            </div>
            <div class="html-gen">
              <table class="tool-preview">
                <tr>
                  <td class="tool-main">
                    <div class="preview-error" v-if="previewError != ''" v-html="previewError"></div>
                    <div v-else>
                      <iframe v-if="mode === 'html'" class="preview-border" src="/schedule/2015" ref="html" :width="htmlWidth" :height="htmlHeight" @load="this.colorModeHtml(this.colorScheme)"></iframe>
                      <div v-else-if="mode === 'img'" class="preview-img preview-border" :style="({width: `${imgWidth}px`,height: `${imgHeight}px`, background: `#${imgListBg}`, 'overflow-y': imgScroll})">
                        <div class="img-preview" ondragstart="return false" onselectstart="return false">
                          <div class="img-title" :style="{background: `#${imgTitleBg}`, color: `#${imgTitle}`}">애니편성표</div>
                          <div class="img-ymd" :style="{background: `#${imgYmdBg}`, color: `#${imgYmd}`}">{{imgDataYmd}}</div>
                          <div class="img-node" :style="{background: `#${imgListBg}`, color: `#${imgList}`}" v-for="node in imgDataList" :key="node">{{node}}</div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </table>
              <div class="tool">
                <div class="tool-title">소스타입</div>
                <div><label title="일반적으로 html 이 가능한 모든 사이트에 삽입 가능"> <input type="radio" name="schedule-mode" v-model="mode" value="html" /> HTML</label></div>
                <div><label title="네이버 블로그 처럼 html이 금지된 경우 사용."> <input type="radio" name="schedule-mode" v-model="mode" value="img" /> 이미지 (블로그 위젯)</label></div>
                <hr/>
                <div v-if="mode === 'html'" >
                  <div class="tool-title">색상 (A:활성)</div>
                  <div class="line">
                    <div class="label">배경</div>
                    <div v="htmlBgLight" :style="`background:#${htmlBgLight}`" @click="openColorPicker" class="color"></div>
                    <div class="color blank"></div>
                    <div v="htmlBgDark" :style="`background:#${htmlBgDark}`" @click="openColorPicker" class="color"></div>
                    <div class="color blank"></div>
                  </div>
                  <div class="line">
                    <div class="label">제목</div>
                    <div v="htmlTitleBgLight" :style="`background:#${htmlTitleBgLight}`" @click="openColorPicker" class="color"></div>
                    <div v="htmlTitleLight" :style="`background:#${htmlTitleLight}`" @click="openColorPicker" class="color"></div>
                    <div v="htmlTitleBgDark" :style="`background:#${htmlTitleBgDark}`" @click="openColorPicker" class="color"></div>
                    <div v="htmlTitleDark" :style="`background:#${htmlTitleDark}`" @click="openColorPicker" class="color"></div>
                  </div>
                  <div class="line">
                    <div class="label">네비</div>
                    <div v="htmlNavBgLight" :style="`background:#${htmlNavBgLight}`" @click="openColorPicker" class="color"></div>
                    <div v="htmlNavLight" :style="`background:#${htmlNavLight}`" @click="openColorPicker" class="color"></div>
                    <div v="htmlNavBgDark" :style="`background:#${htmlNavBgDark}`" @click="openColorPicker" class="color"></div>
                    <div v="htmlNavDark" :style="`background:#${htmlNavDark}`" @click="openColorPicker" class="color"></div>
                  </div>
                  <div class="line">
                    <div class="label">네비A</div>
                    <div v="htmlNavActBgLight" :style="`background:#${htmlNavActBgLight}`" @click="openColorPicker" class="color"></div>
                    <div v="htmlNavActLight" :style="`background:#${htmlNavActLight}`" @click="openColorPicker" class="color"></div>
                    <div v="htmlNavActBgDark" :style="`background:#${htmlNavActBgDark}`" @click="openColorPicker" class="color"></div>
                    <div v="htmlNavActDark" :style="`background:#${htmlNavActDark}`" @click="openColorPicker" class="color"></div>
                  </div>
                  <div class="line">
                    <div class="label">목록</div>
                    <div v="htmlListBgLight" :style="`background:#${htmlListBgLight}`" @click="openColorPicker" class="color"></div>
                    <div v="htmlListLight" :style="`background:#${htmlListLight}`" @click="openColorPicker" class="color"></div>
                    <div v="htmlListBgDark" :style="`background:#${htmlListBgDark}`" @click="openColorPicker" class="color"></div>
                    <div v="htmlListDark" :style="`background:#${htmlListDark}`" @click="openColorPicker" class="color"></div>
                  </div>
                  <div class="line">
                    <div class="label">목록A</div>
                    <div v="htmlListActBgLight" :style="`background:#${htmlListActBgLight}`" @click="openColorPicker" class="color"></div>
                    <div v="htmlListActLight" :style="`background:#${htmlListActLight}`" @click="openColorPicker" class="color"></div>
                    <div v="htmlListActBgDark" :style="`background:#${htmlListActBgDark}`" @click="openColorPicker" class="color"></div>
                    <div v="htmlListActDark" :style="`background:#${htmlListActDark}`" @click="openColorPicker" class="color"></div>
                  </div>
                  <div class="line">
                    <div class="label">접두어</div>
                    <div v="htmlPrefixLight" :style="`background:#${htmlPrefixLight}`" @click="openColorPicker" class="color"></div>
                    <div class="color blank"></div>
                    <div v="htmlPrefixDark" :style="`background:#${htmlPrefixDark}`" @click="openColorPicker" class="color"></div>
                    <div class="color blank"></div>
                  </div>
                  <hr/>
                  <div class="tool-title">크기</div>
                  <div class="line">
                    <input type="number" min="180" max="900" maxlength="3" v-model="htmlWidth"/>
                    <input type="range" min="180" max="900" step="10" v-model="htmlWidth" />
                  </div>
                  <div class="line">
                    <input type="number" min="240" max="780" maxlength="3" v-model="htmlHeight"/>
                    <input type="range" min="240" max="780" step="10" v-model="htmlHeight">
                  </div>
                  <hr/>
                  <div class="tool-title">소스코드</div>
                  <textarea readonly="readonly" v-model="htmlCode" style="height:136px;"></textarea>
                </div>
                <div v-else-if="mode === 'img'" >
                  <div class="line">
                    <div class="label">제목</div>
                    <div v="imgTitleBg" :style="`background:#${imgTitleBg}`" @click="openColorPicker" class="color"></div>
                    <div v="imgTitle" :style="`background:#${imgTitle}`" @click="openColorPicker" class="color"></div>
                  </div>
                  <div class="line">
                    <div class="label">날짜</div>
                    <div v="imgYmdBg" :style="`background:#${imgYmdBg}`" @click="openColorPicker" class="color"></div>
                    <div v="imgYmd" :style="`background:#${imgYmd}`" @click="openColorPicker" class="color"></div>
                  </div>
                  <div class="line">
                    <div class="label">목록</div>
                    <div v="imgListBg" :style="`background:#${imgListBg}`" @click="openColorPicker" class="color"></div>
                    <div v="imgList" :style="`background:#${imgList}`" @click="openColorPicker" class="color"></div>
                  </div>
                  <hr/>
                  <div class="tool-title">너비</div>
                  <div class="line">
                    <input type="number" min="150" max="900" v-model="imgWidth"/>
                    <input type="range" min="150" max="900" step="10" v-model="imgWidth">
                  </div>
                  <div class="tool-title">높이(단)</div>
                  <div class="line">
                    <input type="number" min="150" max="900" v-model="imgSize"/>
                    <input type="range" min="5" max="20" step="1" v-model="imgSize">
                  </div>
                  <hr/>
                  <div class="tool-title">스크롤</div>
                  <div><label> <input type="radio" name="schedule-img-scroll" v-model="imgScroll" value="auto" /> 활성</label></div>
                  <div><label> <input type="radio" name="schedule-img-scroll" v-model="imgScroll" value="hidden" /> 비활성</label></div>
                  <hr/>
                  <div class="tool-title">소스코드</div>
                  <textarea readonly="readonly" v-model="imgCode" style="height:90px;"></textarea>
                </div>

              </div>
            </div>
          </div>
          <!-- 애니편성표 소스 생성기 [종료] -->
          <!-- 서드파티 [시작] -->
          <div class="doc-title">서드파티</div>
          <div class="doc-desc">
            <div class="desc-comment">
              서드파티 프로그램은 "애니시아 API" 를 통해 만들어진 프로그램으로<br/>
              애니시아에서 제작하지 않은 프로그램에 대한 지원을 받고있지않습니다.<br/>
              각 프로그램에 대한 문의는 해당 개발자/단체에 하셔야 합니다.
            </div>
            <table class="schedule-table schedule-application">
              <!-- ios -->
              <tr>
                <th class="td-icon"><img src="@/assets/page/schedule-th-ios.svg" title="ios" class="pmark" /></th>
                <td class="td-title"><a href="https://apps.apple.com/kr/app/aeni-pyeonseongpyo/id917536862" target="_blank">애니 편성표</a></td>
                <th class="td-author">Young Ho Kim</th>
                <td class="td-date">2014년</td>
              </tr>
              <!-- android -->
              <tr>
                <th class="td-icon"><img src="@/assets/page/schedule-th-android.svg" title="android" class="pmark" /></th>
                <td class="td-title"><a href="https://play.google.com/store/apps/details?id=com.novang.anisched" target="_blank">AniSched</a></td>
                <th class="td-author">Novang</th>
                <td class="td-date">2021년</td>
              </tr>
              <!-- android -->
              <tr>
                <th class="td-icon"><img src="@/assets/page/schedule-th-android.svg" title="android" class="pmark" /></th>
                <td class="td-title"><a href="https://play.google.com/store/apps/details?id=anissia.android.schedule" target="_blank">애니 편성표</a></td>
                <th class="td-author" title="공식">애니시아</th>
                <td class="td-date">2021년</td>
              </tr>
              <!-- windows -->
              <tr>
                <th class="td-icon"><img src="@/assets/page/schedule-th-windows.svg" title="windows" class="pmark" /></th>
                <td class="td-title"><a href="https://www.microsoft.com/p/anisched/9wzdncrd8kxg" target="_blank">AniSched</a></td>
                <th class="td-author">Novang</th>
                <td class="td-date">2015년</td>
              </tr>
              <!-- chrome -->
              <tr>
                <th class="td-icon"><img src="@/assets/page/schedule-th-chrome.svg" title="chrome" class="pmark" /></th>
                <td class="td-title"><a href="https://chrome.google.com/webstore/detail/anisched/lkpfenhnbjcjekjihacpcoekgdclobdn" target="_blank">AniSched</a></td>
                <th class="td-author">Novang</th>
                <td class="td-date">2015년</td>
              </tr>
            </table>
          </div>
          <!-- 서드파티 [종료] -->
          <!-- 소스코드 [시작] -->
          <div class="doc-title">소스코드 / API</div>
          <div class="doc-desc">
            <table class="schedule-table schedule-application">
              <tr>
                <th rowspan="4" class="td-icon"><img src="@/assets/page/schedule-th-api.svg" title="API" class="pmark" /></th>
                <td class="td-type"><a href="https://github.com/anissia-net/document/blob/main/api_anime_schdule.md" target="_blank">API</a></td>
                <th>3rd party 애니편성표 앱 제작을 위한 API 가이드</th>
              </tr>
              <tr>
                <td class="td-type"><a href="https://github.com/anissia-net/document/blob/main/doc_anime_rank.md" target="_blank">RANK</a></td>
                <th>애니메이션 랭킹 집계기준 문서</th>
              </tr>
              <tr>
                <td><a href="https://github.com/anissia-net/anissia-web" target="_blank">WEB</a></td>
                <th>FE - Vue.js, Typescript</th>
              </tr>
              <tr>
                <td><a href="https://github.com/anissia-net/anissia-core" target="_blank">CORE</a></td>
                <th>BE - Kotlin, Spring, JPA, QueryDSL, Elasticsearch</th>
              </tr>
            </table>
          </div>
          <!-- 소스코드 [종료] -->

          <div v-if="colorPickerOpen" class="color-picker" ref="colorPicker"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import Nabi from "@/utils/nabi";
import ColorPicker from "vanilla-picker"
import {DateFormat} from "@/utils/nabi/DateFormat";
import AnimeService from "@/service/AnimeService";
import AnimeRank from "@/components/AnimeRank.vue";

@Options({
  components: {
    //Color,
    AnimeRank
  },
  computed: {
    // -- HTML -----------------------------------------------------------------------------------------
    htmlCode() {
      return `<iframe src="${location.origin + '/schedule/2015#' + this.htmlSrc}" width="${this.htmlWidth}" height="${this.htmlHeight}" frameborder="0"></iframe>`;
    },
    htmlSrc() {
      return (
          this.htmlBgLight + this.htmlTitleBgLight + this.htmlTitleLight + this.htmlNavBgLight + this.htmlNavLight + this.htmlNavActBgLight +
          this.htmlNavActLight + this.htmlListBgLight + this.htmlListLight + this.htmlListActBgLight + this.htmlListActLight + this.htmlPrefixLight +
          this.htmlBgDark + this.htmlTitleBgDark + this.htmlTitleDark + this.htmlNavBgDark + this.htmlNavDark + this.htmlNavActBgDark +
          this.htmlNavActDark + this.htmlListBgDark + this.htmlListDark + this.htmlListActBgDark + this.htmlListActDark + this.htmlPrefixDark
      );
    },
    imgHeight() {
      return 50 + (this.imgSize * 20);
    },
    imgCode() {
      const theme = this.imgTitleBg + this.imgTitle + this.imgYmdBg + this.imgYmd + this.imgListBg + this.imgList;
      return `<div style="width:${this.imgWidth}px;height:${this.imgHeight}px;background:#${this.imgListBg};overflow-y:${this.imgScroll}"><a href="${location.origin + '/schedule/2015'}" target="_blank"><img src="${location.origin}/api/anime/schedule/svg/${this.imgWidth}/${theme}"/></a></div>`;
    },
    colorScheme() {
      return this.$store.state.colorScheme;
    },
    previewError() {
      if (this.mode === 'html') {
        if (!(/^[\d]{6}$/).test(`${this.htmlWidth}${this.htmlHeight}`)) {
          return '지원하지 않는 크기 입니다.<br/>크기를 조정해주세요.';
        }
      } else if (this.mode === 'img') {
        if (!(/^[\d]{3}$/).test(`${this.imgWidth}`)) {
          return '지원하지 않는 크기 입니다.<br/>크기를 조정해주세요.';
        }
      }
      return '';
    }
  },
  watch: {
    mode(after: string, before: string) {
      if (after === 'img' && this.imgDataList.length === 0) {
        this.imgDataYmd = new DateFormat().format("yyyy년 MM월 dd일");
        AnimeService.getSchedule(new Date().getDay().toString(), (list) => this.imgDataList = list.map(e => e.time + ' ' + e.subject));
      }
    },
    colorScheme(after: string, before: string) {
      this.colorModeHtml(after);
    }
  },
  methods: {
    // -- Color Picker -----------------------------------------------------------------------------------------
    openColorPicker(event: MouseEvent) {
      this.colorPickerOpen = true;
      this.$nextTick(() => {
        const cp = this.$refs.colorPicker;
        this.colorPicker && this.colorPicker.destroy();
        cp.innerHTML = '';
        cp.style.top = (event.clientY + 20) + 'px';
        cp.style.left = (event.clientX - 128) + 'px';
        this.colorPickerVar = (event.target as any).getAttribute('v');
        this.colorPicker = new ColorPicker({parent: cp, onDone: this.closeColorPicker, onChange: this.selectColorPicker, color: `#${this[this.colorPickerVar]}`, alpha: false, popup: false});
        this.mode === 'html' && this.$refs.html.contentWindow.colorMode(this.colorPickerVar.endsWith('Light') ? 'light': 'dark');
      });
    },
    selectColorPicker(color: any) {
      this[this.colorPickerVar] = color.hex.substring(1, 7);
      this.mode === 'html' && this.drawHtml()
    },
    closeColorPicker() {
      this.colorPickerOpen = false;
    },
    closerColorPicker(e: Event) {
      if (this.colorPickerOpen && Nabi.matchesParents(e.target, ['.color-picker', '.color-picker-closer-area', '.color']) === '.color-picker-closer-area') {
        this.closeColorPicker();
      }
    },
    // -- HTML -----------------------------------------------------------------------------------------
    drawHtml() {
      const sc = this.$refs.html.contentWindow;
      sc.repaint(this.htmlSrc);
    },
    colorModeHtml(mode: string) {
      this.$refs.html.contentWindow.colorMode(mode);
    }
  }
})

export default class Schedule extends Vue {
  data() {
    return {
      // mode
      mode: 'html',
      // HTML - color - light mode
      htmlBgLight: 'ffffff',
      htmlTitleBgLight: '5987b6', htmlTitleLight: 'ffffff',
      htmlNavBgLight: 'f2f2f2', htmlNavLight: '497ba7',
      htmlNavActBgLight: '9cb3c7', htmlNavActLight: 'ffffff',
      htmlListBgLight: 'ffffff', htmlListLight: '555555',
      htmlListActBgLight: 'f8f8f8', htmlListActLight: '2474ce',
      htmlPrefixLight: 'cb3434',
      // HTML - color - dark mode
      htmlBgDark: '000000',
      htmlTitleBgDark: '000000', htmlTitleDark: '777777',
      htmlNavBgDark: '111111', htmlNavDark: '777777',
      htmlNavActBgDark: '111111', htmlNavActDark: 'c3b443',
      htmlListBgDark: '070707', htmlListDark: '999999',
      htmlListActBgDark: '000000', htmlListActDark: 'cccccc',
      htmlPrefixDark: '3a7da3',
      // HTML - size
      htmlWidth: 800, htmlHeight: 600,
      // IMG - color
      imgTitleBg: '63a883',
      imgTitle: 'ffffff',
      imgYmdBg: 'd8d8d8',
      imgYmd: '000000',
      imgListBg: 'ffffff',
      imgList: '000000',
      imgScroll: 'auto',
      // IMG - size
      imgWidth: 180,
      imgSize: 10,
      // IMG - data
      imgDataList: [] as string[],
      imgDataYmd: '',
      // color picker
      colorPicker: null as ColorPicker | null,
      colorPickerOpen: false,
      colorPickerVar: '',
    };
  }
}
</script>


<style>
#schedule { font-family: "Malgun Gothic", "Dotum"; }
#schedule .base-mat { padding:8px; }
#schedule .doc-desc { padding: 12px 8px; line-height: 1.8; margin-bottom: 8px }
#schedule .doc-desc .desc-comment { font-size:13px; opacity: .8; padding: 2px 0 10px; }
#schedule .schedule-docs-header { padding:2px 0 0; overflow: auto }
#schedule .schedule-docs-header .link { float:left }
#schedule .schedule-docs-header .info { text-align: right }

#schedule .icon i { margin-right:4px; }
#schedule table.schedule-table { margin:4px 0 0; width:100%; font-size:14px; }
#schedule table.schedule-table .td-icon { width:60px; }
#schedule table.schedule-table .td-title { }
#schedule table.schedule-table .td-author { width:25%; }
#schedule table.schedule-table .td-date { width:60px; text-align: center }
#schedule table.schedule-table .td-type { width:64px; }

#schedule table.schedule-table th, #schedule table.schedule-table td { padding:4px 12px; font-weight: normal }
#schedule table.schedule-application .pmark { width:32px; height: 32px; vertical-align: middle; margin:10px; }
#schedule table.schedule-application td,
#schedule table.schedule-application th { padding:8px 12px; border-width: 1px; }

#schedule .html-gen { overflow: auto; }
#schedule .html-gen .tool-preview { float:left;  margin-top:12px; min-height: 693px; width:calc(100% - 228px); }
#schedule .html-gen .tool-preview td.tool-main { padding:16px; text-align: center; }
#schedule .html-gen .tool-preview .preview-border {  border:0; max-width:100% !important; max-height:100% !important; vertical-align: middle;  }
#schedule .html-gen .tool-preview .preview-img { display: inline-block; }
#schedule .html-gen .tool-preview .preview-error { font-weight: bold; font-size: 32px; line-height: 1.8 }
#schedule .html-gen .tool { padding:16px 8px; margin-left:calc(100% - 228px); }
#schedule .html-gen .tool .tool-title { color: #276998; padding: 6px 0 8px; text-align: center; font-weight: bold; font-size:14px; }
#schedule .html-gen .tool hr { border: 0; border-bottom: 1px solid #276998; padding:0; margin:12px 0 8px; opacity: .2 }
#schedule .html-gen .tool .line > div { display:inline-block; vertical-align: top; margin-top:2px; }
#schedule .html-gen .tool .line .label { width:52px; height:32px; line-height: 30px; font-weight: bold }
#schedule .html-gen .tool .line .color { width:32px; height:32px; box-sizing: border-box; margin-left:2px; }
#schedule .html-gen .tool label { line-height: 30px; }
#schedule .html-gen .tool input { vertical-align: top; box-sizing: border-box }
#schedule .html-gen .tool input[type=radio] { height:24px; }
#schedule .html-gen .tool input[type=number] { width:50px; height:28px; text-align: center;  }
#schedule .html-gen .tool input[type=range] { width:120px; height:28px; margin-left:8px; }
#schedule .html-gen .tool textarea { box-sizing: border-box; width:192px; padding:4px; font-size:12px; resize: none; word-wrap: break-word; word-break: break-all; }

#schedule .html-gen .img-preview { font-family: 'Malgun Gothic'; font-weight: normal; margin:0 auto; overflow: hidden; cursor:default }
#schedule .html-gen .img-preview .img-title { font-size:13px; font-weight: bold; line-height:30px; height:30px; }
#schedule .html-gen .img-preview .img-ymd { font-size:12px; line-height:20px; height:20px; }
#schedule .html-gen .img-preview .img-node { font-size:13px; line-height:20px; height:20px; padding-left:2px; text-align: left; overflow: hidden; }

#schedule .color-picker { position: absolute; }


@media (max-width: 799px) {
  #schedule .mob-hide { display: none; }
}

@media (min-width: 800px) {
  #schedule .pc-hide { display: none; }
}


html.light #schedule .html-gen input, html.light #schedule .html-gen textarea { border:1px solid #ddd; background: #fff; color:#444 }
html.light #schedule .html-gen .tool .line .color:not(.blank) { border:1px solid #ddd }
html.light #schedule .html-gen .tool-preview { background: #eee }


html.dark #schedule .html-gen input, html.dark #schedule .html-gen textarea { border:1px solid #444; background: #000; color:#aaa }
html.dark #schedule .html-gen .tool .line .color:not(.blank) { border:1px solid #333 }
html.dark #schedule .html-gen .tool-preview { background: #222 }

html.dark #schedule table.schedule-application .pmark { opacity: .8 }

</style>