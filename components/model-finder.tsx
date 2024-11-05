"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Brain, Trophy, Laptop, Calculator, Microscope, MessageSquare, ArrowRight, RotateCcw, Info, Globe, Code, Sparkles, Zap, Clock, ImageIcon } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Types and interfaces
interface Step {
  id: string
  question: string
  description: string
  options: {
    id: string
    title: string
    description: string
    icon: React.ElementType
  }[]
  multiple?: boolean
}

interface Benchmark {
  name: string
  description: string
  category: "Technical" | "Knowledge" | "Communication"
  icon: React.ElementType
}

interface Model {
  name: string
  provider: string
  license: "Open source"
  contextWindow: number
  size: "Small" | "Medium" | "Large"
  multimodal: boolean
  mmlu: number
  gpqa: number
  math: number
  humaneval: number
  evalplus: number
  chatbotArena: number
  arc_challenge: number
  gsm8k: number
  mt_bench: number
  ifeval: number
  api_bank: number
  bfcl: number
}

interface EnhancedResult {
  model: Model
  scores: {
    total: number
    useCase: number
    requirements: number
  }
  strengths: string[]
  recommendations: {
    bestFor: RecommendationCategory[]
    limitations: RecommendationCategory[]
  }
}

interface ProviderInfo {
  provider: string;
  pricePerMillionTokens: number;
  link: string;
}

const providerLinks: Record<string, string> = {
  "Hyperbolic": "https://www.hyperbolic.xyz",
  "Amazon Bedrock": "https://aws.amazon.com",
  "OctoAI": "https://octo.ai",
  "Lepton AI": "https://www.lepton.ai",
  "Microsoft Azure": "https://azure.microsoft.com",
  "Fireworks": "https://fireworks.ai",
  "Deepinfra": "https://www.deepinfra.com",
  "Groq": "https://groq.com",
  "SambaNova": "https://sambanova.ai",
  "Databricks": "https://www.databricks.com",
  "Perplexity": "https://www.perplexity.ai",
  "Together.ai": "https://www.together.ai",
  "Together.ai Turbo": "https://www.together.ai",
  "Cerebras": "https://www.cerebras.ai",
  "Nebius AI": "https://nebius.com/studio/inference/?utm_source=modelpicker",
  "Nebius AI Fast": "https://nebius.com/studio/inference/?utm_source=modelpicker",
  "DeepSeek": "https://www.deepseek.com",
  "Mistral": "https://mistral.ai",
  "Replicate": "https://replicate.com"
};
const modelToProviders: Record<string, ProviderInfo[]> = {
  "DeepSeek-Coder-V2-Lite": [
    { provider: "Nebius AI", pricePerMillionTokens: 0.04, link: providerLinks["Nebius AI"] },
    { provider: "Nebius AI Fast", pricePerMillionTokens: 0.08, link: providerLinks["Nebius AI Fast"] }
  ],
  "Phi-3-mini-4k": [
    { provider: "Nebius AI", pricePerMillionTokens: 0.04, link: providerLinks["Nebius AI"] },
    { provider: "Nebius AI Fast", pricePerMillionTokens: 0.13, link: providerLinks["Nebius AI Fast"] }
  ],
  "Mistral-Codestral-Mamba": [
    { provider: "Nebius AI", pricePerMillionTokens: 0.08, link: providerLinks["Nebius AI"] },
    { provider: "Nebius AI Fast", pricePerMillionTokens: 0.15, link: providerLinks["Nebius AI Fast"] }
  ],
  "Qwen2.5-Coder-7B": [
    { provider: "Nebius AI", pricePerMillionTokens: 0.01, link: providerLinks["Nebius AI"] },
    { provider: "Nebius AI Fast", pricePerMillionTokens: 0.03, link: providerLinks["Nebius AI Fast"] }
  ],
  "Llama-3.1-8B": [
    { provider: "Nebius AI", pricePerMillionTokens: 0.02, link: providerLinks["Nebius AI"] },
    { provider: "Nebius AI Fast", pricePerMillionTokens: 0.03, link: providerLinks["Nebius AI Fast"] }
  ],
  "Llama-3.1-70B": [
    { provider: "Nebius AI", pricePerMillionTokens: 0.13, link: providerLinks["Nebius AI"] },
    { provider: "Nebius AI Fast", pricePerMillionTokens: 0.25, link: providerLinks["Nebius AI Fast"] }
  ],
  "Llama-3.1-405B": [
    { provider: "Nebius AI", pricePerMillionTokens: 1.00, link: providerLinks["Nebius AI"] },
    { provider: "Nebius AI Fast", pricePerMillionTokens: 3.00, link: providerLinks["Nebius AI Fast"] }
  ],
  "Llama-3.1-Nemotron-70B": [
    { provider: "Nebius AI", pricePerMillionTokens: 0.13, link: providerLinks["Nebius AI"] },
    { provider: "Nebius AI Fast", pricePerMillionTokens: 0.25, link: providerLinks["Nebius AI Fast"] }
  ],
  "Gemma-2-9B": [
    { provider: "Nebius AI", pricePerMillionTokens: 0.02, link: providerLinks["Nebius AI"] },
    { provider: "Nebius AI Fast", pricePerMillionTokens: 0.03, link: providerLinks["Nebius AI Fast"] }
  ],
  "Gemma-2-27B": [
    { provider: "Nebius AI", pricePerMillionTokens: 0.10, link: providerLinks["Nebius AI"] },
    { provider: "Nebius AI Fast", pricePerMillionTokens: 0.17, link: providerLinks["Nebius AI Fast"] }
  ],
  "Mixtral-8x7B": [
    { provider: "Nebius AI", pricePerMillionTokens: 0.08, link: providerLinks["Nebius AI"] },
    { provider: "Nebius AI Fast", pricePerMillionTokens: 0.15, link: providerLinks["Nebius AI Fast"] }
  ]
};



