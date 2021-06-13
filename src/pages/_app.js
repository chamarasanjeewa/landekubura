import { Provider } from "react-redux";

import "../styles/antd.less";
import "../styles/styles.scss";
// import Loading from "../components/other/Loading";
import withReduxStore from "../common/withReduxStore";
import FetchInitData from "../components/other/FetchInitData";
import { AuthProvider } from "../context/AuthContext";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

// Create a client
const queryClient = new QueryClient()

const App = ({ Component, pageProps, reduxStore }) => {
  return (
    <AuthProvider>
        <QueryClientProvider client={queryClient}>
            <Provider store={reduxStore}>
              <FetchInitData>
                <Component {...pageProps} />
              </FetchInitData>
            </Provider>
            <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
    </AuthProvider>
  );
};

export default withReduxStore(App);
