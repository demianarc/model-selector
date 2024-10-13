/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import confetti from 'canvas-confetti'

interface DataItem {
    id: string;
    creator: string;
    provider: string;
    model: string;
    name: string;
    contextWindow: number;
    pricePerMillionTokens: number;
    inputPrice: number;
    outputPrice: number;
    outputSpeed: number;
    latency: number;
    qualityIndex: number | null;
  }

  const data: DataItem[] = [
    { id: "1", creator: "OpenAI", provider: "OpenAI", model: "GPT-4", name: "o1-preview", contextWindow: 128000, pricePerMillionTokens: 26250, inputPrice: 15000, outputPrice: 60000, outputSpeed: 30.9, latency: 32.62, qualityIndex: null },
    { id: "2", creator: "OpenAI", provider: "OpenAI", model: "GPT-4", name: "o1-mini", contextWindow: 128000, pricePerMillionTokens: 5250, inputPrice: 3000, outputPrice: 12000, outputSpeed: 70.2, latency: 14.58, qualityIndex: null },
    { id: "3", creator: "OpenAI", provider: "OpenAI", model: "GPT-4", name: "GPT-4o", contextWindow: 128000, pricePerMillionTokens: 4380, inputPrice: 2500, outputPrice: 10000, outputSpeed: 124.2, latency: 0.42, qualityIndex: 100 },
    { id: "4", creator: "OpenAI", provider: "OpenAI", model: "GPT-4", name: "GPT-4o (May '24)", contextWindow: 128000, pricePerMillionTokens: 7500, inputPrice: 5000, outputPrice: 15000, outputSpeed: 112.6, latency: 0.42, qualityIndex: 100 },
    { id: "5", creator: "OpenAI", provider: "Microsoft Azure", model: "GPT-4", name: "GPT-4o (May '24)", contextWindow: 128000, pricePerMillionTokens: 7500, inputPrice: 5000, outputPrice: 15000, outputSpeed: 107.2, latency: 0.37, qualityIndex: 100 },
    { id: "6", creator: "OpenAI", provider: "OpenAI", model: "GPT-4", name: "GPT-4o mini", contextWindow: 128000, pricePerMillionTokens: 260, inputPrice: 150, outputPrice: 600, outputSpeed: 98.8, latency: 0.45, qualityIndex: 88 },
    { id: "7", creator: "Meta", provider: "Replicate", model: "Llama 3.1 405B", name: "Llama 3.1 405B", contextWindow: 128000, pricePerMillionTokens: 9500, inputPrice: 9500, outputPrice: 9500, outputSpeed: 18.7, latency: 1.13, qualityIndex: 100 },
    { id: "8", creator: "Meta", provider: "Hyperbolic", model: "Llama 3.1 405B", name: "Llama 3.1 405B", contextWindow: 128000, pricePerMillionTokens: 4000, inputPrice: 4000, outputPrice: 4000, outputSpeed: 16.1, latency: 0.91, qualityIndex: 100 },
    { id: "9", creator: "Meta", provider: "Amazon Bedrock", model: "Llama 3.1 405B", name: "Llama 3.1 405B", contextWindow: 128000, pricePerMillionTokens: 7990, inputPrice: 5320, outputPrice: 16000, outputSpeed: 13.1, latency: 1.78, qualityIndex: 100 },
    { id: "10", creator: "Meta", provider: "OctoAI", model: "Llama 3.1 405B", name: "Llama 3.1 405B", contextWindow: 128000, pricePerMillionTokens: 4500, inputPrice: 3000, outputPrice: 9000, outputSpeed: 59.6, latency: 0.30, qualityIndex: 100 },
    { id: "11", creator: "Meta", provider: "Lepton AI", model: "Llama 3.1 405B", name: "Llama 3.1 405B", contextWindow: 128000, pricePerMillionTokens: 2800, inputPrice: 2800, outputPrice: 2800, outputSpeed: 20.1, latency: 1.04, qualityIndex: 100 },
    { id: "12", creator: "Meta", provider: "Microsoft Azure", model: "Llama 3.1 405B", name: "Llama 3.1 405B", contextWindow: 128000, pricePerMillionTokens: 8000, inputPrice: 5330, outputPrice: 16000, outputSpeed: 8.4, latency: 4.38, qualityIndex: 100 },
    { id: "13", creator: "Meta", provider: "Fireworks", model: "Llama 3.1 405B", name: "Llama 3.1 405B", contextWindow: 128000, pricePerMillionTokens: 3000, inputPrice: 3000, outputPrice: 3000, outputSpeed: 69.3, latency: 0.64, qualityIndex: 100 },
    { id: "14", creator: "Meta", provider: "Deepinfra", model: "Llama 3.1 405B", name: "Llama 3.1 405B", contextWindow: 33000, pricePerMillionTokens: 1790, inputPrice: 1790, outputPrice: 1790, outputSpeed: 22.7, latency: 0.45, qualityIndex: 100 },
    { id: "15", creator: "Meta", provider: "SambaNova", model: "Llama 3.1 405B", name: "Llama 3.1 405B", contextWindow: 8000, pricePerMillionTokens: 6250, inputPrice: 5000, outputPrice: 10000, outputSpeed: 127.8, latency: 1.50, qualityIndex: 100 },
    { id: "16", creator: "Meta", provider: "Databricks", model: "Llama 3.1 405B", name: "Llama 3.1 405B", contextWindow: 128000, pricePerMillionTokens: 7500, inputPrice: 5000, outputPrice: 15000, outputSpeed: 28.6, latency: 0.67, qualityIndex: 100 },
    { id: "17", creator: "Meta", provider: "Together.ai Turbo", model: "Llama 3.1 405B", name: "Llama 3.1 405B Turbo", contextWindow: 128000, pricePerMillionTokens: 3500, inputPrice: 3500, outputPrice: 3500, outputSpeed: 87.3, latency: 0.72, qualityIndex: 100 },
    { id: "18", creator: "Meta", provider: "Hyperbolic", model: "Llama 3.2 90B (Vision)", name: "Llama 3.2 90B (Vision)", contextWindow: 128000, pricePerMillionTokens: 400, inputPrice: 400, outputPrice: 400, outputSpeed: 40.2, latency: 0.57, qualityIndex: null },
    { id: "19", creator: "Meta", provider: "Amazon Bedrock", model: "Llama 3.2 90B (Vision)", name: "Llama 3.2 90B (Vision)", contextWindow: 128000, pricePerMillionTokens: 2000, inputPrice: 2000, outputPrice: 2000, outputSpeed: 18.2, latency: 0.54, qualityIndex: null },
    { id: "20", creator: "Meta", provider: "Fireworks", model: "Llama 3.2 90B (Vision)", name: "Llama 3.2 90B (Vision)", contextWindow: 128000, pricePerMillionTokens: 900, inputPrice: 900, outputPrice: 900, outputSpeed: 50.5, latency: 0.44, qualityIndex: null },
    { id: "21", creator: "Meta", provider: "Deepinfra", model: "Llama 3.2 90B (Vision)", name: "Llama 3.2 90B (Vision)", contextWindow: 128000, pricePerMillionTokens: 360, inputPrice: 350, outputPrice: 400, outputSpeed: 24.7, latency: 0.41, qualityIndex: null },
    { id: "22", creator: "Meta", provider: "Together.ai Turbo", model: "Llama 3.2 90B (Vision)", name: "Llama 3.2 90B (Vision) Turbo", contextWindow: 128000, pricePerMillionTokens: 1200, inputPrice: 1200, outputPrice: 1200, outputSpeed: 54.6, latency: 0.38, qualityIndex: null },
    { id: "23", creator: "Meta", provider: "Cerebras", model: "Llama 3.1 70B", name: "Llama 3.1 70B", contextWindow: 8000, pricePerMillionTokens: 600, inputPrice: 600, outputPrice: 600, outputSpeed: 569.2, latency: 0.43, qualityIndex: 95 },
    { id: "24", creator: "Meta", provider: "Hyperbolic", model: "Llama 3.1 70B", name: "Llama 3.1 70B", contextWindow: 128000, pricePerMillionTokens: 400, inputPrice: 400, outputPrice: 400, outputSpeed: 29.1, latency: 0.69, qualityIndex: 95 },
    { id: "25", creator: "Meta", provider: "Amazon Bedrock", model: "Llama 3.1 70B", name: "Llama 3.1 70B", contextWindow: 128000, pricePerMillionTokens: 990, inputPrice: 990, outputPrice: 990, outputSpeed: 31.6, latency: 0.71, qualityIndex: 95 },
    { id: "26", creator: "Meta", provider: "OctoAI", model: "Llama 3.1 70B", name: "Llama 3.1 70B", contextWindow: 128000, pricePerMillionTokens: 900, inputPrice: 900, outputPrice: 900, outputSpeed: 59.6, latency: 0.36, qualityIndex: 95 },
    { id: "27", creator: "Meta", provider: "Lepton AI", model: "Llama 3.1 70B", name: "Llama 3.1 70B", contextWindow: 128000, pricePerMillionTokens: 800, inputPrice: 800, outputPrice: 800, outputSpeed: 52.8, latency: 0.58, qualityIndex: 95 },
    { id: "28", creator: "Meta", provider: "Microsoft Azure", model: "Llama 3.1 70B", name: "Llama 3.1 70B", contextWindow: 128000, pricePerMillionTokens: 2900, inputPrice: 2680, outputPrice: 3540, outputSpeed: 20.3, latency: 0.64, qualityIndex: 95 },
    { id: "29", creator: "Meta", provider: "Fireworks", model: "Llama 3.1 70B", name: "Llama 3.1 70B", contextWindow: 128000, pricePerMillionTokens: 900, inputPrice: 900, outputPrice: 900, outputSpeed: 86.2, latency: 0.39, qualityIndex: 95 },
    { id: "30", creator: "Meta", provider: "Deepinfra", model: "Llama 3.1 70B", name: "Llama 3.1 70B", contextWindow: 128000, pricePerMillionTokens: 360, inputPrice: 350, outputPrice: 400, outputSpeed: 27.6, latency: 0.31, qualityIndex: 95 },
    { id: "31", creator: "Meta", provider: "Groq", model: "Llama 3.1 70B", name: "Llama 3.1 70B", contextWindow: 128000, pricePerMillionTokens: 640, inputPrice: 590, outputPrice: 790, outputSpeed: 249.7, latency: 0.44, qualityIndex: 95 },
    { id: "32", creator: "Meta", provider: "SambaNova", model: "Llama 3.1 70B", name: "Llama 3.1 70B", contextWindow: 8000, pricePerMillionTokens: 750, inputPrice: 600, outputPrice: 1200, outputSpeed: 419.7, latency: 0.81, qualityIndex: 95 },
    { id: "33", creator: "Meta", provider: "Databricks", model: "Llama 3.1 70B", name: "Llama 3.1 70B", contextWindow: 128000, pricePerMillionTokens: 1500, inputPrice: 1000, outputPrice: 3000, outputSpeed: 54.6, latency: 0.58, qualityIndex: 95 },
    { id: "34", creator: "Meta", provider: "Perplexity", model: "Llama 3.1 70B", name: "Llama 3.1 70B", contextWindow: 128000, pricePerMillionTokens: 1000, inputPrice: 1000, outputPrice: 1000, outputSpeed: 47.7, latency: 0.33, qualityIndex: 95 },
    { id: "35", creator: "Meta", provider: "Together.ai Turbo", model: "Llama 3.1 70B", name: "Llama 3.1 70B Turbo", contextWindow: 128000, pricePerMillionTokens: 880, inputPrice: 880, outputPrice: 880, outputSpeed: 27.0, latency: 0.73, qualityIndex: 95 },
    { id: "36", creator: "Meta", provider: "Amazon Bedrock", model: "Llama 3.2 11B (Vision)", name: "Llama 3.2 11B (Vision)", contextWindow: 128000, pricePerMillionTokens: 350, inputPrice: 350, outputPrice: 350, outputSpeed: 41.7, latency: 0.40, qualityIndex: null },
    { id: "37", creator: "Meta", provider: "Fireworks", model: "Llama 3.2 11B (Vision)", name: "Llama 3.2 11B (Vision)", contextWindow: 128000, pricePerMillionTokens: 200, inputPrice: 200, outputPrice: 200, outputSpeed: 119.8, latency: 0.33, qualityIndex: null },
    { id: "38", creator: "Meta", provider: "Deepinfra", model: "Llama 3.2 11B (Vision)", name: "Llama 3.2 11B (Vision)", contextWindow: 128000, pricePerMillionTokens: 60, inputPrice: 60, outputPrice: 60, outputSpeed: 77.4, latency: 0.27, qualityIndex: null },
    { id: "39", creator: "Meta", provider: "Together.ai Turbo", model: "Llama 3.2 11B (Vision)", name: "Llama 3.2 11B (Vision) Turbo", contextWindow: 128000, pricePerMillionTokens: 180, inputPrice: 180, outputPrice: 180, outputSpeed: 152.2, latency: 0.32, qualityIndex: null },
    { id: "40", creator: "Meta", provider: "Cerebras", model: "Llama 3.1 8B", name: "Llama 3.1 8B", contextWindow: 8000, pricePerMillionTokens: 100, inputPrice: 100, outputPrice: 100, outputSpeed: 2023.0, latency: 0.46, qualityIndex: 66 },
    { id: "41", creator: "Meta", provider: "Hyperbolic", model: "Llama 3.1 8B", name: "Llama 3.1 8B", contextWindow: 128000, pricePerMillionTokens: 100, inputPrice: 100, outputPrice: 100, outputSpeed: 93.4, latency: 0.52, qualityIndex: 66 },
    { id: "42", creator: "Meta", provider: "Amazon Bedrock", model: "Llama 3.1 8B", name: "Llama 3.1 8B", contextWindow: 128000, pricePerMillionTokens: 220, inputPrice: 220, outputPrice: 220, outputSpeed: 89.8, latency: 0.40, qualityIndex: 66 },
    { id: "43", creator: "Meta", provider: "OctoAI", model: "Llama 3.1 8B", name: "Llama 3.1 8B", contextWindow: 128000, pricePerMillionTokens: 150, inputPrice: 150, outputPrice: 150, outputSpeed: 174.9, latency: 0.26, qualityIndex: 66 },
    { id: "44", creator: "Meta", provider: "Lepton AI", model: "Llama 3.1 8B", name: "Llama 3.1 8B", contextWindow: 128000, pricePerMillionTokens: 70, inputPrice: 70, outputPrice: 70, outputSpeed: 206.7, latency: 0.38, qualityIndex: 66 },
    { id: "45", creator: "Meta", provider: "Microsoft Azure", model: "Llama 3.1 8B", name: "Llama 3.1 8B", contextWindow: 128000, pricePerMillionTokens: 380, inputPrice: 300, outputPrice: 610, outputSpeed: 54.3, latency: 0.42, qualityIndex: 66 },
    { id: "46", creator: "Meta", provider: "Fireworks", model: "Llama 3.1 8B", name: "Llama 3.1 8B", contextWindow: 128000, pricePerMillionTokens: 200, inputPrice: 200, outputPrice: 200, outputSpeed: 264.1, latency: 0.28, qualityIndex: 66 },
    { id: "47", creator: "Meta", provider: "Deepinfra", model: "Llama 3.1 8B", name: "Llama 3.1 8B", contextWindow: 128000, pricePerMillionTokens: 60, inputPrice: 60, outputPrice: 60, outputSpeed: 86.2, latency: 0.22, qualityIndex: 66 },
    { id: "48", creator: "Meta", provider: "Groq", model: "Llama 3.1 8B", name: "Llama 3.1 8B", contextWindow: 128000, pricePerMillionTokens: 60, inputPrice: 50, outputPrice: 80, outputSpeed: 751.7, latency: 0.38, qualityIndex: 66 },
    { id: "49", creator: "Meta", provider: "SambaNova", model: "Llama 3.1 8B", name: "Llama 3.1 8B", contextWindow: 8000, pricePerMillionTokens: 130, inputPrice: 100, outputPrice: 200, outputSpeed: 1018.6, latency: 0.39, qualityIndex: 66 },
    { id: "50", creator: "Meta", provider: "Perplexity", model: "Llama 3.1 8B", name: "Llama 3.1 8B", contextWindow: 128000, pricePerMillionTokens: 200, inputPrice: 200, outputPrice: 200, outputSpeed: 161.8, latency: 0.20, qualityIndex: 66 },
    { id: "51", creator: "Meta", provider: "Together.ai Turbo", model: "Llama 3.1 8B", name: "Llama 3.1 8B Turbo", contextWindow: 128000, pricePerMillionTokens: 180, inputPrice: 180, outputPrice: 180, outputSpeed: 145.6, latency: 0.58, qualityIndex: 66 },
    { id: "52", creator: "Meta", provider: "Hyperbolic", model: "Llama 3.2 3B", name: "Llama 3.2 3B", contextWindow: 128000, pricePerMillionTokens: 100, inputPrice: 100, outputPrice: 100, outputSpeed: 192.3, latency: 0.50, qualityIndex: null },
    { id: "53", creator: "Meta", provider: "Amazon Bedrock", model: "Llama 3.2 3B", name: "Llama 3.2 3B", contextWindow: 128000, pricePerMillionTokens: 150, inputPrice: 150, outputPrice: 150, outputSpeed: 142.4, latency: 0.44, qualityIndex: null },
    { id: "54", creator: "Meta", provider: "Lepton AI", model: "Llama 3.2 3B", name: "Llama 3.2 3B", contextWindow: 128000, pricePerMillionTokens: 30, inputPrice: 30, outputPrice: 30, outputSpeed: 116.1, latency: 0.43, qualityIndex: null },
    { id: "55", creator: "Meta", provider: "Fireworks", model: "Llama 3.2 3B", name: "Llama 3.2 3B", contextWindow: 128000, pricePerMillionTokens: 100, inputPrice: 100, outputPrice: 100, outputSpeed: 257.5, latency: 0.32, qualityIndex: null },
    { id: "56", creator: "Meta", provider: "Deepinfra", model: "Llama 3.2 3B", name: "Llama 3.2 3B", contextWindow: 128000, pricePerMillionTokens: 40, inputPrice: 30, outputPrice: 50, outputSpeed: 104.1, latency: 0.26, qualityIndex: null },
    { id: "57", creator: "Meta", provider: "Groq", model: "Llama 3.2 3B", name: "Llama 3.2 3B", contextWindow: 8000, pricePerMillionTokens: 60, inputPrice: 60, outputPrice: 60, outputSpeed: 1406.1, latency: 0.34, qualityIndex: null },
    { id: "58", creator: "Meta", provider: "SambaNova", model: "Llama 3.2 3B", name: "Llama 3.2 3B", contextWindow: 4000, pricePerMillionTokens: 100, inputPrice: 80, outputPrice: 160, outputSpeed: 1565.7, latency: 0.34, qualityIndex: null },
    { id: "59", creator: "Meta", provider: "Together.ai Turbo", model: "Llama 3.2 3B", name: "Llama 3.2 3B Turbo", contextWindow: 128000, pricePerMillionTokens: 60, inputPrice: 60, outputPrice: 60, outputSpeed: 124.8, latency: 0.30, qualityIndex: null },
    { id: "60", creator: "Meta", provider: "Amazon Bedrock", model: "Llama 3.2 1B", name: "Llama 3.2 1B", contextWindow: 128000, pricePerMillionTokens: 100, inputPrice: 100, outputPrice: 100, outputSpeed: 303.0, latency: 0.38, qualityIndex: null },
    { id: "61", creator: "Meta", provider: "Fireworks", model: "Llama 3.2 1B", name: "Llama 3.2 1B", contextWindow: 128000, pricePerMillionTokens: 100, inputPrice: 100, outputPrice: 100, outputSpeed: 507.1, latency: 0.29, qualityIndex: null },
    { id: "62", creator: "Meta", provider: "Deepinfra", model: "Llama 3.2 1B", name: "Llama 3.2 1B", contextWindow: 128000, pricePerMillionTokens: 10, inputPrice: 10, outputPrice: 20, outputSpeed: 167.0, latency: 0.23, qualityIndex: null },
    { id: "63", creator: "Meta", provider: "Groq", model: "Llama 3.2 1B", name: "Llama 3.2 1B", contextWindow: 8000, pricePerMillionTokens: 40, inputPrice: 40, outputPrice: 40, outputSpeed: 3129.3, latency: 0.48, qualityIndex: null },
    { id: "64", creator: "Meta", provider: "SambaNova", model: "Llama 3.2 1B", name: "Llama 3.2 1B", contextWindow: 4000, pricePerMillionTokens: 50, inputPrice: 40, outputPrice: 80, outputSpeed: 2473.9, latency: 0.35, qualityIndex: null },
    { id: "65", creator: "Google", provider: "Google (Vertex)", model: "Gemini 1.5 Pro", name: "Gemini 1.5 Pro (Sep '24) (Vertex)", contextWindow: 2000000, pricePerMillionTokens: 2190, inputPrice: 1250, outputPrice: 5000, outputSpeed: 59.4, latency: 0.44, qualityIndex: null },
    { id: "66", creator: "Google", provider: "Google (AI Studio)", model: "Gemini 1.5 Pro", name: "Gemini 1.5 Pro (Sep '24) (AI Studio)", contextWindow: 2000000, pricePerMillionTokens: 2190, inputPrice: 1250, outputPrice: 5000, outputSpeed: 61.3, latency: 0.81, qualityIndex: null },
    { id: "67", creator: "Google", provider: "Google AI Studio", model: "Gemini 1.5 Flash-8B", name: "Gemini 1.5 Flash-8B AI Studio", contextWindow: 1000000, pricePerMillionTokens: 70, inputPrice: 40, outputPrice: 150, outputSpeed: 283.2, latency: 0.53, qualityIndex: null },
    { id: "68", creator: "Google", provider: "Google (Vertex)", model: "Gemini 1.5 Flash", name: "Gemini 1.5 Flash (Sep '24) (Vertex)", contextWindow: 1000000, pricePerMillionTokens: 130, inputPrice: 70, outputPrice: 300, outputSpeed: 203.8, latency: 0.26, qualityIndex: null },
    { id: "69", creator: "Google", provider: "Google (AI Studio)", model: "Gemini 1.5 Flash", name: "Gemini 1.5 Flash (Sep '24) (AI Studio)", contextWindow: 1000000, pricePerMillionTokens: 130, inputPrice: 70, outputPrice: 300, outputSpeed: 209.3, latency: 0.40, qualityIndex: null },
    { id: "70", creator: "Google", provider: "Together.ai", model: "Gemma 2 27B", name: "Gemma 2 27B", contextWindow: 8000, pricePerMillionTokens: 800, inputPrice: 800, outputPrice: 800, outputSpeed: 65.5, latency: 0.48, qualityIndex: 78 },
    { id: "71", creator: "Google", provider: "Deepinfra", model: "Gemma 2 9B", name: "Gemma 2 9B", contextWindow: 8000, pricePerMillionTokens: 60, inputPrice: 60, outputPrice: 60, outputSpeed: 71.1, latency: 0.32, qualityIndex: 71 },
    { id: "72", creator: "Google", provider: "Groq", model: "Gemma 2 9B", name: "Gemma 2 9B", contextWindow: 8000, pricePerMillionTokens: 200, inputPrice: 200, outputPrice: 200, outputSpeed: 665.6, latency: 0.19, qualityIndex: 71 },
    { id: "73", creator: "Google", provider: "Together.ai", model: "Gemma 2 9B", name: "Gemma 2 9B", contextWindow: 8000, pricePerMillionTokens: 300, inputPrice: 300, outputPrice: 300, outputSpeed: 114.9, latency: 0.44, qualityIndex: 71 },
    { id: "74", creator: "Google", provider: "Google (Vertex)", model: "Gemini 1.5 Flash", name: "Gemini 1.5 Flash (May '24) (Vertex)", contextWindow: 1000000, pricePerMillionTokens: 130, inputPrice: 70, outputPrice: 300, outputSpeed: 303.9, latency: 0.27, qualityIndex: 84 },
    { id: "75", creator: "Google", provider: "Google (AI Studio)", model: "Gemini 1.5 Flash", name: "Gemini 1.5 Flash (May '24) (AI Studio)", contextWindow: 1000000, pricePerMillionTokens: 130, inputPrice: 70, outputPrice: 300, outputSpeed: 309.2, latency: 0.36, qualityIndex: 84 },
    { id: "76", creator: "Google", provider: "Google (Vertex)", model: "Gemini 1.5 Pro", name: "Gemini 1.5 Pro (May '24) (Vertex)", contextWindow: 2000000, pricePerMillionTokens: 5250, inputPrice: 3500, outputPrice: 10500, outputSpeed: 64.3, latency: 0.50, qualityIndex: 95 },
    { id: "77", creator: "Google", provider: "Google (AI Studio)", model: "Gemini 1.5 Pro", name: "Gemini 1.5 Pro (May '24) (AI Studio)", contextWindow: 2000000, pricePerMillionTokens: 5250, inputPrice: 3500, outputPrice: 10500, outputSpeed: 65.4, latency: 0.79, qualityIndex: 95 },
    { id: "78", creator: "Anthropic", provider: "Amazon Bedrock", model: "Claude 3.5 Sonnet", name: "Claude 3.5 Sonnet", contextWindow: 200000, pricePerMillionTokens: 6000, inputPrice: 3000, outputPrice: 15000, outputSpeed: 53.5, latency: 0.95, qualityIndex: 98 },
    { id: "79", creator: "Anthropic", provider: "Anthropic", model: "Claude 3.5 Sonnet", name: "Claude 3.5 Sonnet", contextWindow: 200000, pricePerMillionTokens: 6000, inputPrice: 3000, outputPrice: 15000, outputSpeed: 90.8, latency: 0.80, qualityIndex: 98 },
    { id: "80", creator: "Anthropic", provider: "Amazon Bedrock", model: "Claude 3 Opus", name: "Claude 3 Opus", contextWindow: 200000, pricePerMillionTokens: 30000, inputPrice: 15000, outputPrice: 75000, outputSpeed: 23.6, latency: 1.67, qualityIndex: 93 },
    { id: "81", creator: "Anthropic", provider: "Anthropic", model: "Claude 3 Opus", name: "Claude 3 Opus", contextWindow: 200000, pricePerMillionTokens: 30000, inputPrice: 15000, outputPrice: 75000, outputSpeed: 28.4, latency: 2.98, qualityIndex: 93 },
    { id: "82", creator: "Anthropic", provider: "Amazon Bedrock", model: "Claude 3 Haiku", name: "Claude 3 Haiku", contextWindow: 200000, pricePerMillionTokens: 500, inputPrice: 250, outputPrice: 1250, outputSpeed: 120.8, latency: 0.48, qualityIndex: 74 },
    { id: "83", creator: "Anthropic", provider: "Anthropic", model: "Claude 3 Haiku", name: "Claude 3 Haiku", contextWindow: 200000, pricePerMillionTokens: 500, inputPrice: 250, outputPrice: 1250, outputSpeed: 145.4, latency: 0.45, qualityIndex: 74 },
    { id: "84", creator: "Mistral AI", provider: "Mistral", model: "Mistral Large 2", name: "Mistral Large 2", contextWindow: 128000, pricePerMillionTokens: 3000, inputPrice: 2000, outputPrice: 6000, outputSpeed: 31.5, latency: 0.75, qualityIndex: 91 },
    { id: "85", creator: "Mistral AI", provider: "Amazon Bedrock", model: "Mistral Large 2", name: "Mistral Large 2", contextWindow: 128000, pricePerMillionTokens: 4500, inputPrice: 3000, outputPrice: 9000, outputSpeed: 42.8, latency: 0.42, qualityIndex: 91 },
    { id: "86", creator: "Mistral AI", provider: "Microsoft Azure", model: "Mistral Large 2", name: "Mistral Large 2", contextWindow: 128000, pricePerMillionTokens: 4500, inputPrice: 3000, outputPrice: 9000, outputSpeed: 53.7, latency: 0.44, qualityIndex: 91 },
    { id: "87", creator: "Mistral AI", provider: "Mistral", model: "Mixtral 8x22B", name: "Mixtral 8x22B", contextWindow: 65000, pricePerMillionTokens: 3000, inputPrice: 2000, outputPrice: 6000, outputSpeed: 64.6, latency: 0.59, qualityIndex: 71 },
    { id: "88", creator: "Mistral AI", provider: "OctoAI", model: "Mixtral 8x22B", name: "Mixtral 8x22B", contextWindow: 65000, pricePerMillionTokens: 1200, inputPrice: 1200, outputPrice: 1200, outputSpeed: 92.4, latency: 0.33, qualityIndex: 71 },
    { id: "89", creator: "Mistral AI", provider: "Fireworks", model: "Mixtral 8x22B", name: "Mixtral 8x22B", contextWindow: 65000, pricePerMillionTokens: 1200, inputPrice: 1200, outputPrice: 1200, outputSpeed: 79.3, latency: 0.32, qualityIndex: 71 },
    { id: "90", creator: "Mistral AI", provider: "Together.ai", model: "Mixtral 8x22B", name: "Mixtral 8x22B", contextWindow: 65000, pricePerMillionTokens: 1200, inputPrice: 1200, outputPrice: 1200, outputSpeed: 61.0, latency: 0.42, qualityIndex: 71 },
    { id: "91", creator: "Mistral AI", provider: "Mistral", model: "Mistral Small", name: "Mistral Small (Sep '24)", contextWindow: 128000, pricePerMillionTokens: 300, inputPrice: 200, outputPrice: 600, outputSpeed: 76.2, latency: 0.50, qualityIndex: null },
    { id: "92", creator: "Mistral AI", provider: "Mistral", model: "Pixtral 12B", name: "Pixtral 12B", contextWindow: 128000, pricePerMillionTokens: 150, inputPrice: 150, outputPrice: 150, outputSpeed: 79.9, latency: 0.58, qualityIndex: null },
    { id: "93", creator: "Mistral AI", provider: "Hyperbolic", model: "Pixtral 12B", name: "Pixtral 12B", contextWindow: 128000, pricePerMillionTokens: 100, inputPrice: 100, outputPrice: 100, outputSpeed: 80.1, latency: 0.52, qualityIndex: null },
    { id: "94", creator: "Mistral AI", provider: "Mistral", model: "Mistral NeMo", name: "Mistral NeMo", contextWindow: 128000, pricePerMillionTokens: 150, inputPrice: 150, outputPrice: 150, outputSpeed: 130.1, latency: 0.52, qualityIndex: 64 },
    { id: "95", creator: "Mistral AI", provider: "OctoAI", model: "Mistral NeMo", name: "Mistral NeMo", contextWindow: 128000, pricePerMillionTokens: 200, inputPrice: 200, outputPrice: 200, outputSpeed: 158.5, latency: 0.31, qualityIndex: 64 },
    { id: "96", creator: "Mistral AI", provider: "Deepinfra", model: "Mistral NeMo", name: "Mistral NeMo", contextWindow: 128000, pricePerMillionTokens: 130, inputPrice: 130, outputPrice: 130, outputSpeed: 57.7, latency: 0.25, qualityIndex: 64 },
    { id: "97", creator: "Mistral AI", provider: "Mistral", model: "Mixtral 8x7B", name: "Mixtral 8x7B", contextWindow: 33000, pricePerMillionTokens: 700, inputPrice: 700, outputPrice: 700, outputSpeed: 86.4, latency: 0.56, qualityIndex: 61 },
    { id: "98", creator: "Mistral AI", provider: "Replicate", model: "Mixtral 8x7B", name: "Mixtral 8x7B", contextWindow: 33000, pricePerMillionTokens: 470, inputPrice: 300, outputPrice: 1000, outputSpeed: 89.5, latency: 0.55, qualityIndex: 61 },
    { id: "99", creator: "Mistral AI", provider: "Amazon Bedrock", model: "Mixtral 8x7B", name: "Mixtral 8x7B", contextWindow: 33000, pricePerMillionTokens: 510, inputPrice: 450, outputPrice: 700, outputSpeed: 68.7, latency: 0.36, qualityIndex: 61 },
    { id: "100", creator: "Mistral AI", provider: "OctoAI", model: "Mixtral 8x7B", name: "Mixtral 8x7B", contextWindow: 33000, pricePerMillionTokens: 450, inputPrice: 450, outputPrice: 450, outputSpeed: 81.5, latency: 0.33, qualityIndex: 61 },
    { id: "101", creator: "Mistral AI", provider: "Lepton AI", model: "Mixtral 8x7B", name: "Mixtral 8x7B", contextWindow: 33000, pricePerMillionTokens: 500, inputPrice: 500, outputPrice: 500, outputSpeed: 105.4, latency: 0.48, qualityIndex: 61 },
    { id: "102", creator: "Mistral AI", provider: "Fireworks", model: "Mixtral 8x7B", name: "Mixtral 8x7B", contextWindow: 33000, pricePerMillionTokens: 500, inputPrice: 500, outputPrice: 500, outputSpeed: 98.3, latency: 0.29, qualityIndex: 61 },
    { id: "103", creator: "Mistral AI", provider: "Deepinfra", model: "Mixtral 8x7B", name: "Mixtral 8x7B", contextWindow: 33000, pricePerMillionTokens: 240, inputPrice: 240, outputPrice: 240, outputSpeed: 40.5, latency: 0.28, qualityIndex: 61 },
    { id: "104", creator: "Mistral AI", provider: "Groq", model: "Mixtral 8x7B", name: "Mixtral 8x7B", contextWindow: 33000, pricePerMillionTokens: 240, inputPrice: 240, outputPrice: 240, outputSpeed: 543.6, latency: 0.22, qualityIndex: 61 },
    { id: "105", creator: "Mistral AI", provider: "Databricks", model: "Mixtral 8x7B", name: "Mixtral 8x7B", contextWindow: 33000, pricePerMillionTokens: 630, inputPrice: 500, outputPrice: 1000, outputSpeed: 86.7, latency: 0.48, qualityIndex: 61 },
    { id: "106", creator: "Mistral AI", provider: "Together.ai", model: "Mixtral 8x7B", name: "Mixtral 8x7B", contextWindow: 33000, pricePerMillionTokens: 600, inputPrice: 600, outputPrice: 600, outputSpeed: 104.3, latency: 0.44, qualityIndex: 61 },
    { id: "107", creator: "Mistral AI", provider: "Mistral", model: "Codestral-Mamba", name: "Codestral-Mamba", contextWindow: 256000, pricePerMillionTokens: 250, inputPrice: 250, outputPrice: 250, outputSpeed: 94.1, latency: 0.68, qualityIndex: null },
    { id: "108", creator: "Cohere", provider: "Amazon Bedrock", model: "Command-R+", name: "Command-R+", contextWindow: 128000, pricePerMillionTokens: 6000, inputPrice: 3000, outputPrice: 15000, outputSpeed: 44.9, latency: 0.58, qualityIndex: null },
    { id: "109", creator: "Cohere", provider: "Cohere", model: "Command-R+", name: "Command-R+", contextWindow: 128000, pricePerMillionTokens: 4380, inputPrice: 2500, outputPrice: 10000, outputSpeed: 65.2, latency: 0.29, qualityIndex: null },
    { id: "110", creator: "Cohere", provider: "Amazon Bedrock", model: "Command-R", name: "Command-R", contextWindow: 128000, pricePerMillionTokens: 750, inputPrice: 500, outputPrice: 1500, outputSpeed: 102.6, latency: 0.39, qualityIndex: null },
    { id: "111", creator: "Cohere", provider: "Cohere", model: "Command-R", name: "Command-R", contextWindow: 128000, pricePerMillionTokens: 260, inputPrice: 150, outputPrice: 600, outputSpeed: 111.5, latency: 0.22, qualityIndex: null },
    { id: "112", creator: "Cohere", provider: "Amazon Bedrock", model: "Command-R+", name: "Command-R+ (Apr '24)", contextWindow: 128000, pricePerMillionTokens: 6000, inputPrice: 3000, outputPrice: 15000, outputSpeed: 45.2, latency: 0.57, qualityIndex: 75 },
    { id: "113", creator: "Cohere", provider: "Cohere", model: "Command-R+", name: "Command-R+ (Apr '24)", contextWindow: 128000, pricePerMillionTokens: 6000, inputPrice: 3000, outputPrice: 15000, outputSpeed: 41.4, latency: 0.32, qualityIndex: 75 },
    { id: "114", creator: "Cohere", provider: "Microsoft Azure", model: "Command-R+", name: "Command-R+ (Apr '24)", contextWindow: 128000, pricePerMillionTokens: 6000, inputPrice: 3000, outputPrice: 15000, outputSpeed: 45.6, latency: 0.69, qualityIndex: 75 },
    { id: "115", creator: "Cohere", provider: "Amazon Bedrock", model: "Command-R", name: "Command-R (Mar '24)", contextWindow: 128000, pricePerMillionTokens: 750, inputPrice: 500, outputPrice: 1500, outputSpeed: 102.6, latency: 0.39, qualityIndex: 63 },
    { id: "116", creator: "Cohere", provider: "Cohere", model: "Command-R", name: "Command-R (Mar '24)", contextWindow: 128000, pricePerMillionTokens: 750, inputPrice: 500, outputPrice: 1500, outputSpeed: 153.0, latency: 0.20, qualityIndex: 63 },
    { id: "117", creator: "Cohere", provider: "Microsoft Azure", model: "Command-R", name: "Command-R (Mar '24)", contextWindow: 128000, pricePerMillionTokens: 750, inputPrice: 500, outputPrice: 1500, outputSpeed: 103.9, latency: 0.52, qualityIndex: 63 },
    { id: "118", creator: "Perplexity", provider: "Perplexity", model: "Sonar 3.1 Small", name: "Sonar 3.1 Small", contextWindow: 131000, pricePerMillionTokens: 200, inputPrice: 200, outputPrice: 200, outputSpeed: 131.8, latency: 0.19, qualityIndex: null },
    { id: "119", creator: "Perplexity", provider: "Perplexity", model: "Sonar 3.1 Large", name: "Sonar 3.1 Large", contextWindow: 131000, pricePerMillionTokens: 1000, inputPrice: 1000, outputPrice: 1000, outputSpeed: 58.8, latency: 0.24, qualityIndex: null },
    { id: "120", creator: "Microsoft", provider: "Microsoft Azure", model: "Phi-3 Medium 14B", name: "Phi-3 Medium 14B", contextWindow: 128000, pricePerMillionTokens: 300, inputPrice: 170, outputPrice: 680, outputSpeed: 51.2, latency: 0.44, qualityIndex: null },
    { id: "121", creator: "Databricks", provider: "Databricks", model: "DBRX", name: "DBRX", contextWindow: 33000, pricePerMillionTokens: 1130, inputPrice: 750, outputPrice: 2250, outputSpeed: 84.7, latency: 0.49, qualityIndex: 62 },
    { id: "122", creator: "Databricks", provider: "Together.ai", model: "DBRX", name: "DBRX", contextWindow: 33000, pricePerMillionTokens: 1200, inputPrice: 1200, outputPrice: 1200, outputSpeed: 104.8, latency: 0.36, qualityIndex: 62 },
    { id: "123", creator: "Reka AI", provider: "Reka AI", model: "Reka Core", name: "Reka Core", contextWindow: 128000, pricePerMillionTokens: 3000, inputPrice: 2000, outputPrice: 6000, outputSpeed: 15.0, latency: 1.14, qualityIndex: 90 },
    { id: "124", creator: "Reka AI", provider: "Reka AI", model: "Reka Flash", name: "Reka Flash", contextWindow: 128000, pricePerMillionTokens: 350, inputPrice: 200, outputPrice: 800, outputSpeed: 29.1, latency: 1.04, qualityIndex: 78 },
    { id: "125", creator: "Reka AI", provider: "Reka AI", model: "Reka Edge", name: "Reka Edge", contextWindow: 64000, pricePerMillionTokens: 100, inputPrice: 100, outputPrice: 100, outputSpeed: 35.1, latency: 0.95, qualityIndex: 60 },
    { id: "126", creator: "AI21 Labs", provider: "AI21 Labs", model: "Jamba 1.5 Large", name: "Jamba 1.5 Large", contextWindow: 256000, pricePerMillionTokens: 3500, inputPrice: 2000, outputPrice: 8000, outputSpeed: 59.2, latency: 1.01, qualityIndex: 86 },
    { id: "127", creator: "AI21 Labs", provider: "Microsoft Azure", model: "Jamba 1.5 Large", name: "Jamba 1.5 Large", contextWindow: 256000, pricePerMillionTokens: 3500, inputPrice: 2000, outputPrice: 8000, outputSpeed: 51.1, latency: 0.69, qualityIndex: 86 },
    { id: "128", creator: "AI21 Labs", provider: "AI21 Labs", model: "Jamba 1.5 Mini", name: "Jamba 1.5 Mini", contextWindow: 256000, pricePerMillionTokens: 250, inputPrice: 200, outputPrice: 400, outputSpeed: 161.2, latency: 0.85, qualityIndex: 64 },
    { id: "129", creator: "AI21 Labs", provider: "Microsoft Azure", model: "Jamba 1.5 Mini", name: "Jamba 1.5 Mini", contextWindow: 256000, pricePerMillionTokens: 250, inputPrice: 200, outputPrice: 400, outputSpeed: 82.5, latency: 0.50, qualityIndex: 64 },
    { id: "130", creator: "DeepSeek", provider: "DeepSeek", model: "DeepSeek-Coder-V2", name: "DeepSeek-Coder-V2", contextWindow: 128000, pricePerMillionTokens: 170, inputPrice: 140, outputPrice: 280, outputSpeed: 16.0, latency: 1.12, qualityIndex: null },
    { id: "131", creator: "DeepSeek", provider: "DeepSeek", model: "DeepSeek-V2", name: "DeepSeek-V2", contextWindow: 128000, pricePerMillionTokens: 170, inputPrice: 140, outputPrice: 280, outputSpeed: 16.4, latency: 1.15, qualityIndex: 82 },
    { id: "132", creator: "DeepSeek", provider: "DeepSeek", model: "DeepSeek-V2.5", name: "DeepSeek-V2.5", contextWindow: 128000, pricePerMillionTokens: 170, inputPrice: 140, outputPrice: 280, outputSpeed: 16.0, latency: 1.13, qualityIndex: null },
    { id: "133", creator: "DeepSeek", provider: "Hyperbolic", model: "DeepSeek-V2.5", name: "DeepSeek-V2.5", contextWindow: 128000, pricePerMillionTokens: 2000, inputPrice: 2000, outputPrice: 2000, outputSpeed: 7.6, latency: 0.84, qualityIndex: null },
    { id: "134", creator: "Alibaba", provider: "Hyperbolic", model: "Qwen2.5 72B", name: "Qwen2.5 72B", contextWindow: 131000, pricePerMillionTokens: 400, inputPrice: 400, outputPrice: 400, outputSpeed: 34.4, latency: 0.63, qualityIndex: null },
    { id: "135", creator: "Alibaba", provider: "Deepinfra", model: "Qwen2.5 72B", name: "Qwen2.5 72B", contextWindow: 131000, pricePerMillionTokens: 360, inputPrice: 350, outputPrice: 400, outputSpeed: 35.8, latency: 0.29, qualityIndex: null },
    { id: "136", creator: "Alibaba", provider: "Fireworks", model: "Qwen2 72B", name: "Qwen2 72B", contextWindow: 128000, pricePerMillionTokens: 900, inputPrice: 900, outputPrice: 900, outputSpeed: 58.9, latency: 0.33, qualityIndex: 83 },
    { id: "137", creator: "Alibaba", provider: "Deepinfra", model: "Qwen2 72B", name: "Qwen2 72B", contextWindow: 33000, pricePerMillionTokens: 360, inputPrice: 350, outputPrice: 400, outputSpeed: 31.1, latency: 0.45, qualityIndex: 83 },
    { id: "138", creator: "Alibaba", provider: "Together.ai", model: "Qwen2 72B", name: "Qwen2 72B", contextWindow: 33000, pricePerMillionTokens: 900, inputPrice: 900, outputPrice: 900, outputSpeed: 65.4, latency: 0.44, qualityIndex: 83 },
    { id: "139", creator: "01.AI", provider: "Fireworks", model: "Yi-Large", name: "Yi-Large", contextWindow: 32000, pricePerMillionTokens: 3000, inputPrice: 3000, outputPrice: 3000, outputSpeed: 63.0, latency: 0.48, qualityIndex: 81 },
    { id: "140", creator: "OpenAI", provider: "OpenAI", model: "GPT-4 Turbo", name: "GPT-4 Turbo", contextWindow: 128000, pricePerMillionTokens: 15000, inputPrice: 10000, outputPrice: 30000, outputSpeed: 33.1, latency: 0.67, qualityIndex: 94 },
    { id: "141", creator: "OpenAI", provider: "Microsoft Azure", model: "GPT-4 Turbo", name: "GPT-4 Turbo", contextWindow: 128000, pricePerMillionTokens: 15000, inputPrice: 10000, outputPrice: 30000, outputSpeed: 49.5, latency: 0.53, qualityIndex: 94 },
    { id: "142", creator: "OpenAI", provider: "OpenAI", model: "GPT-3.5 Turbo", name: "GPT-3.5 Turbo", contextWindow: 16000, pricePerMillionTokens: 750, inputPrice: 500, outputPrice: 1500, outputSpeed: 86.4, latency: 0.43, qualityIndex: 59 },
    { id: "143", creator: "OpenAI", provider: "Microsoft Azure", model: "GPT-3.5 Turbo", name: "GPT-3.5 Turbo", contextWindow: 16000, pricePerMillionTokens: 750, inputPrice: 500, outputPrice: 1500, outputSpeed: 89.1, latency: 0.34, qualityIndex: 59 },
    { id: "144", creator: "OpenAI", provider: "OpenAI", model: "GPT-3.5 Turbo Instruct", name: "GPT-3.5 Turbo Instruct", contextWindow: 4000, pricePerMillionTokens: 1630, inputPrice: 1500, outputPrice: 2000, outputSpeed: 107.3, latency: 0.41, qualityIndex: 60 },
    { id: "145", creator: "OpenAI", provider: "Microsoft Azure", model: "GPT-3.5 Turbo Instruct", name: "GPT-3.5 Turbo Instruct", contextWindow: 4000, pricePerMillionTokens: 1630, inputPrice: 1500, outputPrice: 2000, outputSpeed: 127.3, latency: 0.61, qualityIndex: 60 },
    { id: "146", creator: "OpenAI", provider: "OpenAI", model: "GPT-4", name: "GPT-4", contextWindow: 8000, pricePerMillionTokens: 37500, inputPrice: 30000, outputPrice: 60000, outputSpeed: 22.9, latency: 0.66, qualityIndex: 84 },
    { id: "147", creator: "OpenAI", provider: "Microsoft Azure", model: "GPT-4", name: "GPT-4", contextWindow: 8000, pricePerMillionTokens: 37500, inputPrice: 30000, outputPrice: 60000, outputSpeed: 33.3, latency: 0.54, qualityIndex: 84 },
    { id: "148", creator: "Meta", provider: "Replicate", model: "Llama 3 70B", name: "Llama 3 70B", contextWindow: 8000, pricePerMillionTokens: 1180, inputPrice: 650, outputPrice: 2750, outputSpeed: 47.9, latency: 0.55, qualityIndex: 83 },
    { id: "149", creator: "Meta", provider: "Hyperbolic", model: "Llama 3 70B", name: "Llama 3 70B", contextWindow: 8000, pricePerMillionTokens: 400, inputPrice: 400, outputPrice: 400, outputSpeed: 29.2, latency: 1.60, qualityIndex: 83 },
    { id: "150", creator: "Meta", provider: "Amazon Bedrock", model: "Llama 3 70B", name: "Llama 3 70B", contextWindow: 8000, pricePerMillionTokens: 2860, inputPrice: 2650, outputPrice: 3500, outputSpeed: 52.0, latency: 0.46, qualityIndex: 83 },
    { id: "151", creator: "Meta", provider: "OctoAI", model: "Llama 3 70B", name: "Llama 3 70B", contextWindow: 8000, pricePerMillionTokens: 900, inputPrice: 900, outputPrice: 900, outputSpeed: 69.4, latency: 0.34, qualityIndex: 83 },
    { id: "152", creator: "Meta", provider: "Lepton AI", model: "Llama 3 70B", name: "Llama 3 70B", contextWindow: 8000, pricePerMillionTokens: 800, inputPrice: 800, outputPrice: 800, outputSpeed: 30.1, latency: 0.82, qualityIndex: 83 },
    { id: "153", creator: "Meta", provider: "Microsoft Azure", model: "Llama 3 70B", name: "Llama 3 70B", contextWindow: 8000, pricePerMillionTokens: 2900, inputPrice: 2680, outputPrice: 3540, outputSpeed: 18.3, latency: 0.81, qualityIndex: 83 },
    { id: "154", creator: "Meta", provider: "Fireworks", model: "Llama 3 70B", name: "Llama 3 70B", contextWindow: 8000, pricePerMillionTokens: 900, inputPrice: 900, outputPrice: 900, outputSpeed: 107.0, latency: 0.33, qualityIndex: 83 },
    { id: "155", creator: "Meta", provider: "Deepinfra", model: "Llama 3 70B", name: "Llama 3 70B", contextWindow: 8000, pricePerMillionTokens: 360, inputPrice: 350, outputPrice: 400, outputSpeed: 21.6, latency: 0.32, qualityIndex: 83 },
    { id: "156", creator: "Meta", provider: "Groq", model: "Llama 3 70B", name: "Llama 3 70B", contextWindow: 8000, pricePerMillionTokens: 640, inputPrice: 590, outputPrice: 790, outputSpeed: 316.4, latency: 0.23, qualityIndex: 83 },
    { id: "157", creator: "Meta", provider: "Together.ai (Reference, FP16)", model: "Llama 3 70B", name: "Llama 3 70B (Reference, FP16)", contextWindow: 8000, pricePerMillionTokens: 900, inputPrice: 900, outputPrice: 900, outputSpeed: 108.2, latency: 0.65, qualityIndex: 83 },
    { id: "158", creator: "Meta", provider: "Together.ai (Turbo, FP8)", model: "Llama 3 70B", name: "Llama 3 70B (Turbo, FP8)", contextWindow: 8000, pricePerMillionTokens: 880, inputPrice: 880, outputPrice: 880, outputSpeed: 85.0, latency: 0.51, qualityIndex: 83 },
    { id: "159", creator: "Meta", provider: "Replicate", model: "Llama 3 8B", name: "Llama 3 8B", contextWindow: 8000, pricePerMillionTokens: 100, inputPrice: 50, outputPrice: 250, outputSpeed: 58.7, latency: 0.57, qualityIndex: 64 },
    { id: "160", creator: "Meta", provider: "Amazon Bedrock", model: "Llama 3 8B", name: "Llama 3 8B", contextWindow: 8000, pricePerMillionTokens: 380, inputPrice: 300, outputPrice: 600, outputSpeed: 78.4, latency: 0.35, qualityIndex: 64 },
    { id: "161", creator: "Meta", provider: "Lepton AI", model: "Llama 3 8B", name: "Llama 3 8B", contextWindow: 8000, pricePerMillionTokens: 70, inputPrice: 70, outputPrice: 70, outputSpeed: 84.1, latency: 1.08, qualityIndex: 64 },
    { id: "162", creator: "Meta", provider: "Microsoft Azure", model: "Llama 3 8B", name: "Llama 3 8B", contextWindow: 8000, pricePerMillionTokens: 380, inputPrice: 300, outputPrice: 610, outputSpeed: 73.4, latency: 0.48, qualityIndex: 64 },
    { id: "163", creator: "Meta", provider: "Fireworks", model: "Llama 3 8B", name: "Llama 3 8B", contextWindow: 8000, pricePerMillionTokens: 200, inputPrice: 200, outputPrice: 200, outputSpeed: 118.3, latency: 0.36, qualityIndex: 64 },
    { id: "164", creator: "Meta", provider: "Deepinfra", model: "Llama 3 8B", name: "Llama 3 8B", contextWindow: 8000, pricePerMillionTokens: 60, inputPrice: 60, outputPrice: 60, outputSpeed: 105.1, latency: 0.21, qualityIndex: 64 },
    { id: "165", creator: "Meta", provider: "Groq", model: "Llama 3 8B", name: "Llama 3 8B", contextWindow: 8000, pricePerMillionTokens: 60, inputPrice: 50, outputPrice: 80, outputSpeed: 1202.2, latency: 0.30, qualityIndex: 64 },
    { id: "166", creator: "Meta", provider: "Together.ai", model: "Llama 3 8B", name: "Llama 3 8B", contextWindow: 8000, pricePerMillionTokens: 200, inputPrice: 200, outputPrice: 200, outputSpeed: 291.8, latency: 0.47, qualityIndex: 64 },
    { id: "167", creator: "Meta", provider: "Replicate", model: "Llama 2 Chat 70B", name: "Llama 2 Chat 70B", contextWindow: 4000, pricePerMillionTokens: 1180, inputPrice: 650, outputPrice: 2750, outputSpeed: 48.1, latency: 0.71, qualityIndex: 57 },
    { id: "168", creator: "Meta", provider: "Amazon Bedrock", model: "Llama 2 Chat 70B", name: "Llama 2 Chat 70B", contextWindow: 4000, pricePerMillionTokens: 2100, inputPrice: 1950, outputPrice: 2560, outputSpeed: 36.7, latency: 0.47, qualityIndex: 57 },
    { id: "169", creator: "Meta", provider: "OctoAI", model: "Llama 2 Chat 70B", name: "Llama 2 Chat 70B", contextWindow: 4000, pricePerMillionTokens: 900, inputPrice: 900, outputPrice: 900, outputSpeed: 174.1, latency: 0.25, qualityIndex: 57 },
    { id: "170", creator: "Meta", provider: "Microsoft Azure", model: "Llama 2 Chat 70B", name: "Llama 2 Chat 70B", contextWindow: 4000, pricePerMillionTokens: 1600, inputPrice: 1540, outputPrice: 1770, outputSpeed: 15.5, latency: 1.02, qualityIndex: 57 },
    { id: "171", creator: "Meta", provider: "Amazon Bedrock", model: "Llama 2 Chat 13B", name: "Llama 2 Chat 13B", contextWindow: 4000, pricePerMillionTokens: 810, inputPrice: 750, outputPrice: 1000, outputSpeed: 53.1, latency: 0.41, qualityIndex: 39 },
    { id: "172", creator: "Meta", provider: "OctoAI", model: "Llama 2 Chat 13B", name: "Llama 2 Chat 13B", contextWindow: 4000, pricePerMillionTokens: 200, inputPrice: 200, outputPrice: 200, outputSpeed: 170.8, latency: 0.24, qualityIndex: 39 },
    { id: "173", creator: "Meta", provider: "Together.ai", model: "Llama 2 Chat 13B", name: "Llama 2 Chat 13B", contextWindow: 4000, pricePerMillionTokens: 300, inputPrice: 300, outputPrice: 300, outputSpeed: 52.1, latency: 0.50, qualityIndex: 39 },
    { id: "174", creator: "Meta", provider: "Replicate", model: "Llama 2 Chat 7B", name: "Llama 2 Chat 7B", contextWindow: 4000, pricePerMillionTokens: 100, inputPrice: 50, outputPrice: 250, outputSpeed: 124.3, latency: 0.55, qualityIndex: 29 },
    { id: "175", creator: "Meta", provider: "Microsoft Azure", model: "Llama 2 Chat 7B", name: "Llama 2 Chat 7B", contextWindow: 4000, pricePerMillionTokens: 560, inputPrice: 520, outputPrice: 670, outputSpeed: null, latency: null, qualityIndex: 29 },
    { id: "176", creator: "Google", provider: "Google (AI Studio)", model: "Gemini 1.0 Pro", name: "Gemini 1.0 Pro (AI Studio)", contextWindow: 33000, pricePerMillionTokens: 750, inputPrice: 500, outputPrice: 1500, outputSpeed: 97.7, latency: 1.21, qualityIndex: 62 },
    { id: "177", creator: "Anthropic", provider: "Amazon Bedrock", model: "Claude 3 Sonnet", name: "Claude 3 Sonnet", contextWindow: 200000, pricePerMillionTokens: 6000, inputPrice: 3000, outputPrice: 15000, outputSpeed: 47.1, latency: 0.81, qualityIndex: 80 },
    { id: "178", creator: "Anthropic", provider: "Anthropic", model: "Claude 3 Sonnet", name: "Claude 3 Sonnet", contextWindow: 200000, pricePerMillionTokens: 6000, inputPrice: 3000, outputPrice: 15000, outputSpeed: 64.9, latency: 0.79, qualityIndex: 80 },
    { id: "179", creator: "Mistral AI", provider: "Mistral", model: "Mistral Large", name: "Mistral Large", contextWindow: 33000, pricePerMillionTokens: 6000, inputPrice: 4000, outputPrice: 12000, outputSpeed: 31.6, latency: 0.76, qualityIndex: 76 },
    { id: "180", creator: "Mistral AI", provider: "Amazon Bedrock", model: "Mistral Large", name: "Mistral Large", contextWindow: 33000, pricePerMillionTokens: 6000, inputPrice: 4000, outputPrice: 12000, outputSpeed: 37.3, latency: 0.39, qualityIndex: 76 },
    { id: "181", creator: "Mistral AI", provider: "Microsoft Azure", model: "Mistral Large", name: "Mistral Large", contextWindow: 33000, pricePerMillionTokens: 6000, inputPrice: 4000, outputPrice: 12000, outputSpeed: 40.1, latency: 0.57, qualityIndex: 76 },
    { id: "182", creator: "Mistral AI", provider: "Mistral", model: "Mistral Small", name: "Mistral Small (Feb '24)", contextWindow: 33000, pricePerMillionTokens: 1500, inputPrice: 1000, outputPrice: 3000, outputSpeed: 76.6, latency: 0.58, qualityIndex: 71 },
    { id: "183", creator: "Mistral AI", provider: "Microsoft Azure", model: "Mistral Small", name: "Mistral Small (Feb '24)", contextWindow: 33000, pricePerMillionTokens: 1500, inputPrice: 1000, outputPrice: 3000, outputSpeed: 52.8, latency: 0.45, qualityIndex: 71 },
    { id: "184", creator: "Mistral AI", provider: "Mistral", model: "Mistral 7B", name: "Mistral 7B", contextWindow: 33000, pricePerMillionTokens: 250, inputPrice: 250, outputPrice: 250, outputSpeed: 96.6, latency: 0.49, qualityIndex: 40 },
    { id: "185", creator: "Mistral AI", provider: "Replicate", model: "Mistral 7B", name: "Mistral 7B", contextWindow: 33000, pricePerMillionTokens: 100, inputPrice: 50, outputPrice: 250, outputSpeed: 61.7, latency: 30.44, qualityIndex: 40 },
    { id: "186", creator: "Mistral AI", provider: "Amazon Bedrock", model: "Mistral 7B", name: "Mistral 7B", contextWindow: 33000, pricePerMillionTokens: 160, inputPrice: 150, outputPrice: 200, outputSpeed: 79.1, latency: 0.35, qualityIndex: 40 },
    { id: "187", creator: "Mistral AI", provider: "OctoAI", model: "Mistral 7B", name: "Mistral 7B", contextWindow: 33000, pricePerMillionTokens: 150, inputPrice: 150, outputPrice: 150, outputSpeed: 179.1, latency: 0.21, qualityIndex: 40 },
    { id: "188", creator: "Mistral AI", provider: "Lepton AI", model: "Mistral 7B", name: "Mistral 7B", contextWindow: 33000, pricePerMillionTokens: 70, inputPrice: 70, outputPrice: 70, outputSpeed: 102.9, latency: 0.97, qualityIndex: 40 },
    { id: "189", creator: "Mistral AI", provider: "Deepinfra", model: "Mistral 7B", name: "Mistral 7B", contextWindow: 33000, pricePerMillionTokens: 60, inputPrice: 60, outputPrice: 60, outputSpeed: 111.1, latency: 0.20, qualityIndex: 40 },
    { id: "190", creator: "Mistral AI", provider: "Perplexity", model: "Mistral 7B", name: "Mistral 7B", contextWindow: 16000, pricePerMillionTokens: 200, inputPrice: 200, outputPrice: 200, outputSpeed: 123.4, latency: 0.22, qualityIndex: 40 },
    { id: "191", creator: "Mistral AI", provider: "Together.ai", model: "Mistral 7B", name: "Mistral 7B", contextWindow: 8000, pricePerMillionTokens: 200, inputPrice: 200, outputPrice: 200, outputSpeed: 126.2, latency: 0.32, qualityIndex: 40 },
    { id: "192", creator: "Mistral AI", provider: "Mistral", model: "Codestral", name: "Codestral", contextWindow: 33000, pricePerMillionTokens: 300, inputPrice: 200, outputPrice: 600, outputSpeed: 47.8, latency: 0.57, qualityIndex: null },
    { id: "193", creator: "Mistral AI", provider: "Mistral", model: "Mistral Medium", name: "Mistral Medium", contextWindow: 33000, pricePerMillionTokens: 4090, inputPrice: 2750, outputPrice: 8100, outputSpeed: 38.0, latency: 0.86, qualityIndex: 70 },
];

