import React from 'react';
import { ICommand, ExecuteState, TextAreaTextApi } from './';
import {CircleHelp} from "lucide-react";

export const help: ICommand = {
  name: 'help',
  keyCommand: 'help',
  buttonProps: { 'aria-label': 'Open help', title: 'Open help' },
  icon: (
    <CircleHelp/>
  ),
  execute: () => {
    window.open('https://www.markdownguide.org/basic-syntax/', '_blank', 'noreferrer');
  },
};
