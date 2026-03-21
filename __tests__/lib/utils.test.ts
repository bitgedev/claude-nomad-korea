import { cn } from "@/lib/utils";

describe("cn", () => {
  it("단일 클래스 문자열을 그대로 반환한다", () => {
    expect(cn("text-red-500")).toBe("text-red-500");
  });

  it("여러 클래스를 공백으로 병합한다", () => {
    expect(cn("text-red-500", "font-bold", "mt-4")).toBe(
      "text-red-500 font-bold mt-4"
    );
  });

  it("falsy 값(undefined, null, false)을 무시한다", () => {
    expect(cn("text-red-500", undefined, null, false, "font-bold")).toBe(
      "text-red-500 font-bold"
    );
  });

  it("충돌하는 Tailwind 클래스는 마지막 값으로 override된다", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
    expect(cn("text-sm", "text-lg")).toBe("text-lg");
    expect(cn("bg-red-500", "bg-blue-500")).toBe("bg-blue-500");
  });

  it("배열 형태의 입력을 처리한다", () => {
    expect(cn(["text-red-500", "font-bold"])).toBe("text-red-500 font-bold");
  });

  it("객체 형태의 입력을 처리한다 (값이 true인 키만 포함)", () => {
    expect(cn({ "text-red-500": true, "font-bold": false, "mt-4": true })).toBe(
      "text-red-500 mt-4"
    );
  });

  it("배열과 객체를 혼합한 입력을 처리한다", () => {
    expect(cn("base", ["array-class"], { "cond-class": true })).toBe(
      "base array-class cond-class"
    );
  });
});
