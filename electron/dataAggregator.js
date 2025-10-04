import { getWindow } from "./window.js";
import { addReport, getReports } from "./dataDb.js";
import ort from "onnxruntime-node";

export class DataAggregator {
  constructor() {
    this.resetVariables();
    this.firstLoop = true;

    this.loop();
  }

  resetVariables() {
    this.SnLeftClicked = 0; //0-4-38
    this.SnMouseAct = 0; //0-9-84
    this.SnKeyStrokes = 0; //0-52-382
    this.SnChars = 0; //0-29-298
    this.SnAppChange = 0; //0-2-23
    this.SnSpecialKeys = 0; //0-20-225
    this.SnDirectionKeys = 0; //0-0-217
    this.SnErrorKeys = 0; //0-3-95
    this.SnShortCutKeys = 0; //0-0-22
    this.SnSpaces = 0; //0-5-65
    this.SnRightClicked = 0; //0-0-10
    this.SnDoubleClicked = 0; //0-0-25
    this.SnWheel = 0; //0-5-80
    this.SnMouseDistance = 0; //0-5249.94-81098.58
    this.AppTimePerApp = {};
    this.lastMousePosition = null;
    this.lastApplication = null;
    this.lastAppTime = null;
  }

  isChar(rawcode) {
    if (rawcode >= 65 && rawcode <= 90) {
      // A-Z
      return true;
    }

    if (rawcode >= 97 && rawcode <= 122) {
      //a-z
      return true;
    }
    return false;
  }

  isArrowKey(rawcode) {
    return [37, 38, 39, 40].includes(rawcode);
  }

  addMouseEvent(event) {
    this.SnMouseAct += 1;
    if (event.button === 1) {
      this.SnLeftClicked += 1;
    }
    if (event.button === 2) {
      this.SnWheel += 1;
    }
    if (event.button === 3) {
      this.SnRightClicked += 1;
    }
    if (event.clicks > 1) {
      this.SnDoubleClicked += 1;
    }
  }

  addMouseMove(event) {
    if (this.lastMousePosition !== null) {
      const distance = Math.sqrt(
        (this.lastMousePosition.x - event.x) ** 2 +
          (this.lastMousePosition.y - event.y) ** 2
      );
      this.SnMouseDistance += distance;
    }
    this.lastMousePosition = event;
  }

  addKeyboardEvent(event) {
    this.SnKeyStrokes += 1;
    if (this.isChar(event.rawcode)) {
      this.SnChars += 1;
    } else {
      this.SnSpecialKeys += 1;
    }
    if (event.rawcode === 32) {
      this.SnSpaces += 1;
    }
    if (this.isArrowKey(event.rawcode)) {
      this.SnDirectionKeys += 1;
    }
    if (event.rawcode === 65288 || event.rawcode === 65535) {
      // backspace, delete
      this.SnErrorKeys += 1;
    }
    if (event.ctrlKey && event.rawcode !== 65507) {
      this.SnShortCutKeys += 1;
      if (event.rawcode === 122) {
        // Crtl + Z
        this.SnErrorKeys += 1;
      }
    }
  }

  addAppTimePerApp(appName, time) {
    if (this.AppTimePerApp[appName] !== undefined) {
      this.AppTimePerApp[appName] += time;
    } else {
      this.AppTimePerApp[appName] = time;
    }
  }

  addWindowsEvent(event) {
    if (this.lastApplication !== null) {
      if (event.owner.name !== this.lastApplication.owner.name) {
        this.SnChars += 1;
      }
      this.addAppTimePerApp(event.owner.name, Date.now() - this.lastAppTime);
    }
    this.lastApplication = event;
    this.lastAppTime = Date.now();
  }

  async loop() {
    await this.report();
    this.resetVariables();
    this.firstLoop = false;
    setTimeout(() => {
      this.loop();
    }, 60 * 1000);
  }

  async report() {
    const session = await ort.InferenceSession.create("./tree.onnx");
    const input = new ort.Tensor(
      "float32",
      Float32Array.from([
        this.SnLeftClicked,
        this.SnMouseAct,
        this.SnKeyStrokes,
        this.SnChars,
        this.SnAppChange,
        this.SnSpecialKeys,
        this.SnDirectionKeys,
        this.SnErrorKeys,
        this.SnShortCutKeys,
        this.SnSpaces,
        this.SnKeyStrokes !== 0 ? this.SnChars / this.SnKeyStrokes : 0,
        this.SnChars + this.SnSpaces !== 0
          ? this.SnErrorKeys / (this.SnChars + this.SnSpaces)
          : 0,
        this.SnRightClicked,
        this.SnDoubleClicked,
        this.SnWheel,
        this.SnMouseDistance,
        this.SnKeyStrokes / 60,
        this.SnChars / 60,
        this.SnMouseAct / (this.SnKeyStrokes + 1),
      ]),
      [1, 19]
    );
    const output = await session.run({ input });

    const data = {
      SnLeftClicked: this.SnLeftClicked,
      SnMouseAct: this.SnMouseAct,
      SnKeyStrokes: this.SnKeyStrokes,
      SnChars: this.SnChars,
      SnSpecialKeys: this.SnSpecialKeys,
      SnDirectionKeys: this.SnDirectionKeys,
      SnSpaces: this.SnSpaces,
      SnDoubleClicked: this.SnDoubleClicked,
      SnShortCutKeys: this.SnShortCutKeys,
      SnWheel: this.SnWheel,
      SnErrorKeys: this.SnErrorKeys,
      SnRightClicked: this.SnRightClicked,
      CharactersRatio:
        this.SnKeyStrokes !== 0 ? this.SnChars / this.SnKeyStrokes : 0,
      ErrorKeyRatio:
        this.SnChars + this.SnSpaces !== 0
          ? this.SnErrorKeys / (this.SnChars + this.SnSpaces)
          : 0,
      SnMouseDistance: this.SnMouseDistance,
      SnAppChange: this.SnAppChange,
      AppTimePerApp: this.AppTimePerApp,
      Stress: output.variable.cpuData[0],
      Timestamp: Date.now(),
    };

    if (!this.firstLoop) {
      console.log(data);
      addReport(data);
    }
    (await getWindow()).webContents.send("report", await getReports());
  }
}
