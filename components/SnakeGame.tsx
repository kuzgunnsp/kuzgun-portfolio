"use client";

import React, { useState, useEffect, useRef } from "react";

interface SnakeGameProps {
  onClose: (finalScore: number) => void;
  language: "tr" | "en";
}

const COLS = 24;
const ROWS = 12;

export default function SnakeGame({ onClose, language }: SnakeGameProps) {
  const [snake, setSnake] = useState<{ x: number; y: number }[]>([
    { x: 10, y: 6 },
    { x: 9, y: 6 },
    { x: 8, y: 6 },
  ]);
  const [food, setFood] = useState<{ x: number; y: number }>({ x: 15, y: 6 });
  const [dir, setDir] = useState<{ x: number; y: number }>({ x: 1, y: 0 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const dirRef = useRef(dir);

  dirRef.current = dir;

  // Generate random food position not on snake
  const generateFood = (currentSnake: { x: number; y: number }[]) => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * COLS),
        y: Math.floor(Math.random() * ROWS),
      };
      if (!currentSnake.some((segment) => segment.x === newFood!.x && segment.y === newFood!.y)) {
        break;
      }
    }
    setFood(newFood);
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver) return;
      
      const currentDir = dirRef.current;
      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          if (currentDir.y === 0) setDir({ x: 0, y: -1 });
          break;
        case "ArrowDown":
        case "s":
        case "S":
          if (currentDir.y === 0) setDir({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          if (currentDir.x === 0) setDir({ x: -1, y: 0 });
          break;
        case "ArrowRight":
        case "d":
        case "D":
          if (currentDir.x === 0) setDir({ x: 1, y: 0 });
          break;
        case "Escape":
          onClose(score);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameOver, score, onClose]);

  // Main game loop
  useEffect(() => {
    if (gameOver) return;

    const move = () => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const nextHead = {
          x: head.x + dirRef.current.x,
          y: head.y + dirRef.current.y,
        };

        // Wall collisions
        if (nextHead.x < 0 || nextHead.x >= COLS || nextHead.y < 0 || nextHead.y >= ROWS) {
          setGameOver(true);
          return prevSnake;
        }

        // Self collision
        if (prevSnake.some((segment) => segment.x === nextHead.x && segment.y === nextHead.y)) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [nextHead, ...prevSnake];

        // Food eating
        if (nextHead.x === food.x && nextHead.y === food.y) {
          setScore((s) => s + 10);
          generateFood(newSnake);
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    gameLoopRef.current = setInterval(move, 150);
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [food, gameOver]);

  // Render ASCII screen
  const renderGrid = () => {
    const grid: string[][] = [];
    for (let r = 0; r < ROWS; r++) {
      grid.push(Array(COLS).fill(" "));
    }

    // Draw snake
    snake.forEach((segment, index) => {
      if (index === 0) {
        grid[segment.y][segment.x] = "O"; // Head
      } else {
        grid[segment.y][segment.x] = "o"; // Body
      }
    });

    // Draw food
    grid[food.y][food.x] = "*";

    return grid;
  };

  const grid = renderGrid();

  return (
    <div className="flex flex-col h-full font-mono text-xs sm:text-sm select-none p-2 text-emerald-400">
      <div className="flex justify-between items-center mb-2 pb-1 border-b border-zinc-900/50">
        <span>SCORE: {score}</span>
        <span className="text-[10px] text-zinc-500">
          {language === "tr" ? "[Çıkmak için ESC]" : "[ESC to Quit]"}
        </span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center bg-zinc-950/80 p-2 border border-zinc-900/40 rounded">
        {gameOver ? (
          <div className="text-center flex flex-col gap-2">
            <span className="text-red-500 font-bold tracking-widest animate-pulse">
              GAME OVER
            </span>
            <button
              onClick={() => {
                setSnake([
                  { x: 10, y: 6 },
                  { x: 9, y: 6 },
                  { x: 8, y: 6 },
                ]);
                setDir({ x: 1, y: 0 });
                setScore(0);
                setGameOver(false);
              }}
              className="px-2 py-1 bg-zinc-900 text-zinc-300 hover:text-white rounded text-[10px] border border-zinc-800"
            >
              {language === "tr" ? "Yeniden Başla" : "Restart"}
            </button>
            <button
              onClick={() => onClose(score)}
              className="text-zinc-500 hover:text-zinc-400 text-[10px]"
            >
              {language === "tr" ? "Kapat" : "Exit"}
            </button>
          </div>
        ) : (
          <div className="leading-none tracking-[0.2em] font-bold text-center">
            <div>+{Array(COLS).fill("-").join("")}+</div>
            {grid.map((row, idx) => (
              <div key={idx}>
                |{row.map((char) => (char === " " ? "\u00A0" : char)).join("")}|
              </div>
            ))}
            <div>+{Array(COLS).fill("-").join("")}+</div>
          </div>
        )}
      </div>
      <div className="text-center text-[10px] text-zinc-600 mt-2">
        {language === "tr" ? "Yön tuşları veya W-A-S-D ile kontrol edin" : "Control with Arrow Keys or W-A-S-D"}
      </div>
    </div>
  );
}
