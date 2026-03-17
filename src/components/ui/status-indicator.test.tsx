import { render, screen } from "@testing-library/react";
import { StatusBadge, StatusDot, StatusIndicator } from "./status-indicator";

describe("StatusIndicator", () => {
  it("renders default dot variant", () => {
    const { container } = render(<StatusIndicator variant="ongoing" />);
    expect(container.querySelector(".rounded-full")).toBeInTheDocument();
  });

  it("renders label badge when showLabel is true", () => {
    render(<StatusIndicator variant="success" showLabel label="Done" />);
    expect(screen.getByText("Done")).toBeInTheDocument();
  });

  it("applies loading animation class for loading variant", () => {
    const { container } = render(<StatusIndicator variant="loading" showLabel label="Loading" />);
    expect(container.querySelector(".animate-spin")).toBeInTheDocument();
  });

  it("renders helper components", () => {
    const { container } = render(
      <div>
        <StatusDot variant="pending" />
        <StatusBadge variant="error" label="Failed" />
      </div>
    );
    expect(screen.getByText("Failed")).toBeInTheDocument();
    expect(container.querySelectorAll(".rounded-full").length).toBeGreaterThan(0);
  });
});
