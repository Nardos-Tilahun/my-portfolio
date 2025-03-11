"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import NextImage from "next/image";
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Send, MessageCircle, X, Code, LinkIcon, Trash2, AlertTriangle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import remarkGfm from "remark-gfm"
import { TypeAnimation } from "react-type-animation"
import * as Tooltip from "@radix-ui/react-tooltip"
import { Image as LucideImage, /* other icons */ } from "lucide-react";


// Define a type for our chat messages
type Message = {
  id: number
  role: "user" | "ai"
  content: string
  isTyping?: boolean
  shouldRedirectToContact?: boolean
}

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [unreadCount, setUnreadCount] = useState(1)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)

  const [textareaHeight, setTextareaHeight] = useState("40px")

  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to the bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messagesEndRef]) //Corrected dependency

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 300)
      setUnreadCount(0)
    }
  }, [isOpen, inputRef]) //Corrected dependency

  // Auto-resize the textarea to fit all content without scrolling
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)

    // Auto-resize the textarea to fit all content without scrolling
    const textarea = e.target
    textarea.style.height = "40px" // Reset height to recalculate
    const scrollHeight = textarea.scrollHeight

    // Allow unlimited height to fit all content
    setTextareaHeight(`${scrollHeight}px`)
  }

  // Handle Enter key for submission
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      const form = document.getElementById("chat-form") as HTMLFormElement
      if (form && input.trim()) {
        form.requestSubmit()
      }
    }
  }

  const [hasConversationStarted, setHasConversationStarted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim()) return

    if (!hasConversationStarted) {
      setHasConversationStarted(true)
    }

    const messageToSend = input

    // Append the user's message to the chat
    const userMessage: Message = { id: Date.now(), role: "user", content: messageToSend }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setError(null)

    // Reset textarea height
    setTextareaHeight("40px")

    // Add a temporary "typing" message
    const typingMessageId = Date.now() + 1
    setMessages((prev) => [
      ...prev,
      {
        id: typingMessageId,
        role: "ai",
        content: "",
        isTyping: true,
      },
    ])

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageToSend, messages }),
      })
      setMessages((prev) => prev.filter((msg) => msg.id !== typingMessageId))

      if (!res.ok) {
        const errorMessageId = Date.now() + 2
        const aiMessage: Message = {
          id: errorMessageId,
          role: "ai",
          content:
            "I'm sorry, I'm having trouble connecting to the server right now. Please try again later or reach out directly through one of these channels:\n\n" +
            "- Email: [contactnardos@gmail.com](https://mail.google.com/mail/?view=cm&fs=1&to=contactnardos@gmail.com)\n" +
            "- Phone: +251 949494319\n\n" +
            "Or visit the [contact page](#contact) for more options.",
          shouldRedirectToContact: true,
        }
        setMessages((prev) => [...prev, aiMessage])

        // Set a subtle error notification that doesn't disrupt the flow
        setError("Connection issue detected. Contact information provided.")
        return
      }

      const data = await res.json()

      // Remove the typing indicator and add the real message
      setMessages((prev) => prev.filter((msg) => msg.id !== typingMessageId))

      // Add the AI's response
      const aiMessage: Message = {
        id: Date.now() + 2,
        role: "ai",
        content: data.message.content,
        shouldRedirectToContact: data.message.shouldRedirectToContact,
      }
      setMessages((prev) => [...prev, aiMessage])

      // If the message should redirect to contact, scroll to the contact section
      if (data.message.shouldRedirectToContact) {
        setTimeout(() => {
          const contactSection = document.getElementById("contact")
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth" })
          } else {
            // If contact section doesn't exist on the current page, try to navigate to it
            window.location.href = window.location.origin + "/#contact"
          }
        }, 1500) // Give user time to read the message before redirecting
      }
    } catch  {
      // Remove the typing indicator
      setMessages((prev) => prev.filter((msg) => msg.id !== typingMessageId))
      // Add a more helpful error message with contact information
      const errorMessageId = Date.now() + 3
      setMessages((prev) => [
        ...prev,
        {
          id: errorMessageId,
          role: "ai",
          content:
            "I'm sorry, I'm having trouble connecting to the server right now. Please try again later or reach out directly through one of these channels:\n\n" +
            "- Email: [contactnardos@gmail.com](https://mail.google.com/mail/?view=cm&fs=1&to=contactnardos@gmail.com)\n" +
            "- Phone: +251 9494 94319\n\n" +
            "Or visit the [contact page](#contact) for more options.",
          shouldRedirectToContact: true,
        },
      ])

      setError(null)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleChat = () => {
    setIsOpen((prev) => !prev)
  }

  // Clear chat history
  const clearChat = () => {
    setShowDeleteConfirmation(true)
  }

  const confirmClearChat = () => {
    setHasConversationStarted(false)
    setMessages([])
    setError(null)
    setShowDeleteConfirmation(false)
  }

  const cancelClearChat = () => {
    setShowDeleteConfirmation(false)
  }

  // Custom renderer for code blocks
  const CodeBlock = ({ language, value }: { language: string; value: string }) => {
    return (
      <div className="rounded-md overflow-hidden my-2">
        <div className="bg-gray-800 px-4 py-1 flex items-center justify-between">
          <span className="text-xs text-gray-400">{language}</span>
          <Code className="h-4 w-4 text-gray-400" />
        </div>
        <SyntaxHighlighter
          language={language || "javascript"}
          style={atomDark}
          customStyle={{ margin: 0, borderRadius: "0 0 0.375rem 0.375rem" }}
        >
          {value}
        </SyntaxHighlighter>
      </div>
    )
  }

  // Typing indicator component
  const TypingIndicator = () => (
    <div className="flex space-x-1 items-center px-2 py-1">
      <motion.div
        className="w-2 h-2 rounded-full bg-green-400"
        animate={{ scale: [0.5, 1, 0.5] }}
        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
      />
      <motion.div
        className="w-2 h-2 rounded-full bg-green-400"
        animate={{ scale: [0.5, 1, 0.5] }}
        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
      />
      <motion.div
        className="w-2 h-2 rounded-full bg-green-400"
        animate={{ scale: [0.5, 1, 0.5] }}
        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
      />
    </div>
  )

  // New component for delete confirmation
  const DeleteConfirmation = () => (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="absolute bottom-16 left-4 right-4 bg-red-300 rounded-lg shadow-lg overflow-hidden"
    >
      <div className="p-4 flex items-start">
        <div className="flex-shrink-0 mr-4">
          <div className="bg-red-100 rounded-full p-2">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
        </div>
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-gray-700 mb-1">Clear Chat History?</h3>
          <p className="text-red-900 text-sm mb-3">
            This action will permanently delete all messages. Are you sure you want to proceed?
          </p>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={cancelClearChat}
              className="bg-white text-red-600 hover:bg-red-100"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={confirmClearChat}
              className="bg-transparent border-red-300 text-red-100 hover:bg-red-700 hover:text-white"
            >
              Delete All
            </Button>
          </div>
        </div>
        <button onClick={cancelClearChat} className="absolute top-2 right-2 text-red-200 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  )

  // Custom Tooltip component
  const CustomTooltip = ({ children, content }: { children: React.ReactNode; content: string }) => (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className="bg-gray-800 text-white px-3 py-2 rounded-md shadow-lg text-sm" sideOffset={5}>
            {content}
            <Tooltip.Arrow className="fill-gray-800" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )

  return (
    <div className="fixed bottom-8 sm:bottom-16 right-2 xs:right-6 lg:right-6 xl:right-12 z-50">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="w-[380px] min-h-[550px] max-h-[80vh] max-w-[100vh] bg-gray-900 border border-green-700 rounded-lg shadow-2xl flex flex-col overflow-hidden relative"
            style={{ transformOrigin: "bottom right" }}
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-3 border-b border-green-700 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Avatar className="h-10 w-10 border-2 border-green-500 ring-2 ring-green-400/30">
                  <AvatarFallback className="bg-gradient-to-br from-green-700 to-green-600 text-white font-bold">
                    NT
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-white">Chat with Nardos</h3>
                  <div className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                    <p className="text-xs text-green-400">Ask me about my skills & projects</p>
                  </div>
                </div>
              </div>
              <div className="flex space-x-1">
                {hasConversationStarted && (
                  <CustomTooltip content="Clear chat history">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={clearChat}
                      className="text-green-400 hover:text-green-300 hover:bg-gray-800 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </CustomTooltip>
                )}
                <CustomTooltip content="Close chat">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleChat}
                    className="text-green-400 hover:text-green-300 hover:bg-gray-800 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </CustomTooltip>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 min-h-[300px] overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-900 to-gray-950">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-green-400 space-y-4 p-4">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="relative">
                      <MessageCircle className="h-16 w-16 mb-2 opacity-70" />
                      <motion.div
                        className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      />
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <TypeAnimation
                      sequence={[
                        "Hi there! I'm Nardos's virtual AI assistant.",
                        1000,
                        "Ask me anything about Nardos's experience, skills, or projects!",
                        1000,
                      ]}
                      wrapper="p"
                      speed={50}
                      className="text-center text-lg"
                      repeat={1}
                    />
                  </motion.div>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="flex flex-wrap justify-center gap-2 mt-4"
                  >
                    {["Tell me about his skills", "What projects has he worked on?", "What is his experience?"].map(
                      (suggestion, i) => (
                        <Button
                          key={i}
                          variant="outline"
                          className="bg-gray-800 border-green-700/50 hover:bg-gray-700  text-green-400 hover:text-gray-100 text-xs"
                          onClick={() => {
                            setInput(suggestion)
                            setTimeout(() => {
                              const form = document.getElementById("chat-form") as HTMLFormElement
                              if (form) form.requestSubmit()
                            }, 500)
                          }}
                        >
                          {suggestion}
                        </Button>
                      ),
                    )}
                  </motion.div>
                </div>
              ) : (
                messages.map((message) => (
                  <motion.div
                    key={message.id}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-start max-w-[85%] space-x-2">
                      {message.role !== "user" && (
                        <Avatar className="h-8 w-8 border-2 border-green-500 mt-1">
                          <AvatarFallback className="bg-gradient-to-br from-green-700 to-green-600 text-white">
                            AI
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <Card
                        className={`${
                          message.role === "user"
                            ? "bg-gradient-to-r from-green-700 to-green-600 text-[#112211] border-none shadow-lg shadow-green-900/20"
                            : "bg-gray-800 border-green-700/30 shadow-lg text-[#20B2AA]"
                        } overflow-hidden`}
                      >
                        <CardContent className="p-3 text-sm">
                          {message.isTyping ? (
                            <TypingIndicator />
                          ) : message.role === "ai" ? (
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              components={{
                                code(props) {
                                  const { className, children, ...rest } = props
                                  const match = /language-(\w+)/.exec(className || "")
                                  const isInline = !match && !props.node?.properties?.className

                                  return !isInline && match ? (
                                    <CodeBlock language={match[1]} value={String(children).replace(/\n$/, "")} />
                                  ) : (
                                    <code className="bg-gray-700 px-1 py-0.5 rounded text-green-300" {...rest}>
                                      {children}
                                    </code>
                                  )
                                },
                                a({ children, href,...props  }) {
                                  // Special handling for contact section links
                                  if (href === "#contact") {
                                    return (
                                      <button
                                        type="button"
                                        className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-md flex items-center gap-2 mt-2 transition-all"
                                        onClick={() => {
                                          const contactSection = document.getElementById("contact")
                                          if (contactSection) {
                                            contactSection.scrollIntoView({ behavior: "smooth" })
                                          } else {
                                            // If contact section doesn't exist on the current page, try to navigate to it
                                            window.location.href = window.location.origin + "/#contact"
                                          }
                                        }}
                                      >
                                        <LinkIcon className="h-4 w-4" />
                                        {children || "Contact Nardos"}
                                      </button>
                                    )
                                  }

                                  return (
                                    <a
                                      className="text-green-400 underline flex items-center gap-1 hover:text-green-300"
                                      href={href}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      {...props}
                                    >
                                      <LinkIcon className="h-3 w-3" />
                                      {children}
                                    </a>
                                  )
                                },
                                img({ src, ...props }) {
                                  return (
                                    <div className="relative my-2">
                                      <div className="absolute top-2 left-2 bg-black/50 p-1 rounded">
                                        <LucideImage className="h-4 w-4 text-white" />
                                      </div>
                                      <NextImage
                                        className="rounded-md max-w-full"
                                        src={src || "/placeholder.svg"}
                                        alt={props.alt || "Image"}
                                        crossOrigin="anonymous"
                                        width={500}  // adjust as needed
                                        height={300} // adjust as needed
                                      />
                                    </div>
                                  );
                                },                                
                                ul({ children, ...props }) {
                                  return (
                                    <ul className="list-disc pl-5 space-y-1" {...props}>
                                      {children}
                                    </ul>
                                  )
                                },
                                ol({ children, ...props }) {
                                  return (
                                    <ol className="list-decimal pl-5 space-y-1" {...props}>
                                      {children}
                                    </ol>
                                  )
                                },
                              }}
                            >
                              {message.content}
                            </ReactMarkdown>
                          ) : (
                            message.content
                          )}
                        </CardContent>
                      </Card>
                      {message.role === "user" && (
                        <Avatar className="h-8 w-8 mt-1">
                          <AvatarFallback className="bg-gray-700 text-indigo-400">ME</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
              {error && (
                <motion.div
                  className="text-red-500 text-center text-sm p-2 bg-red-500/10 rounded-md border border-red-500/20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {error}
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="border-t border-green-700/30 p-3 bg-gray-800">
              <form id="chat-form" onSubmit={handleSubmit} className="flex space-x-2">
                <div className="relative flex-1">
                  <textarea
                    ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                    value={input}
                    onChange={handleTextareaChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask me about Nardos..."
                    className="w-full bg-gray-700 border border-green-600/50 focus:border-green-500 text-white rounded-md px-3 py-2 shadow-inner resize-none min-h-[40px] overflow-hidden"
                    disabled={isLoading}
                    rows={1}
                    style={{ height: textareaHeight }}
                  />
                  {input.length > 0 && (
                    <motion.div
                      className="absolute right-2 bottom-2 text-xs text-gray-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {input.length}
                    </motion.div>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-gradient-to-r from-green-700 to-green-600 hover:from-green-600 hover:to-green-500 text-white shadow-lg shadow-green-900/20"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>

            {/* Delete Confirmation Popup */}
            <AnimatePresence>{showDeleteConfirmation && <DeleteConfirmation />}</AnimatePresence>
          </motion.div>
        ) : (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              boxShadow: ["0px 0px 0px rgba(0,200,83,0.3)", "0px 0px 15px rgba(0,200,83,0.6)", "0px 0px 0px rgba(0,200,83,0.3)"]
            }}
            exit={{ scale: 0.8, opacity: 0 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0px 0px 20px rgba(0,200,83,0.7)",
              background: "linear-gradient(45deg, #00c853, #2e7d32)"
            }}
            whileTap={{ 
              scale: 0.95,
              boxShadow: "0px 0px 5px rgba(0,200,83,0.8)" 
            }}
            onClick={toggleChat}
            transition={{ 
              duration: 0.3,
              boxShadow: { duration: 2, repeat: Infinity }
            }}
            className="bg-gradient-to-r from-green-700 to-green-600 text-white rounded-full p-4 shadow-lg shadow-green-900/20 flex items-center space-x-2 group relative overflow-hidden"
          >
          

            {/* Icon container with pulse effect */}
            <div className="relative z-10">
              <motion.div
                animate={{ 
                  rotate: [0, 0, 10, -10, 0],
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  repeatType: "loop",
                  times: [0, 0.6, 0.7, 0.8, 1]
                }}
              >
                <MessageCircle className="h-6 w-6" />
              </motion.div>
              
              {/* Pulsing dot with trailing effect */}
              <motion.div
                className="absolute -top-1 -right-1 h-2 w-2 bg-green-300 rounded-full"
                animate={{ 
                  scale: [1, 1.5, 1],
                  boxShadow: ["0px 0px 0px rgba(134,239,172,0)", "0px 0px 10px rgba(134,239,172,0.8)", "0px 0px 0px rgba(134,239,172,0)"]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatType: "loop" 
                }}
              />
            </div>

            {/* Text with wave effect */}
            <div className="pr-2 relative z-10 overflow-hidden">
              <motion.span 
                className="inline-block"
                animate={{
                  y: ["0%", "-15%", "0%"]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                  times: [0, 0.5, 1],
                  delay: 0.1
                }}
              >
                👋
              </motion.span>
              <span> Meet My </span>
              <motion.span
                className="inline-block font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-200 to-green-100"
                animate={{
                  backgroundPosition: ["0% center", "100% center", "0% center"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                Digital Twin
              </motion.span>
              <motion.span 
                className="inline-block"
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                  delay: 0.2
                }}
              >
                🤖
              </motion.span>
            </div>

            {/* Notification badge with bounce effect */}
            {unreadCount > 0 && (
              <motion.span
                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center z-20"
                initial={{ scale: 0 }}
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 0, 5, -5, 0]
                }}
                transition={{ 
                  scale: { duration: 0.8, repeat: Infinity, repeatType: "reverse" },
                  rotate: { duration: 1.5, repeat: Infinity, repeatType: "loop", times: [0, 0.6, 0.7, 0.8, 1] },
                  type: "spring", 
                  stiffness: 500, 
                  damping: 15 
                }}
              >
                {unreadCount}
              </motion.span>
            )}

            {/* Ripple effect on hover */}
            <motion.div
              className="absolute inset-0 rounded-full opacity-0 bg-white pointer-events-none"
              whileHover={{ 
                opacity: 0.2, 
                scale: 1.05,
                transition: { duration: 0.3 } 
              }}
            />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}