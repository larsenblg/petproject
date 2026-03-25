import type { ChangeEvent } from 'react';

type ControlsProps = {
  apiKey: string;
  onApiKeyChange: (value: string) => void;
  onImprove: () => void;
  onContinue: () => void;
  loading: boolean;
};

export default function Controls({
  apiKey,
  onApiKeyChange,
  onImprove,
  onContinue,
  loading
}: ControlsProps) {
  return (
    <div className="controls">
      <input
        className="api-key-input"
        type="password"
        value={apiKey}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onApiKeyChange(event.target.value)}
        placeholder="DeepSeek API Key"
      />
      <div className="buttons-row">
        <button onClick={onImprove} disabled={loading}>
          {loading ? 'Loading...' : 'Улучшить текст'}
        </button>
        <button onClick={onContinue} disabled={loading}>
          {loading ? 'Loading...' : 'Продолжить'}
        </button>
      </div>
    </div>
  );
}
