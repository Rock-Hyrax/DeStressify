declare global {
  interface Window {
    api: any
  }
}

type AppTimePerAppObject= any;

export type DataObject= {
  SnLeftClicked: number,
  SnMouseAct: number,
  SnKeyStrokes:number,
  SnChars:number,
  SnSpecialKeys:number,
  SnDirectionKeys:number,
  SnSpaces:number,
  SnDoubleClicked: number,
  SnShortCutKeys:number,
  SnWheel:number,
  SnErrorKeys:number,
  SnRightClicked: number,
  CharactersRatio: number,
  ErrorKeyRatio: number,
  SnMouseDistance: number,
  SnAppChange: number,
  AppTimePerApp: AppTimePerAppObject,
  Stress: number,
  Timestamp: string
};
