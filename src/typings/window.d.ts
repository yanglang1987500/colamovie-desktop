export {};

interface Hls {
  new(options: any): Hls;
  [key: string]: any;
}

declare global {
  interface Window {
    Hls: Hls;
    p2pml: any;
  }
}