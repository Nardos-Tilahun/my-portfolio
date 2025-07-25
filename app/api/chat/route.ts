import { NextResponse } from "next/server";
import { personalData } from "@/data/PersonalInfo";

// Define more specific types to replace 'any'
interface ApiResponseData {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
  error?: {
    message: string;
  };
}

// Define types for configurations and responses
interface ProviderConfig {
  provider: AIProvider;
  apiKey: string;
  systemPrompt: string;
  options: ProviderOptions;
}

interface ProviderOptions {
  temperature: number;
  maxTokens: number;
  topP: number;
  topK?: number;
  model?: string;
}

interface ProviderResponse {
  content: string;
  metadata?: Record<string, unknown>;
  provider: string;
}

interface ConfigResult {
  configs: Record<string, ProviderConfig>;
  errors: Record<string, string>;
}

// Define interfaces for API provider configuration and response
interface AIProvider {
  name: string;
  getEndpoint: () => string;
  getHeaders: (apiKey: string) => Record<string, string>;
  formatRequest: (
    systemPrompt: string,
    message: string,
    options?: ProviderOptions
  ) => Record<string, unknown>;
  parseResponse: (data: ApiResponseData) => {
    content: string;
    metadata?: Record<string, unknown>;
  };
}

// Function to ensure response ends with a period and is a complete sentence
function ensureCompleteResponse(response: string): string {
  let processedResponse = response.trim();

  // If the response is empty, return a default message
  if (!processedResponse) {
    return "I apologize, but I couldn't generate a proper response at this time.";
  }

  // Check if the response ends with a complete sentence
  // Find the last sentence-ending punctuation
  const lastSentenceEndMatch = processedResponse.match(/[.!?][^.!?]*$/);

  if (lastSentenceEndMatch) {
    // Extract everything up to and including the last sentence-ending punctuation
    const lastSentenceEndIndex = lastSentenceEndMatch.index! + 1;
    processedResponse = processedResponse.substring(0, lastSentenceEndIndex);
  } else if (!/[.!?]$/.test(processedResponse)) {
    // If there's no sentence-ending punctuation at all, add a period
    processedResponse += ".";
  }

  return processedResponse;
}

// Default error message that should trigger fallback
const DEFAULT_ERROR_MESSAGE =
  "I apologize, but I couldn't generate a proper response at this time.";

