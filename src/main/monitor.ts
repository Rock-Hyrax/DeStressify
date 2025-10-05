import { getRange } from "./dataDb";
import { Notification } from "electron";

export function checkData(): void {
  getRange(Date.now() - (5 * 60 * 1000 + 500), Date.now()).then((data) => {
    if (data.reduce((a, b) => a + b.Stress, 0) / data.length > 5) {
      new Notification({
        title: "DeStressify",
        body: "You seem stressed, take a break or try a breathing exercise.",
      }).show();
    }
  });
}
