import React from 'react'

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const config = {
  toolbar : ["heading","|", "bold", "italic", "link", 'bulletedList', 'numberedList', 'blockQuote'],
  placeholder : "내용을 입력해주세요",
  heading: {
    options: [
        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'text-xl' },
        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
    ]
}
}
const Editor = ({content, setContent}) => {

  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        config={config}
        data={`${content || ""}`}
        onChange={ ( event, editor ) => {
          setContent(editor.getData()); 
      } }
        
      />  
    </div>
  )
}

export default Editor