declare module 'mark.js' {
  export interface MarkOptions {
    element?: string;
    className?: string;
    exclude?: any[];
    iframes?: boolean;
    iframesTimeout?: number;
    separateWordSearch?: boolean;
    diacritics?: boolean;
    synonyms?: any;
    accuracy?: string | { value: string; limiters?: string[] };
    acrossElements?: boolean;
    caseSensitive?: boolean;
    ignoreJoiners?: boolean;
    ignoreGroups?: number;
    ignorePunctuation?: string[];
    wildcards?: string | { start: string; end: string };
    each?: (node: HTMLElement, term: string, counter: number) => void;
    noMatch?: (node: HTMLElement | null) => void;
    done?: (counter: number) => void;
    debug?: boolean;
    log?: Window['console'];
    warn?: Window['console'];
  }

  export default class Mark {
    constructor(ctx: Node | Node[] | NodeList | string);
    mark(term: string | string[], options?: MarkOptions): Promise<void>;
    unmark(options?: MarkOptions): Promise<void>;
    markRegExp(regexp: RegExp, options?: MarkOptions): Promise<void>;
  }
}
