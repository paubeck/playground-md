import React from 'react';
import { ICommand, TextState, TextAreaTextApi } from './';
import { ContextStore, ExecuteCommandState } from '../Context';
import {Columns2, PanelLeftClose, PanelRightClose} from "lucide-react";

export const codePreview: ICommand = {
  name: 'preview',
  keyCommand: 'preview',
  value: 'preview',
  shortcuts: 'ctrlcmd+9',
  buttonProps: { 'aria-label': 'Preview code (ctrl + 9)', title: 'Preview code (ctrl + 9)' },
  icon: (
    <PanelLeftClose/>
  ),
  execute: (
    state: TextState,
    api: TextAreaTextApi,
    dispatch?: React.Dispatch<ContextStore>,
    executeCommandState?: ExecuteCommandState,
    shortcuts?: string[],
  ) => {
    api.textArea.focus();
    if (shortcuts && dispatch && executeCommandState) {
      dispatch({ preview: 'preview' });
    }
  },
};

export const codeEdit: ICommand = {
  name: 'edit',
  keyCommand: 'preview',
  value: 'edit',
  shortcuts: 'ctrlcmd+7',
  buttonProps: { 'aria-label': 'Edit code (ctrl + 7)', title: 'Edit code (ctrl + 7)' },
  icon: (
    <PanelRightClose/>
  ),
  execute: (
    state: TextState,
    api: TextAreaTextApi,
    dispatch?: React.Dispatch<ContextStore>,
    executeCommandState?: ExecuteCommandState,
    shortcuts?: string[],
  ) => {
    api.textArea.focus();
    if (shortcuts && dispatch && executeCommandState) {
      dispatch({ preview: 'edit' });
    }
  },
};

export const codeLive: ICommand = {
  name: 'live',
  keyCommand: 'preview',
  value: 'live',
  shortcuts: 'ctrlcmd+8',
  buttonProps: { 'aria-label': 'Live code (ctrl + 8)', title: 'Live code (ctrl + 8)' },
  icon: (
    <Columns2/>
  ),
  execute: (
    state: TextState,
    api: TextAreaTextApi,
    dispatch?: React.Dispatch<ContextStore>,
    executeCommandState?: ExecuteCommandState,
    shortcuts?: string[],
  ) => {
    api.textArea.focus();
    if (shortcuts && dispatch && executeCommandState) {
      dispatch({ preview: 'live' });
    }
  },
};
