export default class Editor {
  static key = {
    TAB: 9,
    ENTER: 13,
    BACKSPACE: 8,
    DELETE: 46,
    DOWN: 40,
    SPACE: 32,
    ESC: 27,
    CTRL: 17,
    META: 91,
    SHIFT: 16,
    ALT: 18
  };
  public textAreaId = 'daily_editor';
  public resultTextarea: HTMLElement | null;
  public toolbarOpened: boolean | undefined;
  public allTools = ['header', 'picture', 'list', 'quote', 'code', 'twitter', 'instagram', 'smile'];
  public settings!: Record<string, any>;

  // HTMLElement
  public wrapper = Editor.createEditorWrapper();

  constructor(settings: Record<string, any>) {
    this.resultTextarea = document.getElementById(this.textAreaId);
    if (typeof this.resultTextarea == undefined || this.resultTextarea == null) {
      console.warn('Textarea not found with ID %o', this.textAreaId);
      return this;
    }

    // 默认配置 settings
    const defaultSettings = {};

    if ('undefined' === typeof settings || 'object' != typeof settings) {
      settings = defaultSettings;
    } else {
      // todo merge setttings with defaults
    }
    if ('undefined' == typeof settings.tools || !Array.isArray(settings.tools)) {
      settings.tools = this.allTools;
    }
    this.settings = settings;

    /** Some configurations */
    this.toolbarOpened = false;

    /** Making a wrapper and interface */
    this.makeInterface();

    /** Bind all events */
    this.bindEvents();
  }

  private makeInterface() {
    const firstNode = Editor.createTextNode(
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro quia nihil repellendus aut cupiditate reprehenderit sapiente magnam nobis doloremque eaque! Sint nobis assumenda nisi ducimus minima illo tenetur, cumque facilis.'
    );

    /** Add first node */
    this.wrapper.appendChild(firstNode);

    /** Insert Editor after initial textarea. Hide textarea */
    if (this.resultTextarea && this.resultTextarea.parentNode) {
      this.resultTextarea.parentNode.insertBefore(this.wrapper, this.resultTextarea.nextSibling);
      this.resultTextarea.hidden = true;
    }

    /** Set auto focus */
    const contentEditable = firstNode.getElementsByClassName('ce_node_content');
    contentEditable.length && (contentEditable[0] as HTMLElement).focus();
  }

  public bindEvents(): void {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;

    /** All keydowns on Window */
    window.addEventListener(
      'keydown',
      function (event) {
        that.globalKeydownCallback(event);
      },
      false
    );
  }

  private globalKeydownCallback(event: any) {
    switch (event.keyCode) {
      case Editor.key.ENTER:
        this.enterKeyPressed(event);
        break; // Enter
    }
  }

  private enterKeyPressed(event: any) {
    const newNode = Editor.createTextNode();

    this.wrapper.insertBefore(newNode, event.target.parentNode.nextSibling);

    /** Set auto focus */
    const contentEditable = newNode.getElementsByClassName('ce_node_content');
    contentEditable.length && (contentEditable[0] as HTMLElement).focus();

    event.preventDefault();
  }

  /**
   * Paragraph node
   * @todo set unique id with prefix
   */
  private static createTextNode(content = ''): HTMLElement {
    const node = document.createElement('div');

    node.className += 'node';
    node.innerHTML = '<p class="ce_node_content" contenteditable="true">' + (content || '') + '</p>';

    return node;
  }

  private static createEditorWrapper(): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.className += 'daily_editor';
    return wrapper;
  }
}
