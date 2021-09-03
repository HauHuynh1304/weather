import React, {useRef, useEffect, useCallback} from 'react';
import {TextInput, TextInputProps, Text} from 'react-native';
import {useField} from '@unform/core';
import styles from './styles';

interface InputProps extends TextInputProps {
  name: string;
}
interface InputReference extends TextInput {
  value: string;
}
export default function Input({name, onChangeText, ...rest}: InputProps) {
  const inputRef = useRef<InputReference>(null);
  const {fieldName, registerField, defaultValue = '', error} = useField(name);
  useEffect(() => {
    if (inputRef.current) inputRef.current.value = defaultValue;
  }, [defaultValue]);
  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputRef.current,
      getValue() {
        if (inputRef.current) return inputRef.current.value;
        return '';
      },
      setValue(ref, value) {
        if (inputRef.current) {
          inputRef.current.setNativeProps({text: value});
          inputRef.current.value = value;
        }
      },
      clearValue() {
        if (inputRef.current) {
          inputRef.current.setNativeProps({text: ''});
          inputRef.current.value = '';
        }
      },
    });
  }, [fieldName, registerField]);
  const handleChangeText = useCallback(
    (value: string) => {
      if (inputRef.current) inputRef.current.value = value;
      if (onChangeText) onChangeText(value);
    },
    [onChangeText],
  );
  return (
    <TextInput
      style={styles.container}
      ref={inputRef}
      onChangeText={handleChangeText}
      defaultValue={defaultValue}
      {...rest}
    />
  );
}
