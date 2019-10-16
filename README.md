# use-css-breakpoints

## Why?

There are other breakpoint hooks out there which are great, but my only gripe with them is that you are often forced to define your breakpoints in two different places: in your CSS and also in your JS. Not a massive deal, but (if I can) I like to keep things a little tidier and remove that duplication.

This hook attempts to do that.

## How?

It works by checking the `content` property on the `::before` pseudo-element on the `body` element on window resize and returning the relevant breakpoint name as the viewport changes.

### Usage

Define your breakpoints in your CSS. You can call them whatever you like:

```
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

If you're using Sass you could loop through these like so:

```
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

```
import useCssBreakpoints from 'react-use-css-breakpoints';

const breakpoint = useCssBreakpoints();
```
