/**
 * - F11 禁用全屏放大
 * - CTRL+R 禁用刷新
 * - CTRL+SHIFT+R 禁用刷新
 */
const devShortcuts = ['F11', 'Ctrl+R', 'Ctrl+SHIFT+R']; // 这里主要是在开发中需要用到，但是正式环境需要屏蔽的快捷键

const shortcuts = ['Ctrl+N', 'SHIFT+F10', 'Ctrl+SHIFT+I']; // 这里是直接屏蔽掉的快捷键

const exportKeys = process.env.NODE_ENV === 'development' ? shortcuts : [...devShortcuts, ...shortcuts];

export default exportKeys;
