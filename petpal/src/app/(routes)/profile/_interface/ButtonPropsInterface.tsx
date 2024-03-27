
export default interface ButtonPropsInterface {
    Name: string,
    Width: string,
    BgColor: string,
    FontColor: string,
    Link: string,
}

export var editProfileButtonProps: ButtonPropsInterface = {
    Name: "EDIT PROFILE",
    Width: "w-[152px]",
    BgColor: "bg-orange",
    FontColor: "text-[#FFFF]",
    Link: "/",
}

export var chagnePasswordButtonProps: ButtonPropsInterface = {
    Name: "CHANGE PASSWORD",
    Width: "w-[212px]",
    BgColor: "bg-[#D9D9D9]",
    FontColor: "text-[#000]",
    Link: "",
}

export var saveEditButtonProps: ButtonPropsInterface = {
    Name: "SAVE",
    Width: "w-[68px]",
    BgColor: "bg-blue",
    FontColor: "text-[#FFFF]",
    Link: "./",
}
export var addPetButtonProps: ButtonPropsInterface = {
    Name: "ADD",
    Width: "w-[102px]",
    BgColor: "bg-[#D9D9D9]",
    FontColor: "text-[#000]",
    Link: "",
}

export var createServiceButton: ButtonPropsInterface = {
    Name: "Submit",
    Width: "w-[102px]",
    BgColor: "bg-orange",
    FontColor: "text-[#FFF]",
    Link: "./",
}

export var editServiceButton: ButtonPropsInterface = {
    Name: "Confirm",
    Width: "w-[102px]",
    BgColor: "bg-orange",
    FontColor: "text-[#FFF]",
    Link: "../..",
}


export var cancelServiceButton: ButtonPropsInterface = {
    Name: "Cancel",
    Width: "w-[102px]",
    BgColor: "bg-[#D9D9D9]",
    FontColor: "text-[#000]",
    Link: "./",
}