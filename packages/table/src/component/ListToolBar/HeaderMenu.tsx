import React from 'react';
import { Dropdown, Menu, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import './index.less';

export interface ListToolBarMenuItem {
  key: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface ListToolBarHeaderMenuProps {
  type?: 'inline' | 'dropdown';
  activeKey?: React.Key;
  items?: ListToolBarMenuItem[];
  onChange?: (activeKey?: React.Key) => void;
  prefixCls?: string;
}

const HeaderMenu: React.FC<ListToolBarHeaderMenuProps> = (props) => {
  const { items = [], type = 'inline', prefixCls, activeKey: propActiveKey } = props;

  const [activeKey, setActiveKey] = useMergedState<React.Key>(propActiveKey as React.Key, {
    value: propActiveKey,
    onChange: props.onChange,
  });

  if (items.length < 1) {
    return null;
  }

  const activeItem =
    items.find((item) => {
      return item.key === activeKey;
    }) || items[0];

  if (type === 'inline') {
    return (
      <div className={classNames(`${prefixCls}-menu`, `${prefixCls}-inline-menu`)}>
        {items.map((item) => (
          <div
            key={item.key}
            onClick={() => {
              setActiveKey(item.key);
            }}
            className={classNames(
              `${prefixCls}-inline-menu-item`,
              activeItem.key === item.key ? `${prefixCls}-inline-menu-item-active` : undefined,
            )}
          >
            {item.label}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={classNames(`${prefixCls}-menu`, `${prefixCls}-dropdownmenu`)}>
      <Dropdown
        trigger={['click']}
        overlay={
          <Menu
            selectedKeys={[activeItem.key]}
            onClick={(item) => {
              setActiveKey(item.key);
            }}
          >
            {items.map((item) => (
              <Menu.Item key={item.key} disabled={item.disabled}>
                {item.label}
              </Menu.Item>
            ))}
          </Menu>
        }
      >
        <Space className={`${prefixCls}-dropdownmenu-label`}>
          {activeItem.label}
          <DownOutlined />
        </Space>
      </Dropdown>
    </div>
  );
};

export default HeaderMenu;
