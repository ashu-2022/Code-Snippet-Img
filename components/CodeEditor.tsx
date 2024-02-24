"use client";

import { Resizable } from "re-resizable";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-terminal";

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/mode-java";
import { useState, useEffect } from "react";
import Image from "next/image";
import { initialCode } from "@/utils/utilities";

interface CodeEditorProps {
  language: string;
  theme: string;
  icon: string;
  background?: string;
  currentPadding?: string;
}

const CodeEditor = ({
  language,
  theme,
  icon,
  background,
  currentPadding,
}: CodeEditorProps) => {
  const [width, setWidth] = useState(1000);
  const [height, setHeight] = useState<number | null>(500);
  const [title, setTitle] = useState("App");
  const [code, setCode] = useState(initialCode);

  // @ts-ignore // to Ignore this line
  const handleResize = (evt, direction, ref, pos) => {
    const newHeight = ref.style.height;
    setHeight(parseInt(newHeight, 10));
  };

  
  const updateSize = () => {
    setWidth(window.innerWidth);
  };

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  useEffect(() => {
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <Resizable
      minHeight={466}
      minWidth={510}
      maxWidth={1024}
      defaultSize={{
        width: width,
        height: height || 500,
      }}
      onResize={handleResize}
      className="resize-container relative"
      style={{ background: background }}
    >
      <div className="code-block" style={{ padding: currentPadding }}>
        <div
          className="handle handle-top absolute left-1/2 translate-x-[-50%] top-[-4px] w-2 h-2 
            rounded-full bg-slate-300 hover:bg-slate-50"
        ></div>
        <div
          className="handle handle-bottom absolute left-1/2 bottom-[-4px] w-2 h-2 rounded-full
        bg-slate-300 hover:bg-slate-50 "
        ></div>
        <div
          className="handle handle-left absolute left-[-4px] top-1/2 w-2 h-2 rounded-full 
        bg-slate-300 hover:bg-slate-50 "
        ></div>
        <div
          className="handle handle-right absolute right-[-4px] top-1/2 w-2 h-2 rounded-full
        bg-slate-300 hover:bg-slate-50 "
        ></div>

        <div
          className="code-title h-[52px] px-4 flex items-center justify-between
        bg-black bg-opacity-80"
        >
          <div className="dots flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-[#ff5656]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbc6a]"></div>
            <div className="w-3 h-3 rounded-full bg-[#68f772]"></div>
          </div>
          <div className="input-control w-full">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-[hsla(0, 0%, 100%, .6)] outline-none font-medium text-center bg-transparent"
              style={{ lineHeight: "1.8rem" }}
            />
          </div>
          <div
            className="icon flex justify-center items-center p-1 bg-black bg-opacity-30
          rounded-sm"
          >
            <Image src={icon} alt={language} width={32} height={32} />
          </div>
        </div>
        <AceEditor
          fontSize={16}
          value={code}
          onChange={handleCodeChange}
          wrapEnabled={true}
          showPrintMargin={false}
          showGutter={false}
          height={`calc(${height}px - ${currentPadding} - ${currentPadding} - 52px)`}
          highlightActiveLine={true}
          editorProps={{ $blockScrolling: true }}
          theme={theme}
          mode={language.toLocaleLowerCase()}
          className="ace-editor-container"
          name="UNIQUE_ID_OF_DIV"
        />
      </div>
    </Resizable>
  );
};

export default CodeEditor;
