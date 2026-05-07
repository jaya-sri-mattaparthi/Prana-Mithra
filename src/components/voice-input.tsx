'use client';

import { useState, useEffect, useRef } from 'react';
import { Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface VoiceInputProps {
  onTranscript: (transcript: string) => void;
  lang: string;
  className?: string;
}

const SpeechRecognition =
  (typeof window !== 'undefined' &&
    (window.SpeechRecognition || window.webkitSpeechRecognition)) ||
  null;

export function VoiceInput({ onTranscript, lang, className }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const { t } = useLanguage();
  const { toast } = useToast();

  useEffect(() => {
    if (SpeechRecognition) {
      setIsSupported(true);
    }
  }, []);

  const handleToggleListen = () => {
    if (!SpeechRecognition) {
      return;
    }

    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      return;
    }

    // Stop any previous recognition instance
    if (recognitionRef.current) {
        recognitionRef.current.stop();
    }
    
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = lang;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onTranscript(transcript);
    };

    recognition.onerror = (event) => {
      toast({
        variant: 'destructive',
        title: t('Voice Input Failed'),
        description: t('Could not recognize speech. Please check your network connection and microphone permissions.'),
      });
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;
    };
    
    recognition.start();
  };
  
  if (!isSupported) {
    return null;
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={handleToggleListen}
      className={cn(
        "rounded-full transition-colors",
        isListening && 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        className
      )}
      aria-label={t('Toggle voice input')}
    >
      <Mic className={cn("h-5 w-5", isListening && "animate-pulse")} />
    </Button>
  );
}
