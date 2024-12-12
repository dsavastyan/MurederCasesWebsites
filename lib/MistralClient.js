// lib/MistralClient.js

import { AbortController, AbortSignal } from 'node-abort-controller'; // If needed, otherwise remove.
import fetch from 'node-fetch';

const VERSION = '0.5.0';
const RETRY_STATUS_CODES = [429, 500, 502, 503, 504];
const ENDPOINT = 'https://api.mistral.ai';

class MistralAPIError extends Error {
  constructor(message) {
    super(message);
    this.name = 'MistralAPIError';
  }
}

/**
 * Combine multiple signals into one that aborts if any is aborted.
 */
function combineSignals(signals) {
  const controller = new AbortController();
  signals.forEach((signal) => {
    if (!signal) return;
    signal.addEventListener('abort', () => {
      controller.abort(signal.reason);
    }, { once: true });

    if (signal.aborted) {
      controller.abort(signal.reason);
    }
  });
  return controller.signal;
}

class MistralClient {
  /**
   * @param {string} apiKey Your Mistral API key
   * @param {string} endpoint Mistral API endpoint
   * @param {number} maxRetries Number of retries for 5xx or 429 errors
   * @param {number} timeout Request timeout in seconds
   */
  constructor(
    apiKey = process.env.MISTRAL_API_KEY,
    endpoint = ENDPOINT,
    maxRetries = 5,
    timeout = 120
  ) {
    this.endpoint = endpoint;
    this.apiKey = apiKey;
    this.maxRetries = maxRetries;
    this.timeout = timeout;

    if (this.endpoint.includes('inference.azure.com')) {
      this.modelDefault = 'mistral';
    }
  }

  async _request(method, path, request, signal, formData = null) {
    const url = `${this.endpoint}/${path}`;
    const headers = {
      'User-Agent': `mistral-client-js/${VERSION}`,
      'Accept': request?.stream ? 'text/event-stream' : 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
    };

    if (!formData && method !== 'get') {
      headers['Content-Type'] = 'application/json';
    }

    const combinedSignal = combineSignals([
      AbortSignal.timeout(this.timeout * 1000),
      signal,
    ]);

    const options = {
      method: method,
      headers: headers,
      signal: combinedSignal,
      body: method !== 'get' ? formData ?? JSON.stringify(request) : null,
    };

    for (let attempts = 0; attempts < this.maxRetries; attempts++) {
      try {
        const response = await fetch(url, options);
        if (response.ok) {
          if (request?.stream) {
            // Streaming not required for our basic use-case. If needed,
            // you'd handle the stream here.
            return response.body;
          }
          return await response.json();
        } else if (RETRY_STATUS_CODES.includes(response.status)) {
          console.debug(
            `Retrying request on response status: ${response.status}`,
            `Response: ${await response.text()}`,
            `Attempt: ${attempts + 1}`
          );
          await new Promise((resolve) =>
            setTimeout(resolve, Math.pow(2, attempts + 1) * 500)
          );
        } else {
          throw new MistralAPIError(
            `HTTP error! status: ${response.status} Response: \n${await response.text()}`
          );
        }
      } catch (error) {
        console.error(`Request failed: ${error.message}`);
        if (error.name === 'MistralAPIError') {
          throw error;
        }
        if (attempts === this.maxRetries - 1) throw error;
        await new Promise((resolve) =>
          setTimeout(resolve, Math.pow(2, attempts + 1) * 500)
        );
      }
    }
    throw new Error('Max retries reached');
  }

  /**
   * Sends a chat completion request to the Mistral API
   * @param {Object} data The parameters for the request
   * @param {string} data.model The model name (e.g. 'mistral-large-latest')
   * @param {Array} data.messages Array of messages, each {role, content}
   * @param {Array} [data.tools] Optional tools
   * @param {number} [data.temperature] Sampling temperature
   * @param {number} [data.maxTokens] Max tokens
   * @param {number} [data.topP] Top-p sampling
   * @param {number} [data.randomSeed] Random seed
   * @param {boolean} [data.safePrompt] Safe prompt or safe mode
   * @param {string} [data.toolChoice] Tool choice
   * @param {string} [data.responseFormat] Response format
   * @param {Object} [options] Additional options
   * @param {AbortSignal} [options.signal] Abort signal
   */
  async chat(
    {
      model,
      messages,
      tools,
      temperature,
      maxTokens,
      topP,
      randomSeed,
      safePrompt,
      toolChoice,
      responseFormat,
    },
    { signal } = {}
  ) {
    if (!model && !this.modelDefault) {
      throw new MistralAPIError('You must provide a model name');
    }

    const request = {
      model: model ?? this.modelDefault,
      messages,
      tools: tools ?? undefined,
      temperature: temperature ?? undefined,
      max_tokens: maxTokens ?? undefined,
      top_p: topP ?? undefined,
      random_seed: randomSeed ?? undefined,
      stream: false,
      safe_prompt: safePrompt ?? undefined,
      tool_choice: toolChoice ?? undefined,
      response_format: responseFormat ?? undefined,
    };

    const response = await this._request(
      'post',
      'v1/chat/completions',
      request,
      signal
    );
    return response;
  }
}

export default MistralClient;