// Data
const useCases = {
  "Chatbots and Conversational AI": {
    primaryMetrics: ["chatbotArena", "mt_bench"],
    secondaryMetrics: ["mmlu", "ifeval"]
  },
  "Content Generation": {
    primaryMetrics: ["mmlu", "chatbotArena"],
    secondaryMetrics: ["mt_bench", "ifeval"]
  },
  "Code Assistance and Development": {
    primaryMetrics: ["humaneval", "evalplus"],
    secondaryMetrics: ["mmlu", "gpqa"]
  },
  "Text Summarization and Information Extraction": {
    primaryMetrics: ["mmlu", "arc_challenge"],
    secondaryMetrics: ["chatbotArena", "ifeval"]
  },
  "Research and Data Analysis": {
    primaryMetrics: ["gpqa", "arc_challenge"],
    secondaryMetrics: ["mmlu", "math"]
  }
}

const benchmarkWeights = {
  useCase_specific: {
    primary: 2.0,
    secondary: 1.0
  },
  requirements: 1.5
}

const steps: Step[] = [
  {
    id: "use_case",
    question: "What's your primary use case?",
    description: "Select the main area you'll be using the AI model for",
    options: [
      {
        id: "chatbots",
        title: "Chatbots and Conversational AI",
        description: "Building interactive chatbots and conversational interfaces",
        icon: MessageSquare
      },
      {
        id: "content_generation",
        title: "Content Generation",
        description: "Creating articles, stories, or marketing copy",
        icon: Sparkles
      },
      {
        id: "code_assistance",
        title: "Code Assistance and Development",
        description: "Writing, analyzing, or debugging code",
        icon: Code
      },
      {
        id: "text_summarization",
        title: "Text Summarization and Information Extraction",
        description: "Condensing long texts and extracting key information",
        icon: Laptop
      },
      {
        id: "research_analysis",
        title: "Research and Data Analysis",
        description: "Analyzing scientific papers, data sets, or conducting research",
        icon: Microscope
      }
    ]
  },
  {
    id: "model_requirements",
    question: "What are your model requirements?",
    description: "Select all that apply to your needs",
    options: [
      {
        id: "general_knowledge",
        title: "Broad Knowledge Base",
        description: "Prioritize models with extensive general knowledge",
        icon: Globe
      },
      {
        id: "fast_inference",
        title: "Fast Inference",
        description: "Optimize for quick responses in real-time applications",
        icon: Zap
      },
      {
        id: "long_context",
        title: "Long Context Handling",
        description: "Work with extensive documents or complex conversations",
        icon: Clock
      },
      {
        id: "multimodal",
        title: "Visual Understanding",
        description: "Process and analyze both text and images",
        icon: ImageIcon
      },
      {
        id: "efficiency",
        title: "Resource Efficiency",
        description: "Suitable for deployment with limited computational resources",
        icon: Laptop
      }
    ],
    multiple: true
  }
]

