import { SolcInput, SolcOutput } from './solc';
import { Node, NodeType, NodeTypeMap } from './node';
import { SourceUnit } from './types';

export { findAll } from './utils/find-all';

export function isNodeType<N extends Node, T extends NodeType>(nodeType: T | readonly T[]): (node: N) => node is N & NodeTypeMap[T];
export function isNodeType<N extends Node, T extends NodeType>(nodeType: T | readonly T[], node: N): node is N & NodeTypeMap[T];

export interface NodeWithSourceUnit<T extends Node = Node> {
  node: Node;
  sourceUnit: SourceUnit;
}

export interface ASTDereferencer {
  <T extends NodeType>(nodeType: T | readonly T[]): (id: number) => NodeTypeMap[T];
  <T extends NodeType>(nodeType: T | readonly T[], id: number): NodeTypeMap[T];
  withSourceUnit<T extends NodeType>(nodeType: T | readonly T[], id: number): NodeWithSourceUnit<NodeTypeMap[T]>;
}

export function astDereferencer(solcOutput: SolcOutput): ASTDereferencer;

export type SrcDecoder = (node: { src: string }) => string;

export function srcDecoder(solcInput: SolcInput, solcOutput: SolcOutput): SrcDecoder;
