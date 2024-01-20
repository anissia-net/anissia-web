<template>

  <div class="container m-auto px-4 pt-5 duration-300">

    <div class="font-semibold text-xl">애니시아</div>
    <div class="mt-1 text-sm leading-[1.8] as-a-color">
      애니시아의 시작은 2007년도 테라시아 마니아즈파트의 애니메이션탭 소메뉴였습니다.<br/>
      시간이 지나면서 단순히 애니메이션 편성표 기능뿐만이 아니라 자막 정보도 제공하기 시작했습니다.<br/>
      이렇게 애니시아라는 곳이 단지 여러분들의 원활한 애니메이션 감상을 위한 허브 사이트입니다.
    </div>

    <div class="font-semibold text-xl mt-12">운영진</div>
    <div class="mt-1 text-sm leading-[1.8]">
      애니시아의 관리를 총괄하고 있는 운영진입니다.
    </div>
    <div class="mt-3 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <div v-for="node in adminMembers" :key="node.key" class="p-4 as-box">
        <div>
          <div class="text-lg font-bold text-gray-800 dark:text-zinc-300">{{node.name}}</div>
          <div class="text-sm mt-1" v-html="node.date"></div>
        </div>
        <div class="mt-1 space-x-1 space-y-2 text-gray-800 dark:text-zinc-300">
          <span class="as-tag-xs" v-for="sn in node.tags" :key="sn.key">
            <a :href="sn.link" v-if="sn.link">{{sn.text}} <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
            <span v-else>{{sn.text}}</span>
          </span>
        </div>
      </div>
    </div>

    <div class="font-semibold text-xl mt-12">개발 지원</div>
    <div class="mt-1 text-sm leading-[1.8] as-a-color">
      테라시아(현 <a href="https://gs.saro.me">가리사니</a>)의 멤버로 애니시아 독립 이전에는 운영을 이후에는 지원을 하고 있습니다.
    </div>
    <div class="mt-3 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <div v-for="node in supportMembers" :key="node.key" class="p-4 as-box">
        <div>
          <div class="text-lg font-bold text-gray-800 dark:text-zinc-300">{{node.name}}</div>
          <div class="text-sm mt-1" v-html="node.date"></div>
        </div>
        <div class="mt-1 space-x-1 space-y-2 text-gray-800 dark:text-zinc-300">
          <span class="as-tag-xs" v-for="sn in node.tags" :key="sn.key">
            <a :href="sn.link" v-if="sn.link">{{sn.text}} <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
            <span v-else>{{sn.text}}</span>
          </span>
        </div>
      </div>
    </div>

    <div class="font-semibold text-xl mt-12">그래픽 지원</div>
    <div class="mt-3 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <div v-for="node in supportGraphicMembers" :key="node.key" class="p-4 as-box">
        <div>
          <div class="text-lg font-bold text-gray-800 dark:text-zinc-300">{{node.name}}</div>
          <div class="text-sm mt-1" v-html="node.date"></div>
        </div>
        <div class="mt-1 space-x-1 space-y-2 text-gray-800 dark:text-zinc-300">
          <span class="as-tag-xs" v-for="sn in node.tags" :key="sn.key">
            <a :href="sn.link" v-if="sn.link">{{sn.text}} <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
            <span v-else>{{sn.text}}</span>
          </span>
        </div>
      </div>
    </div>

    <div class="font-semibold text-xl mt-12">과거 맴버</div>
    <div class="mt-3 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <div v-for="node in prevMembers" :key="node.key" class="p-4 as-box">
        <div>
          <div class="text-lg font-bold text-gray-800 dark:text-zinc-300">{{node.name}}</div>
          <div class="text-sm mt-1" v-html="node.date"></div>
        </div>
        <div class="mt-1 space-x-1 space-y-2 text-gray-800 dark:text-zinc-300">
          <span class="as-tag-xs" v-for="sn in node.tags" :key="sn.key">
            <a :href="sn.link" v-if="sn.link">{{sn.text}} <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
            <span v-else>{{sn.text}}</span>
          </span>
        </div>
      </div>
    </div>

    <div class="font-bold text-xl mt-12">연혁</div>
    <ol class="mt-3 relative border-l border-gray-200 dark:border-gray-700">
      <li v-for="node in siteHistory" :key="node.key" class="mb-6 ml-4">
        <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
        <time class="text-sm text-gray-400 dark:text-gray-500">{{node.date}}</time>
        <h3 class="mt-1 text-md font-semibold text-gray-700 dark:text-white">{{node.desc}}</h3>
        <a :href="node.link" target="_blank" v-if="node.link != ''" class="py-1 px-3 mt-2 inline-block outline-none text-sm text-gray-900 bg-white rounded-md border border-gray-200 dark:bg-zinc-900/50 dark:text-zinc-300 dark:border-zinc-800">
          자세히 &nbsp;<i class="fa-solid fa-caret-right"></i>
        </a>
      </li>
    </ol>

    <div class="font-semibold text-xl mt-12">갤러리</div>
    <div class="mt-3 grid gap-4 md:grid-cols-2 xl:grid-cols-3">

      <div v-for="node in gallery" :key="node.file"  class="py-2 bg-white rounded-md border border-gray-200 shadow-md dark:bg-zinc-900/50 dark:border-zinc-800">
        <div class="text-center">
          <img class="m-auto mt-2" :src="node.src" alt="" />
        </div>
        <div class="px-5 pt-5 pb-2">
          <h5 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">{{node.title}}</h5>
          <p class="mt-1 font-normal text-gray-700 dark:text-gray-400">{{node.desc}}</p>
        </div>
      </div>

    </div>


  </div>

