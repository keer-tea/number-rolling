
const maxLenNum = (aNum: string | number, bNum: string | number) => {
  return (aNum > bNum ? aNum : bNum).toString().length
}

const num2PadNumArr = (num: {toString: () => any}, len: any) => {
  const padLeftStr = (rawStr: string, lenNum: number): string => 
    rawStr.length < lenNum ? padLeftStr('0' + rawStr, lenNum) : rawStr
  const str2NumArr = (rawStr: string) => rawStr.split('').map(Number)
  return str2NumArr(padLeftStr(num.toString(), len)).reverse()
}

const isstr = (any: any): any is string => Object.prototype.toString.call(any) === '[object String]'

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

export class Roll {
  private node: HTMLElement;
  // 最大位数就是根据这个 from 来定的
  private from: number;
  private easeFn: (pos: number) => number;
  private systemArr: Array<string | number>;
  private beforeArr: Array<number>;
  private afterArr: Array<number>;
  private numberColumnNodeArr: Array<HTMLElement>;
  private duration: number;
  private to: number;
  private direct: boolean;
  private separator: string | string[];
  private separateOnly: number;
  private separateEvery: number;
  private height?: number;
  private letterMargin?: number;
  constructor({
    node,
    from = 0,
    easeFn = (pos: number) => ((pos /= 0.5) < 1 ? 0.5 * Math.pow(pos, 3) : 0.5 * (Math.pow(pos - 2, 3) + 2)),
    systemArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    duration = 0.5,
    to,
    direct = true,
    delay,
    separator,
    separateOnly = 0,
    separateEvery = 3,
    letterMargin = 0
  }: RollOptions) {
    // 翻转前的数组
    this.beforeArr = []
    // 翻转后的数组
    this.afterArr = []
    // 一列数字的容器数组
    this.numberColumnNodeArr = []
    // 花多长时间完成数字滚动
    this.duration = duration * 1000
    // 用户传入的转换字符串
    this.systemArr = systemArr
    // 用户传入的移动函数
    this.easeFn = easeFn
    // 用户最开始传入的数字
    this.from = from
    // 用户要到达的数字
    this.to = to || 0
    // 数字滚动的容器
    this.node = node
    // 数字的每位是否直接滚动到对应数字
    this.direct = direct
    this.separator = separator
    this.separateOnly = separateOnly
    this.separateEvery = separateOnly ? 0 : separateEvery
    // 
    this.letterMargin = letterMargin
    // 初始化
    this._initHTML(maxLenNum(this.from, this.to))
    // 无关紧要这个方法
    this.setSelect(this.from)
    if (to === undefined) return
    if (delay) setTimeout(() => this.rollTo({to: this.to}), delay)
    else this.rollTo({to: this.to})
  }
  _initHTML(digits: number) {
    while (this.node.lastChild) {
      this.node.removeChild(this.node.lastChild);
    }
    this.node.classList.add('number-roll')
    this.node.style.position = 'relative'
    this.node.style.overflow = 'hidden'
    this.node.style.display = 'block'
    this.node
    for(let i = 0; i < digits; i ++) {
      const numberColumnNode = document.createElement('div')
      numberColumnNode.classList.add(`ncn${i}`)
      numberColumnNode.classList.add(`ncn`)
      numberColumnNode.style.position = 'relative'
      numberColumnNode.style.display = 'inline-block'
      numberColumnNode.style.verticalAlign = 'top';
      numberColumnNode.style.margin = `0 ${this.letterMargin}px`;

      [...this.systemArr, this.systemArr[0]].forEach(i => {
        const child = document.createElement('div')
        child.className = 'digit'
        child.innerHTML = `${i}`
        // appendChild 方法，把参数追加到指定父节点的子节点列表末尾。
        // 如果接收的参数在 dom 树中存在，那它将会被剪切
        numberColumnNode.appendChild(child)
      })
      // 这里是添加到数组开头
      this.numberColumnNodeArr.unshift(numberColumnNode)
      // 这里是添加到末尾
      this.node.appendChild(numberColumnNode)
      this.beforeArr.push(0)
      /**
      如果没有设置分隔符，则不需要添加分隔符。
      如果设置了分隔符，那么只有设置了separateOnly或separateEvery其中之一才会生效，不能同时设置。
      如果当前数字已经是最高位，即个位数，则不需要添加分隔符。
      如果当前数字不是需要分隔符分割的数字，根据separateEvery和separateOnly的值判断是否需要添加分隔符。
      其中separateOnly优先级较高，如果设置了separateOnly，则在滚动过程中只会添加一次分隔符。
      否则，按照separateEvery的值决定每几个数字添加一个分隔符。
       */
      if (
        !this.separator ||
        (!this.separateOnly && !this.separateEvery) ||
        i === digits - 1 ||
        ((digits - i) % this.separateEvery != 1 && digits - i -this.separateOnly != 1) 
      ) 
        continue
      const sprtrStr = isstr(this.separator) ? this.separator : this.separator.shift() as string
      const separator = document.createElement('div')
      separator.className = 'sprtr'
      separator.style.display = 'inline-block'
      separator.innerHTML = sprtrStr
      this.node.appendChild(separator)
    }
    const resize = () => {
      this.height = this.numberColumnNodeArr[0].clientHeight / (this.systemArr.length + 1)
      this.node.style.height = this.height + 'px'
      if(this.afterArr.length) {
        // this.frame(1)
      } else {
        for (let d = 0, len = this.numberColumnNodeArr.length; d < len; d ++) {
          this._draw({
            digit: d,
            per: 1,
            alter: ~~(this.from / Math.pow(10, d))
          })
        } 
      }
    }
    resize()
    window.addEventListener('resize', resize)
  }
  _draw({per, alter, digit}: {per: number; alter: number; digit: number}) {
    const newHeight = this.numberColumnNodeArr[0].clientHeight / (this.systemArr.length + 1)
    if(this.height !== newHeight) this.height = newHeight
    const from = this.beforeArr[digit]
    
    // 有可能是负数，所以要两次取余。一定在 0 到 9 之间。
    // 翻滚前的数字再来加上差值 * 百分比
    const modNum = (((per * alter + from) % 10) + 10) % 10

    const translateY = `translateY(${- modNum * (this.height || 0)}px) `
    
    this.numberColumnNodeArr[digit].style.webkitTransform = translateY
    this.numberColumnNodeArr[digit].style.transform = translateY
  }
  frame(per: number) {
    let temp = 0;
    for(let d = this.numberColumnNodeArr.length - 1; d >= 0; d --) {
      const alter = this.afterArr[d] - this.beforeArr[d]
      
      temp += alter
      this._draw({
        digit: d,
        per: this.easeFn(per),
        alter: this.direct ? alter: temp
      })
      // 这里必须乘10
      temp *= 10
    }
  }
  rollTo ({
    to,
    duration = 0,
    easeFn,
    direct
  }: {
    to: number;
    duration?: number;
    easeFn?: () => any;
    direct?: boolean
  }) {
    if(easeFn) this.easeFn = easeFn
    if(direct !== undefined) this.direct = direct
    this.setSelect(to)
    const len = this.numberColumnNodeArr.length
    this.beforeArr = num2PadNumArr(this.from, len)
    this.afterArr = num2PadNumArr(to, len)
    const start = Date.now()
    const dur = duration * 1000 || this.duration
    const tick = () => {
      const elapsed = Date.now() - start

      this.frame(elapsed / dur)
      if(elapsed < dur) requestAnimationFrame(tick)
      else {
        this.from = to;
        this.frame(1)
      }
    }
    requestAnimationFrame(tick);
  }
  // 无关紧要这个方法
  setSelect (num: number) {
    const len = this.numberColumnNodeArr.length
    num2PadNumArr(num, len).forEach((n: number, digit: number) => {
      for (let i = 0; i < this.numberColumnNodeArr[digit].childNodes.length; i ++) {
        const el = this.numberColumnNodeArr[digit].childNodes[i] as HTMLElement
        el.style.userSelect = i === n ? 'auto' : 'none'
      }
    })
  }
}