const benchmarks: Record<string, Benchmark> = {
  mmlu: {
    name: "Reasoning (MMLU)",
    description: "Tests knowledge and reasoning across multiple subjects",
    category: "Knowledge",
    icon: Brain
  },
  gpqa: {
    name: "Scientific (GPQA)",
    description: "Measures scientific reasoning and knowledge",
    category: "Knowledge",
    icon: Microscope
  },
  math: {
    name: "Mathematical (MATH)",
    description: "Tests mathematical problem-solving ability",
    category: "Technical",
    icon: Calculator
  },
  humaneval: {
    name: "Coding (HumanEval)",
    description: "Evaluates code generation and understanding",
    category: "Technical",
    icon: Code
  },
  evalplus: {
    name: "Advanced Coding (EvalPlus)",
    description: "Assesses advanced programming skills and problem-solving",
    category: "Technical",
    icon: Laptop
  },
  chatbotArena: {
    name: "Communication",
    description: "Measures conversational ability and natural language understanding",
    category: "Communication",
    icon: MessageSquare
  },
  arc_challenge: {
    name: "Reasoning (ARC)",
    description: "Tests abstract reasoning and problem-solving skills",
    category: "Knowledge",
    icon: Brain
  },
  gsm8k: {
    name: "Math Word Problems (GSM8K)",
    description: "Evaluates ability to solve grade school math word problems",
    category: "Technical",
    icon: Calculator
  },
  mt_bench: {
    name: "Translation (MT-Bench)",
    description: "Assesses machine translation capabilities",
    category: "Communication",
    icon: Globe
  },
  ifeval: {
    name: "Instruction Following (IF-Eval)",
    description: "Measures ability to follow specific instructions accurately",
    category: "Communication",
    icon: Info
  },
  api_bank: {
    name: "API Integration",
    description: "Tests ability to understand and use various APIs",
    category: "Technical",
    icon: Code
  },
  bfcl: {
    name: "Function Calling",
    description: "Evaluates capability in calling and using functions",
    category: "Technical",
    icon: Code
  }
}

