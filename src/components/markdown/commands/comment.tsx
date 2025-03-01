import React from 'react';
import { ICommand, ExecuteState, TextAreaTextApi } from './';
import { selectWord, executeCommand } from '../utils/markdownUtils';
import {MessageSquareQuote} from "lucide-react";

export const comment: ICommand = {
  name: 'comment',
  keyCommand: 'comment',
  shortcuts: 'ctrlcmd+/',
  prefix: '<!-- ',
  suffix: ' -->',
  buttonProps: { 'aria-label': 'Insert comment (ctrl + /)', title: 'Insert comment (ctrl + /)' },
  icon: (
    <MessageSquareQuote />
  ),
  execute: (state: ExecuteState, api: TextAreaTextApi) => {
    const newSelectionRange = selectWord({
      text: state.text,
      selection: state.selection,
      prefix: state.command.prefix!,
      suffix: state.command.suffix,
    });
    const state1 = api.setSelectionRange(newSelectionRange);
    executeCommand({
      api,
      selectedText: state1.selectedText,
      selection: state.selection,
      prefix: state.command.prefix!,
      suffix: state.command.suffix,
    });
  },
};
