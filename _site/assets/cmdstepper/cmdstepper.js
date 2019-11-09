function CmdStepper(stepLength) {
  var boundStep,
    cmdIndex = 0,
    cmds = [],
    isPaused = false,
    isStepping = false,
    timeoutID = 0,
    ms = stepLength;
  this.current = function() {
    return cmds[cmdIndex];
  }
  this.pause = function () {
    if(isStepping) { 
      if(!isPaused) {
        isPaused = true;
        if (timeoutID !== 0) {
          window.clearTimeout(timeoutID);
        }
      } else {
        isPaused = false;
        boundStep();
      }
    }
  }
  this.reset = function () {
    cmdIndex = 0;
    cmds.forEach(function (v) { v.reset(); });
    isPaused = false;
    isStepping = false;
    if (timeoutID !== 0) {
      window.clearTimeout(timeoutID);
    }
  }
  this.start = function (newCmds) {
    cmds = newCmds;
    this.reset();
    isStepping = true;
    boundStep();
  }
  this.step = function () {
    let cmd = cmds[cmdIndex];
    cmd.do();
    if (!cmd.isDone()) {
      timeoutID = window.setTimeout(boundStep, ms);
    } else if (cmdIndex < (cmds.length - 1)) {
      cmdIndex++;
      boundStep();
    } else {
      isStepping = false;
    }
  }
  boundStep = this.step.bind(this);
}