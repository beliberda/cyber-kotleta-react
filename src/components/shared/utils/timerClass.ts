class dynamicTimer {
  triggerTime = 0;
  callback = () => {};
  timer: any;
  constructor(func: () => void, delay: number) {
    this.callback = func;
    this.triggerTime = +new Date() + delay;
    this.timer = 0;
    this.updateTimer();
  }

  updateTimer() {
    clearTimeout(this.timer);
    let delay = this.triggerTime - Number(new Date());
    console.log("Current delay: ", delay);
    this.timer = setTimeout(this.callback, delay);
    return this;
  }

  addTime(delay: number) {
    this.triggerTime -= delay;
    this.updateTimer();
    return this;
  }
}
