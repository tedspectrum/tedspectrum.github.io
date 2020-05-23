/*eslint no-unused-vars: "off"*/
function CmdStepper(stepLength) {
  var cmdIndex = 0,
    cmds = [],
    isPaused = false,
    isStepping = false,
    timeoutID = 0,
    defaultms = stepLength ? stepLength : 100;
  function boundStep() {
    let ms = 0,
      cmd = cmds[cmdIndex];
    // cmd should have do(), isDone(), reset() functions and ms property
    cmd.do && cmd.do();
    if (cmd.isDone && !cmd.isDone()) {
      // cmd that doesn't have isDone is done once only.
      // cmd has more steps to do.
      ms = Object.prototype.hasOwnProperty.call(cmd, "ms") ? cmd.ms : defaultms;
      if (ms > 0) {
        timeoutID = window.setTimeout(boundStep, ms);
      } else {
        timeoutID = 0;
        boundStep();
      }
    } else if (cmdIndex < cmds.length - 1) {
      // cmd has no more steps to do, do next if it exists
      cmdIndex++;
      boundStep();
    } else {
      // this cmd is done, there are no more.
      timeoutID = 0;
      isStepping = false;
    }
  }
  function CmdWait(delayMs) {
    var i = 0;
    this.do = function () {
      i++;
    };
    this.isDone = function () {
      return i > 1;
    };
    this.ms = delayMs;
  }
  this.current = function () {
    return cmds[cmdIndex];
  };
  this.delay = function (delayMs) {
    return new CmdWait(delayMs);
  };
  this.getDefaultMs = function () {
    return defaultms;
  };
  this.isStepping = function () {
    return isStepping;
  };
  this.pause = function () {
    if (isStepping) {
      if (!isPaused) {
        isPaused = true;
        timeoutID !== 0 && window.clearTimeout(timeoutID);
      } else {
        isPaused = false;
        boundStep();
      }
    }
  };
  this.reset = function () {
    cmdIndex = 0;
    cmds.forEach(function (v) {
      v.reset && v.reset();
    });
    isPaused = false;
    isStepping = false;
    timeoutID !== 0 && window.clearTimeout(timeoutID);
  };
  this.setDefaultMs = function (newMs) {
    defaultms = newMs;
  };
  this.start = function (newCmds, newMs) {
    if (!isStepping) {
      if (newCmds) {
        cmds = newCmds;
      }
      if (newMs) {
        defaultms = newMs;
      }
      this.reset();
      isStepping = true;
      boundStep();
    }
  };
  this.stop = function () {
    isStepping === true && this.reset();
  };
}