</template>

<script setup lang="ts">
import timetable_1_jpg from './introduce/timetable.1.jpg';
import timetable_2_jpg from './introduce/timetable.2.jpg';
import timetable_3_jpg from './introduce/timetable.3.jpg';
import timetable_radio_jpg from './introduce/timetable-radio.jpg';
import timetable_widget_1_jpg from './introduce/timetable-widget.1.jpg';
import timetable_widget_2_jpg from './introduce/timetable-widget.2.jpg';
import timetable_widget_3_jpg from './introduce/timetable-widget.3.jpg';
import timetable_widget_4_jpg from './introduce/timetable-widget.4.jpg';
import other_1_jpg from './introduce/other.1.jpg';
import anissia_1_jpg from './introduce/anissia.1.jpg';
import anissia_2_jpg from './introduce/anissia.2.jpg';
import anissia_3_jpg from './introduce/anissia.3.jpg';
import anissia_4_jpg from './introduce/anissia.4.jpg';
import anissia_5_jpg from './introduce/anissia.5.jpg';
import anissia_6_jpg from './introduce/anissia.6.jpg';

import {ref} from "vue";
import {SiteHistory} from "./introduce/SiteHistory";
import {SiteMember} from "./introduce/SiteMember";

const nowYear = new Date().getFullYear();

const adminMembers = ref([
  new SiteMember('또_탈퇴된코란', `2009 ~ ${nowYear}`, [`기획`, `관리`, `애니시아 서버 제공`, `블로그||https://coran.co.kr`, `트위터||https://twitter.com/c0ran`]),
  new SiteMember('Leon', `2015 ~ ${nowYear}`, [`관리`]),
]) as unknown as SiteMember[];

const supportMembers = ref([
  new SiteMember('박용서', `2007 ~ 2013: 개발운영 (애니시아 독립 전)<br/>2013 ~ ${nowYear}: 개발지원`, [`개발총괄`, `애니편성표`, `애니시아`, `시스템`, `API`, `디자인`, `기획`, `가리사니||https://gs.saro.me`, `GITHUB||https://github.com/ac-saro` ,`페이스북||https://www.facebook.com/j.saro.co`]),
]) as unknown as SiteMember[];

const supportGraphicMembers = ref([
  new SiteMember('당무지', `2023 ~ ${nowYear}`, [`애니시아, 애니편성표 아이콘`, `블로그||https://blog.naver.com/vip125`]),
]) as unknown as SiteMember[];

const prevMembers = ref([
  new SiteMember('UTPasiirs', '2015 ~ 2018', [`관리`]),
  new SiteMember('매디', `2007 ~ 2013<br/>테라시아 소속 일러스트 총괄`, [`일러스트총괄`, `아이콘`, `애니편성표`, `블로그||https://blog.naver.com/ehozil`]),
  new SiteMember('ORS (단체)', '2009 ~ 2011', [`라디오편성표`]),
  new SiteMember('Reve', '2007 ~ 2011', [`iOS`]),
  new SiteMember('메티오', '2009 ~ 2010', [`일러스트`, `디자인`, `Anissia 마크`]),
  new SiteMember('Annyeong', '2009', [`다음위젯`]),
  new SiteMember('Kernys', '2009', [`다음위젯`]),
  new SiteMember('랜스', '2007 ~ 2009', [`애니편성표 프로그램`, `블로그||http://blog.lancekun.com/tc/`]),
]) as unknown as SiteMember[];

