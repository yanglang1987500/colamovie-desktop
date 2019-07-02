interface CheckerResult {
  value: any;
}

const paramChecker = <T>(callback: (instance: T, functionName: string, ...rest: any[]) => boolean) =>
  (target: Object, key: string, descripter: any): CheckerResult => {
    return {
      value: function (...args: any[]) {
        if (callback(this, key, ...args)) {
          return descripter.value.apply(this, args);
        }
        return null;
      }
    };
  };

export default paramChecker;