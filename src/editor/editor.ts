const key = {
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

const BUTTONS_TOGGLED_CLASSNAME = 'buttons_toggled';

export default class Editor {
  public resultTextarea: HTMLElement | null;
  public toolbarOpened: boolean | undefined;
  public BUTTONS_TOGGLED_CLASSNAME: string | undefined;
  public tools: string[] | undefined;

  constructor(textAreaId: string) {
    this.resultTextarea = document.getElementById(textAreaId);
    if (typeof this.resultTextarea == undefined || this.resultTextarea == null) {
      console.warn('Textarea not found with ID %o', textAreaId);
      return this;
    }

    this.toolbarOpened = false;
    this.tools = ['header', 'picture', 'list', 'quote', 'code', 'twitter', 'instagram', 'smile'];

    /** Some configurations */

    /** Making a wrapper and interface */
    this.makeInterface();

    /** Bind all events */
    this.bindEvents();
  }

  private makeInterface() {
    const wrapper = this.createEditorWrapper();
    const firstNode = this.createNode(
      '',
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro quia nihil repellendus aut cupiditate reprehenderit sapiente magnam nobis doloremque eaque! Sint nobis assumenda nisi ducimus minima illo tenetur, cumque facilis.'
    );
    const toolbar = this.createToolbar();
    let button;
    if (this.tools) {
      for (let i = 0; i < this.tools.length; i++) {
        button = this.createToolbarButton(this.tools[i]);
        toolbar.appendChild(button);
      }
    }

    /**
     * Add toolbar to node
     * @todo make toolbar rendering once
     */
    firstNode.appendChild(toolbar);

    /** Add first node */
    wrapper.appendChild(firstNode);

    /** Insert Editor after initial textarea. Hide textarea */
    if (this.resultTextarea && this.resultTextarea.parentNode) {
      this.resultTextarea.parentNode.insertBefore(wrapper, this.resultTextarea.nextSibling);
      this.resultTextarea.hidden = true;
    }

    /** Set auto focus */
    const contentEditable = firstNode.getElementsByClassName('ce_node_content');
    contentEditable.length && (contentEditable[0] as HTMLElement).focus();
  }

  public bindEvents() {
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
      case key.TAB:
        this.tabKeyPressed(event);
        break; // TAB
      case key.ENTER:
        this.enterKeyPressed(event);
        break; // Enter
    }
  }

  private tabKeyPressed(event: any) {
    const toolbar = document.getElementsByClassName('add_buttons');

    if (!toolbar[0].className.includes(BUTTONS_TOGGLED_CLASSNAME)) {
      toolbar[0].className = toolbar[0].className.trim() + ' ' + BUTTONS_TOGGLED_CLASSNAME;
      this.toolbarOpened = true;
    } else {
      toolbar[0].className = toolbar[0].className.replace(BUTTONS_TOGGLED_CLASSNAME, '');
      this.toolbarOpened = false;
    }

    event.preventDefault();
  }

  private enterKeyPressed(event: any) {
    console.log('enter');
  }

  /** Empty toolbar with toggler */
  private createToolbar() {
    const bar = document.createElement('div');
    bar.className += 'add_buttons';
    /** Toggler button*/
    bar.innerHTML = '<span class="toggler">' + '<i class="daily_editor_icon-plus-circled-1"></i>' + '</span>';
    return bar;
  }

  private createToolbarButton(type: string) {
    const button = document.createElement('button');

    button.dataset.type = type;
    button.innerHTML = '<i class="daily_editor_icon-' + type + '"></i>';

    return button;
  }

  /**
   * Paragraph node
   * @todo set unique id with prefix
   */
  private createNode(id: string, content: string) {
    const node = document.createElement('div');

    node.className += 'node';
    node.innerHTML = '<p class="ce_node_content" contenteditable="true">' + (content || '') + '</p>';

    return node;
  }

  private createEditorWrapper() {
    const wrapper = document.createElement('div');
    wrapper.className += 'daily_editor';
    return wrapper;
  }
}
