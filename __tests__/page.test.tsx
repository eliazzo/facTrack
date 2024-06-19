import { expect, test, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import Home from "../app/page"

/*  mock the useRouter function to return an object with a push function, so that it imitates the expected behavior in the Home component */
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(), // Mock the push function
  }),
}))

test("Home component should have <main> element", () => {
  render(<Home />)
  const mainElement = document.getElementById("Home")
  expect(mainElement).toBeDefined()
})

test("Home component should render TranscriptCard component", () => {
  render(<Home />)
  const transcriptCard = screen.getAllByTestId("transcript-card")
  expect(transcriptCard).toBeDefined()
})

test("Home component should render TranscriptCard component", () => {
  render(<Home />)
  const transcriptCard = screen.getAllByTestId("transcript-card")
  expect(transcriptCard).toBeDefined()
})

test("Home component should render SelectedTranscript component", () => {
  render(<Home />)
  const selectedTranscript = screen.getAllByTestId("selected-transcript")
  expect(selectedTranscript).toBeDefined()
})
