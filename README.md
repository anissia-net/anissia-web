# Anissia WEB (front-end)
- 애니시아 프론트엔드 WEB 입니다.
- 주소 : [anissia.net](https://anissia.net)
- 인프라 자원상 Admin 사이트를 포함합니다.
- 패키지 관리자로 yarn 3.x를 사용합니다.

## 준비과정
IDE 혹은 텍스트 에디터 설치하고 node.js와 yarn을 컴퓨터에 설치해야 합니다.
1. IDE 내지 텍스트 에디터 설치
    * 무슨 IDE나 에디터를 써도 상관없긴 하나 IDE는 **WebStorm**, 웹스톰 라이선스 비용이 부담되거나 텍스트 에디터를 사용할 경우 **Visual Studio Code (무료)** 추천
    * **Visual Studio Code (무료)**
        * https://code.visualstudio.com
        * 확장도구(extensions)도 설치
            * [Vue VS Code Extension Pack](https://marketplace.visualstudio.com/items?itemName=sdras.vue-vscode-extensionpack)
        * git 으로 받은 후 열기
    * **WebStorm**
        * https://www.jetbrains.com/webstorm/
1. node.js를 [공식 홈페이지](https://nodejs.org/ko)에서 제공하는 인스톨러를 통해 설치하거나, NVM, NVM for Windows, NVS 등의 버전 관리자를 통해 설치하세요. 버전 관리자를 사용하는 방식이 추천(특히, 여러 프로젝트를 작업하는 경우)됩니다.
1. 아래에 제시된 방법 중 하나를 선택하여 yarn을 설치합니다.
### corepack을 통한 yarn 설치(yarn 측이 권장)
yarn 공식 홈페이지 에서는 corepack을 통해 yarn을 설치하도록 안내하고 있습니다.(https://v3.yarnpkg.com/getting-started/install) 아직까지도 yarn classic을 사용하는 프로젝트가 많기 때문에(마스토돈 등의 해외 유명 오픈소스도 yarn classic을 사용하는 케이스 있음), 다른 yarn 프로젝트와 함께 작업할 생각이 있는 경우 corepack을 통해서 설치하는 것이 좋습니다


 1. corepack을 활성화 하거나 설치합니다.
     * Node.js 버전이 16.10 버전 이상일 경우 아래의 명령어를 통해서 corepack을 활성화 합니다. 환경에 따라서 관리자 권한으로 터미널을 실행해야 할 수도 있습니다. 
        ``` shell
        corepack enable
        ```
    * Node.js 버전이 16.10 버전 미만일 경우 아래의 명령어를 통해서 corepack을 설치 합니다. 환경에 따라서(특히, 공식 홈페이지에서 제공하는 인스톨러를 통해 윈도우 전역에 설치한 경우) 관리자 권한으로 터미널을 실행해야 할 수도 있습니다.
        ``` shell
        npm i -g corepack
        ```
 1. 그 후 cd 등의 명령어를 사용하여, 이 프로젝트가 위치한 폴더로 이동해(반드시 프로젝트가 위치한 폴더로 이동해야함) 아래의 명령어로 yarn 버전을 확인합니다. 3으로 시작하면 정상적으로 셋팅이 된 것입니다.
    ``` shell
    yarn -v
    # 3.x 이상 버전이 설치되었는지 확인합니다.
    ```
### corepack을 거치지 않고 직접 yarn 설치
   ``` shell
   npm install --global yarn
   #윈도우 환경에서 node.js를 인스토러를 통하여 윈도우 전역에 노드를 설치(인스톨러를 통해 설치시, 일반적으로 전역으로 설치됩니다)했을 경우, 관리자 권한으로 터미널(CMD, 파워셀 등)을 실행하여야 합니다.
   ```
   ``` shell
   yarn -v
   # 3.x 이상 버전이 설치되었는지 확인합니다.
   ```
## 의존성 설치
IDE 혹은 터미널(반드시 cd 등의 명령어를 통해 프로젝트 폴더로 이동해야함)에서 다음 명령어 실행. Visual Studio Code 사용시 콘솔 기본값은 PowerShell 이 아닌 cmd 추천
   ``` shell
   yarn install
   ```

## 실행
1. 실행
    * IDE 에서 다음 명령어 실행
        * **운영서버** API 사용 - https://anissia.net
            ``` shell
            yarn run dev --mode prod-server-api
            ```
        * **로컬서버** API 사용 - http://localhost:8001
            - 우선 코어서버(백엔드)를 가동해야 합니다.
            - 참고 : [anissia-core](https://github.com/anissia-net/anissia-core)
            ``` shell
            yarn run dev
            ```
2. 접속
    * 메인 : http://localhost:5173/
    * 어드민 : http://localhost:5173/admin/
        * 로그인-권한필요
        * 로컬의 경우 CORE 프로젝트에서 자동생성되는 **운영자** 계정으로 접근
    * 편성표 :
        * 2015년 버전 : http://localhost:5173/schedule/2015
        * 2009년 버전 : http://localhost:5173/schedule/2009

## 빌드
빌드결과 폴더 : 프로젝트폴더/dist
``` shell
yarn run build
```

## 참고
* [애니시아 문서](https://github.com/anissia-net/document)
* [애니편성표 API](https://github.com/anissia-net/document/blob/main/api_anime_schdule.md)
* [애니시아 CORE 프로젝트](https://github.com/anissia-net/anissia-core)
* [애니시아 WEB 프로젝트](https://github.com/anissia-net/anissia-web)
