@echo off
REM Saxon-HE Server Test Script for Windows
REM Tests health check and transformation endpoints

set BASE_URL=%1
if "%BASE_URL%"=="" set BASE_URL=http://localhost:3001/api

echo Testing Saxon-HE Server
echo Base URL: %BASE_URL%
echo.

echo Test 1: Health Check
echo --------------------------------
curl -s "%BASE_URL%/health"
if %ERRORLEVEL% NEQ 0 (
    echo FAILED: Health check failed
    exit /b 1
)
echo PASSED
echo.

echo Test 2: XSLT 1.0 Transformation
echo --------------------------------
curl -s -X POST "%BASE_URL%/transform" ^
  -H "Content-Type: application/json" ^
  -d "{\"xml\":\"<?xml version='1.0'?><root><item>Test</item></root>\",\"xslt\":\"<?xml version='1.0'?><xsl:stylesheet version='1.0' xmlns:xsl='http://www.w3.org/1999/XSL/Transform'><xsl:template match='/'><output><xsl:value-of select='root/item'/></output></xsl:template></xsl:stylesheet>\",\"version\":\"1.0\"}"
if %ERRORLEVEL% NEQ 0 (
    echo FAILED: XSLT 1.0 transformation failed
    exit /b 1
)
echo PASSED
echo.

echo ================================
echo All tests passed!
echo ================================
