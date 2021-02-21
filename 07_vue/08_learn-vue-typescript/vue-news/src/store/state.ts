import { NewsItem } from "@/api";

const state = {
  news: [] as NewsItem[]
};

type RootState = typeof state;

export { state, RootState };

// node_modules/vuex/types/vue.d.ts의 any를 RootState로 바꾼 후
// 터미널을 종료하고 vscode도 껐다가 다시 켜면
// vue 파일에서 this.$store.state. 까지 치면 news 항목이 뜨는 것을 볼 수 있다.
