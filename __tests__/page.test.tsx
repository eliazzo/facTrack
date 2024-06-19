import { expect, test, vi } from "vitest"
import { render } from "@testing-library/react"
import Home from "../app/page"

// Mock the next/navigation module
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
