CREATE TABLE IF NOT EXISTS `option` -- 配置表
(
    `option_id`    TEXT NOT NULL, -- 配置id
    `option_name`  TEXT NOT NULL, -- 配置名称
    `name_desc`    TEXT NOT NULL, -- 配置名称描述
    `option_value` TEXT NOT NULL, -- 配置值
    `value_desc`   TEXT NOT NULL, -- 配置值描述
    `type`         TEXT NOT NULL, -- 配置类型
    `create_time`  TEXT NOT NULL,      -- 创建时间
    `update_time`  TEXT NOT NULL,      -- 修改时间
    primary key (`option_id`)
);

CREATE TABLE IF NOT EXISTS `note` -- 笔记表
(
    `note_id`        TEXT NOT NULL,           -- 笔记id
    `parent_note_id` TEXT NOT NULL,           -- 笔记本id
    `icon`           TEXT NOT NULL,           -- 图标
    `order`          int,                     -- 排序
    `title`          text,                    -- 标题
    `is_delete`      int  not null default 0, -- 是否删除
    `create_time`    TEXT NOT NULL,                -- 创建时间
    `update_time`    TEXT NOT NULL,                -- 更新时间
    PRIMARY KEY (`note_id`)
);

CREATE TABLE IF NOT EXISTS `note_content` -- 笔记内容表
(
    `note_content_id` TEXT NOT NULL,-- 笔记内容id
    `note_id`         TEXT NOT NULL,-- 笔记id
    `content`         TEXT NOT NULL,-- 笔记内容
    `create_time`     TEXT NOT NULL,     -- 创建时间
    `update_time`     TEXT NOT NULL,     -- 更新时间
    PRIMARY KEY (`note_content_id`)
)



