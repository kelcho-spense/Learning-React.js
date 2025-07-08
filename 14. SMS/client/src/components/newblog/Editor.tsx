import Quill from 'quill';
import { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';

interface EditorProps {
    readOnly?: boolean;
    defaultValue?: any;
    onTextChange?: (...args: any[]) => void;
    onSelectionChange?: (...args: any[]) => void;
}

// Editor is an uncontrolled React component
const Editor = forwardRef<Quill | null, EditorProps>(({ readOnly, defaultValue, onTextChange, onSelectionChange }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const defaultValueRef = useRef(defaultValue);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);

    useLayoutEffect(() => {
        onTextChangeRef.current = onTextChange;
        onSelectionChangeRef.current = onSelectionChange;
    });

    useEffect(() => {
        if (ref && typeof ref !== 'function' && ref.current) {
            ref.current.enable(!readOnly);
        }
    }, [ref, readOnly]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const editorContainer = container.appendChild(
            container.ownerDocument.createElement('div'),
        );
        const quill = new Quill(editorContainer, {
            modules: {
                toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],
                    ['blockquote', 'code-block'],
                    // [{ 'header': 1 }, { 'header': 2 }],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    [{ 'script': 'sub' }, { 'script': 'super' }],
                    [{ 'indent': '-1' }, { 'indent': '+1' }],
                    [{ 'direction': 'rtl' }],
                    [{ 'size': ['small', false, 'large', 'huge'] }],
                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                    [{ 'color': [] }, { 'background': [] }],
                    [{ 'font': [] }],
                    [{ 'align': [] }],
                    ['link', 'image', 'video'],
                    ['clean']
                ],
            },
            theme: 'snow',
        });

        if (ref && typeof ref !== 'function') {
            ref.current = quill;
        }

        if (defaultValueRef.current) {
            quill.setContents(defaultValueRef.current);
        }

        quill.on(Quill.events.TEXT_CHANGE, (...args: any[]) => {
            onTextChangeRef.current?.(...args);
        });

        quill.on(Quill.events.SELECTION_CHANGE, (...args: any[]) => {
            onSelectionChangeRef.current?.(...args);
        });

        return () => {
            if (ref && typeof ref !== 'function') {
                ref.current = null;
            }
            if (container) {
                container.innerHTML = '';
            }
        };
    }, [ref]);

    return <div ref={containerRef}></div>;
});

Editor.displayName = 'Editor';

export default Editor;
