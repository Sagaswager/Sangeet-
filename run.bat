@echo off

echo ===================================================
echo               Starting AI Studio App
echo ===================================================

:: Step 1: Check and copy env configuration
if not exist .env.local (
    if not exist .env (
        echo Creating .env.local from .env.example...
        copy .env.example .env.local
        echo [WARNING] Please edit .env.local and set your GEMINI_API_KEY
    )
)

:: Step 2: Check Node.js installation
where node >nul 2>nul
if errorlevel 1 (
    echo [ERROR] Node.js is not installed or not in your PATH.
    echo Please install Node.js from https://nodejs.org and try again.
    pause
    exit /b 1
)

:: Step 3: Check and install dependencies
if not exist node_modules (
    echo node_modules not found. Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo [ERROR] npm install failed.
        pause
        exit /b 1
    )
)

:: Step 4: Run development server
echo Starting development server...
call npm run dev

pause
