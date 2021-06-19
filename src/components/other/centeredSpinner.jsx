
import { LoadingOutlined } from "@ant-design/icons";




export const CenteredSpinner=()=>{
    return (
        <div style={SpinnerDiv}>
      <LoadingOutlined spin />
        </div>
      )
}

const SpinnerDiv = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%"}
