export type WebSpeechHandle = {
  start: () => void;
  stop: () => void;
};

export function isWebDictationAvailable(): boolean {
  return typeof window !== 'undefined' && typeof window.webkitSpeechRecognition === 'function';
}

export function startWebSpeech(onText: (text: string) => void): WebSpeechHandle | null {
  if (!isWebDictationAvailable()) return null;

  const Recognition = window.webkitSpeechRecognition!;
  const recognition = new Recognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-ZA';

  recognition.onresult = (event: { results: SpeechRecognitionResultList }) => {
    let full = '';
    for (let i = 0; i < event.results.length; i++) {
      const piece = event.results[i]?.[0]?.transcript ?? '';
      full += piece;
    }
    const text = full.replace(/\s+/g, ' ').trim();
    if (text) onText(text);
  };
  recognition.onerror = () => {};

  return {
    start: () => {
      try {
        recognition.start();
      } catch {
        /* already started */
      }
    },
    stop: () => {
      try {
        recognition.stop();
      } catch {
        /* ignore */
      }
    },
  };
}
