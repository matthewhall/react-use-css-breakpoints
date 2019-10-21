# use-css-breakpoints

> React hook to use breakpoints defined in your CSS.

[![npm version](https://badge.fury.io/js/react-use-css-breakpoints.svg)](https://badge.fury.io/js/react-use-css-breakpoints) [![Build Status](https://travis-ci.org/matthewhall/react-use-css-breakpoints.svg?branch=master)](https://travis-ci.org/matthewhall/react-use-css-breakpoints)

## Why?

There are other breakpoint hooks out there which are great, but my only gripe with them is that you are often forced to define your breakpoints in two different places: in your CSS and also in your JS. Not a massive deal, but (if I can) I like to keep things a little tidier and remove that duplication.

This hook attempts to do that.

Inspired by [this](https://www.lullabot.com/articles/importing-css-breakpoints-into-javascript) article by [Mike Herchel](https://www.lullabot.com/about/mike-herchel).

## How?

It works by checking the `content` property on the `::before` pseudo-element on the `body` element on window resize and returns the relevant breakpoint name as the viewport changes.

## Installation

__With NPM:__

```sh
npm i react-use-css-breakpoints
```

__With Yarn:__

```sh
yarn add react-use-css-breakpoints
```

## Usage

Define your breakpoints in your CSS. You can call them whatever you like:

```css
body::before {
  content: 'small';
  display: none;
}

@media (min-width: 400px) {
  body::before {
    content: 'medium';
  }
}

@media (min-width: 1000px) {
  body::before {
    content: 'large';
  }
}
```

If you're using Sass you could easily loop through them like so:

```scss
$breakpoints: (
  small: 0px,
  medium: 400px,
  large: 1000px
);

body {
  @for $i from 1 through length($breakpoints) {
    $breakpoint: nth($breakpoints, $i);
    $key: nth($breakpoint, 1);
    $value: nth($breakpoint, 2);

    @if $breakpoint == nth($breakpoints, 1) {
      &::before {
        content: '#{$key}';
        display: none;
      }
    }
    @else {
      @media (min-width: $value) {
        &::before {
          content: '#{$key}';
        }
      }
    }
  }
}
```

The hook will then use these to return the relevant breakpoint name on viewport size change:

```tsx
import { useCssBreakpoints } from 'react-use-css-breakpoints';

const breakpoint = useCssBreakpoints();
```

## License

The files included in this repository are licensed under the MIT license.
