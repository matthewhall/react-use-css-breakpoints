export default function parseContentPropFromPseudoElement(
  pseudo = ':before',
  selector = 'body'
): string {
  const el: Element = document.querySelector(selector) as Element;
  const content: string | null = window.getComputedStyle(el, pseudo).content;

  // If no content property exists then 'normal' is returned.
  if (content && content !== '"normal"') {
    return content.replace(/^["']|["']$/g, '');
  }

  return '';
}
