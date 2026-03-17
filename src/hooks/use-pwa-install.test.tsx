import { act, renderHook, waitFor } from "@testing-library/react";
import { usePWAInstall } from "./use-pwa-install";

describe("usePWAInstall", () => {
  const originalAlert = window.alert;
  const originalUserAgent = navigator.userAgent;

  beforeEach(() => {
    Object.defineProperty(window, "alert", { value: vi.fn(), configurable: true });
    Object.defineProperty(navigator, "userAgent", { value: "Mozilla/5.0 Chrome", configurable: true });
    Object.defineProperty(navigator, "vendor", { value: "Google Inc", configurable: true });
  });

  afterEach(() => {
    Object.defineProperty(window, "alert", { value: originalAlert, configurable: true });
    Object.defineProperty(navigator, "userAgent", { value: originalUserAgent, configurable: true });
  });

  it("becomes installable when beforeinstallprompt is dispatched", async () => {
    const { result } = renderHook(() => usePWAInstall());

    const prompt = vi.fn().mockResolvedValue(undefined);
    const event = new Event("beforeinstallprompt") as Event & {
      prompt: () => Promise<void>;
      userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
    };
    event.prompt = prompt;
    event.userChoice = Promise.resolve({ outcome: "accepted" });

    act(() => {
      window.dispatchEvent(event);
    });

    await waitFor(() => expect(result.current.isInstallable).toBe(true));
  });

  it("shows fallback alert when install is called without prompt", async () => {
    const { result } = renderHook(() => usePWAInstall());

    await act(async () => {
      await result.current.install();
    });

    expect(window.alert).toHaveBeenCalled();
  });

  it("marks app as installed when appinstalled event fires", async () => {
    const { result } = renderHook(() => usePWAInstall());

    act(() => {
      window.dispatchEvent(new Event("appinstalled"));
    });

    await waitFor(() => expect(result.current.isInstalled).toBe(true));
  });
});
