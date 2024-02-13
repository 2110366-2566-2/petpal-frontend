export default interface ButtonPropsInterface{
    Name:string,
    Width:number,
    BgColor:string,
    FontColor:string,
    Link:string,
}

export var exampleButtonProps = {
    Name:"EDIT PROFILE",
    BgColor:"#FF872F",
    FontColor:"#000000",
    Link:""
}

export var editProfileButtonProps:ButtonPropsInterface = {
    Name:"EDIT PROFILE",
    Width:152,
    BgColor:"#FF872F",
    FontColor:"#FFFFFF",
    Link:"/",
}

export var chagnePasswordButtonProps:ButtonPropsInterface = {
    Name:"CHANGE PASSWORD",
    Width:212,
    BgColor:"#EDEDED",
    FontColor:"#000000",
    Link:"",
  }
