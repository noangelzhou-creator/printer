var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// node_modules/unenv/dist/runtime/_internal/utils.mjs
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError, "createNotImplementedError");
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
__name(notImplemented, "notImplemented");
// @__NO_SIDE_EFFECTS__
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
__name(notImplementedClass, "notImplementedClass");

// node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
var nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
var PerformanceEntry = class {
  static {
    __name(this, "PerformanceEntry");
  }
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
var PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
  static {
    __name(this, "PerformanceMark");
  }
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
var PerformanceMeasure = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceMeasure");
  }
  entryType = "measure";
};
var PerformanceResourceTiming = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceResourceTiming");
  }
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
var PerformanceObserverEntryList = class {
  static {
    __name(this, "PerformanceObserverEntryList");
  }
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
var Performance = class {
  static {
    __name(this, "Performance");
  }
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw createNotImplementedError("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw createNotImplementedError("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
var PerformanceObserver = class {
  static {
    __name(this, "PerformanceObserver");
  }
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw createNotImplementedError("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw createNotImplementedError("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
var performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();

// node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;

// node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";

// node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default = Object.assign(() => {
}, { __unenv__: true });

// node_modules/unenv/dist/runtime/node/console.mjs
var _console = globalThis.console;
var _ignoreErrors = true;
var _stderr = new Writable();
var _stdout = new Writable();
var log = _console?.log ?? noop_default;
var info = _console?.info ?? log;
var trace = _console?.trace ?? info;
var debug = _console?.debug ?? log;
var table = _console?.table ?? log;
var error = _console?.error ?? log;
var warn = _console?.warn ?? error;
var createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
var clear = _console?.clear ?? noop_default;
var count = _console?.count ?? noop_default;
var countReset = _console?.countReset ?? noop_default;
var dir = _console?.dir ?? noop_default;
var dirxml = _console?.dirxml ?? noop_default;
var group = _console?.group ?? noop_default;
var groupEnd = _console?.groupEnd ?? noop_default;
var groupCollapsed = _console?.groupCollapsed ?? noop_default;
var profile = _console?.profile ?? noop_default;
var profileEnd = _console?.profileEnd ?? noop_default;
var time = _console?.time ?? noop_default;
var timeEnd = _console?.timeEnd ?? noop_default;
var timeLog = _console?.timeLog ?? noop_default;
var timeStamp = _console?.timeStamp ?? noop_default;
var Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
var _times = /* @__PURE__ */ new Map();
var _stdoutErrorHandler = noop_default;
var _stderrErrorHandler = noop_default;

// node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole = globalThis["console"];
var {
  assert,
  clear: clear2,
  // @ts-expect-error undocumented public API
  context,
  count: count2,
  countReset: countReset2,
  // @ts-expect-error undocumented public API
  createTask: createTask2,
  debug: debug2,
  dir: dir2,
  dirxml: dirxml2,
  error: error2,
  group: group2,
  groupCollapsed: groupCollapsed2,
  groupEnd: groupEnd2,
  info: info2,
  log: log2,
  profile: profile2,
  profileEnd: profileEnd2,
  table: table2,
  time: time2,
  timeEnd: timeEnd2,
  timeLog: timeLog2,
  timeStamp: timeStamp2,
  trace: trace2,
  warn: warn2
} = workerdConsole;
Object.assign(workerdConsole, {
  Console,
  _ignoreErrors,
  _stderr,
  _stderrErrorHandler,
  _stdout,
  _stdoutErrorHandler,
  _times
});
var console_default = workerdConsole;

// node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
globalThis.console = console_default;

// node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
  return BigInt(Date.now() * 1e6);
}, "bigint") });

// node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";

// node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
var ReadStream = class {
  static {
    __name(this, "ReadStream");
  }
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
};

// node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
var WriteStream = class {
  static {
    __name(this, "WriteStream");
  }
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir4, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x, y, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env3) {
    return 1;
  }
  hasColors(count4, env3) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
};

// node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs
var NODE_VERSION = "22.14.0";

