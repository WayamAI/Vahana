import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import DocumentsPage from "@/app/documents/page";

vi.mock("next/navigation", () => ({
  usePathname: () => "/documents",
}));

describe("Documents route", () => {
  it("renders an honest no-data-source state rather than implying a backend", () => {
    render(<DocumentsPage />);
    expect(screen.getByText(/no documents connected/i)).toBeInTheDocument();
    expect(screen.getByText(/isn't wired to a document store/i)).toBeInTheDocument();
  });
});
