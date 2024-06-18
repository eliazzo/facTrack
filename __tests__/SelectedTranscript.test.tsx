/**
 * @jest-environment jsdom
 */

import { render } from "@testing-library/react"
import "@testing-library/jest-dom"

import { SelectedTranscript } from "@/app/components/SelectedTranscript"

test("SelectedTranscript component is populated with 'title'", () => {
  render(<SelectedTranscript />)
  const element = document.getElementById("title")
  expect(element?.innerText).not.toBeNull()
})

test("SelectedTranscript component is populated with 'attendees'", () => {
  render(<SelectedTranscript />)
  const element = document.getElementById("attendees")
  expect(element?.innerText).not.toBeNull()
})

test("SelectedTranscript component is populated with 'discussion points'", () => {
  render(<SelectedTranscript />)
  const element = document.getElementById("discussion points")
  expect(element?.innerText).not.toBeNull()
})

test("SelectedTranscript component is populated with 'actions'", () => {
  render(<SelectedTranscript />)
  const element = document.getElementById("actions")
  expect(element?.innerText).not.toBeNull()
})
