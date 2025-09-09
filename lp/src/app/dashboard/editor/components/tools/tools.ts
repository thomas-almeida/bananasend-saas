// tools.js
import Table from "@editorjs/table";
import List from "@editorjs/list";
import Warning from "@editorjs/warning";
import Code from "@editorjs/code";
import Image from "@editorjs/image";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import InlineCode from "@editorjs/inline-code";

export const EDITOR_JS_TOOLS = {
  table: Table,
  list: List,
  warning: Warning,
  code: Code,
  image: {
    class: Image,
    config: {
      endpoints: {
        byFile: '/api/upload',
        byUrl: '/api/upload',
      },
      field: 'file',
    }
  },
  header: {
    class: Header,
    config: {
      levels: [1, 2, 3, 4],
      defaultLevel: 1,
    },
  },
  quote: Quote,
  inlineCode: InlineCode,
};