const priceRatioOptions = [
    { value: '3:1', label: '3:1 (Input:Output)' },
    { value: '5:1', label: '5:1 (Input:Output)' },
    { value: '10:1', label: '10:1 (Input:Output)' },
];

const speedCriteriaOptions = [
  { value: 'outputSpeed', label: 'Output Speed' },
  { value: 'latency', label: 'Latency' },
];

const modelOptions = Array.from(new Set(data.map(item => item.model)))
const criteriaOptions = [
  { value: 'pricePerMillionTokens', label: 'Cheapest' },
  { value: 'outputSpeed', label: 'Fastest' }
]

export default function AIModelShowdown() {
    const [winner, setWinner] = useState<(DataItem & { adjustedPrice?: number }) | null>(null)
  const [isRevealing, setIsRevealing] = useState(false)
  const [selectedPriceRatio, setSelectedPriceRatio] = useState('3:1')
const [selectedSpeedCriteria, setSelectedSpeedCriteria] = useState('outputSpeed')
const [selectedCriteria, setSelectedCriteria] = useState(criteriaOptions[0].value) 
const [selectedModel, setSelectedModel] = useState(modelOptions[0])

const findWinner = () => {
    setIsRevealing(true)
    let winnerItem: DataItem & { adjustedPrice?: number } | null = null
  
    if (selectedCriteria === 'pricePerMillionTokens') {
      const [inputRatio, outputRatio] = selectedPriceRatio.split(':').map(Number)
      winnerItem = data.filter(item => item.model === selectedModel).reduce((min, item) => {
        const adjustedPrice = (item.inputPrice * inputRatio + item.outputPrice * outputRatio) / (inputRatio + outputRatio)
        return !min || adjustedPrice < (min.adjustedPrice || Infinity) ? { ...item, adjustedPrice } : min
      }, null as (DataItem & { adjustedPrice?: number }) | null)
    } else {
      winnerItem = data.filter(item => item.model === selectedModel).reduce((max, item) => {
        const currentValue = item[selectedSpeedCriteria as keyof DataItem] as number
        const maxValue = max ? max[selectedSpeedCriteria as keyof DataItem] as number : -Infinity
        return !max || currentValue > maxValue ? item : max
      }, null as DataItem | null)
    }
    
    setTimeout(() => {
      setWinner(winnerItem)
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    }, 2000)
  }

  useEffect(() => {
    setWinner(null)
    setIsRevealing(false)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <div className="container mx-auto p-8 max-w-md bg-white bg-opacity-20 backdrop-blur-lg rounded-xl shadow-lg text-center">
        <motion.h1 
          className="text-5xl font-extrabold mb-8 text-white"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          LLM API Showdown! 🏆
        </motion.h1>
        <div className="space-y-6 mb-8">
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger className="bg-white bg-opacity-50 backdrop-blur-sm">
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
              {modelOptions.map((model) => (
                <SelectItem key={model} value={model}>
                  {model}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedCriteria} onValueChange={setSelectedCriteria}>
  <SelectTrigger className="bg-white bg-opacity-50 backdrop-blur-sm">
    <SelectValue placeholder="Select criteria" />
  </SelectTrigger>
  <SelectContent>
    {criteriaOptions.map((option) => (
      <SelectItem key={option.value} value={option.value}>
        {option.label}
      </SelectItem>
    ))}
  </SelectContent>
</Select>
{selectedCriteria === 'pricePerMillionTokens' && (
  <Select value={selectedPriceRatio} onValueChange={setSelectedPriceRatio}>
    <SelectTrigger className="bg-white bg-opacity-50 backdrop-blur-sm">
      <SelectValue placeholder="Select price ratio" />
    </SelectTrigger>
    <SelectContent>
      {priceRatioOptions.map((option) => (
        <SelectItem key={option.value} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
)}
{selectedCriteria === 'outputSpeed' && (
  <Select value={selectedSpeedCriteria} onValueChange={setSelectedSpeedCriteria}>
    <SelectTrigger className="bg-white bg-opacity-50 backdrop-blur-sm">
      <SelectValue placeholder="Select speed criteria" />
    </SelectTrigger>
    <SelectContent>
      {speedCriteriaOptions.map((option) => (
        <SelectItem key={option.value} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
)}
          <Button onClick={findWinner} disabled={isRevealing} className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition duration-200 hover:scale-105">
            Find the Winner!
          </Button>
        </div>
        <AnimatePresence>
          {isRevealing && !winner && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-3xl font-bold mb-4 text-white"
            >
              🥁 Drumroll please... 🥁
            </motion.div>
          )}
          {winner && (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className="bg-white bg-opacity-80 backdrop-blur-lg p-6 rounded-lg shadow-xl"
  >
    <h2 className="text-3xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">👑 Winner 👑</h2>
    <p className="text-4xl font-bold mb-2 text-purple-800">{winner.provider}</p>
    <p className="text-xl mb-4 text-gray-600">{winner.model}</p>
    <p className="text-2xl font-bold text-pink-600">
      {selectedCriteria === 'pricePerMillionTokens' 
        ? `$${((winner.adjustedPrice || winner.pricePerMillionTokens) / 1000).toFixed(2)} per million tokens (${selectedPriceRatio} ratio)`
        : selectedSpeedCriteria === 'outputSpeed'
          ? `${winner.outputSpeed.toFixed(1)} tokens/second`
          : `${winner.latency.toFixed(2)} seconds latency`}
    </p>
  </motion.div>
)}
        </AnimatePresence>
      </div>
    </div>
  )
}