// Provider implementations
const providers: Record<string, AIProvider> = {
  gemini: {
    name: "Gemini",
    getEndpoint: () =>
      "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent",
    getHeaders: () => ({
      "Content-Type": "application/json",
    }),
    formatRequest: (systemPrompt, message) => ({
      contents: [
        {
          role: "user",
          parts: [{ text: systemPrompt }, { text: message }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 500,
        topP: 0.95,
        topK: 40,
      },
    }),
    parseResponse: (data) => ({
      content: ensureCompleteResponse(
        data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || ""
      ),
      metadata: data as Record<string, unknown>,
    }),
  },

  groq: {
    name: "Groq",
    getEndpoint: () => "https://api.groq.com/openai/v1/chat/completions",
    getHeaders: (apiKey) => ({
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    }),
    formatRequest: (systemPrompt, message) => ({
      model: "llama3-70b-8192",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      temperature: 0.7,
      max_tokens: 500,
      top_p: 0.95,
    }),
    parseResponse: (data) => ({
      content: ensureCompleteResponse(
        data.choices?.[0]?.message?.content?.trim() || ""
      ),
      metadata: data as Record<string, unknown>,
    }),
  },

  openrouter: {
    name: "OpenRouter",
    getEndpoint: () => "https://openrouter.ai/api/v1/chat/completions",
    getHeaders: (apiKey) => ({
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    }),
    formatRequest: (systemPrompt, message) => ({
      model: "deepseek/deepseek-r1:free",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      temperature: 0.7,
      max_tokens: 500,
      top_p: 0.95,
    }),
    parseResponse: (data) => ({
      content: ensureCompleteResponse(
        data.choices?.[0]?.message?.content?.trim() || ""
      ),
      metadata: data as Record<string, unknown>,
    }),
  },
};

// Define the fallback order for providers
const fallbackOrder: string[] = ["groq", "openrouter", "gemini"];

// Function to get secure configuration for all providers
function getAllConfigs(): ConfigResult {
  const configs: Record<string, ProviderConfig> = {};
  const errors: Record<string, string> = {};

  // Get system prompt
  const basePrompt = process.env.SYSTEM_PROMPT;
  if (!basePrompt) {
    throw new Error("Missing SYSTEM_PROMPT environment variable");
  }

  // Check if personalData exists
  if (!personalData) {
    throw new Error("personalData is missing");
  }

  // Add dynamic data to the prompt
  const systemPrompt = basePrompt.replace(
    "{{PERSONAL_DATA}}",
    JSON.stringify(personalData, null, 2)
  );

  // Get common configuration options
  const commonOptions: ProviderOptions = {
    temperature: parseFloat(process.env.AI_TEMPERATURE || "0.7"),
    maxTokens: parseInt(process.env.AI_MAX_TOKENS || "500"),
    topP: parseFloat(process.env.AI_TOP_P || "0.95"),
    topK: parseInt(process.env.AI_TOP_K || "40"),
  };

  // Try to get configs for all providers
  for (const providerName of fallbackOrder) {
    try {
      if (!providers[providerName]) {
        errors[providerName] = `Unsupported provider: ${providerName}`;
        continue;
      }

      // Get API key for the provider
      let apiKey: string | undefined;
      if (providerName === "groq") {
        apiKey = process.env.GROQ_API_KEY;
      } else {
        const apiKeyEnvVar = `${providerName.toUpperCase()}_API_KEY`;
        apiKey = process.env[apiKeyEnvVar];
      }

      if (!apiKey) {
        errors[providerName] = `Missing API key for provider: ${providerName}`;
        continue;
      }

      // Get model configuration for the provider
      let model: string | undefined;
      if (providerName === "openrouter") {
        model = process.env.OPENROUTER_MODEL || "deepseek/deepseek-chat";
      } else if (providerName === "groq") {
        model = process.env.GROQ_MODEL || "llama3-70b-8192";
      } else {
        const modelEnvVar = `${providerName.toUpperCase()}_MODEL`;
        model = process.env[modelEnvVar] || undefined;
      }

      configs[providerName] = {
        provider: providers[providerName],
        apiKey,
        systemPrompt,
        options: {
          ...commonOptions,
          model,
        },
      };
    } catch (error) {
      errors[providerName] =
        error instanceof Error ? error.message : String(error);
    }
  }

  // Check if we have at least one valid provider config
  const validProviders = Object.keys(configs);
  if (validProviders.length === 0) {
    throw new Error(
      `No valid provider configurations available. Errors: ${JSON.stringify(
        errors
      )}`
    );
  }

  return { configs, errors };
}

// Function to call a provider's API
async function callProviderAPI(
  providerName: string,
  config: ProviderConfig,
  message: string
): Promise<ProviderResponse> {
  const provider = config.provider;
  const endpoint = provider.getEndpoint();
  const headers = provider.getHeaders(config.apiKey);

  const requestBody = provider.formatRequest(
    config.systemPrompt,
    message,
    config.options
  );

  // Special handling for different providers
  let url = endpoint;

  // Gemini requires the API key as a query parameter
  if (providerName === "gemini") {
    url = `${endpoint}?key=${config.apiKey}`;
  }
  // For other providers, use the endpoint as is (they use Authorization header)

  console.log(`Attempting to call ${providerName} API at: ${url}`);

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(requestBody),
  });

  const data = (await response.json()) as ApiResponseData;

  if (!response.ok) {
    const errorMessage = data.error?.message || response.statusText;
    console.error(`${providerName} API error:`, errorMessage);
    throw new Error(`${providerName} API request failed: ${errorMessage}`);
  }

  const parsedResponse = provider.parseResponse(data);

  // Check if the response matches our default error message or is empty
  if (
    !parsedResponse.content ||
    parsedResponse.content === DEFAULT_ERROR_MESSAGE
  ) {
    throw new Error(
      `${providerName} returned an empty or default error response`
    );
  }

  return {
    content: parsedResponse.content,
    metadata: parsedResponse.metadata,
    provider: providerName,
  };
}

