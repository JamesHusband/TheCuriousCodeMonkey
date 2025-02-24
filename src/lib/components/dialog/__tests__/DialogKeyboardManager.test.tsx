import { render, fireEvent } from "@/lib/utils/test-utils";
import { DialogKeyboardManager } from "../DialogKeyboardManager";
import { useDialog } from "@/lib/providers/DialogProvider";

// Mock the useDialog hook
jest.mock("@/lib/providers/DialogProvider", () => ({
  useDialog: jest.fn(),
}));

describe("DialogKeyboardManager", () => {
  const mockToggleDialog = jest.fn();
  const mockCloseDialog = jest.fn();
  const mockIsDialogOpen = jest.fn();
  const mockUseDialog = useDialog as jest.Mock;

  beforeEach(() => {
    // Reset all mocks before each test
    mockToggleDialog.mockReset();
    mockCloseDialog.mockReset();
    mockIsDialogOpen.mockReset();

    mockUseDialog.mockImplementation(() => ({
      toggleDialog: mockToggleDialog,
      closeDialog: mockCloseDialog,
      isDialogOpen: mockIsDialogOpen,
    }));
  });

  it("toggles command palette with Cmd+Shift+P", () => {
    render(<DialogKeyboardManager />);

    fireEvent.keyDown(window, {
      key: "p",
      metaKey: true,
      shiftKey: true,
    });

    expect(mockToggleDialog).toHaveBeenCalledWith("commandPalette");
  });

  it("toggles command palette with Ctrl+Shift+P", () => {
    render(<DialogKeyboardManager />);

    fireEvent.keyDown(window, {
      key: "p",
      ctrlKey: true,
      shiftKey: true,
    });

    expect(mockToggleDialog).toHaveBeenCalledWith("commandPalette");
  });

  it("toggles terminal with Cmd+`", () => {
    render(<DialogKeyboardManager />);

    fireEvent.keyDown(window, {
      key: "`",
      metaKey: true,
    });

    expect(mockToggleDialog).toHaveBeenCalledWith("terminal");
  });

  it("toggles terminal with Ctrl+`", () => {
    render(<DialogKeyboardManager />);

    fireEvent.keyDown(window, {
      key: "`",
      ctrlKey: true,
    });

    expect(mockToggleDialog).toHaveBeenCalledWith("terminal");
  });

  it("closes command palette with Escape when open", () => {
    mockIsDialogOpen.mockImplementation(
      (dialog) => dialog === "commandPalette"
    );
    render(<DialogKeyboardManager />);

    fireEvent.keyDown(window, {
      key: "Escape",
    });

    expect(mockCloseDialog).toHaveBeenCalledWith("commandPalette");
  });

  it("closes terminal with Escape when open", () => {
    mockIsDialogOpen.mockImplementation((dialog) => dialog === "terminal");
    render(<DialogKeyboardManager />);

    fireEvent.keyDown(window, {
      key: "Escape",
    });

    expect(mockCloseDialog).toHaveBeenCalledWith("terminal");
  });

  it("does not close dialogs with Escape when none are open", () => {
    mockIsDialogOpen.mockImplementation(() => false);
    render(<DialogKeyboardManager />);

    fireEvent.keyDown(window, {
      key: "Escape",
    });

    expect(mockCloseDialog).not.toHaveBeenCalled();
  });

  it("prevents default behavior for keyboard shortcuts", () => {
    render(<DialogKeyboardManager />);

    const preventDefault = jest.fn();

    // Test Cmd+Shift+P
    fireEvent.keyDown(window, {
      key: "p",
      metaKey: true,
      shiftKey: true,
      preventDefault,
    });
    expect(preventDefault).toHaveBeenCalled();

    // Test Cmd+`
    preventDefault.mockClear();
    fireEvent.keyDown(window, {
      key: "`",
      metaKey: true,
      preventDefault,
    });
    expect(preventDefault).toHaveBeenCalled();
  });
});
