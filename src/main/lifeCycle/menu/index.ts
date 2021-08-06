import file_menu from '@/main/lifeCycle/menu/file-menu';
import edit_menu from '@/main/lifeCycle/menu/edit-menu';
import view_menu from '@/main/lifeCycle/menu/view-menu';
import window_menu from '@/main/lifeCycle/menu/window-menu';
import help_menu from '@/main/lifeCycle/menu/help-menu';

const menuTemplate: any[] = [];
menuTemplate.push(file_menu);
menuTemplate.push(edit_menu);
menuTemplate.push(view_menu);
menuTemplate.push(window_menu);
menuTemplate.push(help_menu);

export default menuTemplate;
