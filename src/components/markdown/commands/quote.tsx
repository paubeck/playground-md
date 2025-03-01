import React from 'react';
import { ICommand, ExecuteState, TextAreaTextApi } from './';
import {
  getBreaksNeededForEmptyLineBefore,
  getBreaksNeededForEmptyLineAfter,
  selectWord,
  insertBeforeEachLine,
} from '../utils/markdownUtils';
import {Quote} from "lucide-react";

export const quote: ICommand = {
  name: 'quote',
  keyCommand: 'quote',
  shortcuts: 'ctrlcmd+q',
  prefix: '> ',
  buttonProps: { 'aria-label': 'Insert a quote (ctrl + q)', title: 'Insert a quote (ctrl + q)' },
  icon: (
    <Quote/>
  ),
  execute: (state: ExecuteState, api: TextAreaTextApi) => {
    const newSelectionRange = selectWord({
      text: state.text,
      selection: state.selection,
      prefix: state.command.prefix!,
    });
    const state1 = api.setSelectionRange(newSelectionRange);
    const breaksBeforeCount = getBreaksNeededForEmptyLineBefore(state1.text, state1.selection.start);
    const breaksBefore = Array(breaksBeforeCount + 1).join('\n');

    const breaksAfterCount = getBreaksNeededForEmptyLineAfter(state1.text, state1.selection.end);
    const breaksAfter = Array(breaksAfterCount + 1).join('\n');

    const modifiedText = insertBeforeEachLine(state1.selectedText, state.command.prefix!);
    api.replaceSelection(`${breaksBefore}${modifiedText.modifiedText}${breaksAfter}`);

    const selectionStart = state1.selection.start + breaksBeforeCount;
    const selectionEnd = selectionStart + modifiedText.modifiedText.length;
    api.setSelectionRange({ start: selectionStart, end: selectionEnd });
  },
};
