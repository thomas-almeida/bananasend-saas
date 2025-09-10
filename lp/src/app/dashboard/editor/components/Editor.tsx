// components/Editor.tsx

'use client'

import { useEffect, useRef } from 'react';
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

// Esta função irá garantir que o componente seja renderizado uma única vez
const RenderEditor = (ElementId: string) => {
  const rendered = useRef<false | true>(false)

  useEffect(() => {
    if (!rendered.current) {
      rendered.current = true;

      // Aqui chamamos a execução do EditorJS e também podemos passar os parâmetros necessários para execução
      new EditorJS({
        holder: ElementId,
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
    } else {
      return
    }
  }, [ElementId])
}

export default function Editor() {
  const elementId = 'editorjs' // Defina aqui o ID para o elemento onde o Editor.js será renderizado

  RenderEditor(elementId)

  return (
    <div id={elementId}></div>
  )
}