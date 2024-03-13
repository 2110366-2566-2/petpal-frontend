

export default function ServicePage({params}:{params:{bookingId:string}}) {
    var id:string = params.bookingId
    // if (email == ""){
    //   serviceProvider = exampleProvider
    // }else{
    //   serviceProvider = exampleProvider
    //   serviceProvider.Name = email
    // }
  
    // var thisEditProfileButton = editProfileButtonProps
    // thisEditProfileButton.Link = usePathname()+"edit"
  
    // var buttonPropsList:ButtonPropsInterface[] = [editProfileButtonProps,chagnePasswordButtonProps]
  
    const MY_BOOKING_ID:string = "id"
    var showButton:boolean = id==MY_BOOKING_ID
  
    return (
      <div className='items-center'>
        <span>BOOKING ID</span>
        <span>{id}</span>
      </div>
    )
  }
  