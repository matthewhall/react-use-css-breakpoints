export default function parseContentPropFromPseudoElement(
  pseudo = ':before',
  selector = 'body'
): string {
  const el: Element = document.querySelector(selector) as Element;
  const content: string | null = window.getComputedStyle(el, pseudo).content;

  if (content) {
    return content.replace(/^["']|["']$/g, '');
  }

  return '';
}
