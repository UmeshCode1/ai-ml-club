import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import OfflinePage from "./page";

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("OfflinePage", () => {
  it("renders the offline message", () => {
    render(<OfflinePage />);
    expect(screen.getByText(/NETWORK/i)).toBeInTheDocument();
    expect(screen.getByText(/DISRUPTED/i)).toBeInTheDocument();
  });

  it("renders retry and home actions", () => {
    render(<OfflinePage />);
    expect(screen.getByRole("button", { name: /Try Again/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Go to Home/i })).toBeInTheDocument();
  });
});
