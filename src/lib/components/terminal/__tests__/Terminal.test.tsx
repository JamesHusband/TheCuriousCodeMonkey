import { render, screen, fireEvent, waitFor } from "@/lib/utils/test-utils";
import { Terminal } from "../Terminal";
import { useDialog } from "@/lib/providers/DialogProvider";

// Mock the useDialog hook
jest.mock("@/lib/providers/DialogProvider", () => ({
  useDialog: jest.fn(),
}));

describe("Terminal", () => {
  const mockCloseDialog = jest.fn();
  const mockUseDialog = useDialog as jest.Mock;

  beforeEach(() => {
    mockCloseDialog.mockReset();
    mockUseDialog.mockImplementation(() => ({
      isDialogOpen: (dialog: string) => dialog === "terminal",
      closeDialog: mockCloseDialog,
    }));
  });

  it("renders welcome message when opened", () => {
    render(<Terminal />);
    expect(
      screen.getByText("Welcome to The Curious Code Monkey Terminal...")
    ).toBeInTheDocument();
  });

  it("does not render when terminal is closed", () => {
    mockUseDialog.mockImplementation(() => ({
      isDialogOpen: () => false,
      closeDialog: mockCloseDialog,
    }));

    render(<Terminal />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes terminal when close button is clicked", () => {
    render(<Terminal />);
    const closeButton = screen.getByLabelText("Close terminal");
    fireEvent.click(closeButton);
    expect(mockCloseDialog).toHaveBeenCalledWith("terminal");
  });

  it("handles 'ook' command", () => {
    render(<Terminal />);

    // Simulate typing 'ook' and pressing Enter
    fireEvent.keyDown(window, { key: "o" });
    fireEvent.keyDown(window, { key: "o" });
    fireEvent.keyDown(window, { key: "k" });
    fireEvent.keyDown(window, { key: "Enter" });

    expect(screen.getByText("Ook?")).toBeInTheDocument();
  });

  it("handles unknown commands", () => {
    render(<Terminal />);

    // Simulate typing an unknown command and pressing Enter
    fireEvent.keyDown(window, { key: "h" });
    fireEvent.keyDown(window, { key: "e" });
    fireEvent.keyDown(window, { key: "y" });
    fireEvent.keyDown(window, { key: "Enter" });

    expect(screen.getByText("Type 'ook' for a surprise.")).toBeInTheDocument();
  });

  it("handles backspace key", () => {
    render(<Terminal />);

    // Type "test" then backspace twice
    fireEvent.keyDown(window, { key: "t" });
    fireEvent.keyDown(window, { key: "e" });
    fireEvent.keyDown(window, { key: "s" });
    fireEvent.keyDown(window, { key: "t" });
    fireEvent.keyDown(window, { key: "Backspace" });
    fireEvent.keyDown(window, { key: "Backspace" });

    // Find the current command line
    const commandLines = screen.getAllByText("$");
    const lastCommandLine = commandLines[commandLines.length - 1];
    expect(lastCommandLine.nextSibling?.textContent).toBe("te");
  });

  it("handles monkey command and renders video", () => {
    render(<Terminal />);

    // Type "monkey" and press Enter
    "monkey".split("").forEach((key) => {
      fireEvent.keyDown(window, { key });
    });
    fireEvent.keyDown(window, { key: "Enter" });

    expect(
      screen.getByText("🐒 Spinning up some monkey business...")
    ).toBeInTheDocument();
    expect(screen.getByTitle("YouTube Video")).toBeInTheDocument();
  });

  it("maintains command history", () => {
    render(<Terminal />);

    // Execute multiple commands
    const commands = ["ook", "monkey", "test"];
    commands.forEach((command) => {
      command.split("").forEach((key) => {
        fireEvent.keyDown(window, { key });
      });
      fireEvent.keyDown(window, { key: "Enter" });
    });

    // Check if all commands are in history
    commands.forEach((command) => {
      expect(screen.getByText(command)).toBeInTheDocument();
    });
  });

  it("shows and hides cursor with correct timing", async () => {
    jest.useFakeTimers();
    render(<Terminal />);

    const getCursor = () => screen.getByText("▊");

    // Initial state (visible)
    expect(getCursor()).toHaveClass("opacity-100");

    // After half interval (still visible)
    jest.advanceTimersByTime(265);
    expect(getCursor()).toHaveClass("opacity-100");

    // After full interval (hidden)
    jest.advanceTimersByTime(265);
    await waitFor(() => {
      expect(getCursor()).toHaveClass("opacity-0");
    });

    // After another half interval (still hidden)
    jest.advanceTimersByTime(265);
    expect(getCursor()).toHaveClass("opacity-0");

    // After full second interval (visible again)
    jest.advanceTimersByTime(265);
    await waitFor(() => {
      expect(getCursor()).toHaveClass("opacity-100");
    });

    jest.useRealTimers();
  });
});