const models: Model[] = [
  {
    name: "DeepSeek-Coder-V2-Lite",
    provider: "DeepSeek",
    license: "Open source",
    contextWindow: 128,
    size: "Small",
    multimodal: false,
    mmlu: 60.1,
    gpqa: 32.8,
    math: 61.8,
    humaneval: 90.2,
    evalplus: 77.4,
    chatbotArena: 1178,
    arc_challenge: 58.5,
    gsm8k: 76.2,
    mt_bench: 7.81,
    ifeval: 82.5,
    api_bank: 68.7,
    bfcl: 75.0
  },
  {
    name: "DeepSeek-Coder-V2",
    provider: "DeepSeek",
    license: "Open source",
    contextWindow: 128,
    size: "Medium",
    multimodal: false,
    mmlu: 79.2,
    gpqa: 35.6,
    math: 75.7,
    humaneval: 76.2,
    evalplus: 86.4,
    chatbotArena: 1071,
    arc_challenge: 70.0,
    gsm8k: 88.4,
    mt_bench: 8.77,
    ifeval: 84.9,
    api_bank: 58.6,
    bfcl: 75.0
  },
  {
    name: "Phi-3-mini-4k",
    provider: "Microsoft",
    license: "Open source",
    contextWindow: 4,
    size: "Small",
    multimodal: false,
    mmlu: 70.9,
    gpqa: 41.3,
    math: 66.8,
    humaneval: 83.5,
    evalplus: 92.8,
    chatbotArena: 1071,
    arc_challenge: 70.0,
    gsm8k: 68.5,
    mt_bench: 8.38,
    ifeval: 94.9,
    api_bank: 68.7,
    bfcl: 75.0
  },
  {
    name: "Mistral-Codestral-Mamba",
    provider: "Mistral AI",
    license: "Open source",
    contextWindow: 32,
    size: "Small",
    multimodal: false,
    mmlu: 45.6,
    gpqa: 57.3,
    math: 45.8,
    humaneval: 88.4,
    evalplus: 83.5,
    chatbotArena: 1071,
    arc_challenge: 70.0,
    gsm8k: 68.5,
    mt_bench: 8.38,
    ifeval: 84.9,
    api_bank: 68.7,
    bfcl: 75.0
  },
  {
    name: "Qwen2.5-Coder-7B",
    provider: "Alibaba",
    license: "Open source",
    contextWindow: 32,
    size: "Small",
    multimodal: false,
    mmlu: 45.6,
    gpqa: 57.3,
    math: 45.8,
    humaneval: 88.4,
    evalplus: 83.5,
    chatbotArena: 1071,
    arc_challenge: 70.0,
    gsm8k: 68.5,
    mt_bench: 8.38,
    ifeval: 84.9,
    api_bank: 68.7,
    bfcl: 75.0
  },
  {
    name: "Llama-3.1-8B",
    provider: "Meta",
    license: "Open source",
    contextWindow: 128,
    size: "Small",
    multimodal: false,
    mmlu: 73.0,
    gpqa: 48.3,
    math: 51.9,
    humaneval: 72.6,
    evalplus: 72.8,
    chatbotArena: 1173,
    arc_challenge: 66.4,
    gsm8k: 80.5,
    mt_bench: 8.22,
    ifeval: 87.5,
    api_bank: 62.9,
    bfcl: 84.8
  },
  {
    name: "Llama-3.1-70B",
    provider: "Meta",
    license: "Open source",
    contextWindow: 128,
    size: "Medium",
    multimodal: false,
    mmlu: 86.0,
    gpqa: 66.4,
    math: 68.0,
    humaneval: 80.5,
    evalplus: 86.0,
    chatbotArena: 1247,
    arc_challenge: 73.3,
    gsm8k: 89.0,
    mt_bench: 8.49,
    ifeval: 88.6,
    api_bank: 87.5,
    bfcl: 84.8
  },
  {
    name: "Llama-3.1-405B",
    provider: "Meta",
    license: "Open source",
    contextWindow: 128,
    size: "Large",
    multimodal: false,
    mmlu: 88.6,
    gpqa: 73.3,
    math: 73.8,
    humaneval: 89.0,
    evalplus: 88.6,
    chatbotArena: 1267,
    arc_challenge: 50.7,
    gsm8k: 89.0,
    mt_bench: 8.98,
    ifeval: 87.5,
    api_bank: 88.6,
    bfcl: 87.5
  },
  {
    name: "Llama-3.2-11B-Vision",
    provider: "Meta",
    license: "Open source",
    contextWindow: 128,
    size: "Medium",
    multimodal: true,
    mmlu: 74.0,
    gpqa: 53.1,
    math: 62.2,
    humaneval: 75.2,
    evalplus: 74.3,
    chatbotArena: 1123,
    arc_challenge: 67.3,
    gsm8k: 77.9,
    mt_bench: 7.84,
    ifeval: 84.8,
    api_bank: 84.2,
    bfcl: 84.8
  },
  {
    name: "Llama-3.2-90B-Vision",
    provider: "Meta",
    license: "Open source",
    contextWindow: 128,
    size: "Large",
    multimodal: true,
    mmlu: 86.0,
    gpqa: 75.8,
    math: 59.1,
    humaneval: 86.5,
    evalplus: 84.1,
    chatbotArena: 1303,
    arc_challenge: 84.8,
    gsm8k: 88.5,
    mt_bench: 8.91,
    ifeval: 84.8,
    api_bank: 84.12,
    bfcl: 81.8
  }
]

// Add this near the top of your file with other interfaces (around line 48-67)
type UseCase = keyof typeof useCases;

type RecommendationCategory =
  | UseCase
  | "Fast Processing"
  | "Complex Processing"
  | "Balanced Performance"
  | "Long Context Support"
  | "Visual Understanding"
  | "Basic Performance"
  | "Limited Capabilities";

// Add this with your other constants (around line 160-180)
const modelCategories = {
  FAST_INFERENCE: "Fast Processing" as RecommendationCategory,
  COMPLEX_TASKS: "Complex Processing" as RecommendationCategory,
  BALANCED: "Balanced Performance" as RecommendationCategory,
  LONG_CONTEXT: "Long Context Support" as RecommendationCategory,
  VISUAL: "Visual Understanding" as RecommendationCategory,
  BASIC: "Basic Performance" as RecommendationCategory,
  LIMITED: "Limited Capabilities" as RecommendationCategory
} as const;

