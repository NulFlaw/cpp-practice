@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo Starting C++ verify server...
echo Open: http://127.0.0.1:3789/
echo.
set PATH=C:\msys64\ucrt64\bin;C:\msys64\usr\bin;%PATH%
node verify-server.js
pause
