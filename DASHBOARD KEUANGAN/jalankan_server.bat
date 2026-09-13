@echo off
cd /d "%~dp0"
title Server Dashboard Keuangan
cls
echo ====================================================
echo Menjalankan Server Dashboard Keuangan (Port 8000)...
echo Buka di browser: http://127.0.0.1:8000
echo ====================================================
echo Jendela ini harus tetap terbuka selama dashboard digunakan.
echo.

set "PY_EXE=C:\Users\LEGION\AppData\Local\Programs\Python\Python314\python.exe"

if exist "%PY_EXE%" (
    "%PY_EXE%" -u server.py
    goto end
)

py -3 -u server.py
if errorlevel 1 (
    python -u server.py
)

:end
echo.
echo Server telah berhenti.
pause
