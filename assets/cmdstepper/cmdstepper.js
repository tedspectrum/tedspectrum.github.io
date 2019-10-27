function CmdList(cmdArr) {
  var cmds = cmdArr;
  var i = 0;
  this.current = function () {
    return cmds[i];
  }
  this.empty = function () {
    cmds.forEach(function (v, i, a) { a.pop(); });
  }
  this.hasNext = function () {
    return (i < (cmds.length - 1));
  }
  this.next = function () {
    if (this.hasNext()) {
      i++;
    }
    return cmds[i];
  }
  this.push = function (val) {
    cmds.push(val);
  }
  this.reset = function (m, v) {
    cmds.forEach(function (val) { val.reset(m, v); });
    i = 0;
  }
}

function CmdStepper(stepLength) {
  var boundStep,
    timeoutID = 0,
    ms = stepLength;
  this.firstStep = function (m, v, cmds) {
    this.reset(m, v);
    cmds.reset(m, v);
    this.step(m, v, cmds);
  }
  this.step = function (m, v, cmds) {
    let cmd = cmds.current();
    cmd.do(m, v);
    if (!cmd.isDone(m, v)) {
      timeoutID = window.setTimeout(boundStep, ms, m, v, cmds);
    } else if (cmds.hasNext()) {
      cmds.next();
      boundStep(m, v, cmds);
    }
  }
  this.reset = function (m, v) {
    if (timeoutID !== 0) {
      window.clearTimeout(timeoutID);
    }
  }
  boundStep = this.step.bind(this);
}