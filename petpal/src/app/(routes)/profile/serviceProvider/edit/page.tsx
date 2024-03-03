import ServiceProviderCreationForm from "../../_components/ServiceProviderCreationForm";
import { setCookie } from "cookies-next";
import { LoginApi } from "@/app/libs/userBackend";

export default async function Profile() {
  const LogData = await LoginApi()
  // setCookie("token",LogData?.data.AccessToken);
  // console.log("in startpage Edit",LogData)
  return (
    <ServiceProviderCreationForm/>
  )
}
