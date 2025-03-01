import React, { useContext, useEffect } from 'react';
import { IProps } from '../../Types';
import { EditorContext, ExecuteCommandState } from '../../Context';
import { TextAreaCommandOrchestrator } from '../../commands';
import handleKeyDown from './handleKeyDown';
import shortcuts from './shortcuts';
import './index.css';
import {Textarea} from "@/components/ui/textarea";

export interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'value'>, IProps {}

export default function TextareaEditor(props: TextAreaProps) {
  const { prefixCls, onChange, ...other } = props;
  const {
    markdown,
    commands,
    fullscreen,
    preview,
    highlightEnable,
    extraCommands,
    tabSize,
    defaultTabEnable,
    dispatch,
  } = useContext(EditorContext);
  const textRef = React.useRef<HTMLTextAreaElement>(null);
  const executeRef = React.useRef<TextAreaCommandOrchestrator>();
  const statesRef = React.useRef<ExecuteCommandState>({ fullscreen, preview });

  useEffect(() => {
    statesRef.current = { fullscreen, preview, highlightEnable };
  }, [fullscreen, preview, highlightEnable]);

  useEffect(() => {
    if (textRef.current && dispatch) {
      const commandOrchestrator = new TextAreaCommandOrchestrator(textRef.current);
      executeRef.current = commandOrchestrator;
      dispatch({ textarea: textRef.current, commandOrchestrator });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onKeyDown = (e: KeyboardEvent | React.KeyboardEvent<HTMLTextAreaElement>) => {
    handleKeyDown(e, tabSize, defaultTabEnable);
    shortcuts(e, [...(commands || []), ...(extraCommands || [])], executeRef.current, dispatch, statesRef.current);
  };
  useEffect(() => {
    if (textRef.current) {
      textRef.current.addEventListener('keydown', onKeyDown);
    }
    return () => {
      if (textRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        textRef.current.removeEventListener('keydown', onKeyDown);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Textarea
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck={false}
      {...other}
      ref={textRef}
      className={`w-11/12 rounded-none h-[70svh] text-xl ${prefixCls}-text-input ${other.className ? other.className : ''}`}
      value={markdown}
      onChange={(e) => {
        dispatch && dispatch({ markdown: e.target.value });
        onChange && onChange(e);
      }}
    />
  );
}