const siteHistory = ref([
  new SiteHistory(`2023-04-16`, `백엔드 리팩토링`, `/notice?topicNo=134`),
  new SiteHistory(`2023-02-11`, `애니시아 아이콘 변경`),
  new SiteHistory(`2023-01-30`, `DNS 서버변경`, `/notice?topicNo=115`),
  new SiteHistory(`2023-01-09`, `서버교체`, `/notice?topicNo=109`),
  new SiteHistory(`2022-09-20`, `2022 디자인 리뉴얼 (개발:가리사니 개발자공간)`, `/notice?topicNo=93`),
  new SiteHistory(`2022-09-20`, `공유기 교체 (간헐적 서버 다운 원인)`, `/notice?topicNo=88`),
  new SiteHistory(`2021-02-08`, `2020 리뉴얼 (개발:가리사니 개발자공간)`, `/notice?topicNo=27`),
  new SiteHistory(`2015-07-19`, `2015 리뉴얼 (개발:가리사니 개발자공간)`),
  new SiteHistory(`2015-06-23`, `기가랜 설치, 새로운 저전력 서버로 교체`),
  new SiteHistory(`2015-05-31`, `Daum위젯뱅크 서비스 종료로 새로운 위젯 서비스 시작`),
  new SiteHistory(`2014-05-11`, `애니편성표 모바일 웹 버젼 등재`),
  new SiteHistory(`2014-04-14`, `애니편성표 크롬 확장프로그램 등록`),
  new SiteHistory(`2014-01-01`, `가리사니 -> 또_탈퇴된코란 운영권 이전`),
  new SiteHistory(`2013-12-13`, `구 애니편성표 API (가리사니서버 제공) 지원종료`),
  new SiteHistory(`2013-12-03`, `가리사니서버 -> 또_탈퇴된코란서버로 이전`),
  new SiteHistory(`2013-12-03`, `애니시아 완전 독립버전 완성 - 서버이전 기초작업`),
  new SiteHistory(`2013-12-02`, `애니편성표 다음 위젯 리뉴얼`),
  new SiteHistory(`2013-11-29`, `신규 회원가입 개시 : 그동안 비공식적으로만 받음`),
  new SiteHistory(`2013-11-29`, `애니편성표 기능 확장 및 종영애니 표시`),
  new SiteHistory(`2013-11-29`, `애니시아 리뉴얼`),
  new SiteHistory(`2013-11-29`, `라디오 편성표 시스템 폐기 (사실상 2011년 중단)`),
  new SiteHistory(`2013-10-14`, `가리사니 개발자 공간에서 분리`),
  new SiteHistory(`2013-10-14`, `애니시아와 가리사니의 회원 데이터베이스 분리`),
  new SiteHistory(`2013-02-20`, `안드로이드용 애니편성표 (애니)`),
  new SiteHistory(`2012-05-30`, `윈도우폰용 애니편성표 (애니)`),
  new SiteHistory(`2011-05-11`, `아이폰용 애니편성표 (애니)`),
  new SiteHistory(`2011-03-25`, `공식사이트 표시기능 추가 (애니)`),
  new SiteHistory(`2011-02-18`, `애니위젯 폐기 (530 버전) (애니)`),
  new SiteHistory(`2010-10-03`, `관리시스템 자동화 (애니/라디오)`),
  new SiteHistory(`2010-10-03`, `서버문제로 가리사니에 재병합 (애니/라디오)`),
  new SiteHistory(`2010-10-03`, `테라시아 -> 가리사니 이름 변경`),
  new SiteHistory(`2009-12-04`, `애니위젯 등록 (625 버전) (애니)`),
  new SiteHistory(`2009-09-29`, `애니위젯 등록 (530 버전 / 현재폐기됨) (애니)`),
  new SiteHistory(`2009-09-28`, `자막제작자분이 직접 수정가능 (애니)`),
  new SiteHistory(`2009-09-11`, `테라시아로부터 애니시아 독립 (애니/라디오)`),
  new SiteHistory(`2009-08-17`, `라디오 편성표 탄생 (라디오)`),
  new SiteHistory(`2009-08-17`, `비정규/신작표시시작 (애니)`),
  new SiteHistory(`2009-07-03`, `자막제작자 표시 (애니)`),
  new SiteHistory(`2009-06-21`, `테라시아의 이름을 따서 anissia.net 도메인 선점`),
  new SiteHistory(`2009-06-21`, `애니규모가 커짐에따라 테라시아 개발자 포럼의 정체성 문제로 분리 논의`),
  new SiteHistory(`2009-06-02`, `또_탈퇴된코란 참여 (자막제작자 기능 및 현재 편성표 기획)`),
  new SiteHistory(`2009-03-14`, `애니편성표 시범시작 (애니)\n2013년 신버전이 나오면서 폐기될 예정이었으나, 폐기반대 요청이 많아 레트로 버전으로 운영중`),
  new SiteHistory(`2008-08-07`, `테라시아 리뉴얼 (모든 데이터 초기화)`),
  new SiteHistory(`2007-02-22`, `테라시아 마니아즈파트의 애니메이션탭 소매뉴 생성 : 현 애니시아의 전신`),
  new SiteHistory(`2007-02-22`, `테라시아 개발자 포럼(현:가리사니 개발자 공간) 개시`),
  new SiteHistory(`2007-02-22`, `클라비스 -> 테라시아 이름변경 후 도메인(terassia.com) 구입 서비스 개시`),
]) as unknown as SiteHistory[];

