@echo off
chcp 65001 >nul
cd /d "%~dp0"
title Total24 Automobile - Server local

echo ==================================================
echo    TOTAL24 AUTOMOBILE - se deschide in browser
echo    Adresa: http://localhost:8080
echo ==================================================
echo.
echo    NU inchide aceasta fereastra cat timp folosesti site-ul.
echo    Ca sa opresti serverul: inchide fereastra sau Ctrl+C.
echo.

rem Deschide site-ul in browserul implicit dupa 1 secunda
start "" /min cmd /c "timeout /t 1 >nul & start http://localhost:8080/index.html"

rem Porneste serverul local (Python)
where py >nul 2>nul && ( py -m http.server 8080 ) || ( python -m http.server 8080 )
