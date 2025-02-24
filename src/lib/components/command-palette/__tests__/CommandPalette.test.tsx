import { render, screen, fireEvent } from "@/lib/utils/test-utils";
import { CommandPalette } from "../CommandPalette";
import { useDialog } from "@/lib/providers/DialogProvider";

// Mock the useDialog hook
jest.mock("@/lib/providers/DialogProvider", () => ({
  useDialog: jest.fn(),
}));

describe("CommandPalette", () => {
  const mockCloseDialog = jest.fn();
  const mockUseDialog = useDialog as jest.Mock;

  beforeEach(() => {
    mockCloseDialog.mockReset();
    mockUseDialog.mockImplementation(() => ({
      closeDialog: mockCloseDialog,
    }));
  });

  it("renders command palette with search input", () => {
    render(<CommandPalette />);

    expect(
      screen.getByPlaceholderText("Type a command or search...")
    ).toBeInTheDocument();
  });

  it("autofocuses the search input", () => {
    render(<CommandPalette />);

    const input = screen.getByPlaceholderText("Type a command or search...");
    expect(input).toHaveFocus();
  });

  it("closes on backdrop click", () => {
    render(<CommandPalette />);

    const backdrop = screen.getByRole("presentation");
    fireEvent.click(backdrop);
    expect(mockCloseDialog).toHaveBeenCalledWith("commandPalette");
  });

  it("does not close when clicking the command palette itself", () => {
    render(<CommandPalette />);

    const commandPalette = screen.getByRole("presentation")
      .firstChild as HTMLElement;
    fireEvent.click(commandPalette);
    expect(mockCloseDialog).not.toHaveBeenCalled();
  });

  it("renders command icon", () => {
    render(<CommandPalette />);

    const commandIcon = screen.getByTestId("command-icon");
    expect(commandIcon).toBeInTheDocument();
  });
});
