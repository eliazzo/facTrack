import { expect, test, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import Home from "../app/page"

/*  mock the useRouter function to return an object with a push function, so that it imitates the expected behavior in the Home component */
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(), // Mock the push function
  }),
}))

// Mock the OpenAI initialization to prevent the error related to API key
vi.mock("openai", () => ({
  OpenAI: vi.fn().mockImplementation(() => ({
    createCompletion: vi.fn().mockResolvedValue({}),
  })),
}))

// Mock any API interactions or database functions if necessary
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

/* button functionality */
