import { expect, test, vi } from "vitest"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import Home from "../app/page"

/*  mock the useRouter function to return an object with a push function, so that it imitates the expected behavior in the Home component */
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(), // Mock the push function
  }),
}))

/* mock OpenAI initialization */
vi.mock("openai", () => ({
  OpenAI: vi.fn().mockImplementation(() => ({
    createCompletion: vi.fn().mockResolvedValue({}),
  })),
}))

/* mock API interactions and database functions */
vi.mock("../app/api/openai/processTranscript", () => ({
  processTranscript: vi.fn().mockResolvedValue({}),
}))

vi.mock("../app/utils/mongodb/insertDocument", () => ({
  insertDocument: vi.fn().mockResolvedValue({}),
}))

/* component rendering tests */

test("Home component should have <main> element", () => {
  render(<Home />)
  const mainElement = document.getElementById("Home")
  expect(mainElement).toBeDefined()
})

test("Home component should render SelectedTranscript component", () => {
  render(<Home />)
  const selectedTranscript = screen.getAllByTestId("selected-transcript")
  expect(selectedTranscript).toBeDefined()
})

/* button tests */

test("Home component should render all buttons", () => {
  render(<Home />)
  expect(screen.getAllByTestId("process-transcript")).toBeDefined()
  expect(screen.getAllByTestId("get-notes")).toBeDefined()
  expect(screen.getAllByTestId("download")).toBeDefined()
  expect(screen.getAllByTestId("log-out")).toBeDefined()
})

test("Clicking 'Process Transcript' button should render react loader and show toast alert", async () => {
  render(<Home />)
  const processTranscriptButton = screen.getAllByTestId("process-transcript")
  fireEvent.click(processTranscriptButton[0])
  expect(screen.queryByTestId("loader")).toBeDefined()
  await waitFor(() => {
    expect(screen.queryByTestId("loader")).toBeNull()
  })
  expect(screen.queryByTestId("toast")).toBeDefined()
})
