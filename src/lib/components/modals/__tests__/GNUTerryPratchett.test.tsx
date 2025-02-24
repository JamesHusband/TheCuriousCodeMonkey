import { render, screen, fireEvent } from "@/lib/utils/test-utils";
import { GNUTerryPratchett } from "../GNUTerryPratchett";
import { useDialog } from "@/lib/providers/DialogProvider";

// Mock the useDialog hook
jest.mock("@/lib/providers/DialogProvider", () => ({
  useDialog: jest.fn(),
}));

describe("GNUTerryPratchett", () => {
  const mockCloseDialog = jest.fn();
  const mockUseDialog = useDialog as jest.Mock;

  beforeEach(() => {
    mockCloseDialog.mockReset();
    mockUseDialog.mockImplementation(() => ({
      closeDialog: mockCloseDialog,
    }));
  });

  it("renders the modal title", () => {
    render(<GNUTerryPratchett />);
    expect(screen.getByText("GNU Terry Pratchett")).toBeInTheDocument();
  });

  it("renders the quote", () => {
    render(<GNUTerryPratchett />);
    expect(
      screen.getByText(/"A man is not dead while his name is still spoken."/)
    ).toBeInTheDocument();
    expect(
      screen.getByText("- Going Postal, Chapter 4 prologue")
    ).toBeInTheDocument();
  });

  it("renders the explanation text", () => {
    render(<GNUTerryPratchett />);
    expect(
      screen.getByText(
        /GNU Terry Pratchett is a tribute to author Sir Terry Pratchett/
      )
    ).toBeInTheDocument();
  });

  it("renders the GNU code explanation", () => {
    render(<GNUTerryPratchett />);
    expect(screen.getByText("G: Send the message on")).toBeInTheDocument();
    expect(screen.getByText("N: Do not log the message")).toBeInTheDocument();
    expect(
      screen.getByText("U: Turn the message around at the end of the line")
    ).toBeInTheDocument();
  });

  it("renders the X-Clacks-Overhead header", () => {
    render(<GNUTerryPratchett />);
    expect(
      screen.getByText("X-Clacks-Overhead: GNU Terry Pratchett")
    ).toBeInTheDocument();
  });

  it("closes on backdrop click", () => {
    render(<GNUTerryPratchett />);

    const backdrop = screen.getByRole("presentation");
    fireEvent.click(backdrop);
    expect(mockCloseDialog).toHaveBeenCalledWith("gnuTerry");
  });

  it("closes on close button click", () => {
    render(<GNUTerryPratchett />);

    const closeButton = screen.getByLabelText("Close");
    fireEvent.click(closeButton);
    expect(mockCloseDialog).toHaveBeenCalledWith("gnuTerry");
  });

  it("does not close when clicking the modal content", () => {
    render(<GNUTerryPratchett />);

    const modalContent = screen.getByRole("presentation")
      .firstChild as HTMLElement;
    fireEvent.click(modalContent);
    expect(mockCloseDialog).not.toHaveBeenCalled();
  });
});
