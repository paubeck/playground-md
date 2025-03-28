import React from 'react';
import { ICommand, ExecuteState, TextAreaTextApi } from './';
import { selectWord, executeCommand } from '../utils/markdownUtils';
import {Strikethrough} from "lucide-react";

export const strikethrough: ICommand = {
  name: 'strikethrough',
  keyCommand: 'strikethrough',
  shortcuts: 'ctrl+shift+x',
  buttonProps: {
    'aria-label': 'Add strikethrough text (ctrl + shift + x)',
    title: 'Add strikethrough text (ctrl + shift + x)',
  },
  prefix: '~~',
  icon: (
    <Strikethrough/>
  ),
  execute: (state: ExecuteState, api: TextAreaTextApi) => {
    const newSelectionRange = selectWord({
      text: state.text,
      selection: state.selection,
      prefix: state.command.prefix!,
    });
    const state1 = api.setSelectionRange(newSelectionRange);
    executeCommand({
      api,
      selectedText: state1.selectedText,
      selection: state.selection,
      prefix: state.command.prefix!,
    });
  },
};
