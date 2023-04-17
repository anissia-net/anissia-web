export default class TextAreaSelector {
  constructor(target: HTMLTextAreaElement) {
    this.target = target;
    this.selectCursor();
  }

  public target: HTMLTextAreaElement;
  public prefix = '';
  public select = '';
  public postfix = '';

  public get selectLinePrefix() {
    const pos = this.prefix.lastIndexOf('\n');
    return pos != -1 ? this.prefix.substring(0, pos + 1) : '';
  }

  public get selectLinePostfix() {
    const pos = this.postfix.indexOf('\n');
    return pos != -1 ? this.postfix.substring(pos) : '';
  }

  public get selectLine() {
    const pre = this.prefix.lastIndexOf('\n');
    const post = this.postfix.indexOf('\n');
    return (
      (pre != -1 ? this.prefix.substring(pre + 1) : this.prefix) +
      this.select +
      (post != -1 ? this.postfix.substring(0, post) : this.postfix)
    );
  }

  public get isSingleLineSelect() {
    return this.select.indexOf('\n') == -1;
  }

  public get isMultiLineSelect() {
    return this.select.indexOf('\n') != -1;
  }

  public selectCursor() {
    const target = this.target;
    const value = target.value;
    const sp = target.selectionStart;
    const ep = target.selectionEnd;
    this.prefix = value.substring(0, sp).replace(/\r/g, '');
    this.select = value.substring(sp, ep).replace(/\r/g, '');
    this.postfix = value.substring(ep).replace(/\r/g, '');
    return this;
  }

  public setCursor(addPrefixSelect?: string | null, setSelect?: string | null,  addPostfixSelect?: string | null) {
    if (typeof addPrefixSelect == 'string') {
      this.prefix += addPrefixSelect;
    }
    if (typeof setSelect == 'string') {
      this.select = setSelect;
    }
    if (typeof addPostfixSelect == 'string') {
      this.postfix = addPostfixSelect + this.postfix;
    }
  }

  public set(prefix?: string | null, select?: string | null, postfix?: string | null) {
    if (typeof prefix == 'string') {
      this.prefix = prefix;
    }
    if (typeof select == 'string') {
      this.select = select;
    }
    if (typeof postfix == 'string') {
      this.postfix = postfix;
    }
  }

  public apply(run?: (self: TextAreaSelector) => void) {
    if (run) {
      run(this);
    }
    this.target.value = this.prefix + this.select + this.postfix;
    this.target.setSelectionRange(this.prefix.length, this.prefix.length + this.select.length);
    this.target.focus();
    return this;
  }
}
