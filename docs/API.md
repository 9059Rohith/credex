# API Documentation

## Overview
This document describes the API endpoints available in the Credex AI Spend Audit platform.

## Endpoints

### POST /api/audit
Performs an AI spend audit analysis.

**Request Body:**
```json
{
  "provider": "string",
  "model": "string",
  "monthlySpend": "number"
}
```

**Response:**
```json
{
  "recommendations": [],
  "potentialSavings": "number"
}