export default function ModelSelector() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selections, setSelections] = useState<Record<string, string | string[]>>({})
  const [results, setResults] = useState<EnhancedResult[] | null>(null)

  const handleSelection = (stepId: string, optionId: string) => {
    setSelections(prev => {
      if (steps[currentStep].multiple) {
        const current = prev[stepId] as string[] || []
        return {
          ...prev,
          [stepId]: current.includes(optionId)
            ? current.filter(id => id !== optionId)
            : [...current, optionId]
        }
      } else {
        return { ...prev, [stepId]: optionId }
      }
    })

    if (!steps[currentStep].multiple && currentStep < steps.length - 1) {
      setCurrentStep(curr => curr + 1)
    }
  }

  const calculateResults = () => {
    const useCase = steps[0].options.find(opt => opt.id === selections.use_case)?.title as keyof typeof useCases
    const modelRequirements = selections.model_requirements as string[]

    // Score all models first
    const scoredModels = models.map(model => {
      let requirementsMetCount = 0
      modelRequirements.forEach(req => {
        switch (req) {
          case 'general_knowledge':
            if (model.size === 'Large' || model.mmlu > 75) requirementsMetCount++
            break
          case 'fast_inference':
            if (model.size === 'Small' || model.size === 'Medium') requirementsMetCount++
            break
          case 'long_context':
            if (model.contextWindow >= 32) requirementsMetCount++
            break
          case 'multimodal':
            if (model.multimodal) requirementsMetCount++
            break
          case 'efficiency':
            if (model.size === 'Small' || model.size === 'Medium') requirementsMetCount++
            break
        }
      })
      return { model, requirementsMetCount }
    })

    // Sort by requirements met and get the top matches
    scoredModels.sort((a, b) => b.requirementsMetCount - a.requirementsMetCount)
    const maxRequirementsMet = scoredModels[0].requirementsMetCount
    
    // Filter models that meet at least 50% of the max requirements met
    const filteredModels = scoredModels
      .filter(({ requirementsMetCount }) => 
        requirementsMetCount >= Math.max(1, maxRequirementsMet * 0.5))
      .map(({ model }) => model)

    // If we still have no matches, take the top 3 models by overall benchmark scores
    if (filteredModels.length === 0) {
      const backupModels = [...models].sort((a, b) => {
        const aScore = (a.mmlu + a.humaneval + a.chatbotArena/15) / 3
        const bScore = (b.mmlu + b.humaneval + b.chatbotArena/15) / 3
        return bScore - aScore
      }).slice(0, 3)
      return setResults(backupModels.map(model => ({
        model,
        scores: {
          total: 70,
          useCase: 65,
          requirements: 75
        },
        strengths: ['Balanced performance'],
        recommendations: {
          bestFor: [useCase, modelCategories.BASIC],
          limitations: [modelCategories.LIMITED]
        }
      })))
    }

    // Continue with existing ranking logic for filtered models
    const rankedModels: EnhancedResult[] = filteredModels.map(model => {
      const { primaryMetrics, secondaryMetrics } = useCases[useCase]
      
      let useCaseScore = 0
      primaryMetrics.forEach(metric => {
        const normalizedScore = metric === 'chatbotArena' 
          ? (model[metric] / 1500) * 100  // Normalize ELO to 0-100
          : model[metric as keyof Model] as number
        useCaseScore += normalizedScore * benchmarkWeights.useCase_specific.primary
      })
      secondaryMetrics.forEach(metric => {
        const normalizedScore = metric === 'chatbotArena'
          ? (model[metric] / 1500) * 100
          : model[metric as keyof Model] as number
        useCaseScore += normalizedScore * benchmarkWeights.useCase_specific.secondary
      })
      useCaseScore /= (primaryMetrics.length * benchmarkWeights.useCase_specific.primary + 
                       secondaryMetrics.length * benchmarkWeights.useCase_specific.secondary)

      let requirementsScore = 0
      modelRequirements.forEach(req => {
        switch (req) {
          case 'general_knowledge':
            requirementsScore += (model.mmlu / 100) * 100 // Normalize to 0-100
            break
          case 'fast_inference':
            requirementsScore += model.size === 'Small' ? 100 : model.size === 'Medium' ? 70 : 40
            break
          case 'long_context':
            requirementsScore += Math.min((model.contextWindow / 256) * 100, 100) // Cap at 100
            break
          case 'multimodal':
            requirementsScore += model.multimodal ? 100 : 0
            break
          case 'efficiency':
            const sizeScore = model.size === 'Small' ? 100 : model.size === 'Medium' ? 70 : 40
            const benchmarkScore = (model.humaneval + model.evalplus) / 2
            requirementsScore += (sizeScore * 0.6 + benchmarkScore * 0.4)
            break
        }
      })
      requirementsScore /= modelRequirements.length

      const requirementsPriority = modelRequirements.length / 5 // 0.2 to 1.0
      const totalScore = (useCaseScore * (1 - requirementsPriority * 0.5)) + 
                        (requirementsScore * (requirementsPriority * 0.5))

      const strengths = [...primaryMetrics, ...secondaryMetrics]
        .filter(metric => (model[metric as keyof Model] as number) > 80)
        .map(metric => benchmarks[metric].name)

      const recommendations = {
        bestFor: [useCase] as RecommendationCategory[],
        limitations: [] as RecommendationCategory[]
      };

      if (model.size === 'Small') {
        recommendations.bestFor.push(modelCategories.FAST_INFERENCE);
      } else if (model.size === 'Large') {
        recommendations.bestFor.push(modelCategories.COMPLEX_TASKS);
      } else {
        recommendations.bestFor.push(modelCategories.BALANCED);
      }

      if (model.contextWindow >= 64) {
        recommendations.bestFor.push(modelCategories.LONG_CONTEXT);
      }

      if (model.multimodal) {
        recommendations.bestFor.push(modelCategories.VISUAL);
      }

      if ((model[primaryMetrics[0] as keyof Model] as number) < 70) {
        recommendations.limitations.push(modelCategories.BASIC);
      }

      if (model.chatbotArena < 1100) {
        recommendations.limitations.push(modelCategories.LIMITED);
      }

      return {
        model,
        scores: {
          total: totalScore,
          useCase: useCaseScore,
          requirements: requirementsScore
        },
        strengths,
        recommendations
      }
    })

    rankedModels.sort((a, b) => b.scores.total - a.scores.total)

    setResults(rankedModels.slice(0, 3))
  }

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-slate-50 to-slate-100 shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">
          <Brain className="w-10 h-10" />
          AI Model Finder v5
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <AnimatePresence mode="wait">
          {!results && currentStep < steps.length && (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold">{steps[currentStep].question}</h2>
                <p className="text-muted-foreground">{steps[currentStep].description}</p>
              </div>

              <div className="grid gap-4">
                {steps[currentStep].options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleSelection(steps[currentStep].id, option.id)}
                    className={`w-full text-left p-6 rounded-lg border-2 transition-all hover:border-blue-300 hover:bg-blue-50/50
                      ${Array.isArray(selections[steps[currentStep].id])
                        ? (selections[steps[currentStep].id] as string[]).includes(option.id)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200'
                        : selections[steps[currentStep].id] === option.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200'
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <option.icon className="w-6 h-6 text-blue-500" />
                        <div>
                          <h3 className="font-medium">{option.title}</h3>
                          <p className="text-sm text-muted-foreground">{option.description}</p>
                        </div>
                      </div>
                      {steps[currentStep].multiple ? (
                        <Checkbox
                          checked={(selections[steps[currentStep].id] as string[] || []).includes(option.id)}
                          onCheckedChange={() => handleSelection(steps[currentStep].id, option.id)}
                          className="h-5 w-5"
                        />
                      ) : (
                        <ArrowRight className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {currentStep === steps.length - 1 && (
                <Button 
                  onClick={calculateResults}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white mt-4 py-6 text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Find Models <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {results && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-semibold flex items-center gap-2">
                  <Trophy className="w-8 h-8 text-yellow-500" />
                  Recommended Models
                </h2>
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  Top {results.length} matches
                </Badge>
              </div>

              <div className="grid gap-6">
                {results.map((result, index) => (
                  <motion.div
                    key={result.model.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="border-2 hover:border-blue-300 transition-all duration-200 shadow-lg hover:shadow-xl">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-6">
                          <div>
                            <h3 className="text-2xl font-semibold flex items-center gap-2">
                              {result.model.name}
                              <Badge variant="outline" className="ml-2 text-lg">Rank #{index + 1}</Badge>
                            </h3>
                            <p className="text-muted-foreground">Provider: {result.model.provider}</p>
                          </div>
                          <Badge 
                            variant="secondary"
                            className="text-lg px-3 py-1 bg-green-100 text-green-800"
                          >
                            Open Source
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                          <div className="space-y-2">
                            <h4 className="font-medium text-sm text-muted-foreground">Total Score</h4>
                            <div className="text-2xl font-bold">{result.scores.total.toFixed(1)}</div>
                          </div>
                          <div className="space-y-2">
                            <h4 className="font-medium text-sm text-muted-foreground">Use Case Score</h4>
                            <div className="text-2xl font-bold">{result.scores.useCase.toFixed(1)}</div>
                          </div>
                          <div className="space-y-2">
                            <h4 className="font-medium text-sm text-muted-foreground">Requirements Score</h4>
                            <div className="text-2xl font-bold">{result.scores.requirements.toFixed(1)}</div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">Key Benchmarks:</h4>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger className="flex items-center gap-1">
                                      <Brain className="w-4 h-4" />
                                      <span>Reasoning (MMLU)</span>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Tests knowledge and reasoning across multiple subjects</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                                <Progress value={result.model.mmlu} className="h-2" />
                                <div className="text-sm font-medium">{result.model.mmlu}%</div>
                              </div>
                              <div className="space-y-2">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger className="flex items-center gap-1">
                                      <MessageSquare className="w-4 h-4" />
                                      <span>Communication</span>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Measures conversational ability and natural language understanding</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                                <Progress value={result.model.chatbotArena / 1.5} className="h-2" />
                                <div className="text-sm font-medium">{result.model.chatbotArena} ELO</div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Strengths:</h4>
                            <div className="flex flex-wrap gap-2">
                              {result.strengths.map(strength => (
                                <Badge key={strength} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                  {strength}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Best For:</h4>
                            <div className="flex flex-wrap gap-2">
                              {result.recommendations.bestFor.map(use => (
                                <Badge key={use} className="bg-blue-100 text-blue-700">
                                  {use}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="mt-4">
                          <h4 className="font-medium mb-2">Cheapest API Providers:</h4>
                          <div className="grid gap-2">
                            {modelToProviders[result.model.name]?.slice(0, 2).map((providerInfo, idx) => (
                              <a
                                key={idx}
                                href={providerInfo.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="font-medium">{providerInfo.provider}</div>
                                </div>
                                <Badge variant="secondary">
                                  ${providerInfo.pricePerMillionTokens.toFixed(3)}/1M tokens
                                </Badge>
                              </a>
                            )) || (
                              <div className="text-muted-foreground text-sm">
                                No API provider information available
                              </div>
                            )}
                          </div>
                        </div>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" className="w-full mt-4">
                              <Info className="w-4 h-4 mr-2" />
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                              <DialogTitle className="text-2xl">{result.model.name}</DialogTitle>
                              <DialogDescription>
                                Detailed information about the model
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-6 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right font-semibold">Provider</Label>
                                <div className="col-span-3">{result.model.provider}</div>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right font-semibold">License</Label>
                                <div className="col-span-3">{result.model.license}</div>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right font-semibold">Context Window</Label>
                                <div className="col-span-3">{result.model.contextWindow}k tokens</div>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right font-semibold">Size</Label>
                                <div className="col-span-3">{result.model.size}</div>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right font-semibold">Multimodal</Label>
                                <div className="col-span-3">{result.model.multimodal ? "Yes" : "No"}</div>
                              </div>
                              <div className="grid grid-cols-4 items-start gap-4">
                                <Label className="text-right font-semibold">All Benchmarks</Label>
                                <div className="col-span-3 space-y-2">
                                  {Object.entries(benchmarks).map(([key, benchmark]) => (
                                    <div key={key} className="flex items-center justify-between">
                                      <span>{benchmark.icon && <benchmark.icon className="w-4 h-4 inline-block mr-2" />} {benchmark.name}</span>
                                      <Badge variant="outline">
                                        {key === 'chatbotArena' ? `${result.model[key]} ELO` : `${result.model[key as keyof Model]}%`}
                                      </Badge>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <Button 
                onClick={() => {
                  setCurrentStep(0)
                  setSelections({})
                  setResults(null)
                }}
                variant="outline"
                className="w-full py-6 text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Start Over
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}