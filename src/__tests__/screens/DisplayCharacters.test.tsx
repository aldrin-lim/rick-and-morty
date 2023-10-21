import React from "react"
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react"
import { Provider } from "react-redux"
import configureStore from "redux-mock-store"
import ApolloMockProvider from "../util/ApolloMockProvider"
import DisplayCharacters from "../../screens/DisplayCharacters"
import { GET_CHARACTERS } from "../../hooks/useCharacters"

const mockStore = configureStore([])
let store = mockStore({
  character: {
    page: 1,
    filter: {},
  },
})

const mockedData = {
  characters: {
    info: { count: 2, pages: 1, next: null, prev: null },
    results: [
      {
        id: "1",
        name: "Rick",
        species: "Human",
        image: "image_url",
        gender: "Male",
        origin: { name: "Earth" },
        location: { name: "Earth" },
      },
      {
        id: "2",
        name: "Morty",
        species: "Human",
        image: "image_url",
        gender: "Male",
        origin: { name: "Earth" },
        location: { name: "Earth" },
      },
    ],
  },
}

const mockSuccess = {
  request: {
    query: GET_CHARACTERS,
    variables: { page: 1, filter: {} },
  },
  result: { data: mockedData },
  error: undefined,
}

const mockError = {
  request: {
    query: GET_CHARACTERS,
    variables: { page: 1, filter: {} },
  },
  error: new Error("An error occurred"),
}
const renderWithProviders = (component: React.ReactNode, mocks: any[] = []) => {
  return render(
    <Provider store={store}>
      <ApolloMockProvider mocks={mocks}>{component}</ApolloMockProvider>
    </Provider>,
  )
}

describe("DisplayCharacters Component", () => {
  it("displays loading message initially", () => {
    renderWithProviders(<DisplayCharacters />, [mockSuccess])
    expect(screen.getByText("Loading...")).toBeInTheDocument()
  })

  it("displays characters correctly after successful fetch", async () => {
    renderWithProviders(<DisplayCharacters />, [mockSuccess])

    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."))

    const characterElement = screen.queryByText("Rick")
    expect(characterElement).toBeInTheDocument()
  })

  it("displays error message on failed fetch", async () => {
    renderWithProviders(<DisplayCharacters />, [mockError])

    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."))

    const errorElement = screen.getByText("Error loading characters.")
    expect(errorElement).toBeInTheDocument()
  })
})
