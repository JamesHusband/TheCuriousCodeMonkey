import { render, screen, fireEvent, waitFor } from "@/lib/utils/test-utils";
import { Hero } from "../Hero";

describe("Hero", () => {
  const mockOnAnimationComplete = jest.fn();

  beforeEach(() => {
    mockOnAnimationComplete.mockReset();
    // Mock window.innerWidth
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1024, // Desktop width by default
    });
  });

  it("renders hero section with images", () => {
    render(<Hero onAnimationComplete={mockOnAnimationComplete} />);

    expect(
      screen.getByAltText("The Curious Code Monkey Brain")
    ).toBeInTheDocument();
    expect(
      screen.getByAltText("The Curious Code Monkey Head")
    ).toBeInTheDocument();
  });

  it("shows initial scroll message", () => {
    render(<Hero onAnimationComplete={mockOnAnimationComplete} />);
    expect(screen.getByText("Scroll to begin")).toBeInTheDocument();
  });

  it("triggers first phase animation on scroll", async () => {
    render(<Hero onAnimationComplete={mockOnAnimationComplete} />);

    const monkeyHead = screen.getByAltText(
      "The Curious Code Monkey Head"
    ).parentElement;

    // Trigger scroll
    const event = new WheelEvent("wheel", { deltaY: 100 });
    Object.defineProperty(event, "preventDefault", {
      value: jest.fn(),
    });
    window.dispatchEvent(event);

    // Check if animation styles are applied
    await waitFor(() => {
      expect(monkeyHead).toHaveStyle({
        transform: "translateY(-100%)",
        opacity: "0",
      });
    });

    // Wait for animation to complete
    await waitFor(
      () => {
        expect(
          screen.queryByAltText("The Curious Code Monkey Head")
        ).not.toBeInTheDocument();
      },
      { timeout: 1100 }
    );
  });

  it("shows continue message after first phase", async () => {
    render(<Hero onAnimationComplete={mockOnAnimationComplete} />);

    // Trigger first phase
    const event = new WheelEvent("wheel", { deltaY: 100 });
    Object.defineProperty(event, "preventDefault", {
      value: jest.fn(),
    });
    window.dispatchEvent(event);

    // Wait for animation and check message
    await waitFor(
      () => {
        expect(screen.getByText("Scroll to continue")).toBeInTheDocument();
      },
      { timeout: 1100 }
    );
  });

  it("completes animation on second scroll", async () => {
    render(<Hero onAnimationComplete={mockOnAnimationComplete} />);

    // First phase
    const firstEvent = new WheelEvent("wheel", { deltaY: 100 });
    Object.defineProperty(firstEvent, "preventDefault", {
      value: jest.fn(),
    });
    window.dispatchEvent(firstEvent);

    await waitFor(
      () => {
        expect(
          screen.queryByAltText("The Curious Code Monkey Head")
        ).not.toBeInTheDocument();
      },
      { timeout: 1100 }
    );

    // Second phase
    const secondEvent = new WheelEvent("wheel", { deltaY: 100 });
    Object.defineProperty(secondEvent, "preventDefault", {
      value: jest.fn(),
    });
    window.dispatchEvent(secondEvent);

    expect(mockOnAnimationComplete).toHaveBeenCalled();
  });

  it("triggers animation on arrow down key", async () => {
    render(<Hero onAnimationComplete={mockOnAnimationComplete} />);

    // First phase
    const firstEvent = new KeyboardEvent("keydown", { key: "ArrowDown" });
    Object.defineProperty(firstEvent, "preventDefault", {
      value: jest.fn(),
    });
    window.dispatchEvent(firstEvent);

    await waitFor(
      () => {
        expect(
          screen.queryByAltText("The Curious Code Monkey Head")
        ).not.toBeInTheDocument();
      },
      { timeout: 1100 }
    );

    // Second phase
    const secondEvent = new KeyboardEvent("keydown", { key: "ArrowDown" });
    Object.defineProperty(secondEvent, "preventDefault", {
      value: jest.fn(),
    });
    window.dispatchEvent(secondEvent);

    expect(mockOnAnimationComplete).toHaveBeenCalled();
  });

  it("triggers animation on touch events", async () => {
    render(<Hero onAnimationComplete={mockOnAnimationComplete} />);

    // First phase
    const touchStartEvent = new TouchEvent("touchstart");
    Object.defineProperty(touchStartEvent, "preventDefault", {
      value: jest.fn(),
    });
    window.dispatchEvent(touchStartEvent);
    window.dispatchEvent(new TouchEvent("touchend"));

    await waitFor(
      () => {
        expect(
          screen.queryByAltText("The Curious Code Monkey Head")
        ).not.toBeInTheDocument();
      },
      { timeout: 1100 }
    );

    // Second phase
    window.dispatchEvent(new TouchEvent("touchstart"));
    window.dispatchEvent(new TouchEvent("touchend"));

    expect(mockOnAnimationComplete).toHaveBeenCalled();
  });

  it("skips animation on mobile devices", () => {
    // Mock mobile width
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 375,
    });

    render(<Hero onAnimationComplete={mockOnAnimationComplete} />);

    expect(
      screen.queryByAltText("The Curious Code Monkey Brain")
    ).not.toBeInTheDocument();
    expect(mockOnAnimationComplete).toHaveBeenCalled();
  });

  it("prevents default scroll behavior during animation", () => {
    render(<Hero onAnimationComplete={mockOnAnimationComplete} />);

    const event = new WheelEvent("wheel", { deltaY: 100 });
    const preventDefault = jest.fn();
    Object.defineProperty(event, "preventDefault", {
      value: preventDefault,
    });
    window.dispatchEvent(event);

    expect(preventDefault).toHaveBeenCalled();
  });

  it("prevents default touch behavior during animation", () => {
    render(<Hero onAnimationComplete={mockOnAnimationComplete} />);

    const event = new TouchEvent("touchstart");
    const preventDefault = jest.fn();
    Object.defineProperty(event, "preventDefault", {
      value: preventDefault,
    });
    window.dispatchEvent(event);

    expect(preventDefault).toHaveBeenCalled();
  });

  it("prevents default arrow key behavior during animation", () => {
    render(<Hero onAnimationComplete={mockOnAnimationComplete} />);

    const event = new KeyboardEvent("keydown", { key: "ArrowDown" });
    const preventDefault = jest.fn();
    Object.defineProperty(event, "preventDefault", {
      value: preventDefault,
    });
    window.dispatchEvent(event);

    expect(preventDefault).toHaveBeenCalled();
  });
});
