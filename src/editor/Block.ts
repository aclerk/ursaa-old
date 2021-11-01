import { BlockType } from '@/editor/type/block-type';

export class Block {
  type: BlockType = BlockType.Paragraph;
  prefix = '';
  content = '';
  show = '';
}