const gallery = ref([
  { src: timetable_1_jpg, file: 'timetable.1.jpg', title: `최초의 애니편성표 [2009년]`, desc: `애니시간표 -> 애니편성표 (기존 애니시간표는 자료소실)` },
  { src: timetable_2_jpg, file: 'timetable.2.jpg', title: `두번째 애니편성표 [2009년]`, desc: `이 디자인을 선호하는 사람이 많아 현재도 제공중` },
  { src: timetable_3_jpg, file: 'timetable.3.jpg', title: `세번째 애니편성표 [2015년]`, desc: `2020년에 다크모드가 추가됨 (정확히는 네번째로 2013년 부터 2015년 까지 존재한 편성표가 있음)` },
  { src: timetable_radio_jpg, file: 'timetable-radio.jpg', title: `라디오 편성표 [2009년]`, desc: `라디오 편성표` },
  { src: timetable_widget_1_jpg, file: 'timetable-rank.1.jpg', title: `최초의 애니편성표 위젯 [2009년 1차]`, desc: `스크린샷이 없어 소스로 복원 [내용부분이 다를 수 있음]` },
  { src: timetable_widget_2_jpg, file: 'timetable-rank.2.jpg', title: `애니편성표 위젯 [2009년 2차]`, desc: `여러가지 배경 테마가 있음 (이때부터 커스텀의 시작)` },
  { src: timetable_widget_3_jpg, file: 'timetable-rank.3.jpg', title: `애니편성표 위젯 [2009년 3차]`, desc: `각각의 색상을 바꿀 수 있음` },
  { src: timetable_widget_4_jpg, file: 'timetable-rank.4.jpg', title: `애니편성표 위젯 [2015년]`, desc: `HTML 태그를 지원하지 않는 곳을 위한 이미지 전용으로 퀄리티는 다소 떨어짐` },
  { src: other_1_jpg, file: 'other.1.jpg', title: `애니편성표 [2009년]`, desc: `2009년 버전의 드로잉 [작업자: 매디]` },
  { src: anissia_1_jpg, file: 'anissia.1.jpg', title: `테라시아 (현: 가리사니) [2007년]`, desc: `애니시아는 원래 개발자 사이트인 테라시아를 홍보하기 위해 만들어진 소메뉴였다.` },
  { src: anissia_2_jpg, file: 'anissia.2.jpg', title: `애니시아 디자인도안 [작업자: 메티오]`, desc: `애니시아 분리독립을 위해 만들어진 도안중 하나` },
  { src: anissia_3_jpg, file: 'anissia.3.jpg', title: `애니시아 디자인도안 [작업자: 메티오]`, desc: `기획을 지나치게 크게 잡았다가 개발시간이 부족하여 무산됨, 이 "Anissia 마크"는 오랫동안 애니시아의 상징으로 쓰임` },
  { src: anissia_4_jpg, file: 'anissia.4.jpg', title: `애니시아 1차`, desc:`결국 Anissia 마크만 가져와서 제작` },
  { src: anissia_5_jpg, file: 'anissia.5.jpg', title: `애니시아 2차 2015년`, desc:`애니시아 2차` },
  { src: anissia_6_jpg, file: 'anissia.6.jpg', title: `애니시아 2차 2019년`, desc:`실제 서비스 되지 못함 / 2020 리뉴얼의 도안이라고 할 수 있음` }
]);

</script>
