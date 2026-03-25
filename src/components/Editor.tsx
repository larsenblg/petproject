import type { ChangeEvent } from 'react';

type EditorProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function Editor({ value, onChange }: EditorProps) {
  return (
    <textarea
      className="editor"
      value={value}
      onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onChange(event.target.value)}
      placeholder="Введите ваш текст..."
    />
  );
}
