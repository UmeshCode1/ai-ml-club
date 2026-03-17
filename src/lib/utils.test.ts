import { cn } from "./utils";

describe("cn", () => {
  it("merges conditional classes", () => {
    const value = cn("px-2", true && "text-sm", false && "hidden");
    expect(value).toContain("px-2");
    expect(value).toContain("text-sm");
    expect(value).not.toContain("hidden");
  });

  it("deduplicates conflicting tailwind classes", () => {
    const value = cn("text-sm", "text-lg");
    expect(value).toContain("text-lg");
    expect(value).not.toContain("text-sm");
  });
});
