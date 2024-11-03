import { CommandNode, CommandSuggestion } from '../types/commands';

export async function fetchCommandTree(): Promise<CommandNode> {
  const response = await fetch('https://gist.githubusercontent.com/Dinnerbone/7370a2846953eee2d8fc64514fb76de8/raw/ec8c0ae1212a31c4d1a65b81158797122dd14633/command_tree.json');
  return response.json();
}

export function getSuggestions(
  input: string,
  commandTree: CommandNode
): CommandSuggestion[] {
  const parts = input.slice(1).split(' ');
  let currentNode = commandTree;
  
  // Navigate to current command node
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (currentNode.children && currentNode.children[part]) {
      currentNode = currentNode.children[part];
    } else {
      return [];
    }
  }

  const suggestions: CommandSuggestion[] = [];
  const currentInput = parts[parts.length - 1].toLowerCase();

  if (currentNode.children) {
    Object.entries(currentNode.children).forEach(([key, node]) => {
      if (key.toLowerCase().startsWith(currentInput)) {
        suggestions.push({
          text: key,
          type: getNodeType(node),
          description: getNodeDescription(node)
        });
      }
    });
  }

  return suggestions;
}

function getNodeType(node: CommandNode): CommandSuggestion['type'] {
  switch (node.parser) {
    case 'minecraft:entity':
      return 'player';
    case 'brigadier:integer':
    case 'brigadier:float':
      return 'number';
    case 'minecraft:item':
    case 'minecraft:block':
      return 'string';
    default:
      return 'keyword';
  }
}

function getNodeDescription(node: CommandNode): string {
  if (node.parser === 'brigadier:integer' || node.parser === 'brigadier:float') {
    const { min, max } = node.properties || {};
    return min !== undefined && max !== undefined ? `Range: ${min} to ${max}` : 'Number';
  }
  return node.parser?.replace('minecraft:', '').replace('brigadier:', '') || '';
}