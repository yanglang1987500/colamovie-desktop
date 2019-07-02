import React from 'react';
import moment from 'moment';

declare global {
  interface Window {
    ga: any;
    store: any;
    FastClick: any;
  }
  interface HTMLElement {
    fadeIn: (interval?: number) => Promise<void>;
    fadeOut: (interval?: number) => Promise<void>;
    removeClass: (className: string) => HTMLElement;
    addClass: (className: string) => HTMLElement;
    hide: () => HTMLElement;
  }
}
