export default class Editor {
  /** 按键枚举 */
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
  static BUTTONS_TOGGLED_CLASSNAME = 'buttons_toggled';
  static defaultSettings = {};
  static textAreaId = 'daily_editor';
  public resultTextarea: HTMLElement | null;
  public toolbarOpened = false;
  public allTools = ['header', 'picture', 'list', 'quote', 'code', 'twitter', 'instagram', 'smile'];
  public settings!: Record<string, any>;

  /** 编辑器包装类 */
  public wrapper = Editor.createEditorWrapper();
  public toolbarButtons!: HTMLElement;

  constructor(settings: Record<string, any>) {
    this.resultTextarea = document.getElementById(Editor.textAreaId);
    if (typeof this.resultTextarea == undefined || this.resultTextarea == null) {
      console.warn('Textarea not found with ID %o', Editor.textAreaId);
      return this;
    }

    // 默认配置 settings
    const defaultSettings = {};

    if ('undefined' === typeof settings || 'object' != typeof settings) {
      settings = defaultSettings;
    } else {
      // todo merge setttings with defaults
    }

    settings.tools = settings.tools || this.allTools;
    this.settings = settings;

    /** 包装接口 */
    this.makeInterface();

    /** 绑定事件 */
    this.bindEvents();
  }

  private makeInterface() {
    const firstNode = Editor.createTextNode(
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro quia nihil repellendus aut cupiditate reprehenderit sapiente magnam nobis doloremque eaque! Sint nobis assumenda nisi ducimus minima illo tenetur, cumque facilis.'
    );
    this.toolbarButtons = this.createToolbarButtons();
    const toolbar = Editor.createToolbar();
    console.log(toolbar);
    /** 添加第一个文本节点 */
    this.wrapper.appendChild(firstNode);

    /** 创建toolbar */
    this.wrapper.appendChild(toolbar);

    /** 在原始的textarea后面插入编辑组件,并且隐藏textarea */
    if (this.resultTextarea && this.resultTextarea.parentNode) {
      this.resultTextarea.parentNode.insertBefore(this.wrapper, this.resultTextarea.nextSibling);
      this.resultTextarea.hidden = true;
    }

    /** 自动focus */
    Editor.focusNode(firstNode);
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
      case Editor.key.TAB:
        this.tabKeyPressed(event);
        break; // TAB
      case Editor.key.ENTER:
        this.enterKeyPressed(event);
        break; // Enter
    }
  }

  private tabKeyPressed(event: any) {
    // check if currently focused in contenteditable element
    if ('BODY' === event.target.tagName) return;
    const toolbar = event.target.parentNode.nextSibling;
    toolbar.appendChild(this.toolbarButtons);

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    setTimeout(() => {
      if (!toolbar.className.includes(Editor.BUTTONS_TOGGLED_CLASSNAME)) {
        toolbar.className = toolbar.className.trim() + ' ' + Editor.BUTTONS_TOGGLED_CLASSNAME;
        that.toolbarOpened = true;
      } else {
        toolbar.className = toolbar.className.replace(Editor.BUTTONS_TOGGLED_CLASSNAME, '');
        that.toolbarOpened = false;
      }
    });

    event.preventDefault();
  }

  private enterKeyPressed(event: any) {
    const newNode = Editor.createTextNode();
    const toolbar = Editor.createToolbar();

    this.wrapper.insertBefore(newNode, event.target.parentNode.nextSibling);

    this.wrapper.insertBefore(toolbar, newNode);

    /** 自动focus */
    Editor.focusNode(newNode);

    event.preventDefault();
  }

  /**
   * 创建文本节点
   */
  private static createTextNode(content = ''): HTMLElement {
    const node = document.createElement('div');

    node.className += 'node';
    node.innerHTML = '<p class="daily_editor_node_content" contenteditable="true">' + (content || '') + '</p>';

    return node;
  }

  private static createEditorWrapper(): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.className += 'daily_editor';
    return wrapper;
  }

  private static focusNode(node: HTMLElement): void {
    const contentEditable = node.getElementsByClassName('daily_editor_node_content');
    contentEditable.length && (contentEditable[0] as HTMLElement).focus();
  }

  /**
   * 创建空的toolbar
   * @private
   */
  private static createToolbar() {
    const bar = document.createElement('div');

    bar.className += 'add_buttons';

    bar.innerHTML = '<span class="toggler">' + '<i class="plus_btn daily_editor_icon-plus-circled-1"></i>' + '</span>';
    return bar;
  }

  /**
   * 根据type创建toolbar 按钮
   * @param type 类型
   * @private
   */
  private static createToolbarButton(type: string) {
    const button = document.createElement('button');

    button.dataset.type = type;
    button.innerHTML = '<i class="daily_editor_icon-' + type + '"></i>';

    return button;
  }

  /**
   * 创建所有toolbar 按钮
   * @private
   */
  private createToolbarButtons() {
    const toolbarButtons = document.createElement('span');
    toolbarButtons.classList.add('buttons');

    for (let i = 0; i < this.allTools.length; i++) {
      const tool = this.allTools[i];

      if (this.settings.tools.indexOf(tool) < 0) {
        continue;
      }

      const button = Editor.createToolbarButton(tool);
      toolbarButtons.appendChild(button);
    }
    return toolbarButtons;
  }
}
