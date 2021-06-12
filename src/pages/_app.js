import { Provider } from "react-redux";

import "../styles/antd.less";
import "../styles/styles.scss";
// import Loading from "../components/other/Loading";
import withReduxStore from "../common/withReduxStore";
import FetchInitData from "../components/other/FetchInitData";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'

// Create a client
const queryClient = new QueryClient()

const App = ({ Component, pageProps, reduxStore }) => {
  return (
    <QueryClientProvider client={queryClient}>
    <Provider store={reduxStore}>
      <FetchInitData>
        <Component {...pageProps} />
      </FetchInitData>
    </Provider>
    </QueryClientProvider>
  );
};

export default withReduxStore(App);
