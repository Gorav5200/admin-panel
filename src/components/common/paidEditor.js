import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function PaidEditor() {
  // Define a custom configuration for the toolbar
  const customToolbarConfig = {
    toolbar: {
      items: [
        'heading',
        '|',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        '|',
        'bulletedList',
        'numberedList',
        '|',
        'link',
        'blockQuote',
        '|',
        'imageUpload',
        '|',
        'undo',
        'redo'
      ]
    }
  };

  return (
    <div className='App'>
      <h2>CKEditor 5 React App</h2>
      <CKEditor
        editor={ ClassicEditor }
        data="<p>Hello from CKEditor 5!</p>"
        config={ customToolbarConfig } // Use the custom configuration here
        onReady={ ( editor ) => {
          console.log( "CKEditor5 React Component is ready to use!", editor );
        } }
        onChange={ ( event, editor ) => {
          const data = editor.getData();
          console.log( { event, editor, data } );
        } }
      />
    </div>
  );
}
