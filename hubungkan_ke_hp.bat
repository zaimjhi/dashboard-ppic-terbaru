@echo off
title Hubungkan Dashboard ke HP Android
cls
echo ================================================================
echo   MEMBUAT KONEKSI ONLINE KE HP ANDROID (GRATIS)
echo ================================================================
echo.
echo Menghubungkan tunnel ke http://127.0.0.1:8000 ...
echo Tunggu sebentar sampai muncul link https://... di bawah ini.
echo.
echo Buka link https://... tersebut di browser HP Android Anda!
echo.
echo * Tekan Ctrl + C jika ingin menghentikan akses.
echo ================================================================
echo.
ssh -o StrictHostKeyChecking=no -R 80:127.0.0.1:8000 nokey@localhost.run
pause
