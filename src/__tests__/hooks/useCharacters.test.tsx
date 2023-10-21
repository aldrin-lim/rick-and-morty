import { renderHook, act } from "@testing-library/react-hooks"
import { MockedProvider } from "@apollo/client/testing"
import { GET_CHARACTERS, useCharacters } from "../../hooks/useCharacters"
import React from "react"

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

type WrapperProps = React.PropsWithChildren<{ mocks?: any[] }>

const Wrapper: React.FC<WrapperProps> = ({ children, mocks = [] }) => (
  <MockedProvider mocks={mocks} addTypename={false}>
    {children}
  </MockedProvider>
)

describe("useCharacters Hook", () => {
  it("should show loading state initially", () => {
    const { result } = renderHook(() => useCharacters(), {
      wrapper: (props: WrapperProps) => (
        <Wrapper {...props} mocks={[mockSuccess]} />
      ),
    })

    expect(result.current.loading).toBe(true)
    expect(result.current.error).toBeUndefined()
    expect(result.current.data).toBeUndefined()
  })

  it("should handle successful data fetch", async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useCharacters(1, {}),
      {
        wrapper: (props: WrapperProps) => (
          <Wrapper {...props} mocks={[mockSuccess]} />
        ),
      },
    )

    await act(async () => {
      await waitForNextUpdate()
    })

    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBeUndefined()
    expect(result.current.data).toEqual(mockedData)
  })

  it("should handle error state", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCharacters(), {
      wrapper: (props: WrapperProps) => (
        <Wrapper {...props} mocks={[mockError]} />
      ),
    })

    await act(async () => {
      await waitForNextUpdate()
    })

    expect(result.current.loading).toBe(false)
    expect(result.current.data).toBeUndefined()
    expect(result.current.error).toBeDefined()
  })
})
