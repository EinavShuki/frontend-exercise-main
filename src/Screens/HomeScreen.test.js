/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom/extend-expect";
import { generateIssues } from "../mock/issues";
import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import HomeScreen from "./HomeScreen";

describe("HomeScreen", () => {
  let issues;
  beforeAll(() => {
    issues = generateIssues();
  });

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(issues),
        ok: true,
      })
    );
  });

  beforeEach(() => {
    fetch.mockClear();
  });

  test("testing filters", async () => {
    const { container, getByPlaceholderText, findAllByRole, getByText } =
      render(<HomeScreen />);
    await waitFor(() =>
      expect(container.querySelector(".loading_div")).not.toBeInTheDocument()
    );
    expect(fetch).toHaveBeenCalled();
    expect(document.body).toHaveTextContent("Status");
    //selecting low and typing critical

    const freeTextSearch = getByPlaceholderText("Free Search");
    fireEvent.change(freeTextSearch, {
      target: { value: "criti" },
    });
    const selects = await findAllByRole("combobox");
    fireEvent.keyDown(selects[1], { key: "ArrowDown" });
    await waitFor(() => expect(getByText("Low")).toBeInTheDocument());
    fireEvent.click(getByText("Low"));
    expect(document.body).toHaveTextContent("0 Results");
  });
});
