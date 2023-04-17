/**
 * md Util
 */
// @ts-ignore
import MarkdownIt from "markdown-it/dist/markdown-it.min.js";
import TextAreaSelector from "./TextAreaSelector";


class Md {
  public md = MarkdownIt({
    html:         false,
    xhtmlOut:     false,
    breaks:       true,
    linkify:      true,
    typographer:  false,
    highlight(code: string, lang: string) {
      // const div = document.createElement('div');
      // div.innerText = code;
      // return div.innerHTML;
      return '';
      },
  });

  public render(text: string): string {
    return this.md.render(text) as string;
  }

  public tab(event: KeyboardEvent) {
    event.preventDefault();
    const ts = new TextAreaSelector(event.target as HTMLTextAreaElement);
    const forward = !event.shiftKey;
    if (ts.isSingleLineSelect) {
      this.tabSingleLine(ts, forward);
    } else {
      this.tabMultiLine(ts, forward);
    }
  }

  public tabSingleLine(ts: TextAreaSelector, forward: boolean) {
    if (ts.select == '' && this.isMdListLine(ts.selectLine)) {
      this.tabSingleLineInList(ts, forward);
    } else {
      if (forward) {
        ts.apply((e) => { e.setCursor('    ', '') });
      } else {
        this.tabMultiLine(ts, forward);
      }
    }
  }

  public tabSingleLineInList(ts: TextAreaSelector, forward: boolean) {
    ts.apply((e) => {
      let pre = e.selectLinePrefix;
      if (forward) {
        pre += '    ' + e.selectLine.replace(/\t/g, '    ');
      } else {
        pre += e.selectLine.replace(/\t/g, '    ').replace(/[ ]{1,4}([+\-*]|\d\.)/, '$1');
      }
      e.set(pre, '', e.selectLinePostfix);
    });
  }

  public tabMultiLine(ts: TextAreaSelector, forward: boolean) {
    ts.apply((e) => { e.set(
      e.selectLinePrefix,
      e.selectLine.replace(/\t/g, '    ').split('\n')
        .map(e => forward ? ('    ' + e) : (e.replace(/^[ ]{1,4}/, ''))).join('\n'),
      e.selectLinePostfix
    )});
  }

  public enter(event: KeyboardEvent) {
    const ts = new TextAreaSelector(event.target as HTMLTextAreaElement);
    const line = ts.selectLine;
    if (this.isMdListLine(line)) {
      event.preventDefault();
      if ((/^\s*([+\-*]|\d\.)\s*$/).test(line)) {
        if ((/^\s+/).test(line)) {
          const tmp = line.replace(/\t/g, '    ').replace(/^[ ]{1,4}/, '');
          ts.apply(e => e.set(e.selectLinePrefix + tmp, '', e.selectLinePostfix));
        } else {
          ts.apply(e => e.set(e.selectLinePrefix, '', e.selectLinePostfix));
        }
      } else {
        ts.apply(e => e.setCursor('\n' + line.match(/^\s*([+\-*]|\d\.) /)!![0], ''))
      }
    } else if ((/^\s+/).test(line)) {
      event.preventDefault();
      ts.apply(e => e.setCursor('\n' + line.match(/^\s+/)!![0], ''))
    }
  }

  // is md list * - 1. line
  public isMdListLine(line: string) {
    return (/^\s*([+\-*]|\d\.) /).test(line);
  }
}


export default new Md();
