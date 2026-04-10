export function stopBrowserSpeech(): void {
  window.speechSynthesis.cancel();
}

export function speakBrowser(text: string, onEnd?: () => void): void {
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-ZA';
  u.rate = 0.96;
  u.onend = () => onEnd?.();
  window.speechSynthesis.speak(u);
}
