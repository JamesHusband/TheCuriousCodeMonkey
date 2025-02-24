import { render, screen } from "@/lib/utils/test-utils";
import { DialogManager } from "../DialogManager";
import { useDialog } from "@/lib/providers/DialogProvider";

// Mock the useDialog hook
jest.mock("@/lib/providers/DialogProvider", () => ({
  useDialog: jest.fn(),
}));

describe("DialogManager", () => {
  const mockUseDialog = useDialog as jest.Mock;

  beforeEach(() => {
    // Reset mock implementation before each test
    mockUseDialog.mockImplementation(() => ({
      isDialogOpen: (dialog: string) => false,
    }));
  });

  it("renders Terminal component by default", () => {
    render(<DialogManager />);
    expect(screen.getByTestId("terminal")).toBeInTheDocument();
  });

  it("renders CommandPalette when commandPalette dialog is open", () => {
    mockUseDialog.mockImplementation(() => ({
      isDialogOpen: (dialog: string) => dialog === "commandPalette",
    }));

    render(<DialogManager />);
    expect(screen.getByTestId("command-palette")).toBeInTheDocument();
  });

  it("renders GNUTerryPratchett when gnuTerry dialog is open", () => {
    mockUseDialog.mockImplementation(() => ({
      isDialogOpen: (dialog: string) => dialog === "gnuTerry",
    }));

    render(<DialogManager />);
    expect(screen.getByTestId("gnu-terry")).toBeInTheDocument();
  });

  it("can render multiple dialogs simultaneously", () => {
    mockUseDialog.mockImplementation(() => ({
      isDialogOpen: (dialog: string) => true,
    }));

    render(<DialogManager />);
    expect(screen.getByTestId("command-palette")).toBeInTheDocument();
    expect(screen.getByTestId("terminal")).toBeInTheDocument();
    expect(screen.getByTestId("gnu-terry")).toBeInTheDocument();
  });
});
