import { useEffect, useState } from 'react';
import Controls from './components/Controls';
import Editor from './components/Editor';
import { requestDeepSeek } from './api';

const STORAGE_KEY = 'ai-notebook-text';

export default function App() {
  const [text, setText] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedText = localStorage.getItem(STORAGE_KEY);
    if (savedText) {
      setText(savedText);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, text);
  }, [text]);

  const handleImprove = async () => {
    if (!apiKey.trim()) {
      alert('Введите API-ключ.');
      return;
    }

    if (!text.trim()) {
      alert('Введите текст для улучшения.');
      return;
    }

    setLoading(true);
    try {
      const improved = await requestDeepSeek(apiKey.trim(), 'improve', text);
      setText(improved);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
      alert(`Ошибка: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = async () => {
    if (!apiKey.trim()) {
      alert('Введите API-ключ.');
      return;
    }

    if (!text.trim()) {
      alert('Введите текст для продолжения.');
      return;
    }

    setLoading(true);
    try {
      const continuation = await requestDeepSeek(apiKey.trim(), 'continue', text);
      setText((previous: string) => `${previous}\n\n${continuation}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
      alert(`Ошибка: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="app">
      <Editor value={text} onChange={setText} />
      <Controls
        apiKey={apiKey}
        onApiKeyChange={setApiKey}
        onImprove={handleImprove}
        onContinue={handleContinue}
        loading={loading}
      />
    </main>
  );
}
