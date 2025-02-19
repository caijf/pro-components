import React from 'react';
import { Checkbox } from 'antd';
import ProField from '@ant-design/pro-field';
import { ProSchema } from '@ant-design/pro-utils';
import { CheckboxGroupProps, CheckboxProps } from 'antd/lib/checkbox';
import { createField } from '../../BaseForm';
import { ProFormItemProps } from '../../interface';

export type ProFormCheckboxGroupProps = ProFormItemProps<CheckboxGroupProps> & {
  layout?: 'horizontal' | 'vertical';
  options: CheckboxGroupProps['options'];
  valueEnum?: ProSchema['valueEnum'];
  request?: ProSchema['request'];
};

const CheckboxGroup: React.FC<ProFormCheckboxGroupProps> = React.forwardRef(
  ({ options, fieldProps, proFieldProps, ...rest }, ref) => (
    <ProField
      ref={ref}
      valueType="checkbox"
      mode="edit"
      {...rest}
      fieldProps={{
        options,
        ...fieldProps,
      }}
      {...proFieldProps}
    />
  ),
);

export type ProFormCheckboxProps = ProFormItemProps<CheckboxProps>;

/**
 * 多选框的
 * @param
 */
const ProFormCheckbox: React.FC<ProFormCheckboxProps> = React.forwardRef<any, ProFormCheckboxProps>(
  ({ fieldProps, children }, ref) => {
    return (
      <Checkbox ref={ref} {...fieldProps}>
        {children}
      </Checkbox>
    );
  },
);

const Group = createField(CheckboxGroup);

const WrappedProFormCheckbox: React.ComponentType<ProFormCheckboxProps> & {
  Group: typeof Group;
} = createField<ProFormCheckboxProps>(ProFormCheckbox, {
  valuePropName: 'checked',
}) as any;

WrappedProFormCheckbox.Group = Group;

export default WrappedProFormCheckbox;
