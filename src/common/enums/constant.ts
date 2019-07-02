export enum albumType {
  News = 0,
  Action = 5,
  Comedy = 6,
  Love = 7,
  Science = 8,
  Korea = 14,
  War = 11,
  Terror = 9,
  Japan = 24,
  ChinaShow = 26,
  TaiShow = 27
};

export const albumTypes: IAlbumType[] = [
  {
    id: albumType.News,
    name: '最新',
  },
  {
    id: albumType.Action,
    name: '动作片',
  },
  {
    id: albumType.Comedy,
    name: '喜剧片',
  },
  {
    id: albumType.Love,
    name: '爱情片',
  },
  {
    id: albumType.Science,
    name: '科幻片',
  },
  {
    id: albumType.Korea,
    name: '韩剧',
  },
  {
    id: albumType.War,
    name: '战争片',
  },
  {
    id: albumType.Terror,
    name: '恐怖片',
  },
  {
    id: albumType.Japan,
    name: '日漫',
  },
  {
    id: albumType.ChinaShow,
    name: '内地综艺',
  },
  {
    id: albumType.TaiShow,
    name: '港台综艺',
  }
];