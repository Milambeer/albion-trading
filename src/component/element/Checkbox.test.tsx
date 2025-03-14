import { beforeEach, describe, expect, test, vitest } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { Checkbox } from "./Checkbox";

describe("Checkbox Component", () => {
  const mockData = {
    option1: true,
    option2: false,
    option3: true,
  };

  const mockOnChange = vitest.fn();

  const defaultProps = {
    title: "Test Checkbox",
    data: mockData,
    onChange: mockOnChange,
  };

  beforeEach(() => {
    mockOnChange.mockClear();
    cleanup();
  });

  test("renders the component with correct title", () => {
    render(<Checkbox {...defaultProps} />);

    expect(screen.getByText("Test Checkbox")).not.toBeNull();
  });

  test("renders all checkboxes with correct labels", () => {
    render(<Checkbox {...defaultProps} />);

    expect(screen.getByText("option1")).not.toBeNull();
    expect(screen.getByText("option2")).not.toBeNull();
    expect(screen.getByText("option3")).not.toBeNull();
  });

  test("checkboxes have correct initial checked state", () => {
    render(<Checkbox {...defaultProps} />);

    const checkbox1 = screen.getByLabelText("option1") as HTMLInputElement;
    const checkbox2 = screen.getByLabelText("option2") as HTMLInputElement;
    const checkbox3 = screen.getByLabelText("option3") as HTMLInputElement;

    expect(checkbox1.checked).toBe(true);
    expect(checkbox2.checked).toBe(false);
    expect(checkbox3.checked).toBe(true);
  });

  test("calls onChange handler when checkbox is clicked", () => {
    render(<Checkbox {...defaultProps} />);

    const checkbox = screen.getByLabelText("option2");
    fireEvent.click(checkbox);

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  test("each checkbox has the correct id attribute", () => {
    render(<Checkbox {...defaultProps} />);

    const checkbox1 = screen.getByLabelText("option1");
    const checkbox2 = screen.getByLabelText("option2");
    const checkbox3 = screen.getByLabelText("option3");

    expect(checkbox1.id).toBe("id-option1");
    expect(checkbox2.id).toBe("id-option2");
    expect(checkbox3.id).toBe("id-option3");
  });

  test("renders correctly with empty data object", () => {
    render(<Checkbox {...defaultProps} data={{}} />);

    expect(screen.queryAllByDisplayValue("Test Checkbox").length).toBe(0);
    expect(screen.queryAllByRole("checkbox").length).toBe(0);
  });
});
