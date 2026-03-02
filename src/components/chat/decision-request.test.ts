import { describe, expect, it } from "vitest";
import { parseDecisionRequest } from "./decision-request";

describe("parseDecisionRequest", () => {
  it("parses Korean multiline options where text continues on next line", () => {
    const content = [
      "작업 중 충돌이 확인됐습니다. 진행 옵션:",
      "1.",
      "현재 상태 그대로 QA 검증 계속",
      "2.",
      "기준 커밋/브랜치 정리 후 QA 진행",
    ].join("\n");

    const parsed = parseDecisionRequest(content);
    expect(parsed).not.toBeNull();
    expect(parsed?.options).toEqual([
      { number: 1, label: "현재 상태 그대로 QA 검증 계속" },
      { number: 2, label: "기준 커밋/브랜치 정리 후 QA 진행" },
    ]);
  });

  it("parses inline English options", () => {
    const content = [
      "Decision needed. Choose one option:",
      "1) Continue QA on current workspace",
      "2) Reset to baseline branch and rerun QA",
    ].join("\n");

    const parsed = parseDecisionRequest(content);
    expect(parsed?.options).toEqual([
      { number: 1, label: "Continue QA on current workspace" },
      { number: 2, label: "Reset to baseline branch and rerun QA" },
    ]);
  });

  it("returns null for normal numbered notes without decision hints", () => {
    const content = ["오늘 TODO", "1. lint 실행", "2. test 실행", "3. 빌드 확인"].join("\n");

    expect(parseDecisionRequest(content)).toBeNull();
  });

  it("parses Thai multiline options", () => {
    const content = [
      "พบความขัดแย้งระหว่างการทำงาน กรุณาเลือกตัวเลือก:",
      "1.",
      "ดำเนินการตรวจสอบ QA ต่อด้วยสถานะปัจจุบัน",
      "2.",
      "รีเซ็ตไปยัง baseline branch แล้วเริ่ม QA ใหม่",
    ].join("\n");

    const parsed = parseDecisionRequest(content);
    expect(parsed?.options).toEqual([
      { number: 1, label: "ดำเนินการตรวจสอบ QA ต่อด้วยสถานะปัจจุบัน" },
      { number: 2, label: "รีเซ็ตไปยัง baseline branch แล้วเริ่ม QA ใหม่" },
    ]);
  });
});
