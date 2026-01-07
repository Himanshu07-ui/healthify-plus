import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, VolumeX, Send, RotateCcw, Bot, User, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type Language = 'en' | 'hi';
type Message = { role: 'user' | 'assistant'; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-doctor`;
const TTS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/doctor-tts`;

export const AIDoctorChat = () => {
  const [language, setLanguage] = useState<Language | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [micSupported, setMicSupported] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognitionAPI) {
      const recognition = new SpeechRecognitionAPI();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;
      
      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join('');
        
        setInput(transcript);
        
        // If final result, stop listening
        if (event.results[event.results.length - 1].isFinal) {
          setIsListening(false);
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        
        if (event.error === 'not-allowed') {
          toast.error(language === 'hi' 
            ? 'माइक्रोफोन की अनुमति दें' 
            : 'Please allow microphone access');
          setMicSupported(false);
        } else if (event.error === 'no-speech') {
          toast.info(language === 'hi' 
            ? 'कोई आवाज नहीं सुनाई दी' 
            : 'No speech detected. Try again.');
        } else {
          toast.error(language === 'hi' 
            ? 'आवाज पहचानने में त्रुटि' 
            : 'Voice recognition error');
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } else {
      setMicSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {
          // Ignore
        }
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [language]);

  const startListening = useCallback(async () => {
    if (!recognitionRef.current) {
      toast.error(language === 'hi' 
        ? 'आवाज पहचान उपलब्ध नहीं है। Chrome browser का उपयोग करें।' 
        : 'Voice recognition not available. Please use Chrome browser.');
      return;
    }

    // Request microphone permission first
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (err) {
      toast.error(language === 'hi' 
        ? 'माइक्रोफोन की अनुमति दें' 
        : 'Please allow microphone access in your browser');
      setMicSupported(false);
      return;
    }

    try {
      recognitionRef.current.lang = language === 'hi' ? 'hi-IN' : 'en-US';
      recognitionRef.current.start();
      setIsListening(true);
      toast.info(language === 'hi' ? 'बोलिए...' : 'Speak now...');
    } catch (err) {
      console.error('Failed to start recognition:', err);
      setIsListening(false);
    }
  }, [language]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // Ignore
      }
    }
    setIsListening(false);
  }, []);

  const speak = useCallback(async (text: string) => {
    if (!voiceEnabled) return;
    
    // Stop any current audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    setIsSpeaking(true);

    try {
      const response = await fetch(TTS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ text, language }),
      });

      if (!response.ok) {
        throw new Error('TTS request failed');
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      
      audio.onended = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(audioUrl);
      };
      
      audio.onerror = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(audioUrl);
      };
      
      await audio.play();
    } catch (error) {
      console.error('TTS error:', error);
      setIsSpeaking(false);
      // Fallback to browser TTS
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  }, [language, voiceEnabled]);

  const stopSpeaking = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading || !language) return;

    const userMessage: Message = { role: 'user', content: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    let assistantContent = '';

    try {
      const response = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ 
          messages: [...messages, userMessage],
          language 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get response');
      }

      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        buffer += decoder.decode(value, { stream: true });
        
        let newlineIndex: number;
        while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
          let line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);
          
          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;
          
          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') break;
          
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantContent += content;
              setMessages(prev => {
                const last = prev[prev.length - 1];
                if (last?.role === 'assistant') {
                  return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantContent } : m);
                }
                return [...prev, { role: 'assistant', content: assistantContent }];
              });
            }
          } catch {
            buffer = line + '\n' + buffer;
            break;
          }
        }
      }

      // Speak the response with ElevenLabs
      if (assistantContent && voiceEnabled) {
        speak(assistantContent);
      }
    } catch (error) {
      console.error('Chat error:', error);
      toast.error(language === 'hi' ? 'उत्तर प्राप्त करने में त्रुटि' : 'Error getting response');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const startConversation = (lang: Language) => {
    setLanguage(lang);
    const greeting: Message = {
      role: 'assistant',
      content: lang === 'hi' 
        ? 'नमस्ते! मैं Healthify AI Doctor हूं। मैं एक AI सहायक हूं, असली डॉक्टर नहीं। आप अपनी स्वास्थ्य समस्या बता सकते हैं। आपको क्या तकलीफ है?'
        : 'Hello! I am Healthify AI Doctor. I am an AI assistant, not a real doctor. Please tell me about your health concern. What symptoms are you experiencing?'
    };
    setMessages([greeting]);
    if (voiceEnabled) {
      setTimeout(() => speak(greeting.content), 500);
    }
  };

  const resetChat = () => {
    stopSpeaking();
    setMessages([]);
    setLanguage(null);
    setInput('');
  };

  // Language selection screen
  if (!language) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <Card className="p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full gradient-primary flex items-center justify-center">
            <Bot className="w-10 h-10 text-primary-foreground" />
          </div>
          <h2 className="text-2xl font-heading font-bold mb-2">Healthify AI Doctor</h2>
          <p className="text-muted-foreground mb-6">
            Choose your preferred language / अपनी भाषा चुनें
          </p>
          
          <div className="flex flex-col gap-3">
            <Button
              variant="outline"
              size="lg"
              onClick={() => startConversation('en')}
              className="text-lg py-6"
            >
              🇬🇧 English
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => startConversation('hi')}
              className="text-lg py-6"
            >
              🇮🇳 हिंदी (Hindi)
            </Button>
          </div>

          <div className="mt-6 p-4 bg-warning/10 rounded-lg border border-warning/20">
            <div className="flex items-center gap-2 text-warning mb-2">
              <AlertTriangle className="w-4 h-4" />
              <span className="font-medium text-sm">Disclaimer / अस्वीकरण</span>
            </div>
            <p className="text-xs text-muted-foreground">
              This is an AI assistant, not a real doctor. Always consult a healthcare professional for medical advice.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              यह एक AI सहायक है, असली डॉक्टर नहीं। चिकित्सा सलाह के लिए हमेशा डॉक्टर से मिलें।
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[600px] max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-card rounded-t-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold">Healthify AI Doctor</h3>
            <p className="text-xs text-muted-foreground">
              {language === 'hi' ? 'AI स्वास्थ्य सहायक' : 'AI Health Assistant'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            title={voiceEnabled ? 'Disable voice' : 'Enable voice'}
          >
            {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={resetChat}
            title="Start over"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
        <AnimatePresence mode="popLayout">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={cn(
                "flex gap-3",
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-3 text-sm",
                  message.role === 'user'
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-card border rounded-bl-md"
                )}
              >
                {message.content}
              </div>
              {message.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-secondary-foreground" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="bg-card border rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Speaking indicator */}
      {isSpeaking && (
        <div className="px-4 py-2 bg-primary/10 flex items-center gap-2 text-sm text-primary">
          <Volume2 className="w-4 h-4 animate-pulse" />
          {language === 'hi' ? 'बोल रहा हूं...' : 'Speaking...'}
          <Button variant="ghost" size="sm" onClick={stopSpeaking}>
            {language === 'hi' ? 'रोकें' : 'Stop'}
          </Button>
        </div>
      )}

      {/* Listening indicator */}
      {isListening && (
        <div className="px-4 py-2 bg-destructive/10 flex items-center gap-2 text-sm text-destructive">
          <Mic className="w-4 h-4 animate-pulse" />
          {language === 'hi' ? 'सुन रहा हूं... बोलिए' : 'Listening... Speak now'}
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t bg-card rounded-b-lg">
        <div className="flex gap-2">
          <Button
            type="button"
            variant={isListening ? "destructive" : "outline"}
            size="icon"
            onClick={isListening ? stopListening : startListening}
            disabled={isLoading || !micSupported}
            className={cn("flex-shrink-0", isListening && "animate-pulse")}
            title={micSupported ? (isListening ? 'Stop' : 'Speak') : 'Microphone not available'}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </Button>
          
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              isListening 
                ? (language === 'hi' ? 'सुन रहा हूं...' : 'Listening...')
                : (language === 'hi' ? 'अपनी समस्या लिखें या बोलें...' : 'Type or speak your symptoms...')
            }
            disabled={isLoading}
            className="flex-1"
          />
          
          <Button
            type="submit"
            variant="hero"
            size="icon"
            disabled={!input.trim() || isLoading}
            className="flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        
        {!micSupported && (
          <p className="text-xs text-destructive mt-2 text-center">
            {language === 'hi' 
              ? '⚠️ माइक्रोफोन उपलब्ध नहीं है। Chrome browser का उपयोग करें।'
              : '⚠️ Microphone not available. Please use Chrome browser.'}
          </p>
        )}
        
        <p className="text-xs text-muted-foreground mt-2 text-center">
          {language === 'hi' 
            ? '⚠️ यह AI सहायक है, असली डॉक्टर नहीं। गंभीर समस्या में तुरंत डॉक्टर से मिलें।'
            : '⚠️ This is an AI assistant, not a real doctor. Seek medical help for serious conditions.'}
        </p>
      </form>
    </div>
  );
};
