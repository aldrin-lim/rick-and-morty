import { renderHook, waitFor } from "@testing-library/react"
import { GET_CHARACTERS, useCharacters } from "../../hooks/useCharacters"
import ApolloMockProvider, {
  ApolloMockProviderProps,
} from "../util/ApolloMockProvider"

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
        status: "alive",
        origin: { name: "Earth" },
        location: { name: "Earth" },
      },
      {
        id: "2",
        name: "Morty",
        species: "Human",
        image: "image_url",
        gender: "Male",
        status: "alive",
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

describe("useCharacters Hook", () => {
  it("should show loading state initially", () => {
    const { result } = renderHook(() => useCharacters(), {
      wrapper: (props: ApolloMockProviderProps) => (
        <ApolloMockProvider {...props} mocks={[mockSuccess]} />
      ),
    })

    expect(result.current.loading).toBe(true)
    expect(result.current.error).toBeUndefined()
    expect(result.current.data).toBeUndefined()
  })

  it("should handle successful data fetch", async () => {
    const { result } = renderHook(() => useCharacters(1, {}), {
      wrapper: (props: ApolloMockProviderProps) => (
        <ApolloMockProvider {...props} mocks={[mockSuccess]} />
      ),
    })

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBeUndefined()
    expect(result.current.data).toEqual(mockedData)
  })

  it("should handle error state", async () => {
    const { result } = renderHook(() => useCharacters(), {
      wrapper: (props: ApolloMockProviderProps) => (
        <ApolloMockProvider {...props} mocks={[mockError]} />
      ),
    })

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.loading).toBe(false)
    expect(result.current.data).toBeUndefined()
    expect(result.current.error).toBeDefined()
  })
})
