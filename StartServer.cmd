@echo off
set "NODE_EXTRA_CA_CERTS=C:\Users\ching\AppData\Local\mkcert\rootCA.pem"
node "%~dp0server.cjs"
pause
