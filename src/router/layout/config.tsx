import {
  Home,
  Play,
  Types,
  Search,
  Type,
  History,
  Tvs,
  TvPlay,
} from "@router/scenes/index";

export const mainRouterList: IRouterConfig[] = [
  {
    title: "home",
    path: "/",
    component: Home
  },
  {
    title: "play",
    path: "/play",
    component: Play
  },
  {
    title: "types",
    path: "/types",
    component: Types
  },
  {
    title: "search",
    path: "/search",
    component: Search
  },
  {
    title: "type",
    path: "/type",
    component: Type
  },
  {
    title: "history",
    path: "/history",
    component: History
  },
  {
    title: "Tvs",
    path: "/tvs",
    component: Tvs
  },
  {
    title: "TvPlay",
    path: "/tvplay",
    component: TvPlay
  }
];
