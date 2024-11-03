export interface CommandNode {
  type: string;
  parser?: string;
  executable?: boolean;
  redirect?: string[];
  children?: { [key: string]: CommandNode };
  properties?: {
    amount?: string;
    min?: number;
    max?: number;
    identifier?: string;
  };
}

export interface CommandSuggestion {
  text: string;
  type: 'command' | 'player' | 'number' | 'string' | 'keyword';
  description?: string;
}