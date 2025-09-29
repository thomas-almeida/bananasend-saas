// components/Editor.tsx
'use client'

import { forwardRef, useEffect, useRef } from 'react';
import { EDITOR_JS_TOOLS } from './tools/tools';
import EditorJS from '@editorjs/editorjs'
import './editor-styles.module.css';

// Default template data
const DEFAULT_DATA = {
  time: new Date().getTime(),
  blocks: [
    {
      id: 'header1',
      type: 'header',
      data: {
        text: 'Novo Conteúdo',
        level: 1
      }
    },
    {
      type: 'paragraph',
      data: {
        text: 'Mussum Ipsum, cacilds vidis litro abertis. Tá deprimidis, eu conheço uma cachacis que pode alegrar sua vidis. Per aumento de cachacis, eu reclamis. Quem num gosta di mim que vai caçá sua turmis! Mais vale um bebadis conhecidiss, que um alcoolatra anonimis.'
      }
    },
  ]
};

type EditorHandle = {
  save: () => Promise<any>
}

const Editor = forwardRef<EditorHandle>((_, ref) => {
  const elementId = 'editorjs' // Defina aqui o ID para o elemento onde o Editor.js será renderizado

  useEffect(() => {

    const instance = new EditorJS({
      holder: elementId,
      tools: {
        ...EDITOR_JS_TOOLS,
        header: {
          class: EDITOR_JS_TOOLS.header.class,
          inlineToolbar: true,
          config: {
            placeholder: 'Digite um título...',
            levels: [1, 2, 3, 4],
            defaultLevel: 1
          }
        } as any
      },
      autofocus: true,
      data: DEFAULT_DATA,
      placeholder: 'Digite algo...',
      minHeight: 200,
      i18n: {
        messages: {
          toolNames: {
            'Text': 'Texto',
            'Image': 'Imagem',
            'Heading': 'Título',
            'List': 'Lista',
            'Quote': 'Citação',
            'Warning': 'Aviso',
            'Code': 'Código',
            'Table': 'Tabela',
            'InlineCode': 'Código Inline',
            'Unordered List': 'Lista não ordenada',
            'Ordered List': 'Lista ordenada',
          },
          tools: {
            'heading': {
              'Heading': 'Título',
              'Level': 'Nível'
            },
          },
          blockTunes: {
            'delete': {
              'Confirm': 'Tem certeza?'
            },
          }
        }
      },
    });
  }, [elementId])

  return (
    <div id={elementId}></div>
  )
})

Editor.displayName = 'Editor'

export default Editor