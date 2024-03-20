// import FeedbackPage from "./feedback/page"
import FeedbackPage from "@app/(routes)/listing/[serviceId]/feedback/page"

export default function ServicePage({params}:{params:{serviceId:string}}) {
    var id:string = params.serviceId
    // if (email == ""){
    //   serviceProvider = exampleProvider
    // }else{
    //   serviceProvider = exampleProvider
    //   serviceProvider.Name = email
    // }
  
    // var thisEditProfileButton = editProfileButtonProps
    // thisEditProfileButton.Link = usePathname()+"edit"
  
    // var buttonPropsList:ButtonPropsInterface[] = [editProfileButtonProps,chagnePasswordButtonProps]
  
    const MY_SERVICE_ID:string = "id"
    var showButton:boolean = id==MY_SERVICE_ID
  
    return (
      <div className='items-center'>
        <span>SERVICE ID</span>
        <span>{id}</span>
        {/* <FeedbackPage serviceId="65f172b72d00a205a6f54672"/> */}
      </div>
    )
  }
  