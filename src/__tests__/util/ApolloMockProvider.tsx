import { MockedProvider } from "@apollo/client/testing"

export type ApolloMockProviderProps = React.PropsWithChildren<{ mocks?: any[] }>

const ApolloMockProvider: React.FC<ApolloMockProviderProps> = ({
  children,
  mocks = [],
}) => (
  <MockedProvider mocks={mocks} addTypename={false}>
    {children}
  </MockedProvider>
)

export default ApolloMockProvider
