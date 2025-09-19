import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const predefinedResponses: Record<string, string> = {
  'hello': "Hello! I'm your TestMind AI assistant. I can help you with questions about context-aware testing, our platform features, pricing, and more. What would you like to know?",
  'hi': "Hi there! How can I help you with TestMind today?",
  'pricing': "Our pricing starts at R5,940/month for the Starter plan, R17,940/month for Professional, and R49,940/month for Enterprise. All plans include a 14-day free trial. Would you like me to explain the features of each plan?",
  'features': "TestMind offers revolutionary features including: Emotional Context Testing, Behavioral Pattern Learning, Cross-Reality Integration, Predictive Failure Intelligence, and Empathy-Driven Test Generation. Which feature interests you most?",
  'demo': "You can see our platform in action with the interactive demo on this page! It shows how our AI analyzes behavior, generates contexts, creates intelligent tests, and provides predictive analysis. Would you like to try it?",
  'help': "I can assist you with information about TestMind's features, pricing, how our AI works, demo walkthrough, and getting started. What specific area would you like help with?",
  'ai': "Our AI combines behavioral psychology, emotional state detection, and predictive analytics to create context-aware testing. It learns from real user interactions and predicts failure scenarios before they occur. Pretty cool, right?",
  'trial': "Yes! We offer a 14-day free trial for all our plans with no credit card required. You can experience the full power of context-aware testing risk-free. Ready to get started?",
  'contact': "You can reach our founders at nombulelo@testmind.ai or sukoluhle@testmind.ai. For general inquiries, feel free to continue chatting with me - I'm here to help!",
  'default': "I understand you're asking about TestMind. While I'm a demo chatbot with limited responses, I can help with questions about our features, pricing, demo, or getting started. Could you rephrase your question or ask about one of these topics?"
};

const quickActions = [
  "Show me pricing",
  "Explain AI features", 
  "Start free trial",
  "How does demo work?",
  "Contact information"
];

export const Chatbot = () => {
  const getInitialMessages = (): Message[] => ([
    {
      id: '1',
      text: "Hello! I'm your TestMind AI assistant. I'm here to help you learn about our Context-Aware Testing Intelligence platform. What would you like to know?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(getInitialMessages());
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Prevent overlapping site content by reserving space at the bottom when chat is open
  useEffect(() => {
    const originalPadding = document.body.style.paddingBottom;
    if (isOpen) {
      // Reserve space roughly equal to the chat height plus margins
      document.body.style.paddingBottom = '34rem';
    } else {
      document.body.style.paddingBottom = originalPadding || '';
    }

    return () => {
      document.body.style.paddingBottom = originalPadding || '';
    };
  }, [isOpen]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for keyword matches
    for (const [key, response] of Object.entries(predefinedResponses)) {
      if (lowerMessage.includes(key)) {
        return `${response}\n\nIs there anything else I can assist you with?`;
      }
    }
    
    return `${predefinedResponses.default}\n\nIs there anything else I can assist you with?`;
  };

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputValue.trim();
    if (!text) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(text),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // 1-2 second delay
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 md:w-96">
      <Card className={`overflow-hidden border-0 shadow-2xl bg-card/95 backdrop-blur-md transition-all duration-300 ${isOpen ? 'h-[28rem]' : 'h-14'}`}>
            <CardHeader className="pb-3 border-b border-border/50">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
                TestMind Assistant
                <Badge variant="secondary" className="ml-auto text-xs">
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI
                </Badge>
                <div className="flex items-center gap-1 ml-2">
                  <button
                    type="button"
                    aria-label={isOpen ? 'Collapse chat' : 'Expand chat'}
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 rounded-md hover:bg-muted transition-colors"
                  >
                    {isOpen ? <X className="w-4 h-4" /> : <MessageCircle className="w-4 h-4" />}
                  </button>
                </div>
              </CardTitle>
            </CardHeader>
            
            {isOpen && (
            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 pr-3 space-y-4 overflow-x-hidden">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.sender === 'bot' && (
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center flex-shrink-0">
                        <Bot className="w-3 h-3 text-primary-foreground" />
                      </div>
                    )}
                    
                    <div className={`max-w-[75%] ${message.sender === 'user' ? 'order-1' : ''}`}>
                      <div
                        className={`p-3 rounded-2xl text-sm break-words whitespace-pre-wrap leading-relaxed ${
                          message.sender === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted/80'
                        }`}
                      >
                        {message.text}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1 px-2">
                        {formatTime(message.timestamp)}
                      </div>
                    </div>

                    {message.sender === 'user' && (
                      <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                        <User className="w-3 h-3 text-secondary-foreground" />
                      </div>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
                      <Bot className="w-3 h-3 text-primary-foreground" />
                    </div>
                    <div className="bg-muted/80 p-3 rounded-2xl">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions */}
              <div className="px-4 py-2 border-t border-border/50">
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="whitespace-nowrap text-xs flex-shrink-0"
                      onClick={() => handleSendMessage(action)}
                      disabled={isTyping}
                    >
                      {action}
                    </Button>
                  ))}
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  I can also help with:
                </div>
                <div className="flex flex-wrap gap-2 mt-1">
                  {['Pricing', 'Features', 'Free Trial', 'Demo', 'Contact'].map((label, idx) => (
                    <Button
                      key={idx}
                      variant="secondary"
                      size="sm"
                      className="text-xs"
                      onClick={() => handleSendMessage(`Tell me about ${label.toLowerCase()}`)}
                      disabled={isTyping}
                    >
                      {label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="p-4 border-t border-border/50">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about TestMind..."
                    className="flex-1"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={() => handleSendMessage()}
                    disabled={!inputValue.trim() || isTyping}
                    size="sm"
                    className="px-3"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
            )}
          </Card>
        </div>
  );
};