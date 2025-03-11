"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { FaUserShield, FaUsers, FaCreditCard, FaMoneyBillWave } from "react-icons/fa";
import { SiJsonwebtokens, SiMysql } from "react-icons/si";
import { MdNotifications } from "react-icons/md";
import { FaReact } from "react-icons/fa";
import { motion } from "framer-motion";
import { useMediaQuery } from '@react-hook/media-query';

// Define TypeScript interfaces
interface DiagramComponent {
  id: string;
  icon: React.ReactNode;
  label: string;
  x: number;
  y: number;
  color: string;
  description?: string;
}

interface Connection {
  from: string;
  to: string;
  label: string;
  style?: string;
  color?: string;
}

interface ArchitectureDiagramProps {
  customComponents?: DiagramComponent[];
  customConnections?: Connection[];
}

const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({ 
  customComponents, 
  customConnections 
}) => {
  const [activeComponent, setActiveComponent] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [initialTouchDistance, setInitialTouchDistance] = useState<number | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startDragPosition, setStartDragPosition] = useState({ x: 0, y: 0 });
  
  const diagramRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const isSmallScreen = useMediaQuery('(max-width: 640px)');
  const isMediumScreen = useMediaQuery('(max-width: 1024px)');
  
  // Default diagram components with BETTER SPACING to prevent overlap
  const defaultDiagramComponents: DiagramComponent[] = [
    { 
      id: "adminUser", 
      icon: <FaUserShield className="text-purple-400" />, 
      label: "Admin Users", 
      x: 6, 
      y: 12,
      color: "purple-400",
      description: "System administrators who manage the platform" 
    },
    { 
      id: "customerUser", 
      icon: <FaUsers className="text-blue-400" />, 
      label: "Customer Users", 
      x: 6, 
      y: 42,
      color: "blue-400",
      description: "End users who apply for and manage loans" 
    },
    { 
      id: "frontend", 
      icon: <FaReact className="text-cyan-400" />, 
      label: "React Frontend", 
      x: 30, 
      y: 27,
      color: "cyan-400",
      description: "Responsive UI built with React and Tailwind CSS" 
    },
    { 
      id: "authService", 
      icon: <SiJsonwebtokens className="text-yellow-400" />, 
      label: "Auth Service", 
      x: 55, 
      y: 12,
      color: "yellow-400",
      description: "Handles user authentication and JWT management" 
    },
    { 
      id: "loanService", 
      icon: <FaCreditCard className="text-green-400" />, 
      label: "Loan Service", 
      x: 55, 
      y: 30,
      color: "green-400",
      description: "Processes loan applications and manages loan status" 
    },
    { 
      id: "paymentService", 
      icon: <FaMoneyBillWave className="text-emerald-400" />, 
      label: "Payment Service", 
      x: 55, 
      y: 48,
      color: "emerald-400",
      description: "Handles payment processing and transaction history" 
    },
    { 
      id: "notificationService", 
      icon: <MdNotifications className="text-red-400" />, 
      label: "Notification Service", 
      x: 55, 
      y: 66,
      color: "red-400",
      description: "Sends email and in-app notifications to users" 
    },
    { 
      id: "database", 
      icon: <SiMysql className="text-blue-500" />, 
      label: "MySQL Database", 
      x: 85, 
      y: 30,
      color: "blue-500",
      description: "Stores user, loan, and transaction data" 
    },
  ];

  // Default connections
  const defaultConnections: Connection[] = [
    { from: "adminUser", to: "frontend", label: "Admin UI Access", color: "purple-300" },
    { from: "customerUser", to: "frontend", label: "Customer Portal", color: "blue-300" },
    
    { from: "frontend", to: "authService", label: "Auth Requests", color: "yellow-300" },
    { from: "frontend", to: "loanService", label: "Loan Management", color: "green-300" },
    { from: "frontend", to: "paymentService", label: "Payment Processing", color: "emerald-300" },
    
    { from: "authService", to: "database", label: "User Data", color: "yellow-300" },
    { from: "loanService", to: "database", label: "Loan Records", color: "green-300" },
    { from: "paymentService", to: "database", label: "Payment Transactions", color: "emerald-300" },
    
    { from: "loanService", to: "notificationService", label: "Loan Updates", color: "green-300" },
    { from: "paymentService", to: "notificationService", label: "Payment Alerts", color: "emerald-300" },
    { from: "notificationService", to: "customerUser", label: "Email Notifications", style: "dashed", color: "red-300" }
  ];

  // Use custom components and connections if provided, otherwise use defaults
  const diagramComponents = customComponents || defaultDiagramComponents;
  const connections = customConnections || defaultConnections;

  // Reset zoom and position when screen size changes
  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, [isSmallScreen, isMediumScreen]);

  // Handle touch start for pinch zoom
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      
      const distance = Math.hypot(
        touch1.clientX - touch2.clientX,
        touch1.clientY - touch2.clientY
      );
      
      setInitialTouchDistance(distance);
    } else if (e.touches.length === 1) {
      // Start dragging with one finger
      setIsDragging(true);
      setStartDragPosition({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y
      });
    }
  };

  // Handle pinch zoom and pan on mobile
  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && initialTouchDistance !== null) {
      e.preventDefault();
      
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      
      const distance = Math.hypot(
        touch1.clientX - touch2.clientX,
        touch1.clientY - touch2.clientY
      );
      
      // Calculate new scale with constraints
      const newScale = Math.min(Math.max(0.8, scale * (distance / initialTouchDistance)), 2.5);
      setScale(newScale);
      setInitialTouchDistance(distance);
    } else if (e.touches.length === 1 && isDragging) {
      // Update position while dragging
      setPosition({
        x: e.touches[0].clientX - startDragPosition.x,
        y: e.touches[0].clientY - startDragPosition.y
      });
    }
  };

  // Handle touch end
  const handleTouchEnd = () => {
    setInitialTouchDistance(null);
    setIsDragging(false);
  };

  // Handle mouse wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    
    // Calculate new scale with delta and constraints
    const delta = e.deltaY * -0.01;
    const newScale = Math.min(Math.max(0.8, scale + delta), 2.5);
    
    // Get mouse position relative to diagram
    const rect = diagramRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculate new position to zoom toward mouse cursor
    const newPosition = {
      x: position.x - ((mouseX - position.x) * (newScale / scale - 1)),
      y: position.y - ((mouseY - position.y) * (newScale / scale - 1))
    };
    
    setScale(newScale);
    setPosition(newPosition);
  };

  // Handle mouse drag
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) { // Left mouse button
      setIsDragging(true);
      setStartDragPosition({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - startDragPosition.x,
        y: e.clientY - startDragPosition.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Reset zoom and position
  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Get connection color
  const getConnectionColor = (connection: Connection) => {
    return connection.color ? `text-${connection.color}` : "text-green-400";
  };

  // Get connection stroke color
  const getStrokeColor = (connection: Connection) => {
    if (connection.style === "dashed") return "#f97316";
    if (connection.color) {
      const colorMap: Record<string, string> = {
        "purple-300": "#d8b4fe",
        "blue-300": "#93c5fd",
        "yellow-300": "#fde047",
        "green-300": "#86efac",
        "emerald-300": "#6ee7b7",
        "red-300": "#fca5a5"
      };
      return colorMap[connection.color] || "#4ade80";
    }
    return "#4ade80";
  };

  // Get text color for component labels
  const getLabelTextColor = (component: DiagramComponent) => {
    const colorMap: Record<string, string> = {
      "purple-400": "text-purple-300",
      "blue-400": "text-blue-300",
      "cyan-400": "text-cyan-300",
      "yellow-400": "text-yellow-300",
      "green-400": "text-green-300",
      "emerald-400": "text-emerald-300",
      "red-400": "text-red-300",
      "blue-500": "text-blue-300"
    };
    return colorMap[component.color] || "text-white";
  };

  const handleComponentClick = (id: string) => {
    setActiveComponent(activeComponent === id ? null : id);
  };

  return (
    <Card className="group relative overflow-hidden backdrop-blur-lg bg-gradient-to-br from-gray-900 to-gray-800 border-0 shadow-[0_0_20px_rgba(0,0,0,0.2)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-all duration-500">
      <CardContent className="p-0 sm:p-2 md:p-4">
        {/* Display active component description at the top */}
        {activeComponent && (
          <motion.div 
            className="absolute top-3 left-0 right-0 mx-auto w-4/5 bg-gray-800/90 rounded-lg p-3 shadow-xl z-50 border border-gray-700"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {diagramComponents.map((component) => (
              component.id === activeComponent && (
                <div key={component.id} className="flex items-center">
                  <div className={`w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center border border-${component.color} mr-3`}>
                    {component.icon}
                  </div>
                  <div>
                    <h3 className={`font-semibold ${getLabelTextColor(component)}`}>{component.label}</h3>
                    <p className="text-gray-200 text-sm">{component.description}</p>
                  </div>
                </div>
              )
            ))}
          </motion.div>
        )}
        
        <div 
          ref={diagramRef}
          className="relative w-full h-[450px] sm:h-[500px] md:h-[600px] bg-gray-900 rounded-lg overflow-hidden p-2 sm:p-4 touch-manipulation"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          {/* Interactive Architecture Diagram background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/30 via-gray-900/50 to-gray-900/80 animate-pulse-slow"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          
          {/* Diagram Components with scaling and positioning */}
          <div 
            ref={contentRef}
            className="absolute inset-0 transform origin-center"
            style={{ 
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              transition: isDragging ? 'none' : 'transform 0.1s ease-out'
            }}
          >
            {diagramComponents.map((component) => (
              <motion.div
                key={component.id}
                className={`absolute flex flex-col items-center z-10 ${activeComponent && activeComponent !== component.id ? 'opacity-40' : 'opacity-100'}`}
                style={{ 
                  left: `${component.x}%`, 
                  top: `${component.y}%` 
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: component.x * 0.005 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => handleComponentClick(component.id)}
              >
                {/* SMALLER ICONS: Reduced width/height */}
                <div className={`
                  w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12
                  rounded-full 
                  bg-gray-800 
                  flex items-center justify-center 
                  shadow-[0_0_10px_rgba(0,0,0,0.3)] 
                  text-sm sm:text-base md:text-lg
                  border-2 border-gray-700 
                  hover:border-${component.color} 
                  transition-all 
                  duration-300
                  ${activeComponent === component.id ? `border-${component.color} shadow-[0_0_15px_rgba(79,209,197,0.5)]` : ''}
                `}>
                  {component.icon}
                </div>
                <span className={`
                  mt-1
                  text-xs
                  font-medium
                  ${getLabelTextColor(component)}
                  bg-gray-800/80 
                  px-1.5 py-0.5
                  rounded 
                  text-center 
                  max-w-16 sm:max-w-24
                  truncate 
                  transition-all
                  duration-300
                  hover:max-w-48
                  ${activeComponent === component.id ? 'max-w-48 font-semibold' : ''}
                `}>
                  {component.label}
                </span>
              </motion.div>
            ))}
            
            {/* Connection Lines with reduced width */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="6"
                  refX="0"
                  refY="3"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3, 0 6" fill="#4ade80" />
                </marker>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              {connections.map((connection, index) => {
                const fromComponent = diagramComponents.find(c => c.id === connection.from);
                const toComponent = diagramComponents.find(c => c.id === connection.to);
                
                if (!fromComponent || !toComponent) return null;
                
                // Adjust coordinates based on component size
                const offset = isSmallScreen ? 4 : 5;
                
                const x1 = fromComponent.x + offset;
                const y1 = fromComponent.y + offset;
                const x2 = toComponent.x + offset;
                const y2 = toComponent.y + offset;
                
                // Calculate better position for label
                const midX = (x1 + x2) / 2;
                const midY = (y1 + y2) / 2;
                
                // Apply offset based on index to stagger labels for better visibility
                const labelOffsetX = (index % 3 - 1) * 3;
                const labelOffsetY = (index % 2 === 0 ? -2 : 2);
                
                const finalMidX = midX + labelOffsetX;
                const finalMidY = midY + labelOffsetY;
                
                // Determine stroke style
                const strokeStyle = connection.style === "dashed" ? "4,4" : "";
                const strokeColor = getStrokeColor(connection);
                
                // Determine if this connection should be highlighted
                const isActive = 
                  activeComponent === connection.from || 
                  activeComponent === connection.to;
                
                return (
                  <g 
                    key={index} 
                    className={activeComponent && !isActive ? 'opacity-30' : 'opacity-100'}
                    filter={isActive ? "url(#glow)" : ""}
                  >
                    <line
                      x1={`${x1}%`}
                      y1={`${y1}%`}
                      x2={`${x2}%`}
                      y2={`${y2}%`}
                      stroke={strokeColor}
                      strokeWidth={isActive ? "2" : "1"} // THINNER LINES
                      strokeDasharray={strokeStyle}
                      markerEnd="url(#arrowhead)"
                      className="transition-all duration-300"
                    />
                    <foreignObject
                      x={`${finalMidX - 10}%`} /* Increased width to allow larger expansions */
                      y={`${finalMidY - 3}%`}
                      width="20%" /* Increased for full display on hover */
                      height="6%"
                      className="pointer-events-auto"
                    >
                      <div className="flex justify-center items-center h-full">
                        <span className={`
                          text-[10px] sm:text-xs
                          bg-gray-800/90 
                          ${getConnectionColor(connection)} 
                          px-1.5 py-0.5
                          rounded 
                          whitespace-nowrap 
                          overflow-hidden
                          max-w-16 sm:max-w-24
                          text-center
                          transition-all
                          duration-300
                          hover:max-w-64 sm:hover:max-w-64
                          ${isActive ? 'font-semibold max-w-64 sm:max-w-64' : ''}
                        `}>
                          {connection.label}
                        </span>
                      </div>
                    </foreignObject>
                  </g>
                );
              })}
            </svg>
          </div>
          
          {/* Controls */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
            <div className="bg-gray-800/90 text-gray-300 px-3 py-1.5 rounded-full text-xs sm:text-sm flex items-center gap-2">
              {isSmallScreen ? (
                <>
                  <span>Pinch to zoom • Drag to pan</span>
                  <button 
                    onClick={handleReset} 
                    className="bg-blue-500 text-white px-2 py-0.5 rounded text-xs"
                  >
                    Reset
                  </button>
                </>
              ) : (
                <>
                  <span>Wheel to zoom • Drag to pan • Click elements for details</span>
                  <button 
                    onClick={handleReset} 
                    className="bg-blue-500 text-white px-2 py-0.5 rounded text-xs"
                  >
                    Reset
                  </button>
                </>
              )}
            </div>
          </div>
          
          {/* Scale indicator */}
          <div className="absolute top-4 right-4 bg-gray-800/80 text-gray-300 px-2 py-1 rounded text-xs">
            {Math.round(scale * 100)}%
          </div>
          
          {/* Legend */}
          <div className="absolute top-4 left-4 hidden sm:block bg-gray-800/80 text-xs text-gray-300 px-3 py-2 rounded">
          <div className="flex items-center mb-1">
              <div className="w-3 h-0.5 bg-purple-400 mr-2 border-dashed border-b-[0.5px]"></div>
              <span>Admin</span>
            </div>
            <div className="flex items-center mb-1">
              <div className="w-3 h-0.5 bg-blue-400 mr-2 border-dashed border-b-[0.5px]"></div>
              <span>Customer</span>
            </div>
            <div className="flex items-center mb-1">
              <div className="w-3 h-0.5 bg-yellow-400 mr-2 border-dashed border-b-[0.5px]"></div>
              <span>Auth</span>
            </div>
            <div className="flex items-center mb-1">
              <div className="w-3 h-0.5 bg-green-400 mr-2"></div>
              <span>Standard</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-0.5 bg-orange-400 mr-2 border-dashed border-b-[0.5px]"></div>
              <span>Notification</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArchitectureDiagram;