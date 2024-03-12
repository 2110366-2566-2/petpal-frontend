

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
      </div>
    )
  }
  