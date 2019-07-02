export const filterChar = (list: any[], key: string) =>
  list.map(data => {
    data[key] = (data[key] as any as string).replace(/<[^>]+>|&[^>)]+?;/g,'').trim();
    return data;
  });

export const filterSensitive = <T>(list: T[], callback: (data: T) => string) =>
  list.filter(data => (callback(data) || '').indexOf('性爱') === -1);