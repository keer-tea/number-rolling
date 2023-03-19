interface RollOptions {
  node: HTMLElement,
  from: number,
  easeFn?: (pos: number) => number,
  systemArr?: Array<string | number>,
  duration?: number,
  to?: number,
  direct?: boolean,
  separator?: string | string[],
  separateOnly?: number,
  separateEvery?: number,
  delay?: number,
  letterMargin?: number
}
export declare class Roll {
  private node: HTMLElement;
  // 最大位数就是根据这个 from 来定的
  from: number;
  private easeFn: (pos: number) => number;
  private systemArr: Array<string | number>;
  private beforeArr: Array<number>;
  private afterArr: Array<number>;
  private numberColumnNodeArr: Array<HTMLElement>;
  private duration: number;
  to: number;
  private direct: boolean;
  private separator: string | string[];
  private separateOnly: number;
  private separateEvery: number;
  private height?: number;
  private letterMargin?: number;
    constructor({ node, from, to, duration, delay, easeFn, systemArr, direct, separator, separateOnly, separateEvery, }: RollOptions);
    _initHTML(digits: number): void;
    _draw({ per, alter, digit }: {
        per: number;
        alter: number;
        digit: number;
    }): void;
    frame(per: number): void;
    rollTo({ to, duration, easeFn, direct, }: {
        to: number;
        duration?: number;
        easeFn?: () => any;
        direct?: boolean;
    }): void;
    setSelect(num: any): void;
}
export {};
