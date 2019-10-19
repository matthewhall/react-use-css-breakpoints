import parseContentPropFromPseudoElement from './parse-content-prop-from-pseudo-element';

const originalQuerySelector = document.querySelector;
const originalGetComputedStyle = window.getComputedStyle;

beforeAll(() => {
  delete document.querySelector;
  delete window.getComputedStyle;
  document.querySelector = jest.fn(selector => document.createElement('body'));
  // @ts-ignore:disable-next-line
  window.getComputedStyle = jest.fn((el, pseudo) => {
    return { content: '"medium"' };
  });
});

afterAll(() => {
  document.querySelector = originalQuerySelector;
  window.getComputedStyle = originalGetComputedStyle;
});

test('Should should call the relevant DOM methods to get the computed style of the body.', () => {
  parseContentPropFromPseudoElement();
  expect(document.querySelector).toHaveBeenCalledWith('body');
  expect(window.getComputedStyle).toHaveBeenCalled();
});

test('Should strip and quotes from the start or end of the content value.', () => {
  const breakpoint = parseContentPropFromPseudoElement();

  expect(breakpoint).not.toContain('"');
  expect(breakpoint).not.toContain("'");
});

test('Should return an empty string if it the body element has no content property.', () => {
  // @ts-ignore:disable-next-line
  window.getComputedStyle = jest.fn((el, pseudo) => {
    return { content: '"normal"' };
  });

  const breakpoint = parseContentPropFromPseudoElement();

  expect(breakpoint).not.toBe('normal');
  expect(breakpoint).toBe('');
});
