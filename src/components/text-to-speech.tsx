'use client';

import { textToSpeech } from '@/ai/flows/text-to-speech';
import { useLanguage } from '@/lib/i18n';
import { Loader2, Volume2, StopCircle } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';

function splitIntoSentences(text: string): string[] {
  if (!text) return [];
  // Split by sentences, keeping the delimiter. Handle various punctuation.
  const sentences = text.match(/[^.!?]+[.!?]*/g) || [];
  return sentences.map(s => s.trim()).filter(s => s.length > 0);
}

export function TextToSpeech() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'playing' | 'error'>('idle');
  const [currentSentence, setCurrentSentence] = useState(-1);
  const [sentences, setSentences] = useState<string[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sentenceRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const { language, t } = useLanguage();
  const { toast } = useToast();

  const cleanup = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    document.querySelectorAll('.tts-highlight').forEach(el => el.classList.remove('tts-highlight', 'bg-primary/20', 'rounded-md'));
    setStatus('idle');
    setCurrentSentence(-1);
  };
  
  const playNextSentence = async (index: number) => {
    if (index >= sentences.length) {
      cleanup();
      return;
    }

    // Remove highlight from previous sentence
    if (currentSentence > -1) {
        document.querySelectorAll('.tts-highlight').forEach(el => el.classList.remove('tts-highlight', 'bg-primary/20', 'rounded-md'));
    }

    setCurrentSentence(index);
    setStatus('loading');
    
    // Add highlight to current sentence
    const currentSentenceText = sentences[index];
    document.querySelectorAll('.content-to-read *').forEach(el => {
        if (el.textContent?.includes(currentSentenceText)) {
            const innerHTML = (el as HTMLElement).innerHTML;
            if(!innerHTML.includes('tts-highlight')) {
               (el as HTMLElement).innerHTML = innerHTML.replace(currentSentenceText, `<span class="tts-highlight bg-primary/20 rounded-md">${currentSentenceText}</span>`);
            }
        }
    });

    try {
      let voice: 'Algenib' | 'Achernar' = 'Algenib';
       if (language === 'te' || language === 'koya' || language === 'konda' || language === 'or' || language === 'hi') {
        voice = 'Achernar';
      }

      const result = await textToSpeech({ text: sentences[index], voice });

      if (audioRef.current) {
        audioRef.current.pause();
      }

      const audio = new Audio(result.audio);
      audioRef.current = audio;

      audio.onplay = () => setStatus('playing');
      audio.onended = () => playNextSentence(index + 1);
      audio.onerror = (e) => {
        console.error('Audio playback error', e);
        toast({
          variant: 'destructive',
          title: t('Playback Error'),
          description: t('Could not play the audio.'),
        });
        cleanup();
      };
      audio.play();

    } catch (err: any) {
      const errorMessage = err.message || t('An unexpected error occurred.');
      toast({
        variant: 'destructive',
        title: t('Text-to-Speech Failed'),
        description: t(errorMessage),
      });
      cleanup();
    }
  };
  
  const handlePlay = () => {
    const contentElement = document.querySelector('.content-to-read') as HTMLElement;
    const mainContent = contentElement?.innerText;

    if (!mainContent) {
      toast({
        variant: 'destructive',
        title: t('No Content Found'),
        description: t('Could not find any text to read on the page.'),
      });
      return;
    }
    
    const sentenceArray = splitIntoSentences(mainContent);
    setSentences(sentenceArray);
    playNextSentence(0);
  };

  const handleStop = () => {
    cleanup();
  };

  useEffect(() => {
    return () => {
      cleanup(); // Cleanup on component unmount
    };
  }, []);

  return (
    <div>
      <Button
        variant="outline"
        size="icon"
        onClick={status === 'playing' || status === 'loading' ? handleStop : handlePlay}
        disabled={false} // Allow stopping during loading
        aria-label={t('Read page content aloud')}
        className="rounded-full"
      >
        {status === 'loading' && <Loader2 className="h-5 w-5 animate-spin" />}
        {status === 'playing' && <StopCircle className="h-5 w-5" />}
        {status === 'idle' && <Volume2 className="h-5 w-5" />}
        {status === 'error' && <Volume2 className="h-5 w-5 text-destructive" />}
      </Button>
    </div>
  );
}
