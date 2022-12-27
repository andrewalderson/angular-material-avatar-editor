import { InjectionToken } from '@angular/core';

export type MatxAvatarInitialsFunction = (name: string) => string;

const defaultInitialsFunction: MatxAvatarInitialsFunction = (name: string) => {
  let initials = '';
  if (name) {
    const parts = name.split(' ');
    initials += parts.at(0)?.charAt(0);
    if (parts.length > 1) {
      initials += parts.at(-1)?.charAt(0);
    }
  }
  return initials;
};

export const MATX_AVATAR_INITIALS_FUNCTION =
  new InjectionToken<MatxAvatarInitialsFunction>('matxAvatarInitialsFunction', {
    providedIn: 'root',
    factory: () => defaultInitialsFunction,
  });

// these are from the material pallete
// the text colors for all of these is white
const COLOR_TABLE = [
  '#D32F2F',
  '#C2185B',
  '#7B1FA2',
  '#512DA8',
  '#303F9F',
  '#1976D2',
  '#0288D1',
  '#0097A7',
  '#00796B',
  '#388E3C',
  '#689F38',
  '#AFB42B',
  '#FBC02D',
  '#FFA000',
  '#F57C00',
  '#E64A19',
  '#5D4037',
  '#616161',
  '#455A64',
] as const;

export type MatxAvatarInitialsColorFunction = (username?: string) => {
  background: string;
  foreground: string;
};

const defaultInitialsColorFunction: MatxAvatarInitialsColorFunction = (
  username?: string
) => {
  if (!username) {
    return { background: 'transparent', foreground: '#ffffff' };
  }
  let hashCode = 0;
  for (let i = username.length - 1; i >= 0; i--) {
    const ch = username.charCodeAt(i);
    const shift = i % 8;
    hashCode ^= (ch << shift) + (ch >> (8 - shift));
  }
  return {
    background: COLOR_TABLE[hashCode % COLOR_TABLE.length],
    foreground: '#ffffff',
  };
};

export const MATX_AVATAR_INITIALS_COLOR_FUNCTION = new InjectionToken(
  'matxAvatarInitialsColorFunction',
  {
    providedIn: 'root',
    factory: () => defaultInitialsColorFunction,
  }
);