// node_modules/unenv/dist/runtime/node/internal/process/process.mjs
var Process = class _Process2 extends EventEmitter {
  static {
    __name(this, "Process");
  }
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(_Process2.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  // --- event emitter ---
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  // --- stdio (lazy initializers) ---
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream(2);
  }
  // --- cwd ---
  #cwd = "/";
  chdir(cwd3) {
    this.#cwd = cwd3;
  }
  cwd() {
    return this.#cwd;
  }
  // --- dummy props and getters ---
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION}`;
  }
  get versions() {
    return { node: NODE_VERSION };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  // --- noop methods ---
  ref() {
  }
  unref() {
  }
  // --- unimplemented methods ---
  umask() {
    throw createNotImplementedError("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw createNotImplementedError("process.getActiveResourcesInfo");
  }
  exit() {
    throw createNotImplementedError("process.exit");
  }
  reallyExit() {
    throw createNotImplementedError("process.reallyExit");
  }
  kill() {
    throw createNotImplementedError("process.kill");
  }
  abort() {
    throw createNotImplementedError("process.abort");
  }
  dlopen() {
    throw createNotImplementedError("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw createNotImplementedError("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw createNotImplementedError("process.loadEnvFile");
  }
  disconnect() {
    throw createNotImplementedError("process.disconnect");
  }
  cpuUsage() {
    throw createNotImplementedError("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw createNotImplementedError("process.initgroups");
  }
  openStdin() {
    throw createNotImplementedError("process.openStdin");
  }
  assert() {
    throw createNotImplementedError("process.assert");
  }
  binding() {
    throw createNotImplementedError("process.binding");
  }
  // --- attached interfaces ---
  permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: /* @__PURE__ */ __name(() => 0, "rss") });
  // --- undefined props ---
  mainModule = void 0;
  domain = void 0;
  // optional
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  // internals
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};

// node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess = globalThis["process"];
var getBuiltinModule = globalProcess.getBuiltinModule;
var workerdProcess = getBuiltinModule("node:process");
var isWorkerdProcessV2 = globalThis.Cloudflare.compatibilityFlags.enable_nodejs_process_v2;
var unenvProcess = new Process({
  env: globalProcess.env,
  // `hrtime` is only available from workerd process v2
  hrtime: isWorkerdProcessV2 ? workerdProcess.hrtime : hrtime,
  // `nextTick` is available from workerd process v1
  nextTick: workerdProcess.nextTick
});
var { exit, features, platform } = workerdProcess;
var {
  // Always implemented by workerd
  env,
  // Only implemented in workerd v2
  hrtime: hrtime3,
  // Always implemented by workerd
  nextTick
} = unenvProcess;
var {
  _channel,
  _disconnect,
  _events,
  _eventsCount,
  _handleQueue,
  _maxListeners,
  _pendingMessage,
  _send,
  assert: assert2,
  disconnect,
  mainModule
} = unenvProcess;
var {
  // @ts-expect-error `_debugEnd` is missing typings
  _debugEnd,
  // @ts-expect-error `_debugProcess` is missing typings
  _debugProcess,
  // @ts-expect-error `_exiting` is missing typings
  _exiting,
  // @ts-expect-error `_fatalException` is missing typings
  _fatalException,
  // @ts-expect-error `_getActiveHandles` is missing typings
  _getActiveHandles,
  // @ts-expect-error `_getActiveRequests` is missing typings
  _getActiveRequests,
  // @ts-expect-error `_kill` is missing typings
  _kill,
  // @ts-expect-error `_linkedBinding` is missing typings
  _linkedBinding,
  // @ts-expect-error `_preload_modules` is missing typings
  _preload_modules,
  // @ts-expect-error `_rawDebug` is missing typings
  _rawDebug,
  // @ts-expect-error `_startProfilerIdleNotifier` is missing typings
  _startProfilerIdleNotifier,
  // @ts-expect-error `_stopProfilerIdleNotifier` is missing typings
  _stopProfilerIdleNotifier,
  // @ts-expect-error `_tickCallback` is missing typings
  _tickCallback,
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  arch,
  argv,
  argv0,
  availableMemory,
  // @ts-expect-error `binding` is missing typings
  binding,
  channel,
  chdir,
  config,
  connected,
  constrainedMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  // @ts-expect-error `domain` is missing typings
  domain,
  emit,
  emitWarning,
  eventNames,
  execArgv,
  execPath,
  exitCode,
  finalization,
  getActiveResourcesInfo,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getMaxListeners,
  getuid,
  hasUncaughtExceptionCaptureCallback,
  // @ts-expect-error `initgroups` is missing typings
  initgroups,
  kill,
  listenerCount,
  listeners,
  loadEnvFile,
  memoryUsage,
  // @ts-expect-error `moduleLoadList` is missing typings
  moduleLoadList,
  off,
  on,
  once,
  // @ts-expect-error `openStdin` is missing typings
  openStdin,
  permission,
  pid,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  // @ts-expect-error `reallyExit` is missing typings
  reallyExit,
  ref,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  send,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setMaxListeners,
  setSourceMapsEnabled,
  setuid,
  setUncaughtExceptionCaptureCallback,
  sourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  throwDeprecation,
  title,
  traceDeprecation,
  umask,
  unref,
  uptime,
  version,
  versions
} = isWorkerdProcessV2 ? workerdProcess : unenvProcess;
var _process = {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  // @ts-expect-error old API
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
};
var process_default = _process;

// node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
globalThis.process = process_default;

// .wrangler/tmp/pages-jRb52i/bundledWorker-0.23351498155259787.mjs
import { Writable as Writable2 } from "node:stream";
import { EventEmitter as EventEmitter2 } from "node:events";
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
// @__NO_SIDE_EFFECTS__
function createNotImplementedError2(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError2, "createNotImplementedError");
__name2(createNotImplementedError2, "createNotImplementedError");
// @__NO_SIDE_EFFECTS__
function notImplemented2(name) {
  const fn = /* @__PURE__ */ __name2(() => {
    throw /* @__PURE__ */ createNotImplementedError2(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
__name(notImplemented2, "notImplemented");
__name2(notImplemented2, "notImplemented");
// @__NO_SIDE_EFFECTS__
function notImplementedClass2(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
__name(notImplementedClass2, "notImplementedClass");
__name2(notImplementedClass2, "notImplementedClass");
var _timeOrigin2 = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow2 = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin2;
var nodeTiming2 = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
var PerformanceEntry2 = class {
  static {
    __name(this, "PerformanceEntry");
  }
  static {
    __name2(this, "PerformanceEntry");
  }
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow2();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow2() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
var PerformanceMark3 = class PerformanceMark22 extends PerformanceEntry2 {
  static {
    __name(this, "PerformanceMark2");
  }
  static {
    __name2(this, "PerformanceMark");
  }
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
var PerformanceMeasure2 = class extends PerformanceEntry2 {
  static {
    __name(this, "PerformanceMeasure");
  }
  static {
    __name2(this, "PerformanceMeasure");
  }
  entryType = "measure";
};
var PerformanceResourceTiming2 = class extends PerformanceEntry2 {
  static {
    __name(this, "PerformanceResourceTiming");
  }
  static {
    __name2(this, "PerformanceResourceTiming");
  }
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
var PerformanceObserverEntryList2 = class {
  static {
    __name(this, "PerformanceObserverEntryList");
  }
  static {
    __name2(this, "PerformanceObserverEntryList");
  }
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
var Performance2 = class {
  static {
    __name(this, "Performance");
  }
  static {
    __name2(this, "Performance");
  }
  __unenv__ = true;
  timeOrigin = _timeOrigin2;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw /* @__PURE__ */ createNotImplementedError2("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming2;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming2("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin2) {
      return _performanceNow2();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark3(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure2(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw /* @__PURE__ */ createNotImplementedError2("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw /* @__PURE__ */ createNotImplementedError2("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw /* @__PURE__ */ createNotImplementedError2("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
var PerformanceObserver2 = class {
  static {
    __name(this, "PerformanceObserver");
  }
  static {
    __name2(this, "PerformanceObserver");
  }
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw /* @__PURE__ */ createNotImplementedError2("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw /* @__PURE__ */ createNotImplementedError2("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
var performance2 = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance2();
globalThis.performance = performance2;
globalThis.Performance = Performance2;
globalThis.PerformanceEntry = PerformanceEntry2;
globalThis.PerformanceMark = PerformanceMark3;
globalThis.PerformanceMeasure = PerformanceMeasure2;
globalThis.PerformanceObserver = PerformanceObserver2;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList2;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming2;
var noop_default2 = Object.assign(() => {
}, { __unenv__: true });
var _console2 = globalThis.console;
var _ignoreErrors2 = true;
var _stderr2 = new Writable2();
var _stdout2 = new Writable2();
var log3 = _console2?.log ?? noop_default2;
var info3 = _console2?.info ?? log3;
var trace3 = _console2?.trace ?? info3;
var debug3 = _console2?.debug ?? log3;
var table3 = _console2?.table ?? log3;
var error3 = _console2?.error ?? log3;
var warn3 = _console2?.warn ?? error3;
var createTask3 = _console2?.createTask ?? /* @__PURE__ */ notImplemented2("console.createTask");
var clear3 = _console2?.clear ?? noop_default2;
var count3 = _console2?.count ?? noop_default2;
var countReset3 = _console2?.countReset ?? noop_default2;
var dir3 = _console2?.dir ?? noop_default2;
var dirxml3 = _console2?.dirxml ?? noop_default2;
var group3 = _console2?.group ?? noop_default2;
var groupEnd3 = _console2?.groupEnd ?? noop_default2;
var groupCollapsed3 = _console2?.groupCollapsed ?? noop_default2;
var profile3 = _console2?.profile ?? noop_default2;
var profileEnd3 = _console2?.profileEnd ?? noop_default2;
var time3 = _console2?.time ?? noop_default2;
var timeEnd3 = _console2?.timeEnd ?? noop_default2;
var timeLog3 = _console2?.timeLog ?? noop_default2;
var timeStamp3 = _console2?.timeStamp ?? noop_default2;
var Console2 = _console2?.Console ?? /* @__PURE__ */ notImplementedClass2("console.Console");
var _times2 = /* @__PURE__ */ new Map();
var _stdoutErrorHandler2 = noop_default2;
var _stderrErrorHandler2 = noop_default2;
var workerdConsole2 = globalThis["console"];
var {
  assert: assert3,
  clear: clear22,
  // @ts-expect-error undocumented public API
  context: context2,
  count: count22,
  countReset: countReset22,
  // @ts-expect-error undocumented public API
  createTask: createTask22,
  debug: debug22,
  dir: dir22,
  dirxml: dirxml22,
  error: error22,
  group: group22,
  groupCollapsed: groupCollapsed22,
  groupEnd: groupEnd22,
  info: info22,
  log: log22,
  profile: profile22,
  profileEnd: profileEnd22,
  table: table22,
  time: time22,
  timeEnd: timeEnd22,
  timeLog: timeLog22,
  timeStamp: timeStamp22,
  trace: trace22,
  warn: warn22
} = workerdConsole2;
Object.assign(workerdConsole2, {
  Console: Console2,
  _ignoreErrors: _ignoreErrors2,
  _stderr: _stderr2,
  _stderrErrorHandler: _stderrErrorHandler2,
  _stdout: _stdout2,
  _stdoutErrorHandler: _stdoutErrorHandler2,
  _times: _times2
});
var console_default2 = workerdConsole2;
globalThis.console = console_default2;
var hrtime4 = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name2(/* @__PURE__ */ __name(function hrtime22(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, "hrtime2"), "hrtime"), { bigint: /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function bigint2() {
  return BigInt(Date.now() * 1e6);
}, "bigint"), "bigint") });
var ReadStream2 = class {
  static {
    __name(this, "ReadStream");
  }
  static {
    __name2(this, "ReadStream");
  }
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
};
var WriteStream2 = class {
  static {
    __name(this, "WriteStream");
  }
  static {
    __name2(this, "WriteStream");
  }
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir32, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x, y, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env22) {
    return 1;
  }
  hasColors(count32, env22) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
};
var NODE_VERSION2 = "22.14.0";
var Process2 = class _Process extends EventEmitter2 {
  static {
    __name(this, "_Process");
  }
  static {
    __name2(this, "Process");
  }
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(EventEmitter2.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  // --- event emitter ---
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  // --- stdio (lazy initializers) ---
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream2(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream2(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream2(2);
  }
  // --- cwd ---
  #cwd = "/";
  chdir(cwd22) {
    this.#cwd = cwd22;
  }
  cwd() {
    return this.#cwd;
  }
  // --- dummy props and getters ---
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION2}`;
  }
  get versions() {
    return { node: NODE_VERSION2 };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  // --- noop methods ---
  ref() {
  }
  unref() {
  }
  // --- unimplemented methods ---
  umask() {
    throw /* @__PURE__ */ createNotImplementedError2("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw /* @__PURE__ */ createNotImplementedError2("process.getActiveResourcesInfo");
  }
  exit() {
    throw /* @__PURE__ */ createNotImplementedError2("process.exit");
  }
  reallyExit() {
    throw /* @__PURE__ */ createNotImplementedError2("process.reallyExit");
  }
  kill() {
    throw /* @__PURE__ */ createNotImplementedError2("process.kill");
  }
  abort() {
    throw /* @__PURE__ */ createNotImplementedError2("process.abort");
  }
  dlopen() {
    throw /* @__PURE__ */ createNotImplementedError2("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw /* @__PURE__ */ createNotImplementedError2("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw /* @__PURE__ */ createNotImplementedError2("process.loadEnvFile");
  }
  disconnect() {
    throw /* @__PURE__ */ createNotImplementedError2("process.disconnect");
  }
  cpuUsage() {
    throw /* @__PURE__ */ createNotImplementedError2("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw /* @__PURE__ */ createNotImplementedError2("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw /* @__PURE__ */ createNotImplementedError2("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw /* @__PURE__ */ createNotImplementedError2("process.initgroups");
  }
  openStdin() {
    throw /* @__PURE__ */ createNotImplementedError2("process.openStdin");
  }
  assert() {
    throw /* @__PURE__ */ createNotImplementedError2("process.assert");
  }
  binding() {
    throw /* @__PURE__ */ createNotImplementedError2("process.binding");
  }
  // --- attached interfaces ---
  permission = { has: /* @__PURE__ */ notImplemented2("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented2("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented2("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented2("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented2("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented2("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: /* @__PURE__ */ __name2(() => 0, "rss") });
  // --- undefined props ---
  mainModule = void 0;
  domain = void 0;
  // optional
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  // internals
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};
var globalProcess2 = globalThis["process"];
var getBuiltinModule2 = globalProcess2.getBuiltinModule;
var workerdProcess2 = getBuiltinModule2("node:process");
var isWorkerdProcessV22 = globalThis.Cloudflare.compatibilityFlags.enable_nodejs_process_v2;
var unenvProcess2 = new Process2({
  env: globalProcess2.env,
  // `hrtime` is only available from workerd process v2
  hrtime: isWorkerdProcessV22 ? workerdProcess2.hrtime : hrtime4,
  // `nextTick` is available from workerd process v1
  nextTick: workerdProcess2.nextTick
});
var { exit: exit2, features: features2, platform: platform2 } = workerdProcess2;
var {
  // Always implemented by workerd
  env: env2,
  // Only implemented in workerd v2
  hrtime: hrtime32,
  // Always implemented by workerd
  nextTick: nextTick2
} = unenvProcess2;
var {
  _channel: _channel2,
  _disconnect: _disconnect2,
  _events: _events2,
  _eventsCount: _eventsCount2,
  _handleQueue: _handleQueue2,
  _maxListeners: _maxListeners2,
  _pendingMessage: _pendingMessage2,
  _send: _send2,
  assert: assert22,
  disconnect: disconnect2,
  mainModule: mainModule2
} = unenvProcess2;
var {
  // @ts-expect-error `_debugEnd` is missing typings
  _debugEnd: _debugEnd2,
  // @ts-expect-error `_debugProcess` is missing typings
  _debugProcess: _debugProcess2,
  // @ts-expect-error `_exiting` is missing typings
  _exiting: _exiting2,
  // @ts-expect-error `_fatalException` is missing typings
  _fatalException: _fatalException2,
  // @ts-expect-error `_getActiveHandles` is missing typings
  _getActiveHandles: _getActiveHandles2,
  // @ts-expect-error `_getActiveRequests` is missing typings
  _getActiveRequests: _getActiveRequests2,
  // @ts-expect-error `_kill` is missing typings
  _kill: _kill2,
  // @ts-expect-error `_linkedBinding` is missing typings
  _linkedBinding: _linkedBinding2,
  // @ts-expect-error `_preload_modules` is missing typings
  _preload_modules: _preload_modules2,
  // @ts-expect-error `_rawDebug` is missing typings
  _rawDebug: _rawDebug2,
  // @ts-expect-error `_startProfilerIdleNotifier` is missing typings
  _startProfilerIdleNotifier: _startProfilerIdleNotifier2,
  // @ts-expect-error `_stopProfilerIdleNotifier` is missing typings
  _stopProfilerIdleNotifier: _stopProfilerIdleNotifier2,
  // @ts-expect-error `_tickCallback` is missing typings
  _tickCallback: _tickCallback2,
  abort: abort2,
  addListener: addListener2,
  allowedNodeEnvironmentFlags: allowedNodeEnvironmentFlags2,
  arch: arch2,
  argv: argv2,
  argv0: argv02,
  availableMemory: availableMemory2,
  // @ts-expect-error `binding` is missing typings
  binding: binding2,
  channel: channel2,
  chdir: chdir2,
  config: config2,
  connected: connected2,
  constrainedMemory: constrainedMemory2,
  cpuUsage: cpuUsage2,
  cwd: cwd2,
  debugPort: debugPort2,
  dlopen: dlopen2,
  // @ts-expect-error `domain` is missing typings
  domain: domain2,
  emit: emit2,
  emitWarning: emitWarning2,
  eventNames: eventNames2,
  execArgv: execArgv2,
  execPath: execPath2,
  exitCode: exitCode2,
  finalization: finalization2,
  getActiveResourcesInfo: getActiveResourcesInfo2,
  getegid: getegid2,
  geteuid: geteuid2,
  getgid: getgid2,
  getgroups: getgroups2,
  getMaxListeners: getMaxListeners2,
  getuid: getuid2,
  hasUncaughtExceptionCaptureCallback: hasUncaughtExceptionCaptureCallback2,
  // @ts-expect-error `initgroups` is missing typings
  initgroups: initgroups2,
  kill: kill2,
  listenerCount: listenerCount2,
  listeners: listeners2,
  loadEnvFile: loadEnvFile2,
  memoryUsage: memoryUsage2,
  // @ts-expect-error `moduleLoadList` is missing typings
  moduleLoadList: moduleLoadList2,
  off: off2,
  on: on2,
  once: once2,
  // @ts-expect-error `openStdin` is missing typings
  openStdin: openStdin2,
  permission: permission2,
  pid: pid2,
  ppid: ppid2,
  prependListener: prependListener2,
  prependOnceListener: prependOnceListener2,
  rawListeners: rawListeners2,
  // @ts-expect-error `reallyExit` is missing typings
  reallyExit: reallyExit2,
  ref: ref2,
  release: release2,
  removeAllListeners: removeAllListeners2,
  removeListener: removeListener2,
  report: report2,
  resourceUsage: resourceUsage2,
  send: send2,
  setegid: setegid2,
  seteuid: seteuid2,
  setgid: setgid2,
  setgroups: setgroups2,
  setMaxListeners: setMaxListeners2,
  setSourceMapsEnabled: setSourceMapsEnabled2,
  setuid: setuid2,
  setUncaughtExceptionCaptureCallback: setUncaughtExceptionCaptureCallback2,
  sourceMapsEnabled: sourceMapsEnabled2,
  stderr: stderr2,
  stdin: stdin2,
  stdout: stdout2,
  throwDeprecation: throwDeprecation2,
  title: title2,
  traceDeprecation: traceDeprecation2,
  umask: umask2,
  unref: unref2,
  uptime: uptime2,
  version: version2,
  versions: versions2
} = isWorkerdProcessV22 ? workerdProcess2 : unenvProcess2;
var _process2 = {
  abort: abort2,
  addListener: addListener2,
  allowedNodeEnvironmentFlags: allowedNodeEnvironmentFlags2,
  hasUncaughtExceptionCaptureCallback: hasUncaughtExceptionCaptureCallback2,
  setUncaughtExceptionCaptureCallback: setUncaughtExceptionCaptureCallback2,
  loadEnvFile: loadEnvFile2,
  sourceMapsEnabled: sourceMapsEnabled2,
  arch: arch2,
  argv: argv2,
  argv0: argv02,
  chdir: chdir2,
  config: config2,
  connected: connected2,
  constrainedMemory: constrainedMemory2,
  availableMemory: availableMemory2,
  cpuUsage: cpuUsage2,
  cwd: cwd2,
  debugPort: debugPort2,
  dlopen: dlopen2,
  disconnect: disconnect2,
  emit: emit2,
  emitWarning: emitWarning2,
  env: env2,
  eventNames: eventNames2,
  execArgv: execArgv2,
  execPath: execPath2,
  exit: exit2,
  finalization: finalization2,
  features: features2,
  getBuiltinModule: getBuiltinModule2,
  getActiveResourcesInfo: getActiveResourcesInfo2,
  getMaxListeners: getMaxListeners2,
  hrtime: hrtime32,
  kill: kill2,
  listeners: listeners2,
  listenerCount: listenerCount2,
  memoryUsage: memoryUsage2,
  nextTick: nextTick2,
  on: on2,
  off: off2,
  once: once2,
  pid: pid2,
  platform: platform2,
  ppid: ppid2,
  prependListener: prependListener2,
  prependOnceListener: prependOnceListener2,
  rawListeners: rawListeners2,
  release: release2,
  removeAllListeners: removeAllListeners2,
  removeListener: removeListener2,
  report: report2,
  resourceUsage: resourceUsage2,
  setMaxListeners: setMaxListeners2,
  setSourceMapsEnabled: setSourceMapsEnabled2,
  stderr: stderr2,
  stdin: stdin2,
  stdout: stdout2,
  title: title2,
  throwDeprecation: throwDeprecation2,
  traceDeprecation: traceDeprecation2,
  umask: umask2,
  uptime: uptime2,
  version: version2,
  versions: versions2,
  // @ts-expect-error old API
  domain: domain2,
  initgroups: initgroups2,
  moduleLoadList: moduleLoadList2,
  reallyExit: reallyExit2,
  openStdin: openStdin2,
  assert: assert22,
  binding: binding2,
  send: send2,
  exitCode: exitCode2,
  channel: channel2,
  getegid: getegid2,
  geteuid: geteuid2,
  getgid: getgid2,
  getgroups: getgroups2,
  getuid: getuid2,
  setegid: setegid2,
  seteuid: seteuid2,
  setgid: setgid2,
  setgroups: setgroups2,
  setuid: setuid2,
  permission: permission2,
  mainModule: mainModule2,
  _events: _events2,
  _eventsCount: _eventsCount2,
  _exiting: _exiting2,
  _maxListeners: _maxListeners2,
  _debugEnd: _debugEnd2,
  _debugProcess: _debugProcess2,
  _fatalException: _fatalException2,
  _getActiveHandles: _getActiveHandles2,
  _getActiveRequests: _getActiveRequests2,
  _kill: _kill2,
  _preload_modules: _preload_modules2,
  _rawDebug: _rawDebug2,
  _startProfilerIdleNotifier: _startProfilerIdleNotifier2,
  _stopProfilerIdleNotifier: _stopProfilerIdleNotifier2,
  _tickCallback: _tickCallback2,
  _disconnect: _disconnect2,
  _handleQueue: _handleQueue2,
  _pendingMessage: _pendingMessage2,
  _channel: _channel2,
  _send: _send2,
  _linkedBinding: _linkedBinding2
};
var process_default2 = _process2;
globalThis.process = process_default2;
var yt = Object.defineProperty;
var qe = /* @__PURE__ */ __name2((e) => {
  throw TypeError(e);
}, "qe");
var xt = /* @__PURE__ */ __name2((e, t, r) => t in e ? yt(e, t, { enumerable: true, configurable: true, writable: true, value: r }) : e[t] = r, "xt");
var f = /* @__PURE__ */ __name2((e, t, r) => xt(e, typeof t != "symbol" ? t + "" : t, r), "f");
var Ce = /* @__PURE__ */ __name2((e, t, r) => t.has(e) || qe("Cannot " + r), "Ce");
var c = /* @__PURE__ */ __name2((e, t, r) => (Ce(e, t, "read from private field"), r ? r.call(e) : t.get(e)), "c");
var g = /* @__PURE__ */ __name2((e, t, r) => t.has(e) ? qe("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), "g");
var p = /* @__PURE__ */ __name2((e, t, r, s) => (Ce(e, t, "write to private field"), s ? s.call(e, r) : t.set(e, r), r), "p");
var E = /* @__PURE__ */ __name2((e, t, r) => (Ce(e, t, "access private method"), r), "E");
var Le = /* @__PURE__ */ __name2((e, t, r, s) => ({ set _(n) {
  p(e, t, n, r);
}, get _() {
  return c(e, t, s);
} }), "Le");
var Fe = /* @__PURE__ */ __name2((e, t, r) => (s, n) => {
  let i = -1;
  return a(0);
  async function a(l) {
    if (l <= i) throw new Error("next() called multiple times");
    i = l;
    let o, d = false, h;
    if (e[l] ? (h = e[l][0][0], s.req.routeIndex = l) : h = l === e.length && n || void 0, h) try {
      o = await h(s, () => a(l + 1));
    } catch (u) {
      if (u instanceof Error && t) s.error = u, o = await t(u, s), d = true;
      else throw u;
    }
    else s.finalized === false && r && (o = await r(s));
    return o && (s.finalized === false || d) && (s.res = o), s;
  }
  __name(a, "a");
  __name2(a, "a");
}, "Fe");
var bt = Symbol();
var Rt = /* @__PURE__ */ __name2(async (e, t = /* @__PURE__ */ Object.create(null)) => {
  const { all: r = false, dot: s = false } = t, i = (e instanceof nt ? e.raw.headers : e.headers).get("Content-Type");
  return i != null && i.startsWith("multipart/form-data") || i != null && i.startsWith("application/x-www-form-urlencoded") ? _t(e, { all: r, dot: s }) : {};
}, "Rt");
async function _t(e, t) {
  const r = await e.formData();
  return r ? jt(r, t) : {};
}
__name(_t, "_t");
__name2(_t, "_t");
function jt(e, t) {
  const r = /* @__PURE__ */ Object.create(null);
  return e.forEach((s, n) => {
    t.all || n.endsWith("[]") ? Ot(r, n, s) : r[n] = s;
  }), t.dot && Object.entries(r).forEach(([s, n]) => {
    s.includes(".") && (Tt(r, s, n), delete r[s]);
  }), r;
}
__name(jt, "jt");
__name2(jt, "jt");
var Ot = /* @__PURE__ */ __name2((e, t, r) => {
  e[t] !== void 0 ? Array.isArray(e[t]) ? e[t].push(r) : e[t] = [e[t], r] : t.endsWith("[]") ? e[t] = [r] : e[t] = r;
}, "Ot");
var Tt = /* @__PURE__ */ __name2((e, t, r) => {
  let s = e;
  const n = t.split(".");
  n.forEach((i, a) => {
    a === n.length - 1 ? s[i] = r : ((!s[i] || typeof s[i] != "object" || Array.isArray(s[i]) || s[i] instanceof File) && (s[i] = /* @__PURE__ */ Object.create(null)), s = s[i]);
  });
}, "Tt");
var Ze = /* @__PURE__ */ __name2((e) => {
  const t = e.split("/");
  return t[0] === "" && t.shift(), t;
}, "Ze");
var St = /* @__PURE__ */ __name2((e) => {
  const { groups: t, path: r } = At(e), s = Ze(r);
  return Ct(s, t);
}, "St");
var At = /* @__PURE__ */ __name2((e) => {
  const t = [];
  return e = e.replace(/\{[^}]+\}/g, (r, s) => {
    const n = `@${s}`;
    return t.push([n, r]), n;
  }), { groups: t, path: e };
}, "At");
var Ct = /* @__PURE__ */ __name2((e, t) => {
  for (let r = t.length - 1; r >= 0; r--) {
    const [s] = t[r];
    for (let n = e.length - 1; n >= 0; n--) if (e[n].includes(s)) {
      e[n] = e[n].replace(s, t[r][1]);
      break;
    }
  }
  return e;
}, "Ct");
var xe = {};
var Dt = /* @__PURE__ */ __name2((e, t) => {
  if (e === "*") return "*";
  const r = e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (r) {
    const s = `${e}#${t}`;
    return xe[s] || (r[2] ? xe[s] = t && t[0] !== ":" && t[0] !== "*" ? [s, r[1], new RegExp(`^${r[2]}(?=/${t})`)] : [e, r[1], new RegExp(`^${r[2]}$`)] : xe[s] = [e, r[1], true]), xe[s];
  }
  return null;
}, "Dt");
var He = /* @__PURE__ */ __name2((e, t) => {
  try {
    return t(e);
  } catch {
    return e.replace(/(?:%[0-9A-Fa-f]{2})+/g, (r) => {
      try {
        return t(r);
      } catch {
        return r;
      }
    });
  }
}, "He");
var Pt = /* @__PURE__ */ __name2((e) => He(e, decodeURI), "Pt");
var et = /* @__PURE__ */ __name2((e) => {
  const t = e.url, r = t.indexOf("/", t.indexOf(":") + 4);
  let s = r;
  for (; s < t.length; s++) {
    const n = t.charCodeAt(s);
    if (n === 37) {
      const i = t.indexOf("?", s), a = t.slice(r, i === -1 ? void 0 : i);
      return Pt(a.includes("%25") ? a.replace(/%25/g, "%2525") : a);
    } else if (n === 63) break;
  }
  return t.slice(r, s);
}, "et");
var It = /* @__PURE__ */ __name2((e) => {
  const t = et(e);
  return t.length > 1 && t.at(-1) === "/" ? t.slice(0, -1) : t;
}, "It");
var re = /* @__PURE__ */ __name2((e, t, ...r) => (r.length && (t = re(t, ...r)), `${(e == null ? void 0 : e[0]) === "/" ? "" : "/"}${e}${t === "/" ? "" : `${(e == null ? void 0 : e.at(-1)) === "/" ? "" : "/"}${(t == null ? void 0 : t[0]) === "/" ? t.slice(1) : t}`}`), "re");
var tt = /* @__PURE__ */ __name2((e) => {
  if (e.charCodeAt(e.length - 1) !== 63 || !e.includes(":")) return null;
  const t = e.split("/"), r = [];
  let s = "";
  return t.forEach((n) => {
    if (n !== "" && !/\:/.test(n)) s += "/" + n;
    else if (/\:/.test(n)) if (/\?/.test(n)) {
      r.length === 0 && s === "" ? r.push("/") : r.push(s);
      const i = n.replace("?", "");
      s += "/" + i, r.push(s);
    } else s += "/" + n;
  }), r.filter((n, i, a) => a.indexOf(n) === i);
}, "tt");
var De = /* @__PURE__ */ __name2((e) => /[%+]/.test(e) ? (e.indexOf("+") !== -1 && (e = e.replace(/\+/g, " ")), e.indexOf("%") !== -1 ? He(e, st) : e) : e, "De");
var rt = /* @__PURE__ */ __name2((e, t, r) => {
  let s;
  if (!r && t && !/[%+]/.test(t)) {
    let a = e.indexOf(`?${t}`, 8);
    for (a === -1 && (a = e.indexOf(`&${t}`, 8)); a !== -1; ) {
      const l = e.charCodeAt(a + t.length + 1);
      if (l === 61) {
        const o = a + t.length + 2, d = e.indexOf("&", o);
        return De(e.slice(o, d === -1 ? void 0 : d));
      } else if (l == 38 || isNaN(l)) return "";
      a = e.indexOf(`&${t}`, a + 1);
    }
    if (s = /[%+]/.test(e), !s) return;
  }
  const n = {};
  s ?? (s = /[%+]/.test(e));
  let i = e.indexOf("?", 8);
  for (; i !== -1; ) {
    const a = e.indexOf("&", i + 1);
    let l = e.indexOf("=", i);
    l > a && a !== -1 && (l = -1);
    let o = e.slice(i + 1, l === -1 ? a === -1 ? void 0 : a : l);
    if (s && (o = De(o)), i = a, o === "") continue;
    let d;
    l === -1 ? d = "" : (d = e.slice(l + 1, a === -1 ? void 0 : a), s && (d = De(d))), r ? (n[o] && Array.isArray(n[o]) || (n[o] = []), n[o].push(d)) : n[o] ?? (n[o] = d);
  }
  return t ? n[t] : n;
}, "rt");
var Nt = rt;
var Ht = /* @__PURE__ */ __name2((e, t) => rt(e, t, true), "Ht");
var st = decodeURIComponent;
var $e = /* @__PURE__ */ __name2((e) => He(e, st), "$e");
var ie;
var A;
var F;
var it;
var at;
var Ie;
var B;
var ke;
var nt = (ke = class {
  static {
    __name(this, "ke");
  }
  static {
    __name2(this, "ke");
  }
  constructor(e, t = "/", r = [[]]) {
    g(this, F);
    f(this, "raw");
    g(this, ie);
    g(this, A);
    f(this, "routeIndex", 0);
    f(this, "path");
    f(this, "bodyCache", {});
    g(this, B, (e2) => {
      const { bodyCache: t2, raw: r2 } = this, s = t2[e2];
      if (s) return s;
      const n = Object.keys(t2)[0];
      return n ? t2[n].then((i) => (n === "json" && (i = JSON.stringify(i)), new Response(i)[e2]())) : t2[e2] = r2[e2]();
    });
    this.raw = e, this.path = t, p(this, A, r), p(this, ie, {});
  }
  param(e) {
    return e ? E(this, F, it).call(this, e) : E(this, F, at).call(this);
  }
  query(e) {
    return Nt(this.url, e);
  }
  queries(e) {
    return Ht(this.url, e);
  }
  header(e) {
    if (e) return this.raw.headers.get(e) ?? void 0;
    const t = {};
    return this.raw.headers.forEach((r, s) => {
      t[s] = r;
    }), t;
  }
  async parseBody(e) {
    var t;
    return (t = this.bodyCache).parsedBody ?? (t.parsedBody = await Rt(this, e));
  }
  json() {
    return c(this, B).call(this, "text").then((e) => JSON.parse(e));
  }
  text() {
    return c(this, B).call(this, "text");
  }
  arrayBuffer() {
    return c(this, B).call(this, "arrayBuffer");
  }
  blob() {
    return c(this, B).call(this, "blob");
  }
  formData() {
    return c(this, B).call(this, "formData");
  }
  addValidatedData(e, t) {
    c(this, ie)[e] = t;
  }
  valid(e) {
    return c(this, ie)[e];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get [bt]() {
    return c(this, A);
  }
  get matchedRoutes() {
    return c(this, A)[0].map(([[, e]]) => e);
  }
  get routePath() {
    return c(this, A)[0].map(([[, e]]) => e)[this.routeIndex].path;
  }
}, ie = /* @__PURE__ */ new WeakMap(), A = /* @__PURE__ */ new WeakMap(), F = /* @__PURE__ */ new WeakSet(), it = /* @__PURE__ */ __name2(function(e) {
  const t = c(this, A)[0][this.routeIndex][1][e], r = E(this, F, Ie).call(this, t);
  return r && /\%/.test(r) ? $e(r) : r;
}, "it"), at = /* @__PURE__ */ __name2(function() {
  const e = {}, t = Object.keys(c(this, A)[0][this.routeIndex][1]);
  for (const r of t) {
    const s = E(this, F, Ie).call(this, c(this, A)[0][this.routeIndex][1][r]);
    s !== void 0 && (e[r] = /\%/.test(s) ? $e(s) : s);
  }
  return e;
}, "at"), Ie = /* @__PURE__ */ __name2(function(e) {
  return c(this, A)[1] ? c(this, A)[1][e] : e;
}, "Ie"), B = /* @__PURE__ */ new WeakMap(), ke);
var Mt = { Stringify: 1 };
var ot = /* @__PURE__ */ __name2(async (e, t, r, s, n) => {
  typeof e == "object" && !(e instanceof String) && (e instanceof Promise || (e = e.toString()), e instanceof Promise && (e = await e));
  const i = e.callbacks;
  return i != null && i.length ? (n ? n[0] += e : n = [e], Promise.all(i.map((l) => l({ phase: t, buffer: n, context: s }))).then((l) => Promise.all(l.filter(Boolean).map((o) => ot(o, t, false, s, n))).then(() => n[0]))) : Promise.resolve(e);
}, "ot");
var qt = "text/plain; charset=UTF-8";
var Pe = /* @__PURE__ */ __name2((e, t) => ({ "Content-Type": e, ...t }), "Pe");
var me;
var ge;
var H;
var ae;
var M;
var T;
var Ee;
var oe;
var ce;
var Y;
var ve;
var we;
var U;
var se;
var ze;
var Lt = (ze = class {
  static {
    __name(this, "ze");
  }
  static {
    __name2(this, "ze");
  }
  constructor(e, t) {
    g(this, U);
    g(this, me);
    g(this, ge);
    f(this, "env", {});
    g(this, H);
    f(this, "finalized", false);
    f(this, "error");
    g(this, ae);
    g(this, M);
    g(this, T);
    g(this, Ee);
    g(this, oe);
    g(this, ce);
    g(this, Y);
    g(this, ve);
    g(this, we);
    f(this, "render", (...e2) => (c(this, oe) ?? p(this, oe, (t2) => this.html(t2)), c(this, oe).call(this, ...e2)));
    f(this, "setLayout", (e2) => p(this, Ee, e2));
    f(this, "getLayout", () => c(this, Ee));
    f(this, "setRenderer", (e2) => {
      p(this, oe, e2);
    });
    f(this, "header", (e2, t2, r) => {
      this.finalized && p(this, T, new Response(c(this, T).body, c(this, T)));
      const s = c(this, T) ? c(this, T).headers : c(this, Y) ?? p(this, Y, new Headers());
      t2 === void 0 ? s.delete(e2) : r != null && r.append ? s.append(e2, t2) : s.set(e2, t2);
    });
    f(this, "status", (e2) => {
      p(this, ae, e2);
    });
    f(this, "set", (e2, t2) => {
      c(this, H) ?? p(this, H, /* @__PURE__ */ new Map()), c(this, H).set(e2, t2);
    });
    f(this, "get", (e2) => c(this, H) ? c(this, H).get(e2) : void 0);
    f(this, "newResponse", (...e2) => E(this, U, se).call(this, ...e2));
    f(this, "body", (e2, t2, r) => E(this, U, se).call(this, e2, t2, r));
    f(this, "text", (e2, t2, r) => !c(this, Y) && !c(this, ae) && !t2 && !r && !this.finalized ? new Response(e2) : E(this, U, se).call(this, e2, t2, Pe(qt, r)));
    f(this, "json", (e2, t2, r) => E(this, U, se).call(this, JSON.stringify(e2), t2, Pe("application/json", r)));
    f(this, "html", (e2, t2, r) => {
      const s = /* @__PURE__ */ __name2((n) => E(this, U, se).call(this, n, t2, Pe("text/html; charset=UTF-8", r)), "s");
      return typeof e2 == "object" ? ot(e2, Mt.Stringify, false, {}).then(s) : s(e2);
    });
    f(this, "redirect", (e2, t2) => {
      const r = String(e2);
      return this.header("Location", /[^\x00-\xFF]/.test(r) ? encodeURI(r) : r), this.newResponse(null, t2 ?? 302);
    });
    f(this, "notFound", () => (c(this, ce) ?? p(this, ce, () => new Response()), c(this, ce).call(this, this)));
    p(this, me, e), t && (p(this, M, t.executionCtx), this.env = t.env, p(this, ce, t.notFoundHandler), p(this, we, t.path), p(this, ve, t.matchResult));
  }
  get req() {
    return c(this, ge) ?? p(this, ge, new nt(c(this, me), c(this, we), c(this, ve))), c(this, ge);
  }
  get event() {
    if (c(this, M) && "respondWith" in c(this, M)) return c(this, M);
    throw Error("This context has no FetchEvent");
  }
  get executionCtx() {
    if (c(this, M)) return c(this, M);
    throw Error("This context has no ExecutionContext");
  }
  get res() {
    return c(this, T) || p(this, T, new Response(null, { headers: c(this, Y) ?? p(this, Y, new Headers()) }));
  }
  set res(e) {
    if (c(this, T) && e) {
      e = new Response(e.body, e);
      for (const [t, r] of c(this, T).headers.entries()) if (t !== "content-type") if (t === "set-cookie") {
        const s = c(this, T).headers.getSetCookie();
        e.headers.delete("set-cookie");
        for (const n of s) e.headers.append("set-cookie", n);
      } else e.headers.set(t, r);
    }
    p(this, T, e), this.finalized = true;
  }
  get var() {
    return c(this, H) ? Object.fromEntries(c(this, H)) : {};
  }
}, me = /* @__PURE__ */ new WeakMap(), ge = /* @__PURE__ */ new WeakMap(), H = /* @__PURE__ */ new WeakMap(), ae = /* @__PURE__ */ new WeakMap(), M = /* @__PURE__ */ new WeakMap(), T = /* @__PURE__ */ new WeakMap(), Ee = /* @__PURE__ */ new WeakMap(), oe = /* @__PURE__ */ new WeakMap(), ce = /* @__PURE__ */ new WeakMap(), Y = /* @__PURE__ */ new WeakMap(), ve = /* @__PURE__ */ new WeakMap(), we = /* @__PURE__ */ new WeakMap(), U = /* @__PURE__ */ new WeakSet(), se = /* @__PURE__ */ __name2(function(e, t, r) {
  const s = c(this, T) ? new Headers(c(this, T).headers) : c(this, Y) ?? new Headers();
  if (typeof t == "object" && "headers" in t) {
    const i = t.headers instanceof Headers ? t.headers : new Headers(t.headers);
    for (const [a, l] of i) a.toLowerCase() === "set-cookie" ? s.append(a, l) : s.set(a, l);
  }
  if (r) for (const [i, a] of Object.entries(r)) if (typeof a == "string") s.set(i, a);
  else {
    s.delete(i);
    for (const l of a) s.append(i, l);
  }
  const n = typeof t == "number" ? t : (t == null ? void 0 : t.status) ?? c(this, ae);
  return new Response(e, { status: n, headers: s });
}, "se"), ze);
var b = "ALL";
var Ft = "all";
var $t = ["get", "post", "put", "delete", "options", "patch"];
var ct = "Can not add a route since the matcher is already built.";
var lt = class extends Error {
  static {
    __name(this, "lt");
  }
  static {
    __name2(this, "lt");
  }
};
var Bt = "__COMPOSED_HANDLER";
var Ut = /* @__PURE__ */ __name2((e) => e.text("404 Not Found", 404), "Ut");
var Be = /* @__PURE__ */ __name2((e, t) => {
  if ("getResponse" in e) {
    const r = e.getResponse();
    return t.newResponse(r.body, r);
  }
  return console.error(e), t.text("Internal Server Error", 500);
}, "Be");
var C;
var R;
var ht;
var D;
var K;
var be;
var Re;
var Ve;
var dt = (Ve = class {
  static {
    __name(this, "Ve");
  }
  static {
    __name2(this, "Ve");
  }
  constructor(t = {}) {
    g(this, R);
    f(this, "get");
    f(this, "post");
    f(this, "put");
    f(this, "delete");
    f(this, "options");
    f(this, "patch");
    f(this, "all");
    f(this, "on");
    f(this, "use");
    f(this, "router");
    f(this, "getPath");
    f(this, "_basePath", "/");
    g(this, C, "/");
    f(this, "routes", []);
    g(this, D, Ut);
    f(this, "errorHandler", Be);
    f(this, "onError", (t2) => (this.errorHandler = t2, this));
    f(this, "notFound", (t2) => (p(this, D, t2), this));
    f(this, "fetch", (t2, ...r) => E(this, R, Re).call(this, t2, r[1], r[0], t2.method));
    f(this, "request", (t2, r, s2, n2) => t2 instanceof Request ? this.fetch(r ? new Request(t2, r) : t2, s2, n2) : (t2 = t2.toString(), this.fetch(new Request(/^https?:\/\//.test(t2) ? t2 : `http://localhost${re("/", t2)}`, r), s2, n2)));
    f(this, "fire", () => {
      addEventListener("fetch", (t2) => {
        t2.respondWith(E(this, R, Re).call(this, t2.request, t2, void 0, t2.request.method));
      });
    });
    [...$t, Ft].forEach((i) => {
      this[i] = (a, ...l) => (typeof a == "string" ? p(this, C, a) : E(this, R, K).call(this, i, c(this, C), a), l.forEach((o) => {
        E(this, R, K).call(this, i, c(this, C), o);
      }), this);
    }), this.on = (i, a, ...l) => {
      for (const o of [a].flat()) {
        p(this, C, o);
        for (const d of [i].flat()) l.map((h) => {
          E(this, R, K).call(this, d.toUpperCase(), c(this, C), h);
        });
      }
      return this;
    }, this.use = (i, ...a) => (typeof i == "string" ? p(this, C, i) : (p(this, C, "*"), a.unshift(i)), a.forEach((l) => {
      E(this, R, K).call(this, b, c(this, C), l);
    }), this);
    const { strict: s, ...n } = t;
    Object.assign(this, n), this.getPath = s ?? true ? t.getPath ?? et : It;
  }
  route(t, r) {
    const s = this.basePath(t);
    return r.routes.map((n) => {
      var a;
      let i;
      r.errorHandler === Be ? i = n.handler : (i = /* @__PURE__ */ __name2(async (l, o) => (await Fe([], r.errorHandler)(l, () => n.handler(l, o))).res, "i"), i[Bt] = n.handler), E(a = s, R, K).call(a, n.method, n.path, i);
    }), this;
  }
  basePath(t) {
    const r = E(this, R, ht).call(this);
    return r._basePath = re(this._basePath, t), r;
  }
  mount(t, r, s) {
    let n, i;
    s && (typeof s == "function" ? i = s : (i = s.optionHandler, s.replaceRequest === false ? n = /* @__PURE__ */ __name2((o) => o, "n") : n = s.replaceRequest));
    const a = i ? (o) => {
      const d = i(o);
      return Array.isArray(d) ? d : [d];
    } : (o) => {
      let d;
      try {
        d = o.executionCtx;
      } catch {
      }
      return [o.env, d];
    };
    n || (n = (() => {
      const o = re(this._basePath, t), d = o === "/" ? 0 : o.length;
      return (h) => {
        const u = new URL(h.url);
        return u.pathname = u.pathname.slice(d) || "/", new Request(u, h);
      };
    })());
    const l = /* @__PURE__ */ __name2(async (o, d) => {
      const h = await r(n(o.req.raw), ...a(o));
      if (h) return h;
      await d();
    }, "l");
    return E(this, R, K).call(this, b, re(t, "*"), l), this;
  }
}, C = /* @__PURE__ */ new WeakMap(), R = /* @__PURE__ */ new WeakSet(), ht = /* @__PURE__ */ __name2(function() {
  const t = new dt({ router: this.router, getPath: this.getPath });
  return t.errorHandler = this.errorHandler, p(t, D, c(this, D)), t.routes = this.routes, t;
}, "ht"), D = /* @__PURE__ */ new WeakMap(), K = /* @__PURE__ */ __name2(function(t, r, s) {
  t = t.toUpperCase(), r = re(this._basePath, r);
  const n = { basePath: this._basePath, path: r, method: t, handler: s };
  this.router.add(t, r, [s, n]), this.routes.push(n);
}, "K"), be = /* @__PURE__ */ __name2(function(t, r) {
  if (t instanceof Error) return this.errorHandler(t, r);
  throw t;
}, "be"), Re = /* @__PURE__ */ __name2(function(t, r, s, n) {
  if (n === "HEAD") return (async () => new Response(null, await E(this, R, Re).call(this, t, r, s, "GET")))();
  const i = this.getPath(t, { env: s }), a = this.router.match(n, i), l = new Lt(t, { path: i, matchResult: a, env: s, executionCtx: r, notFoundHandler: c(this, D) });
  if (a[0].length === 1) {
    let d;
    try {
      d = a[0][0][0][0](l, async () => {
        l.res = await c(this, D).call(this, l);
      });
    } catch (h) {
      return E(this, R, be).call(this, h, l);
    }
    return d instanceof Promise ? d.then((h) => h || (l.finalized ? l.res : c(this, D).call(this, l))).catch((h) => E(this, R, be).call(this, h, l)) : d ?? c(this, D).call(this, l);
  }
  const o = Fe(a[0], this.errorHandler, c(this, D));
  return (async () => {
    try {
      const d = await o(l);
      if (!d.finalized) throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");
      return d.res;
    } catch (d) {
      return E(this, R, be).call(this, d, l);
    }
  })();
}, "Re"), Ve);
var ut = [];
function Wt(e, t) {
  const r = this.buildAllMatchers(), s = /* @__PURE__ */ __name2((n, i) => {
    const a = r[n] || r[b], l = a[2][i];
    if (l) return l;
    const o = i.match(a[0]);
    if (!o) return [[], ut];
    const d = o.indexOf("", 1);
    return [a[1][d], o];
  }, "s");
  return this.match = s, s(e, t);
}
__name(Wt, "Wt");
__name2(Wt, "Wt");
var je = "[^/]+";
var pe = ".*";
var fe = "(?:|/.*)";
var ne = Symbol();
var kt = new Set(".\\+*[^]$()");
function zt(e, t) {
  return e.length === 1 ? t.length === 1 ? e < t ? -1 : 1 : -1 : t.length === 1 || e === pe || e === fe ? 1 : t === pe || t === fe ? -1 : e === je ? 1 : t === je ? -1 : e.length === t.length ? e < t ? -1 : 1 : t.length - e.length;
}
__name(zt, "zt");
__name2(zt, "zt");
var J;
var X;
var P;
var Ke;
var Ne = (Ke = class {
  static {
    __name(this, "Ke");
  }
  static {
    __name2(this, "Ke");
  }
  constructor() {
    g(this, J);
    g(this, X);
    g(this, P, /* @__PURE__ */ Object.create(null));
  }
  insert(t, r, s, n, i) {
    if (t.length === 0) {
      if (c(this, J) !== void 0) throw ne;
      if (i) return;
      p(this, J, r);
      return;
    }
    const [a, ...l] = t, o = a === "*" ? l.length === 0 ? ["", "", pe] : ["", "", je] : a === "/*" ? ["", "", fe] : a.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let d;
    if (o) {
      const h = o[1];
      let u = o[2] || je;
      if (h && o[2] && (u === ".*" || (u = u.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:"), /\((?!\?:)/.test(u)))) throw ne;
      if (d = c(this, P)[u], !d) {
        if (Object.keys(c(this, P)).some((m) => m !== pe && m !== fe)) throw ne;
        if (i) return;
        d = c(this, P)[u] = new Ne(), h !== "" && p(d, X, n.varIndex++);
      }
      !i && h !== "" && s.push([h, c(d, X)]);
    } else if (d = c(this, P)[a], !d) {
      if (Object.keys(c(this, P)).some((h) => h.length > 1 && h !== pe && h !== fe)) throw ne;
      if (i) return;
      d = c(this, P)[a] = new Ne();
    }
    d.insert(l, r, s, n, i);
  }
  buildRegExpStr() {
    const r = Object.keys(c(this, P)).sort(zt).map((s) => {
      const n = c(this, P)[s];
      return (typeof c(n, X) == "number" ? `(${s})@${c(n, X)}` : kt.has(s) ? `\\${s}` : s) + n.buildRegExpStr();
    });
    return typeof c(this, J) == "number" && r.unshift(`#${c(this, J)}`), r.length === 0 ? "" : r.length === 1 ? r[0] : "(?:" + r.join("|") + ")";
  }
}, J = /* @__PURE__ */ new WeakMap(), X = /* @__PURE__ */ new WeakMap(), P = /* @__PURE__ */ new WeakMap(), Ke);
var Oe;
var ye;
var Ge;
var Vt = (Ge = class {
  static {
    __name(this, "Ge");
  }
  static {
    __name2(this, "Ge");
  }
  constructor() {
    g(this, Oe, { varIndex: 0 });
    g(this, ye, new Ne());
  }
  insert(e, t, r) {
    const s = [], n = [];
    for (let a = 0; ; ) {
      let l = false;
      if (e = e.replace(/\{[^}]+\}/g, (o) => {
        const d = `@\\${a}`;
        return n[a] = [d, o], a++, l = true, d;
      }), !l) break;
    }
    const i = e.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let a = n.length - 1; a >= 0; a--) {
      const [l] = n[a];
      for (let o = i.length - 1; o >= 0; o--) if (i[o].indexOf(l) !== -1) {
        i[o] = i[o].replace(l, n[a][1]);
        break;
      }
    }
    return c(this, ye).insert(i, t, s, c(this, Oe), r), s;
  }
  buildRegExp() {
    let e = c(this, ye).buildRegExpStr();
    if (e === "") return [/^$/, [], []];
    let t = 0;
    const r = [], s = [];
    return e = e.replace(/#(\d+)|@(\d+)|\.\*\$/g, (n, i, a) => i !== void 0 ? (r[++t] = Number(i), "$()") : (a !== void 0 && (s[Number(a)] = ++t), "")), [new RegExp(`^${e}`), r, s];
  }
}, Oe = /* @__PURE__ */ new WeakMap(), ye = /* @__PURE__ */ new WeakMap(), Ge);
var Kt = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var _e = /* @__PURE__ */ Object.create(null);
function pt(e) {
  return _e[e] ?? (_e[e] = new RegExp(e === "*" ? "" : `^${e.replace(/\/\*$|([.\\+*[^\]$()])/g, (t, r) => r ? `\\${r}` : "(?:|/.*)")}$`));
}
__name(pt, "pt");
__name2(pt, "pt");
function Gt() {
  _e = /* @__PURE__ */ Object.create(null);
}
__name(Gt, "Gt");
__name2(Gt, "Gt");
function Yt(e) {
  var d;
  const t = new Vt(), r = [];
  if (e.length === 0) return Kt;
  const s = e.map((h) => [!/\*|\/:/.test(h[0]), ...h]).sort(([h, u], [m, x]) => h ? 1 : m ? -1 : u.length - x.length), n = /* @__PURE__ */ Object.create(null);
  for (let h = 0, u = -1, m = s.length; h < m; h++) {
    const [x, S, v] = s[h];
    x ? n[S] = [v.map(([O]) => [O, /* @__PURE__ */ Object.create(null)]), ut] : u++;
    let y;
    try {
      y = t.insert(S, u, x);
    } catch (O) {
      throw O === ne ? new lt(S) : O;
    }
    x || (r[u] = v.map(([O, ee]) => {
      const de = /* @__PURE__ */ Object.create(null);
      for (ee -= 1; ee >= 0; ee--) {
        const [I, Se] = y[ee];
        de[I] = Se;
      }
      return [O, de];
    }));
  }
  const [i, a, l] = t.buildRegExp();
  for (let h = 0, u = r.length; h < u; h++) for (let m = 0, x = r[h].length; m < x; m++) {
    const S = (d = r[h][m]) == null ? void 0 : d[1];
    if (!S) continue;
    const v = Object.keys(S);
    for (let y = 0, O = v.length; y < O; y++) S[v[y]] = l[S[v[y]]];
  }
  const o = [];
  for (const h in a) o[h] = r[a[h]];
  return [i, o, n];
}
__name(Yt, "Yt");
__name2(Yt, "Yt");
function te(e, t) {
  if (e) {
    for (const r of Object.keys(e).sort((s, n) => n.length - s.length)) if (pt(r).test(t)) return [...e[r]];
  }
}
__name(te, "te");
__name2(te, "te");
var W;
var k;
var Te;
var ft;
var Ye;
var Jt = (Ye = class {
  static {
    __name(this, "Ye");
  }
  static {
    __name2(this, "Ye");
  }
  constructor() {
    g(this, Te);
    f(this, "name", "RegExpRouter");
    g(this, W);
    g(this, k);
    f(this, "match", Wt);
    p(this, W, { [b]: /* @__PURE__ */ Object.create(null) }), p(this, k, { [b]: /* @__PURE__ */ Object.create(null) });
  }
  add(e, t, r) {
    var l;
    const s = c(this, W), n = c(this, k);
    if (!s || !n) throw new Error(ct);
    s[e] || [s, n].forEach((o) => {
      o[e] = /* @__PURE__ */ Object.create(null), Object.keys(o[b]).forEach((d) => {
        o[e][d] = [...o[b][d]];
      });
    }), t === "/*" && (t = "*");
    const i = (t.match(/\/:/g) || []).length;
    if (/\*$/.test(t)) {
      const o = pt(t);
      e === b ? Object.keys(s).forEach((d) => {
        var h;
        (h = s[d])[t] || (h[t] = te(s[d], t) || te(s[b], t) || []);
      }) : (l = s[e])[t] || (l[t] = te(s[e], t) || te(s[b], t) || []), Object.keys(s).forEach((d) => {
        (e === b || e === d) && Object.keys(s[d]).forEach((h) => {
          o.test(h) && s[d][h].push([r, i]);
        });
      }), Object.keys(n).forEach((d) => {
        (e === b || e === d) && Object.keys(n[d]).forEach((h) => o.test(h) && n[d][h].push([r, i]));
      });
      return;
    }
    const a = tt(t) || [t];
    for (let o = 0, d = a.length; o < d; o++) {
      const h = a[o];
      Object.keys(n).forEach((u) => {
        var m;
        (e === b || e === u) && ((m = n[u])[h] || (m[h] = [...te(s[u], h) || te(s[b], h) || []]), n[u][h].push([r, i - d + o + 1]));
      });
    }
  }
  buildAllMatchers() {
    const e = /* @__PURE__ */ Object.create(null);
    return Object.keys(c(this, k)).concat(Object.keys(c(this, W))).forEach((t) => {
      e[t] || (e[t] = E(this, Te, ft).call(this, t));
    }), p(this, W, p(this, k, void 0)), Gt(), e;
  }
}, W = /* @__PURE__ */ new WeakMap(), k = /* @__PURE__ */ new WeakMap(), Te = /* @__PURE__ */ new WeakSet(), ft = /* @__PURE__ */ __name2(function(e) {
  const t = [];
  let r = e === b;
  return [c(this, W), c(this, k)].forEach((s) => {
    const n = s[e] ? Object.keys(s[e]).map((i) => [i, s[e][i]]) : [];
    n.length !== 0 ? (r || (r = true), t.push(...n)) : e !== b && t.push(...Object.keys(s[b]).map((i) => [i, s[b][i]]));
  }), r ? Yt(t) : null;
}, "ft"), Ye);
var z;
var q;
var Je;
var Xt = (Je = class {
  static {
    __name(this, "Je");
  }
  static {
    __name2(this, "Je");
  }
  constructor(e) {
    f(this, "name", "SmartRouter");
    g(this, z, []);
    g(this, q, []);
    p(this, z, e.routers);
  }
  add(e, t, r) {
    if (!c(this, q)) throw new Error(ct);
    c(this, q).push([e, t, r]);
  }
  match(e, t) {
    if (!c(this, q)) throw new Error("Fatal error");
    const r = c(this, z), s = c(this, q), n = r.length;
    let i = 0, a;
    for (; i < n; i++) {
      const l = r[i];
      try {
        for (let o = 0, d = s.length; o < d; o++) l.add(...s[o]);
        a = l.match(e, t);
      } catch (o) {
        if (o instanceof lt) continue;
        throw o;
      }
      this.match = l.match.bind(l), p(this, z, [l]), p(this, q, void 0);
      break;
    }
    if (i === n) throw new Error("Fatal error");
    return this.name = `SmartRouter + ${this.activeRouter.name}`, a;
  }
  get activeRouter() {
    if (c(this, q) || c(this, z).length !== 1) throw new Error("No active router has been determined yet.");
    return c(this, z)[0];
  }
}, z = /* @__PURE__ */ new WeakMap(), q = /* @__PURE__ */ new WeakMap(), Je);
var ue = /* @__PURE__ */ Object.create(null);
var V;
var j;
var Q;
var le;
var _;
var L;
var G;
var Xe;
var mt = (Xe = class {
  static {
    __name(this, "Xe");
  }
  static {
    __name2(this, "Xe");
  }
  constructor(e, t, r) {
    g(this, L);
    g(this, V);
    g(this, j);
    g(this, Q);
    g(this, le, 0);
    g(this, _, ue);
    if (p(this, j, r || /* @__PURE__ */ Object.create(null)), p(this, V, []), e && t) {
      const s = /* @__PURE__ */ Object.create(null);
      s[e] = { handler: t, possibleKeys: [], score: 0 }, p(this, V, [s]);
    }
    p(this, Q, []);
  }
  insert(e, t, r) {
    p(this, le, ++Le(this, le)._);
    let s = this;
    const n = St(t), i = [];
    for (let a = 0, l = n.length; a < l; a++) {
      const o = n[a], d = n[a + 1], h = Dt(o, d), u = Array.isArray(h) ? h[0] : o;
      if (u in c(s, j)) {
        s = c(s, j)[u], h && i.push(h[1]);
        continue;
      }
      c(s, j)[u] = new mt(), h && (c(s, Q).push(h), i.push(h[1])), s = c(s, j)[u];
    }
    return c(s, V).push({ [e]: { handler: r, possibleKeys: i.filter((a, l, o) => o.indexOf(a) === l), score: c(this, le) } }), s;
  }
  search(e, t) {
    var l;
    const r = [];
    p(this, _, ue);
    let n = [this];
    const i = Ze(t), a = [];
    for (let o = 0, d = i.length; o < d; o++) {
      const h = i[o], u = o === d - 1, m = [];
      for (let x = 0, S = n.length; x < S; x++) {
        const v = n[x], y = c(v, j)[h];
        y && (p(y, _, c(v, _)), u ? (c(y, j)["*"] && r.push(...E(this, L, G).call(this, c(y, j)["*"], e, c(v, _))), r.push(...E(this, L, G).call(this, y, e, c(v, _)))) : m.push(y));
        for (let O = 0, ee = c(v, Q).length; O < ee; O++) {
          const de = c(v, Q)[O], I = c(v, _) === ue ? {} : { ...c(v, _) };
          if (de === "*") {
            const $ = c(v, j)["*"];
            $ && (r.push(...E(this, L, G).call(this, $, e, c(v, _))), p($, _, I), m.push($));
            continue;
          }
          const [Se, Me, he] = de;
          if (!h && !(he instanceof RegExp)) continue;
          const N = c(v, j)[Se], wt = i.slice(o).join("/");
          if (he instanceof RegExp) {
            const $ = he.exec(wt);
            if ($) {
              if (I[Me] = $[0], r.push(...E(this, L, G).call(this, N, e, c(v, _), I)), Object.keys(c(N, j)).length) {
                p(N, _, I);
                const Ae = ((l = $[0].match(/\//)) == null ? void 0 : l.length) ?? 0;
                (a[Ae] || (a[Ae] = [])).push(N);
              }
              continue;
            }
          }
          (he === true || he.test(h)) && (I[Me] = h, u ? (r.push(...E(this, L, G).call(this, N, e, I, c(v, _))), c(N, j)["*"] && r.push(...E(this, L, G).call(this, c(N, j)["*"], e, I, c(v, _)))) : (p(N, _, I), m.push(N)));
        }
      }
      n = m.concat(a.shift() ?? []);
    }
    return r.length > 1 && r.sort((o, d) => o.score - d.score), [r.map(({ handler: o, params: d }) => [o, d])];
  }
}, V = /* @__PURE__ */ new WeakMap(), j = /* @__PURE__ */ new WeakMap(), Q = /* @__PURE__ */ new WeakMap(), le = /* @__PURE__ */ new WeakMap(), _ = /* @__PURE__ */ new WeakMap(), L = /* @__PURE__ */ new WeakSet(), G = /* @__PURE__ */ __name2(function(e, t, r, s) {
  const n = [];
  for (let i = 0, a = c(e, V).length; i < a; i++) {
    const l = c(e, V)[i], o = l[t] || l[b], d = {};
    if (o !== void 0 && (o.params = /* @__PURE__ */ Object.create(null), n.push(o), r !== ue || s && s !== ue)) for (let h = 0, u = o.possibleKeys.length; h < u; h++) {
      const m = o.possibleKeys[h], x = d[o.score];
      o.params[m] = s != null && s[m] && !x ? s[m] : r[m] ?? (s == null ? void 0 : s[m]), d[o.score] = true;
    }
  }
  return n;
}, "G"), Xe);
var Z;
var Qe;
var Qt = (Qe = class {
  static {
    __name(this, "Qe");
  }
  static {
    __name2(this, "Qe");
  }
  constructor() {
    f(this, "name", "TrieRouter");
    g(this, Z);
    p(this, Z, new mt());
  }
  add(e, t, r) {
    const s = tt(t);
    if (s) {
      for (let n = 0, i = s.length; n < i; n++) c(this, Z).insert(e, s[n], r);
      return;
    }
    c(this, Z).insert(e, t, r);
  }
  match(e, t) {
    return c(this, Z).search(e, t);
  }
}, Z = /* @__PURE__ */ new WeakMap(), Qe);
var gt = class extends dt {
  static {
    __name(this, "gt");
  }
  static {
    __name2(this, "gt");
  }
  constructor(e = {}) {
    super(e), this.router = e.router ?? new Xt({ routers: [new Jt(), new Qt()] });
  }
};
var Zt = /* @__PURE__ */ __name2((e) => {
  const r = { ...{ origin: "*", allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"], allowHeaders: [], exposeHeaders: [] }, ...e }, s = /* @__PURE__ */ ((i) => typeof i == "string" ? i === "*" ? () => i : (a) => i === a ? a : null : typeof i == "function" ? i : (a) => i.includes(a) ? a : null)(r.origin), n = ((i) => typeof i == "function" ? i : Array.isArray(i) ? () => i : () => [])(r.allowMethods);
  return async function(a, l) {
    var h;
    function o(u, m) {
      a.res.headers.set(u, m);
    }
    __name(o, "o");
    __name2(o, "o");
    const d = await s(a.req.header("origin") || "", a);
    if (d && o("Access-Control-Allow-Origin", d), r.credentials && o("Access-Control-Allow-Credentials", "true"), (h = r.exposeHeaders) != null && h.length && o("Access-Control-Expose-Headers", r.exposeHeaders.join(",")), a.req.method === "OPTIONS") {
      r.origin !== "*" && o("Vary", "Origin"), r.maxAge != null && o("Access-Control-Max-Age", r.maxAge.toString());
      const u = await n(a.req.header("origin") || "", a);
      u.length && o("Access-Control-Allow-Methods", u.join(","));
      let m = r.allowHeaders;
      if (!(m != null && m.length)) {
        const x = a.req.header("Access-Control-Request-Headers");
        x && (m = x.split(/\s*,\s*/));
      }
      return m != null && m.length && (o("Access-Control-Allow-Headers", m.join(",")), a.res.headers.append("Vary", "Access-Control-Request-Headers")), a.res.headers.delete("Content-Length"), a.res.headers.delete("Content-Type"), new Response(null, { headers: a.res.headers, status: 204, statusText: "No Content" });
    }
    await l(), r.origin !== "*" && a.header("Vary", "Origin", { append: true });
  };
}, "Zt");
var er = /^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i;
var Ue = /* @__PURE__ */ __name2((e, t = rr) => {
  const r = /\.([a-zA-Z0-9]+?)$/, s = e.match(r);
  if (!s) return;
  let n = t[s[1]];
  return n && n.startsWith("text") && (n += "; charset=utf-8"), n;
}, "Ue");
var tr = { aac: "audio/aac", avi: "video/x-msvideo", avif: "image/avif", av1: "video/av1", bin: "application/octet-stream", bmp: "image/bmp", css: "text/css", csv: "text/csv", eot: "application/vnd.ms-fontobject", epub: "application/epub+zip", gif: "image/gif", gz: "application/gzip", htm: "text/html", html: "text/html", ico: "image/x-icon", ics: "text/calendar", jpeg: "image/jpeg", jpg: "image/jpeg", js: "text/javascript", json: "application/json", jsonld: "application/ld+json", map: "application/json", mid: "audio/x-midi", midi: "audio/x-midi", mjs: "text/javascript", mp3: "audio/mpeg", mp4: "video/mp4", mpeg: "video/mpeg", oga: "audio/ogg", ogv: "video/ogg", ogx: "application/ogg", opus: "audio/opus", otf: "font/otf", pdf: "application/pdf", png: "image/png", rtf: "application/rtf", svg: "image/svg+xml", tif: "image/tiff", tiff: "image/tiff", ts: "video/mp2t", ttf: "font/ttf", txt: "text/plain", wasm: "application/wasm", webm: "video/webm", weba: "audio/webm", webmanifest: "application/manifest+json", webp: "image/webp", woff: "font/woff", woff2: "font/woff2", xhtml: "application/xhtml+xml", xml: "application/xml", zip: "application/zip", "3gp": "video/3gpp", "3g2": "video/3gpp2", gltf: "model/gltf+json", glb: "model/gltf-binary" };
var rr = tr;
var sr = /* @__PURE__ */ __name2((...e) => {
  let t = e.filter((n) => n !== "").join("/");
  t = t.replace(new RegExp("(?<=\\/)\\/+", "g"), "");
  const r = t.split("/"), s = [];
  for (const n of r) n === ".." && s.length > 0 && s.at(-1) !== ".." ? s.pop() : n !== "." && s.push(n);
  return s.join("/") || ".";
}, "sr");
var Et = { br: ".br", zstd: ".zst", gzip: ".gz" };
var nr = Object.keys(Et);
var ir = "index.html";
var ar = /* @__PURE__ */ __name2((e) => {
  const t = e.root ?? "./", r = e.path, s = e.join ?? sr;
  return async (n, i) => {
    var h, u, m, x;
    if (n.finalized) return i();
    let a;
    if (e.path) a = e.path;
    else try {
      if (a = decodeURIComponent(n.req.path), /(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(a)) throw new Error();
    } catch {
      return await ((h = e.onNotFound) == null ? void 0 : h.call(e, n.req.path, n)), i();
    }
    let l = s(t, !r && e.rewriteRequestPath ? e.rewriteRequestPath(a) : a);
    e.isDir && await e.isDir(l) && (l = s(l, ir));
    const o = e.getContent;
    let d = await o(l, n);
    if (d instanceof Response) return n.newResponse(d.body, d);
    if (d) {
      const S = e.mimes && Ue(l, e.mimes) || Ue(l);
      if (n.header("Content-Type", S || "application/octet-stream"), e.precompressed && (!S || er.test(S))) {
        const v = new Set((u = n.req.header("Accept-Encoding")) == null ? void 0 : u.split(",").map((y) => y.trim()));
        for (const y of nr) {
          if (!v.has(y)) continue;
          const O = await o(l + Et[y], n);
          if (O) {
            d = O, n.header("Content-Encoding", y), n.header("Vary", "Accept-Encoding", { append: true });
            break;
          }
        }
      }
      return await ((m = e.onFound) == null ? void 0 : m.call(e, l, n)), n.body(d);
    }
    await ((x = e.onNotFound) == null ? void 0 : x.call(e, l, n)), await i();
  };
}, "ar");
var or = /* @__PURE__ */ __name2(async (e, t) => {
  let r;
  t && t.manifest ? typeof t.manifest == "string" ? r = JSON.parse(t.manifest) : r = t.manifest : typeof __STATIC_CONTENT_MANIFEST == "string" ? r = JSON.parse(__STATIC_CONTENT_MANIFEST) : r = __STATIC_CONTENT_MANIFEST;
  let s;
  t && t.namespace ? s = t.namespace : s = __STATIC_CONTENT;
  const n = r[e] || e;
  if (!n) return null;
  const i = await s.get(n, { type: "stream" });
  return i || null;
}, "or");
var cr = /* @__PURE__ */ __name2((e) => async function(r, s) {
  return ar({ ...e, getContent: /* @__PURE__ */ __name2(async (i) => or(i, { manifest: e.manifest, namespace: e.namespace ? e.namespace : r.env ? r.env.__STATIC_CONTENT : void 0 }), "getContent") })(r, s);
}, "cr");
var lr = /* @__PURE__ */ __name2((e) => cr(e), "lr");
var w = new gt();
w.use("/api/*", Zt());
w.use("/static/*", lr({ root: "./" }));
w.get("/api/properties", async (e) => {
  const t = e.env.DB, { results: r } = await t.prepare(`
    SELECT * FROM properties ORDER BY id DESC
  `).all();
  return e.json(r);
});
w.get("/api/properties/:id", async (e) => {
  const t = e.env.DB, r = e.req.param("id"), s = await t.prepare(`
    SELECT * FROM properties WHERE id = ?
  `).bind(r).first();
  return s ? e.json(s) : e.json({ error: "Property not found" }, 404);
});
w.post("/api/properties", async (e) => {
  const t = e.env.DB, { name: r, address: s } = await e.req.json(), n = await t.prepare(`
    INSERT INTO properties (name, address) VALUES (?, ?)
  `).bind(r, s).run();
  return e.json({ id: n.meta.last_row_id, name: r, address: s });
});
w.put("/api/properties/:id", async (e) => {
  const t = e.env.DB, r = e.req.param("id"), { name: s, address: n } = await e.req.json();
  return await t.prepare(`
    UPDATE properties SET name = ?, address = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
  `).bind(s, n, r).run(), e.json({ id: r, name: s, address: n });
});
w.delete("/api/properties/:id", async (e) => {
  const t = e.env.DB, r = e.req.param("id");
  return await t.prepare("DELETE FROM properties WHERE id = ?").bind(r).run(), e.json({ success: true });
});
w.get("/api/properties/:propertyId/rooms", async (e) => {
  const t = e.env.DB, r = e.req.param("propertyId"), { results: s } = await t.prepare(`
    SELECT * FROM rooms WHERE property_id = ? ORDER BY room_number
  `).bind(r).all();
  return e.json(s);
});
w.post("/api/rooms", async (e) => {
  const t = e.env.DB, { property_id: r, room_number: s, floor: n } = await e.req.json(), i = await t.prepare(`
    INSERT INTO rooms (property_id, room_number, floor) VALUES (?, ?, ?)
  `).bind(r, s, n).run();
  return e.json({ id: i.meta.last_row_id, property_id: r, room_number: s, floor: n });
});
w.put("/api/rooms/:id", async (e) => {
  const t = e.env.DB, r = e.req.param("id"), { room_number: s, floor: n } = await e.req.json();
  return await t.prepare(`
    UPDATE rooms SET room_number = ?, floor = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
  `).bind(s, n, r).run(), e.json({ id: r, room_number: s, floor: n });
});
w.delete("/api/rooms/:id", async (e) => {
  const t = e.env.DB, r = e.req.param("id");
  return await t.prepare("DELETE FROM rooms WHERE id = ?").bind(r).run(), e.json({ success: true });
});
w.get("/api/rooms/:roomId/contracts", async (e) => {
  const t = e.env.DB, r = e.req.param("roomId"), { results: s } = await t.prepare(`
    SELECT * FROM contracts WHERE room_id = ? ORDER BY created_at DESC
  `).bind(r).all();
  return e.json(s);
});
w.get("/api/properties/:propertyId/active-contracts", async (e) => {
  const t = e.env.DB, r = e.req.param("propertyId"), { results: s } = await t.prepare(`
    SELECT c.*, r.room_number, r.floor 
    FROM contracts c
    JOIN rooms r ON c.room_id = r.id
    WHERE r.property_id = ? AND c.is_active = 1
    ORDER BY r.room_number
  `).bind(r).all();
  return e.json(s);
});
w.post("/api/contracts", async (e) => {
  const t = e.env.DB, { room_id: r, contractor_name: s, tenant_name: n, rent: i, management_fee: a, parking_fee: l, other_fee: o, start_date: d, end_date: h, is_active: u } = await e.req.json(), m = await t.prepare(`
    INSERT INTO contracts (room_id, contractor_name, tenant_name, rent, management_fee, parking_fee, other_fee, start_date, end_date, is_active)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(r, s, n || null, i, a, l, o, d, h || null, u).run();
  return e.json({ id: m.meta.last_row_id });
});
w.put("/api/contracts/:id", async (e) => {
  const t = e.env.DB, r = e.req.param("id"), { contractor_name: s, tenant_name: n, rent: i, management_fee: a, parking_fee: l, other_fee: o, start_date: d, end_date: h, is_active: u } = await e.req.json();
  return await t.prepare(`
    UPDATE contracts 
    SET contractor_name = ?, tenant_name = ?, rent = ?, management_fee = ?, parking_fee = ?, other_fee = ?, start_date = ?, end_date = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).bind(s, n || null, i, a, l, o, d, h || null, u, r).run(), e.json({ success: true });
});
w.delete("/api/contracts/:id", async (e) => {
  const t = e.env.DB, r = e.req.param("id");
  return await t.prepare("DELETE FROM contracts WHERE id = ?").bind(r).run(), e.json({ success: true });
});
w.get("/api/properties/:propertyId/expenses", async (e) => {
  const t = e.env.DB, r = e.req.param("propertyId"), s = e.req.query("year_month");
  let n = "SELECT * FROM expenses WHERE property_id = ?";
  const i = [r];
  s && (n += " AND year_month = ?", i.push(s)), n += " ORDER BY created_at DESC";
  const { results: a } = await t.prepare(n).bind(...i).all();
  return e.json(a);
});
w.post("/api/expenses", async (e) => {
  const t = e.env.DB, { property_id: r, year_month: s, item_name: n, description: i, amount: a, tax: l, total: o } = await e.req.json(), d = await t.prepare(`
    INSERT INTO expenses (property_id, year_month, item_name, description, amount, tax, total)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).bind(r, s, n, i || null, a, l, o).run();
  return e.json({ id: d.meta.last_row_id });
});
w.put("/api/expenses/:id", async (e) => {
  const t = e.env.DB, r = e.req.param("id"), { item_name: s, description: n, amount: i, tax: a, total: l } = await e.req.json();
  return await t.prepare(`
    UPDATE expenses 
    SET item_name = ?, description = ?, amount = ?, tax = ?, total = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).bind(s, n || null, i, a, l, r).run(), e.json({ success: true });
});
w.delete("/api/expenses/:id", async (e) => {
  const t = e.env.DB, r = e.req.param("id");
  return await t.prepare("DELETE FROM expenses WHERE id = ?").bind(r).run(), e.json({ success: true });
});
w.get("/api/properties/:propertyId/report", async (e) => {
  const t = e.env.DB, r = e.req.param("propertyId"), s = e.req.query("year_month") || (/* @__PURE__ */ new Date()).toISOString().slice(0, 7), n = await t.prepare(`
    SELECT * FROM properties WHERE id = ?
  `).bind(r).first();
  if (!n) return e.json({ error: "Property not found" }, 404);
  const { results: i } = await t.prepare(`
    SELECT c.*, r.room_number, r.floor 
    FROM contracts c
    JOIN rooms r ON c.room_id = r.id
    WHERE r.property_id = ? AND c.is_active = 1
    ORDER BY r.room_number
  `).bind(r).all(), { results: a } = await t.prepare(`
    SELECT * FROM expenses WHERE property_id = ? AND year_month = ?
    ORDER BY created_at
  `).bind(r, s).all(), l = i.reduce((h, u) => h + (u.rent || 0) + (u.management_fee || 0) + (u.parking_fee || 0) + (u.other_fee || 0), 0), o = a.reduce((h, u) => h + (u.total || 0), 0), d = l - o;
  return e.json({ property: n, year_month: s, report_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0], contracts: i, expenses: a, total_income: l, total_expense: o, net_income: d });
});
w.get("/", (e) => e.html(`
    <!DOCTYPE html>
    <html lang="ja">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>\u4E0D\u52D5\u7523\u6708\u6B21\u53CE\u652F\u5831\u544A\u66F8\u30B7\u30B9\u30C6\u30E0 - \u8A8D\u8A3C\u6A5F\u80FD\u4ED8\u304D</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    </head>
    <body class="bg-gray-50">
        <div id="app"></div>
        
        <!-- Supabase JS Client -->
        <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"><\/script>
        
        <!-- Axios for API calls -->
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"><\/script>
        
        <!-- Authentication Script (loads first) -->
        <script src="/static/auth.js"><\/script>
        
        <!-- Main Application Script -->
        <script src="/static/app.js"><\/script>
    </body>
    </html>
  `));
var We = new gt();
var dr = Object.assign({ "/src/index.tsx": w });
var vt = false;
for (const [, e] of Object.entries(dr)) e && (We.all("*", (t) => {
  let r;
  try {
    r = t.executionCtx;
  } catch {
  }
  return e.fetch(t.req.raw, t.env, r);
}), We.notFound((t) => {
  let r;
  try {
    r = t.executionCtx;
  } catch {
  }
  return e.fetch(t.req.raw, t.env, r);
}), vt = true);
if (!vt) throw new Error("Can't import modules from ['/src/index.ts','/src/index.tsx','/app/server.ts']");
var drainBody = /* @__PURE__ */ __name2(async (request, env22, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env22);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
__name2(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name2(async (request, env22, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env22);
  } catch (e) {
    const error32 = reduceError(e);
    return Response.json(error32, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = We;
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
__name2(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env22, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env22, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
__name2(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env22, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env22, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");
__name2(__facade_invoke__, "__facade_invoke__");
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  static {
    __name(this, "___Facade_ScheduledController__");
  }
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name2(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name2(function(request, env22, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env22, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env22, ctx) {
      const dispatcher = /* @__PURE__ */ __name2(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env22, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env22, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
__name2(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name2((request, env22, ctx) => {
      this.env = env22;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name2((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
__name2(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;

// node_modules/wrangler/templates/pages-dev-util.ts
function isRoutingRuleMatch(pathname, routingRule) {
  if (!pathname) {
    throw new Error("Pathname is undefined.");
  }
  if (!routingRule) {
    throw new Error("Routing rule is undefined.");
  }
  const ruleRegExp = transformRoutingRuleToRegExp(routingRule);
  return pathname.match(ruleRegExp) !== null;
}
__name(isRoutingRuleMatch, "isRoutingRuleMatch");
function transformRoutingRuleToRegExp(rule) {
  let transformedRule;
  if (rule === "/" || rule === "/*") {
    transformedRule = rule;
  } else if (rule.endsWith("/*")) {
    transformedRule = `${rule.substring(0, rule.length - 2)}(/*)?`;
  } else if (rule.endsWith("/")) {
    transformedRule = `${rule.substring(0, rule.length - 1)}(/)?`;
  } else if (rule.endsWith("*")) {
    transformedRule = rule;
  } else {
    transformedRule = `${rule}(/)?`;
  }
  transformedRule = `^${transformedRule.replaceAll(/\./g, "\\.").replaceAll(/\*/g, ".*")}$`;
  return new RegExp(transformedRule);
}
__name(transformRoutingRuleToRegExp, "transformRoutingRuleToRegExp");

// .wrangler/tmp/pages-jRb52i/i6bb3axuby9.js
var define_ROUTES_default = { version: 1, include: ["/*"], exclude: ["/static/*"] };
var routes = define_ROUTES_default;
var pages_dev_pipeline_default = {
  fetch(request, env3, context3) {
    const { pathname } = new URL(request.url);
    for (const exclude of routes.exclude) {
      if (isRoutingRuleMatch(pathname, exclude)) {
        return env3.ASSETS.fetch(request);
      }
    }
    for (const include of routes.include) {
      if (isRoutingRuleMatch(pathname, include)) {
        const workerAsHandler = middleware_loader_entry_default;
        if (workerAsHandler.fetch === void 0) {
          throw new TypeError("Entry point missing `fetch` handler");
        }
        return workerAsHandler.fetch(request, env3, context3);
      }
    }
    return env3.ASSETS.fetch(request);
  }
};

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody2 = /* @__PURE__ */ __name(async (request, env3, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env3);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default2 = drainBody2;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError2(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError2(e.cause)
  };
}
__name(reduceError2, "reduceError");
var jsonError2 = /* @__PURE__ */ __name(async (request, env3, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env3);
  } catch (e) {
    const error4 = reduceError2(e);
    return Response.json(error4, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default2 = jsonError2;

// .wrangler/tmp/bundle-GWK6Wq/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__2 = [
  middleware_ensure_req_body_drained_default2,
  middleware_miniflare3_json_error_default2
];
var middleware_insertion_facade_default2 = pages_dev_pipeline_default;

// node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__2 = [];
function __facade_register__2(...args) {
  __facade_middleware__2.push(...args.flat());
}
__name(__facade_register__2, "__facade_register__");
function __facade_invokeChain__2(request, env3, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__2(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env3, ctx, middlewareCtx);
}
__name(__facade_invokeChain__2, "__facade_invokeChain__");
function __facade_invoke__2(request, env3, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__2(request, env3, ctx, dispatch, [
    ...__facade_middleware__2,
    finalMiddleware
  ]);
}
__name(__facade_invoke__2, "__facade_invoke__");

// .wrangler/tmp/bundle-GWK6Wq/middleware-loader.entry.ts
var __Facade_ScheduledController__2 = class ___Facade_ScheduledController__2 {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__2)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler2(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__2 === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__2.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__2) {
    __facade_register__2(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env3, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env3, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env3, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__2(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env3, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__2(request, env3, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler2, "wrapExportedHandler");
function wrapWorkerEntrypoint2(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__2 === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__2.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__2) {
    __facade_register__2(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env3, ctx) => {
      this.env = env3;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__2(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__2(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint2, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY2;
if (typeof middleware_insertion_facade_default2 === "object") {
  WRAPPED_ENTRY2 = wrapExportedHandler2(middleware_insertion_facade_default2);
} else if (typeof middleware_insertion_facade_default2 === "function") {
  WRAPPED_ENTRY2 = wrapWorkerEntrypoint2(middleware_insertion_facade_default2);
}
var middleware_loader_entry_default2 = WRAPPED_ENTRY2;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__2 as __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default2 as default
};
//# sourceMappingURL=i6bb3axuby9.js.map