// Message interface for request processing
interface Message {
  role: string;
  content: string;
}

// Request body interface
interface RequestBody {
  messages?: Message[];
  message?: string;
}

export async function POST(req: Request) {
  try {
    // Parse request body
    const body: RequestBody = await req.json();
    // Process messages
    const messages: Message[] = Array.isArray(body.messages)
      ? body.messages
      : [];
    if (body.message) {
      messages.push({ role: "user", content: body.message });
    }

    if (messages.length === 0) {
      return NextResponse.json(
        { error: "No messages provided." },
        { status: 400 }
      );
    }

    const lastMessage = messages[messages.length - 1]?.content;
    if (!lastMessage) {
      return NextResponse.json(
        { error: "Last message content is empty." },
        { status: 400 }
      );
    }

    // Get preferred provider from environment
    const preferredProvider = process.env.AI_PROVIDER || "openrouter";

    // Get configurations for all providers
    const { configs, errors } = getAllConfigs();

    console.log("Available providers:", Object.keys(configs));
    console.log("Provider errors:", errors);

    // Create a custom fallback order starting with the preferred provider
    let customFallbackOrder = [preferredProvider];
    fallbackOrder.forEach((provider) => {
      if (provider !== preferredProvider && configs[provider]) {
        customFallbackOrder.push(provider);
      }
    });

    // Filter to only include providers we have configs for
    customFallbackOrder = customFallbackOrder.filter(
      (provider) => configs[provider]
    );

    console.log("Fallback order:", customFallbackOrder);

    // Try each provider in the fallback order
    let lastError: Error | null = null;
    const attemptedProviders: string[] = [];

    for (const providerName of customFallbackOrder) {
      try {
        if (!configs[providerName]) {
          console.log(`Skipping ${providerName}: no valid config`);
          continue;
        }

        console.log(`Trying provider: ${providerName}`);
        attemptedProviders.push(providerName);

        const result = await callProviderAPI(
          providerName,
          configs[providerName],
          lastMessage
        );

        // Additional check for problematic responses
        if (
          result.content === DEFAULT_ERROR_MESSAGE ||
          result.content.includes(
            "Sorry this is not available in our knowledge"
          )
        ) {
          console.log(
            `${providerName} returned unusable response, trying next provider`
          );
          throw new Error(`${providerName} returned an unusable response`);
        }

        // Check if should redirect to contact
        const shouldRedirectToContact = result.content.includes(
          "Sorry this is not available in our knowledge"
        );

        // If we're using a fallback provider, log that information
        const isUsingFallback = providerName !== preferredProvider;

        console.log(`Successfully got response from ${providerName}`);

        return NextResponse.json({
          message: {
            id: Date.now(),
            role: "ai",
            content: result.content,
            shouldRedirectToContact,
            provider: result.provider,
            metadata: {
              ...result.metadata,
              usedFallback: isUsingFallback,
              originalProvider: preferredProvider,
              attemptedProviders,
            },
          },
        });
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        console.error(`Provider ${providerName} failed:`, errorMessage);
        lastError = error instanceof Error ? error : new Error(String(error));
        // Continue to the next provider in the fallback order
      }
    }

    // If we reach here, all providers failed
    console.error("All providers failed");
    return NextResponse.json(
      {
        error: "All AI providers failed to process the request.",
        details:
          lastError instanceof Error ? lastError.message : String(lastError),
        providersAttempted: attemptedProviders,
        configErrors: errors,
      },
      { status: 500 }
    );
  } catch (error) {
    console.error("Unexpected error in POST handler:", error);
    return NextResponse.json(
      {
        error: "An unexpected error occurred.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
